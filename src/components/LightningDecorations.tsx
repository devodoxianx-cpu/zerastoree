import type { FC } from 'react';

interface LightningDecorationsProps {
  variant?: 'hero' | 'catalog' | 'about' | 'global';
}

export const LightningDecorations: FC<LightningDecorationsProps> = ({ variant = 'global' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10">
      {/* Dynamic Layered Mesh Gradient */}
      <div className="absolute top-0 left-1/4 w-[450px] sm:w-[700px] h-[350px] sm:h-[450px] bg-gradient-to-br from-yellow-500/12 via-amber-500/6 to-transparent blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-[350px] sm:w-[500px] h-[300px] bg-gradient-to-tl from-yellow-400/10 via-amber-600/5 to-transparent blur-[100px] rounded-full" />

      {/* Subtle diagonal energy gradient ray */}
      <div className="absolute -top-24 left-1/3 w-[800px] h-[300px] bg-gradient-to-r from-transparent via-[#FFE600]/5 to-transparent rotate-12 blur-3xl" />

      {/* Decorative Electric Lightning Arcs (Kilatan Petir) - Top Right */}
      <div className="absolute top-4 right-4 sm:right-16 w-48 sm:w-80 h-48 sm:h-80 opacity-55 animate-lightning">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,230,0,0.7)]"
        >
          {/* Main Primary Lightning Bolt Path */}
          <path
            d="M 130 10 L 105 70 L 145 80 L 80 155 L 98 108 L 65 98 L 120 20"
            stroke="url(#lightningGrad1)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Secondary branching lightning discharge */}
          <path
            d="M 105 70 L 68 85 L 50 120"
            stroke="#FFE600"
            strokeWidth="1.4"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />
          <path
            d="M 80 155 L 92 185 L 70 198"
            stroke="#FFE600"
            strokeWidth="1.4"
            strokeOpacity="0.9"
            strokeLinecap="round"
          />
          <circle cx="130" cy="10" r="3" fill="#FFE600" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="80" cy="155" r="2.5" fill="#F59E0B" />
          <defs>
            <linearGradient id="lightningGrad1" x1="130" y1="10" x2="70" y2="198" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF04B" />
              <stop offset="0.5" stopColor="#FFE600" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative Electric Lightning Arcs - Bottom Left */}
      <div className="absolute bottom-6 left-2 sm:left-14 w-44 sm:w-72 h-44 sm:h-72 opacity-50 animate-lightning-fast">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,230,0,0.6)]"
        >
          {/* Upward zigzagging electric discharge */}
          <path
            d="M 75 190 L 100 130 L 65 120 L 125 45 L 108 92 L 140 102 L 85 180"
            stroke="url(#lightningGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Branch discharge */}
          <path
            d="M 100 130 L 142 116 L 160 82"
            stroke="#FFE600"
            strokeWidth="1.3"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />
          <circle cx="125" cy="45" r="2.5" fill="#FFE600" />
          <defs>
            <linearGradient id="lightningGrad2" x1="75" y1="190" x2="125" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.5" stopColor="#FFE600" />
              <stop offset="1" stopColor="#FFF04B" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Center Subtle Electric Sparks */}
      {variant === 'hero' && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-36 opacity-35">
          <svg viewBox="0 0 800 120" fill="none" className="w-full h-full">
            <path
              d="M 50 60 Q 200 20 400 65 T 750 50"
              stroke="rgba(255, 230, 0, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            {/* Quick electric fork */}
            <path
              d="M 385 62 L 402 48 L 396 76 L 422 56"
              stroke="#FFE600"
              strokeWidth="2"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(255,230,0,0.8)]"
            />
          </svg>
        </div>
      )}

      {/* Subtle Horizontal Layer Border Gradient with micro-glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFE600]/40 to-transparent" />
    </div>
  );
};
