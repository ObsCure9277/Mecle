import { useEffect } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useGameStore } from '../../stores/gameStore';
import pressSoundUrl from '../../assets/press.mp3';

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

  const playPressSound = () => {
    const audio = new Audio(pressSoundUrl);
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  const handleKeyClick = (key: string) => {
    if (gameStatus !== 'playing') return;

    playPressSound();

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
        playPressSound();
        addLetter(key);
      } else if (e.key === 'Backspace') {
        playPressSound();
        deleteLetter();
      } else if (e.key === 'Enter') {
        playPressSound();
        submitGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addLetter, deleteLetter, submitGuess, gameStatus]);

  const getKeyClass = (key: string, state: 'correct' | 'present' | 'absent' | 'unused') => {
    const baseClass = 'rounded-xl font-black text-sm transition-all duration-200 cursor-pointer select-none flex items-center justify-center relative transform-gpu uppercase tracking-wider';
    
    // Size classes - responsive vs fixed desktop
    const sizeClass = key === 'ENTER' || key === '←' 
      ? 'px-[1vw] md:px-4 h-[6vh] md:h-14 max-h-[56px] text-[2.5vw] sm:text-xs md:text-xs flex-[1.5] md:flex-none' 
      : 'flex-1 md:flex-none md:w-10 h-[6vh] md:h-14 max-h-[56px] max-w-[48px] md:max-w-none text-[3.5vw] sm:text-sm';
    
    // Hyper-realistic neumorphic mechanical button styling
    let colorClass = '';
    let shadowClass = '';
    let effectClass = '';
    
    if (state === 'correct') {
      // Correct - Illuminated green mechanical button
      colorClass = 'bg-gradient-to-b from-[#5fb368] via-[#4a9d52] to-[#3d7f44] text-white border-2 border-[#5fb368]/40';
      shadowClass = 'shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-3px_8px_rgba(0,0,0,0.4),0_6px_0_0_#2d5a33,0_10px_20px_rgba(79,157,82,0.5),0_15px_35px_rgba(0,0,0,0.4)]';
      effectClass = 'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t after:from-transparent after:via-white/10 after:to-white/25 after:pointer-events-none';
    } else if (state === 'present') {
      // Present - Amber warning button
      colorClass = 'bg-gradient-to-b from-[#d4af37] via-[#b8952f] to-[#9a7a27] text-white border-2 border-[#d4af37]/40';
      shadowClass = 'shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-3px_8px_rgba(0,0,0,0.4),0_6px_0_0_#6d5a1d,0_10px_20px_rgba(212,175,55,0.5),0_15px_35px_rgba(0,0,0,0.4)]';
      effectClass = 'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t after:from-transparent after:via-white/10 after:to-white/25 after:pointer-events-none';
    } else if (state === 'absent') {
      // Absent - Darkened inactive button
      colorClass = 'bg-gradient-to-b from-[#2f3439] via-[#272b30] to-[#1d2024] text-gray-500 border-2 border-[#3a3d45]/30';
      shadowClass = 'shadow-[inset_0_2px_6px_rgba(255,255,255,0.03),inset_0_-3px_8px_rgba(0,0,0,0.6),0_6px_0_0_#0f1115,0_10px_20px_rgba(0,0,0,0.5)]';
    } else {
      // Unused - Default steel mechanical button
      colorClass = 'bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white border-2 border-[#5a6070]/50';
      shadowClass = 'shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.4),0_6px_0_0_#1a1d23,0_10px_20px_rgba(0,0,0,0.5),0_2px_4px_rgba(255,255,255,0.1)]';
      effectClass = 'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t after:from-transparent after:via-white/5 after:to-white/15 after:pointer-events-none';
    }
    
    // Interactive states with realistic mechanical press
    const interactiveClass = `
      hover:brightness-110 
      hover:-translate-y-1 
      hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.2),inset_0_-3px_8px_rgba(0,0,0,0.3),0_8px_0_0_#1a1d23,0_12px_25px_rgba(0,0,0,0.6)]
      active:translate-y-2 
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.6),inset_0_-1px_3px_rgba(255,255,255,0.1),0_2px_0_0_#0f1115]
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;
    
    return `${baseClass} ${sizeClass} ${colorClass} ${shadowClass} ${effectClass} ${interactiveClass}`;
  };

  return (
    <div 
      className="w-full max-w-[380px] md:max-w-[550px] mt-3 p-3 sm:p-4 md:p-6 rounded-2xl relative"
      style={{
        perspective: '1200px',
        background: 'linear-gradient(145deg, #1e2128, #17191f)',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5), inset 0 -2px 6px rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.4)',
        border: '2px solid rgba(42,45,53,0.5)'
      }}
    >
      {/* Mechanical plate texture */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)
          `
        }}
      />
      
      <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 relative z-10" style={{transformStyle: 'preserve-3d'}}>
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center w-full md:w-auto gap-[1vw] md:gap-2 px-[1vw] md:px-0"
            style={{
              transform: `rotateX(${1.5 - rowIndex * 0.5}deg) translateZ(${rowIndex * 2}px)`,
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
                  <span className="relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                    {key === '←' ? <FaDeleteLeft /> : key}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
