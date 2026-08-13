# COMP1531 discovery report: persistence, exceptions, auth, modelling, maintainability, complexity

Scope: discovery for a later handwritten A4 cheatsheet. This is **not** a finished cheatsheet. Every page of the seven assigned decks was checked via text extraction plus rendered-page inspection. Page numbers below are PDF page numbers (1-based).

## 1. Persistence

Source: `Slides/07.1 - Persistence.pdf`

### Exact examinable concepts

- **Persistence**: program state outlives the process that created it; for this course, interpret it as storing data to disk (pp. 8, 12).
- Why it matters: memory is lost when a process stops; persistence retains information across process runs, sessions, and users and underpins databases, backups, and analytics (pp. 3, 8).
- **State** is application data required for the application to function (p. 4).
- The **data layer** is the architectural layer dedicated to storing data and maintaining longer-term state (p. 5). The illustrated stack is interface layer -> business logic -> services layer -> data layer. Only the data layer is shown as typically having state; examples beside the layers are an endpoint, `getUser()` logic, services such as auth/payments, and database queries (p. 5).
- A **database** is used broadly here to mean a store of data; the data layer typically consists of a database (p. 6).
- Three storage mechanisms, in the lecture's order (p. 6):
  1. in-memory - non-persistent;
  2. in-file - direct filesystem storage;
  3. in-database - relational SQL or NoSQL.
- Lecture claim: moving down that list raises the barrier to entry and performance (p. 6). This is a course simplification, not a universal benchmark.
- Project implementation is deliberately an **in-file JSON database**, not SQL (p. 10): serialize program state to a JSON string stored in a file.
- Lifecycle (p. 11):
  - **Load on server start**: open JSON file, parse JSON, assign parsed object to the global state variable.
  - **Save**: either periodically on a timer or after every route call, stringify global state and write it to the file.
- Stated quality benefits (p. 12): reliability (state survives process lifetime), recovery (restore last known correct state after failure), scalability (multiple instances coordinate over a shared stable data layer).

### Likely assessment prompts and pitfalls

- Distinguish ordinary variables/in-memory state from persistence; variables alone do not survive process termination (pp. 3, 7-8).
- Locate persistence in the **data layer**, not in route/interface or business logic (p. 5).
- Explain exactly when load/save occurs (p. 11).
- Do not claim `JSON.stringify` itself persists data; the resulting string must be written to disk, and startup must read and parse it (pp. 10-11).
- Cross-topic risk: with multiple server processes, a single local JSON file is not automatically a sound distributed datastore; the slide's scalability statement is conceptual and refers to a shared stable data layer (p. 12).

### High-value eventual space candidates

- One-line definition; three storage types; startup `read -> parse -> state` and mutation/route `state -> stringify -> write`; data-layer location; reliability/recovery rationale.

## 2. Exceptions

Source: `Slides/07.2 - Exceptions.pdf`

### Exact examinable concepts and patterns

- An **exception** is an event, usually caused by an error such as invalid input or a missing file, that disrupts normal program flow; its purpose is graceful recovery rather than abrupt termination (p. 5).
- JavaScript uses exceptions for most error handling, whereas C has no exceptions (p. 6).
- Raising an exception: `throw new Error('message')` after detecting invalid input, e.g. `Number.isNaN(score)` or a score outside 0-100 (pp. 4-5, 11-13).
- Handling: enclose the operation in `try { ... } catch (err) { ... }`; the examples use `err.message` and `err.name` (pp. 4, 7, 12-13).
- **EAFP - Easier to Ask Forgiveness Than Permission** (pp. 7-8): assume the operation will succeed; recover with `try...catch` if it fails.
  - Pros: simpler main logic; one catch can cover several error types.
  - Cons: less structured; harder to reason about what will execute.
- **LBYL - Look Before You Leap** (pp. 9-10): check a precondition before the operation. Example: `fs.existsSync(filePath)` before `fs.readFileSync(filePath, 'utf-8')`.
  - Pros: no exceptions required; structured/easier to reason about.
  - Cons: error checks can obscure core logic.
- Robustness progression in the grading examples (pp. 11-13): throw on an invalid score; catch the error; re-prompt; finally loop with `let success = false; while (!success) { try { ...; success = true } catch { ... } }` until valid input.
- Jest exception assertion (p. 14): pass a function to `expect`, e.g. `expect(() => gradeFromScore(-1)).toThrow('Score must be between 0 and 100')`.
- Three error classes (pp. 15-18):
  - **Compile-time**: detected before execution; syntax or type errors; program cannot start until corrected.
  - **Runtime**: occurs during execution; e.g. invalid input/missing file; may be handled with `try...catch`.
  - **Logic**: program executes but gives a wrong result; faulty algorithm/logic; hardest to detect and requires reviewing program logic/tests.

### Likely assessment prompts and pitfalls

- Compare EAFP and LBYL, including their trade-off: clean main path vs explicit precondition checks (pp. 7-10).
- `throw` raises; `catch` handles. Merely throwing does not recover, and merely logging/`process.exit(1)` terminates (pp. 3-5, 11).
- Jest trap: `expect(gradeFromScore(-1)).toThrow()` invokes the function too early; use `expect(() => gradeFromScore(-1)).toThrow()` (p. 14).
- A type error can be compile-time in TypeScript; JavaScript's exact behaviour depends on tooling. Use the course classification shown on pp. 15-18.
- A logic error is not necessarily an exception and does not necessarily crash (p. 17).
- Slide inconsistency: p. 11 says the program throws but is not handling the exception, although the displayed `grade_exception1.ts` includes an outer `try/catch`. Preserve the conceptual progression but do not copy that sentence as a code fact.

### High-value eventual space candidates

- Exception definition; `throw`/`try`/`catch` skeleton; EAFP vs LBYL table; Jest arrow-wrapper pattern; compile-time/runtime/logic distinction.

## 3. Authentication, authorisation, password security, and tokens

Source: `Slides/07.4 - Auth.pdf`

### Exact examinable distinctions

- **Authentication** verifies **who** a user is (e.g. email + password); **authorisation** decides **what** an authenticated user may do (student/tutor/admin permissions). Authentication comes first (pp. 3, 24-25).
- Basic registration (p. 4): receive email/password -> check whether user exists -> store credentials.
- Basic login (p. 4): receive credentials -> retrieve stored credential -> compare.
- Plaintext-password flaw: if storage is leaked, attackers immediately obtain usable passwords (pp. 5-7).
- **Hashing**: a one-way cryptographic function converting a password to a fixed-length value; the original is not reasonably recoverable (pp. 7-10).
- Lecture hashing code (p. 9): Node's built-in `crypto`; `crypto.createHash('sha256').update(plaintext).digest('hex')`. No `npm install` is required.
- Improved registration/login (pp. 12-14):
  - registration hashes password and stores `{ email: passwordHash }`;
  - login hashes the submitted password and compares it with the stored hash;
  - fixed implementation stores `getHashOf(pw)` and checks `getHashOf(pw) === data.users[email]`.
- **Encryption** transforms plaintext into ciphertext and is reversible with the correct key; it protects confidential data in transit and at rest (pp. 15-18).
- Lecture encryption code (p. 17): AES-256-CBC, 32-byte random key, 16-byte IV; `createCipheriv`/`createDecipheriv`; encode UTF-8 to hex and hex back to UTF-8.
- Hashing vs encryption table (pp. 18-19):
  - encryption: confidentiality, reversible with key, store ciphertext plus manage key, uses include messages/files/HTTPS;
  - hashing: password storage/verification, one-way, store hash (and salt), use for password authentication.
- **Salt** note (p. 19): unsalted identical inputs yield identical hashes; salts make stored password hashes unique and add protection.
- Tokens can carry claims such as `userId`, `role`, `permissions`, and expiry timestamp (p. 20). Blindly trusting client-editable claims enables privilege escalation.
- **Obfuscation is not integrity** (p. 21): `base64(userId)` merely disguises reversible data, supplies no cryptographic integrity test, and requires server lookup.
- **Signing/tamper evidence** (p. 21): `signature = HMAC(secret, payload)` and a token conceptually containing base64(payload + signature). The server can detect changes, and the claims can be trusted without a DB lookup if signature verification succeeds.
- HTTP tie-in (pp. 20, 22-23): requests contain URL, method, headers, body; `Authorization: Bearer <token>` carries login tokens, `Content-Type` identifies JSON, `Host` identifies destination, and `User-Agent` identifies client. Responses contain status code, headers, body; `Set-Cookie` asks the client to retain and resend session data.

### Security/code pitfalls

- Never store or compare plaintext passwords in persistent storage (pp. 5-7, 11-14).
- Hashing is not encryption: hashes are for later comparison, not later decryption (pp. 18-19, 25).
- Base64 is encoding/obfuscation, not encryption, hashing, or signing (p. 21).
- A token is not trustworthy just because it is syntactically valid JSON/base64; verify its signature and relevant claims, including expiry/permissions (pp. 20-21).
- Authentication does not imply all permissions; authorisation checks are still required per operation (pp. 3, 24-25).
- The raw `sha256(password)` example is educational. For real password storage, the deck itself hints at salts (p. 19); do not describe the unsalted demo as production-grade password handling.
- The statement on p. 18 that reversibility makes encryption "less secure" is too broad. The examinable distinction is purpose/reversibility: encryption and password hashing solve different problems.
- Tokens belong conventionally in HTTP auth headers; do not invent a request-body auth scheme when answering from these slides (pp. 20, 22).

### High-value eventual space candidates

- Authentication vs authorisation; registration/login hash flow; hash vs encryption comparison; salt; signed token vs base64 obfuscation; common token claims; `Authorization: Bearer`.

## 4. Conceptual modelling and state machines

Sources:

- `Slides/07.5 - Conceptual Modelling.pdf`
- `Slides/08.1 - Conceptual Modelling (Cont'd).pdf`

### Core definitions and purposes

- A **model** is a simplified representation of a more complex system used to understand, communicate, or reason about it (07.5 pp. 3-10; 08.1 p. 3).
- Models reduce complexity by focusing on important features; help prediction, analysis, documentation, what-if reasoning, communication, and implementation reference; they are cheaper than constructing the real system (07.5 pp. 10, 14; 08.1 p. 3).
- A **conceptual model** captures a system conceptually rather than physically and tends to be diagrammatic/visual (07.5 p. 11; 08.1 p. 4).
- Classification activity: mathematical/functions, data, domain, and state-transition models are conceptual; a scale house, topographic model, and molecular ball-and-stick model are physical examples (08.1 p. 5).

### Structural vs behavioural models

- **Structural models** show static structure: objects/data/entities/relationships and which components exist. Examples: UML class diagrams and ER diagrams. Use for architecture and data relationships (07.5 p. 12).
- **Behavioural models** show dynamics over time: events, actions, transitions, workflows, user interactions, system responses. Examples: state diagrams/state machines and use-case diagrams/user flows (07.5 p. 13).
- **UML class diagram** is static and shows classes, attributes, operations/methods, and relationships (08.1 p. 6). The annotated example includes association, multiplicity (`0..*`, `1..*`, `1`), role, aggregation (open diamond), generalisation/inheritance (open triangle), and an abstract class.
- **ER diagram** models database tables/entities, columns/attributes, and relationships (08.1 p. 7). The example visibly marks PK and FK and uses crow's-foot-style cardinalities.
- **Use-case diagram** shows actors and the actions/use cases available when they interact with the system; CRUD is a starting point for discovering use cases (08.1 p. 8). Visual notation includes stick-figure actors outside a system boundary, use cases as ovals, and association lines; multiple actors may share use cases (08.1 p. 9).

### State diagrams and finite state machines

- A **state diagram** is a behavioural diagram showing distinct states plus labelled, directed transitions caused by events/actions (07.5 p. 15; 08.1 p. 10).
- A **finite state machine (FSM)** consists of a finite set of states, transitions triggered by events/actions, and rules defining valid movement between states (07.5 p. 18). A state diagram is the visual notation used to communicate an FSM (08.1 p. 11).
- Notation taught: states as circles and transitions as labelled arrows, although some examples use rounded boxes (07.5 p. 15; 08.1 pp. 10, 13).
- Door exercise (07.5 pp. 16-17): states `Opened`, `Closed`, `Locked`; transitions `Close` Opened->Closed, `Open` Closed->Opened, `Lock` Closed->Locked, `Unlock` Locked->Closed. No direct Opened<->Locked transition.
- Parking-meter example (07.5 pp. 19-22; 08.1 p. 10): states `Enter parking bay`, `Enter duration`, `Insert coins`, `Confirm`; events include number input, coin insert self-loop, sufficient funds, cancel or 5-minute timeout with coin ejection, confirmation/OK and printing a ticket. This demonstrates loops, alternate exits, and labels/guards on arrows.
- Opal activity and solution (07.5 pp. 23-24): simplified states `Ready`, `Active Trip`, `Low Balance`; actions include tap on, tap off, top up, and low-balance detection. It is another likely "derive a state diagram from prose" exercise.
- Traffic-light quiz/solution (08.1 pp. 12-13): start at Green (60 seconds) -> Amber (5 seconds) -> Red (30 seconds) -> Green, with each timeout labelled. The prompt's prose lists Red/Amber/Green but explicitly says after Green go to Amber then Red; the drawn start is Green.

### Likely assessment prompts and pitfalls

- Given a scenario, identify states (stable conditions) separately from events/actions (transition labels), then draw only valid directed transitions (07.5 pp. 15-24; 08.1 pp. 10-13).
- Distinguish the machine (behaviour/rules) from its diagram (visual notation) (08.1 p. 11).
- Choose model type: class/ER for static structure; state/use-case for behaviour (07.5 pp. 12-13; 08.1 pp. 6-10).
- Use-case actors are roles external to the system; use cases are goals/actions, not implementation functions (08.1 pp. 8-9).
- UML class and ER diagrams are both structural, but UML focuses on software classes/methods while ER focuses on persistent entities/tables/columns/relationships (08.1 pp. 6-7).
- Slide wording on 08.1 p. 11 says an FSM describes how a system changes "from one state"; interpret this as changes **between states**.

### High-value eventual space candidates

- Model/conceptual-model definitions; structural vs behavioural comparison; mini notation key for class/ER/use-case/state diagrams; FSM components; a tiny state-diagram construction checklist.

## 5. Designing for maintainability

Source: `Slides/08.2 - Design for Maintainability..pdf`

### Core concepts and lecturer emphasis

- Maintainable software is resistant to breaking as inevitable changes occur over time and as the system and team change (pp. 2-4).
- Sources of change: different developers, changing requirements/new features, performance improvements, and bug fixes (p. 5).
- Strong lecturer emphasis: code grows; be ready to adapt. Maintainability is presented as more important than performance because unmaintainable growth/patching creates performance issues, while modular maintainable code is easier to optimise (pp. 5-6).
- Three ways to improve maintainability (pp. 8-9):
  - testing protects against correctness regressions during change;
  - system design provides coherent high-level/conceptual structure;
  - code design makes high- and low-level implementation choices resilient to future change.
- **Code design** occurs between writing tests and writing code: tests establish **what** is required; design plans **how** to do it (p. 10).

### The design questions/principles

The slide title says "6 Design Questions" but lists seven (p. 11):

1. **One source of truth / DRY** (pp. 12-13): repeated knowledge/configuration requires parallel edits and invites inconsistency. DRY means each piece of knowledge has a single unambiguous authoritative representation. The code example duplicates two nearly identical loops/printing formats and invites extraction of the common structure.
2. **As simple as possible / KISS** (pp. 14-18): use the simplest suitable tool and solution; more code means more maintenance and tests; clear code beats clever code. Examples point to standard facilities/libraries for random strings, dates, and CLI parsing (`Commander.js`).
3. **Avoid over- and under-design** (pp. 19-21): over-design produces complex abstractions for trivial changes; under-design forces constant restructuring as scope grows. Applying DRY unconditionally can reintroduce complexity; duplicating something only twice may be acceptable.
4-5. **Keep related modules close and unrelated modules apart** (p. 22): coupling is interdependence. Excessive connection means one change can break other components and can create spaghetti code. The intended summary target is **low coupling, high cohesion** (p. 29).
6. **Do not speculate / YAGNI** (pp. 23-24): work top-down from required high-level capability; avoid unused low-level utilities; do not implement functionality until it is known to be needed. Less unnecessary code means less to maintain.
7. **Follow conventions** (pp. 25-27): ask whether the problem already has a familiar standard solution; standard styles/libraries improve maintainability because other developers recognise them. Examples: uppercase constants, Express for servers. A wrapper such as `dateNow()` around `new Date().toISOString()` can be clear, but a generic `loop(count, callback)` replacing ordinary `for` loops removes clarity despite reuse.

- **Refactoring**: restructuring existing code without changing external behaviour, usually to correct poor design and improve maintainability (p. 28). Strong tests are a prerequisite; "blind" refactoring may add more bugs than it prevents.

### Likely assessment prompts and pitfalls

- Apply a named principle to a snippet and justify it, rather than merely expanding the acronym (pp. 12-27).
- DRY is about duplicated knowledge/authority, not eliminating every repeated line. Premature abstraction can violate KISS and worsen maintainability (pp. 12, 20, 27).
- Standard target is **low coupling + high cohesion** (p. 29): minimise dependencies between separate components; keep the contents of each module strongly related. P. 22's phrase "related components tightly coupled" should not override the explicit summary target.
- YAGNI rejects speculative capability, not requirements that are already known (p. 23).
- Refactoring must preserve external behaviour; a feature change is not refactoring (p. 28).
- Tests support safe refactoring/change, but tests alone are not design (pp. 8-10, 28).

### High-value eventual space candidates

- Maintainability definition; DRY/KISS/YAGNI with one-line diagnostic questions; low coupling/high cohesion; over- vs under-design; refactoring definition plus test-suite warning.

## 6. Software complexity

Source: `Slides/08.3 - Software Complexity.pdf`

### Essential vs accidental complexity

- The distinction comes from Fred Brooks's 1986 paper *No Silver Bullet - Essence and Accident in Software Engineering* (p. 4).
- **Essential complexity** is inherent to the problem/required behaviour; e.g. 30 required capabilities entail essential complexity. It cannot fundamentally be removed, but good design can manage it (pp. 5-6).
- **Accidental complexity** is not inherent to the problem; e.g. generating/parsing mandated formats. Engineering decisions, libraries, and standards can mitigate it, though it may be hard to eliminate entirely (pp. 5-6).
- Lecture leaves open how concretely to distinguish the two and how much accidental complexity modern software contains (p. 7).

### Measures

- Lecture measures: coupling, cohesion, and cyclomatic complexity (p. 8).
- **Coupling** measures how closely connected different software components are, described ordinally as loose/tight; loose coupling is good (p. 9).
- **Cohesion** measures how strongly elements within a module belong together, described ordinally as low/high; high cohesion is good (p. 10).
- **Cyclomatic complexity** measures branching complexity/number of linearly independent paths through a function (p. 11).
- Procedure (p. 12): convert the function to a control-flow graph, then calculate
  - `V(G) = e - n + 2`, where `e` is edges and `n` is nodes.
- Worked examples (pp. 13-17):
  - single `if/else`: `e=4`, `n=4`, `V=2`;
  - nested conditional: `e=6`, `n=5`, `V=3`;
  - `while` loop: `e=3`, `n=3`, `V=2`;
  - `while` + nested `if` + another `if`: `e=8`, `n=6`, `V=4`;
  - simplified `while` + `if/else`: `e=7`, `n=6`, `V=3`.
- Usage threshold is not absolute: some argue a function should max at 10, others 8 (p. 18).
- Drawbacks (p. 19): treats non-branching statements as zero complexity; incentivises splitting functions even when that does not improve understandability. Tools may calculate it automatically (p. 20).

### Likely assessment prompts and pitfalls

- Classify complexity as essential or accidental and explain whether it can be removed, managed, or mitigated (pp. 5-7).
- For cyclomatic complexity, draw/count the actual control-flow graph; count **edges and nodes**, not source-code lines (pp. 12-17).
- Loops create a back edge and an exit path; nested conditions add independent paths (pp. 14-17).
- A low number is not proof of readable code, and splitting a function solely to lower the metric can worsen design (p. 19).
- Connect to maintainability: low coupling/high cohesion help manage complexity; KISS/conventions/libraries reduce accidental complexity, while essential domain requirements remain (08.3 pp. 5-10; Maintainability pp. 14-29).

### High-value eventual space candidates

- Essential vs accidental table; coupling vs cohesion; `V(G)=e-n+2`; one tiny CFG example; 8/10 guideline explicitly labelled heuristic; two drawbacks.

## 7. Cross-topic dependency map

- **HTTP/auth/persistence**: registration and login mutate/read user state; persistence determines whether accounts survive restart; authentication tokens travel in HTTP headers; every protected route then performs authorisation (Persistence pp. 10-11; Auth pp. 3-4, 12, 20-24).
- **Exceptions/HTTP**: service-layer exceptions can express invalid input/failure, but an HTTP layer must catch/map them into a controlled response rather than crash the server. The exception deck supplies the `throw`/`catch` pattern; HTTP status mapping likely lives in the HTTP-server/testing decks.
- **Persistence/exceptions**: file read/parse/write can fail at runtime; the LBYL file example checks existence, while EAFP would catch the failed operation (Exceptions pp. 7-10; Persistence p. 11).
- **Requirements/modelling**: use cases capture actor goals and CRUD actions; state diagrams formalise behavioural rules/transitions; class/ER diagrams capture structural/data requirements (Conceptual continued pp. 6-10).
- **Modelling/auth**: login/authentication is explicitly named as an FSM example, and token role/permission claims feed authorisation transitions/guards (Conceptual continued p. 11; Auth pp. 20, 24).
- **Testing/maintainability/refactoring**: tests make changes safer and are strongly recommended before refactoring; exception behaviour must be tested with `.toThrow()`; maintainability decisions should preserve externally tested behaviour (Maintainability pp. 8-10, 28; Exceptions p. 14).
- **Complexity/maintainability**: low coupling/high cohesion appear in both decks; DRY/KISS/YAGNI and standard libraries can reduce accidental complexity, but over-abstracting to satisfy a metric/principle can reduce clarity (Maintainability pp. 12-29; Complexity pp. 5-10, 19).
- **Cyclomatic complexity/testing**: linearly independent paths suggest distinct branch/path tests, linking the metric to coverage. Exact coverage criteria should be cross-checked against the Code Coverage deck rather than inferred here (Complexity pp. 11-17).

## 8. Suggested priority for later sheet allocation (discovery outcome, not layout)

1. **Very high**: auth vs authorisation; hashing vs encryption; secure register/login flow; token integrity/signing; cyclomatic formula and CFG counting; exception/Jest patterns; structural vs behavioural models; low coupling/high cohesion; DRY/KISS/YAGNI/refactoring.
2. **High**: persistence lifecycle; state-machine construction/notation; error-type distinctions; essential vs accidental complexity; UML/ER/use-case notation.
3. **Medium**: exact Node `crypto` syntax, AES example syntax, architecture layer stack, model-purpose list, maintainability motivations.
4. **Low/context only**: guest/reference links, feedback pages, biographical citation details, motivational examples without a reusable principle.

## 9. Slide inconsistencies/oversimplifications to reconcile before finalisation

- Maintainability p. 11 says "6" questions but contains seven.
- Maintainability p. 22 describes related components as tightly coupled; its p. 29 summary and the complexity deck give the safer course target: **low coupling, high cohesion**.
- Exceptions p. 11's prose says the displayed program is not handling its exception, but the displayed code has `try/catch`.
- Conceptual continued p. 11 says an FSM changes "from one state"; intended meaning is between states.
- Auth p. 18's broad "encryption is less secure because reversible" wording should not be repeated; encryption and hashing have different purposes.
- Auth's raw SHA-256 demo is not sufficient real-world password hashing; the later salt note must accompany it if implementation security is discussed.
- Persistence p. 6's in-memory -> file -> database performance ordering is a lecture-level generalisation, not a universal rule.
