# `Example swagger/swagger.yaml` exam-value assessment

This report compares the supplied Unigotchi Swagger file with both 26T2 practice exams and the existing HTTP/Swagger discoveries. It is evidence and retrieval planning only; it does **not** draft the handwritten sheet or answer a practice question.

## Verdict

The file has **high preparation value for semantic contract reading and Practice 1-style API design**, but only **medium value as a syntax exemplar** and **low direct in-exam lookup value unless the same file is present in the supplied course mirror**.

Why:

- It is a real, large Swagger 2.0 contract with path, body, query and header inputs; reusable schemas; auth; error responses; and 26 operations. This fills the lecture gap around YAML anatomy.
- It is closest to **Practice 1 Q31**, whose given contract is also Swagger 2-style with custom reusable sections. It is still useful for the semantic work in Practice 1 Q29 and Practice 2 Q24.
- It cannot supply Express route code, HTTP tests, web-string conversion, backend result narrowing, or coverage workflow.
- It is not a clean gold-standard file. A structural audit found unresolved `$ref`s, incomplete required-field declarations, redundant/inconsistent auth representation, and status/security inconsistencies across designed routes.
- At 1,736 lines, it is too large for aimless lookup. Its value depends on a small operation/component index and distinctive searches.
- The exam briefing says personal files are unavailable. The allowed resource list names slides/tutorial/lab solutions, not the student's project repository. Therefore `Example swagger/swagger.yaml` should be treated as a **preparation example**, not assumed available during the exam.

## What is actually in the file

The YAML parsed successfully as YAML. Its main inventory is:

- Swagger version: `swagger: "2.0"`.
- 22 path items and 26 HTTP operations.
- Methods represented: GET, POST, PUT and DELETE.
- Global header-based `SessionAuth`, with public-operation overrides using `security: []`.
- A custom `x-components` tree containing 98 reusable entries:
  - 27 primitive schemas;
  - 19 group schemas;
  - 8 path parameters;
  - 1 header parameter;
  - 10 body parameters;
  - 33 return schemas.
- Request channels represented: body, path, query and header.
- Response statuses represented: 200, 400, 401 and 403.
- Reusable `$ref` chains from operations to parameters/returns and then to nested object/primitive schemas.
- Prescribed and group-designed route tags, summaries, descriptions, operation IDs, validation constraints and named error cases.

Twenty-four of the 98 reusable entries are not referenced by another part of this file. Some are explicitly described as design support, so unused does not automatically mean wrong, but it materially increases search friction.

## Match against the practice-exam patterns

| Practice-exam pattern | Value of this file | Exact overlap | Difference or missing piece |
|---|---|---|---|
| Practice 1 Q15: Swagger capability boundaries | **High** | It visibly documents endpoints, parameters, response statuses, schemas and header auth location | It does not implement authentication, create tokens, encrypt transport or run routes—useful evidence for rejecting those Swagger overclaims |
| Practice 1 Q29: Swagger-to-Express adapter, 14 marks | **Medium-high semantically; low syntactically** | Path/body/query/header locations, success/error schemas and 200/400/401/403 distinctions | Q29 uses OpenAPI 3 syntax; this is Swagger 2. It contains no Express code, result-to-status switch, number/list parsing, role header, comma-separated query, or tests |
| Practice 1 Q31: extend/design an authenticated REST API, 10 marks | **High; closest match** | Swagger 2 dialect, global session auth, public overrides, resource paths, ownership-style 401/403/400 cases, operation summaries and named error conditions | Q31 accepts concise Markdown rather than YAML. This file has no role model comparable to LIBRARIAN/STUDENT, and several designed routes are not clean REST/auth/status exemplars |
| Practice 2 Q24: read Swagger, implement backend and wrappers, 10 marks | **Medium-high semantically** | Create/list/detail/delete patterns, integer path IDs, optional query parameter, request bodies, schema refs and exact response contracts | Q24's embedded contract uses OpenAPI 3.0.3, whereas this file uses Swagger 2. It also has no optional Boolean query, conjunctive multi-filter search, stable-ID backend logic, Express conversion, result mapping, or HTTP tests. |
| Repeated contract-navigation procedure | **High** | Method -> path -> parameters -> referenced request schema -> responses/errors -> referenced output schema can be rehearsed directly | The file's size and broken refs make raw browsing slower than the small embedded exam contracts |
| Repeated 400/401/403 and auth/authz reasoning | **Medium** | Global session scheme, public overrides, protected resource ownership examples | Status mapping is inconsistent in later designed routes, and one mutating designed route explicitly disables security; do not infer a universal precedence from this file |
| CRUD/HTTP semantics MCQs | **Medium** | GET/POST/PUT/DELETE and success/error classes are present | Several paths are action-oriented (`.../attempt`, `attendSocietyEvents`, `leaveSociety`) and create operations use 200, so it is not a pure REST-convention reference |
| Managing/repairing a Swagger file | **High as a diagnostic exercise** | Reuse, `$ref`, tags, auth, required fields, path placeholders, response schemas and designed-route growth are all visible | It demonstrates maintenance failures as well as good patterns; it must not be copied wholesale |
| Express syntax and input conversion | **None** | None | No `req.body`, `req.query`, `req.params`, headers, parsing or `res.status().json()` |
| Programmatic HTTP testing and c8 coverage | **None** | None | No `sync-request-curl`, Vitest, server process or coverage scripts |
| Core JS/TS, validation implementation, aggregation, theory short answers | **None to negligible** | Domain constraints could inspire test cases | No implementation/test/type/requirements answer pattern |

## Version comparison: the most important syntax caveat

The two practice papers establish that candidates may see more than one Swagger/OpenAPI dialect:

| Concern | This file and Practice 1 Q31 style | Practice 1 Q29 and Practice 2 Q24 OpenAPI 3 style |
|---|---|---|
| Version key | `swagger: "2.0"` | `openapi: 3...` |
| Request body | operation `parameters` referencing an object with `in: body` and `schema` | `requestBody` -> `content` -> media type -> `schema` |
| Reusable material | custom `x-components` tree with local `$ref`s | standard `components`, commonly `components/schemas` |
| Response body | response-level `schema` | response `content` -> media type -> `schema` |
| Media types | not declared here | commonly explicit under `content` |

The semantic extraction remains the same: find the operation, identify every input channel and type, then inspect every status/body schema. Exact YAML should be copied only from the contract currently being edited. This file is **not** a safe syntax template for an OpenAPI 3 question.

Practice 2 Q24 also uses `openapi: 3.0.3` and assesses consuming the contract rather than editing it. Its embedded YAML was supplied separately from the downloaded starter tree, which is itself an exam-navigation warning: inspect the question's displayed contract rather than assuming a `swagger.yaml` must exist beside the starter files.

## Best coherent slices to study

### 1. Friend resource: strongest end-to-end slice

This is the cleanest compact path through schema -> request -> response -> operations:

- `Friend` output entity: lines 190–212.
- reusable `FriendId` path parameter: lines 413–419.
- `FriendAdd` body with property-level `required` plus min/max: lines 543–562.
- `FriendList`, `FriendDetails` and `FriendId` response wrappers: lines 634–656.
- GET/POST collection routes: lines 1361–1427.
- GET/DELETE item routes: lines 1429–1498.

It covers the same semantic steps needed in the practice HTTP questions:

1. select method/path;
2. follow path/header/body refs;
3. follow the response wrapper into the entity schema;
4. distinguish 200/400/401/403;
5. read named validation/state/ownership errors.

It still supplies no Express adapter or web-string conversion. Its create response is 200 because that is this contract; that reinforces the practice-exam rule that the displayed contract outranks a generic expectation of 201.

### 2. Optional query filter

`GET /simulations/{simulationId}/exams` at lines 1078–1114 contains an inline optional query parameter:

- `in: query`;
- `name: courseId`;
- `required: false`;
- `type: string`;
- an invalid-supplied-filter error.

This is the closest local match to Practice 2 Q24 search filtering. It does **not** teach Boolean conversion, multiple conjunctive filters, or the difference between omitted and the string `"false"`.

### 3. Protected versus public operations

- Global `SessionAuth`: lines 23–30.
- Public register/login overrides: lines 839–895.
- Protected get-by-ID with 401/403: lines 954–980.
- Public `/clear` override: lines 984–996.

This is useful for understanding how a Swagger contract documents auth location and operation exceptions. It is not implementation: server code must still validate the session and ownership.

### 4. One operation using path + header + body

`POST /simulations/{simulationId}/actions`, lines 1029–1074, references all three channels and supplies success, input/state, unauthenticated and forbidden response families. It is a good semantic rehearsal for Practice 1 Q29's multi-channel route work.

## Structural integrity findings

These findings make the file valuable for learning what to check when “managing Swagger,” but prevent it from being treated as a pristine template.

### Five missing component definitions, referenced 14 times

The following local targets are referenced but never defined:

```text
#/x-components/group/Action
#/x-components/group/RecommendedAction
#/x-components/group/SocietyOpportunity
#/x-components/group/SocietyEvent
#/x-components/group/LastAttendedEvent
```

They affect both intermediate `group` wrappers and route-facing `return` wrappers, including action listing/recommendation and several society responses. A Swagger preview may therefore show incomplete models or reference errors in those sections. The friend/course/simulation prescribed slices do not depend on these five missing definitions.

### Body-required is not property-required

For `Register` and `Login`, the parameter itself is `required: true`, but the object schema has no `required: [...]` list. As written, Swagger requires a body to exist but does not declare its named properties mandatory, even though the business descriptions plainly expect them.

This is an especially useful exam trap: `required: true` on a body/query/path parameter and `required: [fieldA, fieldB]` inside an object schema express different things.

### Authentication is represented redundantly and inconsistently

- Global `SessionAuth` already declares an API-key header named `session`.
- Most protected operations additionally list a separate reusable `Session` header parameter.
- `PUT /society/attendSocietyEvents` explicitly sets `security: []`, has no session parameter, mutates simulation state, and returns no 401/403. It is therefore a poor auth-design exemplar.

Use the public register/login plus one coherent protected resource operation to study the concept; do not generalise from every designed route.

### Status conventions drift across designed routes

Simulation/friend/course routes generally use:

- 401 for missing/invalid session;
- 403 for nonexistent or non-owned simulation after authentication;
- 400 for operation-specific invalid input/state.

Later society routes sometimes put nonexistent-or-not-owned simulation under 400 and omit 403. Response ordering in YAML also does not define runtime validation precedence. The course's stated precedence—401, then 403, then 400 and the specified internal error order—must come from the question/project contract and implementation, not from visual response ordering here.

### Reuse and schema precision are uneven

- 24 reusable components are unreferenced in this version, including several duplicate-looking `group` wrappers whose route-facing equivalents live under `return`.
- `Error` lacks an explicit `type: object`; its properties combine `type` with `$ref` rather than using a clean reference alone.
- Many entity/return objects omit a `required` list.
- Several format constraints exist only in prose descriptions rather than machine-readable `pattern`, `minimum`, or `maximum` fields.
- `consumes`/`produces` media types are not declared.
- The file mixes resource-oriented paths with action verbs and legacy society routes.

None of this makes the YAML useless. It means every relevant path must be checked against the exam prompt, starter types/backend and tests—the same triangulation lesson exposed by the practice-exam Swagger inconsistencies.

## Search fingerprints and lookup speed

### Verified local path

```text
Example swagger/swagger.yaml
```

### High-signal searches

| Need | Search fingerprint | Destination | Relative speed |
|---|---|---|---|
| Find version/dialect | `swagger: "2.0"` | line 1 | Fast |
| Find global auth | `securityDefinitions:` or `SessionAuth:` | lines 23–30 | Fast |
| Find reusable sections | `x-components:` | line 32 | Fast, but section is over 800 lines |
| Find all operations | `operationId:` | 26 concise hits | Fast overview |
| Strong full resource example | `operationId: addFriend` | lines 1388–1427 | Fast |
| Matching request schema | `FriendAdd:` | lines 543–562 | Fast |
| Matching response wrapper | `FriendDetails:` | lines 643–649 | Fast |
| Optional query example | `required: false` or `operationId: examList` | lines 1078–1114 | Fast; only one `required: false` operation parameter |
| Path + header + body example | `operationId: simulationAction` | lines 1029–1074 | Fast |
| Public security override | `security: []` | register, login, clear and one questionable designed mutation | Fast, but inspect operation context |
| Error status inventory | a specific `operationId`, then its `responses:` | local operation block | Fast if operation is known; broad `responses:` is noisy |
| Diagnose missing models | `RecommendedAction`, `SocietyOpportunity`, `LastAttendedEvent` | references without definitions | Fast proof of unresolved refs |

The best raw-file navigation anchor is `operationId`, not `parameters`, `responses`, `type`, or `$ref`; the latter occur too frequently. Once an operation is found, follow only its three or four referenced components.

### Expected lookup performance

- **Fast:** locating a known operation by `operationId`, then following one named request/return ref.
- **Medium:** reconstructing one route contract from raw YAML because schemas are separated from paths by hundreds of lines.
- **Faster in preview, if refs resolve:** scanning methods/inputs/statuses in Swagger UI. The unresolved society/advisor refs reduce confidence in those rendered models.
- **Slow/unsafe:** browsing all 1,736 lines for a general design idea or copying an entire component hierarchy.
- **Impossible from this file:** recovering Express, HTTP-test or coverage syntax.

## Exam-resource reality

This exact local path is not an allowed exam resource by default. The current resource list provides lecture slides, tutorial solutions and lab solutions, plus Swagger preview—not personal project files. Unless the same Unigotchi contract is included in one of those supplied course locations, its fingerprints are useful during preparation only.

If a course-mirrored copy exists, `operationId: addFriend` and `/simulations/{simulationId}/friends` are the best distinctive locators. If it does not, the actual exam Swagger is already embedded/provided with the HTTP question and should be read directly; opening a different 1,736-line project contract would usually be slower.

## Implications for eventual handwritten allocation

This example resolves the previous evidence gap enough to support these allocation conclusions without composing the sheet:

- A full Swagger file or full YAML grammar would be a poor use of space.
- The stable knowledge is dialect-neutral contract navigation: method/path -> input location/type/requiredness -> success/error status -> response schema -> auth/state effects.
- Swagger 2 versus OpenAPI 3 variation needs a compact warning because exact keys differ materially.
- `required` at parameter level versus object-property level is worth retaining as a conceptual trap.
- A small `$ref`/request/response anchor may be useful only if no clean tutorial/lab exemplar is guaranteed inside the exam.
- Contract consistency checks remain higher value than project-specific schemas: refs resolve, path placeholders match, required fields are explicit, auth is not bypassed, statuses/body schemas agree with server/tests, and designed routes follow the stated error precedence.
- None of this file's Unigotchi names, activity values, formulas, error codes or 26 operation paths deserve handwritten space.

Overall ranking:

1. **High:** preparation for Practice 1 Q31/API-design reasoning and general Swagger contract navigation.
2. **Medium-high:** semantic support for Practice 1 Q29 and Practice 2 Q24 route extraction.
3. **Medium:** learning Swagger maintenance by auditing real drift and broken refs.
4. **Low:** exact authoring syntax across versions, because this is only Swagger 2 and is internally incomplete.
5. **None:** Express implementation, programmatic HTTP tests, c8 coverage, backend algorithms and non-HTTP theory.

## Remaining best evidence

The missing ideal exemplar is still a **small, internally valid course lab/tutorial bundle** containing:

- its `swagger.yaml`;
- matching `server.ts`;
- matching `sync-request-curl` tests;
- package scripts, including separate-server c8 if available.

That bundle would connect contract syntax to executable behaviour. This Unigotchi file supplies the contract side only.
