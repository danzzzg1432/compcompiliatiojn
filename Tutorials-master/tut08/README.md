# Tutorial 8

[TOC]

## A. State Diagram

State diagrams are a type of behavioural model, that represent the state transitions of an object in response to actions or events.

Below is a state diagram of a grocery store checkout system (from the perspective of the user-machine interaction). Where;
- the circles represent `states` that the system is in
- the arrows between the circles represent `actions` that the user does to transition the system from one state to another

<details close>
<summary>click to view</summary>

![grocery-checkout-state-diagram](assets/grocery-checkout-state-diagram.png)
</details>

As a class, discuss why state diagrams are useful and give an example.

### Task
In groups, create a state diagram that describes the states and transitions that might occur in a game of 'hide and seek tag', from the perspective of the seeker.

The simplified rules to hide and seek tag are:
- Game starts with one seeker, and all other players hiding
- When the seeker spots somebody, they must tag them
- Players who get tagged join the game as an additional seeker

Consider how you could turn this into a state diagram, from seekers perspective. Some possible states and actions you could consider are:
- `States` (of the seeker): searching, suspicious, chasing
- `Actions` (of the player): player is visible, player runs away, player is hidden

Spend 10-15 minutes in groups designing the state diagram for this game. You are not limited to the above states and actions (so be creative!). You should aim to make the game as balanced as possible between the seekers and the players.

## B. Traffic Lights

Now that we've looked at how to illustrate a state machine, we'll look at how to turn one into code!

Below is a state diagram that represents a simple traffic light system. This system has three states (RED, YELLOW, GREEN), and three actions (CAR_WAITING, NO_CAR_WAITING, EMERGENCY) that are used to move between the states.

![coloured-traffic-state-diagram](assets/coloured-traffic-state-diagram.png)

This state diagram is to be implemented in [traffic.ts](b.traffic/traffic.ts), using the function `updateLight` to transition between states. Each time the state is changed, it should print to terminal `"Light has changed to 'STATE'"`.

<table>
  <tr>
    <th>Name & Description</th>
    <th>Input Parameters</th>
    <th>Returned Object</th>
    <th>Errors</th>
  </tr>
  <tr>
    <td>
      <code>updateLight</code>
      <br/><br/>
      <ul>
      <li>Updates the state of the traffic light (following the state diagram).</li>
      <li>It should print each state change to the terminal (eg. 'Light has changed to "RED"') </li>
      </ul>
    </td>
    <td>
        (action)
    </td>
    <td>
        <code>{}</code>
    </td>
    <td>
        Throw <code>{error}</code> when:
        <ul>
          <li>provided action is not valid for the current system state</li>
        </ul>
    </td>
  </tr>
</table>

### Task
In groups or as a class, use the state diagram to complete the function `updateLight` in [traffic.ts](b.traffic/traffic.ts).

Once you think your function is correct, you can test it by running the main program.

A test suite has also been provided, which can be used to check the correctness of your code.

## C. DRY & KISS

The code in [c.drykiss](c.drykiss/drykiss.ts) is unnecessarily complicated, and there is a lot of repetition. Take some time to refactor this code focusing on DRY and KISS principles to create a concise and easily-understood code.

Your tutor will split you up into groups. In 10 minutes, refactor the code into the least number of lines as possible using DRY and KISS principles (the group with the lowest number of lines, while still maintaining easy to read code, will win!)
