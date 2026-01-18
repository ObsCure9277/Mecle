import { useEffect } from 'react';
import { KeyboardInput } from './components/ui/KeyboardInput';
import { GameStatus } from './components/ui/GameStatus';
import { GameGrid } from './components/ui/GameGrid';
import { useGameStore } from './stores/gameStore';
import './index.css';

function App() {
  const fetchDailyWord = useGameStore(state => state.fetchDailyWord);

  useEffect(() => {
    fetchDailyWord();
    useGameStore.setState({ cameraMode: 'gameplay' });
  }, [fetchDailyWord]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 relative">
      {/* Metallic console background */}
      <div 
        className="w-full max-w-4xl mx-auto p-10 rounded-3xl relative"
        style={{
          background: 'linear-gradient(145deg, #22252d, #1a1d23)',
          boxShadow: `
            inset 0 2px 8px rgba(255,255,255,0.05),
            inset 0 -4px 12px rgba(0,0,0,0.6),
            0 20px 60px rgba(0,0,0,0.6),
            0 10px 30px rgba(0,0,0,0.4)
          `,
          border: '3px solid rgba(52,58,70,0.4)'
        }}
      >
        {/* Brushed metal texture overlay */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%),
              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.01) 1px, rgba(255,255,255,0.01) 2px)
            `
          }}
        />
        
        {/* Header */}
        <header className="mb-6 text-center relative z-10">
          <h1 className="text-5xl font-black tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            <span className="inline-block bg-gradient-to-br from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">M</span>
            <span className="inline-block bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">E</span>
            <span className="inline-block bg-gradient-to-br from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">C</span>
            <span className="inline-block bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">H</span>
            <span className="inline-block bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">A</span>
            <span className="inline-block bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">C</span>
            <span className="inline-block bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">R</span>
            <span className="inline-block bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Y</span>
            <span className="inline-block bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 bg-clip-text text-transparent">P</span>
            <span className="inline-block bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">T</span>
          </h1>
        </header>

        {/* Game Status */}
        <GameStatus />

        {/* Game Grid */}
        <div className="flex justify-center">
          <GameGrid />
        </div>

        {/* Keyboard Input */}
        <div className="flex justify-center">
          <KeyboardInput />
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-gray-500 relative z-10">
          <p className="font-mono tracking-wider">MECHACRYPT v1.0 • MECHANICAL SYSTEMS ACTIVE</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
