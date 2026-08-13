import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import { port, url } from './config.json';
import { MatchStats } from './rugby';

const SERVER_URL = `${url}:${port}`;

///////////////////////////////////////////////////////////////////////////////
// Request Helpers
///////////////////////////////////////////////////////////////////////////////

export function clear() {
  const res = request('DELETE', SERVER_URL + '/clear');
  return { status: res.statusCode, body: res.getJSON() };
}

export function matchAdd(group: string, team1: string, team2: string, venue: string, date: string, stats: MatchStats) {
  const res = request('POST', SERVER_URL + '/match/add', { json: { group, team1, team2, venue, date, stats } });
  return { status: res.statusCode, body: res.getJSON() };
}

export function matchList() {
  const res = request('GET', SERVER_URL + '/match/list');
  return { status: res.statusCode, body: res.getJSON() };
}

export function matchSearch(country?: string, group?: string, tied?: boolean) {
  const res = request('GET', SERVER_URL + `/match/search`, { qs: { country, group, tied }});
  return { status: res.statusCode, body: res.getJSON() };
}

export function matchRemove(matchId: number) {
  const res = request('DELETE', SERVER_URL + `/match/${matchId}`);
  return { status: res.statusCode, body: res.getJSON() };
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////

const validMatch = {
  group: 'A',
  team1: 'Australia',
  team2: 'Fiji',
  venue: 'AfterPay Stadium',
  date: '2026-06-10'
};

const validStats = {
  team1Points: 0,
  team2Points: 0,
  team1Possession: 50,
  team2Possession: 50
};

///////////////////////////////////////////////////////////////////////////////
// Test Setup
///////////////////////////////////////////////////////////////////////////////

beforeEach(() => {
  clear();
});

///////////////////////////////////////////////////////////////////////////////
// matchAdd
///////////////////////////////////////////////////////////////////////////////

describe('matchAdd', () => {
  describe('errors', () => {
    test('invalid group', () => {
      const { status, body } = matchAdd(
        'Z',
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      );

      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_GROUP',
        message: expect.any(String)
      });
    });

    test('same teams', () => {
      const { status, body } = matchAdd(
        validMatch.group,
        'Australia',
        'Australia',
        validMatch.venue,
        validMatch.date,
        validStats
      );

      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_TEAMS',
        message: expect.any(String)
      });
    });

    test('invalid date format', () => {
      const { status, body } = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        '10-06-2026',
        validStats
      );

      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_DATE',
        message: expect.any(String)
      });
    });

    test('invalid calendar date', () => {
      const { status, body } = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        '32-13-0000',
        validStats
      );

      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_DATE',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('creates match and returns id', () => {
      const { status, body } = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matchId: expect.any(Number)
      });
    });

    test('match appears in list with provided stats', () => {
      const id = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      ).body.matchId;

      const { status, body } = matchList();

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: [
          {
            matchId: id,
            ...validMatch,
            stats: validStats
          }
        ]
      });
    });
  });
});

///////////////////////////////////////////////////////////////////////////////
// matchList
///////////////////////////////////////////////////////////////////////////////

describe('matchList', () => {
  test('empty list initially', () => {
    const { status, body } = matchList();
    expect(status).toBe(200);
    expect(body).toStrictEqual({ matches: [] });
  });

  test('returns matches in creation order', () => {
    const { matchId: id1 } = matchAdd(
      validMatch.group,
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    ).body;

    const { matchId: id2 } = matchAdd(
      'B',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    ).body;

    const { status, body } = matchList();

    expect(status).toBe(200);
    expect(body.matches[0].matchId).toBe(id1);
    expect(body.matches[1].matchId).toBe(id2);
  });
});
///////////////////////////////////////////////////////////////////////////////
// matchSearch
///////////////////////////////////////////////////////////////////////////////

describe('matchSearch', () => {

  describe('errors', () => {
    test('invalid country', () => {
      const { status, body } = matchSearch('NON_EXISTENT_COUNTRY');
      expect(status).toBe(400);
      expect(body).toStrictEqual({ error: 'INVALID_COUNTRY', message: expect.any(String) });
    });

    test('invalid group', () => {
      const { status, body } = matchSearch('Fiji', 'NON_EXISTENT_GROUP');
      expect(status).toBe(400);
      expect(body).toStrictEqual({ error: 'INVALID_GROUP', message: expect.any(String) });
    });
  });

  describe('success', () => {
    test('empty search returns all matches', () => {
      const { matchId: id1 } = matchAdd(
        'A',
        'Australia',
        'Fiji',
        'Stadium',
        '2026-06-10',
        validStats
      ).body;

      const { matchId: id2 } = matchAdd(
        'B',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        validStats
      ).body;

      const { status, body } = matchSearch();

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: [
          {
            matchId: id1,
            group: 'A',
            team1: 'Australia',
            team2: 'Fiji',
            venue: 'Stadium',
            date: '2026-06-10',
            stats: validStats,
          },
          {
            matchId: id2,
            group: 'B',
            team1: 'Ireland',
            team2: 'Argentina',
            venue: 'Arena',
            date: '2026-06-11',
            stats: validStats,
          }
        ]
      });
    });

    test('filter by country (team appears in match)', () => {
      const { matchId: id1 } = matchAdd(
        'A',
        'Australia',
        'Fiji',
        'Stadium',
        '2026-06-10',
        validStats
      ).body;

      matchAdd(
        'B',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        validStats
      );

      const { status, body } = matchSearch('Fiji');

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: [
          {
            matchId: id1,
            group: 'A',
            team1: 'Australia',
            team2: 'Fiji',
            venue: 'Stadium',
            date: '2026-06-10',
            stats: validStats,
          }
        ]
      });
    });

    test('filter by group', () => {
      matchAdd(
        'A',
        'Australia',
        'Fiji',
        'Stadium',
        '2026-06-10',
        validStats
      );

      const { matchId: id2 } =  matchAdd(
        'B',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        validStats
      ).body;

      const { status, body } = matchSearch(undefined, 'B');

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: [
          {
            matchId: id2,
            group: 'B',
            team1: 'Ireland',
            team2: 'Argentina',
            venue: 'Arena',
            date: '2026-06-11',
            stats: validStats,
          }
        ]
      });
    });

    test('filter by Points tied', () => {
      const { matchId: id1 } = matchAdd(
        'A',
        'Australia',
        'Fiji',
        'Stadium',
        '2026-06-10',
        {
          team1Points: 1,
          team2Points: 1,
          team1Possession: 50,
          team2Possession: 50,
        }
      ).body;

      const { matchId: id2 } = matchAdd(
        'B',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        {
          team1Points: 0,
          team2Points: 1,
          team1Possession: 50,
          team2Possession: 50,
        }
      ).body;

      const { status, body } = matchSearch(undefined, undefined, true);

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: [
          {
            matchId: id1,
            group: 'A',
            team1: 'Australia',
            team2: 'Fiji',
            venue: 'Stadium',
            date: '2026-06-10',
            stats: {
              team1Points: 1,
              team2Points: 1,
              team1Possession: 50,
              team2Possession: 50,
            },
          }
        ]
      });
    });

    test('combined filters', () => {
      const { matchId: id1 } = matchAdd(
        'A',
        'Australia',
        'Fiji',
        'Stadium',
        '2026-06-10',
        {
          team1Points: 1,
          team2Points: 1,
          team1Possession: 50,
          team2Possession: 50,
        }
      ).body;

      matchAdd(
        'A',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        validStats
      );

      matchAdd(
        'B',
        'Australia',
        'Spain',
        'Arena',
        '2026-06-12',
        validStats
      );

      const { status, body } = matchSearch('Australia', 'A', true);

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: [
          {
            matchId: id1,
            group: 'A',
            team1: 'Australia',
            team2: 'Fiji',
            venue: 'Stadium',
            date: '2026-06-10',
            stats: {
              team1Points: 1,
              team2Points: 1,
              team1Possession: 50,
              team2Possession: 50,
            },
          }
        ]
      });
    });

    test('no matches found', () => {
      matchAdd(
        'A',
        'Australia',
        'Fiji',
        'Stadium',
        '2026-06-10',
        validStats
      );

      const { status, body } = matchSearch('Ireland');

      expect(status).toBe(200);
      expect(body).toStrictEqual({
        matches: []
      });
    });
  });
});

///////////////////////////////////////////////////////////////////////////////
// matchRemove
///////////////////////////////////////////////////////////////////////////////

describe('matchRemove', () => {
  let id: number;

  beforeEach(() => {
    id = matchAdd(
      validMatch.group,
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    ).body.matchId;
  });

  describe('errors', () => {
    test('invalid match id', () => {
      const { status, body } = matchRemove(999);

      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_MATCH_ID',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('deletes match', () => {
      const { status, body } = matchRemove(id);

      expect(status).toBe(200);
      expect(body).toStrictEqual({});
    });

    test('deleted match no longer appears', () => {
      matchRemove(id);

      const { status, body } = matchList();

      expect(status).toBe(200);
      expect(body).toStrictEqual({ matches: [] });
    });

    test('deleting one does not affect others', () => {
      const { matchId: id2 } = matchAdd(
        'B',
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      ).body;

      matchRemove(id);

      const { status, body } = matchList();

      expect(status).toBe(200);
      expect(body.matches.length).toBe(1);
      expect(body.matches[0].matchId).toBe(id2);
    });
  });

  test('ids remain unique after deletion (no ID reuse)', () => {
    const { matchId: id1 } = matchAdd(
      'A',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    ).body;

    matchRemove(id1);

    matchAdd(
      'A',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    );

    const { status, body } = matchList();

    expect(status).toBe(200);
    const ids = body.matches.map((m: any) => m.matchId);

    expect(new Set(ids).size).toBe(ids.length);
  });
});

///////////////////////////////////////////////////////////////////////////////
// clear
///////////////////////////////////////////////////////////////////////////////

describe('clear', () => {
  test('return value', () => {
    const { status, body } = clear();

    expect(status).toBe(200);
    expect(body).toStrictEqual({});
  });

  test('clears all matches', () => {
    matchAdd(
      validMatch.group,
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    );

    matchAdd(
      'B',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    );

    clear();

    const { status, body } = matchList();
    expect(status).toBe(200);
    expect(body).toStrictEqual({ matches: [] });
  });
});
