import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { port, url } from './config.json';
import { movieAdd, movieEdit, moviesList, clear, movieEditV2, MovieError } from './movie';

const PORT: number = parseInt(process.env.PORT || port);
const SERVER_URL = `${url}:${PORT}`;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.post('/movie/add', (req: Request, res) => {
  const title = req.body.title;
  const director = req.body.director;

  try {
    const result = movieAdd(title, director);
    res.json(result);
  } catch (e) {
    res.status(400).json({
      error: e.message,
      message: 'Title or Director is empty',
    });
  }
});

app.put('/movie/:movieid', (req: Request, res: Response) => {
  const movieid = parseInt(String(req.params.movieid));
  const title = req.body.title;
  const director = req.body.director;

  try {
    const result = movieEdit(movieid, title, director);
    res.json(result);
  } catch (e) {
    // Split out the error type from the front of the string
    const error = e.message.split(': ')[0];
    res.status(400).json({
      error: error,
      message: e.message,
    });
  }
});

app.put('/v2/movie/:movieid', (req: Request, res: Response) => {
  const movieid = parseInt(String(req.params.movieid));
  const title = req.body.title;
  const director = req.body.director;

  try {
    const result = movieEditV2(movieid, title, director);
    res.json(result);
  } catch (e: unknown) {
    if (e instanceof MovieError) {
      // The error `e` was our `MovieError` type, respond with the error details.
      return res.status(400).json({
        error: e.error,
        message: e.message,
      });
    }

    // Was not an error we threw... Rethrow it so it can be handled elsewhere.
    throw e;
  }
});

app.get('/movies/list', (req: Request, res: Response) => {
  res.json(moviesList());
});

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});

const server = app.listen(PORT, () => {
  console.log(`Server started at the URL: '${SERVER_URL}'`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
