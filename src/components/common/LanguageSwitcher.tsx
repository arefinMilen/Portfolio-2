'use client';

import React from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'navbar' | 'mobile';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { language, setLanguage } = useTranslation();

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 ${className}`}>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Globe className="w-4 h-4 text-brand-cyan" />
          <span>Language / ভাষা</span>
        </div>
        <div className="flex items-center p-1 bg-dark-bg/80 rounded-lg border border-white/10">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              language === 'en'
                ? 'bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('bn')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              language === 'bn'
                ? 'bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            বাংলা
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center p-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-inner ${className}`}
      title="Switch Language / ভাষা পরিবর্তন করুন"
    >
      <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-slate-400" />
      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'text-dark-bg bg-brand-cyan shadow-sm shadow-cyan-500/30'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`relative z-10 px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
          language === 'bn'
            ? 'text-dark-bg bg-brand-cyan shadow-sm shadow-cyan-500/30'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
};
