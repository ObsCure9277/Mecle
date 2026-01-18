import { useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
];

export function KeyboardInput() {
  const addLetter = useGameStore(state => state.addLetter);
  const deleteLetter = useGameStore(state => state.deleteLetter);
  const submitGuess = useGameStore(state => state.submitGuess);
  const gameStatus = useGameStore(state => state.gameStatus);
  const guesses = useGameStore(state => state.guesses);

  // Track which letters have been used and their states
  const getLetterState = (letter: string): 'correct' | 'present' | 'absent' | 'unused' => {
    let state: 'correct' | 'present' | 'absent' | 'unused' = 'unused';
    
    guesses.forEach(row => {
      row.forEach(tile => {
        if (tile.letter === letter) {
          if (tile.state === 'correct') state = 'correct';
          else if (tile.state === 'present' && state !== 'correct') state = 'present';
          else if (tile.state === 'absent' && state === 'unused') state = 'absent';
        }
      });
    });
    
    return state;
  };

  const handleKeyClick = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === '←') {
      deleteLetter();
    } else {
      addLetter(key);
    }
  };

  // Physical keyboard support
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        addLetter(key);
      } else if (e.key === 'Backspace') {
        deleteLetter();
      } else if (e.key === 'Enter') {
        submitGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addLetter, deleteLetter, submitGuess, gameStatus]);

  const getKeyClass = (key: string, state: 'correct' | 'present' | 'absent' | 'unused') => {
    const baseClass = 'rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer select-none flex items-center justify-center relative transform-gpu';
    
    // Size classes
    const sizeClass = key === 'ENTER' || key === '←' 
      ? 'px-4 h-14' 
      : 'w-10 h-14';
    
    // 3D effects and depth
    let colorClass = '';
    let shadowClass = '';
    
    if (state === 'correct') {
      colorClass = 'bg-gradient-to-b from-[#6aaa64] to-[#538d4e] text-white border-2 border-[#3a6e3a]';
      shadowClass = 'shadow-[0_4px_0_0_#3a6e3a,0_6px_15px_rgba(83,141,78,0.4)]';
    } else if (state === 'present') {
      colorClass = 'bg-gradient-to-b from-[#c9b458] to-[#b59f3b] text-white border-2 border-[#9a8532]';
      shadowClass = 'shadow-[0_4px_0_0_#9a8532,0_6px_15px_rgba(181,159,59,0.4)]';
    } else if (state === 'absent') {
      colorClass = 'bg-gradient-to-b from-[#4a4a4c] to-[#3a3a3c] text-white border-2 border-[#2a2a2c]';
      shadowClass = 'shadow-[0_4px_0_0_#2a2a2c,0_6px_15px_rgba(58,58,60,0.3)]';
    } else {
      colorClass = 'bg-gradient-to-b from-[#919294] to-[#818384] text-white border-2 border-[#6a6a6c]';
      shadowClass = 'shadow-[0_4px_0_0_#6a6a6c,0_6px_15px_rgba(129,131,132,0.3)]';
    }
    
    // Hover and active states
    const interactiveClass = 'hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#6a6a6c,0_8px_20px_rgba(129,131,132,0.4)] active:translate-y-1 active:shadow-[0_2px_0_0_#6a6a6c]';
    
    return `${baseClass} ${sizeClass} ${colorClass} ${shadowClass} ${interactiveClass}`;
  };

  return (
    <div className="w-full max-w-[500px] mt-2" style={{perspective: '1000px'}}>
      <div className="flex flex-col gap-2" style={{transformStyle: 'preserve-3d'}}>
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center gap-[6px]"
            style={{
              transform: `rotateX(${2 - rowIndex}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {row.map((key) => {
              const state = key.length === 1 ? getLetterState(key) : 'unused';
              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={getKeyClass(key, state)}
                  disabled={gameStatus !== 'playing'}
                  style={{transformStyle: 'preserve-3d'}}
                >
                  {key === '←' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
