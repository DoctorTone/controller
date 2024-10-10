import { Vector3 } from "three";

const SCENE = {
  cameraPosition: new Vector3(0, 1.5, 1.5),
  UP: new Vector3(0, 1, 0),
  LOW_RES: 1024,
  MIN_DISTANCE: 0.15,
  MAX_DISTANCE: 4,
  LOOK_AT_Y: 1.18,
  UPDATE_INTERVAL: 5,
  MAX_INTENSITY: 20,
};

export { SCENE };
