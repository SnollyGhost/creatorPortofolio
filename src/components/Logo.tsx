import React from 'react';
import logoWebp from '../assets/logo.webp';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`relative ${className} group-hover:scale-105 transition-transform duration-500 flex items-center justify-center`}>
      {/* Dynamic ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl opacity-20 blur-md group-hover:opacity-45 transition-opacity duration-500" />
      
      {/* High-quality WebP logo image */}
      <img 
        src={logoWebp} 
        alt="Naftech Logo" 
        className="w-full h-full object-cover rounded-xl border border-white/10 relative z-10 drop-shadow-[0_0_8px_rgba(147,51,234,0.3)] group-hover:border-brand-purple/40 transition-colors duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

