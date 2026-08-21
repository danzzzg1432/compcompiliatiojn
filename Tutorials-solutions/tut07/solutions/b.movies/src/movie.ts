import { getData } from './dataStore';
import type { EmptyObject, MovieAddReturn, MovieListReturn } from './types';

// A custom exception class that can take both error and message
export class MovieError extends Error {
  error: string;

  constructor(error: string, message: string) {
    super(message);
    this.error = error;
  }
}

export class MovieErrorV2 extends Error {
  error: string;

  constructor(error: string, potato: number, message: string) {
    super(message);
    this.error = error;
  }
}

export function clear(): EmptyObject {
  getData().movies = [];
  return {};
}

export function movieAdd(title: string, director: string): MovieAddReturn {
  if (title === '' || director === '') {
    throw new Error('INVALID_MOVIE_DETAILS');
  }

  const data = getData();

  const movieId = data.movies.length;
  data.movies.push({ movieId, title, director });
  return { movieId };
}

export function movieEdit(movieId: number, title: string, director: string): EmptyObject {
  const movie = getData().movies.find(m => m.movieId === movieId);
  if (movie === undefined) {
    // Put the error type and message in the same string
    throw new Error(`INVALID_MOVIE_ID: No existing movie with movieId: ${movieId}`);
  }

  if (title === '') {
    throw new Error(`INVALID_MOVIE_DETAILS: Title '${title}' is empty`);
  }

  if (director === '') {
    throw new Error(`INVALID_MOVIE_DETAILS: Director '${director}' is empty`);
  }

  movie.title = title;
  movie.director = director;

  return {};
}

export function movieEditV2(movieId: number, title: string, director: string): EmptyObject {
  const movie = getData().movies.find(m => m.movieId === movieId);
  if (movie === undefined) {
    throw new MovieError('INVALID_MOVIE_ID', `No existing movie with movieId: ${movieId}`);
  }

  if (title === '') {
    throw new MovieError('INVALID_MOVIE_DETAILS', `Title '${title}' is empty`);
  }

  if (director === '') {
    throw new MovieError('INVALID_MOVIE_DETAILS', `Director '${director}' is empty`);
  }

  movie.title = title;
  movie.director = director;

  return {};
}

export function moviesList(): MovieListReturn {
  return { movies: getData().movies };
}
