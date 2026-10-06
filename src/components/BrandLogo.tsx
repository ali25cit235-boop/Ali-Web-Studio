import awMonogramImg from '../assets/images/aw_monogram_icon_1791209636846.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({ size = 'md', showText = true, className = '' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circular Glowing AW Monogram Icon */}
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20 shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={awMonogramImg}
            alt="AW Monogram — Ali Web Studio"
            onError={(e) => {
              e.currentTarget.src = '/images/aw_monogram_icon_1791209636846.jpg';
            }}
            className="w-full h-full object-cover rounded-full"
            loading="eager"
          />
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <span className={`font-bold tracking-tight text-white font-display ${textClasses[size]} group-hover:text-indigo-200 transition-colors`}>
          Ali Web Studio
        </span>
      )}
    </div>
  );
}
