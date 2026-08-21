type States = 'RED' | 'YELLOW' | 'GREEN';
type Actions = 'CAR_WAITING' | 'NO_CAR_WAITING' | 'WAIT_COMPELTE' | 'EMERGENCY';

interface Light {
  state: States
}

let light: Light = {
  state: "RED"
}

export function updateLight(action: Actions) {
  // TODO: complete me
}


// Functions for test suite

/**
 * Resets the state of the traffic lights back to RED
 */
export function reset() {
  light.state = "RED";
}

/**
 * Returns the current state of the traffic light
 */
export function getState() {
  return light.state;
}