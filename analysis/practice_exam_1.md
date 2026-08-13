# Practice Exam 1 discovery (COMP1531 26T2)

This report analyses the official Practice Exam 1 question pages, both embedded Swagger contracts, and all supplied starter, test, package, TypeScript, ESLint, and Vitest files. It deliberately does **not** provide answers or submission-ready implementations.

## Executive conclusions

- The practice paper strongly confirms a roughly **half-theory / half-practical** assessment, but its published navigation is internally inconsistent with the generic exam overview. The practice material contains Q1–31, comprising 20 MCQs, five short answers, and six practical/design questions. The headings add to 100 marks only if Q30 is treated as 10 marks, although its two stated parts add to 15. The generic overview instead says 25 questions: 15 MCQ, five short answer, five programming. Treat the practice paper as evidence of **question style and depth**, not a guaranteed exact final count or allocation.
- The strongest practical cluster is now unambiguous: **base JavaScript manipulation, TypeScript repair, exact exception behaviour, Express route wiring from Swagger, coverage-driven test construction, and HTTP API design**.
- The strongest theory cluster is broad recognition plus concise application: **SDLC, Git/npm, verification/coverage, HTTP/persistence/auth, requirements/validation, maintainability, complexity, TypeScript, Swagger, functions, and deployment**.
- Several questions are scaffolded so that the candidate is not building a system from scratch. They must read an existing contract and codebase, preserve supplied logic, fill a deliberately narrow gap, and satisfy observable behaviour. Fast comprehension of unfamiliar starter code is therefore a first-class exam skill.
- Supplied documentation makes obscure library signatures searchable, but does not eliminate the need to know the conceptual choice or common pattern. Finding documentation during a three-hour exam is slower than recognising whether data belongs in `req.params`, `req.query`, `req.body`, or a header, or knowing how to interpret a coverage report.

## Exam and environment evidence

- Practice heading: 10 minutes reading, three hours working, 40% hurdle after scaling.
- The exam environment preinstalls packages; running `npm install` is unnecessary.
- Only specifically provided files/resources may be accessed. The environment supplies lecture slides, tutorial solutions, lab solutions, MDN JavaScript/HTTP, TypeScript cheatsheet images, Vitest documentation, Express API PDF, `sync-request-curl` documentation, Node documentation, Swagger preview, and ARC.
- Questions state exactly which files are collected. Non-collected files are replaced during marking.
- Saving and submitting are separate. Running autotests does not save work. Repeated submissions are allowed and the last is marked; otherwise the saved working-directory file is used.
- Public checks are invoked per workspace through the supplied npm scripts. Hidden automarking replaces everything except the collected answer files, so solutions must not depend on edits to tests, configuration, backend helpers, or other uncollected files.

## Mark and topic map

| Questions | Published marks | Form | Dominant topics |
|---|---:|---|---|
| Q1–20 | 20 | 14 single-select + 6 multi-select | SDLC, Git/npm, verification, HTTP, persistence, branch coverage, exceptions, authz/trust, maintainability, requirements, TypeScript, Swagger, functions, status codes, validation |
| Q21 | 4 | short answer | functional/non-functional requirement; scenario acceptance criterion |
| Q22 | 4 | short answer | essential versus accidental complexity |
| Q23 | 4 | short answer | feature branches, merge requests, collaboration trade-offs |
| Q24 | 4 | short answer | diagnosing deployment failures through SDLC phases |
| Q25 | 4 | calculation | cyclomatic complexity from source control flow |
| Q26 | 10 | JavaScript implementation | arrays, objects, strings, iteration/transformation, copying |
| Q27 | 10 | TypeScript repair | annotations, interfaces/unions, return types, inference, lint |
| Q28 | 6 | TypeScript implementation | validation, missing optional fields, exceptions, exact strings/order |
| Q29 | 14 | Express implementation | Swagger-to-route translation, all request input channels, status mapping |
| Q30 | heading 10; parts state 10 + 5 | unit + HTTP test writing | statement/branch/function/line coverage, Vitest, c8, black-box HTTP |
| Q31 | 10 | hand-marked API design | requirements-to-REST design, auth/authz, errors, resources and status codes |

## Q1–20: multiple choice

Each question is one mark with no partial or negative marking. Q1–14 are single-select. Q15–20 are multi-select and may have any number of correct options, including none or all. That format rewards exact boundaries between similar concepts and punishes selecting a merely plausible extra statement.

### Q1 — SDLC membership

- Skill: recognise canonical lifecycle phases and reject an adjacent project-management concern.
- Lecture mapping: Software Process / SDLC.
- Expected depth: recall only.
- Trap: treating every useful software activity as a named SDLC phase.
- Resource effect: slides can resolve this, but looking it up is inefficient; the phase sequence deserves instant recall.

### Q2 — Git local-to-remote sequence

- Skill: order the transitions from working directory to staging, local repository, then remote.
- Lecture mapping: Git – Solo Usage.
- Exact pattern under assessment: `git add` -> `git commit` -> `git push`.
- Trap: confusing `pull` with publishing or swapping staging and commit.
- Resource effect: course materials contain it, but this is foundational recall.

### Q3 — npm development dependencies

- Skill: distinguish development dependencies from runtime, global, optional, and lockfile behaviour.
- Lecture mapping: Package Management.
- Exact syntax: `npm ... --save-dev`; conceptual association with `devDependencies`.
- Trap: `package-lock.json` is not the defining effect, and `--save-dev` is not global installation.
- Resource effect: Node/npm material can be searched, though the meaning is compact enough to retain.

### Q4 — dynamic verification

- Skill: distinguish executing tests and observing behaviour from static analysis or formal proof.
- Lecture mapping: Dynamic Verification and Static Verification.
- Expected depth: definition/recognition.
- Trap: the word “dynamic” in unrelated runtime/linking contexts.
- Resource effect: lecture slides make this searchable; the contrast should still be memorised.

### Q5 — GET versus POST

- Skill: recognise the usual request-data channel distinction in the course model.
- Lecture mapping: HTTP Server Parts I/II; HTTP reference.
- Expected depth: basic semantics, not implementation.
- Traps: absolute claims about caching, data types, or encryption; HTTP methods do not automatically provide encryption.
- Resource effect: MDN HTTP helps, but route-method basics should be immediate.

### Q6 — write-after-every-call persistence

- Skill: reason about durability/consistency versus disk-I/O performance.
- Lecture mapping: Persistence.
- Expected depth: identify the primary trade-off from a scenario, not merely define persistence.
- Trap: inventing doubled storage, unavoidable corruption, or array-copy behaviour absent from the premise.
- Resource effect: lecture slides help conceptually; answer still requires reasoning from the scenario.

### Q7 — minimum branch-coverage test set

- Skill: map nested decisions to true/false outcomes and choose a minimal input partition.
- Lecture mapping: Code Coverage and Dynamic Verification.
- Expected depth: trace thresholds/boundaries rather than recite a definition.
- Exact pattern: each decision must take both outcomes; threshold values are useful representatives.
- Trap: statement coverage or many tests is not automatically branch coverage; redundant inputs do not replace an uncovered outcome.
- Resource effect: coverage documentation explains metrics, but the candidate must trace the code.

### Q8 — `try` / `catch` / `finally`

- Skill: predict execution order when the `try` throws.
- Lecture mapping: Exceptions.
- Exact syntax/pattern: `try { ... } catch (e) { ... } finally { ... }`.
- Trap: believing `finally` precedes `catch` or is skipped on exception.
- Resource effect: MDN/Node docs make this easy to verify; still a basic control-flow fact.

### Q9 — frontend trust and server-side authorisation

- Skill: identify a broken trust boundary when a client-controlled role is accepted as authority.
- Lecture mapping: Auth plus Security guest lecture.
- Expected depth: security reasoning from a concrete route/browser scenario.
- Trap: blaming hashing, HTTPS, or incidental middleware when the core flaw is trusting mutable client state.
- Resource effect: not mainly a syntax question; concise auth/authz/trust rules are more useful than docs.

### Q10 — YAGNI

- Skill: map a slogan to DRY/KISS/YAGNI/SOLID.
- Lecture mapping: Design for Maintainability.
- Expected depth: recognition.
- Trap: confusing simplest-now (KISS) with do-not-build-speculative-functionality (YAGNI).
- Resource effect: slides provide definitions; acronyms deserve compact recall.

### Q11 — user stories in rapid iteration

- Skill: select a requirements artefact appropriate to Agile and explain why.
- Lecture mapping: Requirements Engineering and Agile.
- Expected depth: contextual comparison of user stories and use cases.
- Trap: absolute claims that either artefact locks architecture or replaces testing.
- Resource effect: slides help; the selection depends on context.

### Q12 — non-functional requirement

- Skill: distinguish system capabilities from measurable quality/capacity constraints.
- Lecture mapping: Requirements Engineering.
- Expected depth: classify examples.
- Trap: any sentence using “must” is not automatically non-functional.
- Resource effect: the distinction should be memorised.

### Q13 — lifecycle cost of skipped documentation

- Skill: identify long-term maintainability and knowledge-transfer impact.
- Lecture mapping: SDLC, Teamwork, Design for Maintainability.
- Expected depth: lifecycle reasoning.
- Trap: selecting short-term delivery benefits or unrelated CI/merge effects.
- Resource effect: conceptual, little value in documentation lookup.

### Q14 — TypeScript `any`

- Skill: understand that `any` disables useful static checking across affected values.
- Lecture mapping: Static Verification and JavaScript/TypeScript.
- Expected depth: conceptual effect in a large codebase.
- Trap: TypeScript does not insert automatic runtime checks or preserve full type safety through `any`.
- Resource effect: TypeScript cheatsheets can confirm types, but the safety consequence should be known.

### Q15 — Swagger/OpenAPI capabilities (multi-select)

- Skill: separate API contract/documentation functions from credential storage, token generation, and transport encryption.
- Lecture mapping: HTTP Servers / Iteration 2 / Swagger management.
- Exact concepts: endpoints, parameters, response contracts, and data schemas.
- Trap: attributing auth implementation or HTTPS to the specification document.
- Resource effect: Swagger preview and examples are available; conceptual scope remains worth remembering.

### Q16–17 — first-class, anonymous, higher-order functions (multi-select)

- Skill: recognise functions stored/passed/returned, anonymous returned functions, closures, and the difference between a function reference and its invoked numeric result.
- Lecture mapping: Advanced Functions.
- Exact patterns: assign a function to a variable; return an inner function; call the returned function.
- Trap: confusing “returns a function” with the type of a later invocation result, or assuming anonymous means immediately executed.
- Resource effect: MDN is useful for terminology, but tracing a small closure must be quick.

### Q18 — HTTP 4xx codes (multi-select)

- Skill: identify client-error status codes by class.
- Lecture mapping: HTTP Servers.
- Exact distinction: 2xx success, 3xx redirection, 4xx client error.
- Trap: treating all non-200 codes as errors of the same class.
- Resource effect: MDN HTTP makes exact codes searchable; class meanings deserve recall.

### Q19 — Git commands that modify the working directory (multi-select)

- Skill: reason about command effects rather than memorise a happy-path sequence.
- Lecture mapping: Git Solo/Team Usage.
- Exact concepts: pulling can update checked-out files; a hard reset can rewrite them; staging and committing do not normally change file contents.
- Trap: confusing repository/index mutations with working-tree mutations.
- Resource effect: no dedicated Git documentation is listed among online references, though slides/tutorials are available. This subtle distinction is a plausible cheatsheet candidate.

### Q20 — validation activities (multi-select)

- Skill: distinguish checking stakeholder/user needs from checking implementation against a specification/design.
- Lecture mapping: Validation; Requirements Engineering.
- Examples being tested: UAT, prototyping, and requirements reviews versus verification against design specifications.
- Trap: “review” is not automatically verification; what is being compared and by whom matters.
- Resource effect: lecture material supports it; the verification/validation test should be instant.

## Q21–25: short-answer theory

The paper explicitly says a few key phrases, dot points, or sentences can receive full marks and that more words do not mean more marks. The practical implication is to prepare compact **classification + justification + application** templates, not paragraphs of prose.

### Q21 — requirements and acceptance criteria (4 marks)

- Part (a), 2 marks: classify a staff access restriction as functional/non-functional and justify based on whether it describes observable system behaviour/capability or a quality constraint.
- Part (b), 2 marks: express scenario-based acceptance criteria for the restriction.
- Lecture mapping: Requirements Engineering and Validation.
- Exact pattern expected: Given precondition/role and available mark categories; When the actor views marks; Then permitted project marks are exposed and exam marks are not.
- Traps: giving only a label without justification; writing an implementation detail; omitting the prohibited outcome; writing a vague criterion that cannot be tested.
- Expected depth: one precise classification justification and one concise black-box scenario.
- Resource effect: slides/tutorial examples help with Given/When/Then, but recalling the template saves time.

### Q22 — accidental and essential complexity (4 marks)

- Scenario: a simple age-from-date route is implemented using a bespoke date parser and seconds-since-1500 calculation.
- Skill: separate the unavoidable domain problem (interpret dates/calculate age correctly) from self-inflicted implementation machinery that established date facilities could mitigate.
- Lecture mapping: Software Complexity; KISS/YAGNI also support the argument.
- Traps: calling the entire route accidental; claiming all date handling is avoidable; failing to justify why a piece belongs to either class.
- Expected depth: identify both kinds in this particular design and explain the boundary.
- Resource effect: conceptual reasoning; documentation may reveal standard date facilities but is not necessary for the classification.

### Q23 — feature-branch and merge-request trade-offs (4 marks)

- Skill: compare isolated feature branches plus MRs with everyone committing directly to master.
- Lecture mapping: Git – Team Usage, Teamwork, Continuous Integration.
- Benefits the marker likely looks for: isolation of incomplete work, review/discussion, CI gate, protected/stable master, easier collaboration/rollback and traceability.
- Downsides/trade-offs: merge conflicts or integration drift when branches live too long, overhead/latency of review and merging, and branch-management complexity.
- Trap: one-sided advocacy; the verb “compare” calls for benefits and downsides relative to direct-to-master work.
- Expected depth: a few balanced, causally explained points.
- Resource effect: lecture/tutorial material is useful, but a compact comparison framework is faster.

### Q24 — deployment failures and SDLC feedback (4 marks)

- Skill: treat the SDLC as iterative and diagnose deployment failures upstream rather than naming only “deployment.”
- Lecture mapping: Deployment, SDLC, Continuous Integration.
- Expected content categories: revisit requirements/operational constraints, design/environment/configuration, development/build/package configuration, testing/CI/staging, deployment automation, and monitoring/maintenance feedback as supported by the stated failure mode.
- Trap: listing every phase without saying what changes; proposing only manual retries; assuming phases are one-way and cannot be revisited.
- Expected depth: select defensible phases and pair each with a concrete process/design/test improvement.
- Resource effect: slides supply phase names and CI/CD distinctions; scenario diagnosis must still be reasoned.

### Q25 — cyclomatic complexity (4 marks)

- Skill: derive complexity from source with an `if`, chained `else if`, `while`, and a nested `if`.
- Lecture mapping: Software Complexity.
- Exact patterns potentially used: decisions + 1 for a connected function, or `e - n + 2` after drawing the control-flow graph.
- Traps: counting `else` as an independent decision; counting returns/log statements; mishandling `else if`; using lines of code as complexity.
- Expected depth: a numeric result, ideally with brief working to make the counting convention clear.
- Resource effect: slides can provide the formula, but a one-line formula/decision rule is a strong future cheatsheet candidate.

## Q26 — base JavaScript problem solving (10 marks)

Four independent functions in `q26/assorted.js` are collected; definitions must not be modified. The public Vitest file tests them separately.

| Subtask | Marks | Skills exposed by contract/tests |
|---|---:|---|
| first-array difference | 2 | array membership and filtering; preserve first-array order; empty/all/none overlap |
| chunk array | 3 | indexed iteration or slicing; incomplete final chunk; size 1, oversized size, empty input |
| omit keys | 2 | object enumeration/copying; dynamic key exclusion; empty/no-match cases; avoid returning unwanted keys |
| capitalise words | 3 | split/transform/join or equivalent string iteration; empty input; only first character changed while existing remainder case is preserved |

- Lecture mapping: JavaScript, Advanced Functions, Iteration 0, Dynamic Verification.
- Exact syntax families likely useful: `filter`, `includes`, `slice`, loop steps, `Object.entries`/`Object.keys`, bracket property access, spread/rest, `split`, `map`, `join`, character indexing/slicing.
- Expected depth: short pure transformations, not complex algorithms. The main challenge is translating prose and examples into exact edge behaviour.
- Traps visible in tests: mutating/losing ordering, discarding a final partial chunk, treating unmatched omit keys as errors, lowercasing letters that should be preserved, and mishandling empty inputs.
- Hidden-test role: public tests cover representative happy paths and several boundaries, but hidden tests can vary values, sizes, object keys, spacing/content, duplicates, and input shapes consistent with the contract. Hard-coding examples will fail.
- Resource effect: MDN makes individual array/object/string method signatures searchable. Memorising every method is unnecessary; knowing a few composable patterns and how callbacks behave is valuable.

## Q27 — TypeScript and lint repair (10 marks)

The candidate must make `q27/stock.ts` type-safe and lint-free without changing names, prototypes, parameters, or logic. Checks are split across `npm run tsc`, `npm run lint`, and `npm run test`.

- Lecture mapping: Static Verification, JavaScript/TypeScript, Multi-file & Importing.
- Skills: infer a stored object shape from JSDoc and usage; type an initially empty array; correct a deliberately wrong parameter type; annotate all parameters and all returns; model success/error unions and possibly `undefined`; narrow values returned by `.find`; type a mutable object whose boolean field changes; satisfy strict/noImplicitAny and stylistic rules.
- Exact type patterns implicated by the starter: interfaces/type aliases for product input and stored product; array types; object return types; union return types; optional/`undefined`; empty-object representation; annotations on `findProduct`, `addProduct`, `updateStock`, and `clear`.
- Lint details in the supplied config include strict equality, camelcase, prefer-const, unused-variable rules, semicolons, single quotes, member delimiters, and dangling commas. The question forbids all lint/type suppression comments and awards an automatic zero for using them.
- Major submission trap: the page says interfaces/type aliases may be created “in the main file,” while a starter `interface.ts` says they may be added there; however, **only `stock.ts` is collected**. Any type required by the submitted file must therefore survive replacement of `interface.ts`—the safest inference is to keep necessary declarations in the collected file unless the official marking environment guarantees otherwise.
- Additional trap: tests use casts to consume a union but do not prove every annotation is semantically precise. Passing runtime tests alone does not satisfy `tsc` and lint; conversely, silencing types is forbidden.
- Expected depth: repair a small existing program without logic changes, not design new runtime behaviour.
- Hidden-test/autotest role: type and lint checks are primary observable graders; public functional tests guard against accidental logic changes. Hidden checks may inspect forbidden suppressions and exact collected-file independence.
- Resource effect: the three TypeScript cheatsheets are highly relevant for syntax, but do not infer the domain union for the candidate. A small personal pattern for arrays, interfaces, unions, `undefined`, and empty objects would reduce lookup time. Exact lint rules are already supplied in the question files, so memorising the whole config is unnecessary.

## Q28 — validation and exceptions (6 marks)

Only `q28/validate.ts` is collected. The candidate implements one function against a table of exact thrown messages and a typed nested object.

- Lecture mapping: Exceptions, JavaScript/TypeScript, Dynamic Verification, Requirements/acceptance criteria.
- Skills: test optional nested properties for presence; identify one or many missing fields; produce alphabetical ordering and exact punctuation/quoting; enforce numerical boundaries; validate a fixed digit-count constraint; `throw` errors/messages; return an exact success string.
- Exact syntax/patterns implicated: `throw new Error(...)` or an equivalent throw compatible with `.toThrow`; `Object.keys`/required-key lists; filtering/sorting/mapping/joining missing field names; digit/range validation; template strings; optional property access and narrowing.
- Public tests explicitly demonstrate the correct exception assertion shape: `expect(() => validateApplication(app)).toThrow(expectedMessage)`, not eager invocation inside `expect`.
- Traps: exact strings are contractual; missing-field names must be alphabetised; a falsy test can confuse a missing number with a present boundary value; the starter interface makes boolean criteria optional but typed only as `true`, emphasising presence/format rather than an approval decision; validation precedence matters when multiple conditions are bad, though the public table/tests do not fully specify every collision.
- Expected depth: careful contract implementation rather than broad business logic. Do not invent rejection rules beyond the interface table.
- Hidden-test role: likely boundaries (exact minimums, digit range edges), different missing-field subsets, multiple simultaneous problems, and exact message formatting/order.
- Resource effect: MDN can provide sorting/string/object APIs and Vitest can confirm `.toThrow`, but exact requirements must be read from the question rather than memorised.

## Q29 — Express routes from Swagger (14 marks)

Only `q29/server.ts` is collected. Backend functions and data types are complete and explicitly must not be modified. One `/clear` route is provided; five remaining routes must adapt HTTP inputs to the backend and map returned error objects to statuses.

### Contract surface

| Route | Input channels | Backend concept | Response distinctions |
|---|---|---|---|
| `POST /pizza/add` | JSON body: name, size, price | create | 200 success; 400 validation/duplicate |
| `GET /pizza/filter` | query: price | filtered/sorted read | 200 success; 400 invalid price |
| `GET /pizza/list` | query string: comma-separated `pizzaIds`, spaces allowed | ordered multi-ID read | 200 success; 400 if any ID invalid |
| `PUT /pizza/{pizzaid}` | header role; path ID; JSON body price | protected update-one | 200; 400 invalid ID/price; 403 invalid role |
| `PUT /pizza/all` | header role; JSON body increaseAmount | protected bulk update | 200; 400 invalid amount; 403 invalid role |

- Lecture mapping: HTTP Server Parts I/II, HTTP Testing, Auth/authorisation, Swagger/OpenAPI, JavaScript/TypeScript.
- Exact syntax/patterns implicated: `app.get/post/put`; `(req: Request, res: Response)`; destructuring `req.body`; reading `req.query`, `req.params`, and `req.headers`; parsing HTTP strings into numbers; splitting/trimming/mapping comma-separated IDs; calling the supplied backend; discriminating an error union (for example by presence/code); `res.status(...).json(...)`; leaving routes above the terminal 404 middleware.
- Swagger depth: this is not a YAML-authoring task. It assesses the ability to **read** an OpenAPI operation: method/path, `requestBody`, query/header/path parameters, response statuses, and schema/description. The supplied browser rendering means YAML syntax itself need not be memorised for this question.
- Error precedence is inherited from the supplied backend. In both protected update functions role validation occurs first; a route adapter must map the returned code rather than independently reorder business validation.
- Traps: all HTTP inputs initially arrive in web representations; using the wrong request channel; failing to trim comma-separated IDs; confusing `pizzaid` spelling/case between Swagger and Express; returning a backend error with default 200; mapping forbidden role to 400; putting routes below 404 middleware; editing `pizza.ts` even though it is replaced.
- Public-test caveat: the existing test titled “Pizza name is shorter than 3” passes an empty name and price 2, duplicating another case rather than exercising a non-empty 1–2 character name. Therefore public green is not proof of that backend rule—but backend logic is supplied/replaced anyway. It illustrates that public tests can contain gaps or mislabeled cases.
- Hidden-test/autotest role: public tests exercise every route, success, error statuses/bodies, ordering, parsing spaces, and mutation side effects. Hidden tests can vary parsing whitespace/order and check contract-consistent edge cases. Since only the thin server is submitted, grading chiefly targets route wiring and mapping.
- Resource effect: Express and `sync-request-curl` documentation help with signatures. Swagger is shown directly, and ARC can manually probe routes. Still worth retaining a compact request-channel/parse/status route skeleton; full Express API memorisation is unnecessary.

## Q30 — coverage-driven unit and HTTP tests

Only `q30/thiscord.test.ts` and `q30/server.test.ts` are collected. The implementation is assumed correct and must not be changed. The heading says 10 marks, but Part 1 says 10 and Part 2 says 5; this is a published inconsistency.

### Part 1: basic coverage

- Goal: 100% statement, branch, function, and line coverage in `thiscord.ts`.
- Constraint: only one `notificationService` call per test.
- Lecture mapping: Code Coverage and Dynamic Verification.
- Skills: enumerate short-circuit/early-return paths; vary user status, silenced/subscribed lists, message mention, DM flag, and channel; exercise true and false outcomes of compound conditions; read the generated coverage report and iterate.
- Exact syntax/patterns implicated: import function/types, construct typed `User`/`Message` fixtures, `describe`/`test`/`expect`, one call stored or asserted per test, `.toBe(true/false)`, spread-based fixture variants if desired.
- Trap: 100% statements is not 100% branches; a true `A || B` path may not evaluate `B`; an outer false path does not automatically cover every inner branch; several early returns require distinct paths; multiple assertions calling the function can violate the one-call rule.
- Expected depth: derive a compact control-flow test matrix, not assess correctness or test style.

### Part 2: HTTP statement coverage

- Goal: HTTP tests for `POST /thiscord/notify` that produce 100% statement coverage in both `thiscord.ts` and `server.ts`.
- The supplied route reads `{ user, message }` from `req.body`, invokes the service, and returns JSON.
- Exact patterns implicated: `sync-request-curl`, `request('POST', SERVER_URL + path, { json: {...} })`, inspect `statusCode` and/or `getJSON()`, and run the server separately under `c8`.
- Critical operational pattern: terminal 1 runs `npm run start-coverage`; terminal 2 runs `npm run test-server`; then the covered server must be stopped gracefully so c8 can emit/finalise the report. The scripts explicitly distinguish `vitest --coverage` for in-process unit coverage from `c8 ... tsx server.ts` for a separate HTTP server.
- The hint to reuse Part 1 suggests translating the already-derived input matrix into HTTP payloads rather than inventing a new strategy.
- Trap: ordinary Vitest coverage does not see a separately running server; calling the backend directly is not an HTTP test and will not cover the route; forgetting JSON body shape can make tests fail before reaching intended branches.

### Autotest and resource implications

- There are no provided completed tests—only `test.todo`—so the coverage report is the feedback mechanism and likely the basis of marking.
- The goal is metric attainment, not test quality; the page explicitly says clarity/design is not assessed. This is a special exam constraint and should not be generalised to good testing practice.
- Vitest documentation is available, but the course resource list labels it “Jest > Globals/Expect” in the user's note while the official practice resource page uses Vitest. Their APIs overlap substantially; the actual scripts/imports are authoritative.
- High future-sheet value: coverage meaning, branch/short-circuit checklist, one-call exception/test patterns, and the two-process c8 workflow. Low value: memorising every matcher because docs are provided.

## Q31 — hand-marked REST/API design (10 marks)

The candidate receives an existing Swagger 2.0 library API and user stories, then writes concise additional endpoint definitions in `q31/design.md`. The provided `sample.md` demonstrates acceptable Markdown; exact YAML is not required. Only `design.md` is collected.

### Existing system context

- Global header session authentication exists.
- Roles are `LIBRARIAN` and `STUDENT`; the contract explicitly warns that frontend-visible roles are not authoritative and privileged requests must be checked server-side.
- Existing operations cover login, add/list books, get a book, and librarian edit.
- Existing conventions use resource-like paths, method-specific operations, body/header/path parameters, 200 success, 400 domain/input errors, 401 missing/invalid session, 403 authenticated wrong role, and structured `{ error, message }` errors.
- Book state includes `copies` and `copiesAvailable`, which the new borrowing/return behaviour must respect.

### New requirement surface

- Student can borrow an available book.
- Student can return a book they borrowed.
- Student can search books by keywords.
- Invalid operations are prevented, including unavailable borrowing and returning a book not borrowed by that student.
- All users must be UNSW students or staff; existing SSO-style login context should be integrated rather than inventing client-trusted identity.

### Skills and expected depth

- Lecture mapping: Requirements Engineering, Validation, HTTP/REST, Auth/Authz, Conceptual Modelling, Design for Maintainability, Swagger.
- Derive endpoints from user goals and state transitions; choose resources/methods/paths; place session in a header and search terms in a plausible query channel; specify request bodies/path IDs only where needed; define success response shapes and relevant 400/401/403 cases; state enough behaviour to show inventory/loan ownership invariants.
- Maintain consistency with the given API rather than redesigning unrelated supplied routes.
- The sample establishes the marking standard: readable Markdown with method/path, purpose, headers/body, response statuses, example shapes, and named error conditions. Concision and clarity matter more than syntactic OpenAPI perfection.

### Traps

- Designing only happy paths and failing the explicit invalid-operation story.
- Treating authentication (valid session) as authorisation (correct user/role/ownership).
- Trusting a student ID or role passed by the client instead of deriving identity from session.
- Using GET with a body, encoding secrets/session in URLs, or using verbs/statuses inconsistently.
- Omitting how availability and borrower ownership change/check during borrow/return.
- Confusing “no search results” with malformed input, or failing to define a result shape.
- Editing `sample.md`, which explicitly is not collected.

### Resource effect

- The embedded Swagger, sample Markdown, MDN HTTP, and lecture/tutorial/lab material substantially reduce the need to memorise full OpenAPI syntax.
- The scarce-memory target is instead a compact API-design checklist: resource/method/path, input channel, auth/authz, success state/shape, 400/401/403/404 distinction, and side effect/invariant.

## Recurring scaffolding and exam technique signals

1. **Read the collection boundary first.** Q27 invites a separate interface file but collects only `stock.ts`; Q29 replaces its backend; Q30 collects only tests; Q31 warns not to edit the sample.
2. **Treat starter code and question text together as the contract.** JSDoc, interfaces, Swagger, tests, and backend error codes each reveal different details.
3. **Preserve supplied architecture.** Q27 forbids logic changes; Q29 asks only for thin HTTP routes; Q30 assumes implementation correctness; Q31 extends rather than replaces an existing API.
4. **Run multiple checks when supplied.** Runtime tests do not replace `tsc`, lint, or coverage. Q30 additionally needs two processes.
5. **Exact observable output is heavily assessed.** Exact exception strings, field ordering, status codes, JSON shapes, returned ordering, and request channels appear repeatedly.
6. **Public tests are examples, not exhaustive specifications.** They provide a strong behavioural map but include at least one mislabeled/gapped Q29 case and do not resolve every multi-error precedence case.
7. **Boundary partitions recur.** Empty, below/at/above thresholds, missing fields, invalid IDs, duplicates, no matches, incomplete chunks, wrong roles, and state before/after mutation are repeated patterns.
8. **Question parts reuse reasoning.** Q30 explicitly encourages reusing the unit-path matrix for HTTP coverage; Q29 tests mirror Swagger and backend contracts; Q31 extends the same HTTP/auth concepts into design.

## What the supplied resources make unnecessary to memorise

Reasonably safe to look up, provided the candidate already knows what to seek:

- exhaustive MDN lists of array/string/object methods and obscure edge semantics;
- full Express request/response API surface;
- every `sync-request-curl` option;
- all Vitest globals and matchers;
- full TypeScript type-system syntax beyond common patterns;
- complete Swagger/OpenAPI YAML grammar;
- long lecture prose, tutorial/lab implementations, and setup commands;
- ARC UI operations.

Still worth knowing without lookup because it selects the right resource/pattern:

- core array/object/string transformation shapes;
- `req.params` versus `req.query` versus `req.body` versus headers, plus parsing strings;
- `res.status(...).json(...)` and the 400/401/403/404 distinction;
- `describe`/`test`/`expect`, callback wrapping for `.toThrow`, and basic HTTP request shape;
- statement versus branch coverage and short-circuit path reasoning;
- common TypeScript interface/union/optional/array/`undefined` forms;
- verification versus validation; auth versus authz; functional versus non-functional;
- SDLC phase sequence, Git working/staging/local/remote model, YAGNI/KISS/DRY, complexity rule;
- a concise API-design checklist and exact-contract discipline.

## Comparison with `analysis/master_discovery.md`

### Confirmations

- Confirms JavaScript/TypeScript as Priority 1, including arrays, objects, first-class/higher-order functions, strict typing, unions, optional fields, and the danger of `any`.
- Confirms verification and coverage as Priority 1. Q7 and Q30 directly assess branch reasoning and achieving multiple coverage metrics; Q28 tests exact exceptions.
- Confirms HTTP/Express and Swagger as Priority 1. Q29 is a full contract-to-route adapter and Q31 is contract extension/design.
- Confirms exact status and body behaviour, request channel selection, `sync-request-curl`, and separate-server c8 coverage.
- Confirms requirements, Given/When/Then acceptance criteria, verification/validation, SDLC, Git/CI/deployment, maintainability, and complexity as compact theory targets.
- Confirms auth/authz and server-side trust boundaries even though Practice Exam 1 has no token implementation question: Q9, Q29 role enforcement, and Q31 session/role/ownership design all assess the concepts.
- Confirms open-ended design is not merely diagramming: requirements must be converted into a coherent HTTP API with errors and state invariants.

### Promotions

- **TypeScript repair under strict compiler and lint constraints** should be promoted from one item within JavaScript to a distinct high-priority practical pattern. It carries 10 marks and tests domain type modelling, not just annotation recall.
- **Exact exception-message construction and missing-field enumeration/order** should be promoted. Q28 devotes a whole implementation question to it.
- **Coverage path design, including JavaScript short-circuit branches**, should be promoted above generic definitions. Q30 requires 100% across all metrics under a one-call-per-test constraint.
- **Thin adapter work from a provided Swagger/backend** should be promoted over building business logic from scratch. Q29's architecture makes parsing, routing, and error/status translation the task.
- **REST/API design from user stories** should be promoted as its own practical/theory bridge. It carries 10 hand-marked marks and requires authentication, authorisation, resource/state design, and errors.
- **Git command side effects on the working directory** is more subtle than the existing add/commit/push flow and deserves inclusion in discovery.
- **npm `--save-dev` / devDependencies** is directly sampled and should move slightly upward within package management.
- **Balanced trade-off answers** should be recognised as a repeated short-answer skill: not just definitions, but benefits, downsides, and causal justification.

### Demotions or narrowing

- Full YAML authoring can be demoted for Practice Exam 1. Q29 supplies and renders Swagger for reading; Q31 accepts understandable Markdown and provides a sample. Managing contract content is important, exact YAML indentation/anatomy less so unless Practice Exam 2 contradicts this.
- Detailed conceptual-modelling notation (UML/ER/FSM drawing syntax) does not appear in this practice paper. Keep it in the topic universe because lectures and the final can vary, but lower it relative to HTTP API design until other practice evidence promotes it.
- Persistence implementation lifecycle (file read/write/clear code) appears only as a one-mark performance trade-off here, not as coding. It remains relevant but is less urgent than exceptions/types/routes/coverage based on this paper alone.
- CI/CD distinctions are mostly indirect: deployment diagnosis and merge-request benefits, rather than pipeline YAML authoring. Exact GitLab configuration syntax can remain low priority.
- Named exports/import syntax is present in starter code but not the central task; it is prerequisite literacy rather than a large standalone target in this paper.

### Newly exposed or previously under-specified topics

- Exact exam file/submission boundaries and the risk of relying on non-collected files.
- `try`/`catch`/`finally` execution order.
- `--save-dev` and development versus production dependencies.
- Working-tree effects of `git pull` and `git reset --hard` versus index/repository effects.
- Frontend local storage as untrusted data and the explicit client/server trust boundary.
- One-function-call-per-test constraints and coverage-oriented rather than quality-oriented test construction.
- Missing-field detection with deterministic alphabetical formatting.
- Comma-separated query parsing with optional whitespace and preservation of requested ordering.
- Swagger version variation: Q29 uses OpenAPI 3 (`requestBody`, `content`), while Q31 uses Swagger 2-style `parameters` and custom reusable sections. Candidates should read the rendered contract semantically rather than assume one YAML dialect.
- Hand-marked API extensions must make state invariants explicit, such as availability and loan ownership, rather than listing endpoints alone.

## Updated evidence-based priority after Practice Exam 1

### Highest practical return

1. JavaScript array/object/string transformations and edge cases.
2. TypeScript interfaces, arrays, optional fields, unions, `undefined`, return types, and narrowing under strict checking.
3. Express route adapters: all input channels, parsing, backend call, error discrimination, status/body response.
4. Vitest unit/exception/HTTP patterns plus coverage path design and c8 server workflow.
5. REST API design from user stories, including session-derived identity, roles/ownership, invariants, and errors.

### Highest concise theory return

1. SDLC phases and iterative diagnosis; verification versus validation.
2. Functional/non-functional requirements and Given/When/Then.
3. Essential/accidental complexity and cyclomatic complexity.
4. Git state transitions, branch/MR trade-offs, and command side effects.
5. HTTP method/input/status classes; auth versus authz and client trust.
6. DRY/KISS/YAGNI and maintainability.
7. Persistence consistency/performance trade-offs and npm dependency categories.

### Await Practice Exam 2 before final allocation

- Whether diagrams/UML/ER/FSM return as direct questions.
- Whether persistence/auth implementation receives a full coding question.
- Whether Swagger YAML must ever be edited rather than read/described.
- Whether CI configuration, deployment, Agile, or teamwork recur enough for more than compact definitions.
- Whether final-exam structure follows the generic 25-question overview or the practice paper's 31-question layout.

## Source caveats

- The question site says “Q1–20” and exposes 31 questions, while its generic overview says 25 questions with Q1–15 MCQ and five final programming questions.
- Listed section/question headings total 100 marks only if Q30 is 10, but Q30's part labels total 15.
- Q29's page refers to `swagger.yaml`, while the actual contract is embedded from `q29-swagger.yaml` and is not present in the downloaded starter repository.
- Q31's Swagger contract is likewise embedded separately; the submission is Markdown, not Swagger YAML.
- The user described “Jest” documentation, while official practice resources and dependencies use Vitest. Use the local `package.json` and imports as authoritative.
- Q27 contains tension between the optional `interface.ts` suggestion and the fact that only `stock.ts` is collected.
- A Q29 public test title/input pair does not actually test the stated non-empty short-name case. Public tests should not override the written contract.
