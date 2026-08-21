# COMP1531 Handwritten Resource Map

## Legend to copy at the top

- `Lxx.y Name pA-B` = lecture deck code, filename/title, PDF pages.
- `Txx/R: Heading` = `Tutorials-master/tutxx/README.md`, then a genuine heading inside it.
- `Txx/path` = the exact path after the `tutxx/` folder; repeated sibling paths may be shortened to filenames.
- `;` = also check. `*` = no matching tutorial; lecture is the main source.

Example: `L03.1 Dynamic Verification p22-32; T03/R:C Testing>Black-box; T03/playlist/src/playlist.test.js`.

## Practical topics

| Topic | Lecture slides | Relevant tutorial material |
|---|---|---|
| JS basics, arrays, objects, loops | `L01.3 JavaScript p12-34` | `T01/R:A Javascript>A1-2`; `T01/loopy.js, methods.js`; `T10/c1/assorted.js, assorted.test.js` |
| First-class/HOF; map/filter/reduce | `L04.2 Advanced Functions p11-23` | `T01/R:A2 Arrays, Objects, and Loops`; `T01/methods.js` |
| TS types/interfaces/unions/optionals | `L03.3 Static Verification p9-28` | `T04/R:A Intro to Typescript & Types`; `T04/a.typescript/types.js`; `T10/c2/interface.ts, cockroaches.ts, cockroaches.test.ts` |
| Static verification/lint/style | `L03.3 Static Verification p30-49` | `T04/R:D Linting`; `T04/d.linting/x.ts, x.test.ts, eslint.config.mjs` |
| Imports/exports/multi-file | `L02.3 Multi-file & Importing p5-15` | `T03/R:A Working with multiple files`; `T03/playlist/src/playlist.js, dataStore.js, helper.js` |
| npm/deps/lockfile/scripts | `L02.4 Package Management p6-15` | `T03/R:B Packages`; `T03/playlist/package.json` |
| Unit/Vitest/black-box/debug | `L03.1 Dynamic Verification p8-10,16-34` | `T03/R:C Testing>Writing tests/Black-box/Debugging`; `T03/playlist/src/playlist.test.js` |
| Unit + branch coverage | `L03.1 Dynamic Verification p36-46`; `L07.3 Code Coverage p2-12` | `T03/R:C Testing>Coverage`; `T07/R:A Zune bug`; `T07/a.zunebug/day-to-year.ts, day-to-year.test.ts` |
| HTTP/Express/inputs/REST/CRUD/status | `L04.3 HTTP Server (Part I) p6-14`; `L05.1 HTTP Server (Part II) p9-33` | `T04/R:B APIs+C HTTP Servers`; `T05/R:A Express Server Build`; `T05/a.express/src/server.ts, people.ts` |
| HTTP tests/Swagger/routes/errors | `L05.2 HTTP Testing p7-17` | `T05/R:A>API docs/Part 3 HTTP Tests/Part 5 Errors`; `T05/a.express/swagger.yaml`; `src/server.ts, people.test.ts, errors.ts` |
| Separate server coverage/c8 | `L07.3 Code Coverage p2-12` | `T07/R:B Movies>Part 1 Server Coverage`; `T07/b.movies/package.json`; `src/server.ts, movie.test.ts` |
| Exceptions/try-catch/custom errors | `L07.2 Exceptions p4-17` | `T07/R:B Movies>Part 2 Exceptions`; `T07/b.movies/src/movie.ts, server.ts, movie.test.ts, types.ts` |
| Persistence/files/data store | `L07.1 Persistence p6-12` | `T07/R:B Movies>Part 3 Persistence`; `T07/b.movies/src/dataStore.ts`; `T10/c2/cockroaches.ts, cockroaches.test.ts` |
| Auth/authz/hash/encrypt/tokens | `L07.4 Auth p3-25` | `*` |

## Theory, process, and design

| Topic | Lecture slides | Relevant tutorial material |
|---|---|---|
| Requirements elicitation/analysis | `L02.5 Requirements Engineering p10-30` | `T02/R:B SDLC - Requirements to Design>Elicitation/Analysis` |
| F/NF + good requirements | `L02.5 Requirements Engineering p33-45` | `T09/R:B Requirements Analysis>Parts 1-2`; `T10/R:B>Q2 Requirements` |
| User stories/AC/use cases | `L02.5 Requirements Engineering p46-60,65-69` | `T09/R:B Requirements Analysis>Parts 3-4`; `T02/R:B>Part 2 Pet the PixelPup` |
| Git solo | `L01.4 Git (Solo Usage) p9-13` | `T01/R:B Git Fundamentals` |
| Branch/MR/conflicts/team Git | `L01.5 Git (Team Usage) p8-11`; `L02.2 Teamwork p45-58` | `T02/R:A Git for Teamwork>Branching/MR/Conflicts` |
| CI/pipelines | `L04.1 Continuous Integration p3-18` | `T10/R:B Short Answer>Q4 Deployment` |
| SDLC/Agile | `L01.2 Software p11-16`; `L09.1 Agile p3-18` | `T02/R:B SDLC`; `T10/R:B>Q1 SDLC` |
| Deployment/delivery/CD | `L09.2 Validation [actually Deployment] p3-18` | `T10/R:B>Q4 Deployment` |
| Validation/UAT | `L09.3 Deployment [actually Validation] p3-7` | `T09/R:B Requirements Analysis`; `T10/R:B>Q1 SDLC` |
| Class/ER/use-case modelling | `L07.5 Conceptual Modelling p10-25` | `T02/R:B>Design Interface/Data` |
| State/behavioural modelling | `L08.1 Conceptual Modelling Cont'd p5-14` | `T08/R:A State Diagram+B Traffic Lights`; `T08/b.traffic/traffic.ts, traffic.test.ts` |
| Maintainability/coupling/cohesion/DRY/KISS/YAGNI | `L08.2 Design for Maintainability p12-29` | `T08/R:C DRY & KISS`; `T08/c.drykiss/drykiss.ts`; `T10/R:B>Q3 Design Principles` |
| Essential/accidental + cyclomatic complexity | `L08.3 Software Complexity p4-19` | `T09/R:A Complexity Analysis`; `T10/R:B>Q5 Cyclomatic Complexity` |

## Low-priority/supporting deck codes

`L01.1 Course Overview`; `L02.1 Iteration 0`; `L03.2 Iteration 1`; `L05.3 Iteration 2`; `L08.4 Industry Lecture 1`; `L10.1 Exam Briefing`.

## Important file-name trap

The Week 9 filenames are reversed: `09.2 - Validation.pdf` contains Deployment, and `09.3 - Deployment.pdf` contains Validation.
