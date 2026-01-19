import { useState } from 'react';

export function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Info Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white border-2 border-[#5a6070]/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110 active:scale-95"
        style={{
          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.4), 0 6px 0 0 #1a1d23, 0 10px 20px rgba(0,0,0,0.5)'
        }}
        aria-label="Game Information"
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
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" 
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
                    HOW TO PLAY
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Crack the mechanical code
                  </p>
                </div>

                {/* Instructions */}
                <div className="space-y-4 text-gray-300">
                  <p className="text-sm leading-relaxed">
                    Guess the <span className="text-white font-bold">5-letter word</span> in 6 attempts. 
                    After each guess, the mechanical tiles will illuminate to show how close your guess was.
                  </p>

                  {/* Examples */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Examples:</p>
                    
                    {/* Correct example */}
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5fb368] via-[#4a9d52] to-[#3d7f44] flex items-center justify-center text-white font-black text-lg border-2 border-[#5fb368]/50 shadow-lg">
                          W
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          O
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          R
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          D
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          S
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        <span className="text-[#6aaa64] font-bold">W</span> is in the word and in the correct spot.
                      </p>
                    </div>

                    {/* Present example */}
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          P
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#b8952f] to-[#9a7a27] flex items-center justify-center text-white font-black text-lg border-2 border-[#d4af37]/50 shadow-lg">
                          I
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          L
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          L
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          S
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        <span className="text-[#d4af37] font-bold">I</span> is in the word but in the wrong spot.
                      </p>
                    </div>

                    {/* Absent example */}
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          V
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          A
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          G
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          U
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a2d35] via-[#22252b] to-[#1a1d23] flex items-center justify-center text-gray-400 font-black text-lg border-2 border-[#3a3d45]/30">
                          E
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        None of these letters are in the word.
                      </p>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      <span className="text-white font-bold">Pro tip:</span> The mechanical keyboard tracks your letter usage. 
                      Green keys are correct, amber keys are in the word, and dark keys are not used.
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
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
