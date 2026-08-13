// ============================================================================ //
// Implement HTTP Tests for the '/thiscord/notify' route for 100% coverage.
// ============================================================================ //
import { describe, test } from 'vitest';
import request from 'sync-request-curl';

import config from './config.json' with { type: "json" };

const SERVER_URL = `${config.url}:${config.port}`;

describe('tests', () => {
  test.todo('Write tests for 100% statement coverage');
});
