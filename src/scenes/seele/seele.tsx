import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import FlyControls from '../components/fly-controls';
import Monoliths from './monoliths';

const SeeleScene = () => {
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

export default SeeleScene;