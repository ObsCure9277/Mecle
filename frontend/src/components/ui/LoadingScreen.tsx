import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: 'linear-gradient(135deg, #0f1115 0%, #17191f 50%, #0f1115 100%)'
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Mechanical Loading Spinner */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div 
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: 'linear-gradient(145deg, #2a2d35, #17191f)',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
              border: '4px solid rgba(42,45,53,0.5)',
              borderTopColor: '#538d4e',
              animationDuration: '1.5s'
            }}
          />
          
          {/* Inner circle */}
          <div 
            className="absolute inset-4 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #1e2128, #17191f)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.3)',
              border: '2px solid rgba(42,45,53,0.3)'
            }}
          >
            {/* Center dot */}
            <div 
              className="w-4 h-4 rounded-full bg-[#538d4e]"
              style={{
                boxShadow: '0 0 20px rgba(83, 141, 78, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)'
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-wider mb-2" style={{
            textShadow: `
              0 1px 0 rgba(255,255,255,0.3),
              0 2px 0 rgba(0,0,0,0.2),
              0 3px 0 rgba(0,0,0,0.2),
              0 4px 0 rgba(0,0,0,0.2),
              0 5px 8px rgba(0,0,0,0.4)
            `
          }}>
            <span className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">M</span>
            <span className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">E</span>
            <span className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">C</span>
            <span className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">H</span>
            <span className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">A</span>
            <span className="bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">C</span>
            <span className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent">R</span>
            <span className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Y</span>
            <span className="bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 bg-clip-text text-transparent">P</span>
            <span className="bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">T</span>
          </h2>
          
          <p className="text-gray-400 font-mono text-sm">
            Loading{dots}
          </p>
        </div>

        {/* Mechanical plate texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)
            `
          }}
        />
      </div>
    </div>
  );
}
