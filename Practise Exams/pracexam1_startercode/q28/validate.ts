export interface Application {
  customerId: number;
  requiredCriteria: {
    age?: number;
    cleanCreditHistory?: true;
    residencyVerified?: true;
    stableEmployment?: true;
    income?: number;
  }
}

/**
 * Validates a single credit card application against specific criteria.
 */
export function validateApplication(application: Application) {
  // TODO: complete me
  return 'Data in correct format. Proceed to approval.';
}
