import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

import { Suspense } from "react";



const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <Particles position={[0, -4, 0]} />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
};

export default App;
