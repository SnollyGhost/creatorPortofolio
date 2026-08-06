import React from 'react';
import { motion } from "framer-motion";
import { Cpu, Rocket, Coins, ArrowUpRight } from 'lucide-react';
import { NICHES } from '../lib/data';
import { cn } from '../lib/utils';

export const ExpertisePillars = () => {
  return (
    <section className="py-24 px-6 bg-[#040404] relative overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-display font-medium tracking-[0.35em] uppercase text-[10px] mb-4"
          >
            Core Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-light text-gradient leading-[0.9]"
          >
            The <span className="italic font-serif text-brand-offwhite">Three Universes</span> of Impact
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NICHES.map((niche, idx) => (
            <motion.div
              key={niche.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[36px] overflow-hidden border border-white/[0.06] bg-[#070707] transition-all duration-700 hover:border-brand-purple/20 hover:-translate-y-3.5 hover:shadow-[0_25px_60px_-15px_rgba(147,51,234,0.15)] flex flex-col"
            >
              {/* Spotlight Glass Beam Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/0 via-[#9333ea]/[0.02] to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className={cn("absolute inset-0 bg-gradient-to-b opacity-10 transition-opacity duration-700 group-hover:opacity-25", niche.color)} />
              
              <div className="p-8 md:p-9 flex flex-col justify-start gap-7 h-full z-10">
                <div className="flex justify-between items-start">
                   <motion.div 
                     animate={{ rotate: [0, 6, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center backdrop-blur-xl group-hover:scale-110 group-hover:bg-brand-purple/15 transition-all duration-500 shadow-lg"
                   >
                      {getIcon(niche.id)}
                   </motion.div>
                   <div className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-purple bg-brand-purple/10 px-4 py-1.5 rounded-full border border-brand-purple/20 group-hover:bg-brand-purple/25 group-hover:text-white transition-all duration-300">
                      Universe 0{idx + 1}
                   </div>
                </div>

                <div>
                   <div className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.35em] mb-2">{niche.subtitle}</div>
                   <h3 className="text-4xl font-display font-bold mb-4 tracking-tighter text-white group-hover:text-brand-purple transition-colors duration-500">{niche.title}</h3>
                   <p className="text-white/50 text-sm font-light leading-relaxed mb-8 opacity-90 group-hover:opacity-100 transition-all duration-500">
                     {niche.description}
                   </p>
                   
                   <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
                      <div>
                         <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">Key Performance</div>
                         <div className="text-2xl font-display font-medium text-white tracking-tight">{niche.metric}</div>
                      </div>
                      <div className="w-11 h-11 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all transform group-hover:translate-x-0 translate-x-2 opacity-50 group-hover:opacity-100">
                         <ArrowUpRight className="w-4 h-4" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Graphic Element In Background */}
              <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none mix-blend-screen">
                 {getLargeIcon(niche.id)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getIcon = (id: string) => {
  switch (id) {
    case 'tech': return <Cpu className="w-8 h-8 text-blue-400" />;
    case 'space': return <Rocket className="w-8 h-8 text-purple-400" />;
    case 'crypto': return <Coins className="w-8 h-8 text-amber-400" />;
    default: return <Cpu className="w-8 h-8" />;
  }
};

const getLargeIcon = (id: string) => {
  const props = { className: "w-64 h-64 text-white" };
  switch (id) {
    case 'tech': return <Cpu {...props} />;
    case 'space': return <Rocket {...props} />;
    case 'crypto': return <Coins {...props} />;
    default: return <Cpu {...props} />;
  }
};
