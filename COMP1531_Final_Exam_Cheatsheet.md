# COMP1531 26T2 — FINAL EXAM CHEATSHEET

> **Capacity estimate — do not hand-copy:** With 5–7 mm margins, two columns per side and 75–85 small lines per column, one double-sided A4 holds about **2,100–2,600 legible word-equivalents**. Code/tables take extra area, so aim near **2,400**; above 2,800 becomes tiny and slow. Leave correction space.

---

# SIDE A / FRONT — PRACTICAL: JS • TS • HTTP • TESTING

## A0. First 60 seconds of every practical question

1. Circle **collected files**; other edits may vanish. Preserve required names, exports, prototypes, parameters, and architecture.
2. Read **prompt → current Swagger → types/backend → visible tests → `package.json`**. Public tests are partial examples.
3. Extract exact shapes, names, precedence/messages, boundaries, order, statuses, and state effects. Expect empty/singleton/duplicates, omitted versus falsy, exact limits, delete/re-add, and simultaneous errors.
4. Current question/config wins: inspected tests use **Vitest** despite Jest docs; starters use Express 5 despite an Express 4 PDF.
5. Run **tests ≠ `tsc --noEmit` ≠ lint ≠ coverage**; save.

## A1. JavaScript / data patterns

`const` = no reassignment; `let` = reassign. `for...of` values; `for...in` keys/indexes. Computed key: `o[k]`. Functions are values/HOFs accept or return them. Arrow braces need `return`.

`+` with a string may concatenate (`1 + '2' === '12'`); convert explicitly when arithmetic is intended.

Choose: `map` transform; `filter` select; `find` first/`undefined`; `some` any; `every` all; `reduce(..., initial)` aggregate. `slice` does not mutate; `sort/reverse/splice/push` do. Numeric sort `(a,b)=>a-b`. Copy `{...o}`/`[...a]`. `===` compares object references; tests use structural equality. Use `??`, not `||`, when falsy values are valid.

```js
// first-array difference; preserves a's order
a.filter(x => !b.includes(x))

// chunks, including partial final chunk
const out = [];
for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n));

// copy object while omitting dynamic keys
Object.fromEntries(Object.entries(o).filter(([k]) => !omit.includes(k)))

// words / reverse / frequency map
s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
[...s].reverse().join('')
const freq = {};
for (const c of s.toLowerCase()) freq[c] = (freq[c] ?? 0) + 1;

// second largest value occurring exactly once
const counts = {};
for (const n of nums) counts[n] = (counts[n] ?? 0) + 1;
const once = nums.filter(n => counts[n] === 1).sort((a, b) => b - a);
return once[1]; // undefined if <2 candidates
```

**Aggregation recipe:** initialise the complete output, including zero groups → skip ineligible records first → derive exact group key/casing → add every stated nested/conditional/lookup component once → preserve order.

```ts
type Item = 'A' | 'B';
const price: Record<Item, number> = { A: 50, B: 20 };
const totals = { standard: 0, gold: 0, vip: 0 };
for (const r of records) {
  if (!r.confirmed) continue;
  const k = r.tier.toLowerCase() as keyof typeof totals;
  totals[k] += r.items.reduce((sum, x) => sum + price[x], 0);
}
```

Check filter, grouping owner/key, zero groups, every component, and order. Stable IDs need monotonic `nextId++`; `array.length` reuses after deletion. “Unique” may mean **occurs exactly once**, not merely deduplicated. Named ESM uses braces; default import does not; use `import/export` when configured.

## A2. TypeScript • validation • exceptions

```ts
interface Input { name?: string; hours?: number; active?: boolean }
type Group = 'A' | 'B';                 // literal union
const xs: Input[] = [];
type OK = { id: number };
type Fail = { error: string; message: string };
type Result = OK | Fail;

const x: Input | undefined = xs.find(v => v.name === name);
if (x === undefined) return { error: 'NOT_FOUND', message: '...' };
if ('error' in result) return result;    // narrows union
```

Optional `p?: T` = `T | undefined`; **missing ≠ falsy**. Check `=== undefined`/presence, not `!p`, unless falsiness is invalid. Narrow before access. Avoid `any`/suppressions. `tsx` runs; `tsc --noEmit` checks; ESLint checks style/some bugs—not correctness.

**Validation order is behaviour:** required fields first if specified; sort names only if required; then ordered guards, exact boundaries, anchored regex `^...$`. Never invent rules. Preserve text, punctuation, interpolation, property names, and winning error.

```ts
const required: (keyof Input)[] = ['name', 'hours'];
const missing = required.filter(k => input[k] === undefined).sort();
if (missing.length) throw new Error(`Missing: ${missing.join(', ')}`);
if (input.hours! < MIN || input.hours! > MAX) throw new Error('EXACT text');
if (!/^Z[A-Z0-9]{5}$/.test(input.name!)) throw new Error('EXACT text');

try { validate(v); return { approved: true, reason: '' }; }
catch (e) {
  const reason = e instanceof Error ? e.message : String(e); // catch is unknown
  return { approved: false, reason };
}

expect(() => validate(v)).toThrow(/^EXACT text$/); // callback + anchored exact text
```

Throwing and returning `{error,...}` are different contracts. **EAFP** tries/catches; **LBYL** checks first. Compile-time: before run; runtime: during execution; logic: runs but wrong result.

## A3. Swagger/OpenAPI → thin Express route

Extract: **METHOD+PATH | inputs/type/conversion | backend call | success status/body | errors + security/precedence/side effect**. Follow `$ref`; check parameter requiredness **and** object `required: [fields]`. Swagger documents, not implements.

- Swagger 2: `swagger`, `parameters`, `in: body`, response `schema`, `definitions`/course `x-components`.
- OpenAPI 3: `openapi`, `requestBody`, `content`, `components.schemas`.
- Contract may specify 200, not 201. Check global security/local `security: []`. Preview `Shift+Alt+P`; rendering does not prove consistency.

Input map: JSON → `req.body`; `/items/:id` → `req.params.id`; `?filter=` → `req.query.filter`; token/role → header. Use `app.use(express.json())`. Path/query/header arrive as web strings; convert deliberately:

```ts
const id = Number(req.params.id);
const limit = req.query.limit === undefined ? undefined : Number(req.query.limit);
const tied = req.query.tied === undefined ? undefined : req.query.tied === 'true';
const ids = String(req.query.ids).split(',').map(s => Number(s.trim()));
const { name, price } = req.body;
```

`Boolean('false')===true`; parse explicitly. Validate `NaN` if required. Optional filters usually AND: `(q===undefined || matches(q)) && ...`.

```ts
app.put('/items/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const role = req.header('role');
  if (role === undefined) return res.status(403).json({ error: 'INVALID_ROLE', message: '...' }); // contract-specific
  const result = update(id, role, req.body.price); // use supplied signature/order
  if ('error' in result) {
    const status = result.error === 'INVALID_ROLE' || result.error === 'FORBIDDEN' ? 403 : 400;
    return res.status(status).json(result);
  }
  return res.status(200).json(result);
});
```

Thin wrapper: extract/convert → backend once → discriminate → exact status/body. Do not duplicate/reorder rules. Return after send; routes precede terminal 404. Defaults: 400 bad input; 401 invalid/missing auth; 403 authenticated but forbidden; 404 absent; 500 unexpected—**Swagger overrides**. Trust validated session, not client identity/role.

CRUD: POST create, GET read, PUT update, DELETE remove. REST: resource URLs + methods + JSON + stateless requests: each request carries handling context; resources may persist. API design: resource/method/path; inputs; auth/ownership; success shape/mutation; invariants; invalid operations/statuses; conventions.

Swagger audit: paths/placeholders, `$ref`s, required fields, schema/status/body versus code/tests, intentional security, no drift.

## A4. Vitest • HTTP tests • coverage

```ts
import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
beforeEach(() => clear()); // HTTP suite: clear() must call DELETE /clear, not backend
expect(actual).toBe(true);                    // primitive
expect(actual).toStrictEqual({ id: expect.any(Number) }); // structure
expect(() => fn(bad)).toThrow(/^EXACT$/);       // plain string matches substring

const res = request('POST', URL + '/items/3', {
  qs: { filter: 'x' }, headers: { session }, json: { price: 20 },
});
expect(res.statusCode).toBe(200);
expect(res.getJSON()).toStrictEqual(expected);
```

Black-box partitions: success; each error/precedence; below/exact/above; empty/single/many; omitted/true/false; duplicates/order; before/after; delete/re-add. Assert **status + exact body + side effect**; reset state.

Coverage: statements executed; branches outcomes/edges; functions invoked; lines executed. Feature coverage judges requirements. **100% ≠ correctness/good assertions/no bugs.** Inspect missed branches.

Coverage inputs: every early return; T/F decision; each short-circuit operand; predicate T/F; exact/either side of comparisons; every outcome. One-call/test: store once, then assert.

- Imported unit code: run supplied Vitest coverage script.
- Separate Express server: terminal 1 `npm run start-coverage` (server under `c8`) → terminal 2 run HTTP tests → reuse unit input matrix through HTTP → stop server cleanly with Ctrl+C so `c8` emits report. Ordinary Vitest coverage of client tests cannot see another process; calling backend directly does not cover the route.

---

# SIDE B / BACK — THEORY: REQUIREMENTS • PROCESS • DESIGN

## B0. Short-answer scoring frame

Write for the marks, not an essay: **name/classify → cite scenario evidence → explain consequence/trade-off → propose a concrete matched change if asked**. “Compare” needs both sides. Avoid absolute claims: tools detect/reduce risk; they rarely “guarantee,” “eliminate,” or prove correctness.

## B1. Requirements • AC • verification/validation

**Functional (F)** = observable capability/**what**. **Non-functional (NF)** = measurable quality/constraint/how well (performance, availability, capacity, usability, security, legal). “User can transfer” = F; “responds within 2 s” = NF. A role/access restriction may be F observable behaviour. Always justify.

Good requirement = system + **shall/may** + positive, specific, measurable, testable result; **WHAT, not HOW**. RE: **elicit** (interviews/workshops/observation) → **analyse** conflicts/dependencies/risks → **specify** agreed F/NF → **validate** with stakeholders. Iterate; negotiate/prioritise conflicts.

User story: **As a [role], I want [goal], so that [reason].** INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable. Use case = black-box actor goal/dialogue: main success flow + failures/handling. AC = observable conditions for accepting story, written before implementation. Scenario: **Given** role/precondition/state, **When** action, **Then** observable expected result. Use separate scenarios for meaningful allowed/prohibited, actor, or visibility branches.

**Verification** = build it right: artefact conforms to requirement/design/spec. **Validation** = build the right thing: suitability for stakeholder need/intended use. Stakeholder requirements reviews, prototypes, and UAT validate; code/design reviews against specs may verify. **UAT** = authorised users/customers black-box test needs/business processes/AC, then accept/reject.

Static: no execution (TypeScript/compiler/linter); catches some type/syntax/control/style issues, not total correctness. Dynamic: executes with data. Unit = isolated; integration = components together; system = whole; acceptance = user/business need. Black-box uses contract; white-box uses implementation/control flow. Testing shows presence, not absence, of bugs.

## B2. Complexity • maintainability • modelling

**Essential complexity** = inherent domain behaviour; remove only by changing requirements, otherwise manage. **Accidental** = implementation/environment (bespoke parser, duplication, needless abstraction); mitigate with libraries/standards/redesign.

Cyclomatic complexity = linearly independent control-flow paths. For one connected function: **`V(G)=e−n+2 = decisions+1`**. Safest: draw CFG/count edges and nodes. Count `if`, each `else if`, loops, and actual switch branches per the question/tool; plain `else`, return/log/ordinary line add 0. Do not automatically add `default`. For compound conditions follow drawn CFG/question convention. Fewer lines/early returns do not necessarily reduce V; table-driven code can lower syntactic metric while domain cases remain. Splitting merely to game score may hurt readability; 8/10 limits are heuristics.

Maintainable = easy to understand/change/test. **High cohesion**: one responsibility/reason to change. **Low coupling**: few cross-module dependencies. Split mixed responsibilities while preserving behaviour. **Refactoring** changes internals, not observable behaviour; protect with tests.

- **DRY:** one authoritative representation of knowledge, not “remove every repeated line.”
- **KISS:** simplest clear suitable solution; prefer familiar language/library features over clever wrappers.
- **YAGNI:** do not build speculative capability. Avoid under-design and costly over-abstraction; follow conventions.
- Diagnostic: “What different reasons could this module change?”

Model = simplified representation. **Structural:** UML class (attributes/methods/relationships) and ER (entities, PK/FK, cardinality). **Behavioural:** FSM/state and use-case. FSM = finite stable states + events/actions + valid directed transitions/guards. Actors are external roles; use cases are their goals/actions.

## B3. SDLC • Agile • CI/CD • deployment

SDLC: **requirements → design → development → testing → deployment → maintenance/feedback**. Revisit upstream phases when later evidence reveals bad assumptions. Failure answer: evidence → relevant phase/cause → matched improvement. Requirements: missing operational constraint; design: environment/config approach; development: build/package config; testing: production-like staging/CI; deployment: automate complete artefact; maintenance: monitor/feedback. Do not answer only “test more.”

Waterfall = largely sequential/fixed requirements/one large release/testing and feedback later; suits stable scope. Agile = philosophy of small working increments, continuous testing/customer feedback and adaptation—not “no planning/docs” or merely faster. Values: **individuals/interactions > processes/tools; working software > comprehensive documentation; customer collaboration > contract negotiation; responding to change > following plan** (right side still valued). Scrum/Kanban/XP are frameworks. Loop: need → story+AC → small change → tests/CI/review → release → feedback → refine.

**CI** = frequently integrate and automatically build/typecheck/lint/test pushed changes. `.gitlab-ci.yml`: image, stages, job → stage + script. Pipeline = configured jobs/result; runner = machine executing it. Main must remain green; passing CI does not prove correctness. **Continuous delivery** = automated release-ready path with human production sign-off/button. **Continuous deployment** = every passing change automatically reaches production. Environments: dev → production-like staging → prod; increasing stability. Monitor 4xx/5xx, uptime, CPU/memory/disk/network; alerts feed maintenance.

Deployment diagnosis: manual laptop→prod copy causes dependency/version/config/environment drift or missing artefacts. Commit manifest+lock; automate clean build/test/deploy; test in production-like staging; deploy the same reproducible artefact with deliberate environment configuration.

## B4. Git • npm • teamwork

Working directory **--`add`→ staging --`commit`→ local repo --`push`→ remote**; `pull` brings remote changes into current branch and may conflict. Pull/`reset --hard` can rewrite working files; add/commit normally do not. Commit is local; push publishes. Branch = movable commit pointer. `git merge X` merges **X into currently checked-out branch**.

Feature branch + MR benefits: isolates incomplete work; diff/discussion/review; CI/approval gate protects stable main; traceability/knowledge sharing. Costs: long-lived drift/merge conflicts; review delay/overhead; branch complexity. Keep changes small/short; regularly integrate main; merge only reviewed green MRs. Direct-to-main is quicker but removes isolation/review gate.

`package.json` = metadata, scripts, dependency ranges; commit. `package-lock.json` = exact resolved dependency graph/reproducible install; commit. `node_modules` = generated; do not commit. `npm init` creates manifest; `npm install` adds/restores; `npm run x` runs script. Dependency is runtime; devDependency is build/test/lint tooling.

Team: board tracks task/status/assignee; stand-up = done/next/blockers; done means tested/reviewed/merge-ready. Review/pairing share knowledge and catch defects; CI does not replace review.

## B5. Auth • security • persistence • TypeScript trade-off

**Authentication** = who? **Authorisation** = may this identity perform action/own resource? Authenticate first; authorise every protected operation. Defaults: **401** missing/invalid session; **403** valid identity but insufficient permission; **400** malformed/domain input; **404** absent resource. Common project precedence is 401 → 403 → 400, but use prompt/backend/current contract; **Swagger response order proves no precedence**.

Never store plaintext passwords or put passwords/tokens in URLs. Hash is deterministic for identical input; random salt changes password input, so identical passwords store differently. Register: hash/KDF(password,salt) → store hash+salt; login recomputes with stored salt. **Hashing** = one-way verification; **encryption** = reversible confidentiality with key. Base64 = encoding, not encryption/integrity. Trust token claims only after signature/HMAC + expiry validation. Send auth in contract header (`session` or `Authorization: Bearer ...`); still authorise each operation.

Security: disclosure leaks secrets/PII; traversal escapes intended path; SSRF makes server fetch attacker URL; command injection reaches shell. Use allowlists, normalisation, trusted APIs, least privilege; never commit secrets.

**Persistence** = state outlives process; belongs in data layer. In-memory is lost on restart. JSON lifecycle: startup **read → parse → state**; after successful mutation **state → stringify → write**; clear/reset must also write cleared state. `JSON.stringify` alone is not persistence. Benefits survival/recovery; file I/O/coordination/scaling are costs; one local file is not a multi-instance database.

TypeScript: + earlier errors, clearer contracts/tooling, safer refactors; − migration/annotation/learning cost; cannot eliminate runtime/logic errors. Small volatile prototype may favour speed; collaborative long-lived code benefits more. `any` bypasses safety.

## Final 20-second trap scan

Only collected files? Exact names/shapes/order/messages? Missing versus falsy? Correct validation precedence? Converted web strings, especially `'false'`? Correct body/query/path/header? Backend error mapped away from 200? 401 vs 403? Session-derived identity? Routes above 404? Stable IDs after delete? Zero groups/all aggregation terms? Every short-circuit branch? Correct `c8` process? Swagger dialect/security/required fields/refs? Current contract rather than generic convention? Short answer cites scenario evidence?
