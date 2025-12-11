import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import InventoryGroup from "./inventory-group";
import OptionsGroup from "./options-group";

const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

const TombRaiderScene = () => {
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);

    const groupPositions = [0, -15];
    const cameraYOffset = 2;

    const { cameraY } = useSpring({
        cameraY: groupPositions[activeGroupIndex] + cameraYOffset,
        config: { tension: 170, friction: 26 }
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                    setActiveGroupIndex(prev => Math.max(0, prev - 1));
                    break;
                case 'ArrowDown':
                case 's':
                    setActiveGroupIndex(prev => Math.min(groupPositions.length - 1, prev + 1));
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [groupPositions.length]);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Background layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/tomb.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.33)',
                zIndex: 0
            }} />

            {/* Canvas layer */}
            <Canvas
                dpr={1}
                gl={{ alpha: true }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    zIndex: 1
                }}
            >
                <AnimatedPerspectiveCamera
                    makeDefault
                    position-x={0}
                    position-y={cameraY}
                    position-z={-13.5}
                    rotation-y={Math.PI}
                    fov={60}
                />
                <ambientLight intensity={3} />
                <InventoryGroup
                    active={activeGroupIndex === 0}
                    radius={7}
                />
                <OptionsGroup
                    active={activeGroupIndex === 1}
                    radius={7}
                    position-y={-15}
                />
            </Canvas>
        </div>
    );
};

export default TombRaiderScene;
