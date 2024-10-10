import { useRef } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import {
  useLoadXRControllerLayout,
  useLoadXRControllerModel,
} from "@react-three/xr";
import { MeshBasicMaterial } from "three";
import DemoControllerComponent from "./DemoControllerComponent";
import { Container, Root, Text } from "@react-three/uikit";

const TutorialComponent = (props: Omit<GroupProps, "children">) => {
  const layout = useLoadXRControllerLayout(["meta-quest-touch-plus"], "right");
  const model = useLoadXRControllerModel(layout);
  const materialRef = useRef<MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current == null) {
      return;
    }
    materialRef.current.opacity =
      Math.sin(clock.getElapsedTime() * 10) * 0.25 + 0.5;
  });

  if (layout == null) {
    return null;
  }

  return (
    <group {...props}>
      <group position-y={1}>
        <primitive object={model} />
      </group>
      <DemoControllerComponent layout={layout} model={model} id="a-button">
        <Root
          transformTranslateY={-30}
          borderRadius={8}
          positionType="relative"
          backgroundColor="white"
          anchorY="bottom"
          pixelSize={0.0005}
          padding={12}
        >
          <Text>Press "A" Button{"\n"}for jumping</Text>
          <Container
            positionType="absolute"
            transformTranslateX="-50%"
            transformTranslateY="50%"
            positionLeft="50%"
            borderBottomLeftRadius={8}
            transformRotateZ={45}
            positionBottom={0}
            width={20}
            height={20}
            backgroundColor="white"
          ></Container>
        </Root>
        {/* <mesh>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial
            ref={materialRef}
            toneMapped={false}
            transparent
            opacity={0.2}
            color="green"
          />
        </mesh> */}
      </DemoControllerComponent>
      {/* <DemoControllerComponent layout={layout} model={model} id="b-button">
        <mesh>
          <sphereGeometry args={[0.25]} />
          <meshPhongMaterial
            transparent
            toneMapped={false}
            opacity={0.2}
            color="blue"
          />
        </mesh>
      </DemoControllerComponent> */}
    </group>
  );
};

export default TutorialComponent;
