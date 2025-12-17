import { Canvas } from "@react-three/fiber";
import Models from "./models";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import Game from "./game";
import { useMemo, useState } from "react";
import { useControls } from "leva";
import { animated, useSpring } from "@react-spring/three";

const AnimatedPerspectiveCamera = animated(PerspectiveCamera);
const GameboyScene = () => {

    const [ currentGame, setCurrentGame ] = useState<string>();
    const [ currentHover, setCurrentHover ] = useState<number>();
    const { camera } = useControls({
        camera: {
            options: ['screen', 'game-selection'],
            value: 'game-selection',
        }
    });
    const cameraPos: number[] = useMemo(() => {
        switch(camera) {
            case 'screen': return [0, 2, 2];
            case 'game-selection': return [0, -2, 5];
            default: return [0, 0, 0];
        }
    }, [ camera ]);
    const { x, y, z } = useSpring({
        x: cameraPos[0],
        y: cameraPos[1],
        z: cameraPos[2],
        config: { tension: 170, friction: 26 }
    })
    const gameScreenPositionZ = useMemo(() => {
        return currentGame === undefined ? 0 : 0.75;
    }, [ currentGame ]);

    return (
        <>
            <Canvas style={{ position: 'relative', zIndex: 0 }}>
                <Environment
                    files="/images/fireplace_4k.hdr"
                    background
                    backgroundIntensity={0.5}
                    backgroundRotation={[0, -Math.PI / 2, 0]}
                    // backgroundBlurriness={0.075}
                    environmentIntensity={0.15}
                />
                <AnimatedPerspectiveCamera makeDefault position-x={x} position-y={y} position-z={z} />
                <Models.Gameboy position-y={-5.75} position-z={-5}>
                    <Game currentGame={currentGame} position-z={gameScreenPositionZ} position-y={8.08} position-x={0.1} />
                </Models.Gameboy>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, 5, -5]} intensity={1} />
                <group position-y={-2.5} scale={0.5}>
                    <Models.Cartridge
                        imageUrl="/images/mp-label.png"
                        position-x={-5}
                        onClick={() => setCurrentGame('/games/003.gb')}
                        onPointerEnter={() => setCurrentHover(0)}
                        onPointerLeave={() => setCurrentHover(undefined)}
                        isHovered={currentHover === 0}
                    />
                    <Models.Cartridge
                        imageUrl="/images/zelda-label.png"
                        onClick={() => setCurrentGame('/games/001.gb')}
                        onPointerEnter={() => setCurrentHover(1)}
                        onPointerLeave={() => setCurrentHover(undefined)}
                        isHovered={currentHover === 1}
                    />
                    <Models.Cartridge
                        imageUrl="/images/tetris-label.png"
                        position-x={5}
                        repeat={[1.78, 2.3]}
                        onClick={() => setCurrentGame('/games/002.gb')}
                        onPointerEnter={() => setCurrentHover(2)}
                        onPointerLeave={() => setCurrentHover(undefined)}
                        isHovered={currentHover === 2}
                    />
                </group>
            </Canvas>
            {/* <Leva titleBar={{
                title: 'GameBoy'
            }} theme={{ sizes: { rootWidth: '280px' } }}/> */}
        </>
    );
};

export default GameboyScene;