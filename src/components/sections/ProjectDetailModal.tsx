'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { closeProjectModal } from '@/store/uiSlice';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, ArrowUpRight } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProject, isProjectModalOpen } = useAppSelector((state) => state.ui);

  if (!isProjectModalOpen || !selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeProjectModal())}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 mb-8 group">
          <Image
            src={selectedProject.image}
            alt={selectedProject.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-mono text-xs mb-2">
              {selectedProject.categoryLabel}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {selectedProject.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium">
              {selectedProject.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-8 text-slate-300">
          
          {/* Long Description */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-2">
              OVERVIEW
            </h4>
            <p className="text-sm sm:text-base leading-relaxed">
              {selectedProject.longDescription}
            </p>
          </div>

          {/* Key Features */}
          {selectedProject.keyFeatures && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-3">
                KEY FEATURES & CAPABILITIES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          {selectedProject.techStackDetailed && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase mb-3">
                DETAILED ARCHITECTURE & STACK
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedProject.techStackDetailed.map((stackGroup) => (
                  <div key={stackGroup.category} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-xs font-mono text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{stackGroup.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stackGroup.items.map((item) => (
                        <span key={item} className="px-2 py-0.5 rounded bg-black/40 text-[11px] font-mono text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-brand-cyan text-dark-bg font-bold text-sm flex items-center gap-2 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Live Site</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full glass-card hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2 border border-white/10"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
            </div>

            {/* Dynamic Route Link */}
            <Link
              href={`/projects/${selectedProject.slug}`}
              onClick={() => dispatch(closeProjectModal())}
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
            >
              <span>Full Case Study Page</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
