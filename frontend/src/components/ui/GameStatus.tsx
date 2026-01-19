import { useGameStore } from '../../stores/gameStore';

export function GameStatus() {
  const gameStatus = useGameStore(state => state.gameStatus);
  const currentRow = useGameStore(state => state.currentRow);
  const targetWord = useGameStore(state => state.targetWord);
  const resetGame = useGameStore(state => state.resetGame);


  // Only show popup when game is won or lost
  if (gameStatus !== 'won' && gameStatus !== 'lost') {
    return null;
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
        onClick={resetGame}
      />

      {/* Modal popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="pointer-events-auto animate-slide-up"
          style={{
            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {gameStatus === 'won' && (
            <div 
              className="bg-gradient-to-br from-[#22252d] to-[#1a1d23] rounded-2xl p-8 shadow-2xl border-2 border-[#538d4e]/30 min-w-[320px]"
              style={{
                boxShadow: `
                  0 0 80px rgba(83, 141, 78, 0.3),
                  0 20px 60px rgba(0, 0, 0, 0.6),
                  inset 0 2px 8px rgba(255, 255, 255, 0.05)
                `
              }}
            >
              <div className="text-center space-y-6">
                {/* Success icon with glow */}
                <div className="relative inline-block">
                  <div className="text-7xl animate-bounce">🎉</div>
                  <div 
                    className="absolute inset-0 blur-2xl opacity-50"
                    style={{
                      background: 'radial-gradient(circle, rgba(83, 141, 78, 0.6) 0%, transparent 70%)'
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-4xl font-black text-[#6aaa64] mb-2 font-display tracking-wide">
                    CORRECT!
                  </h2>
                  <p className="text-gray-400 text-sm font-mono">
                    Solved in {currentRow} {currentRow === 1 ? 'attempt' : 'attempts'}
                  </p>
                </div>

                <button
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-[#538d4e] text-white rounded-lg font-bold hover:bg-[#6aaa64] transition-all duration-200 text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: '0 4px 20px rgba(83, 141, 78, 0.4)'
                  }}
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          {gameStatus === 'lost' && (
            <div 
              className="bg-gradient-to-br from-[#22252d] to-[#1a1d23] rounded-2xl p-8 shadow-2xl border-2 border-[#818384]/30 min-w-[320px]"
              style={{
                boxShadow: `
                  0 0 80px rgba(129, 131, 132, 0.2),
                  0 20px 60px rgba(0, 0, 0, 0.6),
                  inset 0 2px 8px rgba(255, 255, 255, 0.05)
                `
              }}
            >
              <div className="text-center space-y-6">
                {/* Failure icon */}
                <div className="text-6xl opacity-60">💀</div>

                <div>
                  <h2 className="text-4xl font-black text-[#9a9b9b] mb-3 font-display tracking-wide">
                    GAME OVER
                  </h2>
                  <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <p className="text-sm text-gray-500 mb-1 font-mono uppercase tracking-wider">
                      The word was:
                    </p>
                    <p className="text-3xl font-black text-white font-display tracking-widest">
                      {targetWord}
                    </p>
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-[#818384] text-white rounded-lg font-bold hover:bg-[#9a9b9b] transition-all duration-200 text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: '0 4px 20px rgba(129, 131, 132, 0.3)'
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
