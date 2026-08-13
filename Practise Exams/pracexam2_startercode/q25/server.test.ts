import { test } from 'vitest';

import request from 'sync-request-curl';
import { port, url } from './config.json';

const SERVER_URL = `${url}:${port}`;

test.todo('Write tests for 100% statement coverage for the `/player/outcome` route');
