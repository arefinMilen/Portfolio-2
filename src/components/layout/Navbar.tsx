'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveSection, toggleMobileMenu, setMobileMenuOpen } from '@/store/uiSlice';
import { personalDetails } from '@/data/portfolioData';
import { useTranslation } from '@/i18n/useTranslation';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
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
          ? 'py-3 bg-dark-bg/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-950/20'
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
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
              {t.hero.name}
            </span>
            <span className="flex items-center text-xs text-slate-400 gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.nav.availableForHire}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
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
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
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

        {/* Right CTA & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher variant="navbar" />
          <a
            href={personalDetails.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-brand-cyan transition-all px-3.5 py-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 hover:bg-brand-cyan/20"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{t.nav.bookMeeting}</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="relative group px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-dark-bg bg-brand-cyan hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.nav.letsTalk}</span>
          </a>
        </div>

        {/* Mobile Toggle & Mobile Switcher */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher variant="navbar" />
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] p-4 bg-dark-bg/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl flex flex-col gap-3 z-40 animate-in slide-in-from-top-4 duration-200">
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
                    ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/40 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-brand-cyan" />}
              </a>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href={personalDetails.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet to-purple-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 border border-purple-400/30"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>{t.nav.bookMeeting}</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full py-3 rounded-xl bg-brand-cyan text-dark-bg font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>{t.nav.letsTalk}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
