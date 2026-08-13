# COMP1531 final exam topic discovery

This is an evidence-based inventory and prioritisation of examinable material. It is deliberately **not** the final cheatsheet.

## What the exam evidence says

- Correct course: **COMP1531, 26T2**.
- Format: about **50% theory and 50% practical**.
- Theory: MCQ, short answer, and an open-ended design question.
- Practical: problem solving and implementation, with starter code and aut tests for most/all coding questions.
- Supplied aut tests are incomplete evidence; independent testing matters.
- Exact specified input/output and observable behaviour matter more than comments/style.
- The lecturer explicitly names: JavaScript basics/arrays/objects; verification/coverage; HTTP servers/APIs; SDLC/software design; and managing Swagger files.
- Lectures **and assignments** are both direct sources of exam questions.

## Priority 1: practical syntax and decision rules

These are the strongest candidates for eventual handwritten space because they are both exam-explicit and hard to reconstruct under time pressure.

### JavaScript and TypeScript

- `const` vs `let`, template strings, conditions and loops.
- Arrays, indexing, `.length`, `.push`, and arrays of objects.
- `for...in` keys/indexes vs `for...of` values.
- Object literals; dot vs bracket access; `Object.keys/entries/values`.
- Function declaration/expression/arrow forms; arrow implicit return trap.
- First-class/anonymous/higher-order functions.
- `map` = same-size transformation; `filter` = selection; `reduce` = one accumulated result, including an initial accumulator.
- Type annotations, unions, arrays, aliases, optional fields/parameters, object shapes, literal unions, narrowing, and why `any` defeats safety.
- Named/default exports, aliases, and ESM `import/export` rather than `require`.

### Testing, verification, and coverage

- Dynamic vs static verification; testing in the small vs large; unit/integration/system/acceptance categories.
- Black-box tests derive from the public contract, not internal implementation.
- Vitest structure: imports, `describe`, `test`, `expect`, exact-object and exception assertions.
- Test partitions: happy path, invalid cases, boundaries, alternate branches, and side effects; isolate state with `beforeEach`.
- Exception test trap: pass a function to `.toThrow`, rather than invoking it before `expect`.
- TypeScript and ESLint as static verification; `tsx` runs while `tsc --noEmit` checks.
- Feature/test coverage vs numeric code coverage.
- Statement, branch, function, and line coverage; branch coverage is especially useful.
- Coverage measures execution, not correctness or test quality.
- Separate Express process: Vitest cannot see server coverage automatically; start the server instrumented with `c8`, run HTTP tests, then stop it to emit the report.

### HTTP, Express, auth, persistence, and Swagger

- Client/server request-response model; Express server and route skeletons.
- `req.params` vs `req.query` vs `req.body`; `express.json()` requirement.
- CRUD mapping: POST create, GET read, PUT update, DELETE remove.
- Status-code classes and common codes; status and body are both contractual.
- Thin HTTP wrapper: extract request data -> validate/authenticate -> call backend -> map result/error to response.
- REST: resources in URLs, HTTP methods, usually JSON, stateless requests.
- Programmatic HTTP tests with `sync-request-curl`; normalise/parse response bodies and assert status, body, and side effects.
- Authentication = who; authorisation = permitted actions.
- Session/token in a header, never identity/secrets in the URL. For protected routes: missing/invalid token -> 401; authenticated but forbidden/not owner -> 403; invalid user input -> 400.
- Hashing vs encryption; salts; base64 is not integrity; signed tokens use a secret/HMAC and claims still need validation.
- Persistence lifecycle: startup reads/parses disk state; mutations stringify/write updated state; clear must persist the cleared state.
- Swagger/OpenAPI is the API contract: endpoints, inputs/parameters, response status codes, and response schemas. Swagger UI renders the document; it is not the document itself.

## Priority 2: compact theory distinctions and design reasoning

### Requirements and validation

- Functional = capability/service/what; non-functional = constraint or measurable quality/how well.
- Requirements engineering is iterative: elicitation -> analysis -> specification -> validation.
- Specification states **what**, not implementation **how**.
- Good requirement: identified system + `shall/may` + positive, specific, measurable, testable result.
- User-story template and INVEST properties.
- Use case = actor goal, success path, failures and handling, viewed as a black box.
- Acceptance criteria written before implementation; Given/When/Then scenarios.
- Verification = build it right/conform to specification; validation = build the right thing/satisfy intended user need.
- UAT is user/customer-facing, black-box acceptance or rejection against needs/criteria.

### SDLC, Agile, Git, CI/CD

- SDLC: requirements analysis -> design -> development -> testing -> deployment -> maintenance.
- Waterfall sequence vs Agile's small increments, evolving requirements, continuous testing and feedback.
- Agile is a philosophy; Scrum/Kanban/XP are frameworks. The four Agile values are likely recognition/recall material.
- Git flow: working directory -> staging (`add`) -> local repository (`commit`) -> remote (`push`); `pull` brings remote work locally.
- A branch is a commit pointer; `git merge X` merges X into the currently checked-out branch.
- Merge request = diff, review/discussion, CI, approval, protected main.
- CI: `.gitlab-ci.yml`, pipeline/job/stage/script, runner executes it, and main must stay green.
- CI vs continuous delivery vs continuous deployment: integrate/check; release-ready with human action; automatically release if checks pass.

### Modelling, maintainability, and complexity

- Structural models: UML class/ER diagrams. Behavioural models: state/use-case diagrams.
- UML class notation, ER PK/FK/cardinality, use-case actors/system boundary, state/action/transition notation.
- FSM: finite states + event/action-labelled directed transitions + validity rules.
- Maintainability: design for inevitable change; tests protect behaviour but are not themselves design.
- DRY = one source of truth, not eliminating every repeated line; KISS = simplest suitable design; YAGNI = no speculative capability.
- Correct target: **low coupling, high cohesion**.
- Refactoring changes internal structure without changing external behaviour and needs strong tests.
- Essential complexity belongs to the problem; accidental complexity comes from the implementation/environment and can be mitigated.
- Cyclomatic complexity: `V(G) = e - n + 2` for a connected control-flow graph; count graph edges/nodes and recognise that the number is only a heuristic.

## Priority 3: know, but allocate less eventual space

- npm: `npm init`, `npm install`, scripts; commit `package.json` and `package-lock.json`, not `node_modules`.
- Exception definition, `throw`/`try`/`catch`, EAFP vs LBYL, compile-time/runtime/logic errors.
- Data-layer placement and in-memory/file/database distinctions.
- Team practices: task boards, stand-ups, definition of done, review, dependency graphs, pair programming.
- Deployment environments and monitoring: dev -> staging -> production; 4xx/5xx, uptime and resource signals.
- Security guest lecture: information disclosure, directory traversal, SSRF, command injection, never trust input.

## Low priority or exclude unless practice material proves otherwise

- Course administration, dates, marking logistics, help channels, biographies and career material.
- Project-specific Unigotchi formulas, state names, validation constants, and marks formulas.
- Exact dependency/plugin installation commands where the lecture says configuration will be provided.
- Long historical motivations and vendor lists.
- All twelve Agile principles verbatim; prefer the four values plus the feedback-loop concept unless practice questions demand more.

## Cross-topic question patterns worth expecting

1. **Read code and predict/fix behaviour:** arrays/objects, callbacks, imports, types, exceptions.
2. **Complete an API route:** choose input channel, status code/body, auth decision, backend call and error handling.
3. **Write or repair tests:** contract-derived cases, boundaries/branches, black-box HTTP assertions, exception wrapper.
4. **Interpret coverage:** identify what remains untested; explain why high statement coverage can miss branches.
5. **Manage/repair Swagger:** keep route method/path, parameters/request body, statuses and schemas consistent with implementation/tests.
6. **Short distinction:** verification/validation, auth/authz, hash/encryption, functional/non-functional, CI/delivery/deployment, coupling/cohesion.
7. **Open-ended design:** derive requirements/AC, choose models, argue maintainability principles, or trace requirement -> API -> test.
8. **Model/metric task:** construct/read a state diagram or calculate cyclomatic complexity from a control-flow graph.

## Source caveats resolved

- `09.2 - Validation.pdf` contains the Deployment lecture; `09.3 - Deployment.pdf` contains Validation.
- A slide labels a Vitest example as Jest; the course tool shown is Vitest.
- A maintainability slide contains wording that could imply tight coupling; the explicit summary and complexity lecture establish **low coupling, high cohesion**.
- The auth SHA-256 example is educational only; the same deck's salt note must accompany any security conclusion.
- The slide decks establish Swagger's importance but do not teach full YAML anatomy. The project `swagger.yaml`, practice exam, and/or lab material is needed before deciding the exact syntax to place on the final sheet.

## Best next evidence to collect

1. The **26T2 practice exam**, including starter files and any documentation supplied inside its restricted environment.
2. Your project's or course starter **`swagger.yaml`**.
3. Lab/tutorial and theory-quiz questions, especially repeated question styles.
4. If available, the exam-environment trial files or documentation bundle.

These will reveal the expected depth and exact syntax. The lecture discovery already establishes the topic universe; practice material is now more valuable than additional lecture recordings.

---

## Practice-exam evidence update

Two official 26T2 practice papers, their starter repositories, tests/configuration, and three embedded Swagger contracts were subsequently reviewed. The detailed reports are `practice_exam_1.md`, `practice_exam_2.md`, `practice_exam_crosswalk.md`, and `exam_resource_strategy.md` in this directory.

### Strongest repeated practical pattern

Across both 100-mark practice papers:

| Repeated practical archetype | Practice 1 | Practice 2 | Confidence |
|---|---:|---:|---|
| Base JavaScript strings/arrays/objects | 10 marks | 10 marks | Very high |
| Typed validation and exact exceptions | 6 marks, plus separate 10-mark TS repair | 10 marks | Very high |
| Swagger/HTTP/Express implementation | 14 marks, plus 10-mark API design | 10 marks | Very high |
| Coverage-driven unit + HTTP tests | nominally 10 marks | 10 marks | Very high |
| Structured data transformation/aggregation | spread across tasks | dedicated 10 marks | High |

This is now better evidence than lecture-title prominence. The highest-return practical preparation is:

1. Translate a supplied contract into small JavaScript transformations with hidden edge cases.
2. Model unfamiliar data with TypeScript; distinguish missing from falsy; throw exact errors in prescribed order; catch/transform errors safely.
3. Read Swagger semantically and implement a thin Express adapter: extract/convert input, call backend, map exact status/body.
4. Design inputs for 100% coverage, including short-circuit `&&`/`||`, early returns and boundaries; repeat the matrix through HTTP under `c8`.
5. Aggregate nested records using eligibility filters, zero-initialised output shapes, lookup tables, and a checklist of every stated component.

### Strongest repeated short-answer pattern

Both papers have five concise applied-theory questions totalling 20 marks. Three families recur directly:

- Functional/non-functional requirements plus scenario acceptance criteria: 4 marks in each.
- Cyclomatic complexity: 4 and 5 marks, with calculation plus possible refactoring judgement.
- Deployment/SDLC failure diagnosis: 4 and 3 marks.

The rotating questions cover essential/accidental complexity, feature-branch/MR trade-offs, cohesive-module refactoring, and contextual TypeScript trade-offs. The scoring form is consistently **name/classify -> cite scenario evidence -> explain consequence/trade-off -> propose a matched change if asked**. Long essays are explicitly unnecessary.

### Broad theory pattern

MCQs deliberately rotate across most lecture families, so absence from one paper is weak evidence. Common distractors overclaim that a tool “always,” “never,” “eliminates,” “guarantees,” encrypts, authenticates, or proves correctness. Knowing each concept's boundary matters more than memorising a positive slogan.

Repeated or pervasive MCQ families include SDLC/process models, npm/package metadata, static/dynamic verification, HTTP/status/auth, requirements/AC, TypeScript/JavaScript semantics, maintainability/team practice, CI/CD/deployment, and Swagger scope. One-paper rotating items include persistence, FSMs, coercion, password hashing, Git command side effects, first-class functions, elicitation, and validation activities.

### Exam-resource effect on eventual handwritten allocation

The resources supplied in the exam are strongest for exact syntax and weakest for course-specific reasoning.

Safe to compress/look up:

- exhaustive JavaScript method lists;
- full TypeScript syntax reference;
- full Express API surface;
- exhaustive Jest/Vitest matcher catalogues;
- every `sync-request-curl` option;
- complete OpenAPI YAML grammar;
- install/setup commands and project-specific constants.

Still needs instant recall or a tiny anchor:

- method-selection/algorithm patterns and edge-case interpretation;
- missing-vs-falsy and type-narrowing patterns;
- exact exception wrapper/precedence checklist;
- body/query/path/header selection and web-string conversion;
- success/error result to HTTP status/body mapping;
- coverage-path reasoning and the two-process `c8` workflow;
- requirements/design/process distinctions and compact answer templates;
- contract navigation: method -> path -> input -> schema -> responses/errors -> ordering/side effects.

Important environment mismatches:

- Starter tests use **Vitest**, while the final resource list supplies **Jest** Globals/Expect documentation. Use the starter imports and `package.json` as authority; Jest docs are only a broadly compatible matcher reference.
- Practice repositories install Express 5.2 while the provided PDF is Express 4. Core route/request/response patterns are stable, but starter types/compiler outrank the PDF on discrepancies.
- Swagger preview (`Shift + Alt + P`) is provided, but no OpenAPI authoring reference is listed. Practice tasks assess contract reading and design content more strongly than YAML authoring.

### Practical exam-operating rules exposed by starter code

- Read which files are collected before coding; uncollected edits are replaced in automarking.
- Read the prompt, Swagger, starter types/backend, visible tests, and `package.json` together. None is infallible in isolation.
- Preserve prototypes and architecture when the task forbids logic or helper changes.
- Run every relevant check: ordinary tests do not replace `tsc`, lint, or coverage.
- Public tests are scaffolding, not the full contract; both papers contain minor gaps or inconsistencies.
- Exact strings, punctuation, field ordering, JSON shapes, response status, result ordering, state effects, and request channels recur as marked behaviour.
- Save explicitly; running autotests does not save work.

### Updated priority order

**Tier A - practise deeply**

1. Base JavaScript problem solving and edge cases.
2. TypeScript structured data, optional fields, unions/narrowing, exact validation and exception processing.
3. Swagger navigation, backend contract implementation and thin Express wrappers.
4. Vitest coverage-complete unit tests and `c8` HTTP coverage.
5. Nested object filtering/grouping/aggregation.
6. Requirements + Given/When/Then, cyclomatic complexity, and deployment/process diagnosis.

**Tier B - compact immediate recall**

- HTTP status/input/auth decisions; REST/state invariants.
- Static/dynamic verification and TypeScript trade-offs.
- DRY/KISS/YAGNI, cohesion/coupling and behaviour-preserving refactoring.
- SDLC/Waterfall/Agile and CI/delivery/deployment.
- Git state flow, branch/MR/review trade-offs.
- npm manifest/dependency roles.

**Tier C - retain a small rotation-proof definition**

- persistence lifecycle/trade-off;
- state-machine vocabulary;
- hashing/encryption/signing;
- UAT/validation;
- UML/ER/use-case notation;
- Agile framework details;
- security vulnerability taxonomy and monitoring.

Do not remove Tier C: MCQs rotate broadly. It simply should not displace the repeated 10-mark practical procedures.

### Remaining source limitation

The tutorial-solutions GitLab repository and lab-solution page require UNSW authentication in the current environment. They will be locally mirrored inside the exam, but their complete source paths/patterns could not yet be verified here. Downloading the tutorial `solutions` branch and lab solutions into this workspace would allow a final lookup-index pass before cheatsheet design.

## Added project Swagger evidence

The supplied `Example swagger/swagger.yaml` was subsequently inspected as a complete contract. It is a 1,736-line Swagger 2.0 project file with 22 path entries and 26 operations. It materially improves our knowledge of the course's project-contract style, but it is not a clean official template and does not change the overall Tier A ordering above.

### What it confirms

- Course files may use Swagger 2.0 with a custom `x-components` tree divided into primitive, grouped-object, path, header, body and return definitions.
- Body inputs use `in: body` plus `schema`, while path/query/header parameters place `type` beside their `in` and `name`. This must not be confused with OpenAPI 3 `requestBody`/`content` syntax used by other practice material.
- `$ref` is central: a route is read by following method/path -> parameters -> referenced body/path/header definitions -> response status -> referenced return schema.
- Global `SessionAuth` can protect every operation, with public operations locally opting out through `security: []`. Security inheritance must be checked even when a route does not visibly list it.
- The contract contains body, query, path and header examples; multiple verbs on one resource; array/object response envelopes; enums/ranges/required fields; and 200/400/401/403 mappings.

### Reliability warning

This particular file contains five unresolved schema references (`Action`, `RecommendedAction`, `SocietyOpportunity`, `SocietyEvent`, and `LastAttendedEvent`), unused/duplicated definitions, incomplete `required` declarations, naming drift, and a suspicious unauthenticated state-mutating society route. A YAML parser can accept a document that is still semantically broken. Therefore it is evidence for structure and navigation, not authority for statuses, auth, error precedence or data shapes.

The exam's explicit question text and current Swagger remain primary, followed by starter types/runtime constraints and then visible tests. This project file is only a structural fallback.

### Priority effect

- **Confirmed Tier A:** rapid Swagger contract navigation and translation into thin Express wrappers remains one of the strongest practical targets across both practice exams.
- **Further demoted:** memorising a large YAML template or complete OpenAPI grammar. The papers use both OpenAPI 3 and Swagger 2, and exact contracts are supplied/previewable.
- **Retain a tiny eventual cue:** check version; path + method; every input location and web-string conversion; `$ref` target; success/error status and body; global/local security; side effects and error precedence.
- The example folder has no matching `server.ts`, backend, HTTP tests or `package.json`, so it does not close the remaining Express/Swagger implementation-example gap on its own.

Detailed evidence is recorded in `swagger_example_content.md`, `swagger_example_exam_value.md`, and the added Swagger section of `lab_solution_patterns.md` in this directory.
