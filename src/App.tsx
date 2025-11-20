import { useState, useRef, type ComponentProps } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Grid, useHelper } from '@react-three/drei';

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

      <color attach="background" args={[0x0a0a0a]} />
      {/* <fog attach="fog" args={[0x0a0a0a, 10, 30]} /> */}

      {/* Lights */}
      <ambientLight intensity={0.1} />

      <directionalLight
        position={[0, 20, 10]}
        intensity={0.8}
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
    return <Tower key={towerNumber} x={x} z={z} rotation={rotation} number={towerNumber} />;
  });
};

type TowerProps = ComponentProps<'mesh'> & {
  number: string;
  x: number,
  z: number,
  rotation: number,
};
const Tower = ({ number, x, z, rotation, ...props }: TowerProps) => {
  return (
    <group>
      <mesh
        {...props} castShadow
        position={[x, 5.5, z]}
        scale={[0.5, 10, 3]}
        rotation-y={rotation}
      >
        <boxGeometry />
        <meshPhongMaterial color={0x1a1a1a} />
      </mesh>
      <TowerLight x={x} z={z} rotation={rotation} />
    </group>
  );
};

const Desk = ({...props}) => {
  return (
    <mesh {...props} castShadow position-y={.25} scale={[1, 0.75, 3]}>
      <boxGeometry />
      <meshPhongMaterial color={0x1a1a1a} />
    </mesh>
  );
};

type TowerLightProps = {
  x: number;
  z: number;
  rotation: number;
};
const TowerLight = ({ x, z, rotation }: TowerLightProps) => {
  const lightRef = useRef<any>(undefined);
  // Tower base dimensions: width=0.5, depth=3
  return (
    <group position={[x, 0, z]} rotation-y={rotation}>
      <rectAreaLight
        ref={lightRef}
        rotation-x={-Math.PI / 2}
        width={0.5}
        height={3}
        intensity={25}
        color={0xffffff}
      />
      {/* Visual representation */}
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.5, 3]} />
        <meshBasicMaterial color={0xffffff} side={2} toneMapped={false} />
      </mesh>
    </group>
  );
};

export default App;