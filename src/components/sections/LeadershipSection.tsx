'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { leadershipData } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { HelpingHand, Users, Heart, ExternalLink, CheckCircle2, Award } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  HandsHelping: <HelpingHand className="w-6 h-6 text-cyan-400" />,
  HelpingHand: <HelpingHand className="w-6 h-6 text-cyan-400" />,
  Users: <Users className="w-6 h-6 text-purple-400" />,
  Heart: <Heart className="w-6 h-6 text-rose-400" />,
};

export const LeadershipSection: React.FC = () => {
  const { t, isBn } = useTranslation();

  return (
    <section id="leadership" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
            {isBn ? 'নেতৃত্ব ও ইমপ্যাক্ট' : 'COMMUNITY & IMPACT'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            {t.leadership.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
            {t.leadership.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipData.map((item, idx) => {
            const itemTrans = t.leadership.items[item.id as keyof typeof t.leadership.items];
            const title = itemTrans?.title || item.title;
            const role = itemTrans?.role || item.role;
            const period = itemTrans?.period || item.period;
            const location = itemTrans?.location || item.location;
            const highlights = itemTrans?.highlights || item.highlights;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 flex flex-col justify-between group hover:border-brand-cyan/40 transition-all shadow-xl"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                      {iconMap[item.iconName] || <HelpingHand className="w-5 h-5 text-brand-cyan" />}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-300 font-semibold bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">
                      {period}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors mb-1">
                    {title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">{role} • {location}</p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-4 border-t border-black/10 dark:border-white/10 mb-6">
                    {highlights.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-slate-900 dark:hover:text-white transition-colors group/link mt-2"
                  >
                    <span>{t.leadership.viewInitiative}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
