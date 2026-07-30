'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/portfolioData';
import { Sparkles, Code2, Terminal, CheckCircle2, ArrowRight, Database, Layers, Bot } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-brand-cyan" />,
  Sparkles: <Sparkles className="w-6 h-6 text-brand-violet" />,
  Database: <Database className="w-6 h-6 text-amber-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
  Terminal: <Terminal className="w-6 h-6 text-emerald-400" />,
  Bot: <Bot className="w-6 h-6 text-purple-400" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card rounded-3xl p-8 relative flex flex-col justify-between group"
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
