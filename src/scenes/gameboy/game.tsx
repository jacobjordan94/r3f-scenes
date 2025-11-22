import { Html } from "@react-three/drei";
import Emulator from "./emulator";
import type { ComponentProps } from "react";

type GameProps = ComponentProps<typeof Html> & {
    currentGame: string | undefined;
};
const Game = ({ currentGame, ...props }: GameProps) => {
    return (
        <Html
            transform
            distanceFactor={5}
            {...props}
            occlude="blending"
        >
            <div className="game-container" style={{ width: '31vh', height: '29vh', opacity: currentGame ? '100%' : '0%'}}>
                <Emulator 
                    coreOptions={{
                        gambatte_gb_colorization: 'internal',
                        gambatte_gb_bootloader: 'enabled',
                    }}
                    gameUrl={currentGame}
                />
            </div>
        </Html>
    );
};

export default Game;