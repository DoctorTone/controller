import { XRControllerComponent, XRControllerModel } from "@react-three/xr";
import React, { Suspense, useRef } from "react";
import { Box } from "@react-three/drei";
import { Object3D } from "three";

const CustomController = () => {
  return (
    <>
      <Suspense>
        <XRControllerModel />
        <XRControllerComponent id="thumbrest">
          <Box position-y={0.1} scale={0.01} />
        </XRControllerComponent>
      </Suspense>
    </>
  );
};

export default CustomController;
