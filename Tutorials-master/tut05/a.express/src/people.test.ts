import request from 'sync-request-curl';
import { beforeEach, describe, test, expect } from 'vitest';

import { port, url } from './config.json';
import { clear, peopleAdd, peopleList, personView, personEdit, personRemove, peopleStats } from './people';
import { INVALID_AGE } from './errors';

const SERVER_URL = `${url}:${port}`;

/**
 * Use the imported `request` library to send a request to the server and retrieve a response
 * Documentation: https://www.npmjs.com/package/sync-request-curl
 */

beforeEach(() => {
  clear();
});

describe('clear', () => {
  test('Test successfull clear return when empty', () => {
    const res = clear();

    expect(res).toStrictEqual({});
  });
});

describe('peopleAdd', () => {
  test('Test adding successful person return type', () => {
    const res = peopleAdd('hello', 5);

    expect(res).toStrictEqual({ personId: expect.any(Number) });
  });
});

describe('peopleList', () => {
  test('Test getting successful person details', () => {
    const person = peopleAdd('hello', 5);

    const res = peopleList(5);

    expect(res).toStrictEqual({
      people: [
        {
          personId: person.personId,
          name: 'hello',
          age: 5,
        }
      ],
    });
  });

  test('Test INVALID_AGE error when minAge is negative', () => {
    peopleAdd('hello', 5);

    const res = peopleList(-5);

    expect(res).toStrictEqual({
      error: INVALID_AGE,
      message: expect.any(String),
    });
  });
});

describe('personView', () => {
  test('Test successful person view', () => {
    const person = peopleAdd('Tam', 22) as { personId: number };

    const res = personView(person.personId);

    expect(res).toStrictEqual({
      person: {
        personId: person.personId,
        name: 'Tam',
        age: 22,
      }
    });
  });
});
