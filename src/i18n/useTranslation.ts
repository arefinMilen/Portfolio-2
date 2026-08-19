'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setLanguage, Language } from '@/store/uiSlice';
import { en } from './locales/en';
import { bn } from './locales/bn';

export function useTranslation() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('portfolio_lang') as Language | null;
        if (savedLang && (savedLang === 'en' || savedLang === 'bn') && savedLang !== language) {
          dispatch(setLanguage(savedLang));
        }
      } catch {
        // Ignore read errors
      }
    }
  }, [dispatch, language]);

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const t = language === 'bn' ? bn : en;

  return {
    t,
    language,
    setLanguage: changeLanguage,
    isBn: language === 'bn',
  };
}
