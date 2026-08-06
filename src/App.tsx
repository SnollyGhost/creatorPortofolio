/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { BrandLogos } from './sections/BrandLogos';
import { About } from './sections/About';
import { ExpertisePillars } from './sections/ExpertisePillars';
import { FeaturedVideos } from './sections/FeaturedVideos';
import { AnalyticsDashboard } from './sections/AnalyticsDashboard';
import { Process } from './sections/Process';
import { Packages } from './sections/Packages';
import { Contact } from './sections/Contact';
import { AIChatBot } from './components/AIChatBot';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="relative selection:bg-brand-purple/30 selection:text-brand-purple overflow-x-hidden min-h-screen">
      <Navbar />
      
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Noise Grid */}
        <div className="absolute inset-0 noise mix-blend-overlay opacity-20" />
        
        {/* Dynamic Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" 
        />
        
        {/* Subtle Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Hero />
        <BrandLogos />
        <About />
        <ExpertisePillars />
        <Process />
        <FeaturedVideos />
        <AnalyticsDashboard />
        <Packages onSelectPackage={handleSelectPackage} />
        <Contact selectedPackage={selectedPackage} />
        <AIChatBot />
      </div>
    </main>
  );
}
