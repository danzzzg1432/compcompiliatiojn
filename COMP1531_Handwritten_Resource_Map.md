# COMP1531 Handwritten Resource Map

## Legend to copy at the top

- `Lxx.y Name pA-B` = lecture deck code, filename/title, PDF pages.
- `Txx/R: Heading` = `Tutorials-solutions/tutxx/README.md`, then a genuine heading inside it.
- `Txx/path` = the exact path after the `Tutorials-solutions/tutxx/` folder; repeated sibling paths may be shortened to filenames.
- `;` = also check. `*` = no matching tutorial; lecture is the main source.

Example: `L03.1 Dynamic Verification p22-32; T03/R:C Testing>Black-box; T03/playlist/solutions/playlist.test.js`.

## Practical topics

| Topic | Lecture slides | Relevant tutorial material |
|---|---|---|
| JS basics, arrays, objects, loops | `L01.3 JavaScript p12-34` | `T01/R:A Javascript>1 Basic Syntax+2 Arrays/Objects/Loops` (inline solutions) |
| First-class/HOF; map/filter/reduce | `L04.2 Advanced Functions p7-23` | `T01/R:A>2 Arrays/Objects/Loops>Q4`; `T08/R:C DRY & KISS` (array methods only) |
| TS types/unions/optionals (+ interfaces) | `L03.3 Static Verification p9-28` | `T04/R:A Intro to Typescript & Types`; `T04/a.typescript/solutions/types.ts, interface.ts` |
| Static verification/lint/style | `L03.3 Static Verification p30-47` | `T04/R:D Linting` (inline solution) |
| Imports/exports/multi-file | `L02.3 Multi-file & Importing p3-15` | `T03/R:A Working with multiple files`; `T03/playlist/solutions/playlist.js, dataStore.js, helper.js` |
| npm/deps/lockfile/scripts | `L02.4 Package Management p6-15` | `T03/R:B Packages`; `T05/solutions/a.express/package.json` (config example) |
| Unit/Vitest/black-box/debug | `L03.1 Dynamic Verification p8-10,16-34` | `T03/R:C Testing>Writing tests/Black-box/Debugging`; `T03/playlist/solutions/playlist.test.js` |
| Unit + branch coverage | `L03.1 Dynamic Verification p36-46` | `T03/R:C Testing>Coverage`; `T07/R:A Zune bug - Using Coverage`; `T07/solutions/a.zunebug/day-to-year.ts, day-to-year.test.ts, package.json` |
| HTTP/Express/routes/inputs/REST/CRUD/errors | `L04.3 HTTP Server (Part I) p6-13`; `L05.1 HTTP Server (Part II) p9-32` | `T04/R:B APIs+C HTTP Servers`; `T05/R:A Express Build>Parts 1-2`; `T05/solutions/a.express/src/server.ts, people.ts` |
| HTTP tests/status/Swagger | `L05.2 HTTP Testing p7-17` | `T05/R:A>API docs+Parts 3-5`; `T05/solutions/a.express/swagger.yaml`; `src/server.ts, people.test.ts, automarking.test.ts, errors.ts` |
| Separate server coverage/c8 | `L07.3 Code Coverage p2-12` | `T07/R:B Movies>Part 1 Server Coverage`; `T07/solutions/b.movies/package.json`; `src/server.ts, movie.test.ts` |
| Exceptions/throw/try-catch/error types | `L07.2 Exceptions p4-17` | `T07/R:B Movies>Part 2 Exceptions`; `T07/solutions/b.movies/src/movie.ts, server.ts, movie.test.ts` (includes custom error) |
| Persistence/files/data store | `L07.1 Persistence p6-12` | `T07/R:B Movies>Part 3 Persistence`; `T07/solutions/b.movies/src/dataStore.ts` |
| Auth/authz/hash/encrypt/tokens | `L07.4 Auth p3-25` | `*` |

## Theory, process, and design

| Topic | Lecture slides | Relevant tutorial material |
|---|---|---|
| Requirements elicitation/analysis | `L02.5 Requirements Engineering p19-23` | `T02/R:B SDLC - Requirements to Design>Part 1>Elicitation/Analysis` |
| F/NF + good requirements | `L02.5 Requirements Engineering p4-18` | `T09/R:B Requirements Analysis>Parts 1-2` |
| User stories/AC/use cases | `L02.5 Requirements Engineering p34-60` | `T09/R:B Requirements Analysis>Parts 3-4`; `T02/R:B>Part 1 Analysis+Part 2 Requirements` |
| Git solo | `L01.4 Git (Solo Usage) p9-13` | `T01/R:B Git Fundamentals` |
| Branches/merging/MRs/team Git | `L01.5 Git (Team Usage) p4-11`; `L02.2 Teamwork p45-58` | `T02/R:A Git for Teamwork>Branching/MR/Conflicts` |
| CI/pipelines | `L04.1 Continuous Integration p3-16` | `*` |
| SDLC/Agile | `L01.2 Software p11-16`; `L09.1 Agile p3-18` | `T02/R:B SDLC - Requirements to Design` (SDLC req/design only) |
| Deployment/delivery/CD | `L09.2 Validation [actually Deployment] p3-16` | `*` |
| Validation/UAT | `L09.3 Deployment [actually Validation] p3-7` | `*` |
| Class/ER/use-case modelling | `L08.1 Conceptual Modelling Cont'd p6-9` | `T09/R:B Requirements Analysis>Part 4 Use Cases` (use cases only) |
| State/behavioural modelling | `L07.5 Conceptual Modelling p15-25`; `L08.1 Conceptual Modelling Cont'd p10-13` | `T08/R:A State Diagram+B Traffic Lights`; `T08/solutions/Hide-and-Seek State Diagram.jpg` |
| Maintainability/coupling/cohesion/DRY/KISS/YAGNI | `L08.2 Design for Maintainability p4-15,22-23,29`; `L08.3 Software Complexity p9-10` | `T08/R:C DRY & KISS` (DRY/KISS only; inline solution) |
| Essential/accidental + cyclomatic complexity | `L08.3 Software Complexity p4-7,11-19` | `T09/R:A Complexity Analysis`; `T09/solutions/isLeapComplexity.png, getNextLeapComplexity.png, countLeapsComplexity.png` (cyclomatic only) |

## Low-priority/supporting deck codes

`L01.1 Course Overview`; `L02.1 Iteration 0`; `L03.2 Iteration 1`; `L05.3 Iteration 2`; `L08.4 Industry Lecture 1`; `L10.1 Exam Briefing`.

## Important file-name trap

The Week 9 filenames are reversed: `09.2 - Validation.pdf` contains Deployment, and `09.3 - Deployment.pdf` contains Validation.

`Tutorials-solutions` has no `tut10`; `*` marks topics with no matching tutorial solution in this checkout. Some solutions are embedded directly in tutorial READMEs rather than stored as separate code files.
