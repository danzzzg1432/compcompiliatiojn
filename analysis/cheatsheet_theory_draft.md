# SIDE B — THEORY, PROCESS & DESIGN (draft)

**Short-answer rule:** answer in marks, not essays. **Name/classify → scenario evidence → consequence/trade-off → concrete remedy**. “Compare” needs both sides; “improve” needs preserved behaviour and a change tied to its cause. Avoid absolutes: tools reduce/detect risk; rarely “guarantee” or eliminate all bugs.

## REQUIREMENTS • VERIFICATION • VALIDATION

**Functional (F)** = capability/service, **what the system does**. **Non-functional (NF)** = measurable constraint/quality on how well/how it operates (performance, availability, capacity, usability, security, legal/organisational constraint). Classify the actual wording: “user can transfer” = F; “responds within 2 s” = NF. A role/access rule can be F when it specifies observable permitted behaviour. Justify: “F because it states behaviour the system must provide/restrict,” or “NF because it constrains quality/implementation across the system.”

Good requirement = system + **shall/may** + positive, specific, measurable, testable result; say **WHAT, not HOW**. RE is iterative: **elicit** needs → **analyse** dependencies/conflicts/risks/priorities → **specify** agreed F/NF requirements → **validate** with stakeholders. Negotiate/prioritise conflicts.

User story: **As a [role], I want [goal], so that [reason].** INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable. Use case = black-box actor/goal dialogue: success path + failures/handling. Acceptance criteria (AC) = observable conditions for accepting a story, written before implementation; avoid implementation detail/vagueness. Scenario AC: **Given** precondition/role/state, **When** action, **Then** observable allowed result **and prohibited/error result**. Cover distinct actors/visibility branches with separate scenarios.

**Verification** = are we building it right? Conformance to specification/design; includes static and dynamic checks. **Validation** = are we building the right thing? Fitness for stakeholder need/intended use. Requirements reviews/prototypes/UAT validate. **UAT** = authorised users/customers black-box test against needs, business processes and AC, then accept/reject. Static verification: no execution (TypeScript/compiler/linter); catches some type/syntax/control/style issues, not runtime behaviour or total correctness. Dynamic verification executes code with data (unit/integration/HTTP tests). Black-box tests use contract only; white-box tests use implementation/control flow.

## COMPLEXITY • MAINTAINABILITY • MODELS

**Essential complexity** is inherent in required domain behaviour; cannot be removed without changing requirements, only managed. **Accidental complexity** comes from chosen implementation/tools (bespoke parser, duplication, needless abstraction); mitigate with libraries, standards or redesign. In an answer, name the unavoidable rule separately from self-inflicted machinery.

**Cyclomatic complexity** = linearly independent control-flow paths. For one connected function: **V(G) = decisions + 1 = e − n + 2**. Count `if`, each `else if`, loops/cases as decisions; plain `else`, returns and ordinary lines add 0. Loops have repeat + exit paths. Show count. Fewer lines/early returns do not inherently reduce V. Table-driven code may lower syntactic metric while domain cases remain. Splitting a function merely to game the number may worsen readability; 8/10 limits are heuristics, not proof.

Maintainable = easy to understand, change and test as people/requirements grow. **High cohesion**: one module’s elements share one responsibility/reason to change. **Low coupling**: few dependencies, so change does not ripple. Mixed responsibilities → split into cohesive modules and preserve public behaviour. **Refactoring** restructures internals **without changing observable behaviour**; test before/after.

**DRY**: one authoritative representation of knowledge; not “remove every repeated line.” **KISS**: simplest clear suitable solution; prefer familiar language/library features over clever wrappers. **YAGNI**: do not build speculative capability. Avoid both under-design (constant rewrites) and over-design (abstractions cost more than change). Follow conventions. Diagnostic: “What different reasons could this module change?”

Model = simplified representation for understanding/communication/reasoning. **Structural**: static entities/relationships—UML class (classes, attributes, methods, associations/inheritance) or ER (persistent entities, PK/FK, cardinality). **Behavioural**: change/interactions—state/FSM or use-case. FSM = finite states + events/actions + valid directed transitions/guards; state is a stable condition, event labels the arrow. Use-case actors are external roles/goals, not internal functions.

## SDLC • AGILE • CI/CD • DEPLOYMENT

SDLC: **requirements → design → development → testing → deployment → maintenance/feedback**; revisit upstream phases when later failure reveals a bad assumption. Failure answer: identify evidence, then pair phases with action—requirements: operational constraint missing; design: environment/config approach; development: package/build config; testing: reproduce in staging/CI; deployment: automate complete artifact; maintenance: monitor/feedback. Do not answer only “deployment failed/test more.”

Waterfall = largely sequential, fixed requirements, one large release, testing/customer feedback later; useful when scope is stable. Agile = philosophy of small working increments, continuous testing/customer feedback and adaptation—not “no planning/docs” or simply faster. Values: **individuals/interactions > processes/tools; working software > comprehensive docs; customer collaboration > contract negotiation; responding to change > following plan** (right still valued). Scrum/Kanban/XP are frameworks. Loop: need → story+AC → small change → tests/CI/review → release → feedback → refine.

**CI** = frequently integrate and automatically build/typecheck/lint/test each pushed change. Pipeline = configured jobs/status; runner = machine executing it; `.gitlab-ci.yml`: image, stages, job→stage+script. Main must stay green; passing CI reduces risk but does not prove correctness. **Continuous delivery** = automated release-ready path, production release needs human button/sign-off. **Continuous deployment** = every passing change automatically reaches production. Environments: dev → staging (production-like) → prod; increasing stability. Monitor 4xx/5xx, uptime, CPU/memory/disk/network; alerts feed maintenance.

Deployment diagnosis template: “Cause is non-reproducible environment/dependency/config/version or incomplete manual copy. Commit manifest+lock, use an automated clean build/test/deploy pipeline and production-like staging; deploy the same immutable artefact/config deliberately.”

## GIT • NPM • TEAMWORK

Git flow: working directory **--add→ staging --commit→ local repo --push→ remote**; pull = remote changes into current local branch (may conflict). `commit` is local; `push` publishes. Branch = movable pointer to a commit, not full repo. `git merge X` merges **X into currently checked-out branch**.

Feature branch + MR benefits: isolates incomplete work; visible diff/discussion/review; CI/approval gate protects stable main; traceability/knowledge sharing. Costs: long-lived branches drift and cause merge conflicts; review/merge overhead and delay; branch-management complexity. Keep branches small/short, regularly integrate main, merge only reviewed green MRs. Direct-to-main is faster for trivial work but removes isolation/review gate and risks everyone.

`package.json` = project metadata, scripts, dependency ranges; commit. `package-lock.json` = exact resolved dependency graph/reproducible installs; commit. `node_modules` = generated local packages; do not commit. `npm init` creates manifest; `npm install` restores/adds packages; `npm run x` executes script. Runtime dependency needed in production; dev dependency only development/testing/tooling.

## AUTH • SECURITY • PERSISTENCE • TYPE TRADE-OFF

**Authentication** = who are you? **Authorisation** = may this authenticated identity perform this operation/own this resource? Authenticate first, authorise every protected action. Typical mapping: **401** missing/invalid identity/session; **403** valid identity but insufficient permission; **400** malformed/invalid request; **404** resource absent (follow supplied Swagger precedence).

Never store plaintext passwords. Register: salt + password-hash → store hash/salt. Login: hash submitted password with stored salt → compare. **Hashing** = one-way verification/fixed digest; **encryption** = reversible confidentiality with key. Salt makes identical passwords yield different stored hashes. Base64 = reversible encoding/obfuscation, neither encryption nor integrity. A token may claim userId/role/permissions/expiry, but trust it only after cryptographic signature/HMAC and expiry validation. `Authorization: Bearer <token>` carries it; a token does not remove per-operation authorisation.

**Persistence** = state outlives creating process, normally data layer. In-memory is lost on restart. JSON-file lifecycle: startup **read → parse → global state**; after mutation/route **state → stringify → write** (or periodic save). `JSON.stringify` alone is not persistence. Benefits: survival/recovery; costs: I/O/coordination/scaling issues—do not treat one local file as a multi-instance database.

TypeScript trade-off answer: + earlier type errors, clearer contracts/tooling, safer refactors; − migration/annotation/learning/maintenance friction, and it cannot eliminate runtime/logic errors. Recommend contextually: small volatile prototype may prioritise speed; growing collaborative/long-lived code gains more from static guarantees. Avoid `any`: it bypasses safety.
