# Practice Exam 1–2 crosswalk: recurrence, weighting, and stable skill patterns

This synthesis compares the two official COMP1531 26T2 practice papers as evidence for study-topic discovery. It does **not** draft a cheatsheet, solve any question, or claim that the final exam will reproduce either paper exactly.

## Bottom line

Across two different 100-mark papers, five practical archetypes are especially stable:

1. **Core JavaScript transformation** — 10 marks in each paper.
2. **Typed validation and exact exception behaviour** — 6 marks in Practice 1 and 10 marks in Practice 2.
3. **Swagger/HTTP/Express contract implementation** — 14 marks in Practice 1 and 10 marks in Practice 2, with a further 10-mark API-design task in Practice 1.
4. **Coverage-driven unit and HTTP test construction** — nominally 10 marks in each paper (Practice 1's part labels inconsistently total 15).
5. **Requirements, complexity, and deployment/process reasoning** — directly repeated in both short-answer sections.

The transferable exam skill is not memorising a particular pizza, library, astronaut, rugby, booking, or chat domain. It is rapidly converting a supplied contract into exact observable behaviour while preserving starter architecture and checking hidden-case boundaries.

## Structure and weighting caveat

| Feature | Practice Exam 1 | Practice Exam 2 | Stable inference |
|---|---:|---:|---|
| Total published marks | 100 by headings | 100 | Final is designed as a 100-mark, three-hour paper |
| MCQ | 20 × 1 = 20 | 15 × 2 = 30 | Broad theory sampling is stable; count/value is not |
| Short answer | 5 × 4 = 20 | 20 total, uneven 3–5 | Five concise applied theory questions is strongly stable |
| Practical/design | headings total 60 | 5 × 10 = 50 | About half the paper is practical, but Practice 1's displayed allocation is anomalous |
| Displayed question count | 31 | 25 | Do not predict exact count from Practice 1 |
| Reading/working time | 10 min + 3 h | 10 min + 3 h | Stable |

Practice Exam 1 conflicts with its own generic overview: the overview says 25 questions and roughly 50/50 theory/practical, while its live navigation contains 31 and headings imply 40/60. Its Q30 heading says 10 marks while the two parts say 10 + 5. Practice Exam 2 exactly matches the 25-question, 50/50 overview. Therefore Practice 2 is better evidence for final **shape**, while both papers are equally valuable for question **archetypes**.

## Recurrence matrix

The marks below are direct identifiable question marks, not an attempt to assign every mixed MCQ to a single topic. “Repeated” means the same transferable skill is substantively assessed in both papers.

| Archetype / skill cluster | Practice 1 evidence | Practice 2 evidence | Recurrence judgment |
|---|---|---|---|
| Core JS strings/arrays/objects | Q26, 10 | Q21, 10 | **Exact repeat:** one full practical task per paper |
| TypeScript type safety | Q14 MCQ; Q27, 10; typed Q28 | Q7/Q14/Q18; typed Q22–24 | **Stable throughout**, but task form varies |
| Validation + exact exceptions | Q8 MCQ; Q28, 6 | Q22, 10 | **Strong repeat:** missing fields, exact messages, ordering, `.toThrow` |
| Object-array transformation/aggregation | Q26 transforms; Q27 inventory | Q23, 10; Q21–22 transforms | **Stable coding substrate**, full aggregation question only in Practice 2 |
| Swagger-to-Express implementation | Q15 MCQ; Q29, 14 | Q24, 10 | **Exact repeat:** read contract, parse inputs, wrap backend, map errors/statuses |
| API design from requirements | Q31, 10 | no standalone design task | **Practice-1-specific form**, but its component skills recur elsewhere |
| Coverage-driven unit testing | Q7 MCQ; Q30 Part 1 | Q25 Part (a) | **Exact repeat:** all metrics, Boolean paths, one call/test |
| Separate-server HTTP coverage | Q30 Part 2 | Q25 Part (b) | **Exact repeat:** c8 server + client tests in two processes |
| Functional/non-functional + acceptance criteria | Q11/Q12 MCQ; Q21, 4 | Q6 MCQ; Q17, 4 | **Exact theory repeat** |
| Cyclomatic complexity | Q25, 4 | Q20, 5 | **Exact short-answer repeat**, Practice 2 adds refactoring judgement |
| Maintainability/design reasoning | Q10/Q13 MCQ; Q22, 4 | Q8 MCQ; Q16, 4; Q20 | **Strong repeat**, scenario changes |
| SDLC/process diagnosis | Q1 MCQ; Q24, 4 | Q1–2 MCQ; Q19, 3 | **Strong repeat** |
| Deployment/CI/CD | Q24, 4 | Q5/Q12 MCQ; Q19, 3 | **Strong repeat**, definition plus failure diagnosis |
| HTTP semantics/status/input channels | Q5/Q18 MCQ; Q29/Q31 | Q4/Q13 MCQ; Q24/Q25 | **Pervasive repeat** |
| Authentication/authorisation/trust | Q9 MCQ; Q29 role; Q31 session/ownership | Q4/Q10/Q11; Q24 status mapping | **Strong conceptual repeat**, implementation depth varies |
| Git/team workflow | Q2/Q19 MCQ; Q23, 4 | Q8 code-review MCQ only | **Mostly Practice 1**, teamwork/review persists |
| npm/package management | Q3 MCQ | Q9 MCQ | **Small exact repeat:** one MCQ each |
| Persistence | Q6 MCQ | absent | **One-off in these papers** |
| Conceptual modelling/FSM | absent | Q3 MCQ | **One-off in these papers** |
| Requirements elicitation | implicit | Q15 MCQ | **Practice-2-specific direct question** |
| Advanced/first-class functions | Q16–17 MCQ | used but not directly named | **Practice-1-specific direct theory**, still coding prerequisite |
| JavaScript coercion | absent | Q7 MCQ | **One-off** |
| Password hashing | indirect security context | Q11 MCQ | **One-off direct question** |
| Agile-specific values/frameworks | absent direct assessment | adaptive-process context only | **Not directly sampled** in either paper |
| UML/ER/use-case diagram construction | absent | only FSM recognition | **Not directly sampled** |
| Security vulnerability taxonomy | absent | absent | **Not directly sampled** |

## Repeated practical archetypes in detail

### 1. Core JavaScript problem solving: 10 marks in both papers

Practice 1 uses four small operations: first-array difference, chunking, omitting object keys, and word capitalisation. Practice 2 uses string reversal, case-insensitive frequency counting, and second-largest unique value.

Stable assessed skills:

- translate prose/examples into exact edge behaviour;
- traverse and transform strings/arrays;
- use objects as maps and access computed keys;
- preserve specified order and case;
- handle empty, singleton, duplicate, partial, and no-result cases;
- work within unchanged exports/prototypes;
- generalise beyond visible examples for hidden tests.

This is the cleanest repeated allocation: **20 marks across two papers, exactly 10% of each**. Core JS belongs at the top of discovery even though MDN is available, because documentation supplies method syntax but not algorithm selection or contract interpretation.

### 2. TypeScript, validation, and exceptions: 6–10 direct marks plus pervasive typing

Practice 1 separates strict TypeScript repair (Q27, 10) from a validation/exception task (Q28, 6). Practice 2 combines typed optional-field validation, exact exceptions, regex, precedence, error narrowing, and result transformation in Q22 (10), then continues typed nested data and HTTP work in Q23–24.

Stable assessed skills:

- interface/type-alias and array/object shapes;
- optional properties and the difference between missing and falsy;
- union returns, `undefined`, and narrowing;
- exact thrown messages, punctuation, interpolation, and deterministic field order;
- correct exception assertion wrapper: pass a function to `.toThrow`;
- validation precedence when several errors could apply;
- `try`/`catch` transformation and safe extraction of a caught error message;
- strict compiler/lint compliance without `any` or suppression comments.

Practice 1's pure “repair types without changing logic” form is not repeated exactly, but TypeScript is so pervasive in Practice 2 that type safety is clearly a stable substrate, not a one-paper curiosity.

### 3. Data transformation and aggregation: repeated substrate, one full dedicated task

Both papers require array/object transformations. Practice 2 promotes this into a full 10-mark nested-record aggregation task involving filters, grouping, zero-initialised accumulators, literal unions, conditional totals, and lookup-style pricing. Practice 1 instead tests smaller transformations and an inventory data model.

Stable assessed skills:

- read unfamiliar interfaces before coding;
- filter before mapping/aggregating when eligibility rules apply;
- initialise complete output shapes, including zero-valued groups;
- distinguish entity, group key, and output-key casing;
- preserve order when required;
- enumerate every stated component rather than rely on examples.

The exact “revenue by membership tier” domain is one-off. The **accumulator/checklist pattern** is reusable and merits promotion.

### 4. Swagger-driven Express work: 10–14 marks in both papers

Practice 1 Q29 supplies complete backend logic and asks for five thin routes. Practice 2 Q24 asks for both missing backend operations and four HTTP wrappers. Both require rapid extraction of method, path, input location, response shape, and error/status behaviour from embedded OpenAPI.

Stable assessed skills:

- distinguish `req.body`, `req.query`, `req.params`, and headers;
- remember that HTTP path/query/header values are strings until deliberately converted;
- parse numbers, booleans, optional filters, and comma-separated lists correctly;
- call backend logic rather than duplicate it in routes;
- discriminate success/error results and return exact status/body pairs;
- leave routes before terminal 404 middleware;
- reconcile Swagger, starter types, tests, and written prose when one source is inconsistent;
- preserve IDs/order/state and test side effects, not only immediate responses.

Across the papers this contributes **24 direct implementation marks**, plus HTTP MCQs, HTTP coverage tasks, and Practice 1's 10-mark design question. HTTP/API contract literacy is therefore the broadest recurring practical cluster.

### 5. Coverage-driven tests: nominally 10 marks in both papers

Both papers present a correct branch-heavy function and require tests for 100% statement, branch, function, and line coverage, with exactly one function call per test. Both then require HTTP tests against an Express wrapper, with the server run separately under c8.

This is unusually exact recurrence, down to:

- early-return path enumeration;
- compound `&&`/`||` short-circuit obligations;
- boundary inputs around comparisons;
- one-call-per-test constraint;
- reuse of the unit-test input matrix through HTTP;
- `sync-request-curl` request bodies and response inspection;
- two-process instrumentation and stopping the server before trusting the report.

This should be treated as a stable **test-design procedure**, not just theory about what branch coverage means.

### 6. API design: one standalone question, recurring component skills

Only Practice 1 asks for a 10-mark hand-marked extension of an existing API from user stories. However, its component decisions recur across both papers:

- requirements and acceptance criteria;
- authentication versus authorisation;
- HTTP method/path/input/status semantics;
- state transitions and invalid operations;
- Swagger contract reading;
- thin separation between route and backend behaviour.

Therefore full free-form API design is less certain than Express implementation, but it should not be demoted to low priority. The final may choose either a design or implementation manifestation of the same contract reasoning.

## Repeated theory architecture

### Broad MCQs: stable breadth, unstable count

The two papers collectively sample almost the full course. Stable recurring MCQ families are:

- SDLC/process model recognition;
- npm/package metadata/dependency categories;
- verification/static analysis/coverage;
- HTTP/status/auth concepts;
- requirements and acceptance criteria;
- maintainability/team practices;
- TypeScript/JavaScript semantics;
- CI/CD/deployment;
- Swagger/API contract scope.

Multi-select distractors repeatedly use absolute overclaims such as “always,” “never,” “eliminates,” “guarantees,” or attributing unrelated capabilities (encryption/token creation/runtime correctness) to a tool. The stable skill is to know each concept's **capability boundary**, not merely a positive slogan.

Practice 1 uniquely samples Git working-tree effects, persistence, first-class functions, `try/catch/finally`, and validation activities. Practice 2 uniquely samples FSM events, coercion, code review, hashing, statelessness, linting, and elicitation. These look like deliberate breadth variation rather than evidence that either set is unimportant.

### Five short answers: the clearest stable theory template

Both papers contain five concise applied questions totalling 20 marks. Three slots recur almost exactly:

1. **Requirements classification + scenario acceptance criteria** — 4 marks in each.
2. **Cyclomatic complexity** — 4 versus 5 marks; Practice 2 adds behaviour-preserving refactoring analysis.
3. **Deployment/process failure diagnosis** — 4 versus 3 marks.

The remaining slots rotate among:

- essential versus accidental complexity;
- Git branch/MR trade-offs;
- module responsibility/cohesion and refactoring;
- contextual JavaScript-to-TypeScript trade-offs.

The stable answer form is concise and applied:

- name/classify the concept;
- point to concrete scenario evidence;
- state the consequence/trade-off;
- when asked for a change, pair it with the diagnosed cause.

Long definitional essays are not rewarded. Both papers explicitly say a few correct phrases/dotpoints/sentences can receive full marks.

## Stable patterns versus one-offs

### Stable enough to promote confidently

- core JS problem solving;
- TypeScript object/interface/optional/union/narrowing literacy;
- exact validation and exception behaviour;
- array/object transformation and aggregation;
- Swagger navigation and contract extraction;
- Express input parsing and status/body mapping;
- coverage path construction and separate-server HTTP coverage;
- functional/non-functional requirements and Given/When/Then;
- cyclomatic complexity and the difference between surface simplification and real decision complexity;
- SDLC/deployment diagnosis;
- auth/authz and 400/401/403 distinctions;
- concise scenario-based explanation and trade-off reasoning;
- hidden-test discipline: exact shapes/order/messages, boundaries, side effects, and collected-file scope.

### Repeated but low direct weight

- npm/package management: one MCQ in each;
- CI/CD: small theory questions in both, plus deployment reasoning;
- maintainability slogans/principles: scattered theory rather than a consistent large practical;
- teamwork/review/branching: present across papers but only Practice 1 gives Git a full short answer;
- static/dynamic verification definitions: frequent supporting concepts, while the large marks go to actual tests/types.

### One-paper-only direct topics: retain compactly, do not extrapolate weight

- persistence performance trade-off (Practice 1);
- state-machine event semantics (Practice 2);
- JavaScript coercion (Practice 2);
- password hashing properties (Practice 2);
- detailed Git command effects and feature-branch comparison (Practice 1);
- first-class/higher-order function terminology (Practice 1);
- requirements elicitation techniques (Practice 2);
- standalone API design (Practice 1);
- standalone nested revenue/group aggregation (Practice 2);
- strict type-and-lint-only repair (Practice 1).

These are plausible rotating slots, especially in MCQ/short-answer breadth. One absence should not be treated as exclusion.

### Not directly tested in either practice paper

- drawing full UML class, ER, or use-case diagrams;
- detailed Agile values/principles/framework mechanics;
- GitLab CI YAML authoring;
- file-persistence implementation/startup reload;
- token/signature implementation;
- vulnerability taxonomy (SSRF, traversal, injection, etc.);
- monitoring metrics and operational observability;
- editing a Swagger YAML file itself.

Because lecture and assignment material is explicitly examinable, these cannot be ruled out. The correct discovery response is **demote relative to repeated 10-mark patterns**, not remove.

## Likely final-exam skill clusters (inference, not prediction)

The two papers support a likely construction grammar rather than exact future questions:

1. **Broad theory recognition:** many course families sampled once through scenarios and capability-boundary distractors.
2. **Concise applied theory:** requirements, process/design trade-offs, and a metric/model calculation or interpretation.
3. **Core-language practical:** small independent JS functions with hidden edge cases.
4. **Typed data/validation practical:** optional fields, exact errors, transformations or aggregations over structured objects.
5. **HTTP contract practical:** read Swagger, implement backend and/or thin Express routes, parse web inputs, map errors.
6. **Testing practical:** derive coverage-complete unit inputs and translate them to HTTP while handling separate-process instrumentation.

The fifth practical slot may rotate among strict TypeScript repair, data aggregation, validation/processing, or API design. Both papers show that domain details change while the underlying decomposition skills remain stable.

## Resource-availability implications

### Safely compress or look up

The exam provides lecture/tutorial/lab materials, MDN JavaScript/HTTP, TypeScript cheatsheets, Vitest/Jest-style API docs, Express API PDF, `sync-request-curl`, Node docs, Swagger preview, and ARC. This makes the following poor candidates for large handwritten allocation:

- exhaustive JavaScript method catalogues;
- exhaustive Vitest matcher/global lists;
- full Express request/response API reference;
- every `sync-request-curl` option;
- complete TypeScript syntax reference;
- complete OpenAPI/Swagger YAML grammar;
- package installation/setup commands;
- project-specific constants, error messages, schemas, and domain prices;
- long lecture prose or copied tutorial solutions.

### Still worth immediate recall

Documentation only helps after the candidate identifies the right concept. The repeated papers justify retaining:

- a few composable JS iteration/transformation/update patterns;
- missing-versus-falsy checks and common TS interface/optional/union/narrowing shapes;
- exact exception-test wrapper and error-precedence checklist;
- request-channel table and string-to-number/boolean/list parsing reminders;
- a thin Express result-to-status/body skeleton;
- statement/branch/function/line meanings, short-circuit branch reasoning, and two-process c8 workflow;
- HTTP 400/401/403/404/500 distinctions and auth versus authz;
- Given/When/Then and functional/non-functional decision rule;
- cyclomatic complexity rule and refactoring caveat;
- SDLC/CI/delivery/deployment distinctions;
- a contract-reading checklist: method/path/input/schema/responses/errors/ordering/side effects.

### Resource navigation itself is an exam skill

The papers reward knowing where to look:

- MDN for a method/operator detail;
- TypeScript sheets for syntax/control-flow narrowing;
- Vitest docs for a matcher/global;
- Express PDF for request/response API detail;
- `sync-request-curl` docs for request options;
- embedded Swagger for the actual endpoint contract;
- starter tests/types/backend for executable clarification;
- lecture/tutorial/lab material for theory distinctions or a known course pattern.

ARC helps probe an HTTP server manually but cannot replace programmatic tests or coverage. Swagger preview makes full YAML memorisation unnecessary but does not remove the need to extract and implement the contract correctly.

## Promotions to the master discovery

1. Promote **coverage-complete test construction** to the highest tier, including short-circuit subconditions and the c8 two-process lifecycle. It repeats almost identically for roughly 10 marks per paper.
2. Promote **Swagger-to-thin-Express translation** to the highest tier. It repeats for 10–14 direct marks and supports additional HTTP/design/testing marks.
3. Keep **base JavaScript contract problems** at the highest tier: exactly 10 marks per paper.
4. Promote **typed validation/exception workflows** as a distinct cluster: optional fields, missing/falsy, exact messages/order, precedence, `.toThrow`, caught-error narrowing, and transformation.
5. Promote **structured object aggregation** as a reusable coding pattern, while excluding domain-specific prices/constants.
6. Promote **requirements + Given/When/Then**, **cyclomatic complexity**, and **deployment/process diagnosis** as the three most stable short-answer families.
7. Promote **collected-file and starter-architecture discipline** as exam technique: do not depend on files that are replaced; do not “fix” supplied logic outside scope.
8. Promote **cross-source contract reconciliation**: written prompt, Swagger, types, tests, and backend can contain small inconsistencies, so use the strongest combined evidence rather than blindly trust one line.

## Demotions and space savings

1. Demote full Swagger YAML authoring. Both implementation tasks require consuming a rendered contract, and Practice 1's design response explicitly accepts Markdown.
2. Demote exhaustive API/method/matcher catalogues because official offline documentation is provided.
3. Demote dependency-installation commands; packages are preinstalled and `npm install` is explicitly unnecessary.
4. Demote detailed UML/ER/FSM drawing syntax, Agile principle lists, CI YAML, persistence implementation, token internals, and vulnerability catalogues relative to repeated practical clusters. Retain compact definitions because these may rotate into MCQ.
5. Demote project-specific error codes, validation constants, schemas, prices, and example domains. Every paper supplies these; the skill is systematic extraction.
6. Do not over-allocate to Git command syntax. Git is meaningful in Practice 1 but reduces to code review/team practice in Practice 2; preserve state-flow and merge/MR trade-offs rather than a large command reference.

## Remaining uncertainty before final content selection

- Whether the final follows Practice 2's exact 15 MCQ + 5 short + 5 practical structure. It is the best evidence, but still not a guarantee.
- Which rotating fifth practical appears: type repair, aggregation, API design, or another assignment-derived task.
- Whether Swagger is only read/extended conceptually or actually edited in the final; neither practice paper requires YAML editing.
- Whether absent lecture families return as MCQ or short answer.
- How hidden automarking weighs code quality versus observable correctness outside explicitly metric-only coverage questions.

The next most valuable evidence is repetition in tutorial/lab solutions—not to copy implementations, but to see which course-specific skeletons recur for validation, Express wrappers, HTTP tests, coverage, and Swagger navigation.

## Cross-paper source caveats

- Practice 1's count/mark display is internally inconsistent; use its topics, not its exact allocation, for weighting inference.
- Practice 1 Q27 suggests a separate interface file but collects only the main TypeScript file.
- Practice 1 Q29 contains a mislabeled/gapped visible test.
- Practice 2 Q22's page names the wrong question directory, while its starter/submission paths are clear.
- Practice 2 Q24 contains a Swagger ID-type inconsistency resolved by starter/tests and other schema locations.
- Both papers use Vitest even though some provided-resource labels say Jest; local imports and npm scripts are authoritative.
- Both papers demonstrate that public tests are incomplete and occasionally imperfect. The written behavioural contract and hidden-case reasoning remain essential.
