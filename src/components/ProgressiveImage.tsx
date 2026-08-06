import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: 'tech' | 'space' | 'crypto';
  className?: string;
  lowResSrc?: string; // Optional, very small version of the image for blur-up
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  category = 'tech',
  className,
  lowResSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const [retryWithFallback, setRetryWithFallback] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Reset state if the source URL changes (e.g. during category Switch)
  useEffect(() => {
    setIsLoaded(false);
    setErrorOccurred(false);
    setRetryWithFallback(false);
    setCurrentSrc(src);
  }, [src]);

  const fallbackUrls = {
    tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    space: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    crypto: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800',
  };

  const handleImageError = () => {
    if (!retryWithFallback) {
      setRetryWithFallback(true);
      setCurrentSrc(fallbackUrls[category] || fallbackUrls.tech);
    } else {
      setErrorOccurred(true);
    }
  };

  // Color configurations based on the Naftech portfolio theme
  const themeGlows = {
    tech: 'from-blue-950/40 via-cyan-950/30 to-[#080808] border-blue-500/10',
    space: 'from-purple-950/40 via-pink-950/30 to-[#080808] border-purple-500/10',
    crypto: 'from-amber-950/40 via-orange-950/30 to-[#080808] border-amber-500/10',
  };

  const particleColors = {
    tech: 'bg-cyan-500/10',
    space: 'bg-purple-500/10',
    crypto: 'bg-amber-500/10',
  };

  return (
    <div id="progressive-image-container" className="relative w-full h-full overflow-hidden bg-[#080808] select-none">
      {/* 1. Low-Res / Glow Shimmer Placeholder */}
      {!isLoaded && !errorOccurred && (
        <div 
          id="progressive-placeholder"
          className={cn(
            "absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-tr transition-all duration-700 animate-pulse",
            themeGlows[category]
          )}
        >
          {/* Custom WebP progressive blur-up shimmer line */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite] absolute inset-0" />
          </div>

          {/* Optional Low-resolution blur image if provided (Dual blur-up strategy) */}
          {lowResSrc && (
            <img
              src={lowResSrc}
              alt="placeholder"
              className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-110 opacity-70 transition-opacity duration-500 pointer-events-none"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Aesthetic mini-loader indicator */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={cn("w-6 h-6 rounded-full border border-t-transparent animate-spin", 
              category === 'tech' ? 'border-cyan-500/40 border-t-cyan-400' :
              category === 'space' ? 'border-purple-500/40 border-t-purple-400' :
              'border-amber-500/40 border-t-amber-400'
            )} />
            <span className="text-[8px] tracking-[0.2em] font-sans uppercase text-white/30 font-medium">NafTech High-Res</span>
          </div>
        </div>
      )}

      {/* 2. Error Fallback UI */}
      {errorOccurred && (
        <div 
          id="image-error-fallback"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-tr from-red-950/20 to-[#0c0c0c] border border-red-500/10 p-4"
        >
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="text-[9px] tracking-wider uppercase text-red-400/60 font-semibold">{alt}</span>
        </div>
      )}

      {/* 3. High-Res Image Element */}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 scale-100 filter-none" : "opacity-0 scale-105 blur-sm",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
