import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const SeeleLogo = () => {
  const { gl } = useThree();
  const texture = useTexture('/images/seele-logo.webp');
  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

  useEffect(() => {
    texture.anisotropy = maxAnisotropy;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture, maxAnisotropy]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default SeeleLogo;