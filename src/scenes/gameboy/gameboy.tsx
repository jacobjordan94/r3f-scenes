import { Canvas } from "@react-three/fiber";
import Models from "./models";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import Game from "./game";
import { useState } from "react";

const GameboyScene = () => {

    const [ currentGame, setCurrentGame ] = useState<string>();
    const [ currentHover, setCurrentHover ] = useState<number>();

    return (
        <Canvas>
            <PerspectiveCamera  />
            <CameraControls />
            <Models.Gameboy position-y={-5.75} position-z={-5}>
                <Game currentGame={currentGame} position-z={0.75} position-y={8.1} position-x={0.1} />
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
    );
};

export default GameboyScene;