import type { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const Logo: FC<LogoProps> = ({ size = 'md', className = '', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Futuristic Geometric Z Logo in Bright Electric Yellow */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFE600] to-[#F59E0B] rounded-lg opacity-30 blur-sm animate-pulse"></div>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(255,230,0,0.6)]"
        >
          {/* Outer Cyber Frame */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="10"
            className="stroke-[#FFE600]/50 fill-[#0A0B0E]"
            strokeWidth="1.8"
          />
          {/* High-tech corner cuts */}
          <path d="M 2 12 L 12 2" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" />
          <path d="M 32 42 L 42 32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* Stylized Electric Z */}
          <path
            d="M 11 13 L 33 13 L 18 31 L 33 31"
            stroke="url(#zLogoGradYellow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Accent Dot */}
          <circle cx="29" cy="18" r="2" fill="#FFE600" />
          <defs>
            <linearGradient id="zLogoGradYellow" x1="11" y1="13" x2="33" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE600" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-gaming font-bold tracking-wider leading-none ${textSizes[size]}`}>
          <span className="text-[#FFE600] drop-shadow-[0_0_10px_rgba(255,230,0,0.65)]">ZERA</span>
          <span className="text-white">STORE</span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-yellow-400/80 font-mono tracking-widest uppercase mt-0.5">
            Top Up Gaming
          </span>
        )}
      </div>
    </div>
  );
};
