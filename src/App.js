import React, { useMemo, useRef, useCallback } from "react";
import { Canvas, useThree, } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function Particles({ pointCount,branches,radius,height }) {

  const raycaster = useThree((state) => state.raycaster);
  console.log(raycaster)
  const [positions, colors] = useMemo(() => {
    let positions = [],
        colors = [];
    for (let i = 0; i < pointCount; i++) {
      const branchAngle =  ((i % (pointCount/branches)) / (pointCount/branches)) * Math.PI * 2;
      const rad = Math.random() * radius
      positions.push( Math.sin( branchAngle ) * rad);
      positions.push((Math.tan(i%(pointCount/branches)/(pointCount/branches)* Math.PI * 0.25) + Math.floor(i/(pointCount/branches)))* height);
      positions.push( Math.cos( branchAngle ) * rad);
      colors.push(0);
      colors.push(0);
      colors.push(0);
    }
    return [new Float32Array(positions), new Float32Array(colors)];
  }, [pointCount]);

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
    <points onPointerOver={hover} onPointerOut={unhover}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={attrib}
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          
          attachObject={["attributes", "color"]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        vertexColors
        size={10}
        sizeAttenuation={false}
        
      />
    </points>
  );
}

const App = () => {

  return (
    <Canvas camera={{ position: [0, 0, 5] }} >
      
      <Particles radius={5} branches = {10} pointCount={10000} height={15} />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
