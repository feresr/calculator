import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Calculator from "/src/Calculator.jsx"

import "./App.css";
import { Suspense } from "react/cjs/react.production.min";

function CameraController() {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas >
        <CameraController />
        <Calculator/>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment background={true} preset={"apartment"}></Environment>
      </Canvas>
    </Suspense>
  );
}

export default App;
