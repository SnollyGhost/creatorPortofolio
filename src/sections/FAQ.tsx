import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS } from '../lib/data';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
          >
            Clear Communication
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-light text-gradient mb-6 !leading-[0.9]"
          >
            Frequent <span className="italic font-serif text-brand-offwhite">Inquiries</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
              >
                <span className="text-sm font-display font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-white/40 transition-transform duration-500 ${openIndex === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-sm text-white/50 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 rounded-[32px] glass border border-brand-purple/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-brand-purple" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Still have questions?</div>
              <div className="text-xs text-white/40">Get a custom strategy brief via email.</div>
            </div>
          </div>
          <button className="px-8 py-3 rounded-full bg-brand-purple text-white font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-brand-purple/20">
            Send Inquiry
          </button>
        </motion.div>
      </div>
    </section>
  );
};
