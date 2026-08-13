import { describe, test, expect } from 'vitest';
import {
  reverseString,
  charFrequency,
  secondLargestUnique,
} from './assorted';

describe('reverseString', () => {
  test.each([
    { input: 'hello', expected: 'olleh' },
    { input: 'JavaScript', expected: 'tpircSavaJ' },
    { input: 'a', expected: 'a' },
    { input: '', expected: '' },
    { input: '12345', expected: '54321' },
    { input: 'racecar', expected: 'racecar' },
  ])('reverseString($input) => $expected', ({ input, expected }) => {
    expect(reverseString(input)).toBe(expected);
  });
});

describe('charFrequency', () => {
  test.each([
    {
      input: 'hello',
      expected: { h: 1, e: 1, l: 2, o: 1 },
    },
    {
      input: 'WORLD',
      expected: { w: 1, o: 1, r: 1, l: 1, d: 1 },
    },
    {
      input: 'aabbc',
      expected: { a: 2, b: 2, c: 1 },
    },
    {
      input: 'AaBbC',
      expected: { a: 2, b: 2, c: 1 },
    },
    {
      input: 'JavaScript',
      expected: { j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1 },
    },
    {
      input: '',
      expected: {},
    },
  ])('charFrequency($input) => $expected', ({ input, expected }) => {
    expect(charFrequency(input)).toStrictEqual(expected);
  });
});

describe('secondLargestUnique', () => {
  test.each([
    { input: [1, 2, 3], expected: 2 },
    { input: [1, 2, 2, 3], expected: 1 },
    { input: [4, 2, 7, 7, 5, 2], expected: 4 },
  ])('secondLargestUnique($input) => $expected', ({ input, expected }) => {
    expect(secondLargestUnique(input)).toBe(expected);
  });

  test.each([
    { input: [] },
    { input: [1] },
    { input: [1, 1, 2, 2] },
    { input: [1, 1, 2, 2, 3, 3] },
  ])('secondLargestUnique($input) => undefined', ({ input }) => {
    expect(secondLargestUnique(input)).toBeUndefined();
  });
});
