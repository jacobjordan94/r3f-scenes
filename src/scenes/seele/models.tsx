import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';

const Gendo = ({...props}) => {
  const { scene: gendo } = useGLTF('/models/gendo.glb');
  return <primitive {...props} object={gendo} />
};
const Stairs = ({...props}) => {
  const { scene: stairs } = useGLTF('/models/stairs.glb');

  // Apply the same material to all meshes in the model
  stairs.traverse((child: any) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive {...props} object={stairs} />;
};

export default { Gendo, Stairs };