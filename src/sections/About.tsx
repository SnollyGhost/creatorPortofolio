import React from 'react';
import { motion } from "framer-motion";
import { Trophy, ExternalLink, GraduationCap } from 'lucide-react';
import { CREATOR_NAME, NAFYAD_INFO, STATS, CENTRAL_STATS } from '../lib/data';
import creatorImg from '../assets/creator.webp';

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 relative z-10 group">
              <img 
                src={creatorImg} 
                alt={`${CREATOR_NAME} - Creator & Strategist`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              {/* Dynamic ambient overlay with continuous slow breathing dark interval */}
              <motion.div 
                animate={{ opacity: [0.15, 0.55, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30 pointer-events-none mix-blend-multiply" 
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="absolute bottom-10 -right-10 glass p-6 rounded-2xl border-white/10 z-20 hidden md:block">
               <div className="text-[10px] font-bold text-brand-purple uppercase tracking-widest mb-1">Current Focus</div>
               <div className="text-sm font-display font-medium">Technology, Web3, and Space</div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              The Visionary
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-light text-gradient mb-8 !leading-[0.9]"
            >
              Beyond the <span className="italic font-serif text-brand-offwhite">Algorithm</span>.
            </motion.h2>
            
            <div className="space-y-6 text-white/50 font-light leading-relaxed text-lg text-justify">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <p>
                  Nafyad is a <span className="text-white font-medium">Computer Science graduate</span> and <span className="text-white font-medium">tech content creator</span> who is helping shape the digital world in <span className="text-white font-medium">Ethiopia</span>. As the founder of <span className="text-white font-medium underline decoration-brand-purple/30 underline-offset-4">NafTech</span>, he loves breaking down how modern technology works. He makes complicated topics like <span className="text-white font-medium">AI, blockchain, and space tech</span> easy for everyone to understand through <span className="text-white font-medium italic">clean, high-quality videos</span> and honest, <span className="text-white font-medium">research-backed insights</span>.
                </p>

                <p>
                  By combining his background in <span className="text-white font-medium">computer science</span> with creative <span className="text-white font-medium">video editing</span>, Nafyad explains international tech trends while keeping them relevant to our <span className="text-white font-medium">local community</span>. He cuts straight to the point to give you facts without the complicated jargon. Whether he is talking about the latest <span className="text-white font-medium italic">AI chatbots</span> or exploring what is next in space, he creates <span className="text-white font-medium">engaging, easy-to-follow content</span> for curious minds.
                </p>


              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-8 grid grid-cols-2 gap-8"
              >
                <div>
                   <div className="text-3xl font-display text-white mb-1">{STATS.totalFollowers}+</div>
                   <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Total Community</div>
                </div>
                <div>
                   <div className="text-3xl font-display text-white mb-1">{CENTRAL_STATS.brandPartnershipsCount}+</div>
                   <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Brand Partnerships</div>
                </div>
              </motion.div>

              {/* Key Milestones & Awards */}
              <div className="mt-6 space-y-3">
                {/* Telegram Digital Freedom Contest Milestone */}
                <motion.a
                  href="https://www.instagram.com/p/DaQgMMBNVQN/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5 group hover:border-amber-400/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer text-left block"
                  aria-label="View Telegram Digital Freedom Contest Winning Video on Instagram"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:scale-105 group-hover:bg-amber-400/20 transition-all duration-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        Telegram Digital Freedom Contest Winner
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-amber-300 border border-amber-400/30">
                        Official $200K Pool
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-amber-300 transition-colors flex-shrink-0" />
                  </div>
                </motion.a>

                {/* Bybit Africa Scholarship Winner Milestone */}
                <motion.a
                  href="https://x.com/BybitAfrica/status/1984356213891744087?a=oG7Yt4t68QhrAkQzrD0&s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5 group hover:border-amber-400/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer text-left block"
                  aria-label="Bybit Africa Scholarship Winner (#WSOT2025 #RewriteAndReshape)"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:scale-105 group-hover:bg-amber-400/20 transition-all duration-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        Bybit Africa Scholarship Winner
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-amber-300 border border-amber-400/30">
                          #WSOT2025
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-amber-300 border border-amber-400/30">
                          #RewriteAndReshape
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-amber-300 transition-colors flex-shrink-0" />
                  </div>
                </motion.a>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
