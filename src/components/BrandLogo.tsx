import React from 'react';

interface AAIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gradient' | 'mono' | 'white';
  className?: string;
}

export function AAIcon({ size = 'md', variant = 'gradient', className = '' }: AAIconProps) {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const isMono = variant === 'mono';
  const isWhite = variant === 'white';

  return (
    <div
      className={`relative ${sizeMap[size]} shrink-0 rounded-xl overflow-hidden flex items-center justify-center ${
        isMono
          ? 'bg-slate-800'
          : isWhite
          ? 'bg-white text-slate-950'
          : 'bg-[#0B101D] border border-blue-500/25 shadow-sm shadow-blue-500/10'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1.5"
      >
        <defs>
          <linearGradient id="aaGradComp" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F8CFF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="waveGradComp" x1="16" y1="36" x2="48" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>

        {/* Left 'A' Ascending Geometry */}
        <path
          d="M17 46L26 18L32 33"
          stroke={isMono ? '#94A3B8' : isWhite ? '#080B14' : 'url(#aaGradComp)'}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right 'A' Geometry */}
        <path
          d="M32 33L38 18L47 46"
          stroke={isMono ? '#94A3B8' : isWhite ? '#080B14' : 'url(#aaGradComp)'}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Voice Waveform & Neural Bridge */}
        <path
          d="M20 38H26L30 30L34 44L38 38H44"
          stroke={isMono ? '#CBD5E1' : isWhite ? '#080B14' : 'url(#waveGradComp)'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* AI Center Node */}
        <circle
          cx="32"
          cy="18"
          r="2.5"
          fill={isMono ? '#94A3B8' : isWhite ? '#080B14' : '#38BDF8'}
        />
      </svg>
    </div>
  );
}

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'gradient' | 'mono' | 'white';
  className?: string;
}

export default function BrandLogo({
  size = 'md',
  showText = true,
  variant = 'gradient',
  className = '',
}: BrandLogoProps) {
  const textClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract AA Monogram */}
      <AAIcon size={size} variant={variant} />

      {/* Official Wordmark: Ali AI Solutions */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight text-white font-display ${textClasses[size]}`}>
            Ali <span className="text-[#4F8CFF]">AI</span> Solutions
          </span>
          <span className="text-[10px] text-slate-400 font-sans tracking-wider uppercase mt-0.5">
            Voice Agents &bull; Automation
          </span>
        </div>
      )}
    </div>
  );
}
