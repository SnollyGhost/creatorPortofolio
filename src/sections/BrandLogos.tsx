import React from 'react';
import { BRANDS } from '../lib/data';

const MARQUEE_ITEMS = [...BRANDS, ...BRANDS];

const getLogoHeightClass = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('space apps') || lower.includes('nasa')) {
    return 'h-[50px] md:h-[58px]';
  }
  if (lower.includes('hawi') || lower.includes('ebw')) {
    return 'h-[52px] md:h-[60px]';
  }
  if (lower.includes('ehud') || lower.includes('hulugram')) {
    return 'h-12 md:h-14';
  }
  return 'h-10 md:h-12';
};

const MarqueeGroup = ({ groupKey, ariaHidden }: { groupKey: string; ariaHidden?: boolean }) => (
  <div
    className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
    aria-hidden={ariaHidden}
  >
    {MARQUEE_ITEMS.map((brand, idx) => (
      <div
        key={`${groupKey}-${idx}`}
        className="shrink-0 flex items-center justify-center whitespace-nowrap opacity-85 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <img
          src={brand.logo}
          alt={ariaHidden ? '' : brand.name}
          className={`shrink-0 object-contain w-auto ${getLogoHeightClass(brand.name)}`}
          loading="eager"
          decoding="sync"
          referrerPolicy="no-referrer"
        />
        <span className="ml-4 text-base md:text-lg font-display font-medium tracking-widest uppercase text-white/80 transition-colors duration-300 whitespace-nowrap">
          {brand.name}
        </span>
      </div>
    ))}
  </div>
);

export const BrandLogos = () => {
  return (
    <section className="py-8 md:py-24 bg-black overflow-hidden border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 mb-4 md:mb-8 text-center">
        <div className="text-[10px] font-display font-medium tracking-[0.3em] uppercase opacity-30">
          Trusted by Global Tech, Space & Web3 Entities
        </div>
      </div>

      {/* Viewport container with soft side gradient masks to eliminate edge pop-in */}
      <div
        className="relative overflow-hidden w-full select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Pure-CSS Infinite Scroll Track: w-max + shrink-0 + gap-0 with two mathematically identical halves */}
        <div className="flex w-max shrink-0 gap-0 items-center will-change-transform animate-marquee-smooth">
          <MarqueeGroup groupKey="copy-a" />
          <MarqueeGroup groupKey="copy-b" ariaHidden />
        </div>
      </div>
    </section>
  );
};
