import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Text, useGLTF } from '@react-three/drei';
import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const App = () => {
  const groundSize = 100;
  const monolithRadius = 25;
  const monoliths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  return (
    <Canvas
      shadows
      dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
      gl={{ antialias: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[monolithRadius / 2 + 2, 2, 0]}
        fov={60}
        rotation={[0, Math.PI / 2, 0]}
      />

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
      <FlyControls />
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
    <group {...props} position-y={0}>
      <Gendo position-y={1} />
      <mesh castShadow position-y={.25} scale={[1, 0.75, 3]}>
        <boxGeometry />
        <meshPhongMaterial color={0x1a1a1a} />
      </mesh>
    </group>
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

const Gendo = ({...props}) => {
  const { scene: gendo } = useGLTF('/models/gendo.glb');
  return <primitive {...props} object={gendo} scale={0.25} />
};

const FlyControls = () => {
  const { camera, gl } = useThree();
  const keysPressed = useRef<Set<string>>(new Set());
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isLocked = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return;

      const sensitivity = 0.002;
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= e.movementX * sensitivity;
      euler.current.x -= e.movementY * sensitivity;
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };

    const handleClick = () => {
      gl.domElement.requestPointerLock();
    };

    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [camera, gl]);

  useFrame((state, delta) => {
    const speed = 5;
    direction.current.set(0, 0, 0);

    // Forward/backward
    if (keysPressed.current.has('w')) direction.current.z -= 1;
    if (keysPressed.current.has('s')) direction.current.z += 1;

    // Left/right
    if (keysPressed.current.has('a')) direction.current.x -= 1;
    if (keysPressed.current.has('d')) direction.current.x += 1;

    // Up/down
    if (keysPressed.current.has(' ')) direction.current.y += 1;
    if (keysPressed.current.has('shift')) direction.current.y -= 1;

    direction.current.normalize().multiplyScalar(speed * delta);

    // Apply direction relative to camera orientation
    const moveVector = new THREE.Vector3();
    moveVector.copy(direction.current);
    moveVector.applyQuaternion(camera.quaternion);

    camera.position.add(moveVector);
  });

  return null;
};

export default App;