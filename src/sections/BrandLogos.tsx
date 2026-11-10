import React from 'react';
import { BRANDS } from '../lib/data';

export const BrandLogos = () => {
  return (
    <section className="py-24 bg-black overflow-hidden border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <div className="text-[10px] font-display font-medium tracking-[0.3em] uppercase opacity-30">
          Trusted by Global Tech, Space & Web3 Entities
        </div>
      </div>
      
      {/* Container with soft side gradient masks to eliminate edge pop-in */}
      <div 
        className="flex relative items-center overflow-hidden w-full select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Infinite Scroll Track with Hardware Acceleration & Pause on Hover */}
        <div className="flex animate-marquee-smooth w-max items-center">
          {/* First Copy */}
          <div className="flex shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24">
            {BRANDS.map((brand, idx) => {
              const isHawi = brand.name.toLowerCase().includes('hawi');
              const isEbw = brand.name.toLowerCase().includes('ebw');
              const isArifGet = brand.name.toLowerCase().includes('arifget');
              const isEhud = brand.name.toLowerCase().includes('ehud');
              const isHulugram = brand.name.toLowerCase().includes('hulugram');
              const isNasa = brand.name.toLowerCase().includes('space apps') || brand.name.toLowerCase().includes('nasa');

              return (
                <div 
                  key={`first-${idx}`} 
                  className="flex-shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className={`object-contain ${
                      isNasa
                        ? 'h-[50px] md:h-[58px] w-auto'
                        : isEhud
                        ? 'h-12 md:h-14 w-auto'
                        : isHulugram
                        ? 'h-12 md:h-14 w-auto'
                        : isArifGet
                        ? 'h-10 md:h-12 w-auto'
                        : isHawi || isEbw
                        ? 'h-[52px] md:h-[60px] w-auto'
                        : 'h-10 md:h-12 w-auto'
                    }`}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <span className="ml-4 text-base md:text-lg font-display font-medium tracking-widest uppercase text-white/80 transition-colors duration-300 whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Identical Second Copy for seamless translation */}
          <div className="flex shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24" aria-hidden="true">
            {BRANDS.map((brand, idx) => {
              const isHawi = brand.name.toLowerCase().includes('hawi');
              const isEbw = brand.name.toLowerCase().includes('ebw');
              const isArifGet = brand.name.toLowerCase().includes('arifget');
              const isEhud = brand.name.toLowerCase().includes('ehud');
              const isHulugram = brand.name.toLowerCase().includes('hulugram');
              const isNasa = brand.name.toLowerCase().includes('space apps') || brand.name.toLowerCase().includes('nasa');

              return (
                <div 
                  key={`second-${idx}`} 
                  className="flex-shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className={`object-contain ${
                      isNasa
                        ? 'h-[50px] md:h-[58px] w-auto'
                        : isEhud
                        ? 'h-12 md:h-14 w-auto'
                        : isHulugram
                        ? 'h-12 md:h-14 w-auto'
                        : isArifGet
                        ? 'h-10 md:h-12 w-auto'
                        : isHawi || isEbw
                        ? 'h-[52px] md:h-[60px] w-auto'
                        : 'h-10 md:h-12 w-auto'
                    }`}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <span className="ml-4 text-base md:text-lg font-display font-medium tracking-widest uppercase text-white/80 transition-colors duration-300 whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-smooth {
          animation: marqueeScroll 45s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}} />
    </section>
  );
};
