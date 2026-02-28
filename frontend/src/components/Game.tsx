import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { KeyboardInput } from './ui/KeyboardInput';
import { FlipCard } from './ui/FlipCard';
import { InfoModal } from './ui/InfoModal';
import { StatsModal } from './ui/StatsModal';
import { SettingsModal } from './ui/SettingsModal';
import { GameModeIndicator } from './ui/GameModeIndicator';
import { MoreModal } from './ui/MoreModal';
import { LoadingScreen } from './ui/LoadingScreen';
import { useGameStore, type GameMode } from '../stores/gameStore';

interface GameProps {
  mode: GameMode;
}

export function Game({ mode }: GameProps) {
  const targetWord = useGameStore(state => state.targetWord);
  const setGameMode = useGameStore(state => state.setGameMode);
  const [isLoading, setIsLoading] = useState(true);

  // Sync mode from prop to store
  useEffect(() => {
    // Only set if different to avoid loop/overhead? 
    // setGameMode already handles logic, but it's an async action.
    setGameMode(mode);
  }, [mode, setGameMode]);

  useEffect(() => {
    const loadGame = async () => {
      // Logic from previous App.tsx - ensuring we fetch/init
      // Since setGameMode(mode) was called above, it triggers data loading.
      // But we might need to handle the initial loading state here.
      
      // Wait for the word to be populated?
      // Actually setGameMode handles fetching.
      // We just need to handle the "loading screen" visual.
      
      useGameStore.setState({ cameraMode: 'gameplay' });
      // Small delay to ensure smooth transition
      setTimeout(() => setIsLoading(false), 3000);
    };
    
    // We can just rely on the store's state or a simple timeout 
    // if setGameMode is doing the fetching.
    loadGame();
  }, []); // Only run on mount? Or when mode changes? 
  // If mode changes, we probably want to show loading again? 
  // For now let's keep it simple.

  // Re-trigger loading screen if mode changes significantly?
  // Current logic in App.tsx had separate useEffects.
  // We'll combine relevant parts.
  
  // Show loading screen while fetching initial word
  if (isLoading || !targetWord) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>MECLE - 3D Mechanical Word Puzzle Game | Daily Brain Challenge</title>
        <meta name="description" content="Play MECLE, a stunning 3D mechanical word puzzle game. Solve daily 5-letter encryptions with tactile LED feedback. Free brain-teasing fun!" />
        <link rel="canonical" href="https://MECLE.vercel.app/" />
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
                <span className="inline-block bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">L</span>
                <span className="inline-block bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">E</span>
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
          <p className="font-mono tracking-wider">MECLE • MECHANICAL SYSTEMS ACTIVE</p>
        </footer>
      </div>
    </>
  );
}
