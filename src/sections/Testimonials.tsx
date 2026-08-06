import React from 'react';
import { motion } from "framer-motion";
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../lib/data';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              Social Proof
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-light text-gradient !leading-[0.9]"
            >
              Strategic <span className="italic font-serif text-brand-offwhite">Success</span> Stories
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <p className="text-white/40 text-sm max-w-[300px] font-light leading-relaxed">
              Real feedback from industry leaders who have scaled their presence through our technical storytelling.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative group hover:bg-white/[0.05] transition-all duration-500"
            >
              <Quote className="w-10 h-10 text-brand-purple/20 absolute top-8 right-8 group-hover:text-brand-purple/40 transition-colors" />
              
              <div className="mb-8">
                <p className="text-lg text-white/80 font-light leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-sm font-display font-bold text-white mb-0.5">{testimonial.name}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
