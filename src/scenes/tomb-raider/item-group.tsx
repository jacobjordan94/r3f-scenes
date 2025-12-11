import { useSpring, animated } from "@react-spring/three";
import type { ComponentProps } from "react";
import React, { useCallback, useEffect, useState } from "react";

type TombRaiderItemGroupProps = ComponentProps<'group'> & {
    children?: React.ReactNode;
    radius?: number;
    active?: boolean;
}

const TombRaiderItemGroup = ({ children, radius = 7.5, active = false, ...props }: TombRaiderItemGroupProps) => {
    const childrenArray = React.Children.toArray(children);
    const itemCount = childrenArray.length;
    const rotationIncrement = itemCount > 0 ? (2 * Math.PI) / itemCount : 0;

    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [rotationY, setRotationY] = useState(Math.PI / 2);

    const moveLeft = useCallback(() => {
        if (itemCount === 0) return;
        setCurrentItemIndex(prev => (prev - 1 + itemCount) % itemCount);
        setRotationY(prev => prev - rotationIncrement);
    }, [itemCount, rotationIncrement]);

    const moveRight = useCallback(() => {
        if (itemCount === 0) return;
        setCurrentItemIndex(prev => (prev + 1) % itemCount);
        setRotationY(prev => prev + rotationIncrement);
    }, [itemCount, rotationIncrement]);

    useEffect(() => {
        if (!active || itemCount === 0) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'a': moveRight(); break;
                case 'ArrowRight':
                case 'd': moveLeft(); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [active, itemCount, moveLeft, moveRight]);

    const springs = useSpring({
        rotationY: rotationY,
    });

    if (itemCount === 0) return null;

    const positionedChildren = childrenArray.map((child, index) => {
        const angle = index * rotationIncrement;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        if (React.isValidElement(child)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return React.cloneElement(child as React.ReactElement<any>, {
                key: index,
                'position-x': x,
                'position-z': z,
                active: currentItemIndex === index,
            });
        }
        return child;
    });

    return (
        <animated.group {...props} rotation-y={springs.rotationY}>
            {positionedChildren}
        </animated.group>
    );
};

export default TombRaiderItemGroup;
