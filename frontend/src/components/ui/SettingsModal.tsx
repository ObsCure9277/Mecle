import { useState } from 'react';
import { FaGear } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useGameStore, type GameMode } from '../../stores/gameStore';

export function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const gameMode = useGameStore(state => state.gameMode);
  const navigate = useNavigate();

  const handleModeChange = (mode: GameMode) => {
    navigate(`/${mode}`);
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white border-2 border-[#5a6070]/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110 active:scale-95"
        style={{
          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.4), 0 6px 0 0 #1a1d23, 0 10px 20px rgba(0,0,0,0.5)'
        }}
        aria-label="Settings"
      >
        <FaGear className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="pointer-events-auto animate-slide-up bg-gradient-to-br from-[#22252d] to-[#1a1d23] rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-white/10 max-w-md w-full"
              style={{
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 80px rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-black text-white font-display tracking-wide mb-2">
                    SETTINGS
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Customize your game experience
                  </p>
                </div>

                {/* Settings Content */}
                <div className="space-y-4">
                  {/* Game Mode Setting */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-white uppercase tracking-wider">
                      Game Mode
                    </label>
                    <select
                      value={gameMode}
                      onChange={(e) => handleModeChange(e.target.value as GameMode)}
                      className="w-full px-4 py-3 bg-gradient-to-b from-[#2a2d35] via-[#22252b] to-[#1a1d23] text-white rounded-lg border-2 border-[#3a3d45]/50 font-bold text-sm cursor-pointer transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      style={{
                        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <option 
                        value="daily"
                        className="bg-[#1a1d23] text-white py-2 font-bold"
                      >
                        Daily - One puzzle per day
                      </option>
                      <option 
                        value="hourly"
                        className="bg-[#1a1d23] text-white py-2 font-bold"
                      >
                        Hourly - New puzzle every hour
                      </option>
                      <option 
                        value="infinite"
                        className="bg-[#1a1d23] text-white py-2 font-bold"
                      >
                        Infinite - Unlimited puzzles
                      </option>
                    </select>
                    <p className="text-xs text-gray-400">
                      {gameMode === 'daily' && 'Solve one puzzle per day, resets at midnight'}
                      {gameMode === 'hourly' && 'New puzzle every hour'}
                      {gameMode === 'infinite' && 'Play as many puzzles as you want'}
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-3 bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white rounded-lg font-bold hover:brightness-110 transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-2 border-[#5a6070]/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(74, 80, 96, 0.3)'
                  }}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
