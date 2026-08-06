import React, { useState } from 'react';
import { motion } from "framer-motion";
import { SOCIAL_LINKS, CREATOR_NAME, BUSINESS_EMAIL } from '../lib/data';
import { Logo } from './Logo';
import { Youtube, Instagram, Facebook, Linkedin, ArrowUpRight, Mail, MapPin } from 'lucide-react';

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.93-2.01 6.12-1.77 0 1.39-.02 2.77-.03 4.15-.8-.19-1.66-.19-2.4-.06-1.01.24-1.92.83-2.48 1.69-.53.76-.75 1.73-.59 2.64.12 1.05.7 2 1.57 2.63.94.71 2.15.91 3.32.74 1.33-.11 2.56-.88 3.23-2.03.41-.63.63-1.36.65-2.11V.02Z"/>
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-purple/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-3 mb-8 group"
            >
              <Logo className="w-10 h-10" />
              <span className="text-xl font-display font-black tracking-tight uppercase text-white">
                {CREATOR_NAME}
              </span>
            </motion.div>
            <p className="text-white/40 text-sm font-light leading-relaxed mb-8 max-w-xs">
              Systems-driven brand architect helping technical operators and agencies scale through elite content assets and strategic design.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Youtube, href: SOCIAL_LINKS.youtube },
                { Icon: Instagram, href: SOCIAL_LINKS.instagram },
                { Icon: TiktokIcon, href: SOCIAL_LINKS.tiktok },
                { Icon: Facebook, href: SOCIAL_LINKS.facebook },
                { Icon: Linkedin, href: SOCIAL_LINKS.linkedin },
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all duration-300"
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Expertise', 'Process', 'Packages', 'Testimonials', 'FAQ'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-white/40 hover:text-white text-sm transition-colors flex items-center group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 transition-all font-light" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mb-8">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-white/20 mb-1">Direct Line</div>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                    {BUSINESS_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-white/20 mb-1">Operations</div>
                  <span className="text-white/60 text-sm font-medium">Remote &bull; Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter/Status */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mb-8">Current Status</h4>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Available for Q3</span>
              </div>
              <p className="text-white/40 text-xs font-light leading-relaxed mb-6">
                Now accepting selected partners for brand growth and system implementation.
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 text-white text-[10px] uppercase font-bold tracking-widest group border-b border-brand-purple pb-1"
              >
                Inquire Now
                <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xs md:text-sm text-white/60 uppercase tracking-[0.3em] font-medium">
            &copy; {currentYear} {CREATOR_NAME} &bull; Strategic Digital Operator
          </div>
        </div>
      </div>
    </footer>
  );
};
