import { writeFileSync } from "fs";
import path from 'path';
import { describe, test, expect } from 'vitest';

import { decontaminate } from './cockroaches';

interface Locations {
  [filename: string]: string[];
};

const LOCATION_DIR = 'locations';

describe('dryrun', () => {
  /**
   * @param cockroaches an object of the form
   * {
   *     'monday.txt': ['kitchen', 'attic', 'bathroom'],
   *     'tuesday.txt': ['kitchen', 'bedroom', 'backyard'],
   * }
   */
  function generateFiles(cockroaches: Locations): void {
    for (const filename of Object.keys(cockroaches)) {
      writeFileSync(path.join(LOCATION_DIR, filename), cockroaches[filename].join('\n'));
    }
  }

  test('example', () => {
    generateFiles({
      'monday.txt': ['kitchen', 'attic', 'bathroom'],
      'tuesday.txt': ['kitchen', 'backyard'],
    });
    const files = ['monday.txt', 'tuesday.txt'];
    expect(decontaminate(files)).toStrictEqual({ attic: 1, bathroom: 1, backyard: 1, bedroom: 0, kitchen: 2 });
  });
});
