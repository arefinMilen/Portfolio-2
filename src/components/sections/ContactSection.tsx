'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { personalDetails } from '@/data/portfolioData';
import { Send, Phone, Mail, MapPin, Loader2, CheckCircle2, Calendar } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const sendEmailApi = async (data: ContactFormValues) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_o56e6ky';
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_uddgt3a';
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'JnDfEjQ-KEuyaIIXM';

  emailjs.init(publicKey);

  const response = await emailjs.send(serviceId, templateId, {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    to_name: personalDetails.name,
  });

  return response;
};

export const ContactSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: sendEmailApi,
    onSuccess: () => {
      toast.success('Message sent successfully! Samsul will reach out to you soon.');
      reset();
    },
    onError: (error: any) => {
      toast.error('Failed to send message: ' + (error?.text || error?.message || 'Unknown error'));
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Interested in Working Together? Let's Talk
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Have a web app project, SaaS idea, frontend consultation, or internship opportunity? Drop me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-1xl font-bold text-white mb-2">Direct Contact & Scheduling</h3>

              {/* Google Calendar Appointment Card */}
              <a
                href={personalDetails.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-brand-violet/20 to-purple-600/20 border border-brand-violet/40 hover:border-brand-cyan transition-all group shadow-lg shadow-purple-950/30"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-violet/30 border border-brand-violet/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Calendar className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-mono text-purple-300 font-semibold uppercase tracking-wider">Instant Scheduling</div>
                  <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                    <span>Book 1-on-1 Google Meeting</span>
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${personalDetails.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-cyan/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Phone Number</div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">
                    {personalDetails.phone}
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${personalDetails.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-cyan/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Email Address</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {personalDetails.email}
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Location</div>
                  <div className="text-sm font-semibold text-white">
                    {personalDetails.location}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Samsul Arefin"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  {...register('subject')}
                  placeholder="Web Project Inquiry / Partnership"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                />
                {errors.subject && (
                  <span className="text-xs text-rose-400 mt-1 block">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  {...register('message')}
                  placeholder="Tell me about your project requirements or how I can help..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 mt-1 block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-cyan-400 text-dark-bg font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message Now</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
