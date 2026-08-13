# `lab07_objection` as an in-exam lookup resource

This report evaluates the uploaded `lab07_objection` exercise/worked tree and its separate official implementation against the two 26T2 practice exams. It is a retrieval/value assessment only: it does **not** draft the A4 sheet or solve any practice question.

## Bottom line

`lab07_objection` is a **high-value narrow lookup** for direct unit-test coverage and a **medium-value lookup** for compact JavaScript/TypeScript string classification. It is only a **partial** exception/validation example and does not help with the other major repeated practical families: Express/Swagger, HTTP testing and separate-server c8 coverage, nested object aggregation, auth, or persistence.

Its best exam use is not to copy the objection algorithm. It is to recover, in one small example:

- a branch-heavy function whose rules can independently add zero, one, or many results;
- typed enums and `Set<Objection>`;
- normalise-once string processing with `includes`, `startsWith`, `endsWith`, regex, `split`, `some`, and `filter`;
- a callback passed to `.toThrow`;
- `test.each` and structural equality over `Set` values;
- the direct-code `vitest run --coverage` workflow.

The official solution contains only the implementation. The uploaded `master` snapshot supplies the useful test suite and package scripts, but it appears to be a completed/worked copy rather than a pristine official starter. Therefore use the official file as the stronger implementation example and treat the `master` tests as a course-compatible example, not as an official minimal or certified-100%-coverage test suite.

## Authority and provenance of the uploaded files

| Artefact | What it establishes | Reliability for an exam lookup |
|---|---|---|
| `Example lab + solution/lab07_objection-master/README.md` | Behavioural contract, testing goal, coverage-report workflow | Strong for what this lab asked; not authority for a different exam contract |
| `Example lab + solution/lab07_objection-solution/solution/objection.ts` | Separate official implementation, decomposed into small predicates | Best implementation-pattern source in this upload |
| `Example lab + solution/lab07_objection-master/src/objection.ts` | A second complete implementation with a different decomposition | Useful comparison/worked example; do not assume it is official |
| `Example lab + solution/lab07_objection-master/src/objection.test.ts` | Vitest examples for errors, partitions, table-driven cases, Sets and combined outcomes | Useful but not supplied in the official-solution folder; no included report proves it is minimal or reaches every branch |
| `Example lab + solution/lab07_objection-master/package.json` | Actual scripts and local toolchain: Vitest, V8 coverage, TypeScript, ESLint | Strong syntax anchor, but the exam question's own `package.json` remains authoritative |
| `Example lab + solution/lab07_objection-master/.gitlab-ci.yml` | An unfinished CI exercise scaffold | **Do not use as a CI example**; its testing/linting jobs contain placeholders only |

There was no `node_modules` directory in the upload, so this review did not install packages or execute the test/coverage suite. Claims below are based on the inspected contract and source, not a newly generated coverage report.

## Match against repeated exam archetypes

| Repeated archetype from the two practice exams | Lab value | Exact overlap | Important gap |
|---|---|---|---|
| Core JavaScript transformation: Practice 1 Q26 and Practice 2 Q21, 10 marks each | **Medium-high** | Strings, case normalisation, membership, regex cleanup, splitting, callback predicates, multiple-output collection | No chunking, object-key omission, frequency map, sorting/uniqueness, copying, or general object transformation |
| TypeScript as a pervasive substrate; Practice 1 Q27 type/lint repair | **Medium-low** | Typed parameters/return, string and numeric enums, generic `Set<Objection>`, separate `tsc`/lint scripts | No interfaces, optional fields, object-result unions, `undefined` narrowing, `.find` narrowing, `catch` narrowing, or deliberate type-repair exercise |
| Validation and exact exceptions: Practice 1 Q28 and Practice 2 Q22 | **Partial** | Guard clauses, `throw new Error`, and `expect(() => fn()).toThrow(...)` | README does not prescribe exact messages; tests assert only `Error`, not message text; no optional-field detection, alphabetical missing fields, precedence table, `try/catch` transformation, or missing-versus-falsy trap |
| Structured object filtering/aggregation: Practice 2 Q23 and supporting work in both papers | **Low** | Predicate composition and collecting multiple results in a Set | No nested interfaces, complete zero-initialised accumulator, grouping, conditional totals, lookup prices, or order-preserving object output |
| Swagger-to-Express: Practice 1 Q29 and Practice 2 Q24 | **None** | None | No server, routes, request channels, parsing, status mapping, Swagger, or JSON response contract |
| Coverage-driven direct unit tests: Practice 1 Q30(a) and Practice 2 Q25(a) | **High** | Branch-heavy control flow, many independent predicates, early errors, table-driven cases, one `listObjections` call per test, and V8 coverage script/report | No included coverage report; do not assume these exact cases cover every short-circuit/callback branch or form a minimum set |
| HTTP tests and separate-server coverage: Practice 1 Q30(b) and Practice 2 Q25(b) | **None** | None | No `sync-request-curl`, Express process, `c8`, second terminal, or clean-stop/report-flush workflow |
| REST/API design: Practice 1 Q31 | **None** | General contract-reading discipline only | No endpoint/method/input/status/auth/resource modelling |
| Requirements and Given/When/Then: repeated short answer | **None** | The README is a precise behavioural specification, but not an acceptance-criteria lesson | No functional/non-functional classification or Given/When/Then template |
| Cyclomatic complexity/refactoring: repeated short answer | **Low, indirect** | Official solution extracts one predicate per rule, making decision sites easy to inspect | No complexity formula or control-flow graph; helper extraction can change per-function measurements without removing the underlying domain cases |
| Deployment/SDLC diagnosis: repeated short answer | **None** | Package scripts only | The CI file is a placeholder and must not be copied as a pipeline pattern |
| Auth/authz, persistence, HTTP semantics | **None** | None | No token/session/ownership/status logic, file lifecycle, or protocol boundary |

## Where it is strongest

### 1. Direct coverage and test partitioning

This is the lab's closest match to an exact repeated exam task. The README explicitly directs the student to generate an HTML report and use uncovered lines/branches to refine tests. The implementation has several kinds of path obligation that resemble the practice coverage questions:

- separate empty-input guards;
- CROSS versus DIRECT control flow;
- multiple independent `if` rules after that split;
- `some(...)` over alternative phrases;
- `A || B` leading-question logic;
- a threshold comparison;
- a result containing none, one, or several objections.

The uploaded tests demonstrate useful test shapes:

- callback wrapping for thrown errors;
- `test.each` for partitions of one rule;
- a negative/false case beside positive cases;
- exact `Set` structural comparison;
- one final case that combines several simultaneously true rules;
- one call to the function under test per generated test case, matching the special practice-exam constraint.

However, it must not be treated as a ready-made coverage matrix for another function. The practice questions specifically require tracing short-circuit operands, early returns, and numeric boundaries in the supplied code. The lab shows the **workflow and test organisation**, while the exam function determines the actual inputs.

### 2. Small JavaScript/TypeScript classification code

The official implementation is only 112 lines and places almost every reusable string predicate near the top. It is much quicker to scan than MDN when the unknown is “how did the course combine these operations?” rather than “what is the signature of one named method?”

High-value snippets include:

- case-insensitive processing by lowercasing once;
- count occurrences using `match(...)` plus an empty-match fallback;
- test any phrase with an array and `.some(...)`;
- combine start/end predicates;
- remove punctuation, split into words, and test exact shared membership;
- add independent classifications to a typed `Set`.

This overlaps the core-JS practical family, but it is not a general algorithms reference. In particular, it does not supply the object-map/accumulator, unique-value, chunking, copying, or sorting patterns seen in the two practice exams.

### 3. Helper extraction as a maintainability example

The official implementation factors each objection rule into a named predicate (`isArgumentative`, `isHearsay`, `isLeading`, and so on), whereas the worked `master` implementation leaves more of the rules inline. This is a compact comparison for responsibility, readability, and local reasoning.

It is only supporting evidence for maintainability questions. It should not be used to claim that extracting helpers necessarily removes essential complexity or reduces the total number of behavioural cases. The rules still exist and still require tests.

## Where it is weak or misleading

### Exception handling is much narrower than the practice exams

The lab contract requires an error for either empty string but does not mandate the message. The official solution throws two different messages in a fixed guard order; the worked copy throws one combined message; the tests check only `.toThrow(Error)`. All can satisfy the displayed lab contract.

That makes the lab useful for remembering the callback shape, but **not** for learning exact-message, punctuation, alphabetic-order, optional-field, or error-precedence requirements. For those, the exam prompt and starter tests must be read literally.

### The coverage instructions contain a framework wording mismatch

The README says to add “`jest`” but the shown command is `vitest run --coverage`, the tests import from `vitest`, and the manifest installs Vitest plus `@vitest/coverage-v8`. This reinforces the existing resource-strategy warning: use the current question's imports, package scripts, and installed packages as authority; do not infer the runner from prose or the provided Jest documentation alone.

### It cannot bridge into the HTTP half of coverage

There is no Express process or client test. In particular, this lab cannot answer:

- which input belongs in `req.body`, `req.query`, `req.params`, or headers;
- how to use `sync-request-curl`;
- how backend error objects map to 400/401/403/404;
- how to start a server under `c8` in one terminal, test it from another, then stop it so the report is emitted.

The direct-code `--coverage` script must not be mistaken for the separate-server workflow assessed in both practice papers.

### Some files are actively poor lookup targets

- `.gitlab-ci.yml` is unfinished and contains “Add testing here”/echo placeholders.
- `eslint.config.mjs` is a long local ruleset; the current exam question's lint errors/config are more relevant.
- `package-lock.json` is large and offers no fast conceptual help.
- The README's setup/submission instructions are irrelevant in an exam where dependencies are preinstalled and only named answer files are collected.
- The official helper name `isCoumpound` is misspelled. It works internally, but should not be copied as naming guidance.
- A `Set` is useful for this pure function, but should not be copied blindly into an HTTP JSON response: it is not the object/array response shape described by a Swagger contract.

## Exact file map and search fingerprints

### Workspace paths now verified

| Need | Open this file | Fast fingerprint | Useful region |
|---|---|---|---|
| Official typed implementation and helper decomposition | `Example lab + solution/lab07_objection-solution/solution/objection.ts` | `listObjections` or `Set<Objection>` | enums at lines 1–22; helpers at 24–58; orchestration at 60–112 |
| Regex word-membership pattern | same official file | `isNonResponsive` or `replace(/[^0-9a-z` | lines 50–54 |
| Phrase alternatives with callbacks | same official file | `isHearsay` or `some(w =>` | lines 32–37 and 43–47 |
| Error guards | same official file | `Question cannot be an empty string` | lines 65–71 |
| Worked alternative using a Set for membership | `Example lab + solution/lab07_objection-master/src/objection.ts` | `testimonyWordSet` | lines 83–94 |
| Exception assertion wrapper | `Example lab + solution/lab07_objection-master/src/objection.test.ts` | `.toThrow(` | lines 4–14 |
| Table-driven Vitest patterns | same test file | `test.each([` | lines 16–38, 51–61, and 64–73 |
| A case with several simultaneous outcomes | same test file | `returns multiple objections together` | lines 116–128 |
| Lab contract and exact classification rules | `Example lab + solution/lab07_objection-master/README.md` | `## Objection Items` or `NON_RESPONSIVE` | lines 160–206 |
| Direct coverage workflow | same README | `coverage/index.html` | lines 208–228 |
| Actual test/type/lint commands | `Example lab + solution/lab07_objection-master/package.json` | `vitest run --coverage` | lines 8–29 |

### Exam-mirror retrieval

The verified lab-solution mirror root from the practice resource pages is:

```text
/home/class/public_html/1531-Lab-Solutions/
```

The exact `lab07_objection` subfolder layout inside that mirror has not been observed, so it should not be guessed. Open the mirror in VS Code/global search and use the most distinctive content fingerprint first:

```text
listObjections
Set<Objection>
isNonResponsive
vitest run --coverage
```

If the mirror contains only the official solution, `listObjections` should reach it quickly. If tests are needed and the solution mirror does not include them, this uploaded `master` path is evidence that the exercise repository—not merely `solution/objection.ts`—is where the useful `test.each` and `.toThrow` examples live. Availability of that worked test file inside the exam mirror is not yet verified.

Avoid broad first searches such as `.filter(`, `.some(`, `Error`, or `coverage`; they will likely return many labs. `listObjections` is the best unique locator, followed by the type string `Set<Objection>`.

## Relative lookup speed

| Lookup | Expected speed once the mirror is open | Assessment |
|---|---|---|
| Find the lab by `listObjections`, then open official `objection.ts` | **Fast** | Unique symbol; one 112-line implementation |
| Recover a string/Set predicate from the official implementation | **Fast** | Relevant code is concentrated in lines 24–58 |
| Recover `.toThrow`/`test.each` from the worked tests | **Fast if the test file is available; unavailable otherwise** | The official solution upload itself has no tests |
| Reconstruct the lab's exact behavioural rules from README | **Medium** | Rules are compact but distributed across seven cases and notes |
| Derive a new exam's branch-complete input matrix by adapting these tests | **Slow/unsafe** | Must trace the exam's own function; copying lab cases is not transferable |
| Find an Express/Swagger/HTTP/c8-server pattern here | **Impossible** | Artefacts do not exist in this lab |

The efficient exam sequence is: read the exam contract/code/tests first; identify one missing pattern; search `listObjections`; open only the smallest matching implementation/test file; adapt the pattern; return immediately to the exam's own checks.

## Implications for eventual handwritten allocation

This lab **reduces**, rather than increases, the need to handwrite broad syntax for:

- `test.each`;
- the basic `.toThrow` callback shape;
- enum and `Set<T>` syntax;
- string-predicate combinations and simple regex cleanup;
- the direct `vitest run --coverage` command, provided this lab is easy to locate.

It does **not** justify removing handwritten space for the higher-value reasoning and gaps identified across both practice papers:

- branch/short-circuit path-enumeration procedure and boundary selection;
- the distinction between direct Vitest coverage and separate-server c8 coverage;
- missing-versus-falsy checks, exact-message formatting, and deterministic error precedence;
- core object accumulator/transformation patterns not present here;
- request-channel parsing and thin Express status/body mapping;
- Swagger contract anatomy/navigation;
- 400/401/403/404 and auth/authz rules;
- Given/When/Then, cyclomatic-complexity calculation, and SDLC/deployment reasoning.

The likely allocation effect is therefore small: index this lab as the preferred **coverage/test organisation + string classification** example, and spend the eventual handwritten space on decision rules the lab cannot supply quickly. No domain-specific objection names, phrases, enum members, regex, or error texts deserve space on the final A4 sheet.

## Best next lab evidence

This upload resolves only the direct-coverage/string-classification slice. The single most complementary lab would be one compact folder containing a valid `swagger.yaml`, matching `server.ts`, `sync-request-curl` HTTP tests, and package scripts for a server run under `c8`. After that, the highest-value gaps are ordered exception validation with optional fields, auth-protected routes, and persistence lifecycle.
