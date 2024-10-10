import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import Lights from "./components/Lights";
import VRNavigation from "./components/VRNavigation";

const interactionsEnabled = true;
const store = createXRStore({ controller: { right: true } });

function App() {
  const [VRSupported, setVRSupported] = useState(false);

  useEffect(() => {
    const isVRSupported = async () => {
      if ("xr" in navigator) {
        const supported =
          await navigator.xr!.isSessionSupported("immersive-vr");
        if (supported) {
          setVRSupported(true);
        }
      }
    };

    isVRSupported();
  }, []);

  return (
    <>
      {VRSupported && (
        <div id="VR" className="panel">
          <button onClick={() => store.enterVR()}>Enter VR</button>
        </div>
      )}
      <Canvas>
        <XR store={store}>
          <Box>
            <meshStandardMaterial color={"blue"} />
          </Box>
          <Lights />
          {VRSupported && <VRNavigation />}
        </XR>
        <OrbitControls
          makeDefault
          enablePan={interactionsEnabled}
          enableRotate={interactionsEnabled}
          enableDamping={interactionsEnabled}
        />
      </Canvas>
    </>
  );
}

export default App;
