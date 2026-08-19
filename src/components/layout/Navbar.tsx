'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveSection, toggleMobileMenu, setMobileMenuOpen } from '@/store/uiSlice';
import { personalDetails } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Menu, X, Sparkles, Send, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeSection, isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { label: t.nav.home, href: '#home', id: 'home' },
    { label: t.nav.services, href: '#services', id: 'services' },
    { label: t.nav.work, href: '#work', id: 'work' },
    { label: t.nav.skills, href: '#skills', id: 'skills' },
    { label: t.nav.leadership, href: '#leadership', id: 'leadership' },
    { label: t.nav.about, href: '#about', id: 'about' },
    { label: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section intersection observer logic
      const sections = ['home', 'services', 'work', 'skills', 'leadership', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            dispatch(setActiveSection(section));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handleNavClick = (href: string) => {
    dispatch(setMobileMenuOpen(false));
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-900/80 dark:bg-dark-bg/80 light:bg-white/85 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-2xl shadow-cyan-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="#home"
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-cyan/40 group-hover:border-brand-cyan transition-colors">
            <Image
              src={personalDetails.avatar}
              alt={t.hero.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors">
              {t.hero.name}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-all rounded-full ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/30 shadow-lg shadow-cyan-500/10 z-0" />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Controls (Language & Theme Switcher) */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle variant="navbar" />
          <LanguageSwitcher variant="navbar" />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle variant="navbar" />
          <LanguageSwitcher variant="navbar" />
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] p-4 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 shadow-2xl flex flex-col gap-3 z-40 animate-in slide-in-from-top-4 duration-200">
          <ThemeToggle variant="mobile" />
          <LanguageSwitcher variant="mobile" />
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/40 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-brand-cyan" />}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
