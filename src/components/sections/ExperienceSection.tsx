'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { experienceData, certificationsData } from '@/data/portfolioData';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const educationItems = experienceData.filter((item) => item.type === 'education');
  const workItems = experienceData.filter((item) => item.type === 'experience');

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
            ABOUT & JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Experience, Education & Certifications
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            My career trajectory across full-stack engineering, agentic AI workflows, academic milestones, and professional credentials.
          </p>
        </div>

        {/* Dual Columns: Work Experience vs Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Work Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-brand-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-cyan before:to-brand-violet/20">
              {workItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline Node */}
                  <span className="absolute left-3.5 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-brand-cyan border-4 border-dark-bg shadow-md shadow-cyan-500/50" />

                  <div className="glass-card rounded-2xl p-6 border border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white">{item.role}</h4>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-brand-cyan mb-3 flex items-center gap-2">
                      <span>{item.company}</span>
                      {item.location && (
                        <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.achievements && item.achievements.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {item.achievements.map((ach, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.technologies && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-black/40 text-[11px] font-mono text-slate-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-brand-violet" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-violet before:to-brand-cyan/20">
              {educationItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline Node */}
                  <span className="absolute left-3.5 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-brand-violet border-4 border-dark-bg shadow-md shadow-purple-500/50" />

                  <div className="glass-card rounded-2xl p-6 border border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white">{item.role}</h4>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-brand-violet mb-3 flex items-center gap-2 flex-wrap">
                      <span>{item.company}</span>
                      {item.cgpa && (
                        <span className="px-2 py-0.5 rounded bg-brand-violet/20 border border-brand-violet/40 text-xs font-mono text-purple-200">
                          {item.cgpa}
                        </span>
                      )}
                      {item.location && (
                        <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications Showcase Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Certifications & Credentials</h3>
              <p className="text-xs text-slate-400 font-mono">Government & International Skill Recognition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="text-base font-bold text-white leading-snug">{cert.title}</h4>
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 shrink-0">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-brand-cyan mb-2">{cert.issuer}</p>
                  <p className="text-xs font-mono text-slate-400 mb-4">{cert.period}</p>
                  
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-400 bg-black/30 p-2 rounded border border-white/5 mb-4">
                      Credential ID: <span className="text-slate-200">{cert.credentialId}</span>
                    </div>
                  )}
                </div>

                {cert.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
