'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveProjectCategory, openProjectModal, setSearchQuery } from '@/store/uiSlice';
import { projectsData } from '@/data/portfolioData';
import { Project } from '@/types/portfolio';
import { ExternalLink, Github, Eye, Search, Sparkles, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack SaaS' },
  { id: 'frontend', label: 'Frontend / E-Commerce' },
  { id: 'tool', label: 'Apps & Tools' },
];

export const ProjectsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeProjectCategory, searchQuery } = useAppSelector((state) => state.ui);

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      activeProjectCategory === 'all' || project.category === activeProjectCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="work" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
              FEATURED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              My Recent Projects
            </h2>
            <p className="text-slate-400 mt-2 text-base max-w-xl">
              Explore full-stack platforms, interactive SaaS applications, responsive e-commerce stores, and high-performance frontend interfaces.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack or title..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/50 transition-all"
            />
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/10 pb-4">
          {categories.map((cat) => {
            const isActive = activeProjectCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => dispatch(setActiveProjectCategory(cat.id))}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-brand-cyan text-dark-bg font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-brand-cyan/40"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full h-52 overflow-hidden bg-slate-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-dark-bg/80 backdrop-blur-md border border-white/10 text-cyan-300 font-mono text-[11px]">
                    {project.categoryLabel}
                  </span>

                  {/* Quick Action overlay button */}
                  <button
                    onClick={() => dispatch(openProjectModal(project))}
                    className="absolute top-4 right-4 p-2 rounded-full bg-dark-bg/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-brand-cyan transition-colors shadow-lg"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                <button
                  onClick={() => dispatch(openProjectModal(project))}
                  className="text-xs font-semibold text-brand-cyan hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Quick View</span>
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-brand-cyan hover:text-dark-bg text-slate-300 transition-all border border-white/10"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-slate-300 transition-all border border-white/10"
                    title="Case Study Page"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
