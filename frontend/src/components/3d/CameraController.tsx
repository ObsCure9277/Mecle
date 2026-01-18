import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '../../stores/gameStore';
import gsap from 'gsap';

export function CameraController() {
  const { camera } = useThree();
  const cameraMode = useGameStore(state => state.cameraMode);
  const orbitAngleRef = useRef(0);

  useEffect(() => {
    if (cameraMode === 'orbit') {
      // Orbit animation
      const animate = () => {
        orbitAngleRef.current += 0.002;
        const radius = 12;
        camera.position.x = Math.sin(orbitAngleRef.current) * radius;
        camera.position.z = Math.cos(orbitAngleRef.current) * radius;
        camera.position.y = 8;
        camera.lookAt(0, 0, 0);
      };

      const interval = setInterval(animate, 16); // ~60fps
      return () => clearInterval(interval);
      
    } else if (cameraMode === 'gameplay') {
      // Transition to top-down gameplay view
      gsap.to(camera.position, {
        x: 0,
        y: 12,
        z: 6,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        }
      });
    }
  }, [cameraMode, camera]);

  return null;
}
