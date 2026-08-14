# Proposed Side A — Practical coding and testing

## First 60 seconds of every coding question

1. Circle **files collected/marked**; edits elsewhere may be discarded. Do not change required names, parameters, exports, backend logic, or supplied tests unless permitted.
2. Read: prompt → starter types/JSDoc → Swagger → tests → `package.json`. Tests are examples, not the whole specification; reconcile conflicts using explicit wording and executable evidence.
3. Record exact inputs, outputs, precedence, messages, order, boundaries, state changes, and statuses. Expect empty/singleton/duplicates, omitted/falsy optionals, exact limits, repeated deletion, and simultaneous errors.
4. Use the question's imports/scripts as authority: files use **Vitest** even though Jest docs may be supplied; starter packages use Express 5 although the supplied PDF is Express 4.
5. Run every relevant check: tests ≠ `tsc --noEmit` ≠ lint ≠ coverage. Green public tests do not prove the contract.

## JavaScript transformations (compose; preserve order unless told otherwise)

```js
// first-array difference
a.filter(x => !b.includes(x))

// chunks, including final partial chunk
const out = [];
for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n));

// copy object while omitting dynamic keys
Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))

// words / reverse
s.split(' ').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
[...s].reverse().join('')

// frequency map (computed key requires brackets)
const count = {};
for (const c of s.toLowerCase()) count[c] = (count[c] ?? 0) + 1;

// “second largest unique” may mean occurs exactly once: read examples!
const freq = {};
for (const n of nums) freq[n] = (freq[n] ?? 0) + 1;
const uniqueOnce = nums.filter(n => freq[n] === 1).sort((a, b) => b - a);
return uniqueOnce[1]; // undefined if fewer than 2
```

Choose intentionally: `map` transform, `filter` keep, `find` first/`undefined`, `some` any, `every` all, `reduce` accumulate. `slice` is non-mutating; `splice`/`sort`/`reverse`/`push` mutate. Numeric sort needs `(a,b)=>a-b`. Objects/arrays compare by reference; copy with `{...o}`/`[...a]`. Use `??`, not `||`, when falsy values are valid.

**Structured aggregation:** initialise the complete return shape (including zero groups), skip ineligible records first, derive the exact group key, then add every contract component once.

```ts
type Item = 'A' | 'B';
const totals = { standard: 0, gold: 0, vip: 0 };
const price: Record<Item, number> = { A: 50, B: 20 }; // every literal
for (const r of records) {
  if (!r.confirmed) continue;
  const k = r.tier.toLowerCase() as keyof typeof totals;
  totals[k] += r.items.reduce((n, x) => n + price[x], 0);
}
```

Check filter, grouping owner/key casing, every nested/conditional/lookup component, zero groups, and order. Stable IDs need monotonic `nextId++`; `array.length` reuses IDs after deletion.

## TypeScript: minimum high-yield shapes

```ts
interface Product { productId: number; name: string; inStock: boolean }
interface Input { name: string; age?: number }
type Success = { productId: number };
type Failure = { error: string; message: string };
type Result = Success | Failure;
const items: Product[] = [];

const GROUPS = ['A', 'B'] as const;
type Group = typeof GROUPS[number];          // 'A' | 'B'

const p: Product | undefined = items.find(x => x.productId === id);
if (p === undefined) return { error: 'INVALID_ID', message: '...' };
if ('error' in result) return result;         // narrow a result union
```

Optional means `T | undefined`: check `=== undefined`, not truthiness, and narrow before access. Avoid `any`, `@ts-ignore`, and lint suppressions. Type every required parameter/return. Catch values are `unknown`:

```ts
try { validate(x); return { approved: true, reason: '' }; }
catch (e) {
  const reason = e instanceof Error ? e.message : String(e);
  return { approved: false, reason };
}
```

## Validation and exceptions: contract order is behaviour

Write ordered guard clauses in the stated precedence. Detect missing by `=== undefined`, not falsiness. Sort only if the required message says alphabetical. Anchor whole-string regexes (`^...$`). Test both exact boundary and just outside it.

```ts
const required = ['age', 'income'] as const;
const missing = required.filter(k => x[k] === undefined).sort();
if (missing.length) throw new Error(`Missing: ${missing.join(', ')}`);
if (x.age! < MIN || x.age! > MAX) throw new Error('EXACT message');
if (!/^\d{8}$/.test(x.id)) throw new Error(`Invalid '${x.id}'`);
return 'EXACT success string';

expect(() => validate(x)).toThrow('EXACT message'); // pass a callback
```

Never invent a rule omitted by the contract. Preserve punctuation, capitalisation, interpolation, output property names, and which error wins when several inputs are invalid.

## Swagger/OpenAPI → Express: five-column extraction

For each operation write: **METHOD + PATH | input location/type | backend call | success status/body | each error status/body/security**. Follow `$ref`s. Check `required` at both parameter/body and object-property levels. Swagger documents a contract; it does not implement auth, validation, encryption, or routes.

Swagger 2 often uses `parameters`, `in: body`, response `schema`, `definitions`/course `x-components`; OpenAPI 3 uses `requestBody`, `content`, `components.schemas`. Read semantics, not memorised YAML. Contract beats convention: do not “correct” specified 200 to 201.

Input map: JSON → `req.body`; `/x/:id` → `req.params.id`; `?x=` → `req.query.x`; auth/role → `req.headers...`. Path/query/header values are web strings. Convert deliberately:

```ts
const id = Number(req.params.id);
const limit = req.query.limit === undefined ? undefined : Number(req.query.limit);
const tied = req.query.tied === undefined ? undefined : req.query.tied === 'true';
const ids = String(req.query.ids).split(',').map(s => Number(s.trim()));
const { name, price } = req.body;
```

Never use `Boolean(req.query.tied)`: `Boolean('false') === true`. Validate `NaN`/invalid text if the contract requires it. Multiple optional filters normally combine with AND:

```ts
rows.filter(r =>
  (country === undefined || r.team1 === country || r.team2 === country) &&
  (group === undefined || r.group === group) &&
  (tied === undefined || (r.a === r.b) === tied)
);
```

Thin route skeleton (business rules stay in backend):

```ts
app.put('/item/:id', (req: Request, res: Response) => {
  const role = req.header('role'); // string | undefined; handle as contract says
  const result = update(Number(req.params.id), role, req.body.price);
  if ('error' in result) {
    const status = result.error === 'UNAUTHENTICATED' ? 401
      : result.error === 'FORBIDDEN' ? 403 : 400;
    return res.status(status).json(result);
  }
  return res.status(200).json(result);
});
```

401 = missing/invalid authentication; 403 = authenticated but forbidden; 400 = invalid request; 404 = absent route/resource **when specified**. Return after sending; put routes above terminal 404. Map backend errors—do not duplicate/reorder validation.

Swagger maintenance audit: method/path agree everywhere; every `{id}` is declared; request/response schema and status match code/tests; `$ref`s resolve; required properties are listed; global/local security is intentional; delete unused/drifting definitions. Preview: `Shift+Alt+P`.

## Vitest, HTTP tests, and coverage

```ts
import { describe, test, expect, beforeEach } from 'vitest';
beforeEach(() => clear());
expect(actual).toStrictEqual({ id: expect.any(Number) }); // exact structure
expect(actual).toBe(true);                               // primitive
test.each(cases)('$name', ({ input, expected }) => { /* one call */ });

const res = request('POST', URL + '/item/3', {
  qs: { filter: 'x' }, headers: { session: token }, json: { price: 20 },
});
const status = res.statusCode;
const body = res.getJSON();
expect(status).toBe(200);
expect(body).toStrictEqual(expected);
```

Black-box partitions: success; each error/precedence; below/exact/above boundary; empty/single/many; optional omitted/true/false; before/after state; order; duplicate/delete/re-add. Assert status **and** exact body/side effect.

Coverage meanings: statements executed; branches each decision outcome; functions invoked; lines executed. 100% coverage ≠ correctness. To reach branch coverage, trace control flow: every early return; true/false of each `if`; each `&&`/`||` operand (short-circuit means an operand may never run); callback predicate true/false; exact and either side of `<`, `<=`, `>=`; each final outcome. One-call-per-test means store one result, then assert it—do not invoke again inside another assertion.

Direct imported code: use the supplied Vitest coverage script. Separate Express server: terminal 1 `npm run start-coverage`; terminal 2 `npm run test-server`; send the unit-test input matrix through HTTP; then stop server gracefully (`Ctrl+C`) so c8 writes the report. Ordinary Vitest coverage of client tests cannot see a separate server process. Calling the backend directly does not cover an HTTP route.
