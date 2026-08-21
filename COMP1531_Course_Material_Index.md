# COMP1531 Final Exam - Course Material Index

This is a link-first companion to the content cheatsheet. Pick the topic, then open the exact lecture pages and tutorial material. PDF page numbers below are the page numbers shown by the PDF viewer.

## Practical topics

| Topic | Lecture slides | Tutorial material and worked files |
|---|---|---|
| JavaScript basics, arrays, objects, and loops | [JavaScript, pp. 12-34](<Slides/01.3 - JavaScript.pdf#page=12>) | [Tutorial 1 - JavaScript](Tutorials-master/tut01/README.md#a-javascript); [loops](Tutorials-master/tut01/loopy.js); [array methods](Tutorials-master/tut01/methods.js); [Tutorial 10 problem-solving](Tutorials-master/tut10/README.md#c1-assorted-problem-solving-10-marks); [worked code](Tutorials-master/tut10/c1/assorted.js); [tests](Tutorials-master/tut10/c1/assorted.test.js) |
| First-class and higher-order functions; `map`, `filter`, and `reduce` | [Advanced Functions, pp. 11-23](<Slides/04.2 - Advanced Functions.pdf#page=11>) | [Tutorial 1 - arrays, objects, and loops](Tutorials-master/tut01/README.md#2-arrays-objects-and-loops); [array-method examples](Tutorials-master/tut01/methods.js) |
| TypeScript types, interfaces, unions, optionals, and literals | [Static Verification, pp. 9-28](<Slides/03.3 - Static Verification.pdf#page=9>) | [Tutorial 4 - TypeScript and types](Tutorials-master/tut04/README.md#a-intro-to-typescript--types); [type exercise](Tutorials-master/tut04/a.typescript/types.js); [Tutorial 10 typed-files task](Tutorials-master/tut10/README.md#c2-files-6-marks); [interface](Tutorials-master/tut10/c2/interface.ts); [implementation](Tutorials-master/tut10/c2/cockroaches.ts); [tests](Tutorials-master/tut10/c2/cockroaches.test.ts) |
| Static verification, linting, and coding style | [Static Verification - ESLint, pp. 30-49](<Slides/03.3 - Static Verification.pdf#page=30>) | [Tutorial 4 - linting](Tutorials-master/tut04/README.md#d-linting); [lint target](Tutorials-master/tut04/d.linting/x.ts); [tests](Tutorials-master/tut04/d.linting/x.test.ts); [ESLint config](Tutorials-master/tut04/d.linting/eslint.config.mjs) |
| Imports, exports, and multi-file design | [Multi-file and Importing, pp. 5-15](<Slides/02.3 - Multi-file & Importing.pdf#page=5>) | [Tutorial 3 - working with multiple files](Tutorials-master/tut03/README.md#a-working-with-multiple-files); [playlist module](Tutorials-master/tut03/playlist/src/playlist.js); [data store](Tutorials-master/tut03/playlist/src/dataStore.js); [helper module](Tutorials-master/tut03/playlist/src/helper.js) |
| npm, packages, dependencies, lockfiles, and scripts | [Package Management, pp. 6-15](<Slides/02.4 - Package Management.pdf#page=6>) | [Tutorial 3 - packages](Tutorials-master/tut03/README.md#b-packages); [example package file](Tutorials-master/tut03/playlist/package.json) |
| Unit testing, Vitest, black-box testing, and debugging | [Dynamic Verification, pp. 8-10 and 16-34](<Slides/03.1 - Dynamic Verification.pdf#page=8>) | [Tutorial 3 - testing](Tutorials-master/tut03/README.md#c-testing); [writing tests](Tutorials-master/tut03/README.md#writing-tests); [black-box testing](Tutorials-master/tut03/README.md#black-box-testing); [playlist tests](Tutorials-master/tut03/playlist/src/playlist.test.js) |
| Unit-test coverage and branch coverage | [Dynamic Verification - coverage, pp. 36-46](<Slides/03.1 - Dynamic Verification.pdf#page=36>); [HTTP Server Coverage, pp. 2-12](<Slides/07.3 - Code Coverage.pdf#page=2>) | [Tutorial 3 - coverage](Tutorials-master/tut03/README.md#coverage); [Tutorial 7 - Zune coverage exercise](Tutorials-master/tut07/README.md#a-zune-bug---using-coverage); [implementation](Tutorials-master/tut07/a.zunebug/day-to-year.ts); [tests](Tutorials-master/tut07/a.zunebug/day-to-year.test.ts) |
| HTTP fundamentals, Express, inputs, REST, CRUD, and status codes | [HTTP Server Part I, pp. 6-14](<Slides/04.3 - HTTP Server (Part I).pdf#page=6>); [HTTP Server Part II, pp. 9-33](<Slides/05.1 - HTTP Server (Part II).pdf#page=9>) | [Tutorial 4 - APIs](Tutorials-master/tut04/README.md#b-apis); [Tutorial 4 - HTTP servers](Tutorials-master/tut04/README.md#c-http-servers); [Tutorial 5 - Express server build](Tutorials-master/tut05/README.md#a-express-server-build); [server](Tutorials-master/tut05/a.express/src/server.ts); [backend](Tutorials-master/tut05/a.express/src/people.ts) |
| HTTP testing, Swagger, route wrappers, and HTTP errors | [HTTP Testing, pp. 7-17](<Slides/05.2 - HTTP Testing.pdf#page=7>) | [Tutorial 5 - API documentation](Tutorials-master/tut05/README.md#api-documentation); [HTTP tests](Tutorials-master/tut05/README.md#part-3---writing-http-tests); [HTTP errors](Tutorials-master/tut05/README.md#part-5---http-errors); [Swagger](Tutorials-master/tut05/a.express/swagger.yaml); [server](Tutorials-master/tut05/a.express/src/server.ts); [tests](Tutorials-master/tut05/a.express/src/people.test.ts); [error types](Tutorials-master/tut05/a.express/src/errors.ts) |
| Separate Express-server coverage with `c8` | [HTTP Server Coverage, pp. 2-12](<Slides/07.3 - Code Coverage.pdf#page=2>) | [Tutorial 7 - server coverage](Tutorials-master/tut07/README.md#part-1---server-coverage); [movie server](Tutorials-master/tut07/b.movies/src/server.ts); [HTTP tests](Tutorials-master/tut07/b.movies/src/movie.test.ts); [package scripts](Tutorials-master/tut07/b.movies/package.json) |
| Exceptions, `try`/`catch`, custom errors, and error types | [Exceptions, pp. 4-17](<Slides/07.2 - Exceptions.pdf#page=4>) | [Tutorial 7 - exceptions](Tutorials-master/tut07/README.md#part-2---exceptions); [backend](Tutorials-master/tut07/b.movies/src/movie.ts); [server handling](Tutorials-master/tut07/b.movies/src/server.ts); [tests](Tutorials-master/tut07/b.movies/src/movie.test.ts); [types](Tutorials-master/tut07/b.movies/src/types.ts) |
| Persistence and file-backed data stores | [Persistence, pp. 6-12](<Slides/07.1 - Persistence.pdf#page=6>) | [Tutorial 7 - persistence](Tutorials-master/tut07/README.md#part-3---persistence); [movie data store](Tutorials-master/tut07/b.movies/src/dataStore.ts); [Tutorial 10 files task](Tutorials-master/tut10/README.md#c2-files-6-marks); [file implementation](Tutorials-master/tut10/c2/cockroaches.ts) |
| Authentication, authorisation, hashing, encryption, and tokens | [Auth, pp. 3-25](<Slides/07.4 - Auth.pdf#page=3>) | No dedicated tutorial section in this checkout; use the lecture deck as the primary course source. |

## Theory, process, and design topics

| Topic | Lecture slides | Tutorial material and worked files |
|---|---|---|
| Requirements elicitation and analysis | [Requirements Engineering, pp. 10-30](<Slides/02.5 - Requirements Engineering.pdf#page=10>) | [Tutorial 2 - requirements to design](Tutorials-master/tut02/README.md#b-sdlc---requirements-to-design); [requirements elicitation](Tutorials-master/tut02/README.md#requirements-elicitation); [requirements analysis](Tutorials-master/tut02/README.md#requirements-analysis) |
| Functional/non-functional requirements and good requirements | [Requirements Engineering, pp. 33-45](<Slides/02.5 - Requirements Engineering.pdf#page=33>) | [Tutorial 9 - functional vs non-functional](Tutorials-master/tut09/README.md#part-1-functional-vs-non-functional); [good requirements](Tutorials-master/tut09/README.md#part-2-good-requirements); [Tutorial 10 requirements question](Tutorials-master/tut10/README.md#2-requirements-3-marks) |
| User stories, acceptance criteria, and use cases | [Requirements Engineering, pp. 46-60 and 65-69](<Slides/02.5 - Requirements Engineering.pdf#page=46>) | [Tutorial 9 - user stories](Tutorials-master/tut09/README.md#part-3-user-stories); [use cases](Tutorials-master/tut09/README.md#part-4-use-cases); [Tutorial 2 requirements/design exercise](Tutorials-master/tut02/README.md#part-2---pet-the-pixelpup) |
| Git solo workflow | [Git - Solo Usage, pp. 9-13](<Slides/01.4 - Git (Solo Usage).pdf#page=9>) | [Tutorial 1 - Git fundamentals](Tutorials-master/tut01/README.md#b-git-fundamentals) |
| Branches, merge requests, conflicts, and team Git | [Git - Team Usage, pp. 8-11](<Slides/01.5 - Git (Team Usage).pdf#page=8>); [Teamwork](<Slides/02.2 - Teamwork.pdf>) | [Tutorial 2 - Git for teamwork](Tutorials-master/tut02/README.md#a-git-for-teamwork); [branching](Tutorials-master/tut02/README.md#branching); [merge requests](Tutorials-master/tut02/README.md#making-a-merge-request); [merge conflicts](Tutorials-master/tut02/README.md#handling-merge-conflicts) |
| Continuous integration and pipelines | [Continuous Integration, pp. 3-18](<Slides/04.1 - Continuous Integration.pdf#page=3>) | [Tutorial 10 - deployment question](Tutorials-master/tut10/README.md#4-deployment-6-marks) |
| SDLC and Agile | [Software](<Slides/01.2 - Software.pdf>); [Agile, pp. 3-18](<Slides/09.1 - Agile.pdf#page=3>) | [Tutorial 2 - SDLC requirements to design](Tutorials-master/tut02/README.md#b-sdlc---requirements-to-design); [Tutorial 10 - SDLC question](Tutorials-master/tut10/README.md#1-sdlc-2-marks) |
| Deployment, continuous delivery, and continuous deployment | [Deployment content, pp. 3-18](<Slides/09.2 - Validation.pdf#page=3>) | [Tutorial 10 - deployment question](Tutorials-master/tut10/README.md#4-deployment-6-marks) |
| Validation and user acceptance testing | [Validation content, pp. 3-7](<Slides/09.3 - Deployment.pdf#page=3>) | [Tutorial 10 - SDLC question](Tutorials-master/tut10/README.md#1-sdlc-2-marks); [Tutorial 9 - requirements analysis](Tutorials-master/tut09/README.md#b-requirements-analysis) |
| Structural modelling: class, ER, and use-case models | [Conceptual Modelling, pp. 10-25](<Slides/07.5 - Conceptual Modelling.pdf#page=10>) | [Tutorial 2 - design interface and data](Tutorials-master/tut02/README.md#design-interface) |
| Behavioural modelling and state diagrams | [Conceptual Modelling Continued, pp. 5-14](<Slides/08.1 - Conceptual Modelling (Cont'd).pdf#page=5>) | [Tutorial 8 - state diagrams](Tutorials-master/tut08/README.md#a-state-diagram); [traffic lights](Tutorials-master/tut08/README.md#b-traffic-lights); [implementation](Tutorials-master/tut08/b.traffic/traffic.ts); [tests](Tutorials-master/tut08/b.traffic/traffic.test.ts) |
| Maintainability, coupling/cohesion, refactoring, DRY, KISS, and YAGNI | [Design for Maintainability, pp. 12-29](<Slides/08.2 - Design for Maintainability..pdf#page=12>) | [Tutorial 8 - DRY and KISS](Tutorials-master/tut08/README.md#c-dry--kiss); [refactoring exercise](Tutorials-master/tut08/c.drykiss/drykiss.ts); [Tutorial 10 - design principles](Tutorials-master/tut10/README.md#3-design-principles-5-marks) |
| Essential/accidental complexity and cyclomatic complexity | [Software Complexity, pp. 4-19](<Slides/08.3 - Software Complexity.pdf#page=4>) | [Tutorial 9 - complexity analysis](Tutorials-master/tut09/README.md#a-complexity-analysis); [Tutorial 10 - cyclomatic complexity](Tutorials-master/tut10/README.md#5-cyclomatic-complexity-2-marks) |

## Project-context and exam-reference decks

These are supporting sources rather than the fastest first stop for a single exam topic.

- [Course Overview](<Slides/01.1 - Course Overview.pdf>)
- [Software](<Slides/01.2 - Software.pdf>)
- [Iteration 0](<Slides/02.1 - Iteration 0.pdf>)
- [Teamwork](<Slides/02.2 - Teamwork.pdf>)
- [Iteration 1](<Slides/03.2 - Iteration 1.pdf>)
- [Iteration 2](<Slides/05.3 - Iteration 2.pdf>)
- [Industry Lecture 1](<Slides/08.4 - Industry Lecture 1.pdf>)
- [Exam Briefing](<Slides/10.1 - Exam Briefing.pdf>)
- [Tutorial repository overview](Tutorials-master/README.md)

## Repository caveats

- The filenames of the Week 9 deployment and validation decks are swapped: `09.2 - Validation.pdf` contains Deployment, while `09.3 - Deployment.pdf` contains Validation. The links above use the actual contents.
- `Tutorials-master` has no `tut06` directory in this checkout.
- Tutorial 7 says “Jest” in one paragraph, but its package files and tests use Vitest. Follow the supplied code and package configuration.
- The Tutorial 10 `q1.md`, `q2.md`, `q4.md`, and `q5.md` files are blank or answer templates, so the index links to the question sections in `tut10/README.md` instead.
