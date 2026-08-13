# COMP1531 exam resource-availability strategy

This report answers a narrow question: **given the material available inside the exam environment, what can be looked up safely under time pressure, and what still needs to be known or indexed on the eventual handwritten sheet?** It is discovery material, not a draft cheatsheet.

## Evidence checked

- Both supplied 26T2 practice-exam papers and their starter repositories.
- The resource pages bundled with [Practice Exam 1](https://cgi.cse.unsw.edu.au/~cs1531/26T2/practice-exam/resources/) and [Practice Exam 2](https://cgi.cse.unsw.edu.au/~cs1531/26T2/practice-exam2/resources/).
- Primary documentation supplied or named by the course: [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference), [MDN HTTP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference), [TypeScript type](https://www.typescriptlang.org/static/TypeScript%20Types-ae199d69aeecf7d4a2704a528d0fd3f9.png), [interface](https://www.typescriptlang.org/static/TypeScript%20Interfaces-34f1ad12132fb463bd1dfe5b85c5b2e6.png), and [control-flow](https://www.typescriptlang.org/static/TypeScript%20Control%20Flow%20Analysis-8a549253ad8470850b77c4c5c351d457.png) sheets, [Jest globals](https://jestjs.io/docs/api), [Jest matchers](https://jestjs.io/docs/expect), [Express 4 API](https://expressjs.com/en/4x/api.html), [sync-request-curl](https://www.npmjs.com/package/sync-request-curl?activeTab=readme), and [Node.js API](https://nodejs.org/api/).
- Local practice package manifests and starter tests. Both practice repositories currently declare Node 24, TypeScript 6, Express 5.2, Vitest 4.1, `sync-request-curl` 4.0.2 and `c8` 12, despite the supplied Express reference being for Express 4.

The actual exam resource mirror may render differently and some links may fail, as the course warns. Therefore the strategy below treats every external lookup as a fallible aid rather than guaranteed instant access.

## Main conclusion

The supplied resources are strongest for **exact library syntax** and weakest for **course-specific decisions and theory**. The eventual handwritten sheet should not reproduce large standard-library tables. It should prioritise:

1. distinctions and decision rules that are scattered across lectures;
2. course conventions that generic documentation cannot know;
3. very short navigation pointers/examples for high-friction resources;
4. the Vitest/Jest and Express-version mismatches;
5. Swagger/OpenAPI anatomy, Git, CI/CD, coverage reasoning, auth/persistence, and design theory, for which no dedicated primary reference is supplied.

## Topic-by-topic lookup strategy

| Topic | Provided resource | Useful lookup content | Lookup friction in a restricted exam | Do **not** spend much handwritten space on | What still needs recall or a compact handwritten pointer |
|---|---|---|---|---|---|
| JavaScript arrays, objects, strings | MDN JavaScript; tutorial/lab solutions | Exact signatures and examples for `map`, `filter`, `reduce`, `find`, `includes`, `slice`, `splice`, `sort`, `Object.keys/values/entries`, string methods, spread and destructuring | **Medium.** The landing page is a broad index. Finding a named method is easy; discovering which method solves the problem is slow. Offline child links may not all work. | Complete method catalogues or long examples | Know which operation to choose, mutation vs new value, callback shape, accumulator/initial-value reasoning, equality/reference traps, and common boundary cases. A tiny “where to look” index is more valuable than copied documentation. |
| Base problem solving | MDN JavaScript; starter tests | Confirmation of unfamiliar syntax after a solution approach is chosen | **High if used as a teaching source.** Practice questions require quickly composing several operations, not merely recalling one signature. | Language grammar already familiar from use | Algorithm decomposition, reading tests/contracts, loops versus higher-order methods, copying rather than accidental mutation, and handling empty/boundary inputs must be fluent. Practice 1 Q26 and Practice 2 Q21 directly test this. |
| TypeScript types and interfaces | Three official TypeScript image sheets; starter source/JSDoc; compiler errors | Primitive/object/array/function types, optional fields, unions, type aliases, interfaces, `extends`, narrowing, `typeof`, `in`, `instanceof`, discriminated unions | **Medium-high.** The images are dense and require zoom/pan; they are good confirmation, poor diagnosis. They omit course-specific return-union patterns and compiler-error interpretation. | Large generic/conditional/mapped-type sections unlikely to be needed | Common interface/type patterns for backend results, optional properties/parameters, literal unions, function return unions, array element types, narrowing before property access, avoiding `any`, and interpreting what `tsc --noEmit` is asking. Practice 1 Q27 is an entire type-safety/lint repair task. |
| Testing syntax | User-listed Jest Globals and Expect pages; practice starter tests | `describe`, `test`, hooks, `.each`, equality/exception matchers, asymmetric matchers such as `expect.any` | **Low-medium for a named matcher; high for framework mismatch.** Jest pages are long but browser-find works. | Exhaustive matcher/global listings | The exact patterns repeatedly used by the course: `toBe` vs structural equality, strict object assertions, exception callback wrapping, `beforeEach`, table-driven tests if desired, and isolation of shared state. Read the existing starter test before opening docs. |
| Vitest versus Jest | No stable single resource across the evidence: Practice 1 resource page supplied Vitest; Practice 2 resource page supplies Jest; all starter files import from `vitest` | Jest docs are broadly useful for the shared core API (`describe`, `test`, `expect`, hooks, common matchers) | **Critical mismatch.** Jest documentation does not prove a feature exists or is identical in the installed Vitest version. Test-runner commands/configuration differ. | Separate duplicated Jest and Vitest mini-manuals | Treat `package.json`, imports, config and existing tests as authoritative. Preserve `from 'vitest'`; run the provided npm script. Record only the compatibility warning plus core patterns. Do not introduce Jest-only APIs merely because the Jest page documents them. |
| Black-box test design | Lecture slides; tutorial/lab solutions; starter tests | Course examples of partitions, boundaries, error cases and expected body shapes | **High.** Generic Jest docs explain syntax, not which cases achieve good contract or branch coverage. Solutions are spread across weeks and may be in README files. | More matcher syntax | Equivalence partitions, boundary values, happy/error paths, state setup/reset, side effects, exact error precedence, and black-box derivation from requirements/Swagger need conceptual recall. |
| Code coverage | Starter `package.json` scripts and generated reports; lecture/tutorial/lab material | Exact commands for the supplied question; line/branch gaps in HTML/text reports | **Medium-high.** No dedicated Vitest coverage or c8 documentation is provided. HTML reports cost startup/navigation time. Separate server coverage requires multiple processes and clean shutdown. | Generic c8 option inventories | Meaning of statement/branch/function/line coverage, why 100% execution is not correctness, minimum inputs needed to traverse boolean/decision branches, and the different workflows for directly imported code versus an instrumented server. Practice 2 Q25 tests both. |
| HTTP semantics | MDN HTTP | Method/status/header definitions and general protocol semantics | **Medium.** Excellent reference, but broad. It cannot determine the status/body required by a particular Swagger contract. | Full status-code lists or header catalogues | Course conventions: where each input travels, status plus response body as the contract, common status meanings, and error precedence. Swagger/tests outrank generic MDN when they specify behaviour. |
| Express routes | Supplied Express 4 API PDF; starter `server.ts`; lab/tutorial solutions | `app.METHOD`, middleware, `express.json`, request fields, response methods | **Medium-high.** A PDF is slower than HTML; browser/Chromium may struggle. The course explicitly warns Chromium may crash on PDFs and suggests Firefox. The practice repositories install Express 5.2 while the resource is Express 4. | The full Application/Request/Response/Router API | A compact route skeleton and mapping of path/query/body/header inputs. Most required calls are simple and version-stable, but starter code and installed types are the authority when the Express 4 PDF disagrees with Express 5 behaviour/types. |
| Programmatic HTTP tests | `sync-request-curl` npm page; starter tests | Option names and response access, especially `json`, `qs`, `headers`, `statusCode`, `getJSON()` | **Low-medium if the local page renders; potentially high if links fail.** The npm website can be awkward, while starter tests already contain exact working wrappers. | A full third-party package README | A single known-good request-helper pattern and where GET/path/body/header inputs go. Copy/adapt the question's provided helper first. Assert both status and body; start the server separately when required. |
| Manual API probing | ARC API client | Quick exploratory requests and visual inspection of a route | **Medium-high.** Manual re-entry is slow, stateful and not repeatable; it does not contribute automated-test marks. | ARC UI instructions | Know when ARC is useful: diagnosing one route, not replacing required programmatic tests. Prefer npm tests and reusable helpers for marking evidence. |
| Swagger/OpenAPI | Swagger preview capability inside VS Code; tutorial/lab Swagger files; supplied project example | Visual endpoint/method/input/response inspection. Practice resource pages specify `Shift + Alt + P` to preview a Swagger file. The later-supplied `Example swagger/swagger.yaml` provides a large Swagger 2 structural precedent. | **High.** No Swagger/OpenAPI documentation is listed. Preview helps read a valid file, but not remember YAML structure or repair a malformed/unfinished one. The downloaded practice starter folders contain no `swagger.yaml`, even though Practice 2 Q24 says to implement routes from it. The project example itself has unresolved references and no matching code/tests. | Swagger UI operation, long OpenAPI specification tables, or a copied 1,736-line project schema | Version recognition, contract-navigation order, parameter locations, `$ref`, global/local security, and keeping method/path/status/schema aligned with implementation. Use the current question's contract as authority and the project example only as a structural fallback. |
| Node.js and persistence | Node API; lab/tutorial solutions; starter code | `fs` API details, buffers/paths/process details if genuinely needed | **High for this course's common synchronous persistence pattern.** Node docs are enormous and versioned; the practice environment uses Node 24. | Broad Node module/API catalogues | The course lifecycle and policy: load/parse at startup, mutate central data, stringify/write after successful mutations, persist clear/reset, and deal with missing/corrupt files as specified. If `fs` syntax is needed, search by exact method name. |
| Exceptions | MDN JavaScript; Jest Expect | `Error`, `throw`, `try/catch`, `.toThrow` | **Low for syntax, medium for correct use.** | General Error subclass catalogue | When to throw versus return an error object in this course, preserving prescribed messages, and `expect(() => fn()).toThrow(...)` rather than invoking the function before `expect`. Practice 1 Q28 tests this. |
| Requirements, SDLC, verification/validation, Agile | Lecture slides; tutorial solutions | Course definitions, examples and diagrams | **High.** Definitions are spread across PDFs/weekly solutions; searching during MCQ/short-answer work burns time. Generic online docs are absent. | Long prose copied verbatim | Concise contrasts, ordered processes, acceptance-criteria form, and the ability to apply them to a scenario. These are prime handwritten-memory candidates because Practice 1/2 theory sections expect a few precise phrases, not research. |
| Design, modelling, maintainability, complexity | Lecture slides; tutorial solutions | Course diagrams, worked graph/complexity examples, DRY/KISS/YAGNI/coupling/cohesion discussion | **High.** A concept may be located only after opening several decks. | Decorative examples and full lecture narratives | Principle definitions plus application cues; essential vs accidental complexity; low coupling/high cohesion; refactoring reasoning; UML/ER/state/use-case notation; cyclomatic-complexity calculation/interpretation. Both practices contain design/complexity questions. |
| Git, npm/package management, CI/CD, deployment | Lecture slides; tutorial/lab solutions | Course workflows and sample config | **High.** No official Git, npm, GitLab CI, ESLint or deployment documentation is supplied. | Exhaustive command/flag lists | The core Git state flow and merge direction, dependency vs devDependency/lockfile concepts, pipeline vocabulary, CI/delivery/deployment distinctions, environment/config parity and likely deployment failures. Practice MCQs and theory directly test these. |
| Authentication, authorisation and security | Lecture/tutorial/lab materials; possibly project examples | Course token/session/header patterns and expected errors | **High.** None of the supplied online references explains the course's auth contract. Generic Node/HTTP docs are not enough. | Cryptography/API catalogues | Authentication vs authorisation, token location, 401/403/400 distinctions and precedence, ownership checks, hashing/salting versus encryption, and validation of signed token claims. |

## What the practice exams imply about lookup time

The two practice exams reward execution more than documentation browsing:

- The first practice has 20 one-mark MCQs, 20 marks of short-answer theory, then practical tasks in JavaScript, TypeScript repair, exception validation, HTTP wrapping, coverage and open-ended design.
- The second has 15 two-mark MCQs, 20 marks of concise theory, then JavaScript problem solving, validation/processing, aggregation, a Swagger-driven REST API, and direct plus HTTP coverage.
- Practice instructions say the working period is three hours. That makes repeated hunting through slides or large docs disproportionately costly.
- Starter tests and `package.json` are unusually valuable because they reveal the expected imports, versions, scripts, exact data shape, server lifecycle and assertion idiom immediately.

For a coding question, the efficient order is therefore:

1. Read the question contract, starter function/server and supplied tests.
2. Read that question's `package.json` before assuming a command or framework.
3. If Swagger is present, inspect/preview it before writing routes.
4. Run the narrowest provided check (`test`, `tsc`, `lint`, or coverage script).
5. Open external documentation only for a specific unknown symbol or method.

## Important mismatches and traps

### Jest documentation, Vitest execution

This is not hypothetical:

- Practice Exam 1's official resource page advertises **Vitest Documentation**.
- Practice Exam 2's official resource page advertises **Jest Globals/Expect**.
- The user-provided final-environment list also says Jest.
- Every supplied practice test imports from `vitest`, and both root manifests install Vitest, not Jest.

The safe inference is that Jest pages are being offered as a matcher/test-structure reference because the common surface is similar. They should not be treated as the installed runner's authoritative manual. The exam's files and scripts decide the actual framework.

### Express 4 documentation, Express 5 package

Both practice manifests currently install Express 5.2.1 and its types, while the supplied documentation is the Express 4 reference. The core course operations (`app.get/post/put/delete`, `express.json`, `req.params/query/body`, `res.status().json()`) are stable enough for normal questions. For types, error handling or unusual API details, follow the starter code/compiler rather than assuming the PDF matches the installed version.

### Swagger preview is not Swagger documentation

The resource page gives a preview command, not an OpenAPI reference. Previewing is excellent for reading a valid contract. It will not teach the YAML schema during the exam or reliably explain a malformed file. The later-supplied project Swagger now shows the course's Swagger 2 `x-components` style, but it contains broken references and no matching server/tests. The remaining evidence target is therefore a complete *working* Swagger + Express + HTTP-test example, not another large YAML file in isolation.

### Online-looking resources are local mirrors

The practice pages expose local paths under `/home/class/public_html/...`; right-clicking the desktop is the recommended entry point. Raw paths are described as alternate access and the page explicitly says to avoid that route unless a different display is needed. Links may not work, and PDF display can fail in Chromium. Do not plan around internet search, npm installation, or opening dozens of browser tabs.

## Missing dedicated references

The supplied online-documentation set has no dedicated reference for:

- Swagger/OpenAPI authoring or schema syntax;
- Git and merge/conflict workflows;
- npm/package.json/package-lock semantics;
- Vitest itself in the final-environment list;
- c8 or Vitest coverage configuration;
- ESLint and TypeScript compiler diagnostics/configuration;
- GitLab CI/CD YAML;
- authentication/authorisation conventions;
- persistence architecture;
- requirements engineering, SDLC, Agile, validation, modelling, maintainability and complexity.

Lecture slides and tutorial/lab solutions partially cover all of these, but they have high search friction. This missing-reference list is a strong signal for what the final handwritten artefact must make immediately retrievable.

## Navigation rehearsal recommendations

Before choosing final sheet content, practise these operations in the trial/practice environment:

- Open the desktop Resources menu and confirm whether it launches Firefox, Chromium, a file manager or a custom index.
- Open one lecture PDF and use search; confirm how quickly it renders and whether Chromium crashes.
- Open each TypeScript image, test zoom/pan, and decide whether it is usable under pressure.
- Open Jest Expect and locate `toStrictEqual`, `toThrow`, `expect.any`, and `beforeEach` via page search.
- Open Express PDF in Firefox and locate `req.body`, `req.params`, `req.query`, `res.status`, and `res.json`.
- Open `sync-request-curl` and locate `json`, `qs`, `headers`, `statusCode`, and `getJSON`—then compare with the starter helper so the latter can be used first.
- Open a complete tutorial/lab Swagger file and preview it with `Shift + Alt + P`; confirm linked schemas and response sections render.
- Generate a coverage report once, locate uncovered branches, and make sure the server coverage report is emitted after the process is stopped.

If any of those take more than roughly a minute during rehearsal, that resource should be treated as backup only and the eventual sheet should contain a compact pointer/pattern instead.

## Discovery implications for the future cheatsheet

Without drafting it yet, the resource strategy suggests three classes of handwritten content:

1. **Must know instantly:** course theory contrasts, status/auth decisions, coverage reasoning, maintainability/design principles, error precedence, persistence lifecycle and test-design heuristics.
2. **Tiny syntax anchors:** one route/request/test/exception/type/OpenAPI pattern, chosen from course code, to bridge into the supplied docs or starter files.
3. **Do not duplicate:** broad JS/Node/Express/Jest method catalogues and advanced TypeScript features that the official resources already contain.

The next high-value evidence is a complete course tutorial/lab solutions snapshot—especially the HTTP, Swagger, auth, persistence and coverage weeks—and the exact final-exam resource page if it differs from Practice Exam 2. The project Swagger has resolved the basic structural-example gap; what remains missing is its worked translation into Express routes and HTTP tests, plus confirmation that Jest documentation is intentionally supplied for a Vitest-based paper.
