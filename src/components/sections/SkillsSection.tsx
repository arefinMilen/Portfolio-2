'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveSkillCategory } from '@/store/uiSlice';
import { skillsCategoriesData } from '@/data/portfolioData';
import { Code, Database, Zap, GitBranch, CheckCircle2, Sparkles, Star } from 'lucide-react';

const categoryTabs = [
  { id: 'all', label: 'All Skills' },
  { id: 'ai', label: 'AI & Agentic Tools' },
  { id: 'languages', label: 'Languages' },
  { id: 'dbms', label: 'Databases & Backend' },
  { id: 'frameworks', label: 'Frameworks & Libs' },
  { id: 'tools', label: 'Dev Tools & Testing' },
];

export const SkillsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeSkillCategory } = useAppSelector((state) => state.ui);

  const displayedCategories = skillsCategoriesData.filter(
    (cat) => activeSkillCategory === 'all' || cat.id === activeSkillCategory
  );

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
            TECHNICAL SKILLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Technologies & Mastery
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Modern stack tools, backend APIs, DBMS architectures, and frontend design systems I work with daily.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categoryTabs.map((tab) => {
            const isActive = activeSkillCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => dispatch(setActiveSkillCategory(tab.id))}
                className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg font-bold shadow-lg shadow-cyan-500/25'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid Categories */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Sparkles className="w-5 h-5 text-brand-cyan" />
                <span>{category.title}</span>
              </h3>

              {/* Proficient Sub-Section */}
              {category.proficient.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                    <span>Proficient Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.proficient.map((skill) => (
                      <div
                        key={skill.name}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan/15 to-brand-violet/15 border border-brand-cyan/40 text-slate-100 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-cyan-950/30 hover:border-brand-cyan transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Familiar Sub-Section */}
              {category.familiar.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Familiar Technologies
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {category.familiar.map((skill) => (
                      <div
                        key={skill.name}
                        className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-2 hover:bg-white/10 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
