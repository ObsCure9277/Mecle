import { TileRow } from './TileRow';
import { useGameStore } from '../../stores/gameStore';

export function MechanicalConsole() {
  const guesses = useGameStore(state => state.guesses);
  
  return (
    <group position={[0, 0, 0]}>
      {/* Console Base - Brushed metal surface */}
      <mesh receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[10, 0.5, 7]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Console Frame - Extruded edges */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[10.5, 0.2, 7.5]} />
        <meshStandardMaterial
          color="#A0A0A0"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Sunken track for tiles */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[8, 0.1, 6]} />
        <meshStandardMaterial
          color="#D0D0D0"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Decorative panel details */}
      <group position={[-4.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
          <meshStandardMaterial color="#808080" metalness={0.8} />
        </mesh>
      </group>
      
      <group position={[4.5, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
          <meshStandardMaterial color="#808080" metalness={0.8} />
        </mesh>
      </group>

      {/* Grid of 6 rows × 5 tiles */}
      {guesses.map((rowData, rowIndex) => (
        <TileRow
          key={rowIndex}
          rowIndex={rowIndex}
          tiles={rowData}
          position={[0, 0.2, (rowIndex - 2.5) * 0.9]}
        />
      ))}

      {/* Console branding label */}
      <group position={[0, 0.1, -3.2]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshStandardMaterial
            color="#1A1A1A"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}
