import { useGameStore } from '../../stores/gameStore';
import { GameGrid } from './GameGrid';
import { GameStatus } from './GameStatus';

export function FlipCard() {
  const gameStatus = useGameStore(state => state.gameStatus);
  const isGameOver = gameStatus === 'won' || gameStatus === 'lost';

  return (
    <div 
      className="relative w-full mb-[10px] md:mb-0 max-w-[550px]"
      style={{
        perspective: '2000px',
        minHeight: '400px'
      }}
    >
      <div 
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isGameOver ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front: Game Grid */}
        <div 
          style={{
            backfaceVisibility: 'hidden'
          }}
        >
          <GameGrid />
        </div>

        {/* Back: Game Status */}
        <GameStatus />
      </div>
    </div>
  );
}
