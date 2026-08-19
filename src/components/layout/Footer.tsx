'use client';

import React from 'react';
import { personalDetails } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { Github, Linkedin, Youtube, Facebook, ArrowUp, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-dark-bg/90 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-brand-cyan" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">
                &copy; {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 justify-center sm:justify-start">
                <span>Crafted with</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>{t.footer.builtWith}</span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/50 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalDetails.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={personalDetails.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-cyan transition-colors px-4 py-2.5 rounded-full border border-white/10 glass-card"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
