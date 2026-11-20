/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState } from 'react';
import { motion } from "framer-motion";
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { BrandLogos } from './sections/BrandLogos';
import { About } from './sections/About';

const ExpertisePillars = lazy(() =>
  import('./sections/ExpertisePillars').then((m) => ({ default: m.ExpertisePillars }))
);
const FeaturedVideos = lazy(() =>
  import('./sections/FeaturedVideos').then((m) => ({ default: m.FeaturedVideos }))
);
const AnalyticsDashboard = lazy(() =>
  import('./sections/AnalyticsDashboard').then((m) => ({ default: m.AnalyticsDashboard }))
);
const Packages = lazy(() => import('./sections/Packages').then((m) => ({ default: m.Packages })));
const Contact = lazy(() => import('./sections/Contact').then((m) => ({ default: m.Contact })));
const AIChatBot = lazy(() =>
  import('./components/AIChatBot').then((m) => ({ default: m.AIChatBot }))
);

const SectionFallback = () => <div className="min-h-[160px] w-full bg-[#050505]" aria-hidden="true" />;

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
        <Suspense fallback={<SectionFallback />}>
          <ExpertisePillars />
          <FeaturedVideos />
          <AnalyticsDashboard />
          <Packages onSelectPackage={handleSelectPackage} />
          <Contact selectedPackage={selectedPackage} />
        </Suspense>
        <Suspense fallback={null}>
          <AIChatBot />
        </Suspense>
      </div>
    </main>
  );
}
