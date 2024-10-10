import { useRef, useEffect } from "react";
import { useXRInputSourceState, XROrigin } from "@react-three/xr";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Vector3, Box3, Mesh } from "three";
import { SCENE } from "../state/Config";

const VRNavigation = () => {
  const rightController = useXRInputSourceState("controller", "right");
  let tempVec = new Vector3();
  const collisionObjects = useRef<Box3[]>([]);
  const ref = useRef<Group>(null);
  const { gl, camera, scene } = useThree();
  const cam = gl.xr.isPresenting ? gl.xr.getCamera() : camera;
  let collided = false;
  let currentBox;
  const lastCamPosition = new Vector3();

  useFrame((_, delta) => {
    if (ref.current == null || rightController == null) {
      return;
    }
    const thumstickState = rightController.gamepad["xr-standard-thumbstick"];
    if (thumstickState == null) {
      return;
    }
    // @ts-ignore - cameras does exist on this object
    cam.cameras[0].getWorldDirection(tempVec);

    ref.current.position.x += -tempVec.x * (thumstickState.yAxis ?? 0) * delta;
    ref.current.position.z += -tempVec.z * (thumstickState.yAxis ?? 0) * delta;

    // Sideways movement
    tempVec.crossVectors(SCENE.UP, tempVec);
    ref.current.position.x += -tempVec.x * (thumstickState.xAxis ?? 0) * delta;
    ref.current.position.z += -tempVec.z * (thumstickState.xAxis ?? 0) * delta;

    // Collision detection
    collided = false;
    for (let i = 0; i < collisionObjects.current.length; ++i) {
      currentBox = collisionObjects.current[i];
      if (currentBox!.containsPoint(ref.current.position)) {
        collided = true;
        ref.current.position.copy(lastCamPosition);
        break;
      }
    }
    if (!collided) {
      lastCamPosition.copy(ref.current.position);
      collided = false;
    }
  });

  return <XROrigin ref={ref} />;
};

export default VRNavigation;
