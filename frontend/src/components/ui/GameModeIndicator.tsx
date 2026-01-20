import { FaClock, FaHourglass, FaInfinity } from 'react-icons/fa6';
import { useGameStore } from '../../stores/gameStore';

export function GameModeIndicator() {
  const gameMode = useGameStore(state => state.gameMode);

  const getIcon = () => {
    switch (gameMode) {
      case 'daily':
        return <FaClock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'hourly':
        return <FaHourglass className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'infinite':
        return <FaInfinity className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <FaClock className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <div
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white border-2 border-[#5a6070]/50 flex items-center justify-center transition-all duration-200"
      style={{
        boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.4), 0 6px 0 0 #1a1d23, 0 10px 20px rgba(0,0,0,0.5)'
      }}
      title={`Game Mode: ${gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}`}
    >
      {getIcon()}
    </div>
  );
}
