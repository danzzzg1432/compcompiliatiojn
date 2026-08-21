import { beforeEach, describe, test, expect } from 'vitest';
import request, { HttpVerb } from 'sync-request-curl';

import { port, url } from './config.json';
import { DUPLICATE_NAME, INVALID_AGE, INVALID_NAME, INVALID_PERSON_ID, NO_PEOPLE } from './errors';

const SERVER_URL = `${url}:${port}`;

interface PersonAddReturn {
  personId: number;
}

/**
 * Make an object that has the error structure together with a status code, as this will
 * be compared with errors that the requestHelper function will create..
 */
const makeCustomErrorForTest = (status: number, error: string) => ({ status, error, message: expect.any(String) });

/**
 * Sends a request to the given route and return its results
 * Errors will be returned in the form { status: number, error: string }
 */
const requestHelper = (method: HttpVerb, path: string, payload: object) => {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }

  const res = request(method, SERVER_URL + path, { qs, json, timeout: 20000 });
  const bodyString = res.body.toString();

  let bodyObject: any;
  try {
    // Return if valid JSON
    bodyObject = JSON.parse(bodyString);
  } catch (error: any) {
    bodyObject = {
      error: `Server responded with ${res.statusCode}, but body is not JSON! Given: ${bodyString}. Reason: ${error.message}. HINT: Did you res.json(undefined)?`
    };
  }

  if ('error' in bodyObject) {
    return { status: res.statusCode, ...bodyObject };
  }
  return bodyObject;
};

// ========================================================================= //

// Wrapper functions

const requestPeopleAdd = (name: string, age: number) => {
  return requestHelper('POST', '/people/add', { name, age });
};

const requestPeopleList = (minAge: number) => {
  return requestHelper('GET', '/people/list', { minAge });
};

const requestPersonView = (personId: number) => {
  return requestHelper('GET', `/person/${personId}`, {});
};

const requestPersonEdit = (personId: number, name: string, age: number) => {
  return requestHelper('PUT', `/person/${personId}`, { personId, name, age });
};

const requestPersonRemove = (personId: number) => {
  return requestHelper('DELETE', `/person/${personId}`, { personId });
};

const requestPeopleStats = () => {
  return requestHelper('GET', '/people/stats', {});
};

const requestClear = () => {
  return requestHelper('DELETE', '/clear', {});
};

// ========================================================================= //

beforeEach(() => {
  requestClear();
});

describe('/people/add', () => {
  describe('error', () => {
    test.each([
      { name: '', age: 20, expectedError: INVALID_NAME },
      { name: 'valid', age: 0, expectedError: INVALID_AGE },
    ])('name=$name, age=$age', ({ name, age, expectedError } : { name: string, age: number, expectedError: string }) => {
      const res = requestPeopleAdd(name, age);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, expectedError));
    });
  });

  test('return value', () => {
    const person = requestPeopleAdd('valid', 20);

    expect(person).toStrictEqual({ personId: expect.any(Number) });

    const peopleList = requestPeopleList(0);

    expect(peopleList).toStrictEqual({ people: [{ personId: person.personId, name: 'valid', age: 20 }] });
  });
});

describe('/people/list', () => {
  describe('minAge 0', () => {
    test('empty', () => {
      const res = requestPeopleList(0);

      expect(res).toStrictEqual({ people: [] });
    });

    test('one item', () => {
      const { personId } = requestPeopleAdd('one', 1);

      const res = requestPeopleList(0);

      expect(res).toStrictEqual({ people: [{ personId, name: 'one', age: 1 }] });
    });

    test('multiple items', () => {
      const p1 = requestPeopleAdd('alsothree', 3);
      const p2 = requestPeopleAdd('two', 2);
      const p3 = requestPeopleAdd('three', 3);

      const res = requestPeopleList(2);

      expect(res).toStrictEqual({
        people:
          [
            { personId: p1.personId, name: 'alsothree', age: 3 },
            { personId: p3.personId, name: 'three', age: 3 },
            { personId: p2.personId, name: 'two', age: 2 },
          ]
      });
    });
  });

  describe('with minAge', () => {
    test('error: minAge negative', () => {
      requestPeopleAdd('three', 3);

      const res = requestPeopleList(-1);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, INVALID_AGE));
    });

    test('higher minAge than existing people means empty', () => {
      requestPeopleAdd('three', 3);

      const res = requestPeopleList(4);

      expect(res).toStrictEqual({ people: [] });
    });

    test('minAge filter', () => {
      requestPeopleAdd('three', 3);
      const p2 = requestPeopleAdd('five', 5);

      const res = requestPeopleList(4);

      expect(res).toStrictEqual({ people: [{ personId: p2.personId, name: 'five', age: 5 }] });
    });
  });
});

describe('GET /person/:personid', () => {
  let person: PersonAddReturn;
  beforeEach(() => {
    person = requestPeopleAdd('Tam', 22);
  });

  describe('error', () => {
    test('does not exist', () => {
      const res = requestPersonView(person.personId + 1);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, INVALID_PERSON_ID));
    });
  });

  describe('success', () => {
    test('valid view', () => {
      const res = requestPersonView(person.personId);

      expect(res).toStrictEqual({
        person: {
          personId: person.personId,
          name: 'Tam',
          age: 22,
        }
      });
    });
  });
});

describe('PUT /person/:personid', () => {
  let person: PersonAddReturn;
  beforeEach(() => {
    person = requestPeopleAdd('Tam', 22);
  });

  describe('error', () => {
    test('does not exist', () => {
      const res = requestPersonEdit(person.personId + 1, 'validname', 20);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, INVALID_PERSON_ID));
    });

    test('negative age', () => {
      const res = requestPersonEdit(person.personId, 'validname', -20);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, INVALID_AGE));
    });

    test('empty name', () => {
      const res = requestPersonEdit(person.personId, '', 20);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, INVALID_NAME));
    });

    test('name already taken', () => {
      requestPeopleAdd('Rani', 22);

      const res = requestPersonEdit(person.personId, 'Rani', 20);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, DUPLICATE_NAME));
    });
  });

  test('successful edit', () => {
    const listBeforeEdit = requestPeopleList(0);
    expect(listBeforeEdit).toStrictEqual({ people: [{ personId: person.personId, name: 'Tam', age: 22 }] });

    const editResult = requestPersonEdit(person.personId, 'valid', 20);
    expect(editResult).toStrictEqual({});

    const listAfterEdit = requestPeopleList(0);
    expect(listAfterEdit).toStrictEqual({ people: [{ personId: person.personId, name: 'valid', age: 20 }] });
  });

  test('editing just age is okay', () => {
    const listBeforeEdit = requestPeopleList(0);
    expect(listBeforeEdit).toStrictEqual({ people: [{ personId: person.personId, name: 'Tam', age: 22 }] });

    const editResult = requestPersonEdit(person.personId, 'Tam', 20);
    expect(editResult).toStrictEqual({});

    const listAfterEdit = requestPeopleList(0);
    expect(listAfterEdit).toStrictEqual({ people: [{ personId: person.personId, name: 'Tam', age: 20 }] });
  });
});

describe('DELETE person/:personid', () => {
  let person: PersonAddReturn;
  beforeEach(() => {
    person = requestPeopleAdd('Tam', 22);
  });

  describe('error', () => {
    test('does not exist', () => {
      const res = requestPersonRemove(person.personId + 1);

      expect(res).toStrictEqual(makeCustomErrorForTest(400, INVALID_PERSON_ID));
    });

    test('double remove', () => {
      const firstRemoveRes = requestPersonRemove(person.personId);
      expect(firstRemoveRes).toStrictEqual({});

      const secondRemoveRes = requestPersonRemove(person.personId);
      expect(secondRemoveRes).toStrictEqual(makeCustomErrorForTest(400, INVALID_PERSON_ID));
    });
  });

  test('successful remove updates list', () => {
    const listBeforeEdit = requestPeopleList(0);
    expect(listBeforeEdit).toStrictEqual({ people: [{ personId: person.personId, name: 'Tam', age: 22 }] });

    const res = requestPersonRemove(person.personId);
    expect(res).toStrictEqual({});

    const listAfterEdit = requestPeopleList(0);
    expect(listAfterEdit).toStrictEqual({ people: [] });
  });
});

describe('/getstats', () => {
  describe('error', () => {
    test('empty data', () => {
      const res = requestPeopleStats();

      expect(res).toStrictEqual(makeCustomErrorForTest(400, NO_PEOPLE));
    });
  });

  test('single entry', () => {
    requestPeopleAdd('valid', 10);

    const res = requestPeopleStats();

    expect(res).toStrictEqual({
      stats: {
        minAge: 10,
        maxAge: 10,
        averageAge: 10,
      }
    });
  });

  test('multiple entries', () => {
    requestPeopleAdd('one', 1);
    requestPeopleAdd('five', 5);
    requestPeopleAdd('three', 3);
    requestPeopleAdd('two', 2);
    requestPeopleAdd('four', 4);

    const res = requestPeopleStats();

    expect(res).toStrictEqual({
      stats: {
        minAge: 1,
        maxAge: 5,
        averageAge: 3,
      }
    });
  });
});

describe('clear', () => {
  test('clear on empty', () => {
    const res = requestClear();

    expect(res).toStrictEqual({});
  });

  test('clear success', () => {
    requestPeopleAdd('one', 1);

    const clearRes = requestClear();
    expect(clearRes).toStrictEqual({});

    const listRes = requestPeopleList(0);
    expect(listRes).toStrictEqual({ people: [] });
  });
});
