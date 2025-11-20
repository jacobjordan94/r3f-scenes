import { useState, useRef, type ComponentProps } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Grid } from '@react-three/drei';

const App = () => {
  const meshRef = useRef(undefined);
  const groundSize = 25;
  const towers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  return (
    <Canvas
      shadows
      dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
      gl={{ antialias: true }}
    >
      <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={45} />
      
      <color attach="background" args={[0xa0a0a0]} />
      {/* <fog attach="fog" args={[0xa0a0a0, 20, 20]} /> */}

      {/* Lights */}
      <hemisphereLight position={[0, 20, 0]} intensity={3} args={[0xffffff, 0x444444]} />
      
      <directionalLight
        position={[0, 20, 10]}
        intensity={3}
        castShadow
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-camera-right={2}
      />

      {/* Ground */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[groundSize, groundSize]} />
        <meshPhongMaterial color={0x000} depthWrite={false} />
      </mesh>

      <Towers groundSize={groundSize} towers={towers} />

      {/* Grid */}
      {/* <Grid args={[40, 20]} cellColor={0x000000} sectionColor={0x000000} fadeStrength={0.2} /> */}

      <mesh ref={meshRef} castShadow position-y={0} position-x={0} position-z={0}>
        <boxGeometry />
        <meshPhongMaterial color={0x00ffff} />
      </mesh>

      {/* Controls */}
      <OrbitControls target={[0, 0.5, 0]} />
    </Canvas>
  );
}

type TowersProps = { groundSize: number, towers: string[] };
const Towers = ({ groundSize, towers }: TowersProps) => {
  return towers.map((towerNumber, i) => {
    const radius = groundSize / 2; // - size
    const angle = (2 * Math.PI * i) / towers.length;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const rotation = -angle; // Rotate to face center
    if(towerNumber === '01') return <Desk key={towerNumber} position-x={x} position-z={z} rotation-y={rotation} />
    return <Tower key={towerNumber} position-x={x} position-z={z} rotation-y={rotation} number={towerNumber} />;
  });
};

type TowerProps = ComponentProps<'mesh'> & {
  number: string;
};
const Tower = ({ ...props }: TowerProps) => {
  return (
    <mesh {...props} castShadow position-y={5} scale={[0.5, 10, 3]}>
      <boxGeometry />
      <meshPhongMaterial color={0xfff} />
    </mesh>
  );
};

const Desk = ({...props}) => {
  return (
    <mesh {...props} castShadow position-y={.25} scale={[1, 0.75, 3]}>
      <boxGeometry />
      <meshPhongMaterial color={0xfff} />
    </mesh>
  );
};

export default App;