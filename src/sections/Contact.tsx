import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Mail, MessageSquare, Instagram, Facebook, Youtube, Linkedin, Send, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_EMAIL, SOCIAL_LINKS, CREATOR_NAME, PACKAGES } from '../lib/data';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { escapeHtml } from '../lib/utils';

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.93-2.01 6.12-1.77 0 1.39-.02 2.77-.03 4.15-.8-.19-1.66-.19-2.4-.06-1.01.24-1.92.83-2.48 1.69-.53.76-.75 1.73-.59 2.64.12 1.05.7 2 1.57 2.63.94.71 2.15.91 3.32.74 1.33-.11 2.56-.88 3.23-2.03.41-.63.63-1.36.65-2.11V.02Z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.578.192l-8.533 7.701-.332 4.97c.488 0 .702-.223.974-.488l2.337-2.27 4.861 3.59c.896.494 1.54.24 1.763-.83l3.187-15.01c.326-1.307-.5-1.9-.136-1.42z" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ContactProps {
  selectedPackage?: string;
}

export const Contact = ({ selectedPackage }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    package: '',
    message: '',
    preferredMethod: 'telegram' as 'telegram' | 'whatsapp' | 'email'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto-scroll and package selection
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({ ...prev, package: selectedPackage }));
      if (sectionRef.current) {
        const offset = 80; // Height of fixed navbar
        const elementPosition = sectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.package) {
      setErrorMessage('Please fill in all required fields (Identity, POC, Phone, Package)');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      // Clean and escape inputs to prevent HTML/XSS injection
      const sanitizedData = {
        name: escapeHtml(formData.name.trim()),
        email: escapeHtml(formData.email.trim()),
        phone: escapeHtml(formData.phone.trim()),
        company: escapeHtml(formData.company.trim()),
        package: escapeHtml(formData.package.trim()),
        message: escapeHtml(formData.message.trim()),
        preferredMethod: formData.preferredMethod
      };

      // 1. Save to Firestore (with 3.5s timeout and automatic fallback)
      let savedToFirestore = false;
      try {
        const firestorePromise = addDoc(collection(db, 'inquiries'), {
          ...sanitizedData,
          status: 'pending',
          createdAt: serverTimestamp()
        }).then(() => {
          savedToFirestore = true;
          console.log('Inquiry saved to Firestore successfully.');
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Firestore operation timed out after 3.5 seconds.')), 3500)
        );

        await Promise.race([firestorePromise, timeoutPromise]);
      } catch (dbError: any) {
        console.warn('Firestore Error/Timeout: Proceeding to fallback email notification.', dbError);
      }

      // 2. Trigger Email Notification via Backend
      let notifiedViaEmail = false;
      try {
        const response = await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedData)
        });
        
        const responseData = await response.json().catch(() => ({}));
        
        if (response.ok) {
          notifiedViaEmail = true;
          console.log('Notification email triggered successfully.');
        } else {
          console.warn('Notification service error:', responseData);
        }
      } catch (notifyError) {
        console.warn('Notification service unreachable.', notifyError);
      }

      // If both channels failed, notify user
      if (!savedToFirestore && !notifiedViaEmail) {
        throw new Error('Transmission failed. Both the database and notification channels are offline. Please reach out directly via Telegram, WhatsApp, or ' + BUSINESS_EMAIL);
      }

      setStatus('success');
    } catch (error: any) {
      console.error('Submission Error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Transmission failed. Direct email: ' + BUSINESS_EMAIL);
      
      // Only report to handleFirestoreError if it's a Firestore-related error that wasn't already handled
      if (error?.code?.startsWith('firestore/') || error?.message?.includes('Database access denied')) {
        try {
          handleFirestoreError(error, OperationType.CREATE, 'inquiries');
        } catch (e) {
          // Ignore secondary error from handler
        }
      }
    }
  };

  const getDirectLink = () => {
    if (formData.preferredMethod === 'telegram') return 'https://t.me/SnollyGhost';
    if (formData.preferredMethod === 'whatsapp') return 'https://wa.me/251909563789';
    return `mailto:${BUSINESS_EMAIL}`;
  };

  const getMethodIcon = () => {
    if (formData.preferredMethod === 'telegram') return <TelegramIcon className="w-5 h-5" />;
    if (formData.preferredMethod === 'whatsapp') return <WhatsappIcon className="w-5 h-5" />;
    return <Mail className="w-5 h-5" />;
  };

  const getMethodLabel = () => {
    if (formData.preferredMethod === 'telegram') return 'Open Telegram';
    if (formData.preferredMethod === 'whatsapp') return 'Message on WhatsApp';
    return 'Send Direct Email';
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 bg-[#030303] relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

       <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
              >
                Inquiries
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-display font-light text-gradient !leading-[0.9] mb-6"
              >
                READY TO <span className="italic font-serif text-brand-offwhite">GROW?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white/40 text-sm md:text-base font-light mb-12 max-w-md"
              >
                Ready to scale your brand? Select your preferred channel and transmit your brief. 
              </motion.p>

              <div className="space-y-12 mb-16">
                {[
                  { icon: TelegramIcon, label: 'Telegram', value: 'Secure Telegram DM', href: 'https://t.me/SnollyGhost' },
                  { icon: WhatsappIcon, label: 'WhatsApp', value: 'Direct WhatsApp Line', href: 'https://wa.me/251909563789' },
                ].map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-purple group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-7 h-7 text-white group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                      <div className="text-xl font-display font-bold flex items-center gap-2 group-hover:text-brand-purple transition-colors">
                        {item.value}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="flex gap-4">
                {[
                  { Icon: TiktokIcon, link: SOCIAL_LINKS.tiktok },
                  { Icon: Youtube, link: SOCIAL_LINKS.youtube },
                  { Icon: Facebook, link: SOCIAL_LINKS.facebook },
                  { Icon: Instagram, link: SOCIAL_LINKS.instagram },
                  { Icon: Linkedin, link: SOCIAL_LINKS.linkedin },
                ].map((item, idx) => (
                   <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all overflow-hidden"
                   >
                    <item.Icon className="w-5 h-5 text-white/60" />
                   </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-10 rounded-[48px] backdrop-blur-md relative"
            >
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-black/95 backdrop-blur-xl rounded-[48px] flex flex-col items-center justify-center text-center p-8"
                >
                  <CheckCircle2 className="w-16 h-16 text-brand-purple mb-6" />
                  <h4 className="text-2xl font-display font-medium mb-3 text-white">Inbound Transmitted</h4>
                  <p className="text-white/60 text-sm max-w-xs mb-8 font-light">
                    Your brief is secured. Start the conversation directly for a faster response.
                  </p>
                  
                  <div className="flex flex-col gap-3 w-full max-w-[240px]">
                    <a 
                      href={getDirectLink()}
                      target={getDirectLink().startsWith('mailto:') ? '_self' : '_blank'}
                      rel={getDirectLink().startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="w-full py-4 rounded-xl bg-brand-purple text-white font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all text-[10px] uppercase tracking-widest"
                    >
                      {getMethodIcon()}
                      {getMethodLabel()}
                    </a>
                    <button 
                      onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', email: '', phone: '', company: '', package: '', message: '', preferredMethod: 'telegram' });
                      }}
                      className="w-full py-3 rounded-xl border border-white/10 text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[9px]"
                    >
                      Send Another Brief
                    </button>
                  </div>
                </motion.div>
              )}

              <h3 className="text-2xl font-display font-bold mb-8 flex items-center justify-between">
                Secure Inbound
                {status === 'submitting' && <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />}
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Identity</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple focus:bg-white/10 focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all font-medium text-sm text-white" 
                        placeholder="Name / Brand" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Official Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple focus:bg-white/10 focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all font-medium text-sm text-white" 
                        placeholder="email@brand.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Contact Number (WhatsApp / Telegram)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple focus:bg-white/10 focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all font-medium text-sm text-white" 
                      placeholder="+251 ..." 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Preferred Communication</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'telegram', label: 'Telegram' },
                        { id: 'whatsapp', label: 'WhatsApp' },
                        { id: 'email', label: 'Email' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({...formData, preferredMethod: method.id as any})}
                          className={`py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all ${
                            formData.preferredMethod === method.id 
                              ? 'bg-brand-purple border-brand-purple text-white shadow-lg shadow-brand-purple/20' 
                              : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Entity (Optional)</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple focus:bg-white/10 focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all font-medium text-sm text-white" 
                        placeholder="Company" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Project Selection</label>
                      <select 
                        required
                        value={formData.package}
                        onChange={(e) => setFormData({...formData, package: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple focus:bg-white/10 focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all font-medium text-sm text-white appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-black text-white/40">Choose Option</option>
                        {PACKAGES.map(pkg => (
                          <option key={pkg.id} value={pkg.name} className="bg-[#050505] text-white">
                            {pkg.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Brief Description</label>
                    <textarea 
                      rows={3} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple focus:bg-white/10 focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all resize-none font-medium text-sm text-white" 
                      placeholder="Tell us about the project goal..." 
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-[10px] bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-3 h-3" />
                    {errorMessage}
                  </div>
                )}

                <button 
                  disabled={status === 'submitting'}
                  className="w-full py-5 rounded-xl bg-brand-purple text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-brand-purple/50 focus:outline-none transition-all shadow-xl shadow-brand-purple/20 group uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Encrypting Request...' : 'Transmit Mission Brief'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>

          <footer className="mt-32 pt-12 border-t border-white/5 text-center">
             <div className="text-white/60 text-xs md:text-sm font-mono tracking-widest uppercase">
                &copy; {new Date().getFullYear()} {CREATOR_NAME} &bull; All Rights Reserved
             </div>
          </footer>
        </div>
      </section>
    );
};
