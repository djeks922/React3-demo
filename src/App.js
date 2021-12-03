import React, { useMemo, useRef, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import mirvari from "../src/assets/mirvari1.jpg";
import mirvariColor from "../src/assets/mirvari.png";
import { Suspense } from "react";

function Particles(props) {
  // const pointCount = 10000
  const branches = 4;
  const radius = 3;
  const height = 5;

  const [pointCount, setCount] = useState(10000);

  //texture
  const [mirvariAlphaT, mirvariMapT] = useTexture([mirvari, mirvariColor]);
  // console.log(mirvariAlphaT)

  // Attributes [position and color and etc]
  const [positions, colors] = useMemo(() => {
    let positions = [],
      colors = [];
    for (let i = 0; i < pointCount; i++) {
      const branchAngle =
        ((i % (pointCount / branches)) / (pointCount / branches)) * Math.PI * 2;
      const rad = Math.random() * radius;
      positions.push(Math.sin(branchAngle) * rad);
      positions.push(
        (Math.tan(
          ((i % (pointCount / branches)) / (pointCount / branches)) *
            Math.PI *
            0.25
        ) +
          Math.floor(i / (pointCount / branches))) *
          height
      );
      positions.push(Math.cos(branchAngle) * rad);
      colors.push(0);
      colors.push(0);
      colors.push(0);
    }
    return [new Float32Array(positions), new Float32Array(colors)];
  }, [branches, pointCount, radius, height]);

  const attrib = useRef();
  const hover = useCallback((e) => {
    // e.stopPropagation();
    // console.log(e.target)
    attrib.current.array[e.index * 3] += 1;
    attrib.current.array[e.index * 3 + 1] += 1.5;
    attrib.current.array[e.index * 3 + 2] += 0.7;
    attrib.current.needsUpdate = true;
    // console.log('girdi')
  }, []);

  const unhover = useCallback((e) => {
    // console.log(e.target)
    attrib.current.array[e.index * 3] -= 1;
    attrib.current.array[e.index * 3 + 1] -= 1.5;
    attrib.current.array[e.index * 3 + 2] -= 0.7;
    attrib.current.needsUpdate = true;
    // console.log('cixdi')
  }, []);

  return (
    <points {...props}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          ref={attrib}
          attachObject={["attributes", "color"]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        // vertexColors
        size={0.1}
        sizeAttenuation={true}
        map={mirvariMapT}
        alphaMap={mirvariAlphaT}
        transparent={true}
        depthWrite={false}
      ></pointsMaterial>
    </points>
  );
}

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
