import { useState, useRef, type ComponentProps } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Grid, useHelper, Text } from '@react-three/drei';

const App = () => {
  const meshRef = useRef(undefined);
  const groundSize = 100;
  const monolithRadius = 25;
  const monoliths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
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

      <Monoliths monolithRadius={monolithRadius} monoliths={monoliths} />

      {/* Grid */}
      {/* <Grid args={[40, 20]} cellColor={0x000000} sectionColor={0x000000} fadeStrength={0.2} /> */}

      {/* Controls */}
      <OrbitControls target={[0, 0.5, 0]} />
    </Canvas>
  );
}

type MonolithsProps = { monolithRadius: number, monoliths: string[] };
const Monoliths = ({ monolithRadius, monoliths }: MonolithsProps) => {
  return monoliths.map((monolithNumber, i) => {
    const radius = monolithRadius / 2; // - size
    const angle = (2 * Math.PI * i) / monoliths.length;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const rotation = -angle; // Rotate to face center
    if(monolithNumber === '01') return <Desk key={monolithNumber} position-x={x} position-z={z} rotation-y={rotation} />
    return <Monolith key={monolithNumber} x={x} z={z} rotation={rotation} number={monolithNumber} />;
  });
};

type MonolithProps = ComponentProps<'mesh'> & {
  number: string;
  x: number,
  z: number,
  rotation: number,
};
const Monolith = ({ number, x, z, rotation, ...props }: MonolithProps) => {
  // Calculate position for text on the front face of the monolith
  const textX = -0.26; // Just in front of the monolith face (monolith width/2 + small offset)

  return (
    <group>
      <mesh
        {...props} castShadow
        position={[x, 7.5, z]}
        scale={[0.5, 14, 3]}
        rotation-y={rotation}
      >
        <boxGeometry />
        <meshPhongMaterial color={0x1a1a1a} />
      </mesh>

      {/* Text labels on monolith face */}
      <group position={[x, 10, z]} rotation-y={rotation}>
        <Text
          position={[textX, 3.5, 0]}
          rotation-y={-Math.PI / 2}
          fontSize={0.65}
          color="#850000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Coolvetica Rg.otf"
        >
          SEELE
        </Text>

        <Text
          position={[textX, 2.6, 0]}
          rotation-y={-Math.PI / 2}
          fontSize={1.8}
          color="#9b0000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/MacEnvy DB Regular.ttf"
        >
          {number}
        </Text>

        <Text
          position={[textX, 0.75, 0]}
          rotation-y={-Math.PI / 2}
          fontSize={0.5}
          color="#850000"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          font="/fonts/Coolvetica Rg.otf"
        >
          SOUND{'\n'}ONLY
        </Text>
      </group>

      <MonolithLight x={x} z={z} rotation={rotation} />
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

type MonolithLightProps = {
  x: number;
  z: number;
  rotation: number;
};
const MonolithLight = ({ x, z, rotation }: MonolithLightProps) => {
  // Monolith base dimensions: width=0.5, depth=3
  return (
    <group position={[x, 0, z]} rotation-y={rotation}>
      {/* Directional light pointing upward - parallel rays, no cone */}
      <directionalLight
        position={[0, 0.1, 0]}
        target-position={[0, 10, 0]}
        intensity={0.5}
        castShadow
        color={0xffffff}
        shadow-camera-left={-0.3}
        shadow-camera-right={0.3}
        shadow-camera-top={1.5}
        shadow-camera-bottom={-1.5}
      />
      {/* Visual representation - glowing strip on ground */}
      <mesh position-y={0.02} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.5, 3]} />
        <meshStandardMaterial
          color={0xffffff}
          emissive={0xffffff}
          emissiveIntensity={2}
          side={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default App;