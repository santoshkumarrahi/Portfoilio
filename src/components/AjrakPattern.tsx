import React from 'react';

// Authentic Sindhi Ajrak geometric star motif (8-pointed khatam/rosette) with refined teal/navy and gold accents
export const AjrakStar: React.FC<{ className?: string; size?: number }> = ({ className = 'text-teal-600', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    {/* Central 8-pointed star */}
    <polygon points="50,10 62,38 90,50 62,62 50,90 38,62 10,50 38,38" fill="currentColor" fillOpacity="0.9" />
    <polygon points="50,22 58,42 78,50 58,58 50,78 42,58 22,50 42,42" fill="#0f172a" />
    <circle cx="50" cy="50" r="7" fill="#d97706" />
    {/* Surrounding Ajrak corner florets */}
    <circle cx="50" cy="8" r="4" fill="currentColor" fillOpacity="0.7" />
    <circle cx="92" cy="50" r="4" fill="currentColor" fillOpacity="0.7" />
    <circle cx="50" cy="92" r="4" fill="currentColor" fillOpacity="0.7" />
    <circle cx="8" cy="50" r="4" fill="currentColor" fillOpacity="0.7" />
  </svg>
);

// Ajrak decorative section divider line with central medallion
export const AjrakDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
    <div className="h-[1px] w-14 md:w-20 bg-gradient-to-r from-transparent via-teal-500/40 to-slate-300" />
    <AjrakStar size={16} className="text-teal-600" />
    <div className="h-[1px] w-14 md:w-20 bg-gradient-to-l from-transparent via-teal-500/40 to-slate-300" />
  </div>
);

// Subtle Ajrak geometric corner accent
export const AjrakCorner: React.FC<{ position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string }> = ({
  position = 'top-left',
  className = ''
}) => {
  const rotation = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90'
  }[position];

  return (
    <div className={`absolute pointer-events-none ${rotation} ${className}`}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="text-teal-600/30">
        <path d="M0 0 H40 V3 H3 V40 H0 Z" fill="currentColor" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <path d="M12 20 L20 12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};
