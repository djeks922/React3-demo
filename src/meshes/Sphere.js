// import { useFrame} from '@react-three/fiber'
// import {useState, useRef} from 'react'


const Sphere = (probs) => {

    // const ref2 = useRef();
    
    return (
        <mesh ref={ref2} {...probs} >
            <sphereBufferGeometry args={[0.5,32,32]}/>
            <meshStandardMaterial color="red" metalness={1}/>
        </mesh>
    );
};

export default Sphere;