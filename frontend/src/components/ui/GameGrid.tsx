import { useGameStore } from '../../stores/gameStore';

export function GameGrid() {
  const guesses = useGameStore(state => state.guesses);
  const currentRow = useGameStore(state => state.currentRow);
  const currentCol = useGameStore(state => state.currentCol);

  const getTileClass = (rowIndex: number, colIndex: number) => {
    const tile = guesses[rowIndex][colIndex];
    const isCurrentTile = rowIndex === currentRow && colIndex === currentCol;
    
    // Base classes with 3D effects
    let classes = 'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-all duration-200 relative';
    
    // 3D transform and shadow effects
    classes += ' transform-gpu perspective-1000';
    classes += ' hover:scale-105 hover:-translate-y-1';
    
    // State-based styling with 3D depth
    if (tile.state === 'correct') {
      classes += ' bg-gradient-to-br from-[#538d4e] to-[#3a6e3a] border-[#2d5a2d] text-white';
      classes += ' shadow-[0_4px_0_0_#2d5a2d,0_8px_20px_rgba(83,141,78,0.4)]';
    } else if (tile.state === 'present') {
      classes += ' bg-gradient-to-br from-[#b59f3b] to-[#9a8532] border-[#7a6a28] text-white';
      classes += ' shadow-[0_4px_0_0_#7a6a28,0_8px_20px_rgba(181,159,59,0.4)]';
    } else if (tile.state === 'absent') {
      classes += ' bg-gradient-to-br from-[#3a3a3c] to-[#2a2a2c] border-[#1a1a1c] text-white';
      classes += ' shadow-[0_4px_0_0_#1a1a1c,0_8px_20px_rgba(58,58,60,0.4)]';
    } else if (tile.letter) {
      // Has letter but not submitted yet - lighter border with 3D effect
      classes += ' bg-gradient-to-br from-gray-700 to-gray-800 border-[#565758] text-white';
      classes += ' shadow-[0_4px_0_0_#3a3a3c,0_8px_20px_rgba(86,87,88,0.3)]';
    } else {
      // Empty tile with subtle 3D depth
      classes += ' bg-gradient-to-br from-gray-800 to-gray-900 border-[#3a3a3c] text-white';
      classes += ' shadow-[0_2px_0_0_#1a1a1c,0_4px_10px_rgba(0,0,0,0.3)]';
    }
    
    // Current tile glow
    if (isCurrentTile && tile.letter === '') {
      classes += ' border-[#787c7e] ring-2 ring-blue-500/50';
    }
    
    // Active state (pressed down effect)
    classes += ' active:translate-y-1 active:shadow-[0_2px_0_0_#1a1a1c]';
    
    return classes;
  };

  return (
    <div className="flex flex-col gap-2 mb-8" style={{perspective: '1000px'}}>
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2" style={{transformStyle: 'preserve-3d'}}>
          {row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getTileClass(rowIndex, colIndex)}
              style={{
                transform: tile.letter ? 'rotateX(-2deg)' : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
