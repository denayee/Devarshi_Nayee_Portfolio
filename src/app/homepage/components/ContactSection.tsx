'use client';

import React, { useState } from 'react';

type FormState = { name: string; email: string; subject: string; message: string };
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" aria-label="Contact Devarshi">
      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #FF6B2B, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF6B2B, #FFD166, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Big header */}
        <div className="mb-20 reveal-hidden">
          <span className="section-tag mb-5 block">Contact</span>
          <h2
            className="font-black text-fg"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em', lineHeight: '0.95' }}
          >
            Let&apos;s build<br />
            <span className="text-gradient-warm">something</span><br />
            together.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-2 reveal-left">
            <p className="text-fg-muted text-base leading-relaxed mb-10">
              Open to full-time roles, freelance projects, and interesting collaborations.
              Response time: usually within 24 hours.
            </p>

            {/* Contact links */}
            <div className="space-y-4 mb-10">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'nayeedevarshi@email.com',
                  href: 'mailto:nayeedevarshi@email.com',
                  color: '#FF6B2B',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                  label: 'GitHub',
                  value: 'github.com/denayee',
                  href: 'https://github.com/denayee',
                  color: '#FFD166',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/devarshi_nayee',
                  href: 'https://www.linkedin.com/in/devarshi-nayee-b1aa63279/',
                  color: '#06D6A0',
                },
              ].map(({ icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 border border-[rgba(255,255,255,0.06)] rounded-sm group transition-all duration-300 hover:border-opacity-60"
                  style={{ transition: 'border-color 0.3s ease, background 0.3s ease' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}40`;
                    (e.currentTarget as HTMLAnchorElement).style.background = `${color}05`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                  aria-label={`${label}: ${value}`}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}15`, color }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-fg-muted">{label}</p>
                    <p className="font-mono text-sm text-fg group-hover:text-primary transition-colors">{value}</p>
                  </div>
                  <svg
                    className="ml-auto text-fg-muted group-hover:text-primary transition-all duration-300 group-hover:translate-x-1"
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div
              className="p-5 rounded-sm border"
              style={{ borderColor: 'rgba(6,214,160,0.2)', background: 'rgba(6,214,160,0.04)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full bg-[#06D6A0]"
                  style={{ animation: 'pulseWarm 2s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-[#06D6A0] tracking-widest uppercase">Available Now</span>
              </div>
              <p className="font-mono text-xs text-fg-muted leading-relaxed">
                Open to full-time roles, internships, and freelance projects in AI/ML and Full Stack development.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 reveal-right">
            <form
              onSubmit={handleSubmit}
              className="relative"
              aria-label="Contact form"
            >
              {/* Corner accents */}
              <div className="corner-accent corner-accent-tl" aria-hidden="true" />
              <div className="corner-accent corner-accent-br" aria-hidden="true" />

              <div className="p-8 border border-[rgba(255,255,255,0.06)] rounded-sm bg-[rgba(255,255,255,0.01)]">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="font-mono text-xs text-fg-muted mb-2 block uppercase tracking-widest">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-xs text-fg-muted mb-2 block uppercase tracking-widest">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-input"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="subject" className="font-mono text-xs text-fg-muted mb-2 block uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, job opportunity..."
                    className="form-input"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="font-mono text-xs text-fg-muted mb-2 block uppercase tracking-widest">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none"
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-3 text-sm disabled:opacity-70"
                  aria-label={status === 'sending' ? 'Sending message' : 'Send message'}
                >
                  {status === 'sending' && (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                    </svg>
                  )}
                  {status === 'idle' && 'Send Message →'}
                  {status === 'sending' && 'Sending...'}
                  {status === 'success' && '✓ Message Sent!'}
                  {status === 'error' && 'Failed — Try Again'}
                </button>

                {status === 'success' && (
                  <p className="font-mono text-xs text-[#06D6A0] text-center mt-4">
                    Thanks! I&apos;ll get back to you within 24 hours.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
