import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { MechanicalConsole } from './MechanicalConsole';
import { CameraController } from './CameraController';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 50 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      {/* Dual lighting setup for neumorphic effect */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[-5, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[8, 12, 8]}
        intensity={0.4}
        angle={0.3}
        penumbra={1}
      />

      {/* Environment map for realistic reflections */}
      <Environment preset="warehouse" />

      {/* Main 3D Console */}
      <MechanicalConsole />

      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4}
      />

      {/* Camera control */}
      <CameraController />
      
      {/* Debug: Uncomment for orbit controls during development */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
