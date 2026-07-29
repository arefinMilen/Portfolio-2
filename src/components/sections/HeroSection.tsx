'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalDetails } from '@/data/portfolioData';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

const roles = [
  'SOFTWARE ENGINEER',
  'AGENTIC AI SPECIALIST',
  'FULL-STACK DEVELOPER',
];

const TypewriterHeadline: React.FC = () => {
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const fullText = roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && currentText === fullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] mb-6 min-h-[4rem] sm:min-h-[5rem]">
      I'M A{' '}
      <span className="text-gradient-cyan border-b-2 border-brand-cyan/60 pb-1">
        {currentText}
      </span>
      <span className="inline-block w-1 h-7 sm:h-11 bg-brand-cyan ml-1.5 align-middle animate-pulse" />
    </h1>
  );
};

const AnimatedCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [count, setCount] = React.useState(0);
  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * targetNumber));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetNumber]);

  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center hover:border-brand-cyan/40 transition-all">
      <div className="text-xl sm:text-2xl font-extrabold text-gradient-cyan">
        {count}{suffix}
      </div>
      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-brand-cyan/30 backdrop-blur-md mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
              <span className="text-xs font-mono text-cyan-200 tracking-wide uppercase">
                Software Engineer & Agentic AI Specialist
              </span>
            </motion.div>

            {/* Typewriter Main Headline */}
            <TypewriterHeadline />

            {/* Bio Paragraph */}
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {personalDetails.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#work"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore My Works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`tel:${personalDetails.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-card hover:bg-white/10 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 border border-white/10"
              >
                <PhoneCall className="w-4 h-4 text-brand-cyan" />
                <span>Call: {personalDetails.phone}</span>
              </a>
            </div>

            {/* Floating Tech Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 w-full">
              <span className="text-xs font-mono text-slate-400">CORE STACK:</span>
              {['Next.js App Router', 'TypeScript', 'Claude Agent', 'PostgreSQL', 'Redux Toolkit', 'TanStack Query', 'Framer Motion'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Profile Card & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Outer glowing halo */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-cyan to-brand-violet opacity-50 blur-xl animate-pulse" />
              
              {/* Card Container */}
              <div className="relative glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-brand-cyan/50 shadow-xl mb-5 group">
                  <Image
                    src={personalDetails.avatar}
                    alt={personalDetails.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-60" />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{personalDetails.name}</h3>
                <p className="text-sm text-brand-cyan font-mono mb-4">{personalDetails.role}</p>

                {/* Animated Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-3 w-full pt-4 border-t border-white/10">
                  {personalDetails.stats.map((stat) => (
                    <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
