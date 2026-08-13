export enum Objection {
  /**
  * By default, enum are integers 0, 1, 2, ...
  * However, we can also give them string values
  */
  ARGUMENTATIVE = 'argumentative',
  COMPOUND = 'compound',
  HEARSAY = 'hearsay',
  LEADING = 'leading',
  NON_RESPONSIVE = 'non-responsive',
  RELEVANCE = 'relevance',
  SPECULATION = 'speculation',
}

export enum ExaminationType {
  /**
    * It is also possible to specify a "start" number.
    *
    * Below would assign CROSS = 1, DIRECT = 2, the next
    * would be 3, etc.
    */
  CROSS = 1,
  DIRECT,
}

// Helper function - feel free to remove / modify.
function isArgumentative(question: string) {
  return !question.endsWith('?');
}

/**
 * Feel free to modify the function below as you see fit,
 * so long as you satisfy the specification.
 */
export function listObjections(
  question: string,
  testimony: string,
  examinationType: ExaminationType
): Set<Objection> {
  if (question === '' || testimony === '') {
    throw new Error('Question and testimony must not be empty');
  }

  // Convert given question and testimony to lowercase
  question = question.toLowerCase();
  testimony = testimony.toLowerCase();

  const objections = new Set<Objection>();

  if (examinationType === ExaminationType.CROSS) {
    if (isArgumentative(question)) {
      objections.add(Objection.ARGUMENTATIVE);
    }

    if (question.includes('think')) {
      objections.add(Objection.SPECULATION);
    }
  } else {
    // Type is ExaminationType.DIRECT

    const leadingStarts = ['why did you', 'do you agree']
      .some(phrase => question.startsWith(phrase));
    const leadingEnds = ['right?', 'correct?']
      .some(phrase => question.endsWith(phrase));

    if (leadingStarts || leadingEnds) {
      objections.add(Objection.LEADING);
    }

    if (testimony.includes('think')) {
      objections.add(Objection.SPECULATION);
    }
  }

  if ((question.match(/\?/g) ?? []).length > 1) {
    objections.add(Objection.COMPOUND);
  }

  if (['heard from', 'told me'].some(phrase => testimony.includes(phrase))) {
    objections.add(Objection.HEARSAY);
  }

  const questionWords = question
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s/)
    .filter(word => word.length > 0);
  const testimonyWords = testimony
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s/)
    .filter(word => word.length > 0);
  const testimonyWordSet = new Set(testimonyWords);

  if (!questionWords.some(word => testimonyWordSet.has(word))) {
    objections.add(Objection.NON_RESPONSIVE);
  }

  if (testimony.length > 3 * question.length) {
    objections.add(Objection.RELEVANCE);
  }

  return objections;
}
