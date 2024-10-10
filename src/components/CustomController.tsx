import { Suspense } from "react";
import { XRControllerComponent, XRControllerModel } from "@react-three/xr";
import { Container, Root, Text } from "@react-three/uikit";

const CustomController = () => {
  return (
    <>
      <Suspense>
        <XRControllerModel />
        <XRControllerComponent id="thumbrest">
          <group
            scale={0.0001}
            position={[-0.03, 0.035, 0.0125]}
            rotation-y={Math.PI}
          >
            <Root
              pixelSize={6}
              backgroundColor="white"
              borderRadius={8}
              padding={3}
            >
              <Text>Move</Text>
            </Root>
          </group>
        </XRControllerComponent>
      </Suspense>
    </>
  );
};

export default CustomController;
