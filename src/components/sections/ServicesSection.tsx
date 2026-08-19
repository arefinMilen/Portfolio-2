'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { Sparkles, Code2, Terminal, CheckCircle2, ArrowRight, Database, Layers, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-brand-cyan" />,
  Sparkles: <Sparkles className="w-5 h-5 text-brand-violet" />,
  Database: <Database className="w-5 h-5 text-amber-400" />,
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
  Terminal: <Terminal className="w-5 h-5 text-emerald-400" />,
  Bot: <Bot className="w-5 h-5 text-purple-400" />,
};

// Quadruple services array for seamless continuous infinite sliding
const infiniteServices = [...servicesData, ...servicesData, ...servicesData, ...servicesData];

export const ServicesSection: React.FC = () => {
  const { t, isBn } = useTranslation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Mouse Drag state for desktop swipe
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeftPos = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    if (scrollRef.current) {
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeftPos.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.8;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
              {isBn ? 'সেবাসমূহ' : 'SERVICES'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              {t.services.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
              {t.services.subtitle}
            </p>
          </div>

          {/* Horizontal Scroll Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleManualScroll('left')}
              aria-label="Scroll left"
              className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-cyan/50 hover:bg-black/10 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-all shadow-md group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              aria-label="Scroll right"
              className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-cyan/50 hover:bg-black/10 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-all shadow-md group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Slider Container with Touch Swipe & Mouse Drag */}
      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Ambient Side Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 dark:from-dark-bg via-slate-50/80 dark:via-dark-bg/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 dark:from-dark-bg via-slate-50/80 dark:via-dark-bg/80 to-transparent z-20" />

        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.div
            className="flex gap-5 shrink-0"
            animate={isPaused ? {} : { x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 35,
                ease: 'linear',
              },
            }}
          >
            {infiniteServices.map((service, idx) => {
              const itemTrans = t.services.items[service.id as keyof typeof t.services.items];
              const title = itemTrans?.title || service.title;
              const fullDesc = itemTrans?.fullDesc || service.fullDesc;
              const features = itemTrans?.features || service.features;

              return (
                <div
                  key={`${service.id}-${idx}`}
                  className="w-[270px] sm:w-[310px] lg:w-[330px] shrink-0 glass-card rounded-2xl p-6 relative flex flex-col justify-between group border border-black/10 dark:border-white/10 hover:border-brand-cyan/50 transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Icon & Title Header Row */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-brand-cyan/50 transition-all shadow-md">
                        {iconMap[service.icon] || <Sparkles className="w-5 h-5 text-brand-cyan" />}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors leading-tight">
                        {title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mb-4 text-justify">
                      {fullDesc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10 mb-4">
                      {features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-slate-900 dark:hover:text-white transition-colors group/link mt-1"
                  >
                    <span>{isBn ? 'সেবার জন্য যোগাযোগ' : 'Request Service'}</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
