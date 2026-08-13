# COMP1531 26T2 lab-solution pattern map

This is a retrieval and discovery report, not a copy of the lab answers and not a cheatsheet.

## Access result and limitation

The official [26T2 Lab Solutions page](https://cgi.cse.unsw.edu.au/~cs1531/26T2/laboratory/solution#2-accessing-solutions) is marked **Student** and, without an authenticated UNSW session, returns only “Please log in to view the contents of this page.” The official [26T2 tutorial repository](https://gitlab.cse.unsw.edu.au/coursework/comp1531/26T2/tutorials/-/tree/solutions?ref_type=heads) likewise redirects an unauthenticated request to GitLab sign-in. The public GitLab API exposes no matching projects. Therefore no current lab solution source files could be responsibly inspected from the open web.

This limitation does **not** apply inside the exam environment. Both official practice-exam resource pages state that the lab solutions are mirrored at the exact local root:

```text
/home/class/public_html/1531-Lab-Solutions/
```

The practice resource pages recommend entering through the desktop **Resources** menu. They describe the raw path as alternate access for a specific need, such as opening it in VS Code. This report therefore gives a safe search map for that local mirror rather than inventing unverified folder names.

Sources: [Practice Exam 1 resources](https://cgi.cse.unsw.edu.au/~cs1531/26T2/practice-exam/resources/), [Practice Exam 2 resources](https://cgi.cse.unsw.edu.au/~cs1531/26T2/practice-exam2/resources/).

## Added evidence: `Example swagger/swagger.yaml`

The workspace now contains a concrete course project contract at [`Example swagger/swagger.yaml`](../Example%20swagger/swagger.yaml). This materially reduces the earlier uncertainty about the course's Swagger style, but it must be treated as a **lookup example**, not a universal template or an authority over an exam question.

### What kind of Swagger file it is

The file is substantial: 1,736 lines, about 55 KB, 22 path entries, 26 operations and 225 `$ref` occurrences. Reading it from the beginning during an exam would be inefficient. Its key structural choices are:

- Swagger/OpenAPI **2.0**, declared as `swagger: "2.0"`, not OpenAPI 3.x.
- A course-specific reusable tree named `x-components` rather than the conventional OpenAPI 2 `definitions`/`parameters`/`responses` layout or OpenAPI 3 `components`.
- Reusable groups under `x-components/prim`, `/group`, `/path`, `/header`, `/body`, and `/return`.
- Body input represented as a Swagger 2 parameter with `in: body` and `schema`, not an OpenAPI 3 `requestBody`.
- Path/query/header inputs represented in a route's `parameters` array, often via `$ref`.
- Response schemas under `responses -> status -> schema`.
- Global header-based session security via `securityDefinitions`, `security`, and `SessionAuth`; public routes override it using `security: []`.
- `operationId` values that usually point directly to the corresponding backend-function name.

This is a course dialect built on valid extension points. It is highly useful for recognising the project's structure, but copying `x-components` into an exam file that uses OpenAPI 3 or standard Swagger 2 sections could break the exam's preview/contract.

### Navigation speed: search, do not scroll

For one known endpoint, the local file can be navigated in seconds by searching in this order:

1. Exact path, including braces, for example `/simulations/{simulationId}/friends`.
2. The method immediately below it: `get:`, `post:`, `put:` or `delete:`.
3. `operationId:` to identify the intended backend function.
4. The route's `parameters:` refs and `responses:` block.
5. Follow only the referenced input/return schema under `x-components`.

Useful exact searches:

| Goal | Search term |
|---|---|
| Jump to all endpoint declarations | regex `^  /` |
| List all route/backend names | `operationId:` |
| Find an exact endpoint | the literal route, including `{simulationId}` etc. |
| Find authentication model | `securityDefinitions:` or `SessionAuth` |
| Find public-route exemptions | `security: []` |
| Find all input locations | regex `in: (path|query|header|body)` |
| Follow a body definition | `#/x-components/body/` plus the referenced name |
| Follow a response shape | `#/x-components/return/` plus the referenced name |
| Find path primitives | `#/x-components/path/` |
| Find error cases/codes | `INVALID_`, then inspect the response status above it |
| Distinguish arrays from objects | `type: array`, then inspect its `items:` ref |
| Find required object fields | `required:` within the referenced body/group schema |

For a quick outline in the terminal:

```text
rg -n '^  /|^    (get|post|put|delete|patch):|operationId:' 'Example swagger/swagger.yaml'
```

For a particular backend name or route, a literal editor search is faster and safer than running a broad regex.

### Files to open together

The `Example swagger/` folder contains only the YAML file. It does **not** contain its matching `server.ts`, backend, HTTP helpers, tests or package manifest. Therefore it is insufficient as a standalone implementation reference.

For an exam API question, keep these files side by side:

1. the exam question's own `swagger.yaml`;
2. its `server.ts`;
3. the backend implementation/types being wrapped;
4. the HTTP test/helper file;
5. that question's `package.json` and config.

Open the example Swagger only in a separate tab when a structural pattern is missing, such as how the course factors a body schema, path parameter, response wrapper or security exemption. Do not use its project-specific routes, statuses, errors, auth decisions or data shapes as defaults.

### Authority and precedence

When sources disagree, use this order:

1. Explicit instructions and required behaviour on the current exam question.
2. The current question's own Swagger contract for its paths, methods, inputs, response statuses and schemas.
3. The current starter types/function prototypes and installed compiler/runtime constraints.
4. Current supplied tests as useful but potentially incomplete evidence.
5. Current course tutorial/lab solution matching the same tool/version.
6. `Example swagger/swagger.yaml` as structural precedent only.
7. Generic Swagger/OpenAPI or Express documentation.

If the current question explicitly asks to repair Swagger, the broken Swagger cannot be treated as authoritative; the question requirements, starter implementation and tests identify the intended correction. Conversely, when the question says to implement routes “specified in the Swagger interface,” that question's Swagger—not this Unigotchi example—defines the contract.

### Version and tooling mismatches

This file makes the version risk concrete:

- **Swagger 2 versus OpenAPI 3:** `in: body`/`schema` and top-level `securityDefinitions` are Swagger 2 patterns; `requestBody` and `components/securitySchemes` are OpenAPI 3 patterns.
- **Course extension versus standard layout:** `x-components` is specific to this file/course setup. An exam Swagger may instead use `definitions`, reusable `parameters`, or OpenAPI 3 `components`.
- **Express version is independent:** as documented in [`exam_resource_strategy.md`](exam_resource_strategy.md), practice projects install Express 5.2 while the provided API reference is Express 4. Swagger version does not determine Express version. Translate the contract into the current starter's Express style.
- **Preview success is not semantic proof:** `Shift + Alt + P` can confirm that a document renders, but it does not prove the implementation, tests and error precedence match it.
- **Security inheritance is easy to miss:** this example globally protects routes and clears security on four public operations. Looking only at a route's parameters may hide the inherited session requirement.

### What this changes for eventual handwritten allocation

This example means the future handwritten sheet does **not** need to reproduce a complete long Swagger document, large reusable-schema library, or every response/error block. Those can be recovered from this file or, preferably, the current question's own Swagger.

It still needs to make the following instantly recognisable because lookup alone does not supply the decision:

- first check the declared version (`swagger: "2.0"` versus `openapi: 3...`);
- map `path + method + input location + response status/schema` to the server wrapper;
- know that Swagger 2 body parameters and OpenAPI 3 request bodies have different shapes;
- trace `$ref` rather than duplicating/retyping schemas;
- check global security and per-route overrides;
- apply the exam's own error precedence and auth rules;
- remember the source-precedence order above.

The practical allocation change is therefore from “handwrite general OpenAPI anatomy” to “retain a very small version/translation/navigation cue, then look up the exact schema in the current Swagger or this example.” This refines the earlier conclusion in [`exam_resource_strategy.md`](exam_resource_strategy.md), which identified Swagger as a high-friction missing reference before this concrete example was supplied.

## What “exact location” can be verified now

| Item | Verified location | Status |
|---|---|---|
| Lab-solution mirror root | `/home/class/public_html/1531-Lab-Solutions/` | Explicitly printed by both practice-exam resource pages |
| Tutorial-solution mirror root | `/home/class/public_html/1531-Tutorial-Solutions/` | Explicitly printed by both practice-exam resource pages |
| Current online lab access instructions | `https://cgi.cse.unsw.edu.au/~cs1531/26T2/laboratory/solution` | Authentication-gated outside the exam |
| Current tutorial solution branch | `coursework/comp1531/26T2/tutorials`, branch `solutions` | Authentication-gated outside the exam |
| Exact lab subfolder/file names | Not exposed publicly | Must be indexed once the local exam mirror is open; guessing names would be unsafe |

## Fastest way to retrieve a lab pattern in the exam

For lab solutions, opening the whole mirror in VS Code and using global text search is more robust than guessing a week/folder name:

```text
code /home/class/public_html/1531-Lab-Solutions/
```

Then search for a distinctive API symbol or phrase, not a broad concept. Examples below use exact strings likely to be present in working code. These are search fingerprints, not proposed exam answers.

| Need | First search fingerprints | Files to open first | Why this is fast/useful |
|---|---|---|---|
| Base JavaScript arrays/objects | `.map(`, `.filter(`, `.reduce(`, `Object.entries`, `Object.keys`, `...` | Small implementation file plus its `.test.js`/`.test.ts` | Finds concrete transformations and expected output shape. Prefer a small lab function over a project-size file. |
| TypeScript repair and modelling | `interface `, `type `, `tsc --noEmit`, `toStrictEqual` | Typed implementation, interface/type file, `package.json`, tests | Shows course conventions for result unions, arrays, optional fields and return objects. Compiler config/scripts reveal what “type safe” means for that lab. |
| Exceptions and validation | `throw new Error`, `.toThrow(`, `try {`, `catch (` | Validation implementation and matching tests | Finds the important function-wrapper assertion pattern and exact course style for throwing versus returning errors. |
| Express route wrapping | `express()`, `app.get(`, `app.post(`, `app.put(`, `app.delete(` | `server.ts` and its test file | Provides the thin-wrapper shape and correct request-input locations. Existing starter/server code still outranks a different lab if the contract differs. |
| HTTP request helpers | `sync-request-curl`, `statusCode`, `getJSON()`, `qs:`, `json:`, `headers:` | HTTP test/helper file | Gives a known-working course request wrapper faster than the npm page. |
| Swagger/OpenAPI | `openapi:`, `swagger:`, `paths:`, `requestBody:`, `$ref:`; filename search `swagger.yaml` or `swagger.yml` | Complete Swagger file beside its `server.ts` | The most valuable lab lookup because no OpenAPI authoring reference is otherwise supplied. Compare method/path/input/status/schema with the server, not just the preview. |
| Coverage and c8 | `--coverage`, `c8 `, `reporter=lcov`, `coverage/`, `fileParallelism` | `package.json`, test file, Vitest config | Exact command and server/direct-code workflow are usually more valuable than the implementation. |
| Persistence | `readFileSync`, `writeFileSync`, `JSON.parse`, `JSON.stringify`, filename search `data.json` | Data-store/persistence module and mutation/clear call sites | Reveals where the course loads and writes state, including whether clear/reset is persisted. |
| Authentication/authorisation | `session`, `token`, `auth`, `authorization`, `401`, `403`, `hash`, `salt` | Auth backend, server route, tests, Swagger | Helps trace the whole contract: credential/token location, validation, ownership and status mapping. Search 401/403 because names vary. |

If terminal search is comfortable, the same method can be made layout-independent:

```text
rg -l "sync-request-curl|statusCode|getJSON" /home/class/public_html/1531-Lab-Solutions/
rg -l "openapi:|swagger:|requestBody:|\$ref:" /home/class/public_html/1531-Lab-Solutions/
rg -l "throw new Error|\.toThrow\(" /home/class/public_html/1531-Lab-Solutions/
rg -l "readFileSync|writeFileSync|JSON\.stringify" /home/class/public_html/1531-Lab-Solutions/
rg -l "c8 |--coverage|reporter=lcov" /home/class/public_html/1531-Lab-Solutions/
rg -l "401|403|session|token|authori[sz]" /home/class/public_html/1531-Lab-Solutions/
```

The practice resource page specifically says raw paths are for cases where another display is needed. A targeted VS Code/global search is such a case; aimless browsing through every lab is not.

## Priority map by practice-exam match

### Tier 1: locate before the exam if possible

These lab pattern families closely match assessed practical tasks and fill gaps in the supplied online documentation.

#### HTTP + Swagger + HTTP testing

Useful local artefacts:

- a complete `swagger.yaml`/`swagger.yml`;
- the matching `server.ts` route wrappers;
- a `sync-request-curl` test/helper file;
- the relevant `package.json` scripts and config.

Reusable pattern to study, without copying a particular answer:

- contract path/method to Express route;
- path/query/body/header extraction;
- backend result/error to status plus JSON body;
- HTTP helper inputs and response normalisation;
- consistency across Swagger, implementation and tests.

Why it matters: Practice 1 includes server wrapping and Practice 2 Q24 explicitly asks for a Swagger-driven backend plus server. The downloaded Practice 2 starter folder omits the referenced Swagger file, making a valid lab example especially valuable.

#### Coverage + c8

Useful local artefacts:

- one direct-function coverage exercise;
- one separately running Express server coverage exercise;
- the scripts in `package.json` and any Vitest config.

Reusable pattern to study:

- how the course invokes Vitest coverage for imported code;
- how it starts an Express server under `c8`;
- when a server must be stopped to flush the report;
- how branch gaps translate into additional test inputs.

Why it matters: Practice 2 Q25 separately assesses direct and HTTP coverage, and no c8/Vitest coverage documentation is supplied in the final resource list.

#### Exceptions + validation

Useful local artefacts:

- validation function with several ordered failure conditions;
- tests for thrown errors and boundary cases;
- any typed input with optional fields.

Reusable pattern to study:

- wrapper passed to `.toThrow`;
- missing-field collection/ordering if specified;
- error precedence when more than one condition fails;
- distinction between thrown errors and returned error objects.

Why it matters: Practice 1 Q28 assesses validation by throwing exact messages, while HTTP tasks usually return/map errors instead.

#### Authentication/authorisation

Useful local artefacts:

- token/session creation and lookup;
- header extraction in `server.ts`;
- protected-route tests and Swagger responses;
- ownership/permission checks.

Reusable pattern to study:

- authentication before authorisation;
- missing/invalid session versus forbidden action;
- input-error precedence as specified;
- token location and response/status mapping.

Why it matters: there is no dedicated auth API reference in the exam environment, and generic HTTP/Node docs do not encode COMP1531's contract conventions.

### Tier 2: useful when a question resembles it closely

#### TypeScript repair

Practice 1 Q27 is about making existing logic type-safe and lint-free without changing logic or prototypes. A small typed lab solution is useful for interface syntax and union-return narrowing, but the three official TypeScript image sheets and the current compiler error should be consulted first. The highest-value lab files are the implementation, interface/type declarations, tests and `package.json`; large application types are poor examples under time pressure.

#### Base JavaScript

A small lab of array/object/string functions is useful if it contains tests and clear input/output examples. However, MDN is faster for a named method and the practice tests are more relevant to exact behaviour. Lab browsing is only worthwhile when the needed *combination* of operations is unclear.

#### Persistence

A compact file-backed data-store lab can demonstrate the course's startup/mutation/clear lifecycle better than the vast Node API. It is especially useful if the file shows both read and write call sites and tests restart/state persistence. Do not assume its missing-file policy applies when the exam contract says otherwise.

### Tier 3: usually slower than the supplied question

- Large project-like lab solutions with many unrelated modules.
- A lab whose endpoint names/data model differ substantially from the exam question.
- Files without their tests, Swagger or `package.json` context.
- Tutorial prose when a precise working lab code pattern is already found.
- Searching all weeks for a standard JS method that MDN can locate immediately.

## Week/topic routing when filenames are unknown

The lecture chronology gives a reliable coarse route, even though exact lab subfolder names are not publicly visible:

| Course phase | Relevant lecture topics | Lab solution family to inspect |
|---|---|---|
| Early course | JavaScript, Git, iteration 0 | Small JS functions, data structures and baseline tests |
| Early-middle | multi-file/importing, package management, requirements | ESM/module split, package scripts, typed interfaces |
| Middle | dynamic/static verification | unit tests, TypeScript/lint repair, validation partitions |
| Middle | advanced functions, HTTP Server I/II, HTTP testing, iteration 2 | higher-order JS, Express, Swagger, sync-request helpers |
| Later | persistence, exceptions, code coverage, auth | file storage, thrown-error tests, c8/Vitest coverage, protected routes |

Inside the mirror, use folder sorting/week names only to narrow the search after opening the root. The symbol searches above are less vulnerable to unknown folder naming.

## Retrieval workflow for an actual exam question

1. Read the question, starter implementation, tests, Swagger and `package.json` first.
2. Identify one missing pattern, such as “query parsing” or “server c8 command.”
3. Search the lab mirror for one distinctive symbol.
4. Open the smallest matching solution together with its test/config/Swagger context.
5. Adapt the *pattern* to the exam's contract; never transplant domain logic or error/status assumptions.
6. Return to the exam files and run their prescribed command.

A lab solution is supporting evidence, not authority. For marking, the exam specification, Swagger, starter types, provided tests and installed compiler/runtime always take precedence.

## What should be indexed during preparation

Once authenticated access or the exam mirror is available, make a tiny private index recording only:

- lab folder/file path;
- one-line pattern description;
- whether it has tests, Swagger and package scripts;
- one or two search anchors.

The first targets should be:

1. complete Swagger + Express + HTTP tests;
2. direct coverage + server/c8 coverage;
3. exceptions/validation;
4. auth-protected routes;
5. persistence lifecycle;
6. small TypeScript repair/type-pattern lab;
7. small JS collection-functions lab.

No exact subfolder names are asserted here because the official current index and repositories are authentication-gated. That is the key unresolved evidence gap.

## Verified concrete example: `lab07_objection`

The user later supplied one complete lab/worked repository and its separate official solution:

- exercise/worked tree: `Example lab + solution/lab07_objection-master/`
- official implementation: `Example lab + solution/lab07_objection-solution/solution/objection.ts`

This confirms that a useful lab lookup is small and self-contained: `README.md` gives the behavioural contract, `src/objection.ts` the typed implementation, `src/objection.test.ts` the course's Vitest patterns, and `package.json` the exact `test`/`tsc`/`lint` commands. The current `master` copy already contains a substantial implementation and test suite, so it should be treated as a worked/student version rather than assumed to be pristine starter code.

### What this particular lab is useful for

- TypeScript string and numeric enums, plus `Set<Objection>` as a typed result containing zero, one, or several classifications.
- Contract decomposition: seven independent rules contribute to one result, with some rules conditional on an examination type.
- Input normalisation: lowercase once before case-insensitive matching.
- String predicates: `includes`, `startsWith`, `endsWith`, `.length`, and counting regex matches.
- Predicate composition: arrays of phrases with `.some(...)`, disjunctions and examination-specific branches.
- Word matching: remove punctuation with regex, split on whitespace, remove empty strings, and test exact membership.
- Exception contract and Vitest callback assertion: `expect(() => listObjections(...)).toThrow(...)`.
- Table-driven tests using `test.each` and structural equality for `Set` values.
- Coverage workflow: `vitest run --coverage`, then inspect `coverage/index.html` for unexecuted lines/branches.
- Type/lint tooling: `tsc --noEmit` and ESLint are separate checks from runtime tests.

### Direct practice-exam overlap

This one lab supports three of the most stable practice-exam archetypes:

1. base JavaScript/TypeScript transformations and classification;
2. exact exceptions and typed results;
3. coverage-oriented test selection across many branches.

It does **not** provide examples for Express, Swagger, `sync-request-curl`, separate-server `c8` coverage, persistence or auth. Those remain the highest-priority additional lab families to locate if the user later supplies another small sample.

### Fast search fingerprints

Inside the exam mirror, `lab07_objection` would be a good hit for:

```text
listObjections
Set<Objection>
test.each
.toThrow(
vitest run --coverage
```

Open the README, implementation, tests and package scripts together; the official solution alone omits the test design that makes this lab valuable.
