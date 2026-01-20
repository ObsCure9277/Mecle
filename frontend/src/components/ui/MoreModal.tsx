import { useState } from 'react';
import { FaEllipsisH, FaTimes } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa6';

export function MoreModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* More Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#4a5060] via-[#3d4452] to-[#2f3440] text-white border-2 border-[#5a6070]/50 flex items-center justify-center hover:brightness-110 transition-all duration-200"
        style={{
          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.4), 0 6px 0 0 #1a1d23, 0 10px 20px rgba(0,0,0,0.5)'
        }}
        aria-label="More"
      >
        <FaEllipsisH className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-2xl p-6 relative"
              style={{
                background: 'linear-gradient(145deg, #1e2128, #17191f)',
                boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5), inset 0 -2px 6px rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.4)',
                border: '2px solid rgba(42,45,53,0.5)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-b from-[#3a3d45] to-[#2a2d35] text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-black text-white mb-6 text-center">
                More Info
              </h2>

              {/* Social Links */}
              <div className="space-y-4 mb-6">
                <a
                  href="https://github.com/ObsCure9277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-b from-[#2a2d35] via-[#22252b] to-[#1a1d23] border-2 border-[#3a3d45]/50 hover:brightness-110 transition-all duration-200"
                  style={{
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  <FaGithub className="w-6 h-6 text-white" />
                  <span className="text-white font-bold">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ngshenzhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-b from-[#2a2d35] via-[#22252b] to-[#1a1d23] border-2 border-[#3a3d45]/50 hover:brightness-110 transition-all duration-200"
                  style={{
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  <FaLinkedin className="w-6 h-6 text-white" />
                  <span className="text-white font-bold">LinkedIn</span>
                </a>

                <a
                  href="https://ngshenzhi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-b from-[#2a2d35] via-[#22252b] to-[#1a1d23] border-2 border-[#3a3d45]/50 hover:brightness-110 transition-all duration-200"
                  style={{
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  <FaGlobe className="w-6 h-6 text-white" />
                  <span className="text-white font-bold">Portfolio</span>
                </a>
              </div>

              {/* Attribution */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Developed by{' '}
                  <a
                    href="https://ngshenzhi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-blue-400 transition-colors"
                  >
                    NG SHEN ZHI
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
