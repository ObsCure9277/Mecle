import { useGameStore } from '../../stores/gameStore';

export function GameGrid() {
  const guesses = useGameStore(state => state.guesses);
  const currentRow = useGameStore(state => state.currentRow);
  const currentCol = useGameStore(state => state.currentCol);

  const getTileClass = (rowIndex: number, colIndex: number) => {
    const tile = guesses[rowIndex][colIndex];
    const isCurrentTile = rowIndex === currentRow && colIndex === currentCol;
    
    // Base neumorphic mechanical tile
    let classes = 'w-16 h-16 flex items-center justify-center text-2xl font-black uppercase transition-all duration-300 relative rounded-lg';
    
    // Neumorphic 3D effect with realistic lighting
    classes += ' transform-gpu';
    
    // State-based neumorphic styling with mechanical depth
    if (tile.state === 'correct') {
      // Correct - Glowing green mechanical display
      classes += ' text-white font-black';
      classes += ' bg-gradient-to-br from-[#5fb368] via-[#4a9d52] to-[#3d7f44]';
      classes += ' shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_6px_rgba(0,0,0,0.4),0_8px_16px_rgba(79,157,82,0.4),0_4px_8px_rgba(0,0,0,0.6)]';
      classes += ' border-2 border-[#5fb368]/50';
      classes += ' after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-white/10 after:to-white/20 after:pointer-events-none';
    } else if (tile.state === 'present') {
      // Present - Amber warning mechanical display
      classes += ' text-white font-black';
      classes += ' bg-gradient-to-br from-[#d4af37] via-[#b8952f] to-[#9a7a27]';
      classes += ' shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_6px_rgba(0,0,0,0.4),0_8px_16px_rgba(212,175,55,0.4),0_4px_8px_rgba(0,0,0,0.6)]';
      classes += ' border-2 border-[#d4af37]/50';
      classes += ' after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-white/10 after:to-white/20 after:pointer-events-none';
    } else if (tile.state === 'absent') {
      // Absent - Dark inactive mechanical tile
      classes += ' text-gray-400 font-black';
      classes += ' bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23]';
      classes += ' shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_6px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.5)]';
      classes += ' border-2 border-[#3a3d45]/30';
    } else if (tile.letter) {
      // Has letter - Active input state with blue glow
      classes += ' text-white font-black';
      classes += ' bg-gradient-to-br from-[#3a4556] via-[#2f3947] to-[#252d38]';
      classes += ' shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_6px_rgba(0,0,0,0.5),0_6px_12px_rgba(59,130,246,0.3),0_3px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.2)]';
      classes += ' border-2 border-blue-500/40';
      classes += ' ring-2 ring-blue-400/20';
      classes += ' after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-transparent after:via-white/5 after:to-white/10 after:pointer-events-none';
    } else {
      // Empty mechanical socket
      classes += ' text-transparent';
      classes += ' bg-gradient-to-br from-[#1e2128] via-[#17191f] to-[#0f1115]';
      classes += ' shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),inset_0_-2px_4px_rgba(255,255,255,0.03),0_2px_4px_rgba(0,0,0,0.4)]';
      classes += ' border-2 border-[#2a2d35]/40';
    }
    
    // Current tile pulse effect
    if (isCurrentTile && tile.letter === '') {
      classes += ' animate-pulse border-blue-500/60 ring-2 ring-blue-400/30';
    }
    
    // Pressed effect
    classes += ' active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] active:scale-98';
    
    // Subtle tilt for depth
    classes += ' hover:scale-105 cursor-default';
    
    return classes;
  };

  return (
    <div 
      className="flex flex-col gap-2 mb-3 p-8 rounded-2xl relative"
      style={{
        perspective: '1200px',
        background: 'linear-gradient(145deg, #1e2128, #17191f)',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5), inset 0 -2px 6px rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.4)',
        border: '2px solid rgba(42,45,53,0.5)'
      }}
    >
      {/* Mechanical plate texture overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)
          `
        }}
      />
      
      {guesses.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="flex gap-2 justify-center"
          style={{transformStyle: 'preserve-3d'}}
        >
          {row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getTileClass(rowIndex, colIndex)}
              style={{
                transform: tile.letter ? 'rotateX(-1deg) translateZ(4px)' : 'rotateX(0deg)',
                transformStyle: 'preserve-3d',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {tile.letter}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
