'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/portfolioData';
import { Sparkles, Code2, Terminal, CheckCircle2, ArrowRight, Database, Layers, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-brand-cyan" />,
  Sparkles: <Sparkles className="w-6 h-6 text-brand-violet" />,
  Database: <Database className="w-6 h-6 text-amber-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
  Terminal: <Terminal className="w-6 h-6 text-emerald-400" />,
  Bot: <Bot className="w-6 h-6 text-purple-400" />,
};

export const ServicesSection: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Services That I Provide
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Specialized solutions designed for high performance, exceptional user experiences, and scalable codebase architecture.
            </p>
          </div>

          {/* Horizontal Scroll Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan/50 hover:bg-white/10 text-white transition-all shadow-md group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan/50 hover:bg-white/10 text-white transition-all shadow-md group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Services Cards Horizontal Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-brand-cyan/30 scrollbar-track-transparent"
        >
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-[300px] sm:w-[360px] lg:w-[390px] shrink-0 snap-start glass-card rounded-3xl p-8 relative flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Title Header Row */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-brand-cyan/50 transition-all shadow-lg">
                    {iconMap[service.icon] || <Sparkles className="w-6 h-6 text-brand-cyan" />}
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-brand-cyan transition-colors leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 text-justify">
                  {service.fullDesc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan hover:text-white transition-colors group/link mt-2"
              >
                <span>Request Service</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
