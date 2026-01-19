import { useState, useEffect } from 'react';

interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // Index 0 = 1 guess, Index 5 = 6 guesses
}

export function StatsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0]
  });

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('mechacrypt-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [isOpen]); // Reload when modal opens

  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const maxGuesses = Math.max(...stats.guessDistribution, 1);

  return (
    <>
      {/* Stats Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white border-2 border-[#5a6070]/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110 active:scale-95"
        style={{
          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.4), 0 6px 0 0 #1a1d23, 0 10px 20px rgba(0,0,0,0.5)'
        }}
        aria-label="Game Statistics"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" 
          />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="pointer-events-auto animate-slide-up bg-gradient-to-br from-[#22252d] to-[#1a1d23] rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-white/10 max-w-md w-full max-h-[90vh] overflow-y-auto"
              style={{
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 80px rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-black text-white font-display tracking-wide mb-2">
                    STATISTICS
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Your gameplay analytics
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-2xl font-black text-white font-display">{stats.gamesPlayed}</div>
                    <div className="text-xs text-gray-400 mt-1">Played</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-2xl font-black text-white font-display">{winPercentage}</div>
                    <div className="text-xs text-gray-400 mt-1">Win %</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-2xl font-black text-white font-display">{stats.currentStreak}</div>
                    <div className="text-xs text-gray-400 mt-1">Current</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-2xl font-black text-white font-display">{stats.maxStreak}</div>
                    <div className="text-xs text-gray-400 mt-1">Max</div>
                  </div>
                </div>

                {/* Guess Distribution */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Guess Distribution</h3>
                  <div className="space-y-2">
                    {stats.guessDistribution.map((count, index) => {
                      const percentage = maxGuesses > 0 ? (count / maxGuesses) * 100 : 0;
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div className="text-xs text-gray-400 font-mono w-3">{index + 1}</div>
                          <div className="flex-1 bg-black/30 rounded h-6 relative overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gradient-to-r from-[#4a9d52] to-[#5fb368] transition-all duration-500 flex items-center justify-end px-2"
                              style={{ width: `${Math.max(percentage, count > 0 ? 8 : 0)}%` }}
                            >
                              {count > 0 && (
                                <span className="text-xs font-bold text-white">{count}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Info text */}
                {stats.gamesPlayed === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">
                      Play your first game to see statistics!
                    </p>
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-3 bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white rounded-lg font-bold hover:brightness-110 transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-2 border-[#5a6070]/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(74, 80, 96, 0.3)'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
