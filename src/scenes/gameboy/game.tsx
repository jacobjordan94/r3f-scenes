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
            distanceFactor={1.49}
            {...props}
            occlude="blending"
        >
            <div className="game-container" style={{ width: '960px', height: '864px', opacity: currentGame ? '100%' : '0%'}}>
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