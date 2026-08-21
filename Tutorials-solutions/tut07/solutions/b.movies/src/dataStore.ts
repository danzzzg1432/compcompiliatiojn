import fs from 'fs';
import type { Movie } from './types';

interface DataStore {
  movies: Movie[];
}

let dataStore: DataStore = {
  movies: [
    {
      movieId: 67,
      title: 'Moanna',
      director: 'Steven',
    }
  ],
};

export function getData(): DataStore {
  return dataStore;
}

export function save() {
  const jsonString = JSON.stringify(dataStore);
  fs.writeFileSync(__dirname + '/movieDatabase.json', jsonString);
}

export function load() {
  if (fs.existsSync(__dirname + '/movieDatabase.json')) {
    const databaseString = fs.readFileSync(__dirname + '/movieDatabase.json');
    dataStore = JSON.parse(String(databaseString));
  }
}
