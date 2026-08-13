import { describe, test, expect } from 'vitest';
import { AstronautProfile } from '../util';
import { validateAstronaut } from '../validate';

describe('validateAstronaut', () => {
  const baseAstronaut: AstronautProfile = {
    name: "Jordan Lee",
    astronautId: "AB12CD",
    role: "Pilot",
    flightHours: 2000,
    medicalClearance: true,
    certifications: ["EVA", "Docking", "Lunar Navigation"],
  };

  test('success - astronaut meets all requirements', () => {
    expect(validateAstronaut(baseAstronaut))
      .toBe("Astronaut cleared for mission.");
  });

  test("error - insufficient flight hours (<1000)", () => {
    const astro = {
      ...baseAstronaut,
      flightHours: 900,
    };
    expect(() => validateAstronaut(astro))
      .toThrow("Astronaut flight hours '900' insufficient for mission.");
  });

  test("error - invalid astronautId format", () => {
    const astro = {
      ...baseAstronaut,
      astronautId: "abc12", // invalid (not 6 chars / not uppercase alphanumeric)
    };
    expect(() => validateAstronaut(astro))
      .toThrow("Provided astronautId 'abc12' invalid format.");
  });

  test("error - pilot missing Docking certification", () => {
    const astro = {
      ...baseAstronaut,
      certifications: ["EVA", "Lunar Navigation"],
    };
    expect(() => validateAstronaut(astro))
      .toThrow("Pilot must have 'Docking' certification.");
  });

  test('error - one required field missing', () => {
    const incomplete: AstronautProfile = {
      name: "Jordan Lee",
      astronautId: "AB12CD",
      role: "Pilot",
      flightHours: 2000,
      medicalClearance: true,
      // missing certifications
    } as any;

    const expectedMessage =
      "Incomplete astronaut profile. Missing fields; 'certifications'.";
    expect(() => validateAstronaut(incomplete)).toThrow(expectedMessage);
  });

  test('error - multiple missing fields (alphabetized)', () => {
    const incomplete: AstronautProfile = {} as any;

    const expectedMessage =
      "Incomplete astronaut profile. Missing fields; 'astronautId', 'certifications', 'flightHours', 'medicalClearance', 'name', 'role'.";
    expect(() => validateAstronaut(incomplete)).toThrow(expectedMessage);
  });
});
