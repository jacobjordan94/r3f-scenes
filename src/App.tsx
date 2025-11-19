import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
};

export default App;