import { useGLTF, useTexture } from "@react-three/drei";
import type { ComponentProps } from "react";
import * as THREE from "three";
import { type GLTF } from 'three-stdlib';
import { useSpring, animated } from '@react-spring/three';

type GameboyProps = ComponentProps<'group'>;
const Gameboy = ({children, ...props}: GameboyProps) => {
    const { nodes, materials } = useGLTF('/models/GameBoy-transformed.glb');
    return (
        <group {...props} dispose={null}>
            <mesh geometry={(nodes['node-0'] as THREE.Mesh).geometry} material={materials.lambert2SG}>
                { children }
            </mesh>
        </group>
    )
};

type CartridgeGLTFResult = GLTF & {
    nodes: {
        Cube001_Cart_0: THREE.Mesh
        Cube001_Screw_0: THREE.Mesh
        Cube001_Sticker_0: THREE.Mesh
        Cube001_NormalMap_0: THREE.Mesh
    }
    materials: {
        Cart: THREE.MeshStandardMaterial
        Screw: THREE.MeshStandardMaterial
        Sticker: THREE.MeshStandardMaterial
        NormalMap: THREE.MeshStandardMaterial
    }
    //   animations: GLTFAction[]
}
type CartridgeProps = ComponentProps<'group'> & {
    imageUrl: string;
    repeat?: number[];
    center?: number[];
    isHovered?: boolean;
};
const Cartridge = ({
    imageUrl,
    repeat = [1.78, 2.2],
    center = [0.475, 0.45],
    isHovered = false,
    ...props
}: CartridgeProps)=> {
    const { nodes, materials } = useGLTF('/models/cartridge.glb') as any as CartridgeGLTFResult;
    const texture = useTexture(imageUrl);

    // Make texture smaller by scaling it down
    texture.repeat.set(repeat[0], repeat[1]); // smaller = more zoomed out/smaller texture
    texture.center.set(center[0], center[1]); // Center the texture

    const { scale, positionY } = useSpring({
        scale: isHovered ? 1.15 : 1,
        positionY: isHovered ? 0.5 : 0,
        config: { tension: 300, friction: 20 }
    });

    return (
        <animated.group {...props} dispose={null} scale={scale} position-y={positionY} rotation={[Math.PI / 2, Math.PI, -Math.PI / 2]}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Cube001_Cart_0 as THREE.Mesh).geometry}
                material={materials.Cart}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Cube001_Screw_0 as THREE.Mesh).geometry}
                material={materials.Screw}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Cube001_Sticker_0 as THREE.Mesh).geometry}
            >
                <meshStandardMaterial map={texture} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Cube001_NormalMap_0 as THREE.Mesh).geometry}
                material={materials.NormalMap}
            />
        </animated.group>
    );
}

useGLTF.preload('/cartridge.glb')
useGLTF.preload('/GameBoy-transformed.glb')

export default { Gameboy, Cartridge };