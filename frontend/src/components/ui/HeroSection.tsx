import { useGameStore } from '../../stores/gameStore';

export function HeroSection() {
  const cameraMode = useGameStore(state => state.cameraMode);

  // Skip hero section entirely - go straight to game
  return null;
}
