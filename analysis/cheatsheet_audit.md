# Independent audit for the final two-sided A4 cheatsheet

This is an allocation and omission audit, not a draft of the cheatsheet. It checks the proposed content against both official practice papers, the exam-resource list, the uploaded `lab07_objection` example, and the uploaded project Swagger.

## Capacity assumption

For **small but still reliably legible** handwriting, a realistic two-sided A4 target is **about 2,000–2,600 ordinary-word equivalents**. Plan the final artefact around **2,300–2,400 word equivalents**, not the theoretical maximum.

- With narrow margins, two columns, roughly 70–80 handwritten lines per side and about 7–8 small words per column-line, the rough physical range is 1,000–1,280 words per side.
- Code, formulas, tables, arrows and headings consume more space than their literal word count suggests. A sheet containing many code skeletons will fit fewer counted words.
- About 2,800–3,000 words may be physically possible with extremely tiny writing, but retrieval speed and legibility become the bottleneck. It is a poor planning target for a three-hour exam.

Use **2,400 word equivalents** as the editing budget, leaving approximately 5% of physical space for separators, corrections and navigation marks.

## Suggested allocation

The practice papers are approximately half theory and half practical, but practical work needs slightly more sheet space because a few syntax anchors and multi-step procedures are valuable.

| Content cluster | Target words | Share | Reason |
|---|---:|---:|---|
| Core JavaScript + structured transformation/aggregation | 280 | 11.7% | A dedicated 10-mark task in each paper; aggregation is another full task in Practice 2 |
| TypeScript + validation + exceptions | 260 | 10.8% | Full practical tasks; exact errors, optional fields and narrowing recur |
| HTTP + Express + Swagger + auth decisions | 340 | 14.2% | 10–14-mark implementation in both, plus API design and pervasive HTTP theory |
| Unit/HTTP testing + coverage/c8 | 300 | 12.5% | Near-identical dedicated testing task in both papers |
| Practical operating rules and hidden-test checklist | 120 | 5% | Prevents submission, source-of-truth and exactness mistakes across all coding tasks |
| Requirements + verification/validation | 180 | 7.5% | Functional/non-functional and Given/When/Then repeat exactly |
| Maintainability + complexity + modelling | 250 | 10.4% | Cyclomatic complexity repeats; design/refactoring questions rotate |
| SDLC + Agile + deployment + CI/CD | 220 | 9.2% | Process/deployment diagnosis repeats in both papers |
| Git + npm + teamwork | 140 | 5.8% | Broad MCQ coverage; one feature-branch/MR short answer |
| Auth/security + persistence + rotating MCQ definitions | 210 | 8.8% | Mostly compact rotation-proof recall; no adequate dedicated online references |
| Navigation labels / spare capacity | 100 | 4.1% | Makes a dense handwritten sheet usable |
| **Total** | **2,400** | **100%** | Practical/procedural material about 54%; theory about 42%; spare about 4% |

This is a word-equivalent budget, not a requirement that each topic become prose. Tables, symbols and tightly chosen examples should replace repeated sentences.

## Must-have practical content

### 1. Contract and submission discipline

Reserve a conspicuous mini-checklist for:

- inspect the submission rule and which files are collected before editing;
- read prompt, current Swagger, starter types/backend, visible tests and `package.json` together;
- use the current question's explicit contract as primary authority, while noticing and reconciling contradictions rather than blindly trusting one artefact;
- preserve required exports, prototypes and supplied architecture;
- run all relevant checks: tests, `tsc`, lint and the specified coverage command;
- visible tests are incomplete scaffolding, not the entire contract;
- exact messages, punctuation, status, body shape, result order, field names, input channel, state effects and stable IDs are observable behaviour.

This content is higher-value than another library-method list because both practice papers contain source inconsistencies and hidden-boundary warnings.

### 2. JavaScript and structured data

Include only composable patterns and decision traps:

- `for...of` values versus `for...in` keys/indexes;
- computed object keys require bracket access; object-as-map and `Set` for uniqueness;
- `map` transform, `filter` select, `reduce` aggregate with an explicit initial value;
- preserve required order and avoid accidental input mutation;
- string/array chunking, split/transform/join, membership/difference, dynamic-key object copying;
- aggregation procedure: create a complete zero-valued output shape, discard ineligible records first, identify the grouping key, add every stated component exactly once, preserve required order/casing;
- stable ID warning: collection length is not a safe next ID after deletion;
- boundaries: empty/singleton inputs, duplicates, partial final chunk, no result, all/none match.

Do not allocate space to an exhaustive method catalogue; MDN is supplied.

### 3. TypeScript, validation and exceptions

Must retain:

- compact interface/type, array, optional-property, literal-union and success/error-union patterns;
- `keyof`/required-field-list idea and narrowing before property access;
- **missing is not the same as falsy**: `0`, `false` and `''` may be present values; follow the contract's `undefined`/presence semantics;
- deterministic validation precedence; collect/sort field names when required; copy exact strings and punctuation;
- caught values may be `unknown`; narrow with `instanceof Error` or another contract-safe check before reading `.message`;
- throwing versus returning an error object are different contracts;
- exception assertion requires a callback: `expect(() => fn()).toThrow(...)`;
- do not use `any` or suppression comments when strict typing/linting is the point of the task.

### 4. HTTP, Express, Swagger and auth

Must retain one compact translation skeleton and a decision table:

- body -> `req.body`; path -> `req.params`; query -> `req.query`; header -> `req.headers`; JSON bodies need `express.json()`;
- path/query/header values are web strings until deliberately converted;
- the string `"false"` is truthy, so query booleans require explicit parsing;
- split/trim/map comma-separated query input when the contract requires it;
- thin route: extract -> convert -> call backend once -> discriminate result -> return exact status and JSON body;
- routes must precede terminal 404 middleware;
- common meanings: 400 invalid request/domain input, 401 missing/invalid identity, 403 authenticated but forbidden/wrong role/not owner, 404 absent route/resource, 500 unexpected server failure—but the current contract overrides generic conventions;
- authentication answers “who”; authorisation answers “may this identity do this”; derive trusted identity/role from a validated session, not client-supplied claims;
- CRUD mapping and stateless-request concept.

Swagger/OpenAPI cue must be semantic, not a copied document:

- first check dialect: Swagger 2 uses `swagger`, `in: body` and response `schema`; OpenAPI 3 uses `openapi`, `requestBody` and `content`;
- navigate method/path -> each input location/type/requiredness -> referenced schema -> every response status/body -> security -> side effects/error precedence;
- follow `$ref`; check global security and operation-level overrides;
- parameter-level `required: true` is different from an object schema's `required: [fields]`;
- preview/render success does not prove refs, implementation, tests or precedence are consistent.

### 5. Testing and coverage

Must retain:

- black-box partitions: happy case, each invalid class, boundaries, alternative branches, side effects and shared-state reset;
- structural equality versus primitive equality; a tiny Vitest import/test/assertion anchor is enough;
- one function call per test when explicitly constrained—store the result once;
- statement, branch, function and line meanings; 100% execution does not prove correctness or good assertions;
- derive coverage inputs from control flow: each early return, both decision outcomes, comparison boundaries, and short-circuit operands of `&&`/`||`;
- one example of why return-label coverage or 100% statements can still miss Boolean branches;
- direct imported-code coverage and separate HTTP-server coverage are different workflows;
- separate-server procedure: start Express under the provided `c8` script, run `sync-request-curl` tests in another process, then stop the instrumented server cleanly so the report is emitted;
- HTTP tests should assert status, body and relevant state/ordering, not merely make the request.

## Must-have theory content

### Repeated short-answer families

These deserve more than one-word definitions because they recur directly:

- Functional requirement = observable capability/behaviour/what; non-functional = measurable quality/constraint/how well. Pair with a testable Given/When/Then scenario including both permitted and prohibited outcomes when relevant.
- Cyclomatic complexity: decision points + 1 for the course's connected-function convention, or `V(G) = E - N + 2` for one connected flow graph. Do not count plain `else`, returns or logging as decisions. Follow the question's graph/convention for compound conditions.
- Refactoring changes internal structure without changing external behaviour. Superficially hiding a conditional does not necessarily reduce actual decision complexity.
- SDLC is iterative: requirements -> design -> development -> testing -> deployment -> maintenance/feedback. For a failure diagnosis, name the relevant phase, cite scenario evidence, explain the cause and pair it with a concrete process/design/test/config change.

Include a generic four-part short-answer frame: **name/classify -> cite scenario evidence -> explain consequence/trade-off -> propose a matched change if asked**.

### Compact rotating theory

Retain concise contrasts for:

- verification (“build it right”, conformance) versus validation (“build the right thing”, user need), and static versus dynamic verification;
- essential problem complexity versus accidental implementation/environment complexity;
- low coupling and high cohesion; DRY as one source of truth, KISS as simplest suitable design, YAGNI as no speculative capability;
- Waterfall sequencing versus Agile increments/feedback; Agile philosophy versus Scrum/Kanban/XP frameworks;
- CI versus continuous delivery versus continuous deployment;
- Git working tree -> stage -> commit -> push; pull brings remote work locally; `git merge X` merges X into the currently checked-out branch; branch/MR benefits and long-lived-branch/review-overhead costs;
- dependency versus devDependency; `package.json` versus locked exact dependency graph; do not commit `node_modules`;
- persistence lifecycle: load/parse at startup, mutate central state, stringify/write after successful mutation, persist clear/reset; consider missing/corrupt file rules from the prompt;
- structural versus behavioural models; FSM state/event/action/transition; basic class/ER/use-case vocabulary;
- hashing versus encryption, salt purpose, base64 not security, signed token claims still require validation;
- common security names only at recognition depth: disclosure, traversal, SSRF and command injection; never trust input.

## Safe to omit or look up

The following should not consume substantial handwritten area:

- exhaustive JavaScript/string/array/object method signatures;
- full TypeScript type-system or control-flow syntax tables;
- full Jest/Vitest globals and matcher catalogue;
- full Express application/request/response API;
- every `sync-request-curl` option or ARC instructions;
- full Node/`fs` reference;
- complete Swagger 2 or OpenAPI 3 YAML templates and large schema libraries;
- project-specific route names, formulas, prices, IDs, enum values and error messages;
- exact installation commands, `npm install`, plugin setup and lengthy lint configuration;
- Git command flags, full GitLab CI YAML and vendor/tool lists;
- all twelve Agile principles verbatim;
- full UML/ER drawings or lecture examples;
- biographies, course administration, assignment mark formulas and historical prose;
- the uploaded Unigotchi Swagger's 26 operations or unresolved project schemas;
- the objection lab's domain-specific objection rules.

The supplied resources are appropriate for a **specific known symbol**. They are too slow for discovering the underlying decision, so the sheet should retain decision rules and only tiny syntax anchors.

## Exact recurring traps to make visually prominent

1. `expect(fn()).toThrow(...)` invokes too early; use `expect(() => fn()).toThrow(...)`.
2. Missing property is not the same as falsy value.
3. Exact error text includes ordering, punctuation, quoting and interpolation.
4. Validate in the prescribed order before accessing optional fields.
5. `"false"` is truthy; explicitly parse query booleans.
6. Path/query/header inputs arrive as strings; convert only as the contract requires.
7. `req.body`, `req.query`, `req.params` and headers are not interchangeable.
8. A backend error returned with default HTTP 200 is still a wrong route.
9. 401 is unauthenticated; 403 is authenticated but forbidden; 400 is invalid input—unless the supplied contract explicitly chooses otherwise.
10. Trust the validated session for identity/role/ownership, not a body/query claim.
11. Put routes before the terminal 404 handler.
12. Preserve order, zero-valued output groups and all stated aggregation components.
13. `array.length` is not a deletion-safe ID generator.
14. 100% statements is not 100% branches; trace short-circuit operands and boundaries.
15. Ordinary Vitest coverage does not instrument an independently running server.
16. Stop the c8-wrapped server before trusting the final report.
17. Public tests can be incomplete, mislabeled or internally inconsistent; hidden tests follow the written contract.
18. Only collected files survive automarking; edits elsewhere may be replaced.
19. Swagger preview success is not semantic consistency; resolve refs and compare implementation/tests.
20. Swagger 2 syntax is not OpenAPI 3 syntax; copy from the current dialect rather than memory.
21. `required: true` for a parameter/body is not a list of required object properties.
22. Current Swagger/statuses beat generic REST expectations: creation may validly be specified as 200 rather than 201.
23. Do not count a plain `else` as a cyclomatic decision.
24. Do not answer a scenario with only a slogan: classify, cite evidence and explain the consequence.

## Factual and evidence caveats

- Practice Exam 2 is the stronger model for final shape: 15 MCQs/30 marks, five short answers/20 marks and five practical questions/50 marks. Practice Exam 1's displayed count and coverage marks conflict internally. Do not print an exact predicted question count as fact.
- “About 50% theory / 50% practical” is supported by the exam briefing and Practice 2; individual topic weights remain an inference from two practice papers, not a guarantee.
- All inspected practice tests import **Vitest**, while the final resource list supplies **Jest** documentation. The common matcher surface is useful, but the current imports, config and `package.json` are authoritative.
- Practice packages use Express 5.2, while the supplied PDF is Express 4. The route/request/response core used by the course is stable; starter types/compiler override the PDF on discrepancies.
- The papers use both Swagger 2 and OpenAPI 3. Memorising one dialect as universal would be factually unsafe.
- The uploaded project Swagger is not a gold-standard contract: it has unresolved `$ref`s, incomplete `required` declarations and auth/status drift. Use it for structure/navigation only.
- The uploaded objection lab is a useful Vitest/coverage and string-classification example, but its tests were not rerun here because dependencies were absent, and no supplied report proves that suite is minimal or reaches every branch.
- HTTP status conventions on the sheet must be labelled defaults, not universal laws. The current question's documented status and body control marking.
- `V(G) = E - N + 2` assumes the connected control-flow graph convention used in the course examples; for multiple connected components the general form changes. Use the question's stated graph/counting convention.

## Final editorial acceptance test

Before considering the final sheet ready, verify that:

- at least half its useful area supports the five repeated practical archetypes rather than low-weight lecture trivia;
- each repeated 10-mark archetype has a procedure and traps, not merely a definition;
- all three repeated short-answer families have an applied answer frame;
- rotating MCQ topics remain represented by compact contrasts;
- no long standard-library table duplicates the provided documentation;
- no project-specific example is presented as a universal contract;
- the Vitest/Jest, Express 4/5 and Swagger 2/OpenAPI 3 caveats appear once, clearly;
- codes/formulas remain legible at actual A4 print or handwriting scale;
- navigation is possible in seconds through columns, boxes, labels or colour—not by rereading dense prose;
- approximately 5% physical capacity remains for corrections and visual separation.
