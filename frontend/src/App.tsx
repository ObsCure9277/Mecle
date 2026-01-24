import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { KeyboardInput } from './components/ui/KeyboardInput';
import { FlipCard } from './components/ui/FlipCard';
import { InfoModal } from './components/ui/InfoModal';
import { StatsModal } from './components/ui/StatsModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { GameModeIndicator } from './components/ui/GameModeIndicator';
import { MoreModal } from './components/ui/MoreModal';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useGameStore } from './stores/gameStore';
import './index.css';

function App() {
  const fetchDailyWord = useGameStore(state => state.fetchDailyWord);
  const targetWord = useGameStore(state => state.targetWord);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      await fetchDailyWord();
      useGameStore.setState({ cameraMode: 'gameplay' });
      // Small delay to ensure smooth transition
      setTimeout(() => setIsLoading(false), 3000);
    };
    
    loadGame();
  }, [fetchDailyWord]);

  // Show loading screen while fetching initial word
  if (isLoading || !targetWord) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Mechacrypt - 3D Mechanical Word Puzzle Game | Daily Brain Challenge</title>
        <meta name="description" content="Play Mechacrypt, a stunning 3D mechanical word puzzle game. Solve daily 5-letter encryptions with tactile LED feedback. Free brain-teasing fun!" />
        <link rel="canonical" href="https://mechacrypt.vercel.app/" />
      </Helmet>

      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to main content
      </a>

      <div className="w-full max-w-[500px] md:max-w-[650px] mx-auto h-[100dvh] md:h-auto md:min-h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-between md:justify-center relative px-2 py-2 md:px-6 md:py-6 safe-area-inset-bottom">
        {/* Header */}
        <header className="w-full flex-none pt-2 md:pt-0 mb-2 md:mb-6 md:max-w-[550px]" role="banner">
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
          <nav className="flex items-center justify-center gap-4 mt-2 md:mt-8" aria-label="Game controls">
            <GameModeIndicator />
            <InfoModal />
            <StatsModal />
            <SettingsModal />
            <MoreModal />
          </nav>
        </header>

        {/* Main game area */}
        <main id="main-content" className="w-full" role="main">
          {/* Flip Card: Game Grid / Game Status */}
          <FlipCard />

          {/* Keyboard Input */}
          <div className="flex justify-center">
            <KeyboardInput />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-1 md:mt-6 text-center text-[10px] md:text-xs text-gray-500 flex-none pb-1 md:pb-0" role="contentinfo">
          <p className="font-mono tracking-wider">MECHACRYPT • MECHANICAL SYSTEMS ACTIVE</p>
        </footer>
      </div>
    </>
  );
}

export default App;
