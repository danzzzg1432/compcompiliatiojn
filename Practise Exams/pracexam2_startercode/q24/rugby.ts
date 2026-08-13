///////////////////////////////////////////////////////////////////////////////
// Consts and Types
///////////////////////////////////////////////////////////////////////////////

const Groups = ['A', 'B', 'C', 'D'];
// Equivalent to: type GroupName = 'A' | 'B' | 'C' | 'D';
type GroupName = typeof Groups[number];

const Countries = [
  'Australia',
  'New Zealand',
  'Chile',
  'Hong Kong',
  'Fiji',
  'South Africa',
  'Argentina',
  'Ireland',
];
// Equivalent to: type Country = 'Australia' | 'Fiji' | 'Ireland' ...;
type Country = typeof Countries[number];

export interface MatchStats {
  team1Points: number;
  team2Points: number;
  team1Possession: number;
  team2Possession: number;
}

export interface Match {
  matchId: number;
  group: GroupName;
  team1: Country;
  team2: Country;
  venue: string;
  // Dates are formated as `YYYY-MM-DD`
  date: string;
  stats: MatchStats;
}

// TODO: add any additional interfaces here!

///////////////////////////////////////////////////////////////////////////////
// Data
///////////////////////////////////////////////////////////////////////////////

// TODO: modify as you'd like:
const matches: Match[] = [];

// Simple regex to match: YYYY-MM-DD all numbers (no validation)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

///////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////

export function matchAdd(group: string, team1: string, team2: string, venue: string, date: string, stats: MatchStats) {
  // Check valid group name
  if (!Groups.includes(group)) {
    return { error: 'INVALID_GROUP', message: `Group '${group}' is not in ${Groups}` };
  }

  // Team1 and Team2 must be valid and different countries
  if (!Countries.includes(team1) || !Countries.includes(team2)) {
    return {
      error: 'INVALID_TEAMS',
      message: `${team1} and ${team2} must be valid countries i.e. ${Countries}`
    };
  }
  if (team1 === team2) {
    return {
      error: 'INVALID_TEAMS',
      message: `${team1} vs ${team2} must be different countries`
    };
  }

  // Check date format
  if (!dateRegex.test(date)) {
    return { error: 'INVALID_DATE', message: `${date} not in YYYY-MM-DD format` };
  }
  const parseDate = Date.parse(date);
  if (isNaN(parseDate)) {
    return { error: 'INVALID_DATE', message: `${date} is not a valid date` };
  }

  // goals must be >= 0
  if (stats.team1Points < 0 || stats.team2Points < 0) {
    return { error: 'INVALID_POINTS', message: 'points must be >= 0' };
  }

  // possession range check
  if (
    stats.team1Possession < 0 || stats.team1Possession > 100 ||
    stats.team2Possession < 0 || stats.team2Possession > 100
  ) {
    return {
      error: 'INVALID_POSSESSION',
      message: 'possession must be between 0-100'
    };
  }

  // total possession must equal 100
  if (stats.team1Possession + stats.team2Possession !== 100) {
    return {
      error: 'INVALID_TOTAL_POSSESSION',
      message: 'team1Possession + team2Possession must equal exactly 100'
    };
  }

  // All checks pass - add match
  const matchId = matches.length;

  matches.push({
    matchId,
    group,
    team1,
    team2,
    venue,
    date,
    stats,
  });

  return { matchId };
}

export function matchList() {
  const matchList = matches.map( m => ({
    matchId: m.matchId,
    group: m.group,
    team1: m.team1,
    team2: m.team2,
    venue: m.venue,
    date: m.date,
    stats: m.stats,
  }));

  return { matches: matchList };
}

export function matchSearch(country?: string, group?: string, tied?: boolean) {
  // *! Hint: country, group, tied can be passed in as `undefined`
  // * For example: to search based on country ONLY
  // *   matchSearch('Australia', undefined, undefined)

  // TODO: complete me!
  return { matches: [] };
}

export function matchRemove(matchId: number) {
  // TODO: complete me!
  return {};
}

export function clear() {
  matches.length = 0;
  return {};
}