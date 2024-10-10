import { Vector3 } from "three";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight
        intensity={10}
        decay={0}
        distance={10}
        position={new Vector3().fromArray([2, 2, 2])}
      />
    </>
  );
};

export default Lights;
