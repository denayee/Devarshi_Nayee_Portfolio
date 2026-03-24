'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

function useScrambleText(finalText: string, trigger: boolean) {
  const [displayed, setDisplayed] = useState(finalText);
  // Using uniform upper-case letters drastically reduces horizontal layout shifting compared to symbols
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        finalText
          .split('')
          .map((char, idx) => {
            if (idx < Math.floor(iteration)) return finalText[idx];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
        setDisplayed(finalText); // Ensure exact final text settles
      }
      iteration += 1 / 4; // 4 ticks (140ms) per character
    }, 35);

    return () => clearInterval(interval);
  }, [trigger, finalText]);

  return displayed;
}

function useTypingEffect(words: string[], speed = 80, pause = 2200) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  const scrambledName = useScrambleText('DEVARSHI NAYEE', scrambleTrigger);
  const typedText = useTypingEffect([
    'AI/ML Systems',
    'Full Stack Web Apps',
    'Intelligent APIs',
    'React Interfaces',
    'Data Science',
    'Machine Learning',
    'Neural Networks',
  ]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setScrambleTrigger(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    if (nameRef.current) {
      const mx = x * 12;
      const my = y * 6;
      nameRef.current.style.transform = `translate(${mx}px, ${my}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
      aria-label="Hero section"
    >
      <div className="hero-canvas">{mounted && <ParticleField />}</div>

      <div
        className="orb w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #FF6B2B, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[-80px] left-[-80px] opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #FFD166, transparent 70%)', animationDelay: '4s' }}
        aria-hidden="true"
      />
      <div
        className="orb w-[300px] h-[300px] top-1/2 left-1/3 opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #06D6A0, transparent 70%)', animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,43,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,43,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'skewY(-3deg)',
          transformOrigin: 'top left',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="min-h-[80vh] flex items-center">
          <div className="flex flex-col max-w-5xl">
            <div
              className="inline-flex items-center gap-3 mb-10 w-fit"
              style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
            >
              <div className="flex items-center gap-2 px-4 py-2 border border-[rgba(255,107,43,0.3)] bg-[rgba(255,107,43,0.06)] rounded-sm">
                <span
                  className="w-2 h-2 rounded-full bg-[#06D6A0]"
                  style={{ animation: 'pulseWarm 2s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-[#06D6A0] tracking-widest uppercase">
                  Open to Work
                </span>
              </div>
              <span className="font-mono text-xs text-fg-muted">&rarr; Full-time &amp; Freelance</span>
            </div>

            <div
              ref={nameRef}
              className="mb-4 relative"
              style={{ transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <h1
                className="font-black text-fg leading-none select-none"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 8rem)',
                  letterSpacing: '-0.05em',
                  lineHeight: '0.9',
                  animation: 'slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
                }}
                aria-label="Devarshi Nayee"
              >
                <span className="glitch text-gradient-warm inline-block" data-text={scrambledName}>
                  {scrambledName}
                </span>
              </h1>
              <div
                className="absolute inset-0 font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 8rem)',
                  letterSpacing: '-0.05em',
                  lineHeight: '0.9',
                  WebkitTextStroke: '1px rgba(255,107,43,0.15)',
                  color: 'transparent',
                  transform: 'translate(4px, 4px)',
                  zIndex: -1,
                }}
                aria-hidden="true"
              >
                DEVARSHI NAYEE
              </div>
            </div>

            <div
              className="flex items-center gap-4 mb-8"
              style={{ animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' }}
            >
              <div className="w-12 h-[2px] bg-primary" />
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <span className="font-mono text-sm md:text-xl text-fg-muted">Building</span>
                <span
                  className="font-mono text-sm md:text-xl text-primary min-w-[200px]"
                  style={{ textShadow: '0 0 20px rgba(255,107,43,0.6)' }}
                >
                  {typedText}
                  <span
                    className="inline-block w-[2px] h-5 bg-primary ml-1 align-middle"
                    style={{ animation: 'blink 1s steps(1) infinite' }}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>

            <p
              className="text-base md:text-lg text-fg-muted max-w-sm sm:max-w-md md:max-w-xl mb-10 leading-relaxed pr-4 sm:pr-0"
              style={{ animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' }}
            >
              Computer engineering student crafting{' '}
              <span className="text-fg font-semibold">intelligent systems</span> and{' '}
              <span className="text-fg font-semibold">modern web apps</span> from neural networks
              to React UIs.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 items-start"
              style={{ animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s both' }}
            >
              <button
                onClick={scrollToProjects}
                className="btn-primary text-xs sm:text-sm font-bold tracking-wide px-6 py-3 sm:px-8 sm:py-4"
                aria-label="View projects"
              >
                View Projects &rarr;
              </button>
              <button
                onClick={scrollToContact}
                className="btn-outline text-xs sm:text-sm font-bold tracking-wide px-6 py-3 sm:px-8 sm:py-4"
                aria-label="Contact me"
              >
                Let&apos;s Talk
              </button>
            </div>

            <div
              className="overflow-hidden"
              style={{ animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both' }}
            >
              <div className="marquee-track gap-3 flex">
                {[
                  'React.js',
                  'Node.js',
                  'Python',
                  'ML/AI',
                  'MongoDB',
                  'FastAPI',
                  'TypeScript',
                  'Docker',
                  'React.js',
                  'Node.js',
                  'Python',
                  'ML/AI',
                  'MongoDB',
                  'FastAPI',
                  'TypeScript',
                  'Docker',
                ].map((tech, i) => (
                  <span key={i} className="skill-badge shrink-0">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="scroll-indicator flex items-center gap-3 mt-10 opacity-40"
              style={{ animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s both' }}
            >
              <svg width="16" height="28" viewBox="0 0 16 28" fill="none" aria-hidden="true">
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="26"
                  rx="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-fg-muted"
                />
                <circle
                  cx="8"
                  cy="9"
                  r="2.5"
                  fill="currentColor"
                  className="text-primary"
                  style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
                />
              </svg>
              <span className="font-mono text-xs text-fg-muted tracking-widest">scroll down</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #0D0B08)' }}
        aria-hidden="true"
      />
    </section>
  );
}
