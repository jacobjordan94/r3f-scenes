import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

const FlyControls = () => {
  const { camera, gl } = useThree();
  const keysPressed = useRef<Set<string>>(new Set());
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isLocked = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return;

      const sensitivity = 0.002;
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= e.movementX * sensitivity;
      euler.current.x -= e.movementY * sensitivity;
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };

    const handleClick = () => {
      gl.domElement.requestPointerLock();
    };

    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [camera, gl]);

  useFrame((state, delta) => {
    const speed = 5;
    direction.current.set(0, 0, 0);

    // Forward/backward
    if (keysPressed.current.has('w')) direction.current.z -= 1;
    if (keysPressed.current.has('s')) direction.current.z += 1;

    // Left/right
    if (keysPressed.current.has('a')) direction.current.x -= 1;
    if (keysPressed.current.has('d')) direction.current.x += 1;

    // Up/down
    if (keysPressed.current.has(' ')) direction.current.y += 1;
    if (keysPressed.current.has('shift')) direction.current.y -= 1;

    direction.current.normalize().multiplyScalar(speed * delta);

    // Apply direction relative to camera orientation
    const moveVector = new THREE.Vector3();
    moveVector.copy(direction.current);
    moveVector.applyQuaternion(camera.quaternion);

    camera.position.add(moveVector);
  });

  return null;
};

export default FlyControls;
