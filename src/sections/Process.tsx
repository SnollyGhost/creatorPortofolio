import React from 'react';
import { motion } from "framer-motion";
import { Search, PenTool, Video, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Viral Research & Hooks',
    description: 'We dismantle complex topics to find the "Technical Truth." Every word is audited for retention using psychological triggers and algorithmic optimization.',
    color: 'from-blue-500/20 to-cyan-500/0'
  },
  {
    icon: PenTool,
    title: 'Storytelling Logic',
    description: 'Translating Web3, AI, and Aerospace engineering into accessible narratives. We bridge the gap between "Scientific Fact" and "Audience Emotion".',
    color: 'from-purple-500/20 to-pink-500/0'
  },
  {
    icon: Video,
    title: 'High-Fidelity Production',
    description: 'Premium color grading, cinematic sound design, and precision-grade post-production. We build visual ecosystems that command authority.',
    color: 'from-amber-500/20 to-orange-500/0'
  },
  {
    icon: TrendingUp,
    title: 'Conversion & Growth',
    description: 'Data-driven distribution across TikTok, YouTube, and Meta. Every piece of content is engineered to move viewers toward conversion.',
    color: 'from-emerald-500/20 to-teal-500/0'
  }
];

export const Process = () => {
  return (
    <section id="process" className="py-24 px-6 bg-[#030303] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              The NAFYAD Methodology
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-display font-light text-gradient !leading-[0.85]"
            >
              Engineering <br />
              <span className="italic font-serif text-brand-offwhite">Retention</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 max-w-sm text-sm font-light leading-relaxed"
          >
            A systematic approach to content that merges technical clarity with cinematic storytelling.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              {/* Step Number Backdrop */}
              <div className="absolute -top-4 -right-4 text-9xl font-display font-bold text-white/[0.04] group-hover:text-brand-purple/10 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                0{idx + 1}
              </div>

              {/* Gradient Border Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-brand-purple/10 transition-all duration-500">
                  <step.icon className="w-5 h-5 text-white/40 group-hover:text-brand-purple transition-colors" />
                </div>
                
                <h3 className="text-xl font-display font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-500 flex items-center gap-2">
                  <span className="text-brand-purple font-black shrink-0">0{idx + 1}.</span>
                  <span className="font-light">{step.title}</span>
                </h3>
                
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
