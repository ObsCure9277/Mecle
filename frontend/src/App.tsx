import { useEffect } from 'react';
import { KeyboardInput } from './components/ui/KeyboardInput';
import { FlipCard } from './components/ui/FlipCard';
import { InfoModal } from './components/ui/InfoModal';
import { StatsModal } from './components/ui/StatsModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { useGameStore } from './stores/gameStore';
import './index.css';

function App() {
  const fetchDailyWord = useGameStore(state => state.fetchDailyWord);

  useEffect(() => {
    fetchDailyWord();
    useGameStore.setState({ cameraMode: 'gameplay' });
  }, [fetchDailyWord]);

  return (
    <div className="max-w-[650px] mx-auto min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6">
      {/* Header */}
      <header className="mb-4 sm:mb-6 w-full max-w-[550px]">
        {/* Title in the center */}
        <div className="flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider" style={{
            textShadow: `
              0 1px 0 rgba(255,255,255,0.4),
              0 2px 0 rgba(0,0,0,0.2),
              0 3px 0 rgba(0,0,0,0.2),
              0 4px 0 rgba(0,0,0,0.2),
              0 5px 0 rgba(0,0,0,0.2),
              0 6px 0 rgba(0,0,0,0.2),
              0 7px 0 rgba(0,0,0,0.3),
              0 8px 0 rgba(0,0,0,0.3),
              0 9px 12px rgba(0,0,0,0.5),
              0 12px 20px rgba(0,0,0,0.6)
            `
          }}>
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
        </div>
        
        {/* Info and Stats buttons in a row */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <InfoModal />
          <StatsModal />
          <SettingsModal />
        </div>
      </header>

      {/* Flip Card: Game Grid / Game Status */}
      <FlipCard />

      {/* Keyboard Input */}
      <div className="flex justify-center">
        <KeyboardInput />
      </div>

      {/* Footer */}
      <footer className="mt-4 sm:mt-6 text-center text-xs text-gray-500">
        <p className="font-mono tracking-wider">MECHACRYPT • MECHANICAL SYSTEMS ACTIVE</p>
      </footer>
    </div>
  );
}

export default App;
