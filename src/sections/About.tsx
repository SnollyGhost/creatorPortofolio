import React from 'react';
import { motion } from "framer-motion";
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


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
