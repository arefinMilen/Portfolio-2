'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setActiveSection, toggleMobileMenu, setMobileMenuOpen } from '@/store/uiSlice';
import { personalDetails } from '@/data/portfolioData';
import { Menu, X, Code2, Sparkles, Send, PhoneCall } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeSection, isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section intersection observer logic
      const sections = navItems.map((item) => item.href.substring(1));
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
              alt={personalDetails.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
              {personalDetails.name}
            </span>
            <span className="flex items-center text-xs text-slate-400 gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for hire
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
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

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${personalDetails.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-brand-cyan transition-colors px-3 py-2 rounded-lg border border-white/5 bg-white/5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{personalDetails.phone}</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="relative group px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-dark-bg bg-brand-cyan hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => dispatch(toggleMobileMenu())}
          className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] p-4 bg-dark-bg/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl flex flex-col gap-3 z-40 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
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
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full py-3 rounded-xl bg-brand-cyan text-dark-bg font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
