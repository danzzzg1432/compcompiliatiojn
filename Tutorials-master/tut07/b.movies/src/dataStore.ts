import type { Movie } from './types';

interface DataStore {
  movies: Movie[];
}

const dataStore: DataStore = {
  movies: [],
};

export function getData(): DataStore {
  return dataStore;
}
