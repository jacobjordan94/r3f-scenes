import * as THREE from 'three'
import { useRef, type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'

type GLTFShotgunResult = GLTF & {
    nodes: {
        o_M000: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshStandardMaterial
    }
}

const Shotgun = (props: JSX.IntrinsicElements['group']) => {
    const { nodes, materials } = useGLTF('/models/shotgun.glb') as any as GLTFShotgunResult;
    return (
        <group {...props} dispose={null} rotation={[0, Math.PI / 2, 0]}>
            <mesh castShadow receiveShadow geometry={nodes.o_M000.geometry} material={materials.tile0}
                rotation={[Math.PI, -0.0008726646, 2.88118953]}
            />
        </group>
    );
}

type GLTFMagnumResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
        M002: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshStandardMaterial
    }
}

const Magnum = (props: JSX.IntrinsicElements['group']) => {
    const { nodes, materials } = useGLTF('/models/magnum.glb') as any as GLTFMagnumResult;
    return (
        <group {...props} dispose={null} rotation={[0, Math.PI / 2, 0]}>
            {/* <mesh castShadow receiveShadow geometry={nodes.M000.geometry} material={materials.tile0} /> */}
            <mesh castShadow receiveShadow geometry={nodes.M001.geometry} material={materials.tile0}
                position={[0.358, -0.656, -0.525]}
                rotation={[1.4117968, -0.1366593, 0.1459095]}
            />
            <mesh castShadow receiveShadow geometry={nodes.M002.geometry} material={materials.tile0}
                position={[0, -0.657, 0]}
                rotation={[-1.5688765, 0.000698132, -0.86306532]}
            />
        </group>
    )
}

type GLTFPistolsResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
        M002: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshStandardMaterial
    }
}

const Pistols = (props: JSX.IntrinsicElements['group']) => {
    const { nodes, materials } = useGLTF('/models/pistols.glb') as any as GLTFPistolsResult;
    return (
        <group {...props} dispose={null} rotation={[0, Math.PI, 0]}>
            {/* <mesh castShadow receiveShadow geometry={nodes.M000.geometry} material={materials.tile0} /> */}
            <mesh castShadow receiveShadow geometry={nodes.M001.geometry} material={materials.tile0}
                position={[0.358, -0.656, -0.525]}
                rotation={[1.4117968, -0.1366593, 0.1459095]}
            />
            <mesh castShadow receiveShadow geometry={nodes.M002.geometry} material={materials.tile0}
                position={[0, -0.657, 0]}
                rotation={[-1.5688765, 0.000698132, -0.86306532]}
            />
        </group>
    )
}

type GLTFUzisResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
        M002: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshStandardMaterial
    }
}

const Uzis = (props: JSX.IntrinsicElements['group']) => {
    const { nodes, materials } = useGLTF('/models/uzis.glb') as any as GLTFUzisResult;
    return (
        <group {...props} dispose={null} rotation={[0, Math.PI / 2, 0]}>
            {/* <mesh castShadow receiveShadow geometry={nodes.M000.geometry} material={materials.tile0} /> */}
            <mesh castShadow receiveShadow geometry={nodes.M001.geometry} material={materials.tile0}
                position={[0, -1.236, 0]}
                rotation={[1.555611962, -0.01780236, 2.05111094]}
            />
            <mesh castShadow receiveShadow geometry={nodes.M002.geometry} material={materials.tile0}
                position={[-0.204, -1.377, 0.344]}
                rotation={[-1.4826572, -0.108908545, 2.46039065]}
            />
        </group>
    )
}

type GLTFSunglassesResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshPhysicalMaterial
    }
}

type SunglassesActionName = 'M000Action'
// @ts-ignore
type GLTFSunglassesActions = Record<SunglassesActionName, THREE.AnimationAction>
const Sunglasses = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined)
    const { nodes, materials, animations: _animations } = useGLTF('/models//sunglasses.glb') as any as GLTFSunglassesResult;
    //   const { actions } = useAnimations<GLTFSunglassesActions>(animations, group) as any as GLTFSunglassesActions;
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                scale={0.01}
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials.tile0}
            />
        </group>
    )
}


type GLTFKeyResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshPhysicalMaterial
    }
}
type KeyActionName = 'M000Action';
// @ts-ignore
type GLTFKeyActions = Record<KeyActionName, THREE.AnimationAction>

const Key = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models//key.glb') as any as GLTFKeyResult;
    //   const { actions } = useAnimations<GLTFActions>(animations, group)
    return (
        <group ref={group} {...props} dispose={null} scale={0.5}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials.tile0}
                scale={0.01}
                rotation-z={Math.PI / 2}
            // rotation-y={Math.PI / 6}
            />
        </group>
    )
}

type GLTFLargeMedipackResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
    }
    materials: {
        ['tile0.003']: THREE.MeshPhysicalMaterial
    }
}
type LargeMedipackActionName = 'M000Action.002' | 'M001Action.001'
// @ts-ignore
type GLTFLargeMedipackActions = Record<LargeMedipackActionName, THREE.AnimationAction>

const LargeMedipack = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models//large-medipack.glb') as any as GLTFLargeMedipackResult;
    //   const { actions } = useAnimations<GLTFActions>(animations, group)
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials['tile0.003']}
                rotation={[0, -0.5, 0]}
                scale={0.01}
            >
                <mesh
                    name="M001"
                    castShadow
                    receiveShadow
                    geometry={nodes.M001.geometry}
                    material={materials['tile0.003']}
                    position={[0, 41, 20]}
                />
            </mesh>
        </group>
    )
}

type GLTFSmallMedipackResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
        M002: THREE.Mesh
        M003: THREE.Mesh
        M004: THREE.Mesh
        M005: THREE.Mesh
        M006: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshPhysicalMaterial
    }
}
type SmallMedipackActionName =
    | 'M000Action'
    | 'M001Action'
    | 'M002Action'
    | 'M003Action'
    | 'M004Action'
    | 'M005Action'
    | 'M006Action';
// @ts-ignore
type GLTFSmallMedipackActions = Record<SmallMedipackActionName, THREE.AnimationAction>

const SmallMedipack = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models/small-medipack.glb') as any as GLTFSmallMedipackResult;
    //   const { actions } = useAnimations<GLTFSmallMedipackActions>(animations, group)
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials.tile0}
                // position={[-4, 29, 2]}
                // rotation={[1.1, -0.4, -2.6]}
                scale={0.01}
            >
                <mesh
                    name="M001"
                    castShadow
                    receiveShadow
                    geometry={nodes.M001.geometry}
                    material={materials.tile0}
                    position={[-1, -24, -4]}
                    rotation={[0.589, 0, 0]}
                >
                    <mesh
                        name="M002"
                        castShadow
                        receiveShadow
                        geometry={nodes.M002.geometry}
                        material={materials.tile0}
                        position={[0, -1, -16]}
                        rotation={[0.607, 0, 0]}
                    >
                        <mesh
                            name="M003"
                            castShadow
                            receiveShadow
                            geometry={nodes.M003.geometry}
                            material={materials.tile0}
                            position={[0, 0, -18]}
                            rotation={[0.712, 0, 0]}
                        >
                            <mesh
                                name="M004"
                                castShadow
                                receiveShadow
                                geometry={nodes.M004.geometry}
                                material={materials.tile0}
                                position={[0, 0, -18]}
                                rotation={[0.571, 0, 0]}
                            />
                        </mesh>
                    </mesh>
                </mesh>
                <mesh
                    name="M005"
                    castShadow
                    receiveShadow
                    geometry={nodes.M005.geometry}
                    material={materials.tile0}
                    position={[45, 27, 2]}
                    rotation={[0, -1.565, -0.417]}
                />
                <mesh
                    name="M006"
                    castShadow
                    receiveShadow
                    geometry={nodes.M006.geometry}
                    material={materials.tile0}
                    position={[-51, 27, 2]}
                    rotation={[0, -1.565, -0.466]}
                />
            </mesh>
        </group>
    )
}

type GLTFCompassResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
        M002: THREE.Mesh
        M003: THREE.Mesh
    }
    materials: {
        ['tile0.002']: THREE.MeshPhysicalMaterial
    }
}

type CompassActionName = 'M000Action.002' | 'M001Action.002' | 'M002Action.002' | 'M003Action.002';
// @ts-ignore
type GLTFCompassActions = Record<CompassActionName, THREE.AnimationAction>;
const Compass = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models/compass.glb') as any as GLTFCompassResult;
    //   const { actions } = useAnimations<GLTFCompassActions>(animations, group)
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials['tile0.002']}
                //   position={[0, 2, -8]}
                scale={0.01}
                rotation={[Math.PI, 0, 0]}

            >
                <mesh
                    name="M001"
                    castShadow
                    receiveShadow
                    geometry={nodes.M001.geometry}
                    material={materials['tile0.002']}
                    position={[0, -5, 6]}
                />
                <mesh
                    name="M002"
                    castShadow
                    receiveShadow
                    geometry={nodes.M002.geometry}
                    material={materials['tile0.002']}
                    position={[0, 7, 48]}
                />
                <mesh
                    name="M003"
                    castShadow
                    receiveShadow
                    geometry={nodes.M003.geometry}
                    material={materials['tile0.002']}
                    position={[0, 1, 0]}
                />
            </mesh>
        </group>
    )
}

type GLTFPassportResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
    }
    materials: {
        ['tile0.002']: THREE.MeshPhysicalMaterial
    }
}
type PassportActionName = 'M000Action.002';
// @ts-ignore
type GLTFPassportActions = Record<PassportActionName, THREE.AnimationAction>;
const Passport = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models/passport.glb') as any as GLTFPassportResult;
    //   const { actions } = useAnimations<GLTFPassportActions>(animations, group);
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials['tile0.002']}
                scale={0.01}
                // position={[35, -1, 23]}
                rotation={[-2.583, 0.596, -3.093]}
            />
        </group>
    )
}

type GLTFHeadphonesCassetteResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
        M001: THREE.Mesh
    }
    materials: {
        tile0: THREE.MeshPhysicalMaterial
    }
}

type HeadphonesCassetteActionName = 'M000Action' | 'M001Action';
// @ts-ignore
type GLTFHeadphonesCassetteActions = Record<HeadphonesCassetteActionName, THREE.AnimationAction>
const HeadphonesCassette = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models/headphones-casette.glb') as any as GLTFHeadphonesCassetteResult;
    //   const { actions } = useAnimations<GLTFActions>(animations, group)
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials.tile0}
                // position={[-4, 12, 0]}
                scale={0.01}
            >
                <mesh
                    name="M001"
                    castShadow
                    receiveShadow
                    geometry={nodes.M001.geometry}
                    material={materials.tile0}
                    position={[-3, -16, -4]}
                    rotation={[Math.PI / 2, 0.945, -0.73]}
                />
            </mesh>
        </group>
    )
}

type GLTFControlsResult = GLTF & {
    nodes: {
        M000: THREE.Mesh
    }
    materials: {
        ['tile0.001']: THREE.MeshPhysicalMaterial
    }
}

type ControlsActionName = 'M000Action.001';
// @ts-ignore
type GLTFControlsActions = Record<ControlsActionName, THREE.AnimationAction>

const Controls = (props: JSX.IntrinsicElements['group']) => {
    const group = useRef<THREE.Group>(undefined);
    const { nodes, materials, animations: _animations } = useGLTF('/models/controls.glb') as any as GLTFControlsResult;
    // const { actions } = useAnimations<GLTFControlsActions>(animations, group);
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                name="M000"
                castShadow
                receiveShadow
                geometry={nodes.M000.geometry}
                material={materials['tile0.001']}
                scale={0.01}
                // position={[3, 3, 1]}
                rotation={[-2.264, 0, Math.PI]}
            />
        </group>
    )
}

useGLTF.preload('/models/controls.glb');
useGLTF.preload('/models/headphones-casette.glb');
useGLTF.preload('/models/passport.glb');
useGLTF.preload('/models/compass.glb');
useGLTF.preload('/models/small-medipack.glb');
useGLTF.preload('/models//large-medipack.glb');
useGLTF.preload('/models/key.glb');
useGLTF.preload('/models//sunglasses.glb');
useGLTF.preload('/models/uzis.glb');
useGLTF.preload('/models/pistols.glb');
useGLTF.preload('/models/magnum.glb');
useGLTF.preload('/models/shotgun.glb');

export default {
    Shotgun,
    Magnum,
    Pistols,
    Uzis,
    Sunglasses,
    Key,
    LargeMedipack,
    SmallMedipack,
    Compass,
    Passport,
    HeadphonesCassette,
    Controls
};