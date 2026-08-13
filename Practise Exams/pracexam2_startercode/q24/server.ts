import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { port, url } from './config.json';
import { clear } from './rugby';

///////////////////////////////////////////////////////////////////////////////
// Constants and Express Application Middleware
///////////////////////////////////////////////////////////////////////////////

const PORT: number = parseInt(process.env.PORT || port);
const HOST: string = process.env.IP || '127.0.0.1';

const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'));

///////////////////////////////////////////////////////////////////////////////
// Routes
///////////////////////////////////////////////////////////////////////////////

app.delete('/clear', (req: Request, res: Response) => {
  res.json(clear());
});

// TODO: implement remaining routes given in the swagger.yaml


///////////////////////////////////////////////////////////////////////////////
// Startup and Shutdown
///////////////////////////////////////////////////////////////////////////////

/*
 * 404 Not Found Middleware
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '404 Not Found' });
});

/**
 * Start server
 */
const server = app.listen(PORT, HOST, () => {
  console.log(`Express Server started and awaiting requests at the URL: '${url}:${PORT}'`);
});

/**
 * Faithfully report uncaught errors.
 */
server.on('error', console.error);

/**
 * Handle Ctrl+C gracefully
 */
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
