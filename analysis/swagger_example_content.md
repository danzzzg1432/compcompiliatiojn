# Swagger example: content and reliability analysis

This is discovery material, not a cheatsheet. The supplied `Example swagger/` folder contains exactly one file, `swagger.yaml`; it contains no server, tests, package manifest, scripts, or CI configuration. Consequently, the report can analyse the API contract but cannot verify that any route is wired to Express, implemented, tested, or runnable.

## What this file is

- It declares **Swagger/OpenAPI 2.0**, not OpenAPI 3 (`swagger: "2.0"`), with API metadata and an HTTP scheme (`swagger.yaml:1-15`). Do not transplant OpenAPI 3 keywords such as `components`, `requestBody`, or `content` into this style.
- The file is a large Iteration 2 project contract: its own description distinguishes prescribed routes from group-designed routes and warns that reusable schemas do not imply prescribed routes (`swagger.yaml:3-8`). It contains 22 paths and 26 operations: five tagged prescribed core and 21 tagged designed.
- Authentication is globally declared as an API key named `session` in the request header (`swagger.yaml:23-30`). Public operations opt out locally with `security: []`, for example register/login (`swagger.yaml:839-875`) and clear (`swagger.yaml:984-996`).

## Structure and exact reusable patterns

### 1. Reusable definitions

Rather than standard Swagger 2 `definitions` and `parameters`, this course file stores reusable material under the vendor-extension key `x-components` (`swagger.yaml:32-33`). It partitions definitions into:

- `prim`: scalar types, examples, enum values, bounds, and descriptions (`swagger.yaml:34-145`);
- `group`: object schemas composed from scalars and other groups (`swagger.yaml:146-401`);
- `path`: reusable path-parameter declarations with `in: path`, matching `name`, `required: true`, and primitive `type` (`swagger.yaml:402-444`);
- `header`: a reusable required `session` header (`swagger.yaml:445-450`);
- `body`: reusable body parameters whose `schema` contains object properties (`swagger.yaml:452-598`);
- `return`: reusable response envelope schemas (`swagger.yaml:599-834`).

Internal reuse uses JSON Pointer `$ref`, e.g. `#/x-components/prim/SimulationId` inside an object (`swagger.yaml:166-175`), `#/x-components/path/SimulationId` in an operation (`swagger.yaml:954-964`), and `#/x-components/return/SimulationStatus` for a response (`swagger.yaml:965-968`). Arrays use `type: array` plus `items: {$ref: ...}`, illustrated by simulation listings (`swagger.yaml:625-631`).

Important Swagger 2 distinction: non-body parameters put `type` directly beside `in`/`name` (`swagger.yaml:403-450`), while a body parameter places the type beneath `schema` (`swagger.yaml:452-467`). This is one of the most reusable authoring patterns in the example.

### 2. Operation anatomy

A representative protected endpoint contains:

1. a path under `paths` and HTTP verb;
2. unique `operationId`, summary, description, and tag;
3. path/header/body parameter references;
4. per-status response descriptions and response-schema references.

`POST /simulations/{simulationId}/actions` demonstrates all three common input locations and 200/400/401/403 responses (`swagger.yaml:1029-1074`). `GET /simulations/{simulationId}/exams` adds an optional inline query parameter (`swagger.yaml:1078-1114`). Multiple verbs may share one path: `GET` and `POST` share `/simulations/{simulationId}/friends` (`swagger.yaml:1361-1427`), and `GET`/`DELETE` share the item path (`swagger.yaml:1429-1498`).

Every `{placeholder}` in the supplied paths has a matching path parameter, and all 26 `operationId` values are unique. These are useful consistency checks before previewing a Swagger file.

### 3. Schemas and request bodies

- Required body fields belong in the schema's `required` array, separately from `properties`; `SimulationAction` requires `action` and `duration` while leaving `targetId` conditional/optional (`swagger.yaml:526-542`).
- Constraints are expressed declaratively: `minimum`/`maximum` on support level (`swagger.yaml:543-562`), enum values (`swagger.yaml:76-97`), and a strictly positive number via `minimum: 0` plus `exclusiveMinimum: true` (`swagger.yaml:578-598`).
- Responses commonly use an envelope object rather than returning a naked value: `{session}`, `{simulationId}`, `{friends}`, or `{error, message}` (`swagger.yaml:599-656`). An empty successful result is explicitly `type: object` (`swagger.yaml:613-614`).
- Rich descriptions add behavioural constraints that schemas alone cannot encode, such as conditional `targetId` requirements (`swagger.yaml:540-542`) and case-sensitive duplicate-name rules (`swagger.yaml:553-562`).

### 4. Security and status conventions

The dominant protected-resource pattern is:

- `401 UNAUTHORISED`: missing/invalid session;
- `403 INVALID_SIMULATION`: authenticated caller lacks ownership, or the resource is deliberately concealed together with nonexistence;
- `400`: domain/input/state failure;
- `200`: successful response, including creation and deletion in this particular contract.

This is visible cleanly on simulation lookup (`swagger.yaml:954-980`) and friend creation (`swagger.yaml:1388-1427`). It is a **course/project contract**, not a universal HTTP rule: this example uses 200 rather than 201/204 and sometimes combines nonexistent and unowned resources under 403. The exam's supplied Swagger always outranks this example.

Public routes must override the global security requirement. Register and login correctly do so (`swagger.yaml:839-894`). `/society/attendSocietyEvents` also opts out and embeds `simulationId` in its body (`swagger.yaml:1265-1292`), unlike the otherwise consistent protected simulation routes; this is an example-specific design choice and a likely security/design smell, not a pattern to copy blindly.

## Contract-management lessons

- Treat Swagger as the single interface contract connecting method/path, input locations, response shape, error type, and status. A route wrapper and its HTTP tests should be derived from the same operation block.
- Keep repeated primitives, parameters, request bodies, and response envelopes in reusable definitions; use `$ref` so one contract change propagates.
- Put constraints both in machine-readable schema fields and, where not expressible, precise descriptions.
- Use tags to distinguish prescribed and designed functionality (`swagger.yaml:17-21`), and give every operation a stable unique `operationId`.
- For maintenance, validate every `$ref`, preview the rendered document, and compare Swagger with server/tests. A YAML parser accepting the file is not enough.

## Concrete errors and inconsistencies

This file is useful but **not a clean authoritative template**.

1. **Five referenced schemas do not exist:** `Action`, `RecommendedAction`, `SocietyOpportunity`, `SocietyEvent`, and `LastAttendedEvent`. The broken references originate in group/return schemas at `swagger.yaml:348-400` and `swagger.yaml:771-834`. Routes depending on them include actions (`swagger.yaml:1002-1016`), recommendations (`swagger.yaml:1502-1519`), and society results (`swagger.yaml:1541-1716`). A plain YAML parse succeeds despite these semantic failures.
2. **`Error` lacks `type: object` and combines sibling `type` with `$ref` on each property** (`swagger.yaml:605-612`). Referenced scalar schemas already specify type; tools may ignore `$ref` siblings. Prefer a clean object schema whose properties are only `$ref` values.
3. **Many object schemas omit `required`.** Register/Login request properties are not marked required (`swagger.yaml:453-478`), while later bodies correctly use schema-level `required` (`swagger.yaml:503-562`). Similarly, many return models permit absent fields even when the narrative expects them; friend models are a notable stricter exception (`swagger.yaml:190-213`, `swagger.yaml:634-656`).
4. **Duplicate/unused definitions indicate drift.** `ActionList`, `RecommendationResult`, `SocietyList`, `SocietyEventDetails`, `SocietyEventList`, `SocietyId`, and `LastAttendedEventResult` appear both under `group` and `return` (`swagger.yaml:348-400`, `swagger.yaml:771-834`). Numerous older bodies and response models are never reached from a route, including `SimulationCreate` versus the actually used `SimulationCreateV1` (`swagger.yaml:503-525`, `swagger.yaml:898-914`).
5. **Naming/shape mismatch:** `CurrentExamAttempt` has singular conceptual results but fields named `exams` and `courses`; `exams` is one `ExamState`, not an array (`swagger.yaml:740-749`).
6. **Error-name drift:** `simulationAction` describes `actionName` although the request property is `action` (`swagger.yaml:526-542`, `swagger.yaml:1047-1052`). The file alternates `INVALID_EXAM` and `INVALID_EXAM_ID` across related endpoints (`swagger.yaml:1132-1137`, `swagger.yaml:1167-1177`, `swagger.yaml:1207-1212`).
7. **Ordering/style inconsistency:** `/simulations` declares 401 before 400 (`swagger.yaml:910-933`), unlike most operations. Some designed society APIs use RPC-like paths and body-bearing `DELETE` (`swagger.yaml:1541-1697`) while other APIs use resource-oriented path parameters. Both may work, but inconsistency increases wiring/test mistakes.
8. **Potential security inconsistency:** `/society/attendSocietyEvents` explicitly disables security and has no session input (`swagger.yaml:1265-1292`) despite mutating simulation-owned state; most comparable mutations require the session header and distinguish 401/403 (`swagger.yaml:1388-1427`).

## What it does not teach or prove

- There is no Express/Node server in the folder, so it does not show `req.params`, `req.query`, `req.body`, or `req.headers` extraction; status/error mapping in code; Swagger UI wiring; or whether `operationId` names match backend functions.
- There are no tests, so it does not demonstrate `sync-request-curl`, response parsing, setup/clear patterns, auth headers, boundary testing, or contract tests.
- There is no `package.json`, so it provides no install/run/test/lint/coverage scripts or library/version evidence; there is no CI file either.
- It does not demonstrate OpenAPI 3 syntax, JSON-schema validation at runtime, generated clients, or automatic enforcement. Swagger documents behaviour; Express still needs explicit implementation/validation unless middleware is added.
- It cannot establish error precedence. Listing several failures under a status says which failures exist, but generally not which wins when multiple conditions are simultaneously true.

## Exam-context judgment

The high-value knowledge here is the **shape of a Swagger 2 contract** and the mapping discipline: verb/path -> input locations -> backend call -> status/body, plus reusable `$ref` schemas. The 1,736-line domain model, exact route names, and project-specific 200/400/401/403 choices should not be memorised. Because this file contains unresolved references and drift, it should be used as a structural example only; the exam's own Swagger and starter code are the authority.
