import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, Variants } from "framer-motion";
import { Instagram, Youtube, Facebook, ArrowUpRight, Sparkles, Box } from 'lucide-react';
import { SOCIAL_LINKS, CREATOR_NAME, STATS } from '../lib/data';

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.93-2.01 6.12-1.77 0 1.39-.02 2.77-.03 4.15-.8-.19-1.66-.19-2.4-.06-1.01.24-1.92.83-2.48 1.69-.53.76-.75 1.73-.59 2.64.12 1.05.7 2 1.57 2.63.94.71 2.15.91 3.32.74 1.33-.11 2.56-.88 3.23-2.03.41-.63.63-1.36.65-2.11V.02Z"/>
  </svg>
);

const SOCIAL_HERO_LINKS = [
  {
    name: 'TikTok',
    handle: '@nafyad_',
    followers: '94K',
    href: SOCIAL_LINKS.tiktok,
    icon: TiktokIcon,
    hoverClass: 'hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] hover:bg-cyan-500/[0.05]',
    iconColor: 'text-white/80 group-hover:text-cyan-400',
  },
  {
    name: 'Instagram',
    handle: '@n.a.f.y.a.d',
    followers: '10K',
    href: SOCIAL_LINKS.instagram,
    icon: Instagram,
    hoverClass: 'hover:border-pink-500/40 hover:text-pink-300 hover:shadow-[0_0_25px_rgba(244,114,182,0.18)] hover:bg-pink-500/[0.05]',
    iconColor: 'text-white/80 group-hover:text-pink-400',
  },
  {
    name: 'YouTube',
    handle: '@NafTech00',
    followers: '49.3K',
    href: SOCIAL_LINKS.youtube,
    icon: Youtube,
    hoverClass: 'hover:border-red-500/40 hover:text-red-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.18)] hover:bg-red-500/[0.05]',
    iconColor: 'text-white/80 group-hover:text-red-500',
  },
  {
    name: 'Facebook',
    handle: 'Nafyad',
    followers: '52K',
    href: SOCIAL_LINKS.facebook,
    icon: Facebook,
    hoverClass: 'hover:border-blue-500/40 hover:text-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] hover:bg-blue-500/[0.05]',
    iconColor: 'text-white/80 group-hover:text-blue-400',
  },
];

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
      <div className="absolute inset-0 z-0 text-brand-offwhite pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-5 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-5 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[140px]" 
        />
        <div className="absolute inset-0 mesh-gradient opacity-20" />
      </div>

      {/* Floating 3D Creative Glass Shapes (Non-Boring immersive spatial vibes) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        {/* Floating Capsule 1 */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            rotate: [0, 40, 0],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-10 md:left-[15%] w-16 md:w-24 h-32 md:h-48 rounded-full border border-white/10 bg-gradient-to-tr from-white/5 to-white/[0.01] md:backdrop-blur-xl flex flex-col items-center justify-center text-white/10 shadow-2xl opacity-40 md:opacity-75"
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
          className="absolute right-8 md:right-[12%] bottom-32 w-16 md:w-20 h-32 md:h-40 rounded-full border border-white/[0.08] bg-gradient-to-b from-brand-purple/15 to-transparent md:backdrop-blur-md flex items-center justify-center shadow-2xl opacity-40 md:opacity-85"
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
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/[0.07] mb-8 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">Nafyad • Official Creator Portfolio</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[9.5rem] font-display font-light leading-[0.82] tracking-tighter mb-10 select-none"
        >
          <span className="text-gradient block">TURNING</span>
          <span className="italic font-serif text-[#ECECEC] block my-1">CONTENT</span>
          <span className="text-brand-gradient font-bold drop-shadow-[0_0_55px_rgba(147,51,234,0.45)] block uppercase">INTO ATTENTION.</span>
        </motion.h1>

        {/* Elevated Stats Display Grid (Aligned with high-end landing elements) */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-6"
        >
          <StatItem value={STATS.totalFollowers} label="Global Content Community" />
          <StatItem value={STATS.produced} label="High-Retention Videos Produced" />
        </motion.div>

        {/* Prominent Quick-Connect Social Channels (TikTok, Instagram, YouTube, Facebook) - Single Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 max-w-3xl mx-auto mb-12 overflow-x-auto no-scrollbar py-1"
        >
          {SOCIAL_HERO_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect with Nafyad on ${social.name} (${social.followers})`}
              className={`group relative inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-md transition-all duration-300 whitespace-nowrap flex-shrink-0 ${social.hoverClass}`}
            >
              <social.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-colors ${social.iconColor}`} />
              <span className="text-[11px] sm:text-xs font-semibold text-white/90 group-hover:text-white transition-colors">{social.name}</span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded-md bg-white/[0.04] text-white/40 group-hover:text-white/80 group-hover:bg-white/[0.1] transition-colors">{social.followers}</span>
            </a>
          ))}
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
