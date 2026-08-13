import { describe, test, expect } from 'vitest';
import { Application, validateApplication } from './validate.ts';

describe('validateApplication', () => {
  const baseApp: Application = {
    customerId: 123456789,
    requiredCriteria: {
      age: 25,
      cleanCreditHistory: true,
      residencyVerified: true,
      stableEmployment: true,
      income: 50000,
    },
  };

  test('success - all criteria are valid', () => {
    expect(validateApplication(baseApp))
      .toBe('Data in correct format. Proceed to approval.');
  });

  test('error - age < 18', () => {
    const app = {
      ...baseApp,
      requiredCriteria: { ...baseApp.requiredCriteria, age: 17 },
    };
    expect(() => validateApplication(app))
      .toThrow('Customer is underage.');
  });

  test("error - income < 30000", () => {
    const app = {
      ...baseApp,
      requiredCriteria: { ...baseApp.requiredCriteria, income: 29000 },
    };
    expect(() => validateApplication(app))
      .toThrow("Income of '29000' insufficient.");
  });

  test("error - customerId is not 9 digits", () => {
    const app = { ...baseApp, customerId: 12345 };
    expect(() => validateApplication(app))
      .toThrow("Provided customerId '12345' not in range.");
  });

  test('error - one required field is missing', () => {
    const incompleteApp: Application = {
      customerId: 123456789,
      requiredCriteria: {
        age: 25,
        cleanCreditHistory: true,
        residencyVerified: true,
        stableEmployment: true,
        // missing income
      },
    };

    const expectedMessage =
      "Incomplete application. Missing field/s; 'income'.";
    expect(() => validateApplication(incompleteApp)).toThrow(expectedMessage);
  });

  test('error - multiple fields are missing + correctly alphabetized', () => {
    const incompleteApp: Application = {
      customerId: 123456789,
      requiredCriteria: { },
    };

    const expectedMessage =
      "Incomplete application. Missing field/s; 'age', 'cleanCreditHistory', 'income', 'residencyVerified', 'stableEmployment'.";
    expect(() => validateApplication(incompleteApp)).toThrow(expectedMessage);
  });
});
