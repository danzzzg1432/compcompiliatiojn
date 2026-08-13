import { describe, test, expect, beforeEach } from 'vitest';
import {
  matchAdd,
  matchList,
  matchRemove,
  clear,
  matchSearch,
} from './rugby';

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
      const result = matchAdd(
        'Z',
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      );

      expect(result).toStrictEqual({
        error: 'INVALID_GROUP',
        message: expect.any(String)
      });
    });

    test('same teams', () => {
      const result = matchAdd(
        validMatch.group,
        'Australia',
        'Australia',
        validMatch.venue,
        validMatch.date,
        validStats
      );

      expect(result).toStrictEqual({
        error: 'INVALID_TEAMS',
        message: expect.any(String)
      });
    });

    test('invalid date format', () => {
      const result = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        '10-06-2026',
        validStats
      );

      expect(result).toStrictEqual({
        error: 'INVALID_DATE',
        message: expect.any(String)
      });
    });

    test('invalid calendar date', () => {
      const result = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        '32-13-0000',
        validStats
      );

      expect(result).toStrictEqual({
        error: 'INVALID_DATE',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('creates match and returns id', () => {
      const result = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      );

      expect(result).toStrictEqual({
        matchId: expect.any(Number)
      });
    });

    test('match appears in list with provided stats', () => {
      const { matchId: id } = matchAdd(
        validMatch.group,
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      );

      const result = matchList();

      expect(result).toStrictEqual({
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
    const result = matchList();
    expect(result).toStrictEqual({ matches: [] });
  });

  test('returns matches in creation order', () => {
    const { matchId: id1 } = matchAdd(
      validMatch.group,
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    );

    const { matchId: id2 } = matchAdd(
      'B',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    );

    const result = matchList();

    expect(result.matches[0]?.matchId).toBe(id1);
    expect(result.matches[1]?.matchId).toBe(id2);
  });
});
///////////////////////////////////////////////////////////////////////////////
// matchSearch
///////////////////////////////////////////////////////////////////////////////

describe('matchSearch', () => {

  describe('errors', () => {
    test('invalid country', () => {
      const result = matchSearch('NON_EXISTENT_COUNTRY');
      expect(result).toStrictEqual({ error: 'INVALID_COUNTRY', message: expect.any(String) });
    });

    test('invalid group', () => {
      const result = matchSearch('Fiji', 'NON_EXISTENT_GROUP');
      expect(result).toStrictEqual({ error: 'INVALID_GROUP', message: expect.any(String) });
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
      );

      const { matchId: id2 } = matchAdd(
        'B',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        validStats
      );

      const result = matchSearch();

      expect(result).toStrictEqual({
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
      );

      matchAdd(
        'B',
        'Ireland',
        'Argentina',
        'Arena',
        '2026-06-11',
        validStats
      );

      const result = matchSearch('Fiji');

      expect(result).toStrictEqual({
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
      );

      const result = matchSearch(undefined, 'B');

      expect(result).toStrictEqual({
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
      );

      matchAdd(
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
      );

      const result = matchSearch(undefined, undefined, true);

      expect(result).toStrictEqual({
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
      );

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

      const result = matchSearch('Australia', 'A', true);

      expect(result).toStrictEqual({
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

      const result = matchSearch('Ireland');

      expect(result).toStrictEqual({
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
    ).matchId as number;
  });

  describe('errors', () => {
    test('invalid match id', () => {
      const result = matchRemove(999);
      expect(result).toStrictEqual({
        error: 'INVALID_MATCH_ID',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('deletes match', () => {
      const result = matchRemove(id);
      expect(result).toStrictEqual({});
    });

    test('deleted match no longer appears', () => {
      matchRemove(id);

      const result = matchList();
      expect(result).toStrictEqual({ matches: [] });
    });

    test('deleting one does not affect others', () => {
      const { matchId: id2 } = matchAdd(
        'B',
        validMatch.team1,
        validMatch.team2,
        validMatch.venue,
        validMatch.date,
        validStats
      );

      matchRemove(id);

      const result = matchList();
      expect(result.matches.length).toBe(1);
      expect(result.matches[0]?.matchId).toBe(id2);
    });
  });

  test('ids remain unique after deletion (no ID reuse)', () => {
    const id1 = matchAdd(
      'A',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    ).matchId as number;

    matchRemove(id1);

    matchAdd(
      'A',
      validMatch.team1,
      validMatch.team2,
      validMatch.venue,
      validMatch.date,
      validStats
    );

    const result = matchList();
    const ids = result.matches.map((m: any) => m.matchId);

    expect(new Set(ids).size).toBe(ids.length);
  });
});

///////////////////////////////////////////////////////////////////////////////
// clear
///////////////////////////////////////////////////////////////////////////////

describe('clear', () => {
  test('return value', () => {
    const result = clear();
    expect(result).toStrictEqual({});
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

    const result = matchList();
    expect(result).toStrictEqual({ matches: [] });
  });
});