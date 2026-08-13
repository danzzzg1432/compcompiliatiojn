import { describe, test, expect } from 'vitest';
import { processCrewApproval } from "../process";
import { AstronautProfile } from "../util";

describe("processCrewApproval()", () => {

  test("returns approved=true when astronaut is valid", () => {
    const input: AstronautProfile[] = [
      {
        name: "Alice",
        astronautId: "ABC123",
        role: "Engineer",
        flightHours: 2000,
        medicalClearance: true,
        certifications: ["Lunar Navigation"]
      }
    ];

    const result = processCrewApproval(input);

    expect(result).toEqual([
      {
        astronautId: "ABC123",
        name: "Alice",
        approved: true,
        reason: "Astronaut cleared for mission.",
      },
    ]);
  });

  test("returns approved=false when validation fails (insufficient flight hours)", () => {
    const input: AstronautProfile[] = [
      {
        name: "Bob",
        astronautId: "XYZ999",
        role: "Engineer",
        flightHours: 1,
        medicalClearance: true,
        certifications: ["Lunar Navigation"]
      }
    ];

    const result = processCrewApproval(input);

    expect(result).toEqual([
      {
        astronautId: "XYZ999",
        name: "Bob",
        approved: false,
        reason: "Astronaut flight hours '1' insufficient for mission.",
      },
    ]);
  });

  test("processes multiple astronauts and preserves order", () => {
    const input: AstronautProfile[] = [
      {
        name: "Alice",
        astronautId: "AAA111",
        role: "Scientist",
        flightHours: 1500,
        medicalClearance: true,
        certifications: ["Lunar Navigation"]
      },
      {
        name: "Bob",
        astronautId: "BBB222",
        role: "Engineer",
        flightHours: 500,
        medicalClearance: true,
        certifications: ["Lunar Navigation"]
      },
      {
        name: "Carl",
        astronautId: "CCC333",
        role: "Pilot",
        flightHours: 1900,
        medicalClearance: true,
        certifications: ["Lunar Navigation"]
      },
    ];

    const result = processCrewApproval(input);

    expect(result).toEqual([
      {
        astronautId: "AAA111",
        name: "Alice",
        approved: true,
        reason: "Astronaut cleared for mission.",
      },
      {
        astronautId: "BBB222",
        name: "Bob",
        approved: false,
        reason: "Astronaut flight hours '500' insufficient for mission.",
      },
      {
        astronautId: "CCC333",
        name: "Carl",
        approved: false,
        reason: "Pilot must have 'Docking' certification.",
      },
    ]);
  });

  test("handles mixed success and failure conditions", () => {
    const input: AstronautProfile[] = [
      {
        name: "Valid Astronaut",
        astronautId: "VALID1",
        role: "Engineer",
        flightHours: 2000,
        medicalClearance: true,
        certifications: ["Lunar Navigation", "Docking"],
      },
      {
        name: "Low Hours",
        astronautId: "LOW123",
        role: "Engineer",
        flightHours: 500,
        medicalClearance: true,
        certifications: ["Lunar Navigation"],
      },
      {
        name: "Bad ID",
        astronautId: "abc12",
        role: "Engineer",
        flightHours: 2000,
        medicalClearance: true,
        certifications: ["Lunar Navigation"],
      },
      {
        name: "Valid Astronaut 2",
        astronautId: "VALID2",
        role: "Engineer",
        flightHours: 2000,
        medicalClearance: true,
        certifications: ["Lunar Navigation", "Docking"],
      },
      {
        name: "Pilot Fail",
        astronautId: "PIL123",
        role: "Pilot",
        flightHours: 2000,
        medicalClearance: true,
        certifications: ["Lunar Navigation"],
      },
      {
        astronautId: "MIS123",
        flightHours: 2000,
        medicalClearance: true,
        certifications: ["Lunar Navigation"],
      },
    ];

    const result = processCrewApproval(input);

    expect(result).toEqual([
      {
        astronautId: "VALID1",
        name: "Valid Astronaut",
        approved: true,
        reason: "Astronaut cleared for mission.",
      },
      {
        astronautId: "LOW123",
        name: "Low Hours",
        approved: false,
        reason: "Astronaut flight hours '500' insufficient for mission.",
      },
      {
        astronautId: "abc12",
        name: "Bad ID",
        approved: false,
        reason: "Provided astronautId 'abc12' invalid format.",
      },
      {
        astronautId: "VALID2",
        name: "Valid Astronaut 2",
        approved: true,
        reason: "Astronaut cleared for mission.",
      },
      {
        astronautId: "PIL123",
        name: "Pilot Fail",
        approved: false,
        reason: "Pilot must have 'Docking' certification.",
      },
      {
        astronautId: "MIS123",
        name: undefined,
        approved: false,
        reason:
          "Incomplete astronaut profile. Missing fields; 'name', 'role'.",
      },
    ]);
  });

});