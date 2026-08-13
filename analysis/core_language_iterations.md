# COMP1531 discovery: exam framing, JavaScript, modules, and iteration integration

This is discovery material only, not a finished cheatsheet.

## Direct evidence about the exam

- The exam is approximately 50% theory and 50% practical. Theory includes MCQ, short answers, and an open-ended design question; practical questions cover problem solving and implementation. Practical questions include starter code and most/all provide aut tests. Passing supplied tests does not guarantee marks, so students must test independently. (Exam Briefing pp. 17-19)
- Practical marking prioritises exact specified behaviour and I/O. Style/comments carry no direct marks, though code must remain understandable to a human marker. Minor errors receive minor penalties, but an answer needs substantial progress (>33%) to receive marks. (Exam Briefing pp. 20-22)
- Study both lectures and assignments. The lecturer explicitly names JavaScript basics/arrays/objects, verification and coverage, HTTP servers/APIs, SDLC, software design, and managing Swagger files. (Exam Briefing pp. 24-26)
- The exam environment has no internet, course site, or personal files; only one handwritten double-sided A4 page is allowed. (Exam Briefing p. 16)
- Course-wide examinable families are version control/teamwork, SDLC, package management/CI/CD/persistence/HTTP/auth/deployment, static and dynamic verification/coverage, complexity/modelling/maintainability, and requirements engineering. (Exam Briefing p. 6)

## JavaScript foundations

High-priority candidates because JavaScript basics are explicitly named in the briefing:

- Run a file using `node file.js`; Node runs JavaScript outside the browser. (JavaScript pp. 8-10)
- Bindings and output: `const` cannot be reassigned, `let` can; `console.log(...)`; both quote styles work. Template interpolation uses backticks and `${expression}`. (JavaScript pp. 12-13)
- Control flow: `if / else if / else`, `while`, classic `for`; functions use `function name(args) { return ...; }`. (JavaScript pp. 14-15)
- Arrays are dynamic, zero-indexed sequential collections and can contain mixed types. Basic patterns include `arr.push(x)`, `arr.length`, `arr[i]`, and index-based loops. `for (const i in arr)` iterates keys/indexes; `for (const value of arr)` iterates values. (JavaScript pp. 17, 19-21)
- Objects are associative collections of key/value pairs. Create via object literal; read/write via dot or bracket syntax. Brackets permit a computed/string key. Object utilities: `Object.keys(o)`, `Object.entries(o)`, `Object.values(o)`. (JavaScript pp. 23-28)
- Arrays, strings, and functions are objects in the broad JavaScript model: they expose properties and methods. (JavaScript pp. 29-30)
- Be fluent with arrays of objects and two iteration styles: direct field access when keys are known, and `Object.keys/entries/values` when iterating generically. (JavaScript pp. 31-34)

Likely practical pitfalls:

- Confusing `for...in` indices with `for...of` values.
- Forgetting braces/parentheses or returning the wrong object shape.
- Using single/double quotes when interpolation requires backticks.
- Mutating or reading object properties under inconsistent names.

## Function forms and array callbacks

- Equivalent definitions: declaration `function sum(a,b) { ... }`, function expression `const sum = function(a,b) { ... }`, arrow `const sum = (a,b) => { ... }`. A single-expression arrow can omit braces and `return`: `(a,b) => a+b`. (Advanced Functions pp. 3-6)
- First-class functions can be stored, passed as arguments, and returned. Anonymous functions are useful for one-off callbacks. (Advanced Functions pp. 7-11)
- `map`: produce a new array of the same length, transforming each element. `filter`: produce a new array of length 0..N, retaining unchanged elements that satisfy a predicate. `reduce`: combine an array into one accumulated value. (Advanced Functions pp. 12-18)
- Canonical forms: `arr.map(x => f(x))`, `arr.filter(x => predicate(x))`, `arr.reduce((acc, x) => updatedAcc, initialValue)`. The initial accumulator is a likely syntax detail worth preserving later. (Advanced Functions pp. 14, 16, 18-20)
- Higher-order functions return functions and can generalise repeated function definitions. (Advanced Functions pp. 21-23)

Likely practical pitfalls:

- Omitting the initial value from `reduce` when the empty-array case matters.
- Using `map` when selection is intended or `filter` when transformation is intended.
- Arrow function with braces but no explicit `return`.

## Modules and importing

- Built-in/library imports use ESM syntax such as `import fs from 'fs'` and `import path from 'path'`. Own-file imports use a relative path such as `./file.js`. (Multi-file & Importing pp. 3-6)
- Default export/import: `export default thing;` and `import anyName from './file.js';`. Only one default export per file; import braces are not used; the importer may rename it freely. (pp. 6, 11, 15)
- Named exports/imports: `export { a, b };` and `import { a, b } from './file.js';`. Unlimited named exports; import braces required; normally the same name is used. Alias with `import { a as alias } from './file.js';`. (pp. 9-15)
- Course preference is named exports because they extend cleanly and encourage stable shared names. (p. 12)
- Iteration 1 explicitly uses ESM via `"type": "module"`; use `import/export`, not `require`. (Iteration 1 p. 3)

## Assignment-derived integration patterns

The exam briefing says assignment concepts are a major source of questions, making these integration patterns important even when the exact Unigotchi data is not:

### Requirements to design

- Translate user story -> acceptance criteria -> needed capability -> function/API interface. A prescribed interface must not be changed; design a new function when the required behaviour is missing. (Iteration 0 pp. 4-5)
- A stub demonstrates the shape/contract, not real logic. Keep list responses as summaries and retrieve detailed state separately. (Iteration 0 pp. 5-6)
- Traceability path: requirement -> design -> stub -> issue/MR -> review -> merge. (Iteration 0 p. 10)

### Validation and state logic

- Validate every specified format/schema/range, avoid hard-coding example data, and obey the documented order when multiple errors apply. The spec/contract is the source of truth. (Iteration 1 pp. 3-7)
- State updates may require formulas, integer constraints, clamping to ranges, temporal constraints, and a state model with derived versus stored fields. (Iteration 1 pp. 4-5)
- Error results in Iteration 1 use `{ error: 'ERROR_TYPE', message: '...' }`; tests should focus on marked error type and behaviour. (Iteration 1 p. 7)

### Test-first workflow

- Red -> green: write a failing test, implement minimum behaviour, rerun, then inspect coverage. Use black-box tests through the public interface, `beforeEach(clear)` for independence, `toStrictEqual` for exact objects, and flexible matching such as `expect.any(String)` only where the value is intentionally unconstrained. (Iteration 1 p. 8)
- Iteration toolchain: Vitest, `npm test`, and V8 coverage. (Iteration 1 p. 3)

### HTTP/API/Swagger integration

- Iteration 2 changes plain function calls into an Express HTTP API, converts JS to TypeScript, replaces supplied `studentId` identity with sessions, adds persistence across restart, and tests through the network. The HTTP layer should remain a thin wrapper around backend logic. (Iteration 2 pp. 2-3)
- `swagger.yaml` is the API contract: prescribed routes are fixed and designed routes are added. The project explicitly says to design Swagger first so downstream work can proceed, and to add designed routes after prescribed ones. (Iteration 2 pp. 3, 7, 9)
- Session pattern: route reads a session header, rejects missing/invalid session with 401, resolves session to user identity, checks resource access, then invokes backend logic. Tokens belong in headers, not URLs. (Iteration 2 p. 4)
- Error precedence: 401 missing/invalid authentication -> 403 authenticated but forbidden/not owner -> 400 bad input, then the first-listed Swagger error. Route layer catches domain exceptions and maps them to an HTTP status plus JSON `{ error, message }`. (Iteration 2 p. 5)
- HTTP tests must assert status, body, and side effects; clear state in `beforeEach`. (Iteration 2 p. 8)
- Persistence and CI expectations: state survives restart; clear both resets memory and writes cleared persistent state; pipeline runs lint, TypeScript compilation, and tests. (Iteration 2 p. 5)

Swagger/OpenAPI is therefore unquestionably high priority: the lecturer names it directly in the exam briefing and the project treats it as the API contract and design-first coordination artifact.

## Security lecture: probably lower priority, but not automatically excluded

- Information disclosure: do not commit secrets; use external storage/encryption; avoid leaking stack/dependency versions and personally identifiable information in logs. (Industry Lecture pp. 10-11)
- Authentication proves identity; authorization decides access. Defences include checks, rate limiting, strong passwords, and secure cookie practices. (pp. 12-14)
- Directory traversal uses attacker-controlled paths such as `../../../etc/passwd`; mitigate with allowlists/input validation and path normalisation. (p. 15)
- SSRF makes the server fetch attacker-chosen/sensitive URLs; mitigate with outbound controls/proxies and allowlists. (pp. 16-17)
- Command injection arises when user input reaches a shell command; prefer trusted library APIs and layered validation. (p. 18)
- Security applies through the whole SDLC; never trust user input and prefer trusted filtering techniques. (p. 23)

This lecture was not named in the exam briefing examples, so it should receive little A4 space unless the practice exam or course staff confirm it is assessed.

## Preliminary priority from this subset

1. Explicit exam targets: JS basics/arrays/objects, verification/coverage, HTTP/API, SDLC/design, Swagger.
2. Assignment-integrated mechanics: validation order, exact shapes, black-box testing, auth/session/status mapping, persistence, thin route wrappers.
3. Core JS syntax: arrays/objects/loops, modules, callbacks and map/filter/reduce.
4. Lower priority: course administration, project-specific Unigotchi numeric rules, and most industry/career content.

## Missing evidence that would improve confidence

- The practice exam and its supplied documentation/starter code.
- Tutorial/lab questions and quiz questions, especially any repeated theory distinctions.
- The assignment `swagger.yaml` or a representative complete Swagger file, since the lecture decks establish its importance but may not contain all syntax likely required in the exam.
