import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, Youtube, Instagram, Facebook, X } from 'lucide-react';
import { VIDEOS } from '../lib/data';
import { cn } from '../lib/utils';
import { ProgressiveImage } from '../components/ProgressiveImage';

const CATEGORIES = ['all', 'tech', 'space', 'crypto'] as const;

export const FeaturedVideos = () => {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('all');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filteredVideos = VIDEOS.filter(v => activeCategory === 'all' || v.category === activeCategory);

  const getEmbedUrl = (url: string, platform: string) => {
    if (platform === 'youtube') {
      let id = '';
      if (url.includes('v=')) {
        id = url.split('v=')[1].split('&')[0];
      } else {
        id = url.split('/').pop()?.split('?')[0] || '';
      }
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (platform === 'tiktok') {
      // Regex to extract numeric ID from various TikTok URL formats
      const match = url.match(/\/video\/(\d+)/);
      if (match && match[1]) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
      
      // Fallback for short URLs or missing /video/ path
      const parts = url.split('/').filter(Boolean);
      const lastPart = parts[parts.length - 1].split('?')[0];
      return `https://www.tiktok.com/embed/v2/${lastPart}`;
    }
    if (platform === 'instagram') {
      // Handle both /reel/ and /reels/ paths
      const match = url.match(/\/(?:reel|reels)\/([^/?#]+)/);
      if (match && match[1]) {
        return `https://www.instagram.com/reel/${match[1]}/embed`;
      }
      return url;
    }
    if (platform === 'facebook') {
      const fbUrl = url.replace('web.facebook.com', 'www.facebook.com');
      const encodedUrl = encodeURIComponent(fbUrl);
      return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=0&width=500`;
    }
    return url;
  };

  return (
    <section id="work" className="py-24 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              Curated Portfolio
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-light text-gradient leading-[0.9] mb-4"
            >
              High Res <span className="italic font-serif text-brand-offwhite">Storytelling</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-sm md:text-base font-light max-w-md"
            >
              Strategic vertical content designed for maximum retention across TikTok, YouTube, and Meta platforms.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPlayingVideoId(null);
                }}
                className={cn(
                  "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                  activeCategory === cat 
                    ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-brand-purple/20" 
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer backdrop-blur-sm">
                  {playingVideoId === video.id ? (
                    <div className="w-full h-full relative bg-black">
                      <iframe
                        src={getEmbedUrl(video.url, video.platform)}
                        className="w-full h-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center border border-white/20 hover:bg-brand-purple transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full relative"
                      onClick={() => setPlayingVideoId(video.id)}
                    >
                      <ProgressiveImage
                        src={video.thumbnail}
                        alt={video.title}
                        category={video.category}
                        className="transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-100 transition-opacity" />
                      
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
                          {video.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                          {video.platform === 'tiktok' && (
                            <svg className="w-3 h-3 text-cyan-400 fill-current" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.93-2.01 6.12-1.77 0 1.39-.02 2.77-.03 4.15-.8-.19-1.66-.19-2.4-.06-1.01.24-1.92.83-2.48 1.69-.53.76-.75 1.73-.59 2.64.12 1.05.7 2 1.57 2.63.94.71 2.15.91 3.32.74 1.33-.11 2.56-.88 3.23-2.03.41-.63.63-1.36.65-2.11V.02Z"/></svg>
                          )}
                          {video.platform === 'instagram' && <Instagram className="w-3 h-3 text-pink-500" />}
                          {video.platform === 'facebook' && <Facebook className="w-3 h-3 text-blue-500" />}
                        </div>
                        <div className={cn(
                          "text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest backdrop-blur-md border",
                          video.category === 'tech' && "bg-blue-500/20 text-blue-400 border-blue-500/20",
                          video.category === 'space' && "bg-purple-500/20 text-purple-400 border-purple-500/20",
                          video.category === 'crypto' && "bg-amber-500/20 text-amber-400 border-amber-500/20"
                        )}>
                          {video.category}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-left">
                        <div className="flex gap-2 mb-3">
                          {video.tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase font-bold tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5 text-white/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-display font-bold leading-tight mb-2 group-hover:text-brand-purple transition-colors text-white">
                          {video.title}
                        </h3>
                      </div>

                      {/* Play Button Overlay - Always visible with polished pulses so it is clearly a playable video on both PC and mobile */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/30 transition-all duration-300">
                        <div className="relative w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-purple group-hover:border-brand-purple shadow-xl shadow-black/40">
                          {/* Ambient double-pulse animation ring */}
                          <span className="absolute inline-flex h-full w-full rounded-full bg-brand-purple/30 animate-ping opacity-40" />
                          <span className="absolute inline-flex h-full w-full rounded-full bg-black/40" />
                          <Play className="w-5 h-5 text-white fill-white relative z-10 translate-x-[1px]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
