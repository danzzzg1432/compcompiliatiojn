import { afterEach, describe, test, expect } from 'vitest';
import { addUser, addSong, addToPlaylist, listPlaylist, clear } from "./playlist.js";

afterEach(() => {
  clear();
});

describe('addUser tests', () => {
  test('addUser Success', () => {
    expect(addUser('valid@mail.com', 'mypassword')).toStrictEqual({ userId: expect.any(String) })
  });

  test('addUser invalid email', () => {
    expect(addUser('invalidemail', 'password')).toStrictEqual({ error: 'INVALID_EMAIL', message: expect.any(String) });
  });

  test('addUser empty password', () => {
    expect(addUser('valid@mail.com', '')).toStrictEqual({ error: 'INVALID_PASSWORD', message: expect.any(String) });
  });
});


describe('addSong tests', () => {
  test('addSong Success', () => {
    expect(addSong('name', 'artist', 1)).toStrictEqual({ songId: expect.any(String) });
  });

  test('addSong empty name', () => {
    expect(addSong('', 'artist', 1)).toStrictEqual({ error: 'INVALID_NAME', message: expect.any(String) });
  });

  test('addSong empty artist', () => {
    expect(addSong('name', '', 1)).toStrictEqual({ error: 'INVALID_ARTIST', message: expect.any(String) });
  });

  test('addSong duration too small', () => {
    expect(addSong('name', 'artist', -1)).toStrictEqual({ error: 'INVALID_DURATION', message: expect.any(String) });
  });

  test('addSong duration too large', () => {
    expect(addSong('name', 'artist', 11)).toStrictEqual({ error: 'INVALID_DURATION', message: expect.any(String) });
  });
});

describe('addToPlaylist tests', () => {
  test('addToPlaylist Success', () => {
    const userId = addUser('valid@mail.com', 'mypassword').userId;
    const songId = addSong('name', 'artist', 1).songId;
    expect(addToPlaylist(userId, songId)).toStrictEqual({})
  });

  test('addToPlaylist Invalid userId', () => {
    const songId = addSong('name', 'artist', 1).songId;
    expect(addToPlaylist(0, songId)).toStrictEqual({ error: 'INVALID_USER_ID', message: expect.any(String) })
  });

  test('addToPlaylist Invalid songId', () => {
    const userId = addUser('valid@mail.com', 'mypassword').userId;
    expect(addToPlaylist(userId, 0)).toStrictEqual({ error: 'INVALID_SONG_ID', message: expect.any(String) })
  });

  test('addToPlaylist song already in playlist', () => {
    const userId = addUser('valid@mail.com', 'mypassword').userId;
    const songId = addSong('name', 'artist', 1).songId;
    addToPlaylist(userId, songId)
    expect(addToPlaylist(userId, songId)).toStrictEqual({ error: 'IN_PLAYLIST', message: expect.any(String) })
  });
});


describe('listPlaylist tests', () => {
  test('listPlaylist Success', () => {
    const userId = addUser('valid@mail.com', 'mypassword').userId;
    const songId = addSong('name', 'artist', 1).songId;
    addToPlaylist(userId, songId);
    expect(listPlaylist(userId)).toStrictEqual([{
      "artist": "artist",
      "duration": 1,
      "name": "name",
      "songId": expect.any(String),
    }]);
  });

  test('listPlaylist invalid userId', () => {
    expect(listPlaylist(1)).toStrictEqual({ error: 'INVALID_USER_ID', message: expect.any(String) });
  });
});
