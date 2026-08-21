# Tutorial 2

[TOC]

## A. Git for Teamwork

> 25 minutes

### Branching
To ensure our repository always contains a stable, bug-free version of our code,
we need a way to manage incomplete or experimental code. Enter branches!

Branches allow multiple people to collaborate on the same repository at the same
time without affecting the master branch or interfering with each other's work.

Let's see all the branches we have in our repo by running
```sh
$ git branch (lists all branches in your local repo)
$ git branch -r (lists all branches in your remote repo)
$ git branch -a (lists all branches in your local and remote repo)
```
> <details close>
> <summary> Click to view example</summary>
>
> ![git-branch-options](/tut02/assets/git-branch-options.png)
> </details>

You should see the `master` branch listed and in green or highlighted. This
tells us that we have 1 branch in our repo and we're currently on it.

We want to keep the `master` branch stable, so let's create another branch to
work on.
```sh
$ git branch alex-branch
```
now let's check our branches
```sh
$ git branch
```
You'll see `alex-branch` added to the list of branches, but the master branch
will still be green.

> <details close>
> <summary> Click to view example</summary>
>
> ![git-branch-create](/tut02/assets/git-branch-create.png)
> </details>

To switch to the branch we just created, we need to use
```sh
$ git checkout alex-branch
```

> <details close>
> <summary> Click to view example</summary>
>
> ![git-checkout-branch](/tut02/assets/git-checkout-branch.png)
> </details>

Now we can start modifying code. Make some changes to a file, add, commit and then push.

When pushing for the first time, you may be prompted with
```sh
$ git push --set-upstream origin alex-branch
```
This command specifies where we push our code to. Once executed, it will create
a new branch on the remote repo with the same name and "link" the two branches
together. Subsequent pushes from our local branch will be sent to this newly
created branch on the remote repository.

> <details close>
> <summary> Click to view example</summary>
>
> ![git-push-set-upstream](/tut02/assets/git-push-set-upstream.png)
> </details>
</br>

Note: a new branch can also be made by running
```sh
$ git checkout -b <branch name>
```
These commands are a combination of `git branch` and `git checkout` as it makes
a new branch and switches to it.

> <details close>
> <summary> Click to view example</summary>
>
> ![git-checkout-create-switch](/tut02/assets/git-checkout-create-switch.png)
> </details>

### Making a merge request
After pushing, we notice that the changes we made aren't reflected in the master
branch. To integrate the changes from our branch into the master branch, we can
use merge requests.

You may see something like this after pushing. Clicking the link will take you
to gitlab where you can create a merge request to master.
```
remote: To create a merge request for alex-branch, visit:
remote: <link here>
```

Alternatively, you can create a merge request via the GitLab interface i.e. the
"Merge Requests" tab in the sidebar of the repository.
> <details close>
> <summary> Click to view example</summary>
>
> 1. Go to "Merge Requests" in the side bar.</br>
>   ![gitlab-sidebar-mr](/tut02/assets/gitlab-sidebar-mr.png)
>
> 1. Select the branch you want to merge.<br/>
>   ![gitlab-create-mr](/tut02/assets/gitlab-create-mr.png)
>
> 1. Fill out the form and create.<br/>
>   ![gitlab-create-mr-form](/tut02/assets/gitlab-create-mr-form.png)
> </details>
<br/>

**!! For your project, you will need someone else to review your code and
approve it before you can merge it into master !!**

Why is it important to create merge requests instead of pushing directly into
master when you're done?

> It allows your teammates to review your code, provide feedback, and suggest
> improvements before it gets merged into the master branch.

### Handling merge conflicts

While Git is great at merging code changes automatically, it can struggle
sometimes, especially when two people modify the same part of code
simultaneously. In such cases, Git can’t determine how to merge the changes,
resulting in a merge conflict.

Learning how to resolve merge conflicts properly is important!

Firstly, let's create a merge conflict.
1. On `alex-branch`, edit an existing file and add some code to line 1. Save the
   changes, then add, commit, and push them.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-alex-branch-edit](/tut02/assets/merge-conflict-alex-branch-edit.png)
   > </details>

2. From the **master branch**, create a new branch called `bob-branch` and checkout to it.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-create-bob-branch](/tut02/assets/merge-conflict-create-bob-branch.png)
   > </details>

3. On `bob-branch`, edit the **same file** and add some lines of code to line 1
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-bob-branch-edit](/tut02/assets/merge-conflict-bob-branch-edit.png)
   > </details>

4. Save the changes, then add, commit, and push them.
5. Create merge requests from both `alex-branch` and `bob-branch` into the
   master branch.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-mrs-alex-bob](/tut02/assets/merge-conflict-mrs-alex-bob.png)
   > </details>

6. Accept the merge request from `alex-branch`.
7. Check `bob-branch`. The merge request from `bob-branch` should now show a
   merge conflict.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-alex-branch-edit](/tut02/assets/merge-conflict-mrs-alex-merged-bob-conflict.png)
   > </details>

How do we resolve this merge conflict?

> <details close>
> <summary> Click to view solution.</summary>
>
> To resolve a merge conflict, let's recreate the conflict locally, resolve the
> conflicting file/s, and push up changes that will not conflict.
>
> 1. Checkout to `bob-branch` and pull from the remote `master` branch, i.e. the
>    branch `bob-branch` is in conflict with, using:
>    ```sh
>    $ git pull origin master
>    ```
>    This should cause a local conflict.
>
>    ![merge-conflict-recreate-conflict-locally-on-bob-branch](/tut02/assets/merge-conflict-recreate-conflict-locally-on-bob-branch.png)
>
> 2. Resolve the merge conflict by combining code how you like, then commit
>    changes before pushing.
>
>     Conflicts are shown with "markers" that git adds during the merge. These
>     indicate the differences between the conflicting commits, which require a
>     human to manually resolve. There can be multiple conflicts in one file.
>
>     ![merge-conflict-markers](/tut02/assets/merge-conflict-markers.png)
>
>     Your editor may also help highlight conflicts and give you shortcuts to
>     resolving them. For example, VSCode presents conflicts like so:
>
>     ![merge-conflict-markers-vscode](/tut02/assets/merge-conflict-markers-editor.png)
>
>     In this case, let's resolve the conflict by combining both changes. Don't
>     forget to remove the conflict markers `<<< === >>>`!
>
>    ![merge-conflict-resolved-editor](/tut02/assets/merge-conflict-resolved-editor.png)
>
>     Then add and commit the fixed file. This indicates to git the conflict is
>     resolved.
>
>     ![merge-conflict-resolved-add-commit-push](/tut02/assets/merge-conflict-resolved-add-commit.png)
>
> 3. Finally, we can git push, and our merge request should no longer conflict.
>
>     ![merge-conflict-resolved-mr-ready](/tut02/assets/merge-conflict-resolved-mr-ready.png)
> </details>


## B. SDLC - Requirements to Design

> 15 mins

![SDLC](assets/sdlc.png)

In this tutorial, we'll briefly discuss a simplified version of the first few stages of the SDLC; Requirements Analysis and Design.

### Part 1 - Nontendi PixelPups

You've been hired by Nontendi to develop a game called PixelPups to help students relax. It's a simulation game about taking care of a dog.

Our goal is to figure out what functions we need to develop and what data we need to store to make the game work.

#### Requirements: Elicitation

Your tutor has held a quick interview with a Nontendi representative. The interview was completed over the phone, so they have written some notes from the discussion.
- When I play the game I want to be able to start by adopting a dog!
- In fact, I should be able to adopt multiple dogs! Just maybe not too many…
- I should be able to name my dog! And all my dogs should have unique names so I don’t mix them up.
- I want to be able to feed my dog when it's hungry. But not overfeed them, so they have a long and healthy life.


#### Requirements: Analysis

Question: Before we jump into coding, what would you do next to figure out which functions to develop?

<details close>
<summary> Click to view SOLUTION.</summary>
  We would convert the requirements into user-centered, actionable pieces of work.
</details>

We can do this through user stories and acceptance criteria.

<details close>
<summary> Click to view example requirement breakdown.</summary>

- US1: As a student, I want to be able to adopt a dog in the game, so I can start taking care of it.
  - AC1: Adopted dogs should have a unique name.
  - AC2: The student should only be able to adopt three dogs at a time.
- US2: As a student, I want to feed my dog, so that my dog isn’t hungry.
  - AC1: Dogs shouldn't accept food if they’re full.

</details>

#### Design: Interface

Now that we have actional requirements, let's design an interface table and data structure for the game.

This has been provided for us in the table below.

<table>
  <thead>
    <tr>
      <th>Name & Description</th>
      <th>Parameters</th>
      <th>Return Type</th>
      <th>Errors</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>adopt</code>
        <br/>Adopt a new puppy and give it a name.
      </td>
      <td>(name)</td>
      <td><code>{} | Error</code></td>
      <td>
        <code>NON_UNIQUE_NAME</code> – if user has already adopted a puppy with the same name<br>
        <code>PACK_LIMIT</code> – if user has already adopted 3 puppies
      </td>
    </tr>
    <tr>
      <td>
        <code>actionFeed</code>
        <br/>Feed a dog and show their updated hunger level from 1 to 5.
      </td>
      <td>(name)</td>
      <td><code>hungerLevel | Error</code></td>
      <td>
        <code>DOG_NOT_FOUND</code> – if given name doesn’t match the name of our dog<br>
        <code>PUPPY_IS_FULL</code> – if puppy is not hungry and already full they cannot be fed
      </td>
    </tr>
  </tbody>
</table>

As part of our interface design, we'll also note down the data types required.
<table>
  <thead>
    <tr>
      <th>If the parameter / variable name…</th>
      <th>It is of type…</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
    </tr>
    <tr>
      <td><code>hungerLevel</code></td>
      <td><code>number</code> - ranging from 1..5 (full to famished)</td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td><code>string</code> - classified type of error</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td><code>string</code> - human readable error mesage</td>
    </tr>
    <tr>
      <td><code>Error</code></td>
      <td>
        Object with keys <code>{ error, message }</code>.
        <br/>
        Example: <code>{ error: 'PACK_LIMIT', message: "You've adopted the maximum amount of dogs!" }</code>
      </td>
    </tr>
  </tbody>
</table>


#### Design: Data

Before we begin writing our functions, we also need to consider how we will store our data. For our purposes we will simply store everything we need into one variable.

To help us visualise the structure of this variable, let’s consider how our database will look like with dummy values.

```js
const dogPile = [
  {
    name: "Arker",
    hungerLevel: 1,
  },
  {
    name: "Bruno",
    hungerLevel: 5,
  },
];
```

Now that the design has been completed developers can create the game!

### Part 2 - Pet the PixelPup

After completing the core features of PixelPups, the Nontendi market research team has come back with new requirements.

#### Requirements
It turns out, people want to pet their dogs! Users report:
- I want to be able to pet my dog to increase our bond!
- My dog should only let me pet them, if I call their name
- The more I pet my dog, the more it should “woof”, to give me security in my relationship with my dog.

Your tutor quickly converts the new requirement into the following user story:
- US3: As a user, I want to pet my dog, to improve our bond.
  - AC1: If the user incorrectly calls their dog, it will refuse pets and their bond will decrease
  - AC2: Every time dog is pet, it replies with more "woof"s to show affection from their bond, e.g. 2 pets is 2 “woof”s

#### Design

1. Given the new set of requirements and corresponding user stories, as a class, brainstorm a new feature and add corresponding function/s to the interface table.

    > - Note that US3-AC1 can be implemented in different ways, e.g. the return may be { bark: “woof woof woof” }or just {numWoof: 3}

    > <details close>
    > <summary> Click to view potential SOLUTION.</summary>
    >
    > Interface: Functions
    > <table>
    >   <thead>
    >     <tr>
    >       <th>Name & Description</th>
    >       <th>Parameters</th>
    >       <th>Return Type</th>
    >       <th>Errors</th>
    >     </tr>
    >   </thead>
    >   <tbody>
    >     <tr>
    >       <td>
    >         <code>actionPet</code>
    >         <br/>Pet a dog, <code>numPets</code> times, after calling its name.
    >       </td>
    >       <td>(name, numPets)</td>
    >       <td><code>numWoofs | Error</code></td>
    >       <td>
    >         <code>DOG_NOT_FOUND</code> – if given name doesn’t match the name of our dog
    >         <br>
    >         <code>INVALID_PETS</code> – if `numPets` is less than 1
    >       </td>
    >     </tr>
    >   </tbody>
    > </table>
    >
    >  Interface: Data Types
    > <table>
    >   <thead>
    >     <tr>
    >       <th>If the parameter / variable name…</th>
    >       <th>It is of type…</th>
    >     </tr>
    >   </thead>
    >   <tbody>
    >     <tr>
    >       <td><code>numPets</code></td>
    >       <td><code>number</code></td>
    >     </tr>
    >     <tr>
    >       <td><code>numWoofs</code></td>
    >       <td><code>number</code> - number of "woofs" representing the student's bond with their dog</td>
    >     </tr>
    >   </tbody>
    > </table>
    >
    > </details>
    >

2. Given your new interface design, update the sample data structure in [puppy.js](puppy.js).

    > <details close>
    > <summary> Click to view potential SOLUTION.</summary>
    >
    > ```js
    > const dogPile = [
    >   {
    >     name: "Bruno",
    >     hungerLevel: 1,
    >     // New data to store
    >     bondLevel: 0,
    >   }
    > ];
    > ```
    > </details>
    >

## C. Style

> 5 mins

It's important to maintain good style across a codebase, while JavaScript is a different from C, most styling rules taught in 1511 still apply.

Take a look at [style.js](style.js). It contains many style issues. You will have 2 minutes to review the code and identify as many style issues as you can!

[Hint] Check out the course style-guide here: https://cgi.cse.unsw.edu.au/~cs1531/26T2/style-guide

> <details close>
> <summary> Click to view SOLUTION! </summary>
>
> - More descriptive variable names (instead of x y z, use sum, average and user)
> - Consistent and proper spacing
> - Consistent indentation (we use 2-space indentation in 1531)
> - Use a for-of loop instead of c-style and for-in loops
> - `const` instead of `let`
>
>
> ```js
> // Is there someone taller than 190cm? What about 195cm?
> let flag = 1;
> for (const user of userData) {
>   if (user.height > 190) {
>     console.log(true);
>     flag = 0;
>   }
> }
> if (flag) {
>   console.log(false);
> }
>
> // What is Jason's age?
> let jason;
> for (user of userData) {
>   if (user.name === 'Jason') {
>     jason = user;
>   }
> }
> console.log(`Jasons age is: ${jason.age}`)
>
> // What's the average height of all users?
> let sum = 0;
> for (user of userData) {
>   sum += user.height;
> }
> let average = sum / userData.length;
> console.log(average);
> ```
>
> We can take this even further with array methods.
>
> ```js
> // Is there someone taller than 190cm? What about 195cm?
> const flag = userData.some(user => user.height > 190);
> console.log(!flag);
>
> // What is Jason's age?
> const jason = userData.find(user => user.name === 'Jason');
> console.log(`Jasons age is: ${jason.age}`);
>
>
> // What's the average height of all users?
> const sum = userData.reduce((sum, user) => sum += user.height, 0);
> const average = sum / userData.length;
> console.log(average);
> ```
> </details>
