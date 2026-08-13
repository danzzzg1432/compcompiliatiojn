///////////////////////////////////////////////////////////////////////////////
// Interface and Constants
///////////////////////////////////////////////////////////////////////////////

export interface AstronautProfile {
  name?: string;
  astronautId?: string;
  role?: string;
  flightHours?: number;
  medicalClearance?: boolean;
  certifications?: string[];
}

export const requiredFields: (keyof AstronautProfile)[] = [
  "name",
  "astronautId",
  "role",
  "flightHours",
  "medicalClearance",
  "certifications"
];

// Astronaut ID consists of 6 uppercase alphanumeric characters
export const astronautIdRegex = /^[A-Z0-9]{6}$/;
