import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, Variants } from "framer-motion";
import { Instagram, Youtube, Facebook, ArrowUpRight, Sparkles, Box } from 'lucide-react';
import { SOCIAL_LINKS, CREATOR_NAME, STATS } from '../lib/data';

const StatItem = ({ value, label }: { value: string, label: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));
  const isK = value.includes('K') || value.includes('k');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // Snappy 1.5s animation
    const frameRate = 33; // Butter-smooth ~30 FPS saves 50% CPU render cycles
    const totalFrames = duration / frameRate;
    const increment = targetValue / totalFrames;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [targetValue, isInView]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center group p-6 rounded-3xl bg-white/[0.01] border border-white/[0.03] hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 md:backdrop-blur-sm shadow-xl text-center w-full"
    >
      <div className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tighter group-hover:text-brand-purple transition-all duration-300 flex items-center justify-center gap-1">
        <span>{displayValue}{isK ? 'K' : ''}</span>
        <span className="text-brand-purple text-3xl font-semibold">+</span>
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 group-hover:text-white/70 transition-colors mt-2 text-center leading-normal select-none">
        {label}
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      
      {/* Interactive Cursor Glow (Spline / Magnific dynamic spotlight style) */}
      <motion.div
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 120, mass: 0.6 }}
        className="hidden lg:block absolute w-[400px] h-[400px] rounded-full bg-brand-purple/15 blur-[120px] pointer-events-none z-0"
        style={{ left: 0, top: 0 }}
      />

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 text-brand-offwhite pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-5 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-5 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[140px]" 
        />
        <div className="absolute inset-0 mesh-gradient opacity-20" />
      </div>

      {/* Floating 3D Creative Glass Shapes (Non-Boring immersive spatial vibes) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating Capsule 1 */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            rotate: [0, 40, 0],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-10 md:left-[15%] w-16 md:w-24 h-32 md:h-48 rounded-full border border-white/10 bg-gradient-to-tr from-white/5 to-white/[0.01] backdrop-blur-xl flex flex-col items-center justify-center text-white/10 shadow-2xl opacity-40 md:opacity-75"
        >
          <Box className="w-6 h-6 md:w-8 md:h-8 animate-pulse text-white/20" />
        </motion.div>

        {/* Floating Capsule 2 (Metallic glass node) */}
        <motion.div
          animate={{
            y: [0, 45, 0],
            rotate: [0, -30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-8 md:right-[12%] bottom-32 w-16 md:w-20 h-32 md:h-40 rounded-full border border-white/[0.08] bg-gradient-to-b from-brand-purple/15 to-transparent backdrop-blur-md flex items-center justify-center shadow-2xl opacity-40 md:opacity-85"
        >
          <Sparkles className="w-5 h-5 text-brand-purple/40" />
        </motion.div>

        {/* Dynamic Glass Ring Overlay */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[18%] w-12 h-12 rounded-full border-2 border-dashed border-white/5 opacity-40 hidden md:block"
        />

        {/* Drifting Grid Lines */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/0 via-white/5 to-white/0 select-none pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-white/0 via-white/5 to-white/0 select-none pointer-events-none" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <h1 className="sr-only">Naftech | Nafyad Dachasa - Premium Tech Content Creator & Video Architect</h1>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/[0.07] mb-8 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">Creator Portfolio</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          role="heading"
          aria-level={2}
          className="text-6xl md:text-8xl lg:text-[9.5rem] font-display font-light leading-[0.82] tracking-tighter mb-10 select-none"
        >
          <span className="text-gradient block">TURNING</span>
          <span className="italic font-serif text-[#ECECEC] block my-1">CONTENT</span>
          <span className="text-brand-gradient font-bold drop-shadow-[0_0_55px_rgba(147,51,234,0.45)] block uppercase">INTO ATTENTION.</span>
        </motion.div>

        {/* Elevated Stats Display Grid (Aligned with high-end landing elements) */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-12"
        >
          <StatItem value={STATS.totalFollowers} label="Global Content Community" />
          <StatItem value={STATS.produced} label="High-Retention Videos Produced" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xl">
            <a
              href="#packages"
              className="group relative px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-brand-purple hover:text-white transition-all duration-500 overflow-hidden shadow-2xl shadow-white/5 text-center w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20"
            >
              <span>Start Collaboration</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#work"
              className="px-10 py-5 border border-white/10 text-white/70 font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:border-white hover:text-white hover:bg-white/[0.03] transition-all duration-500 text-center w-full sm:w-auto animate-pulse hover:animate-none flex items-center justify-center gap-1.5"
            >
              <span>Explore Works</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};
