import { useRef, useEffect, useState } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import type { LetterState } from '../../stores/gameStore';

interface TileProps {
  letter: string;
  state: LetterState;
  position: [number, number, number];
  rowIndex: number;
  colIndex: number;
}

const AnimatedGroup = animated.group;

export function Tile({ letter, state, position }: TileProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const prevStateRef = useRef<LetterState>('empty');

  // Trigger rotation when state changes from empty to validated
  useEffect(() => {
    if (prevStateRef.current === 'empty' && state !== 'empty') {
      setHasSubmitted(true);
    }
    prevStateRef.current = state;
  }, [state]);

  // Rotation animation
  const { rotation } = useSpring({
    rotation: hasSubmitted ? [0, Math.PI, 0] : [0, 0, 0],
    config: { tension: 120, friction: 14 },
  });

  // LED color based on state
  const getLEDColor = (s: LetterState): string => {
    switch (s) {
      case 'correct': return '#00FF88';
      case 'present': return '#FFB800';
      case 'absent': return '#4A4A4A';
      default: return '#2A2A2A';
    }
  };

  // Material for correct letters (gold-leaf finish)
  const getTileMaterial = (s: LetterState) => {
    if (s === 'correct') {
      return (
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.2}
          emissive="#FFAA00"
          emissiveIntensity={0.2}
        />
      );
    }
    return (
      <meshStandardMaterial
        color="#B0B0B0"
        metalness={0.5}
        roughness={0.5}
      />
    );
  };

  return (
    <AnimatedGroup position={position} rotation={rotation as any}>
      {/* Front face: Letter display */}
      <group>
        <RoundedBox
          args={[1, 1, 0.15]}
          radius={0.05}
          smoothness={4}
          castShadow
        >
          {getTileMaterial(state)}
        </RoundedBox>

        {/* Letter text */}
        {letter && (
          <Text
            position={[0, 0, 0.08]}
            fontSize={0.7}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {letter}
          </Text>
        )}
      </group>

      {/* Back face: LED indicator */}
      <group rotation={[0, Math.PI, 0]}>
        <RoundedBox
          args={[1, 1, 0.15]}
          radius={0.05}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial
            color="#2A2A2A"
            metalness={0.3}
            roughness={0.7}
          />
        </RoundedBox>

        {/* LED light */}
        <mesh position={[0, 0, 0.08]}>
          <circleGeometry args={[0.25, 32]} />
          <meshStandardMaterial
            color={getLEDColor(state)}
            emissive={getLEDColor(state)}
            emissiveIntensity={state === 'empty' ? 0.1 : 0.8}
          />
        </mesh>

        {/* LED glow ring */}
        {state !== 'empty' && (
          <pointLight
            position={[0, 0, 0.2]}
            color={getLEDColor(state)}
            intensity={0.5}
            distance={1}
          />
        )}
      </group>
    </AnimatedGroup>
  );
}
