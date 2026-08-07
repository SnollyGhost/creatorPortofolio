import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Strategy', href: '#process' },
  { name: 'Work', href: '#work' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Packages', href: '#packages' },
  { name: 'About', href: '#about' },
];

import { CREATOR_NAME } from '../lib/data';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        // Use a tiny timeout to let the mobile menu close state trigger and layout settle
        setTimeout(() => {
          const offset = 80; // Height of the fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL hash gracefully without forcing an abrupt jump
          window.history.pushState(null, '', href);
        }, 100);
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass-dark py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', '#');
            setIsMobileMenuOpen(false);
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group px-1"
        >
          <Logo className="w-14 h-14" />
          <span className="text-3xl font-display font-black tracking-tighter uppercase group-hover:text-brand-purple transition-colors drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            {CREATOR_NAME}
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-purple transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="px-6 py-2 border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            Work With Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          type="button"
          className="md:hidden text-white p-2.5 rounded-lg active:scale-95 transition-all duration-200 cursor-pointer z-50 select-none relative focus:outline-none touch-manipulation hover:bg-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="pointer-events-none w-6 h-6 text-white" />
          ) : (
            <Menu className="pointer-events-none w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-b border-white/10 z-50 shadow-2xl backdrop-blur-3xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-lg font-medium text-white/80 py-2.5 border-b border-white/5 active:text-brand-purple active:bg-white/5 px-2 rounded transition-all block cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="w-full py-3.5 mt-2 rounded-xl bg-brand-purple text-white text-center font-bold active:scale-[0.98] transition-all block cursor-pointer"
              >
                Work With Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
