# Practice Exam 2 discovery report

This report analyses the official COMP1531 26T2 Practice Exam 2 question pages, its embedded Q24 Swagger contract, and every relevant file in `Practise Exams/pracexam2_startercode`. It is an evidence inventory and prioritisation update only: it does **not** provide answers or completed submissions.

## Exam shape and implications

- **100 marks, 25 questions, 3 hours working plus 10 minutes reading.**
- **Theory = 50 marks:** Q1–15 MCQ (30, 2 each), Q16–20 short answer (20).
- **Programming = 50 marks:** Q21–25 (10 each).
- The split exactly confirms the exam briefing's “about 50% theory / 50% practical”.
- MCQ has seven single-select and eight multi-select questions. Multi-select is all-or-nothing: no partial or negative marks.
- Short answers explicitly ask for only a few correct phrases, dotpoints, or sentences. This rewards compact definitions, decision rules, and one justified example rather than essays.
- Every practical question is worth the same amount, but differs sharply in scope: basic JavaScript; TypeScript validation/exceptions; object-array aggregation; backend plus HTTP wrapper; and coverage-driven tests.
- Provided tests are visible and useful, but submissions collect only named files and all other files are replaced. Therefore students must preserve prototypes/file names and infer hidden cases from the written contract, not merely satisfy visible tests.
- Packages are preinstalled in the exam. Installing dependencies and memorising installation commands are unnecessary.

## Mark map by topic

| Evidence | Marks | Primary lecture topics |
|---|---:|---|
| Q1–2 | 4 | SDLC, Waterfall versus adaptive processes |
| Q3 | 2 | Conceptual modelling, finite-state machines |
| Q4 | 2 | HTTP status semantics, authentication/authorisation |
| Q5 | 2 | Continuous Integration and automated tests |
| Q6 | 2 | User stories and acceptance criteria |
| Q7 | 2 | JavaScript coercion and dynamic typing |
| Q8 | 2 | Code review and teamwork |
| Q9 | 2 | `package.json` and npm |
| Q10–11 | 4 | Authentication/authorisation and password hashing |
| Q12 | 2 | Continuous deployment distinction |
| Q13 | 2 | Stateless HTTP/system design |
| Q14 | 2 | Static verification/linting |
| Q15 | 2 | Requirements elicitation |
| Q16 | 4 | Maintainability, responsibility/cohesion, refactoring |
| Q17 | 4 | Functional/non-functional requirements, scenario acceptance criteria |
| Q18 | 4 | Static versus dynamic type systems; contextual trade-off judgement |
| Q19 | 3 | Deployment environments/reproducibility |
| Q20 | 5 | Cyclomatic complexity and behaviour-preserving simplification |
| Q21 | 10 | Core JavaScript strings, arrays, objects and edge cases |
| Q22 | 10 | TypeScript interfaces, validation, exceptions, regex, ordering and transformation |
| Q23 | 10 | Nested object arrays, filtering, grouping and numeric aggregation |
| Q24 | 10 | Swagger reading, backend CRUD/filtering, Express wrapping and HTTP tests |
| Q25 | 10 | Statement/branch/function/line coverage and separate-server HTTP coverage |

This paper samples nearly every major lecture family. Persistence, Agile-specific mechanics, Git commands, UML/ER notation, validation/UAT, and security attacks do not receive direct questions here, but a single practice paper is not enough evidence to exclude them.

## Q1–15: MCQ discovery (30 marks)

Each item primarily checks whether the student can distinguish a correct definition/application from plausible but overclaimed alternatives.

### Q1–2: SDLC models

- Q1 gives stable requirements, documentation/compliance, sequential phases and asks for the fitting lifecycle model.
- Q2 gives a late external requirements change after design in a sequential process and asks for the underlying process weakness.
- Required depth: recognise scenario signals and explain the cost of fixed early requirements/late feedback.
- Trap pattern: distractors describe genuine project risks, but not the risk established by the scenario.
- Resources: lecture slides can recover definitions, but looking them up is slow for 2-mark recognition questions. The compact scenario cues are worth knowing cold.

### Q3: state machines

- Tests what causes a transition between states.
- Required depth: know the vocabulary of states, events/conditions, transitions and actions.
- Trap: confuse implementation elements such as functions/classes/variables with model semantics.
- Resources: slides make memorisation less necessary, but the definition is tiny and high-value.

### Q4: HTTP 401 versus 403

- Tests the precise authentication/permission distinction.
- Required depth: interpret an authenticated-but-not-permitted case.
- Trap: treating the codes as interchangeable or assuming one is obsolete.
- Resources: MDN HTTP is available, so a status table can be looked up. A compact 400/401/403/404/500 distinction is still faster under exam pressure and supports Q24.

### Q5: CI without adequate automated testing

- Tests why frequent integration only helps when checks catch faults.
- Required depth: link pipeline frequency to the risk of faulty code entering the shared branch.
- Trap: confusing CI with manual merging or deployment speed.
- Resources: lecture slides available; retain the one-line purpose/limitation rather than tool configuration.

### Q6: acceptance criteria

- Tests their role as measurable completion conditions for a user story.
- Trap: claiming they replace requirements/testing or prescribe technical implementation.
- This directly predicts the construction task in Q17.

### Q7: JavaScript coercion

- Gives addition with a number and a string.
- Required depth: predict that dynamically typed JavaScript can coerce operands and produce surprising behaviour, rather than necessarily raising an error.
- Resources: MDN can confirm operator semantics, but basic coercion is faster to know.

### Q8: code-review benefits (multi-select)

- Candidate properties cover early bug discovery, knowledge sharing, coding standards, and an absolute claim that review eliminates testing.
- Trap pattern: multi-select options often include an attractive true practice plus an absolute false overclaim (`eliminates`, `guarantees`, `automatically`).

### Q9: `package.json` roles (multi-select)

- Tests project metadata, dependencies, npm scripts, and the distinction from compiled source/artifacts.
- Resources: Node/npm documentation is not explicitly in the list except general Node docs. This compact triad is worth retaining; installation syntax is not.

### Q10: authentication and authorisation (multi-select)

- Tests identity versus access rights in both directions.
- Required depth: map each term precisely; no implementation detail.

### Q11: password hashing (multi-select)

- Tests deterministic same-input hashing, one-way/non-reversible intent, credential protection after a leak, and rejects decryptability.
- Caveat: the question is simplified. The eventual study notes should keep salts/slow password hashing alongside determinism so the statement is not overgeneralised into insecure practice.

### Q12: continuous deployment (multi-select)

- Tests automated production release after pipeline checks and end-to-end automation.
- Trap: manual approval describes continuous delivery, while scheduled/bundled releases conflict with deploy-every-passing-change.

### Q13: stateless design (multi-select)

- Tests independent requests containing their required processing information and no reliance on previous requests.
- Trap: confusing durable application data with per-client conversational/session state. The options specifically contrast independent requests with server memory of user sessions.

### Q14: linting (multi-select)

- Tests early syntax/style issue detection and consistent standards.
- Trap: claims that lint eliminates all runtime bugs or automatically improves performance.
- Resources: not worth consulting documentation during the MCQ; know the capability boundary.

### Q15: requirements elicitation (multi-select)

- Tests interviews and stakeholder workshops/brainstorming as discovery techniques.
- Trap: confuse elicitation with later validation/UAT or verification against a specification.

## Q16–20: short-answer discovery (20 marks)

### Q16: design principles (4 marks)

- The supplied `helpers.js` holds mutable user-account state/accessors and unrelated arithmetic operations in one module.
- Part (a), 2 marks: identify and justify the maintainability problem in terms of mixed responsibilities, weak cohesion/separation, and reasons those concerns change for different causes.
- Part (b), 2 marks: show a small refactor that separates the concerns while preserving exported behaviour. The expected depth is concrete file/module organisation, not an architectural essay.
- Exact patterns worth being able to express: named `export`/`import`, one cohesive responsibility per module, and behaviour-preserving refactoring.
- Trap: merely renaming the file or functions does not resolve the structural problem; DRY is not the central issue because duplicated logic is not shown.
- Resources: slides can provide principles, but the response requires applying one to code. A compact diagnostic test (“what reasons would this module change?”) is more useful than memorising a slogan alone.

### Q17: requirements engineering (4 marks)

- Part (a), 1 mark: classify a requirement governing what a forum lets students/staff do.
- Part (b), 3 marks: write two scenario-based acceptance criteria covering the student's privacy choice and staff identifiability.
- Expected syntax/pattern: `Given ... When ... Then ...`, with observable actor-specific outcomes and at least two meaningful scenarios.
- Traps: implementation language, vague untestable statements, repeating the requirement rather than constructing scenarios, or overlooking one actor/visibility condition.
- Resources: lecture/tutorial materials may contain templates, but a one-line Given/When/Then skeleton is worth knowing because the task is generative.

### Q18: type systems (4 marks)

- Part (a), 2 marks: benefits and drawbacks of migrating a small JavaScript codebase to TypeScript.
- Part (b), 2 marks: make and justify a recommendation using the scenario: about 5K LOC, early startup, emerging market and frequent change.
- Expected depth: balanced trade-offs—earlier error detection/tooling/refactor confidence versus migration/annotation/learning/maintenance cost and possible friction—then contextual judgement. There is no universal one-word answer.
- Trap: describing TypeScript as eliminating runtime bugs or treating static typing as cost-free; failing to connect the recommendation to codebase size and volatility.
- Resources: TypeScript cheatsheets document syntax but not this engineering trade-off, so conceptual reasoning belongs in study preparation.

### Q19: deployment (3 marks)

- Scenario: code manually copied from one development laptop to production, where it crashes and features are missing.
- Required depth: diagnose environment/dependency/configuration/version drift or incomplete/manual artifact transfer, then propose one reproducible automated deployment/build approach.
- Traps: giving only “test more” without addressing environmental consistency, or proposing a tool name without explaining reproducibility.
- This promotes deployment beyond the lecture-only “know, allocate less space” status: it is a direct short-answer question.
- Resources: slides can recover terminology, but the cause → solution pairing should be readily recalled.

### Q20: cyclomatic complexity (5 marks)

- Part (a), 2 marks: calculate the function's cyclomatic complexity from nested `if`/`else if` decisions.
- Part (b), 3 marks: decide whether surface refactoring can lower true decision complexity while preserving all mappings, and justify with code where possible.
- Required skills: count independent decision points/paths correctly; distinguish flattening/nicer structure from actually reducing required behavioural cases; recognise data/table-driven formulations and the possibility that measured branch syntax changes without eliminating domain complexity.
- Traps: counting every `else` as a new decision; assuming fewer lines or early returns automatically means lower cyclomatic complexity; giving code with changed behaviour.
- Resources: slides contain the graph formula, but the question uses source-level control flow. A decision-count rule plus the warning above is faster than reopening a deck.

## Q21: base JavaScript problem solving (10 marks)

The exam explicitly labels this “base JavaScript knowledge”. It asks for three independent functions in `assorted.js`:

- reverse a case-sensitive string (3);
- build case-insensitive character frequencies as an object (3);
- find the second-largest **unique** array value or `undefined` (4).

### Required skills and patterns

- String traversal/indexing, `.length`, case conversion, concatenation or array/string conversion.
- Object-as-frequency-map updates and bracket access with a computed character key.
- Arrays, uniqueness/frequency reasoning, comparisons/sorting/filtering, and careful return of `undefined`.
- ESM named exports are already supplied and must not be changed.
- Vitest visible tests use `describe`, `test.each`, `.toBe`, `.toStrictEqual`, and `.toBeUndefined`.

### Contract traps and expected depth

- Preserve case and all character positions for reversal; empty and one-character inputs are visible boundaries.
- Frequency is case-insensitive and the empty object is expected for an empty string.
- “Unique” is semantic, not merely deduplication: examples show that repeated numbers are excluded from candidacy. Arrays with fewer than two qualifying values must return `undefined`.
- Hidden tests can include negatives, unusual ordering, more duplicates, or values not represented by the visible examples. Do not hard-code outputs.
- Only `q21/assorted.js` is collected; definitions/prototypes must remain exact.

### Resource effect

MDN JavaScript makes individual method signatures (`sort`, `filter`, `reduce`, `Set`, string/array methods) look-up-able. It does not choose the algorithm or resolve “unique” semantics. Therefore do not spend much handwritten space listing many methods; prioritise edge-case interpretation and a few high-use iteration/update patterns.

## Q22: validation and exception processing (10 marks)

Despite the official page saying `q23/validate.ts` and `q23/process.ts`, the starter repo and submission rule use **q22**. This is an official wording typo/caveat, not a topic difference.

### Part (a): `validateAstronaut` (5)

- Input is an `AstronautProfile` interface whose six properties are optional.
- Supporting file supplies `requiredFields: (keyof AstronautProfile)[]` and an uppercase-alphanumeric six-character regex.
- The function returns one exact success string or throws exact error messages for insufficient hours, malformed ID, missing pilot certification, and missing required fields.
- Missing-field names must be alphabetically sorted and interpolated into exact punctuation/quotes.
- Error precedence is explicitly contractual: missing fields first; otherwise the listed validation order.

### Part (b): `processCrewApproval` (5)

- Transform an array of profiles into `Approval[]`, preserving input order.
- Call the validator for each profile; success becomes an approved record and a thrown failure becomes an unapproved record containing the thrown message.
- Required patterns: import the validator, array transformation or loop, `try`/`catch`, error-message extraction/narrowing, object construction, optional fields/types.

### Traps and hidden-test implications

- A truthiness-only missing-field test can wrongly classify legitimate falsy values (`0`, `false`, empty arrays); “missing” should be interpreted from field presence/`undefined` and the contract.
- Accessing `flightHours`, ID or certifications before required-field validation can crash or violate precedence.
- Exact-message matching means punctuation, apostrophes, order and interpolation matter.
- Visible tests demonstrate the correct exception assertion pattern: `expect(() => validateAstronaut(...)).toThrow(...)`.
- TypeScript's `catch` value may need narrowing before safely reading `.message`; casting everything to `any` forfeits the static-verification benefit.
- A field exists for medical clearance but the published thrown-error list does not state a failure for `false`; implementation must follow the written contract, not invent policy.

### Resource effect

The TypeScript type/control-flow sheets and Jest `expect` docs reduce the need to memorise broad type syntax or matcher inventories. They do not supply required-field detection, exception precedence, regex application, message formatting or error narrowing in this exact setting. Those patterns remain high-value.

## Q23: nested object aggregation (10 marks)

Two functions operate on arrays of deeply nested, typed booking records:

- total guests grouped by campus (5), excluding the alumnus;
- total revenue grouped by membership tier (5), applying registration, event, guest, photography, merchandise and donation rules.

Both calculations include **only confirmed bookings**.

### Required skills and patterns

- Read nested interfaces and literal-union types.
- Initialise a complete accumulator with zeroes for every required group.
- Filter/skip unconfirmed records before any aggregation.
- Group by values whose output key casing differs (`Sydney` → `sydney`, membership literals → lowercase result keys).
- Sum nested counts and conditionally priced booleans; map merchandise variants to prices; include donations.
- Suitable mechanisms include straightforward loops or `filter`/`reduce`; correctness and clarity matter more than using advanced functions.
- Tests use object spread for fixtures and strict object equality.

### Traps and expected depth

- The attendee is not a guest; only adults + children count.
- Excluding unconfirmed bookings applies to both functions and all revenue components.
- Return objects must include zero-valued groups even if there are no matching bookings.
- Revenue is grouped by the booking holder's membership tier, not campus or item category.
- There are many independent price components, so omitted terms and boolean double-counting are more likely than algorithmic difficulty.
- Hidden tests may isolate each price component; a well-factored price lookup/source of truth reduces mistakes.

### Resource effect

MDN can provide `reduce`, `filter`, `map`, object and array syntax, but not reconstruct the pricing contract. The useful preparation is a robust accumulation template and a checklist for every stated component, not memorisation of these exam-specific prices.

## Q24: Swagger-driven backend and server wrapping (10 marks)

This is the strongest direct confirmation that Swagger is not merely theory. The student must read an embedded OpenAPI interface, implement missing backend functions in `rugby.ts` (4), and implement Express routes in `server.ts` (6). `/clear` and much of validation/add/list starter code are already supplied.

### Contract to extract from Swagger

- `POST /match/add`: JSON request body, success and validation-error bodies.
- `GET /match/list`: `{ matches: Match[] }` in creation order.
- `GET /match/search`: optional query parameters `country`, `group`, `tied`; all supplied filters combine conjunctively.
- `DELETE /match/{matchId}`: integer path parameter.
- `DELETE /clear`: already wrapped.
- The contract supplies schemas, required fields, enums, numeric ranges, date pattern, `$ref`s, status codes and error codes.

### Backend skills

- Validate enums and combinations, then return exact-shaped success/error objects.
- Filter by optional arguments: an omitted filter must not exclude records; country may match either team; `tied` has boolean semantics; combined filters all apply.
- Find/remove by stable ID and preserve uniqueness after deletion. Starter `matches.length` ID generation is explicitly exposed as unsafe by a test after deletion; persistent next-ID thinking is required even without file persistence.
- Return creation order and remove exactly one item without disturbing others.
- Understand TypeScript literal types derived from constant arrays: `type GroupName = typeof Groups[number]`.

### Server-wrapper skills and exact patterns

- Import backend functions, define the four missing route handlers, extract `req.body`, `req.query`, and `req.params` in the correct places.
- Parse/string-normalise HTTP inputs: path parameters arrive as strings; query booleans require deliberate conversion rather than JavaScript truthiness (`"false"` is truthy).
- Call the backend once, inspect its result, return status 400 for the documented error objects and 200 for success, with the backend object as JSON.
- Middleware is provided: `cors()`, `json()`, `morgan()`; 404 middleware is already positioned after routes.
- HTTP test helpers demonstrate `sync-request-curl`: `{ json: ... }`, `{ qs: ... }`, `res.statusCode`, and `res.getJSON()`.

### Swagger/YAML traps

- The embedded contract declares `openapi: 3.0.3`; request bodies and responses therefore use OpenAPI 3 `requestBody`/`content` structure rather than the Swagger 2 `in: body`/response-`schema` style found in the supplied project example and Practice 1 Q31.
- The displayed contract, not assumptions about conventional REST naming/statuses, controls marking: creation is documented as 200 rather than 201 and paths are action-oriented.
- There is an internal schema inconsistency: `Match.matchId` is declared as a string/example `"M10"`, while add response and delete path declare integers and starter/tests use numbers. The executable question context overwhelmingly establishes numeric IDs. Students must notice such inconsistencies and use question/tests/starter evidence rather than blindly following one isolated schema line.
- Swagger documents validation branches not covered by visible tests (invalid team country, negative points, possession range/total). Existing starter code implements these, illustrating that visible tests are incomplete.
- `Date.parse` and a simple regex can disagree with genuine calendar validity in edge cases; this starter is supplied, but it is a warning for hidden-contract reasoning.

### Resource effect

- Swagger itself is embedded and previewable, so memorising full OpenAPI YAML is **unnecessary for this question**. The skill being assessed is rapid navigation: find path → method → input location/schema → responses/errors.
- The Express API PDF and `sync-request-curl` docs are available, reducing the need for exhaustive route/request syntax. A compact wrapper skeleton and input-location/conversion table are still high-value because six marks depend on executing the contract quickly.
- ARC is useful for manual probing but cannot replace automated HTTP tests or backend reasoning.

## Q25: coverage-driven testing (10 marks)

This is a direct, implementation-level coverage question rather than a definition question.

### Part (a): basic coverage (6)

- Write Vitest tests for `determineOutcome` to achieve **100% statement, branch, function and line coverage**.
- Exactly one function call is permitted per test.
- The implementation is declared correct; tests are judged only for coverage, not clarity/design.
- The function contains a filtered solved-count calculation, two early elimination conditions, a compound champion condition, a compound qualification condition, a disjunctive continuation condition, and a final fallback.

Required skills:

- Read coverage as control-flow obligations, not merely output categories.
- Select inputs that exercise true/false outcomes of short-circuited `&&` and `||` subconditions as well as each return statement.
- Use one fresh result object and one assertion/call per test; vary disqualification, penalty boundaries, rank, score, solved count and penalty threshold deliberately.
- Run `npm run test-progcomp` and use the uncovered branch report to refine partitions.

Trap: one test for each of the four returned labels may reach 100% statements but still miss branches within compound Boolean expressions. Boundary values at `>=` and `<` are particularly important.

### Part (b): HTTP coverage (4)

- Write HTTP tests for `POST /player/outcome` so `progcomp.ts` and `server.ts` reach 100% **statement** coverage.
- Server is run separately under `c8` using `npm run start-coverage`; HTTP tests run in another process.
- Hint explicitly encourages reuse of part (a)'s input partitions through HTTP.
- Required request pattern: `request('POST', SERVER_URL + '/player/outcome', { json: { result } })`, then inspect response status/body as needed.

Traps:

- Running ordinary Vitest coverage over the client tests cannot instrument the separate Express process.
- The route expects `{ result: ... }`, not the `Result` fields directly at the body root.
- The server returns a JSON string value, not an object wrapper.
- For c8, the report is normally emitted after the instrumented server stops cleanly; inspecting too early can mislead.

### Resource effect

Jest/Vitest matcher docs and `sync-request-curl` docs remove the need for a long assertion/reference catalogue. They do not teach coverage input selection, short-circuit branch obligations, or separate-process instrumentation. These are among the highest-value concepts to prepare.

## What Practice Exam 2 changes in `master_discovery.md`

### Confirmations

- Confirms exact **50/50 theory/practical** structure and five equally weighted coding tasks.
- Confirms core JS/TS, testing/coverage, HTTP/Express/Swagger, design/complexity, requirements, SDLC, CI/CD, auth and deployment are all genuinely examinable.
- Confirms short-answer theory values concise definitions plus applied justification, not long prose.
- Confirms hidden-test thinking: written contracts, exact strings/shapes, error precedence, boundary cases and side effects matter.
- Confirms `req.body`/`req.query`/`req.params`, status/body mapping, `sync-request-curl`, exception wrapper assertions and separate c8 server instrumentation as practical patterns.

### Promotions

1. **Basic algorithmic JavaScript** rises to the very top. A full 10 marks is explicitly strings/arrays/object maps/uniqueness, separate from application architecture.
2. **Object-array aggregation** deserves its own high-priority pattern: nested records, confirmed-only filtering, grouped zero-initialised accumulators, lookup tables and conditional totals (10 marks).
3. **Exceptions plus TypeScript optional-field handling** is a full 10-mark task, including exact messages, precedence, regex, `keyof`, sorting and `try/catch` transformation.
4. **Coverage test design** is a full 10 marks, not merely interpreting a report. Short-circuit Boolean branches and one-call-per-test constraints must be practised.
5. **Swagger reading and route implementation** is concretely a 10-mark task. Full YAML authoring is less important than rapidly extracting method/path/input/responses and reconciling it with code/tests.
6. **Deployment reproducibility/environment parity** rises from lower priority because it directly receives a 3-mark diagnosis-and-solution question.
7. **Static versus dynamic typing trade-offs** rises: students must evaluate TypeScript adoption contextually, not only write annotations.
8. **Cohesive module refactoring** rises: an applied four-mark design question asks for both diagnosis and code restructuring.

### Demotions or space savings

- Full OpenAPI syntax can be demoted relative to Swagger **navigation/contract-reading**, because the exact interface is embedded and preview tools are available.
- Exhaustive JavaScript, TypeScript, Express, Jest and Node method/API catalogues should be demoted because official documentation is supplied. Keep only high-frequency skeletons and semantic traps.
- npm installation commands can be heavily demoted: dependencies are preinstalled and `npm install` is explicitly unnecessary in the exam environment.
- Memorising project-specific constants/prices/error texts remains low value; they are supplied in each prompt. Preparation should focus on systematically translating supplied rules.
- Persistence does not appear in this paper and can be somewhat demoted relative to exception processing, aggregation, HTTP and coverage—but not excluded, because the exam briefing names project content broadly.
- Git command syntax and detailed Agile mechanics do not appear here. Keep compact conceptual coverage pending evidence from Practice Exam 1 rather than allocating large space.

### Missing/unconfirmed topics in this paper

- File persistence/startup reload/write-through behaviour.
- Git solo/team commands, branching and merge conflicts.
- Agile values/framework mechanics beyond SDLC adaptation.
- UML class/ER/use-case diagram construction; only state-machine recognition appears.
- Verification versus validation/UAT distinction.
- Requirement specification quality/INVEST beyond acceptance criteria and elicitation.
- Auth implementation/tokens/session headers; only definitions, 401/403 and hashing theory appear.
- Security vulnerabilities/attacks, monitoring, advanced deployment, CI YAML, or actual pipeline implementation.
- Swagger file editing/repair itself: Q24 requires consuming the contract, not modifying YAML.

These remain candidates until Practice Exam 1 and tutorial/lab patterns are cross-checked; absence from one balanced paper is weak negative evidence.

## Likely cross-practice pattern predictions

Without relying on a Practice Exam 1 report, Practice Exam 2 strongly suggests a reusable template for final-exam construction:

1. Broad MCQs sample many lecture topics once each, using scenario recognition and absolute-statement distractors.
2. Short answers mix one applied maintainability/design item, one requirements item, one contextual trade-off, one project/process diagnosis, and one metric/model task.
3. Programming begins with isolated core-language problems, progresses to typed validation/data transformation, then asks for a backend/server contract task and a testing/coverage task.
4. Each practical prompt supplies domain-specific rules and tests; the transferable skill is contract decomposition, not memorising the domain.
5. Visible tests are scaffolding, while wording highlights hidden-test traps such as exact order, uniqueness, only-confirmed filters, stable IDs and full branch coverage.

## Recommended preparation evidence after this paper

- Cross-check Practice Exam 1 for repeated practical archetypes and topics absent here.
- Inspect tutorial/lab solutions specifically for: exception validation patterns, object aggregation, Express wrappers/query conversion, Swagger navigation, and coverage/c8 workflows.
- Do not yet build the final A4 sheet. First use both practice papers to decide which concepts require handwritten recall versus which can be efficiently retrieved from the supplied offline docs.

## Source caveats

- Official Q22 page mistakenly names `q23/validate.ts` and `q23/process.ts`; starter/submission files are under q22.
- Q24 Swagger `Match.matchId` says string while its add response, delete path, starter implementation and all tests use number.
- Q24 visible test labelled “invalid calendar date” uses a value that also fails the format regex, so it does not independently exercise parse-level invalidity.
- Q24 visible combined-filter setup tries to add Spain, which the starter correctly rejects; that record is irrelevant to the expected result and should not be used to infer Spain is valid.
- Q25 script refers to `progComp.test.ts` with a capital `C`, while the file is `progcomp.test.ts`; this may be case-sensitive depending on the environment. It is an operational caveat, not examinable content.
- Online resources label Jest documentation while starter tests import Vitest. The common globals/matchers shown are compatible, but course execution uses Vitest.
