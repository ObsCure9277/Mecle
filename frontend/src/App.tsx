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
    <div className="min-h-screen flex flex-col items-center justify-center py-4 px-4">
      {/* Header - Foodle style colorful logo */}
      <header className="mb-4">
        <h1 className="text-4xl font-bold tracking-wider">
          <span className="text-cyan-400">M</span>
          <span className="text-green-400">E</span>
          <span className="text-yellow-400">C</span>
          <span className="text-blue-500">H</span>
          <span className="text-pink-500">A</span>
          <span className="text-red-500">C</span>
          <span className="text-purple-400">R</span>
          <span className="text-orange-400">Y</span>
          <span className="text-lime-400">P</span>
          <span className="text-indigo-400">T</span>
        </h1>
      </header>

      {/* Game Status */}
      <GameStatus />

      {/* Game Grid */}
      <div className="mb-4">
        <GameGrid />
      </div>

      {/* Keyboard Input */}
      <KeyboardInput />

      {/* Footer */}
      <footer className="mt-4 text-center text-xs text-gray-600">
        <p>MECHACRYPT v1.0</p>
      </footer>
    </div>
  );
}

export default App;
