# Tutorial 9

[TOC]

## A. Complexity Analysis

Below are solutions to `lab01_leap`. In groups of 2-3, draw a control flow graph
for the code shown on the screen  and calculate the resulting cyclomatic
complexity.

1. `isLeap`:
    ```ts
    const isLeap = (year: number) => {
      let result: boolean;
      if (year % 4 !== 0) {
        result = false;
      } else if (year % 100 !== 0) {
        result = true;
      } else if (year % 400 !== 0) {
        result = false;
      } else {
        result = true;
      }
      return result;
    };
    ```

1. `getNextLeap`:
    ```ts
    const getNextLeap = (year: number) => {
      let nextLeap = year + 1;
      while (!isLeap(nextLeap)) {
        nextLeap++;
      }
      return nextLeap;
    };
    ```

1. `countLeaps`:
    ```ts
    const countLeaps = (yearArray: number[]) => {
      let count = 0;
      for (const year of yearArray) {
        if (isLeap(year)) {
          count++;
        }
      }
      return count;
    };
    ```

## B. Requirements Analysis

### Part 1: Functional vs Non-Functional

- What is the difference between functional and non-functional requirements?

- Are the following requirements functional or non-functional?

  1. The messaging system shall let users upload profile pictures.

  2. The maximum image upload size shall be 5 MB.

  3. The website should be able to handle 20 million users with a latency (response time) smaller than 0.5 seconds.

  4. The default background colour for chat windows will be blue and have a hexadecimal RGB colour value of 0x0000FF.

  5. The software should be portable. So moving from one Operating System (OS) to another will not create any problems.

  6. The system shall send password reset emails.

### Part 2: Good Requirements

Your tutor will break you up into random groups to complete this activity. Answer the questions below:

1. What are some attributes of good requirements?

1. Consider the text below:
    ```
    I want a burger with lots of pickles and mayo but I need to make sure that the mayo doesn't make the burger bun really wet.
    Oh, and it needs to be warm, like, made less than 5 minutes ago warm but not so hot that I burn myself. I'm also not a big fan of plastic containers so if it could be in a paper bag that would be good. Actually, make that a brown paper bag, I like the colour of that. Also also, I hate it when my hands get oily so could you please give me something to wipe them with after.
    ```
    How could we clean this up into well-described requirements, from
    1. The Maccas customer to the staff taking the order

    1. The staff taking the order to the kitchen

### Part 3: User Stories

Consider the some requirements of Unigotchi:

Ability to:
1. Register, login and log out
1. Create, view and modify universes
1. Create a simulation, view and list simulation details
1. Inside a simulation, take different simulation actions within restrictions
1. ...

Pick **one** of the above and write a series of user stories that encompass each requirement:

1. Discuss as a class the potential target audience, and use this as your type of user;
* Write acceptance criteria for each story and discuss when to use Scenario-based and Rule-based acceptance criteria

### Part 4: Use Cases

Pick **one** of the above requirements you have written stories for and write a use case for the flow of interaction.

