import Models from './models';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Desk = ({...props}) => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
      if (spotLightRef.current && targetRef.current) {
        spotLightRef.current.target = targetRef.current;
      }
  }, []);

  return (
      <group {...props} position-y={0}>
        <Models.Gendo position-y={0.624} position-x={-0.35} rotation={[0, -(Math.PI / 2), 0]} scale={0.25} />

        {/* Spotlight target */}
        <object3D ref={targetRef} position={[-0.35, 0, 0]} />

        <spotLight
          ref={spotLightRef}
          position={[2, 3, 0]}
          angle={Math.PI / 3}
          penumbra={0.3}
          intensity={40}
          distance={10}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={10}
          shadow-bias={-0.001}
          color={0xffffff}
        />
        <mesh castShadow receiveShadow position-y={.25} scale={[1.5, 0.75, 2]}>
          <boxGeometry />
          <meshPhongMaterial color={0x1a1a1a} />
        </mesh>
        {/* Test sphere to verify shadows */}
        <Models.Stairs position={[1.6, -1.062, 0.9]} scale={0.03} />
      </group>
  );
};

export default Desk;