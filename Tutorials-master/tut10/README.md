# Tutorial 10

[TOC]

## A. MyExperience

It's time to fill out MyExperience!

Your tutor will give you 5 minutes to fill out the MyExperience survey which you can access here: https://myexperience.unsw.edu.au/ or via the QR Code below:

![myExperience QR Code](assets/26T2-myExperience.png)

Please do so (even if it is just ticking the boxes) as the information is invaluable to us, and also because the cat below will be eternally unhappy otherwise!

![lulu](assets/lulu.jpg)

## B. Short Answer

Your tutor will pick a few of the sample questions below to complete.

### 1. SDLC (2 marks)

Consider this statement:

> The user shall be able to change their password if they forget it.

In `q1.md`, what part of the SDLC would you assume this statement was created in
if you saw this statement written down on an engineering document?

Justify your response.

### 2. Requirements (3 marks)

Consider this feedback from a COMP1531 student:

> Gitlab pipelines get so slow close to assignment deadlines and that's very
> frustrating! Just because lots of people are cramming just like me, and just
> because I could have planned my time better, doesn't mean I should be
> penalised like this, you know? 😈 The biggest issue I have is that when the
> pipelines are slow, even though I could run things locally, I don't have the
> confidence that my local code will work on CSE systems.

There is an implicit requirement in the above feedback.

In `q2.md`:
- Identify whether this implicit requirement is functional or non-functional (1 mark).
- Create one user story that captures the implicit requirement in the above feedback (2 marks).

### 3. Design Principles (5 marks)

Consider the code below and in `q3.md` answer the following questions:
```js
function normalizeDay(d) {
  if (d === "monday" || d === "Monday") return "monday";
  else if (d === "tuesday" || d === "Tuesday") return "tuesday";
  else if (d === "wednesday" || d === "Wednesday") return "wednesday";
  else if (d === "thursday" || d === "Thursday") return "thursday";
  else if (d === "friday" || d === "Friday") return "friday";
  else if (d === "saturday" || d === "Saturday") return "saturday";
  else if (d === "sunday" || d === "Sunday") return "sunday";
  else return null;
}

function dayToMessage(d) {
  if (d === "monday") {
    return "It's Monday!";
  } else if (d === "tuesday") {
    return "It's Tuesday! Exam DAY";
  } else if (d === "wednesday") {
    return "it's the middle of the work week!";
  } else if (d === "thursday") {
    return "Almost friday...";
  } else if (d === "friday") {
    return "Rebecca who?";
  } else if (d === "saturday") {
    return "yay weekend!";
  } else if (d === "sunday") {
    return "almost monday :(";
  } else {
    return null;
  }
}

function getMessageByDay(day) {
  const normalizedDay = normalizeDay(day);

  if (normalizedDay) {
    const message = dayToMessage(normalizedDay);
    console.log(message);
  } else {
    console.log("Invalid input. Exiting.");
  }
}

getMessageByDay('monday');
getMessageByDay('Thursday');
```

- a) Justify which design principle is being violated. (2 marks)
- b) Refactor the application code to fix the violated design principle. (3 marks)
  - You may add, modify, or remove code as you'd like.

### 4. Deployment (6 marks)

In `q4.md`, explain the difference between:
- Continuous Integration,
- Continuous Delivery,
- Continuous Deployment,

Give an example of each.

### 5. Cyclomatic Complexity (2 marks)

Consider the following code:

```js
function foo(flag) {
  if (flag) {
    console.log('Debug mode enabled');
  }

  let i = 0;
  while (i <= 9) {
    if (i % 3 === 0) {
      console.log(i * 3);
    } else if (i % 6 === 0) {
      console.log(i * 6);
    } else {
      console.log(i * 9);
    }
    i++;
  }

  console.log("done");
}
```

In `q5.md`, what is the cyclomatic complexity of the function `foo()`?

## C. Programming

Your tutor will pick a few of the sample questions below to complete.

### C1. Assorted Problem-Solving (10 marks)

This question is designed to assess your base JavaScript knowledge.

#### Task

Complete the functions in `c1/assorted.js` to answer all of the following:

- Returns an array containing elements that only exist in the first input array. (2 marks)
- Splits an array into chunks of a given size. (3 marks)
- Creates a copy of an object without the specified keys. (2 marks)
- Capitalizes the first letter of every word in a string. (3 marks)

#### Marking

When you think your program is working, you can run some simple automated checks:
- tests: `npm run test`

### C2. Files (6 marks)

Answer this question in `c2/cockroaches.ts`.

You find that your house is infested with cockroaches. One day it becomes too
much and you decide to keep a tally of where the cockroaches are each day. On
Monday, Tuesday and Wednesday you write the following files:

**monday.txt**:

```text
kitchen
bathroom
attic
```

**tuesday.txt**:

```text
backyard
kitchen
bedroom
attic
```

**wednesday.txt**:

```text
attic
bathroom
```

#### Task

Write a function `decontaminate(filenames)` in `cockroaches.ts` which takes a
list of filenames and counts the frequency of sightings in each file. Every line
in each file is a single string which is the sighting. For example, the
sightings in `wednesday.txt` are "attic" and "bathroom". The function returns an
object (frequency count) of sightings. Write the function to be
**type-safe** and **lint-free**.

The above example would return the following object:

```ts
{ kitchen: 2, attic: 3, bathroom: 2, bedroom: 1, backyard: 1 }
```

If any of the filenames cannot be opened for reading,
**your code should throw an `Error`**.

Please note:
* You can assume files will be in a `locations/` folder in `c2/`.
* You can assume the files only contain these sightings:
    - attic
    - bathroom
    - backyard
    - bedroom
    - kitchen

#### Marking
When you think your program is working, you can run some simple automated tests:
- type-saftey: `npm run tsc`
- lint: `npm run lint`
- tests: `npm run test`

You are not allowed to use comments which disable lint and type-check in your
code - these will result in an automatic zero mark. This includes:
`eslint-disable`, `eslint-disable-line`, `@ts-ignore`, `@ts-expect-error`, etc.

## D. End

It's important to take care of yourself!

Here are some [tips from UNSW](https://unsw.sharepoint.com/:p:/s/COMP153125T3Tutors-ADMINExam/EXwqOGJQTbhEt-S0FPdnmKgBySMWy1n-LGrgw9GBruof5Q?e=zTdcvT) so you can do your best on the day.
