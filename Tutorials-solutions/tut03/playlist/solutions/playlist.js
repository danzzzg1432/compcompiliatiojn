import { getData } from "./dataStore.js";
import { findSong, findUser } from "./helper.js";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import validator from 'validator';


/**
 * Registers a user with an email and password 
 * @param {string} email 
 * @param {string} password 
 * @returns {{userId: number} | {error: string, message: string}} 
 */
export function addUser(email, password) {
  // check if password is empty
  if (password === "") {
    return { error: 'INVALID_PASSWORD', message: 'empty password' };
  }

  // validate the email
  if (!validator.isEmail(email)) {
    return { error: 'INVALID_EMAIL', message: 'invalid email' };
  }

  // generate a random string for the userId
  const userId = uuidv4();

  // get the date now in the format
  // 'WEEKDAY - hh:mm:ss [am/pm]". e.g. 'Saturday - 06:03:54 pm'
  const date = format(new Date(), "EEEE - hh:mm:ss aaa");

  const data = getData();

  const newUser = {
    userId: userId,
    email: email,
    password: password,
    playlist: [],
    dateCreated: date
  }

  data.users.push(newUser);

  return { userId };
}

/**
 * Adds a new song to the database
 * @param {string} name 
 * @param {string} artist 
 * @param {number} duration 
 * @returns {{userId: number} | {error: string, message: string}}
 */
export function addSong(name, artist, duration) {
  if (name === '') {
    return { error: 'INVALID_NAME', message: 'empty song name' };
  }
  if (artist === '') {
    return { error: 'INVALID_ARTIST', message: 'empty artist name' };
  }
  if (duration > 10 || duration < 0) {
    return { error: 'INVALID_DURATION', message: 'duration is less than 0 or greater than 10' };
  }

  const data = getData();

  // generate a random string for the userId
  const songId = uuidv4();

  data.songs.push({ name, artist, duration, songId });
  return { songId };
}

/**
 * Adds a song to a users playlist
 * @param {string} userId 
 * @param {string} songId 
 * @returns {{} | {error: string, message: string}}
 */
export function addToPlaylist(userId, songId) {
  const user = findUser(userId);
  if (!user) {
    return { error: 'INVALID_USER_ID', message: 'user id is invalid' };
  }

  const song = findSong(songId);
  if (!song) {
    return { error: 'INVALID_SONG_ID', message: 'song id is invalid' };
  }

  if (user.playlist.includes(song)) {
    return { error: 'IN_PLAYLIST', message: 'song is already in users playlist' };
  }

  user.playlist.push(song);
  return {};
}

/**
 * Lists all of the songs in a users playlist
 * @param {string} userId 
 * @returns {songs[] | {error: string, message: string}} playlist
 */
export function listPlaylist(userId) {
  const user = findUser(userId);
  if (!user) {
    return { error: 'INVALID_USER_ID', message: 'user id is invalid' };
  }
  return user.playlist;
}

/**
 * Returns the program to its original state
 * @returns {}
 */
export function clear() {
  const data = getData();
  data.songs = [];
  data.users = [];
  return {};
}
