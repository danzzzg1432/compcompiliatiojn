const dataStore = {
  users: [],
  songs: []
}

/**
 * returns the datastore
 * @returns {Object} dataStore
 */
export function getData() {
  return dataStore;
}

// users is an array of User objects
// {
//     userId: String,
//     email: String,
//     password: String,
//     playlist: Song[],
//     dateCreated: String
// }

// songs is an array of Song objects
// {
//     songId: String,
//     name: String,
//     artist: String,
//     duration: Integer
// }
