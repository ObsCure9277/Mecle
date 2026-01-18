import { useGameStore } from '../../stores/gameStore';

export function GameStatus() {
  const gameStatus = useGameStore(state => state.gameStatus);
  const currentRow = useGameStore(state => state.currentRow);
  const targetWord = useGameStore(state => state.targetWord);
  const resetGame = useGameStore(state => state.resetGame);

  const attemptsRemaining = 6 - currentRow;

  return (
    <div className="mb-4 text-center min-h-[60px] flex items-center justify-center">
      {gameStatus === 'playing' && (
        <div className="text-sm text-gray-500">
          {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="space-y-3">
          <p className="text-2xl font-bold text-[#538d4e]">
            Correct! 🎉
          </p>
          <button
            onClick={resetGame}
            className="px-5 py-2 bg-[#538d4e] text-white rounded-md font-semibold hover:bg-[#6aaa64] transition-colors text-sm"
          >
            Play Again
          </button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="space-y-3">
          <p className="text-2xl font-bold text-gray-400">
            Game Over
          </p>
          <p className="text-sm text-gray-500">
            The word was: <span className="font-bold text-white">{targetWord}</span>
          </p>
          <button
            onClick={resetGame}
            className="px-5 py-2 bg-[#818384] text-white rounded-md font-semibold hover:bg-[#9a9b9b] transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
