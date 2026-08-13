///////////////////////////////////////////////////////////////////////////////
// Types
///////////////////////////////////////////////////////////////////////////////

export type PlayerOutcome =
  | 'Champion'
  | 'Qualified'
  | 'Continue Playing'
  | 'Eliminated';

export type ProblemStatus = 'SOLVED' | 'UNSOLVED';

export interface Result {
  problems: ProblemStatus[];
  totalScore: number;
  penaltyTime: number;
  rank: number;
  disqualified: boolean;
}

///////////////////////////////////////////////////////////////////////////////
// Data
///////////////////////////////////////////////////////////////////////////////

const sampleResult: Result = {
  problems: ['SOLVED', 'UNSOLVED', 'SOLVED', 'UNSOLVED', 'SOLVED'],
  totalScore: 60,
  penaltyTime: 20,
  rank: 3,
  disqualified: false,
};

///////////////////////////////////////////////////////////////////////////////
// Function
///////////////////////////////////////////////////////////////////////////////

export function determineOutcome(result: Result): PlayerOutcome {
  // Count solved problems
  const solvedCount = result.problems.filter(p => p === 'SOLVED').length;

  // Disqualified overrides everything
  if (result.disqualified) {
    return 'Eliminated';
  }
  if (result.penaltyTime >= 120) {
    return 'Eliminated';
  }

  // Champion condition
  if (
    result.rank === 1 &&
    solvedCount >= 5 &&
    result.totalScore >= 90 &&
    result.penaltyTime < 50
  ) {
    return 'Champion';
  }

  // Qualified condition
  if (result.totalScore >= 70 && solvedCount >= 5) {
    return 'Qualified';
  }

  // Continue Playing condition (matches provided logic structure)
  if (result.totalScore >= 40 || solvedCount >= 3) {
    return 'Continue Playing';
  }

  // Otherwise eliminated
  return 'Eliminated';
}
