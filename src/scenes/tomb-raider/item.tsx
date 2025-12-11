import { useFrame } from "@react-three/fiber";
import { useRef, type ComponentProps } from "react";
import * as THREE from 'three';

type TombRaiderItemProps = ComponentProps<'group'> & {
    active?: boolean;
};

const TombRaiderItem = ({ active = false, children, ...props }: TombRaiderItemProps) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        if (active) {
            // Continue rotating when active (clockwise, negative Y)
            groupRef.current.rotation.y -= delta * 2;
        } else {
            // When inactive, choose shortest path back to 0
            const currentRotation = groupRef.current.rotation.y;

            // Find position within current revolution (negative values for clockwise)
            const rotationInRevolution = currentRotation % (Math.PI * 2);

            // Check if we're past halfway (π radians = 180 degrees)
            if (Math.abs(rotationInRevolution) >= Math.PI) {
                // More than halfway: continue clockwise to complete revolution
                const revolutionCount = Math.floor(currentRotation / (Math.PI * 2));
                const targetRotation = revolutionCount * (Math.PI * 2);

                if (Math.abs(currentRotation - targetRotation) > 0.01) {
                    groupRef.current.rotation.y -= delta * 2;

                    if (groupRef.current.rotation.y <= targetRotation) {
                        groupRef.current.rotation.y = 0;
                    }
                } else {
                    groupRef.current.rotation.y = 0;
                }
            } else {
                // Less than halfway: rotate backwards (counter-clockwise) to nearest multiple
                const revolutionCount = Math.ceil(currentRotation / (Math.PI * 2));
                const targetRotation = revolutionCount * (Math.PI * 2);

                if (Math.abs(currentRotation - targetRotation) > 0.01) {
                    groupRef.current.rotation.y += delta * 2;

                    if (groupRef.current.rotation.y >= targetRotation) {
                        groupRef.current.rotation.y = 0;
                    }
                } else {
                    groupRef.current.rotation.y = 0;
                }
            }
        }
    });

    return (
        <group ref={groupRef} {...props}>
            { children }
        </group>
    );
};

export default TombRaiderItem;
