import { describe, test, expect } from 'vitest';
import { listObjections, Objection, ExaminationType } from './objection';

describe('errors', () => {
  test('throws for an empty question', () => {
    expect(() => listObjections('', 'testimony', ExaminationType.DIRECT))
      .toThrow(Error);
  });

  test('throws for an empty testimony', () => {
    expect(() => listObjections('question', '', ExaminationType.DIRECT))
      .toThrow(Error);
  });
});

describe('argumentative', () => {
  test.each([
    {
      question: 'Is the sky blue',
      testimony: 'The sky is blue',
      type: ExaminationType.CROSS,
      objections: new Set([Objection.ARGUMENTATIVE]),
    },
    {
      question: 'Is the sky blue',
      testimony: 'The sky is blue',
      type: ExaminationType.DIRECT,
      objections: new Set([]),
    },
    {
      question: 'Is the sky blue?',
      testimony: 'The sky is blue',
      type: ExaminationType.CROSS,
      objections: new Set([]),
    },
  ])('$question during $type', ({ question, testimony, type, objections }) => {
    expect(listObjections(question, testimony, type)).toEqual(objections);
  });
});

describe('compound', () => {
  test('returns compound for more than one question mark', () => {
    expect(listObjections(
      'Was it red? Or blue?',
      'It was red',
      ExaminationType.CROSS
    )).toEqual(new Set([Objection.COMPOUND]));
  });
});

describe('hearsay', () => {
  test.each([
    'I HEARD FROM Sam about what happened',
    'Sam told me what happened',
  ])('returns hearsay for "%s"', (testimony) => {
    expect(listObjections(
      'What happened?',
      testimony,
      ExaminationType.DIRECT
    )).toEqual(new Set([Objection.HEARSAY]));
  });
});

describe('leading', () => {
  test.each([
    ['WHY DID YOU leave?', 'I did leave'],
    ['Do you agree with this?', 'I agree with this'],
    ['It was red, right?', 'It was red'],
    ['It was red, correct?', 'It was red'],
  ])('returns leading for "%s"', (question, testimony) => {
    expect(listObjections(question, testimony, ExaminationType.DIRECT))
      .toEqual(new Set([Objection.LEADING]));
  });
});

describe('non-responsive', () => {
  test('returns non-responsive when no exact word is shared', () => {
    expect(listObjections('Hello?', 'hell', ExaminationType.DIRECT))
      .toEqual(new Set([Objection.NON_RESPONSIVE]));
  });

  test('ignores punctuation when matching words', () => {
    expect(listObjections('What colour?', 'What!', ExaminationType.DIRECT))
      .toEqual(new Set([]));
  });
});

describe('relevance', () => {
  test('returns relevance when testimony is more than three times longer', () => {
    expect(listObjections(
      'Name?',
      'My name is Alexander Hamilton.',
      ExaminationType.DIRECT
    )).toEqual(new Set([Objection.RELEVANCE]));
  });
});

describe('speculation', () => {
  test('checks the testimony during direct examination', () => {
    expect(listObjections(
      'What happened?',
      'I THINK what happened',
      ExaminationType.DIRECT
    )).toEqual(new Set([Objection.SPECULATION]));
  });

  test('checks the question during cross examination', () => {
    expect(listObjections(
      'Do you think it happened?',
      'It happened',
      ExaminationType.CROSS
    )).toEqual(new Set([Objection.SPECULATION]));
  });
});

test('returns multiple objections together', () => {
  expect(listObjections(
    'Do you think so??',
    'I heard from a witness, who told me an entirely different and very long story.',
    ExaminationType.CROSS
  )).toEqual(new Set([
    Objection.COMPOUND,
    Objection.HEARSAY,
    Objection.NON_RESPONSIVE,
    Objection.RELEVANCE,
    Objection.SPECULATION,
  ]));
});
