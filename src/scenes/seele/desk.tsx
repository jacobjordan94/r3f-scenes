import Models from './models';

const Desk = ({...props}) => {
  return (
    <group {...props} position-y={0}>
      <Models.Gendo position-y={0.624} position-x={-0.35} rotation={[0, -(Math.PI / 2), 0]} scale={0.25} />
      <spotLight
        position={[-0.35, 3, 0]}
        target-position={[-0.35, 0.624, 0]}
        angle={Math.PI}
        penumbra={1}
        intensity={100}
        castShadow
        color={0xffffff}
      />
      <mesh castShadow position-y={.25} scale={[1.5, 0.75, 2]}>
        <boxGeometry />
        <meshPhongMaterial color={0x1a1a1a} />
      </mesh>
      <Models.Stairs position={[1.6, -1.062, 0.9]} scale={0.03} />
    </group>
  );
};

export default Desk;