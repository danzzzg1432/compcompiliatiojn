# COMP1531 exam discovery: project, process, requirements, Git, CI/CD, teamwork

Scope: discovery only. This is a source-mapped inventory of potentially examinable material and compact candidates for a later handwritten sheet; it is deliberately **not** a finished cheatsheet.

## Source and inspection notes

- Every page of the ten assigned PDFs was text-extracted and visually checked in rendered contact sheets (282 pages total). Visual checking was important for the SDLC, Git-area flow, branch/merge, dependency graph, CI pipeline, Agile-cycle, release-tier, task-board, pair-programming, and requirements-classification diagrams/tables.
- `02.5 - Requirements Engineering.pdf` is actually three joined decks: Requirements Engineering (pp. 1-31), Use Cases/User Stories/Acceptance Criteria (pp. 32-62), and Validation (pp. 63-70).
- The Week 9 filenames are reversed: `09.2 - Validation.pdf` contains the 21-page **Deployment** lecture; `09.3 - Deployment.pdf` contains the 8-page **Validation** lecture. Citations below use the filenames on disk and state the actual content.
- `02.5` pp. 63-70 and `09.3` pp. 1-8 duplicate the Validation lecture almost exactly. This duplication is strong lecturer emphasis, not extra distinct content.

## Highest-value concepts and distinctions

### 1. Software engineering, software process, and SDLC

**Core meaning**

- Computer science asks how computers work, what they can do, and how efficiently; software engineering focuses on building the right software for people using appropriate practices and keeping it maintainable over time. Collaboration is presented as a key difference. (`01.2 - Software.pdf`, pp. 5-7)
- Software engineering is more than functionality: software should also be scalable, maintainable, and secure. Poor engineering can cost money and lives. (`01.2`, pp. 8-10)
- SDLC is a structured approach to development. The visual names six phases: requirements analysis, design, development, testing, deployment, maintenance. (`01.2`, p. 11; repeated in `02.5`, p. 3, and the actual Deployment deck `09.2`, p. 3)
- Why structure matters: efficiency (logical order), predictability (teams know what/when), and quality assurance (fewer errors, greater maintainability). (`01.2`, p. 12)
- Three pillars of quality/productivity: **people** (skills/teamwork), **process** (defined approach improves efficiency and quality), **technology** (tools, testing, automation). (`01.2`, pp. 13-14)

**Development models**

- Named models: Waterfall (linear/structured), prototyping (early feedback), iterative development (continuous improvement), Agile (rapid/collaborative). (`01.2`, p. 15)
- Waterfall sequence: **requirements gathering -> system design -> implementation -> testing -> deployment -> maintenance**. (`01.2`, p. 16)
- Likely distinction question: Waterfall is a model/process with largely sequential phases; Agile is a philosophy centred on incremental value and feedback, not simply “a faster Waterfall.” (`01.2`, pp. 15-16; `09.1 - Agile.pdf`, pp. 3, 17-18, 22)

**Compact candidates for later sheet space**

- SDLC six-stage arrow.
- “SE = right software + right practices + maintainable over time.”
- People / Process / Technology.
- Waterfall-vs-Agile comparison (see Agile section).

### 2. Requirements and requirements engineering

**Definition and purpose**

- IEEE-style requirement: a condition or capability needed by a user to solve a problem or achieve an objective. Also framed as an agreement among stakeholders and as descriptions/constraints of the proposed system. (`02.5`, p. 4)
- Requirements matter because they are the foundation for development, affect cost/time, provide a basis for verification, and manage scope. (`02.5`, p. 5)
- A good requirement statement identifies the system, uses a suitable modal verb (`shall`/`may`), states a positive end-result, and—per the quiz emphasis—is specific, measurable, and testable. Example: system + capability + measurable limit. (`02.5`, pp. 9, 29)
- Pitfall: vague, subjective, unmeasurable wording such as “robust,” “easy to use,” “accessible,” “bug-free,” “good usability,” “round-the-clock availability,” or “response time less than X seconds” without defining X/context. (`02.5`, pp. 7-9)

**Functional vs non-functional**

- **Functional requirement:** a capability/service—what the system does. (`02.5`, p. 10)
- **Non-functional requirement:** a constraint on how the system achieves behaviour, often a measurable performance/quality property applying to the whole system. (`02.5`, pp. 10, 15)
- Examples: “allow users to transfer money” is functional; availability, response time, accessibility, concurrent-user capacity, authentication mechanism, and externally mandated privacy constraints are non-functional. (`02.5`, pp. 11-18)
- Non-functional categories shown visually: product requirements (including usability/performance/space, efficiency, dependability, security), organisational requirements (environmental, operational, development), and external requirements (regulatory, ethical, legislative, accounting, safety/security). (`02.5`, pp. 13-14)
- Pitfall: “authentication” can sound like a feature, but “users shall authenticate using a health-authority identity card” is classified as an organisational constraint. Classification depends on whether the statement specifies a capability or constrains its implementation/quality. (`02.5`, p. 13)

**Requirements engineering (RE)**

- RE is a set of activities for identifying a software system’s purpose/goal and a negotiation process in which stakeholders agree what they want. Stakeholders can include end users, managers, maintainers, domain experts, and trade unions. (`02.5`, p. 20)
- Four logical RE activities: **elicitation -> analysis -> formal specification -> validation**. In practice these are iterative and interleaved, not a rigid one-pass pipeline. (`02.5`, p. 21)
- Elicitation: market research, stakeholder interviews, focus groups, “what if/what is” questions; discover domain, desired services, performance, hardware, and connected systems. (`02.5`, p. 22)
- Analysis: identify dependencies, conflicts, risks, and priorities; use user stories, use cases, and conceptual models. (`02.5`, p. 23)
- Specification: choose useful granularity; separate functional/non-functional requirements; say **what**, not **how**; produce an agreed document usable by customers and developers. It is not a design document. (`02.5`, p. 24)
- Validation: return to stakeholders to confirm requirements are correct. (`02.5`, p. 25)
- Common RE problems: needs only become clear after building starts; clients may not know or may change what they want; developers may lack domain understanding; stakeholder access may be limited; teams may jump to solutions/details too early (XY problem). (`02.5`, p. 26)
- Requirement conflicts should be addressed using negotiation and prioritisation, not ignored or reclassified. (`02.5`, p. 28)

**Likely question shapes (the deck contains MCQs)**

- Classify a statement as functional/non-functional. Correct patterns: transfer money = functional; availability/accessibility/response/concurrency = non-functional. (`02.5`, pp. 16-18)
- Identify what is not elicitation: writing unit tests. (`02.5`, p. 27)
- Choose the good requirement: specific, measurable, testable. (`02.5`, p. 29)
- State validation’s goal: ensure the system meets stakeholder needs. (`02.5`, p. 30)

**Compact candidates**

- F = “what/service”; NF = “constraint/how well/system-wide quality.”
- RE loop: Elicit -> Analyse -> Specify -> Validate.
- Specification = WHAT, not HOW.
- Good requirement = system + shall/may + positive, specific, measurable, testable result.

### 3. Use cases, user stories, and acceptance criteria

**Use cases**

- Use cases specify functionality through system behaviour as interactions with users, rather than merely listing functions. They are story-like, collaborative, and useful for discussion/brainstorming. (`02.5`, pp. 34-36)
- A use case is a dialogue initiated by a user, with system responses, aimed at a business goal. It treats the system as a **black box** and models high-level flow. (`02.5`, p. 35)
- May be a written step list or diagram. Key contents: actors and goals, main success scenario, failure conditions, failure handling. (`02.5`, pp. 37, 40)
- The ATM example gives an ordered interaction across customer, ATM, and bank; this is a likely “write/interpret the flow” model. (`02.5`, pp. 43-44)

**User stories**

- User stories centre the user in deciding what to build and are common in Agile. (`02.5`, p. 45)
- Exact template: **“As a `<type of user>`, I want `<goal>` so that `<reason>`.”** (`02.5`, p. 46)
- They contain just enough information to estimate effort and avoid detailed up-front requirements that become stale. (`02.5`, p. 47)
- Attributes: non-technical, customer-centred, user-goal rather than feature-centred, and ideally describe problems rather than solutions. (`02.5`, p. 48)
- INVEST properties (initials are not printed as a mnemonic, but all six are listed): **Independent, Negotiable, Valuable, Estimable, Small, Testable**. (`02.5`, p. 49)

**Acceptance criteria (AC)**

- Written before implementation to determine whether a story’s goals are fulfilled; break the story into customer-acceptable criteria, in natural language, refinable before implementation. (`02.5`, p. 53)
- AC should be neither too broad nor too narrow, minimise technical detail, remain understandable to the client, and be initially written before development. (`02.5`, p. 56)
- Acceptance tests check whether AC are met. Not all AC map neatly to automated tests; some need a UAT environment and manual feedback. Acceptance tests are black-box. (`02.5`, p. 56)
- Rule-based AC: simple list, applicable broadly. Scenario-based AC: better for stories with specific user actions and more directly implementable as tests, but weaker for high-level system properties. (`02.5`, p. 60)
- Scenario template: **Given** precondition, **When** action, **Then** expected result (with `And` for another condition/action). (`02.5`, pp. 57-59)

**Key distinctions/pitfalls**

- Requirement = agreed capability/constraint; user story = user-centred lightweight need; AC = observable conditions for accepting that story; acceptance test = execution that checks AC.
- Use case captures an interaction flow, including failures; user story captures goal/reason and deliberately omits detailed flow.
- Do not turn a user story into a technical solution or put implementation detail into AC unnecessarily.

**Compact candidates**

- User story template + INVEST.
- Use case: actor/goal + success path + failures/handling, black box.
- Given / When / Then.

### 4. Verification vs validation and UAT

- **Verification:** compare a life-cycle product with its required characteristics (requirements, design description, system). Plain-language mnemonic from slide: **“System will be built right.”** (`02.5`, pp. 65-66; duplicate `09.3 - Deployment.pdf` [actual Validation], pp. 3-4)
- **Validation:** gain confidence the system can accomplish its intended use, goals, and objectives. Mnemonic: **“Right system will be built.”** (same pages)
- Requirements validation checks the requirements document early, before resources are committed, to confirm it defines what users expect. (`02.5`, p. 67; duplicate `09.3`, p. 5)
- Validation methods: requirements reviews, prototyping, acceptance tests. (`02.5`, p. 68; duplicate `09.3`, p. 6)
- UAT/acceptance testing: formal testing against user needs, requirements, business processes, and acceptance criteria so an authorised user/customer can accept or reject the system. It is always black-box and typically involves customers/users; slides mention outcome/performance-based and stress testing. (`02.5`, p. 69; duplicate `09.3`, p. 7)
- Likely pitfall: verification is not “automated tests only,” and validation is not merely “does output equal expected output?” The distinction is conformance to specification versus suitability for intended use.

**Compact candidate**: Verification = build it right/spec; Validation = build the right thing/user need.

### 5. Git: solo workflow, branch model, team workflow

**Why Git**

- Needed beyond simple file sharing for detailed, systematic version history and concurrent collaboration/integration. (`01.4 - Git (Solo Usage).pdf`, pp. 2-4)
- Git provides distributed version control: each user has a full repository copy/backup; remote hosting also stores work. Git is the command-line program, while GitHub/GitLab/Bitbucket are hosting/web tools around Git; this course uses GitLab. (`01.4`, pp. 5-7)

**Areas and command flow (shown visually)**

- Local flow: working directory --`git add`--> staging area --`git commit`--> local repository --`git push`--> remote repository; `git pull` brings remote work back locally. (`01.4`, pp. 10, 12)
- Commands and meanings: (`01.4`, pp. 9, 11, 13)
  - `git clone <repo-url>`: remote -> new local clone.
  - `git status`: staged, unstaged, untracked state.
  - `git log`: commit history.
  - `git add --all` / `git add file.py`: stage changes.
  - `git diff`: changes from last commit/current working changes (deck wording).
  - `git commit -m "Message name"`: snapshot staged changes locally.
  - `git push` / `git push origin master`: local commits -> remote.
  - `git pull` / `git pull origin master`: remote changes -> local; may create merge conflicts.

**Branch model and collaboration**

- Git is a collection/tree of commits. Each commit has one parent and may have multiple children; a branch is a pointer to a commit; merging joins histories. (`01.5 - Git (Team Usage).pdf`, p. 4)
- `master`/main is just a pointer, usually to the latest commit. Create a branch with `git checkout -b new_branch_name`; switch with `git checkout branch_to_swap_to`. (`01.5`, pp. 5, 7; commands are visible in rendered slides)
- Only one branch is checked out locally at a time; avoid switching branches with staged or unstaged work. (`01.5`, p. 7)
- Merge means incorporating another branch’s work into the current branch. Regularly merge main into a feature branch to stay current/reduce later conflicts; after review, merge the completed feature back into main. (`01.5`, p. 8)
- The slide illustrates `git merge master` while on a feature branch. Direction matters: merge the named branch **into the currently checked-out branch**. (`01.5`, p. 8)

**Merge requests and protection**

- Professional flow avoids direct merges to main; a GitLab Merge Request shows diffs, enables review/discussion, runs CI/CD, controls approval, protects main, shares knowledge, catches bugs, and prevents accidental breakage. (`01.5`, pp. 2, 9-10)
- Teamwork deck’s course convention: MR author is assignee; another member reviews; original author merges. (`02.2 - Teamwork.pdf`, p. 58)

**Likely pitfalls**

- Git != GitLab.
- `commit` updates local history; `push` publishes commits; `add` does not commit.
- Branch is a pointer, not a separate full repository.
- Merge direction depends on the current branch.
- Don’t merge directly to main or merge an MR before review/green CI.

**Compact candidates**

- Four-area arrow with `add/commit/push/pull`.
- Branch = pointer; merge named branch into current branch.
- MR = diff + review + discussion + CI + approval.

### 6. Package management with npm

- npm (Node Package Manager) is installed with Node.js and manages dependencies/modules/libraries for JavaScript projects. External packages come from npm’s registry. (`02.4 - Package Management.pdf`, pp. 6-7)
- Initialise with `npm init`; this creates `package.json`, the project’s npm configuration. COMP1531 adds `"type": "module"` for ES-module imports. (`02.4`, p. 8)
- Install with `npm install <dependency>` (example `npm install date-fns`), which adds the latest stable version to `package.json`. The slide explicitly flags `~` and `^` version prefixes as something to notice, though it does not define their ranges. (`02.4`, p. 9)
- Anatomy: (`02.4`, pp. 11-13)
  - `package.json`: project metadata and dependency list; commit it.
  - `package-lock.json`: exact/resolved versioning information for reproducibility; commit it.
  - `node_modules/`: locally installed dependencies; never commit it.
- Fresh clone has no `node_modules`; `npm install` reads the manifest/lock to reproduce the environment. (`02.4`, p. 13)
- Custom commands live in `package.json`’s `scripts` object and run as `npm run <name>` (example `npm run bill`). (`02.4`, pp. 14-15)

**Pitfalls**

- Do not commit `node_modules`; do commit both npm metadata files.
- `npm init` configures a project; `npm install` installs dependencies.
- The slides do not teach exact semver behaviour for `~`/`^`; avoid inventing detailed rules unless another deck covers them.

### 7. Continuous Integration (CI)

- Definition: practice of automating integration of code changes from multiple contributors into one project; concretely, it makes merges to main/master more frequent and stable. (`04.1 - Continuous Integration.pdf`, p. 3)
- On every pushed commit, CI may build (not applicable here), test, lint, etc.; it automatically runs commands and provides a visible pass/fail summary in GitLab. (`04.1`, p. 4)
- GitLab configuration is `.gitlab-ci.yml` at repository root. Key YAML fields: `image` = environment, `stages` = phase order, job name = job identifier, `stage` = job’s phase, `script` = commands executed. (`04.1`, pp. 5-6)
- A **pipeline** is the summary/set of jobs run from the CI configuration. (`04.1`, pp. 7-8)
- A **runner** is another computer that takes the pushed commit and executes `.gitlab-ci.yml`; its job is running pipelines. (`04.1`, pp. 9-11)
- The rendered example uses a Node image, stages/jobs for build/lint/test, `before_script: npm install`, and scripts such as the project’s type-check/build, lint, and test commands. A smaller example shows `npm install` before `npm run test`. (`04.1`, pp. 12-13)
- Recommended flow: write tests -> write implementation -> push/create MR -> confirm green tick -> merge. (`04.1`, p. 14)
- Strong lecturer rule: **main/master must always be green; never merge without a passing pipeline.** (`04.1`, p. 16)

**Likely distinctions/pitfalls**

- Pipeline != runner: pipeline is configured work/status; runner is the machine executing it.
- `stages` gives ordering; a job’s `stage` assigns it to one phase; `script` gives commands.
- CI is integration/test automation, not deployment. Delivery/deployment extend the pipeline later.

**Compact candidates**

- `.gitlab-ci.yml`: `image`, `stages`, job -> `stage` + `script`.
- commit/push -> runner -> pipeline -> green MR -> merge.

### 8. Deployment, delivery, deployment, DevOps, monitoring

> Filename warning: this material is in `09.2 - Validation.pdf`, whose actual title is Projects - Deployment.

- Deployment: activities that make a software system available for use. (`09.2`, p. 3)
- Historical releases were infrequent/physical; web apps plus improved connectivity made frequent updates practical, shifting software from asset to service. (`09.2`, pp. 4-5)
- Cloud deployment examples: AWS, Google App Engine, Vercel. (`09.2`, p. 6)
- **Continuous integration:** automated integration/testing of changes. (`09.2`, p. 7; detailed in `04.1`)
- **Continuous delivery:** accepted changes can be deployed quickly and sustainably because the release process is automated to a “button push”; actual shipping retains human sign-off. (`09.2`, pp. 8-10)
- Release environments can include zero or more interim tiers. Typical tiers: `dev` (frequent/developer-visible), `test/staging` (as close/identical to production as possible), `prod` (customers). Stability increases toward prod. (`09.2`, pp. 11-12)
- **Continuous deployment:** extension of delivery in which changes automatically move toward production; only a failed test stops them. No human sign-off is implied. (`09.2`, p. 13)
- **DevOps:** overlap of development, deployment/operations, and quality assurance; practices that reduce commit-to-production time while preserving high quality. Presented increasingly as shared practices/aspects of roles rather than one siloed job. (`09.2`, pp. 15-17)
- Maintenance after deployment uses analytics/monitoring to preserve UX (errors, performance, uptime) and enhance UX (understanding behaviour, leading to interviews/user stories). (`09.2`, p. 18)
- Operational health: monitor 4xx client/user-side errors (examples 400, 404), 5xx server-side failures (500, 503), disk, memory, CPU, and network; use alerts/triggers rather than constant manual watching. (`09.2`, p. 19)

**High-probability distinction**

- CI = integrate and verify changes.
- Continuous delivery = release-ready/on-demand, **human button/sign-off**.
- Continuous deployment = automatically goes to production if checks pass.

**Compact candidates**

- CI -> Delivery (manual release) -> Deployment (automatic release).
- dev -> staging -> prod; increasing stability.

### 9. Agile

- Agile is a software-development **philosophy**, not a fixed process: deliver value in small frequent releases, expect requirements to evolve, and continuously respond to users. (`09.1 - Agile.pdf`, pp. 3, 22)
- Motivation: long up-front planning caused stale requirements, late bugs, competitive delay, and unwanted features. Agile answers with small working increments, frequent releases, early feedback, adaptation, and continuous improvement. (`09.1`, pp. 5-6)
- Four Agile values: (`09.1`, p. 8)
  1. Individuals and interactions over processes and tools.
  2. Working software over comprehensive documentation.
  3. Customer collaboration over contract negotiation.
  4. Responding to change over following a plan.
- Twelve principles, likely lower priority individually but examinable as recognition: early customer satisfaction; welcome change; frequent delivery; customer/developer collaboration; motivated people; direct conversation; working software as progress; sustainable pace; technical excellence; simplicity; self-organising teams; regular reflection/improvement. (`09.1`, p. 7)
- Practices shown: user stories, TDD (tests before code), CI (merge frequently/run tests), refactoring (improve structure without changing behaviour). (`09.1`, p. 10)
- Why it works: short feedback loop—idea -> release -> feedback -> improve -> release again. (`09.1`, p. 14)
- Challenges: changing requirements, estimating work, keeping documentation, distributed communication, speed/quality balance. Requires trust, communication, discipline—not merely ceremonies. (`09.1`, p. 15)
- Misconceptions: Agile still plans continuously and retains useful documentation; Scrum is only one Agile framework; Agile means delivering value sooner, not simply working faster. (`09.1`, pp. 16-17)
- Waterfall vs Agile: one large vs many small releases; heavy documentation vs working software; fixed vs evolving requirements; testing at end vs continuous; customer at start vs continuously involved; difficult vs easy to adapt. (`09.1`, p. 18)
- Agile is values/principles; Scrum, Kanban, XP are implementing frameworks. Scrum = time-boxed sprints/defined roles; Kanban = visualise flow and limit work in progress; XP = technical excellence and frequent releases. (`09.1`, pp. 20-21)

**Compact candidates**

- Four values (likely worth exact wording).
- “Agile = philosophy; Scrum/Kanban/XP = frameworks.”
- Feedback-loop arrow and Waterfall/Agile contrasts.

### 10. Teamwork and project management

This 81-page guest-style deck contains much assessment advice. Conceptual items could appear in theory questions, but many course-specific marking details are lower-value for a final cheatsheet than requirements/Git/CI/CD.

**Planning and coordination**

- Good meeting: on time, clear agenda/goal, inclusive contribution, preparation, stays on topic. (`02.2 - Teamwork.pdf`, p. 7)
- Meeting types: kick-off, weekly status, daily stand-up, decision, design review, debrief. Meeting minutes should be timestamped in GitLab. (`02.2`, pp. 8-10)
- Gantt chart visualises task scheduling/dependencies and progress, but is explicitly “not necessary in this course.” (`02.2`, p. 11)
- Dependency graphs show which tasks can proceed in parallel and which rely on others; break circular dependencies. (`02.2`, pp. 12-17)
- Task board tracks description, status, assignee, and progress. Course-quality entries include assignee, title, implementation/subtask detail, iteration, and at least three stages such as todo/in-progress/in-review/done. (`02.2`, pp. 20-24)
- Stand-up = frequent short progress update answering: what did I do, what will I do, what blockers/problems am I facing? May be synchronous or asynchronous. (`02.2`, pp. 26-31)

**Completion and quality**

- “Definition of completion” prevents different interpretations of finished; the slide contrasts a reviewed MR one click from merge with untested/unreviewed local code. (`02.2`, pp. 45-48)
- Code review is a quality-assurance process, synchronous or asynchronous; benefits: knowledge sharing, earlier bugs, common standards, higher quality, no single point of failure. (`02.2`, p. 50)
- Pair programming: two developers at one machine; supports knowledge sharing, real-time review, collaboration. The visual shows unstructured pairing, driver/navigator, and ping-pong pairing, although only the general definition is in extracted text. (`02.2`, pp. 53-56)
- Internal Git standards can standardise commit/branch names and MR responsibility/review. (`02.2`, pp. 57-58)

**Leadership/conflict**

- Team leader responsibilities: goals, delegation, timeline, communication, motivation/support, progress, conflict mediation. Leader need not be best technically, authoritative, overloaded, or dictatorial. (`02.2`, pp. 41-42)
- Causes of conflict include competing design views, not listening/equal voice, mismatched behaviour standards, unequal work, unclear communication rules, missed meetings/deadlines. (`02.2`, p. 60)
- Resolve internal issues by communicating clearly/politely, working together, and escalating privately to tutor only if not constructive. (`02.2`, pp. 67-72)
- Group decisions should invite minority reasoning rather than merely count the majority; the visual examples progress from groupthink to hearing an alternative and adopting a better solution/compromise. (`02.2`, pp. 62-65)

**Lower-priority/course-specific details**

- Minimum project artefacts mentioned: meeting minutes, issue board, stand-ups; approaches are flexible. (`02.2`, pp. 75-78)
- Detailed disappearing-member timelines, reflection/evaluation forms, and assessment-specific contribution checks are unlikely to deserve scarce cheatsheet space unless the Exam Briefing explicitly highlights teamwork procedures. (`02.2`, pp. 70-78)

## Cross-topic overlaps and synthesis

### SDLC through the lectures

- **Requirements analysis:** RE activities and user-centred artefacts (`02.5`).
- **Design/development:** specification tells WHAT, design later chooses HOW; Git branches support parallel implementation (`02.5` p. 24; `01.5`).
- **Testing/verification:** requirements form the basis for verification; CI continuously runs checks (`02.5` p. 5; `04.1`).
- **Validation:** reviews, prototypes, acceptance tests/UAT confirm intended use (`02.5` pp. 63-69; `09.3`).
- **Deployment:** delivery/deployment moves accepted, green code through dev/staging/prod (`09.2`).
- **Maintenance:** monitoring both preserves and improves user experience, creating new feedback/user stories (`09.2` pp. 18-19).

### Agile feedback loop across topics

`user need -> story + AC -> small implementation on branch -> tests/CI -> reviewed MR -> deploy -> monitor/feedback -> refine requirements`

This is not a slide verbatim; it is a synthesis supported by `02.5` pp. 45-60, `01.5` pp. 8-10, `04.1` pp. 14-16, `09.1` pp. 3, 10, 14, and `09.2` pp. 8-19.

### Verification/validation overlap

- Static/dynamic verification decks (handled elsewhere) should map to **build it right**.
- Requirements reviews, prototypes, AC, and UAT map to **build the right thing**.
- Acceptance testing is both a test activity and a validation mechanism because its reference point is user need/acceptance criteria, not internal implementation.

### CI/CD and Git workflow overlap

- Git structures and transports changes; MR creates the review/approval gate; CI executes automated checks; delivery/deployment releases passing work. (`01.4`, `01.5`, `04.1`, actual Deployment deck `09.2`)
- “Main always green” connects branch protection, code review, and pipeline status. (`01.5`, pp. 9-10; `04.1`, p. 16; `02.2`, p. 58)

## Suggested priority for eventual A4 allocation (not layout or final wording)

**High priority**

1. Verification vs validation and UAT.
2. Functional vs non-functional requirements; four RE steps.
3. User story template, INVEST, use case contents, Given/When/Then.
4. Git area-flow, branch/merge direction, MR purpose.
5. CI pipeline/runner/config fields; main must remain green.
6. CI vs continuous delivery vs continuous deployment.
7. Four Agile values and Agile-vs-Waterfall.

**Medium priority**

- SDLC stages and people/process/technology.
- npm file responsibilities and install/init/script commands.
- Release environments and basic monitoring signals.
- Agile frameworks and common misconceptions.
- Code review, definition of done, task boards/stand-ups.

**Low priority unless Exam Briefing says otherwise**

- Historical motivation/examples, cloud vendor list, guest-lecture biography, exact teamwork marking procedures, Gantt details, dispute escalation timelines, all twelve Agile principles verbatim.

## Items that require cross-checking against other slide-team reports

- Exact semver meaning of `~` and `^` is flagged but not explained in Package Management.
- Exact `.gitlab-ci.yml` syntax may vary by project scripts; keep the conceptual field map unless Exam Briefing expects code completion.
- “Definition of completion” should be compared with any maintainability/testing deck’s definition-of-done language.
- Acceptance testing/UAT should be reconciled with Dynamic Verification and HTTP Testing classifications.
- 4xx vs 5xx appears in Deployment monitoring and should be consolidated with the HTTP-server report rather than duplicated.

