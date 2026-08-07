import React from 'react';
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Crown, Target, Globe } from 'lucide-react';
import { PACKAGES } from '../lib/data';
import { cn } from '../lib/utils';

interface PackagesProps {
  onSelectPackage: (pkgName: string) => void;
}

export const Packages = ({ onSelectPackage }: PackagesProps) => {
  const [currency, setCurrency] = React.useState<'ETB' | 'USD'>('ETB');

  return (
    <section id="packages" className="pt-28 pb-20 px-6 bg-[#050505] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-purple/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-2"
          >
            <Globe className="w-3 h-3" />
            Global Missions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-light text-gradient mb-6 !leading-[0.9]"
          >
            Partnership <span className="italic font-serif text-brand-offwhite">Options</span>
          </motion.h2>

          {/* Premium iOS-style tactile Segmented Currency Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-xl mt-6 relative"
          >
            <button
              onClick={() => setCurrency('ETB')}
              className={cn(
                "relative px-4 py-2 rounded-lg text-xs font-black tracking-widest uppercase select-none transition-all duration-300 z-10 cursor-pointer flex items-center gap-2",
                currency === 'ETB' ? "text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {currency === 'ETB' && (
                <motion.div
                  layoutId="active-currency-bg"
                  className="absolute inset-0 bg-brand-purple rounded-lg -z-10 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <img 
                src="https://flagcdn.com/w40/et.png" 
                alt="Ethiopia Flag" 
                className="w-4 h-3 object-cover rounded-[1px] select-none"
                referrerPolicy="no-referrer"
              />
              <span>ETB (Local)</span>
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={cn(
                "relative px-4 py-2 rounded-lg text-xs font-black tracking-widest uppercase select-none transition-all duration-300 z-10 cursor-pointer flex items-center gap-2",
                currency === 'USD' ? "text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {currency === 'USD' && (
                <motion.div
                  layoutId="active-currency-bg"
                  className="absolute inset-0 bg-brand-purple rounded-lg -z-10 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <img 
                src="https://flagcdn.com/w40/us.png" 
                alt="US Flag" 
                className="w-4 h-3 object-cover rounded-[1px] select-none"
                referrerPolicy="no-referrer"
              />
              <span>USD (Global)</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-6">
          {PACKAGES.map((pkg, idx) => {
            const isBlurred = !!pkg.isBlurred;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={cn(
                  "relative group flex flex-col p-5 md:p-6 rounded-2xl transition-all duration-550 border",
                  pkg.isHighlighted 
                    ? "bg-[#110920] border-brand-purple/50 scale-[1.03] z-10 shadow-2xl shadow-brand-purple/15 ring-2 ring-brand-purple/20 group-hover:bg-[#150a26]" 
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl hover:shadow-brand-purple/5"
                 )}
               >
                {/* Visual Glass Glow Reflection on Top of Card */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-white/25 transition-all duration-550" />
                
                <div className="absolute top-4 right-5 text-lg font-sans font-black text-brand-purple/40 group-hover:text-white transition-all duration-300">
                  0{idx + 1}
                </div>

                {/* Elegant floating badge precisely positioned centered on the top edge of the card */}
                {pkg.isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded bg-brand-purple text-white text-[8px] font-black uppercase tracking-[0.12em] flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.40)] whitespace-nowrap z-20">
                    <Crown className="w-2.5 h-2.5 text-white animate-pulse" />
                    Recommended Partnership
                  </div>
                )}
  
                <div className="mb-3 relative">
                  {/* Option Header text */}
                  <div className="flex items-center mb-2.5 pr-8">
                    <div className={cn(
                      "text-[11px] font-black uppercase tracking-[0.22em] transition-colors duration-300", 
                      pkg.isHighlighted ? "text-brand-purple" : "text-white/70 group-hover:text-white/90"
                    )}>
                      {pkg.name}
                    </div>
                  </div>
                  
                  {/* Pricing Slot: Perfectly Sized and Visual-Gap-Free */}
                  <div className="flex flex-col justify-center h-[72px] relative overflow-hidden rounded-lg">
                    {/* Beautifully Aligned Psychological Savings Badge */}
                    {pkg.savings ? (
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/15 w-fit mb-1.5 select-none animate-pulse">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                        <span>{pkg.savings}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/5 w-fit mb-1.5 select-none">
                        <span>Standard Rate</span>
                      </div>
                    )}

                    <div className="text-3xl font-black tracking-tight text-white flex items-baseline drop-shadow-sm relative select-none">
                      {/* Price text with elegant blur filter for premium curiosity */}
                      {currency === 'ETB' ? (
                        (() => {
                          const numericPart = pkg.price.replace(' ETB', '').replace('ETB', '').trim();
                          return (
                            <div className="flex items-baseline gap-1.5">
                              <span className="bg-gradient-to-r from-white to-white/95 bg-clip-text text-transparent blur-[6px] pointer-events-none">
                                {numericPart}
                              </span>
                              <span className="bg-gradient-to-r from-white to-white/95 bg-clip-text text-transparent">
                                ETB
                              </span>
                            </div>
                          );
                        })()
                      ) : (
                        (() => {
                          const rawUsd = pkg.usdPriceFormatted || `$${pkg.usdPrice.toLocaleString()}`;
                          const numericPart = rawUsd.replace('$', '').trim();
                          return (
                            <div className="flex items-baseline gap-1">
                              <span className="bg-gradient-to-r from-white to-white/95 bg-clip-text text-transparent">
                                $
                              </span>
                              <span className="bg-gradient-to-r from-white to-white/95 bg-clip-text text-transparent blur-[6px] pointer-events-none">
                                {numericPart}
                              </span>
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>

                  {/* High-Contrast Description */}
                  <p className="text-[11.5px] font-semibold text-white/80 leading-relaxed mt-3.5 min-h-[34px]">
                    {pkg.description}
                  </p>
                </div>
  
                {/* Features (Exactly 3 lines per card now!) */}
                <div className="space-y-2.5 mb-4 flex-grow">
                  <div className="h-px bg-white/10 w-full mb-3" />
                  {pkg.features.map(feature => (
                    <div key={feature} className="flex items-start gap-2 group/item py-0.5">
                      <div className={cn(
                        "p-0.5 rounded-full shrink-0 transition-colors duration-300 mt-0.5", 
                        pkg.isHighlighted ? "bg-brand-purple/20 text-brand-purple" : "bg-white/5 text-white/40 group-hover/item:text-brand-purple group-hover/item:bg-brand-purple/10"
                      )}>
                        <Check className="w-3 h-3 font-bold stroke-[3]" />
                      </div>
                      <span className="text-[11.5px] font-bold text-white/90 group-hover/item:text-white transition-colors duration-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
  
                {/* Bottom CTA Actions */}
                <div className="mt-auto pt-3 border-t border-white/10 space-y-3.5">
                  <div className="text-[9px] uppercase tracking-[0.12em] text-white/40 font-bold block bg-white/[0.02] border border-white/5 rounded-md px-2 py-1 select-none text-center">
                    Ideal for: <span className="text-white/90 font-bold">{pkg.idealFor}</span>
                  </div>
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={cn(
                      "w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg",
                      pkg.isHighlighted 
                        ? "bg-brand-purple text-white hover:bg-white hover:text-black shadow-brand-purple/20 hover:scale-[1.015]" 
                        : "border border-white/10 text-white/85 hover:bg-white hover:text-black hover:border-white hover:scale-[1.015]"
                     )}
                  >
                     Inquire Now
                     <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
