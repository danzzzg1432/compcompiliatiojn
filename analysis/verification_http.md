# Verification, HTTP, API testing, Swagger, and coverage discovery

Scope: complete page-by-page review of:

- `Slides/03.1 - Dynamic Verification.pdf` (48 pages)
- `Slides/03.3 - Static Verification.pdf` (50 pages)
- `Slides/04.3 - HTTP Server (Part I).pdf` (14 pages)
- `Slides/05.1 - HTTP Server (Part II).pdf` (34 pages)
- `Slides/05.2 - HTTP Testing.pdf` (18 pages)
- `Slides/07.3 - Code Coverage.pdf` (13 pages)

The PDFs were text-extracted and every page was rendered and visually inspected. This is discovery material only, not a finished cheatsheet. Page numbers below are PDF page numbers.

## Highest-value likely exam areas

1. Distinguish dynamic from static verification, including when code runs and what each can/cannot establish (`03.1`, pp. 10, 15-18; `03.3`, pp. 2, 7-12, 36-39).
2. Write/read small Vitest tests using `describe`, `test`, `expect`, and matchers; select cases from the contract rather than implementation (`03.1`, pp. 22-34).
3. Interpret Typescript annotations: primitives, function parameters, unions, arrays, aliases, optional properties/parameters, object types, literal types, and why `any` defeats safety (`03.3`, pp. 15-24).
4. Explain linting as static analysis, what it can detect/fix, and its limits (`03.3`, pp. 31-48).
5. Understand the client-server/request-response model and implement/read basic Express route handlers (`04.3`, pp. 3-13; `05.1`, pp. 3-17).
6. Correctly distinguish path parameters, query parameters, and request bodies (`04.3`, pp. 12-13; `05.1`, pp. 9-14; `05.2`, pp. 3-4).
7. Map CRUD to HTTP methods and interpret status-code classes/common codes (`05.1`, pp. 18-30; `05.2`, pp. 5-6, 13, 17).
8. Explain API/REST contracts and test HTTP endpoints programmatically (`05.1`, pp. 25-33; `05.2`, pp. 7-17).
9. Distinguish feature/test coverage from executable code coverage; read statement/branch/function/line metrics and prioritise uncovered branches (`03.1`, pp. 36-46).
10. Explain why Vitest coverage is 0% for an independently running Express process and use `c8` to instrument the server (`07.3`, pp. 2-12).
11. State what Swagger/OpenAPI documents and how Swagger UI is served (`05.2`, pp. 14-17).

## 1. Dynamic verification and testing

### Definitions and distinctions

- Software testing is evaluating and verifying that a product/application does what it is supposed to do. Claimed benefits: preventing bugs, lowering development costs, and improving performance. Testing often runs in parallel with development (`03.1`, pp. 6-7).
- Test categories and the question each answers (`03.1`, pp. 8-9):
  - acceptance: does it meet business requirements?
  - integration: do parts work together?
  - unit: do individual methods/components work?
  - usability: is it good to use?
  - functional: does it produce the required output?
  - performance: is it fast enough?
- Dynamic verification executes the system with test data and observes operational behaviour: runtime checks (`03.1`, p. 10).
- Static verification checks properties without executing the program: compile-time checks; examples named are type correctness, control flow, Typescript, and linting (`03.1`, pp. 10, 15; `03.3`, pp. 36-39).
- Static verification is described as generally more robust/reliable, but limited because not everything can be verified statically (`03.1`, p. 15).
- Safety means preventing accidental misuse; security means preventing deliberate misuse (`03.1`, p. 11). Unexpected/unintended permitted behaviour makes software unsafe (`03.1`, p. 12).
- Javascript is presented as memory-safe because it dynamically prevents uninitialised/unallocated memory access; C has no array bounds check and permits bad pointer dereferences, trading safety for performance (`03.1`, p. 14).
- Testing in the small means isolated unit/component/function tests (`03.1`, pp. 16-17). Testing in the large exposes faults in integrated systems and includes module tests, integration tests, and whole-system tests (`03.1`, pp. 16, 18).
- Important limit: testing shows the presence, not the absence, of bugs (`03.1`, p. 16).

### Black-box testing and design by contract

- Repeated `console.log` calls are debugging, not scalable testing (`03.1`, pp. 19-21).
- Black-box testing treats a function as an abstraction: tests derive from required input/output behaviour and do not need implementation knowledge. The slides explicitly show that meaningful tests can be designed even when the function is still a stub (`03.1`, pp. 22-24).
- Design by contract: function documentation/specification provides constraints, especially on inputs, telling the implementer/tester what must be handled and what is outside scope (`03.1`, p. 31). Example contract: `removeVowels` accepts/returns strings; `factorial` accepts a number from 1 to 10 and returns a positive number (`03.1`, p. 31).
- Behaviour means what the program does under given conditions; tests check behaviour. A specification may not define every edge case because exhaustive definition is infeasible or implementation detail is irrelevant (`03.1`, p. 32).
- Undefined behaviour: behaviour is not specified, usually because the use is outside reasonable scope; example given is square root of negative 1 (`03.1`, p. 33).
- Implementation-defined behaviour: behaviour must be decided, but the implementer chooses it; example given is ASCII versus UTF-8 input (`03.1`, p. 34).

### Vitest pattern

- Vitest is installed as a development dependency: `npm install --save-dev vitest`; `--save-dev` is used because test tooling is not needed in production (`03.1`, p. 25).
- Module/test structure shown (`03.1`, pp. 26-30):
  - export the function under test;
  - `import { describe, test, expect } from 'vitest'`;
  - import the function;
  - outer `describe` for a broad area/function;
  - separate `test` cases for properties/use cases;
  - compare actual and expected values with `expect(actual).toEqual(expected)`.
- Direct runner: `./node_modules/.bin/vitest removeVowels.test.js` (`03.1`, p. 27).
- Recommended package script: `"test": "vitest run"`, then `npm run test` (`03.1`, p. 28).
- Case-selection example for `removeVowels`: no vowels, only vowels, starting vowels, ending vowels, and complex words (`03.1`, p. 29). The pedagogical point is partitioning behaviour into properties/use cases, not copying only happy-path examples.

### Likely pitfalls

- Equating a few printed outputs with a repeatable test suite (`03.1`, pp. 20-21).
- Testing implementation details rather than the public contract (`03.1`, pp. 22-24, 31).
- Claiming tests prove there are no bugs (`03.1`, p. 16).
- Testing inputs explicitly excluded by the contract while omitting valid boundaries/partitions (`03.1`, pp. 31-34).
- Confusing safety with security (`03.1`, p. 11), or static with dynamic verification (`03.1`, p. 10).

## 2. Static verification: Typescript and linting

### Type safety and toolchain

- Type safety prevents mismatches between actual and expected types of variables, constants, and functions (`03.3`, p. 7).
- Javascript values have types, but plain Javascript is not statically type-safe because the type is only known when the program executes (`03.3`, p. 7). Runtime `typeof` guards improve safety dynamically; detecting the error before execution is preferable when possible (`03.3`, pp. 3-8).
- Typescript is built on Javascript, checks types, and outputs Javascript for Node to run (`03.3`, p. 9).
- Course install command: `npm install --save-dev tsx typescript@5.9.3`; the version is pinned because the course is not using latest (`03.3`, p. 10).
- `node_modules/.bin/tsx mycode.ts` runs Typescript (`03.3`, p. 11). `node_modules/.bin/tsc mycode.ts` type-checks without running and checks more strictly (`03.3`, p. 12).
- Typical package scripts are `"tsc": "tsc"` and `"tsx": "tsx"` (`03.3`, p. 13). Migration guidance uses `tsc --noImplicitAny --noEmit` and course-provided `tsconfig.json` (`03.3`, p. 28).

### Typescript syntax and concepts

- Type annotations follow a colon: `function sum(a: number, b: number) { ... }`; the core primitives presented are `string`, `number`, and `boolean` (`03.3`, pp. 15, 17).
- Typescript infers obvious local values, e.g. `const myName = 'Yuchao'`, but function parameters usually need explicit types (`03.3`, pp. 16-17).
- Union: `ready: boolean | number` permits either type (`03.3`, p. 18). Operations on a union may require narrowing; failure to narrow is listed as a compile-time error category (`03.3`, p. 27).
- Array/list: `const arr: number[] = []` (`03.3`, p. 19).
- Alias: `type ListItem = string | number`, then `ListItem[]` (`03.3`, p. 20).
- Optional parameter/property uses `?`: `end?: number` means `number | undefined`; nullish coalescing `end ?? str.length` falls back when `end` is `null` or `undefined` (`03.3`, p. 21). Object example: `age?: number`, `height?: number` (`03.3`, p. 22).
- Object shape: `type Person = { name: string; age?: number; height?: number }`, then `const person: Person = {...}` (`03.3`, p. 22).
- Literal union constrains exact values: `type visibility = 'Private' | 'Public'` (`03.3`, p. 23).
- `any` largely defeats Typescript checking; it is framed only as a temporary stub/placeholder (`03.3`, p. 24).
- Compile-time error categories explicitly listed: type assignment, missing properties, wrong argument type, wrong return type, null/undefined, un-narrowed unions, interface/type compatibility, enum values, generic type arguments, bad module/import, access modifiers, duplicate identifiers, and syntax (`03.3`, p. 27).

### Linting

- Consistent coding style improves readability/visual scanning and may expose bugs (`03.3`, pp. 32-35).
- A linter statically analyses code and can automatically adjust style; it is a form of static verification (`03.3`, p. 36).
- Linters identify style issues (whitespace/indentation) and semantic issues (bad logic/potential bugs) (`03.3`, p. 37).
- Limits: linting cannot fix poor names; semantic issues generally require manual repair. In interpreted Javascript, linting fills some gaps normally caught during compilation (`03.3`, pp. 38, 42).
- ESLint can detect errors, warn about potential errors/conventions, automatically fix some style issues, and be configured strict or lenient (`03.3`, p. 39).
- Core commands (`03.3`, pp. 40-45):
  - install: `npm install --save-dev eslint` plus course plugins for Typescript/Vitest;
  - check: `node_modules/.bin/eslint style_bad.js`; no output means no reported issue;
  - auto-fix: `node_modules/.bin/eslint --fix style_bad.js`, which overwrites the file;
  - package scripts: `"lint": "eslint"`, `"lint-fix": "eslint --fix"`.
- One-off suppression uses `// eslint-disable-next-line`; course use is restricted and requires tutor approval (`03.3`, p. 44).
- Lecturer de-emphasis: students are not expected to be experts in environment configuration; setup is supplied or explicitly instructed (`03.3`, pp. 47-48). Exam value is therefore conceptual/tool-use rather than memorising all plugin names.

### Likely pitfalls

- Saying Typescript itself is the runtime rather than a layer that checks/translates Javascript (`03.3`, p. 9).
- Assuming `tsx` is equivalent to strict check-only `tsc`; `tsx` runs code, while `tsc` is used to check without running (`03.3`, pp. 11-12).
- Adding `any` to silence errors and calling the result type-safe (`03.3`, p. 24).
- Treating optional `x?: T` as always present, or forgetting it is `T | undefined` (`03.3`, pp. 21-22).
- Assuming `eslint --fix` resolves semantic/logic errors; it automatically fixes style where possible and overwrites files (`03.3`, pp. 42-43).
- Confusing static verification with proof of total correctness; the earlier deck explicitly says static verification cannot verify everything (`03.1`, p. 15).

## 3. HTTP, Express, APIs, and CRUD

### Network and HTTP foundations

- Network: interconnected computers that communicate. Internet: global networking infrastructure. World Wide Web: linked documents/resources addressed by URLs (`04.3`, p. 3).
- A protocol supplies shared communication structure; HTTP is the protocol of the web (`04.3`, pp. 5-7).
- HTTP means Hypertext Transfer Protocol. Browser is the client requesting/receiving from a web server (`04.3`, p. 7; repeated `05.1`, p. 5).
- Modern servers commonly act as APIs exchanging JSON rather than only serving text/HTML files (`04.3`, p. 10; `05.1`, p. 6).

### Express server setup and response patterns

- Install runtime packages: `npm install express cors morgan`; `cors` permits frontend access from another domain, while optional `morgan` logs incoming requests. Types: `npm install --save-dev @types/express@4.17.21 @types/cors @types/morgan` (`04.3`, p. 8; `05.1`, p. 3).
- Basic server pattern (`04.3`, pp. 9, 11):
  - `import express from 'express'`;
  - `const app = express()`;
  - `const port = 3000`/`3001`;
  - parsing middleware: `app.use(express.json())` for JSON bodies (or `express.text()` for text);
  - route: `app.get('/hello', (req, res) => { res.send('Hello!'); })`;
  - JSON response: `res.json({ value: 'not much' })`;
  - start: `app.listen(port, () => console.log(...))`.
- Javascript objects can be returned as JSON via `res.json(...)` (`04.3`, p. 11; `05.1`, p. 8).

### Receiving request data

- Query data comes after `?` in the URL, e.g. `?name=Shaveen&age=22`; access as `req.query.name` / `req.query.age` (`04.3`, p. 12; `05.1`, p. 10).
- Path parameters are placeholders inside the route, e.g. route `/my/url/:name`, requested as `/my/url/Shaveen`; access as `req.params.name` (`04.3`, p. 13; `05.1`, p. 11).
- Use query parameters for filtering, searching, sorting, pagination, or response customisation; they are usually optional. Example: `GET /users?page=2&sort=name` (`05.1`, p. 9).
- Use path parameters to identify a particular required resource; a changed value means a different resource. Example: `GET /users/123` (`05.1`, p. 9).
- POST sends information through the request body, read with `req.body`, rather than putting it in the URL (`05.1`, p. 14). JSON parsing middleware is required before reading JSON bodies (`04.3`, p. 11; `05.1`, pp. 8, 14).
- Security/visibility comparison stated by the lecture (`05.2`, pp. 3-4): query strings are visible in logs, cached, and browser history, so are not safe for passwords; a POST body is not shown in those places and is marked safe for passwords when HTTPS is used. HTTPS encrypts URL paths, headers, bodies, and query parameters between client and server (`05.2`, p. 4). The examinable lesson is not to place passwords/secrets in a URL/query string.

### CRUD and HTTP methods

- Mapping: Create -> POST; Read -> GET; Update -> PUT; Delete/Remove -> DELETE (`05.1`, pp. 18-19, 23; `05.2`, p. 5).
- Course table shows GET/DELETE commonly obtaining identifiers/options through `req.params`/`req.query`, POST/PUT using `req.params` plus `req.body`, and all returning `res.json()` (`05.1`, p. 23). This table is a course convention/example, not a universal restriction on what an HTTP method may contain.
- A browser is convenient for GET but not sufficient for body-bearing POST; use an API client or code (`05.1`, pp. 12-17).

### Status codes and errors

- Status classes (`05.1`, pp. 21, 29; `05.2`, pp. 13, 17):
  - 1xx informational: received/continuing;
  - 2xx success: received, understood, accepted;
  - 3xx redirection: further action required;
  - 4xx client error: bad syntax or unfulfillable request;
  - 5xx server error: server failed on an apparently valid request.
- Common codes: 200 OK, 201 Created, 400 Bad Request, 403 Forbidden, 404 Not Found, 500 Internal Server Error, 502 Bad Gateway (`05.1`, pp. 20, 30).
- Express error response example: `res.status(400).json({ error: 'Bad name' })`; the success branch uses normal `res.json(...)`, hence default success status (`05.1`, p. 28).
- Every response has a status code; it is part of the API's observable contract and should be tested/documented alongside the body (`05.2`, pp. 13-17).

### API and REST

- API: an interface exposed by software. A Web API is a contract: endpoints plus expected input/output, while implementation remains a black box (`05.1`, p. 25).
- RESTful API principles listed (`05.1`, p. 27):
  - URLs identify resources;
  - HTTP methods operate on resources;
  - data usually exchanged as JSON;
  - stateless: each independent request contains everything needed to handle it.
- Project architecture emphasis: the HTTP layer mostly routes, gathers body/query/path data, calls Iteration 1 functions as black boxes, and returns responses (`05.1`, p. 31).
- Versioned endpoints such as `/v1/names/list`, `/v2/names/list`, `/v3/names/list` allow API evolution (`05.1`, p. 32).
- Tokens sent over HTTP must be strings. For JSON-stringified object tokens placed in URLs, the deck recommends `encodeURIComponent` before transfer and `decodeURIComponent` on receipt (`05.1`, p. 33).

### Likely pitfalls

- Mixing up `req.query`, `req.params`, and `req.body` (`04.3`, pp. 12-13; `05.1`, pp. 9-14).
- Forgetting `express.json()` before expecting a parsed JSON body (`04.3`, p. 11).
- Sending secrets in query strings because HTTPS encrypts transit; URLs still appear in logs/history/cache according to the lecture table (`05.2`, pp. 3-4).
- Mapping CRUD operations to the wrong verbs (`05.1`, pp. 18-19).
- Returning an error-shaped body with status 200 instead of setting an appropriate 4xx/5xx status (`05.1`, pp. 20-21, 28-30).
- Calling an API RESTful while keeping hidden client session assumptions; REST is stated to be stateless (`05.1`, p. 27).
- Testing the internal implementation of the wrapped Iteration 1 function instead of the HTTP contract (`05.1`, pp. 25, 31).

## 4. Programmatic HTTP testing

- API clients named: Advanced REST Client/`1531 arc`, or code using `sync-request-curl` (`05.1`, pp. 12-17; `05.2`, p. 6).
- HTTP requests in code are easy to automate, which makes them suitable for Vitest integration/API testing (`05.2`, pp. 7-9).
- Install shown in the testing lecture: `npm install --save-dev sync-request-curl` (`05.2`, p. 9). The earlier server lecture omits `--save-dev` (`05.1`, p. 16); for testing-only use, the later lecture's dev-dependency form is the clearer course intent.
- Request pattern (`05.1`, p. 17; `05.2`, p. 10):
  - `import request from 'sync-request-curl'`;
  - POST: `request('POST', 'http://localhost:3000/books', { json: {...} })`;
  - GET: `request('GET', 'http://localhost:3000/books')`;
  - decode a response body with `JSON.parse(String(res.getBody()))`.
- Vitest endpoint example (`05.2`, pp. 11-12): request a full URL, convert response body to a string, then compare with the expected JSON using `expect`. The slide uses `expect(bodyObj).toBe(JSON.stringify(expectedObject))`; robust understanding is that the response bytes/string must be normalised consistently before comparison.
- Run a targeted file using `npm run test express_server.test.js` (`05.2`, p. 12). The slide heading accidentally says “Jest test runner”, but the surrounding material and imports are Vitest (`05.2`, pp. 11-12); treat “Jest” as a slide typo, not a separate required framework.
- Status code and body both form the observable HTTP response contract (`05.2`, pp. 13-17). A good test matrix therefore varies valid/invalid path/query/body inputs and checks both result shape and status, even though the minimal code screenshot focuses on body equality.

### Likely pitfalls

- Comparing a raw byte buffer/body object directly to a Javascript object instead of parsing/string-normalising (`05.1`, p. 17; `05.2`, pp. 10-11).
- Forgetting that HTTP tests require a running server process (`07.3`, pp. 3, 8-11).
- Checking only success bodies and never the error/status branches described by Swagger (`05.2`, pp. 13-15).
- Mistaking integration/API tests for unit tests: they observe request/response and exercise the separate running server (`05.2`, p. 8; `07.3`, pp. 5-6).

## 5. Coverage

### Concepts and metrics

- Coverage is a general measure of test thoroughness: how much code is executed while tests run (`03.1`, p. 38).
- Test/feature coverage is how much of the feature set has tests and is often judged by a human. Code coverage is how much code executes under tests and can be computed by tooling (`03.1`, p. 38).
- Line example: 30 of 40 lines gives 75% line coverage (`03.1`, p. 39). General metric form, directly implied by the examples/table: covered items / total items x 100.
- Vitest metrics (`03.1`, pp. 40-45):
  - statements: percentage of code statements executed;
  - branches: if/else or switch-case paths covered;
  - functions: how many functions were called;
  - lines: actual source lines covered.
- Branch coverage applies where control can go to multiple next locations (e.g. `if`); count the possible paths actually taken. It is also called edge coverage (`03.1`, p. 44).
- For a grade function with HD/DN/CR/PS/FL branches, a high-value test set must cross every threshold/path, not merely execute the function once (`03.1`, pp. 43-45, 48).
- Install Vitest V8 coverage provider: `npm install --save-dev @vitest/coverage-v8` (`03.1`, p. 40).
- Vitest runs tests, records executed lines/functions/branches, prints a console report, and normally generates `coverage/index.html`; view with `open coverage/index.html` (`03.1`, p. 41).
- Lecturer emphasis: inspect what is *not* covered rather than chasing a percentage; branch coverage is considered more accurate and preferable to statement coverage; metrics require interpretation (`03.1`, p. 46).

### Unit-code coverage versus Express server coverage

- `vitest run --coverage` works for code executed inside unit tests (`07.3`, p. 2).
- If the Express server is started separately and Vitest tests only send HTTP requests, Vitest observes only request and response, not the server process/code, so its report can show 0% (`07.3`, pp. 3-6).
- `c8` is the Node/Javascript coverage tool used to instrument the running server and record executed lines (`07.3`, p. 7).
- Complete server-coverage workflow (`07.3`, pp. 8-11):
  1. terminal 1: `npm run start-coverage` to start Express under `c8` instrumentation;
  2. terminal 2: `npm run test` normally, causing HTTP requests to exercise server paths;
  3. stop server in terminal 1 with Ctrl+C;
  4. `c8` generates the coverage report.
- Strong project emphasis: server coverage is a significant Iteration 2 automarking component; run `start-coverage` before HTTP tests (`07.3`, p. 12).

### Likely pitfalls

- Confusing feature coverage with numeric code coverage (`03.1`, p. 38).
- Believing 100% statements/lines implies all decisions/behaviours are tested; branch coverage exposes missed alternatives (`03.1`, pp. 44-46).
- Treating coverage percentage as evidence that assertions are correct or requirements are satisfied; coverage measures execution, not test quality (`03.1`, pp. 38-39, 46).
- Running `vitest --coverage` against an already separate server and expecting server lines to be instrumented (`07.3`, pp. 2-7).
- Stopping at the empty 0% report instead of starting the server through `c8`, running tests, and then stopping it so the report is emitted (`07.3`, pp. 8-11).

## 6. Swagger / OpenAPI

Swagger/OpenAPI appears only in `Slides/05.2 - HTTP Testing.pdf`, pp. 14-17, among these six decks.

- Motivation: without an explicit contract, clients do not know available endpoints, parameters, possible statuses, or successful response shapes (`05.2`, p. 14).
- Swagger is now called OpenAPI and is a standard for describing RESTful APIs in a machine- and human-readable document, normally YAML or JSON (`05.2`, pp. 15, 17).
- Required information named by the deck: endpoint list, expected parameters, possible response status codes, and response-body schema/structure (`05.2`, p. 15).
- Online authoring/validation editor: `https://editor.swagger.io/` (`05.2`, p. 15).
- Serving interactive docs (`05.2`, p. 16):
  - install `swagger-ui-express yamljs`;
  - import Express, `swagger-ui-express`, and `yamljs`;
  - `const swaggerDocument = YAML.load('./swagger.yaml')`;
  - `app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))`;
  - then browse the `/api-docs` route.
- No deck in this assigned set teaches the internal YAML schema fields (`openapi`, `paths`, `parameters`, `responses`, `$ref`, etc.). Do not assume students are expected to memorise a full Swagger file solely from these slides; another provided project/iteration resource may contain that detail.

### Likely Swagger pitfalls

- Treating Swagger as implementation code rather than an API description/contract (`05.2`, pp. 14-17).
- Documenting only success responses while omitting error statuses/body structures (`05.2`, pp. 14-15).
- Letting route input/output drift from the documented contract; programmatic HTTP tests should be derived from the same endpoint/parameter/status/body specification (`05.2`, pp. 8, 14-17).
- Confusing Swagger UI (interactive renderer) with the Swagger/OpenAPI YAML/JSON document itself (`05.2`, pp. 15-16).

## 7. Cross-topic dependency map

- **Design by contract -> API contract:** black-box function tests derive from documented inputs/outputs (`03.1`, pp. 22-34); a Web API similarly exposes endpoints and input/output while hiding implementation (`05.1`, p. 25); Swagger makes this contract machine-readable (`05.2`, pp. 14-17).
- **Dynamic + static are complementary:** Typescript/linting catch classes of defects before execution (`03.3`, pp. 2, 7-12, 36-39); Vitest/HTTP tests execute real behaviour and cover cases static tools cannot establish (`03.1`, pp. 10, 15-18).
- **Unit -> integration/API:** Iteration 1 functions should remain black boxes behind thin Express routes (`05.1`, p. 31). Unit tests target functions; HTTP tests target request/response integration (`03.1`, pp. 17-18; `05.2`, p. 8).
- **HTTP input channel -> security/test partitions:** query/path/body location determines Express access syntax and affects secrecy/history. Tests should cover each channel and avoid credentials in URLs (`05.1`, pp. 9-14; `05.2`, pp. 3-4).
- **CRUD -> route -> status -> Swagger -> tests:** method and endpoint choose the operation, request channel supplies inputs, response status/body express the result, Swagger documents that contract, and HTTP tests verify it (`05.1`, pp. 18-30; `05.2`, pp. 8-17).
- **Branches -> negative API tests -> coverage:** each validation failure and success route is a branch; test valid, boundary, missing, and invalid inputs, then use coverage to locate unexecuted error/success paths (`03.1`, pp. 43-46; `05.1`, p. 28).
- **Separate-process architecture -> coverage tool choice:** ordinary Vitest coverage instruments code in the test process; HTTP calls cross into a separately running Express process, so server instrumentation must happen with `c8` (`07.3`, pp. 2-12).

## 8. Compact candidates for eventual cheatsheet space (not yet composed)

These are the items with the best information-to-space ratio; they should be considered when the final sheet is designed, but this is intentionally not the sheet itself.

- Static vs dynamic; safety vs security; unit vs integration/system; black-box + contract (`03.1`, pp. 10-18, 22-34).
- Minimal Vitest skeleton and common case partitions (`03.1`, pp. 27-30).
- Typescript mini-grammar: `x: T`, `A | B`, `T[]`, `type Alias = ...`, `x?: T`, object shape, literal union, avoid `any` (`03.3`, pp. 15-24).
- `tsx` runs vs `tsc --noEmit --noImplicitAny` checks; ESLint check vs `--fix` (`03.3`, pp. 11-13, 28, 42-45).
- Express mini-skeleton plus `req.params` / `req.query` / `req.body`, `res.status(n).json(obj)` (`04.3`, pp. 9-13; `05.1`, pp. 14, 28).
- CRUD mapping and status classes/common codes (`05.1`, pp. 18-21, 29-30).
- REST = resources via URLs + HTTP methods + JSON + statelessness (`05.1`, p. 27).
- `sync-request-curl` request/parse pattern and check body + status (`05.1`, p. 17; `05.2`, pp. 10-13).
- Coverage metric meanings; branch coverage over statement coverage; inspect missed code (`03.1`, pp. 38-46).
- Server coverage workflow: start under `c8`, tests in second terminal, Ctrl+C to emit report (`07.3`, pp. 7-12).
- Swagger purpose/content and Swagger UI wiring (`05.2`, pp. 14-17).

## 9. Lecturer emphasis and de-emphasis signals

- Repeated emphasis: testing is scalable/repeatable verification, not ad hoc logging (`03.1`, pp. 19-30).
- Repeated emphasis: treat implementation as a black box and derive tests from contracts (`03.1`, pp. 22-34; `05.1`, pp. 25, 31).
- Strong coverage emphasis: branch coverage and uncovered code matter more than a headline percentage (`03.1`, pp. 44-46).
- Strong project emphasis: HTTP server coverage under `c8` materially affects Iteration 2 automarking (`07.3`, p. 12).
- Environment/plugin configuration is explicitly de-emphasised; exact setup is supplied, so memorising long ESLint plugin commands is low priority compared with knowing what tools do (`03.3`, pp. 47-48).
- Network theory beyond basic definitions is explicitly deferred to COMP3331 (`04.3`, p. 4).
- Swagger internals are lightly covered: purpose and UI serving are shown, but no full YAML anatomy (`05.2`, pp. 14-17).

## 10. Slide-quality caveats worth preserving

- `03.1` unexpectedly contains a second mini-deck on code coverage at pp. 36-48; `07.3` is specifically about coverage of a separately running HTTP server.
- `03.3`, p. 26 says it will summarise language type safety but the rendered PDF contains no actual table/content below the heading.
- `05.2`, p. 12 calls the runner “Jest”, but p. 11 imports from `vitest` and the course setup is Vitest. This appears to be a terminology typo.
- `05.1`, p. 23 presents `req.params/query/body` availability as a method table. Treat it as the course's common route pattern, not an intrinsic HTTP prohibition.
- The testing screenshots use both `res.getBody()` and `res.body`-style access in nearby examples (`05.1`, p. 17; `05.2`, pp. 10-11). The conceptual invariant is to obtain and normalise the response body before assertion.
