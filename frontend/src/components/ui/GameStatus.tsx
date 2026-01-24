import { useGameStore } from '../../stores/gameStore';
import { useState, useEffect } from 'react';

export function GameStatus() {
  const gameStatus = useGameStore(state => state.gameStatus);
  const currentRow = useGameStore(state => state.currentRow);
  const targetWord = useGameStore(state => state.targetWord);
  const resetGame = useGameStore(state => state.resetGame);
  const gameMode = useGameStore(state => state.gameMode);
  const flipCard = useGameStore(state => state.flipCard);

  // Restore handleButtonClick
  const handleButtonClick = () => {
    if (gameMode === 'infinite') {
      // Infinite mode: always reset
      resetGame();
    } else {
      // Daily/Hourly mode: flip the card back to show game grid
      flipCard(false);
    }
  };

  // Timer logic
  const [timeLeft, setTimeLeft] = useState<string>('');
  
  // Update countdown
  useEffect(() => {
    if ((gameMode === 'daily' || gameMode === 'hourly') && (gameStatus === 'won' || gameStatus === 'lost')) {
      const updateTimer = () => {
        const remaining = useGameStore.getState().getTimeRemaining();
        
        if (!remaining || remaining <= 0) {
            setTimeLeft('');
            return;
        }

        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);

        const pad = (n: number) => n.toString().padStart(2, '0');
        setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [gameMode, gameStatus]);

  const getButtonText = () => {
      if (gameMode === 'infinite') return gameStatus === 'won' ? 'Play Again' : 'Try Again';
      if (timeLeft) return `Next Game In: ${timeLeft}`;
      return 'Play Again'; // Fallback if unlocked
  };

  const isLocked = (gameMode === 'daily' || gameMode === 'hourly') && !!timeLeft;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 rounded-2xl"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: 'linear-gradient(145deg, #1e2128, #17191f)',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5), inset 0 -2px 6px rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.4)',
        border: '2px solid rgba(42,45,53,0.5)'
      }}
    >
      {gameStatus === 'won' && (
        <div className="text-center space-y-[2vh] md:space-y-6 w-full max-w-sm">
          {/* Success icon with glow */}
          <div className="relative inline-block">
            <div className="text-[10vh] md:text-7xl animate-bounce">🎉</div>
            <div 
              className="absolute inset-0 blur-2xl opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(83, 141, 78, 0.6) 0%, transparent 70%)'
              }}
            />
          </div>

          <div>
            <h2 className="text-[4vh] md:text-4xl font-black text-[#6aaa64] mb-[1vh] md:mb-2 font-display tracking-wide">
              CORRECT!
            </h2>
            <p className="text-gray-400 text-[1.5vh] md:text-sm font-mono">
              Solved in {currentRow} {currentRow === 1 ? 'attempt' : 'attempts'}
            </p>
          </div>

          <button
            onClick={isLocked ? undefined : handleButtonClick}
            disabled={isLocked}
            className={`w-full px-6 py-[1.5vh] md:py-3 rounded-lg font-bold transition-all duration-200 text-[2vh] md:text-lg shadow-lg 
                ${isLocked 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-80' 
                    : 'bg-[#538d4e] text-white hover:bg-[#6aaa64] hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
            style={{
              boxShadow: isLocked ? 'none' : '0 4px 20px rgba(83, 141, 78, 0.4)'
            }}
          >
            {getButtonText()}
          </button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="text-center space-y-[2vh] md:space-y-6 w-full max-w-sm">
          {/* Failure icon */}
          <div className="text-[8vh] md:text-6xl opacity-60">💀</div>

          <div>
            <h2 className="text-[4vh] md:text-4xl font-black text-[#9a9b9b] mb-[1vh] md:mb-3 font-display tracking-wide">
              GAME OVER
            </h2>
            <div className="bg-black/30 rounded-lg p-[2vh] md:p-4 border border-white/5">
              <p className="text-[1.5vh] md:text-sm text-gray-500 mb-1 font-mono uppercase tracking-wider">
                The word was:
              </p>
              <p className="text-[3vh] md:text-3xl font-black text-white font-display tracking-widest">
                {targetWord}
              </p>
            </div>
          </div>

          <button
             onClick={isLocked ? undefined : handleButtonClick}
             disabled={isLocked}
             className={`w-full px-6 py-[1.5vh] md:py-3 rounded-lg font-bold transition-all duration-200 text-[2vh] md:text-lg shadow-lg 
                 ${isLocked 
                     ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-80' 
                     : 'bg-[#818384] text-white hover:bg-[#9a9b9b] hover:shadow-xl hover:scale-105 active:scale-95'
                 }`}
            style={{
              boxShadow: isLocked ? 'none' : '0 4px 20px rgba(129, 131, 132, 0.3)'
            }}
          >
             {getButtonText()}
          </button>
        </div>
      )}
    </div>
  );
}

