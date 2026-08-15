import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Zap, TrendingUp, Calendar, BarChart3, CheckCircle2, LineChart } from 'lucide-react';
import { CREATOR_NAME, METRICS, CENTRAL_STATS } from '../lib/data';
import { cn } from '../lib/utils';

export const AnalyticsDashboard = () => {
  const [activeMetricIdx, setActiveMetricIdx] = useState(0);
  const activeMetric = METRICS[activeMetricIdx];

  const totalExactFollowers = CENTRAL_STATS.tiktok.total + CENTRAL_STATS.meta.total + CENTRAL_STATS.youtube.total;

  // Live counter states
  const [liveCount, setLiveCount] = useState(totalExactFollowers);
  const [countChange, setCountChange] = useState<{ value: number; type: 'add' | 'sub' } | null>(null);
  const [flashColor, setFlashColor] = useState<'none' | 'green' | 'red'>('none');

  useEffect(() => {
    const interval = setInterval(() => {
      const isAdd = Math.random() < 0.72; // More likely to add than deduct
      let changeVal = 0;
      
      if (isAdd) {
        changeVal = Math.floor(Math.random() * 8) + 3; // +3 to +10 followers
        setLiveCount(prev => prev + changeVal);
        setCountChange({ value: changeVal, type: 'add' });
        setFlashColor('green');
      } else {
        changeVal = Math.floor(Math.random() * 3) + 1; // -1 to -3 followers
        setLiveCount(prev => prev - changeVal);
        setCountChange({ value: changeVal, type: 'sub' });
        setFlashColor('red');
      }

      const timer = setTimeout(() => {
        setCountChange(null);
        setFlashColor('none');
      }, 1600);

      return () => clearTimeout(timer);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return (num / 1000).toFixed(1) + 'K';
  };

  const formatChartYAxis = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const activeChartData = useMemo(() => {
    return activeMetric.data;
  }, [activeMetric]);

  return (
    <section id="analytics" className="py-24 px-6 relative overflow-hidden bg-black">
      {/* Mesh Gradient Effect */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-widest uppercase text-[11px] mb-4 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              1-Year Performance Analytics
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-light text-gradient !leading-[0.9]"
            >
              The <span className="italic font-serif text-brand-offwhite">Data</span> Difference
            </motion.h2>
          </div>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="glass px-6 py-4 rounded-2xl flex items-center gap-6 border-white/5 bg-white/[0.02]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 font-bold">Live Pulse</span>
                <span className="text-[9px] text-white/40">Verified Audience</span>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <div className="text-right">
                <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Total Followers</div>
                <div className="flex items-center gap-2 mt-0.5 justify-end">
                  <span className={cn(
                    "text-xl font-display font-bold tracking-tight transition-colors duration-300",
                    flashColor === 'green' ? "text-emerald-400" : flashColor === 'red' ? "text-rose-400" : "text-white"
                  )}>
                    {liveCount.toLocaleString()}
                  </span>
                  
                  <div className="relative w-8 h-5 overflow-hidden flex items-center">
                    <AnimatePresence mode="wait">
                      {countChange && (
                        <motion.span
                          key={liveCount}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "absolute text-xs font-mono font-bold",
                            countChange.type === 'add' ? "text-emerald-400" : "text-rose-400"
                          )}
                        >
                          {countChange.type === 'add' ? `+${countChange.value}` : `-${countChange.value}`}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveMetricIdx(idx)}
              className={cn(
                "bg-white/5 border rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md group transition-all cursor-pointer relative overflow-hidden",
                activeMetricIdx === idx ? "border-brand-purple bg-brand-purple/5 shadow-[0_0_25px_rgba(147,51,234,0.15)]" : "border-white/10 hover:border-white/20"
              )}
            >
              {activeMetricIdx === idx && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/20 blur-2xl rounded-full pointer-events-none" />
              )}
              <div className="flex flex-col space-y-1 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{metric.label}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">1 Year</span>
                </div>
                <div className={cn(
                  "text-4xl font-light tracking-tighter transition-colors mt-2",
                  activeMetricIdx === idx ? "text-brand-purple" : "group-hover:text-brand-purple"
                )}>{metric.value}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                   <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest">{metric.change}</div>
                   <div className="flex gap-1 items-end h-8">
                      {[0.4, 0.6, 0.8, 1, 0.7, 0.9].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h * 100}%` }}
                          className={cn("w-1 rounded-full", activeMetricIdx === idx ? "bg-brand-purple" : "bg-white/20")} 
                        />
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Chart */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass p-8 rounded-[40px] border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-display font-bold mb-1">{activeMetric.label}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                  {activeMetric.period || '1-Year Breakdown'}
                </span>
              </div>
              <p className="text-white/50 text-sm mt-1">{activeMetric.platformDetails || 'Monthly view trajectory over the 12-month analytics cycle.'}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-brand-purple/15 text-brand-purple border border-brand-purple/30 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Audience Growth Trajectory
              </span>
            </div>
          </div>
          <div className="h-[400px] w-full relative">
            <ResponsiveContainer key={activeMetricIdx} width="100%" height={400}>
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`colorValue-${activeMetricIdx}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 500 }}
                   tickFormatter={formatChartYAxis}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#fff', padding: '12px' }}
                  itemStyle={{ color: '#A855F7', fontWeight: 'bold' }}
                  formatter={(val: number) => [`${val.toLocaleString()} ${activeMetricIdx === 2 ? 'Subscribers' : 'Followers'}`, 'Total']}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '4px', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill={`url(#colorValue-${activeMetricIdx})`} 
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

