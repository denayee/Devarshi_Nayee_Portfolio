'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ALL_TOOLS } from '@/app/homepage/data/tools';

function useCounter(target: number, duration = 1500, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  return count;
}

const QUICK_FACTS = [
  { label: 'Focus', value: 'AI/ML + Full Stack' },
  { label: 'Stack', value: 'MERN + Python' },
  { label: 'Status', value: 'Open to Work' },
  { label: 'Location', value: 'Remote Ready' },
];

const SYSTEM_NODES = [
  {
    label: 'Interfaces',
    value: 'React / Next.js',
    color: '#FF6B2B',
    top: '16%',
    left: '50%',
    delay: '0ms',
  },
  {
    label: 'Intelligence',
    value: 'ML / LLMs',
    color: '#06D6A0',
    top: '50%',
    left: '82%',
    delay: '800ms',
  },
  {
    label: 'Infrastructure',
    value: 'Cloud / Data',
    color: '#A78BFA',
    top: '84%',
    left: '50%',
    delay: '1400ms',
  },
  {
    label: 'Backends',
    value: 'APIs / Python',
    color: '#FFD166',
    top: '50%',
    left: '18%',
    delay: '400ms',
  },
];

const SIGNAL_NOTES = [
  { label: 'Currently Exploring', value: 'LLM integrations' },
  { label: 'Shipping Style', value: 'Fast, product-minded builds' },
  { label: 'Best Fit', value: 'AI + web experiences' },
];

function StatBlock({
  value,
  suffix,
  label,
  color,
  trigger,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
  trigger: boolean;
  delay: number;
}) {
  const count = useCounter(value, 1200, trigger);

  return (
    <div
      className="relative group"
      style={{ animation: `slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both` }}
    >
      <div
        className="absolute inset-0 rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at center, ${color}10, transparent 70%)` }}
        aria-hidden="true"
      />
      <p
        className="mb-1 font-mono font-black leading-none"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          color,
          textShadow: `0 0 40px ${color}50`,
        }}
      >
        {count}
        {suffix}
      </p>
      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">{label}</p>
    </div>
  );
}

function SystemsBoard() {
  return (
    <div className="bento-card glass-hover relative mb-10 overflow-hidden p-0">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-80"
        style={{ background: 'linear-gradient(180deg, rgba(255,107,43,0.12), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255,107,43,0.24), rgba(6,214,160,0.08), transparent 72%)',
        }}
        aria-hidden="true"
      />

      <div className="relative px-6 py-6 sm:px-8 sm:py-7">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
              Signal Board
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-fg">
              Building products where interfaces, APIs, and intelligence move together.
            </h3>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-sm border border-[rgba(6,214,160,0.18)] bg-[rgba(6,214,160,0.08)] px-3 py-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: '#06D6A0', boxShadow: '0 0 18px rgba(6,214,160,0.75)' }}
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
              Open to Build
            </span>
          </div>
        </div>

        <div className="relative mx-auto mb-8 h-[330px] max-w-[440px]">
          <div
            className="absolute left-1/2 top-[18%] bottom-[18%] w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: 'rgba(255,107,43,0.18)' }}
            aria-hidden="true"
          />

          <div className="absolute left-1/2 top-1/2 h-0 w-0" aria-hidden="true">
            <div style={{ animation: 'rotateOrbit 18s linear infinite' }}>
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: '#FF6B2B', boxShadow: '0 0 16px rgba(255,107,43,0.8)' }}
              />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-0 w-0" aria-hidden="true">
            <div style={{ animation: 'rotateOrbitReverse 14s linear infinite' }}>
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: '#06D6A0', boxShadow: '0 0 14px rgba(6,214,160,0.75)' }}
              />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="relative flex h-32 w-32 items-center justify-center rounded-full border"
              style={{
                borderColor: 'rgba(255,107,43,0.25)',
                background:
                  'radial-gradient(circle, rgba(255,107,43,0.16), rgba(13,11,8,0.94) 72%)',
                boxShadow: '0 0 60px rgba(255,107,43,0.12)',
              }}
            >
              <div
                className="absolute inset-[14px] rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                aria-hidden="true"
              />
              <div className="text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                  Core
                </p>
                <p className="mt-2 text-lg font-black leading-none">
                  <span className="text-gradient-warm">AI x Web</span>
                </p>
                <p className="mt-1 font-mono text-[10px] text-fg-muted">Product Systems</p>
              </div>
            </div>
          </div>

          {SYSTEM_NODES.map((node) => (
            <div
              key={node.label}
              className="absolute"
              style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="min-w-[122px] rounded-sm border px-3 py-2.5 backdrop-blur-md"
                style={{
                  borderColor: `${node.color}35`,
                  background: `linear-gradient(135deg, ${node.color}18, rgba(13,11,8,0.9))`,
                  animation: `float 9s cubic-bezier(0.45, 0.05, 0.55, 0.95) ${node.delay} infinite`,
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: node.color, boxShadow: `0 0 14px ${node.color}` }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-fg-muted">{node.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {SIGNAL_NOTES.map((note) => (
            <div
              key={note.label}
              className="rounded-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                {note.label}
              </p>
              <p className="mt-2 text-sm text-fg">{note.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-32"
      aria-label="About Devarshi"
    >
      <div
        className="blob pointer-events-none absolute right-[-200px] top-1/4 h-[500px] w-[500px] opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #FF6B2B, #FFD166, transparent 70%)' }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-0 top-0 h-[1px] w-full opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #FF6B2B, #FFD166, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 reveal-hidden">
          <span className="section-tag mb-5 block">About Me</span>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="font-black text-fg"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: '1.05',
              }}
            >
              Engineering at the
              <br />
              intersection of <span className="text-gradient-warm">AI / ML & Web Development</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted lg:text-right">
              Three years of building across the full stack, from training neural networks to
              shipping production React apps.
            </p>
          </div>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-8 border-b border-[rgba(255,255,255,0.06)] pb-20 md:grid-cols-4">
          <StatBlock
            value={7}
            suffix="+"
            label="Projects Built"
            color="#FF6B2B"
            trigger={triggered}
            delay={0}
          />
          <StatBlock
            value={3}
            suffix="+"
            label="Years Coding"
            color="#FFD166"
            trigger={triggered}
            delay={100}
          />
          <StatBlock
            value={3}
            suffix=""
            label="ML Models"
            color="#06D6A0"
            trigger={triggered}
            delay={200}
          />
          <StatBlock
            value={4}
            suffix=""
            label="Open Source"
            color="#A78BFA"
            trigger={triggered}
            delay={300}
          />
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-5">
          <div className="reveal-left lg:col-span-3">
            <SystemsBoard />

            <p className="mb-5 text-base leading-relaxed text-fg-muted">
              I&apos;m a computer engineering student with a deep focus on building systems that sit
              at the intersection of machine learning and modern web development. I care about
              writing clean, efficient code that solves real problems.
            </p>
            <p className="mb-10 text-base leading-relaxed text-fg-muted">
              From training neural networks to deploying full-stack applications with React and
              Node.js, I thrive in environments where technical depth meets product thinking.
              Currently exploring LLM integration, computer vision, and scalable API architecture.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              {QUICK_FACTS.map(({ label, value }) => (
                <div
                  key={label}
                  className="group flex items-center gap-2 rounded-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-2 transition-all duration-300 hover:border-primary"
                >
                  <span className="font-mono text-xs text-fg-muted">{label}:</span>
                  <span className="font-mono text-xs text-primary">{value}</span>
                </div>
              ))}
            </div>

            <a
              href="/assets/DEVARSHI%20NAYEE%20RESUME.pdf"
              download="DEVARSHI NAYEE RESUME.pdf"
              className="btn-primary inline-flex items-center gap-3 text-sm"
              aria-label="Download resume"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>

          <div className="reveal-right lg:col-span-2">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Tools & Technologies
            </h3>

            <div className="mb-10 flex flex-wrap gap-2">
              {ALL_TOOLS.map((tool, index) => (
                <span
                  key={tool}
                  className="skill-badge"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tool}
                </span>
              ))}
            </div>

            <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-fg-muted">
              Core Proficiency
            </h3>
            <div className="space-y-5">
              {[
                { name: 'React / Next.js', level: 90, color: '#FF6B2B' },
                { name: 'Python / ML', level: 88, color: '#FFD166' },
                { name: 'Node.js / APIs', level: 82, color: '#06D6A0' },
                { name: 'MongoDB / SQL', level: 75, color: '#A78BFA' },
              ].map(({ name, level, color }, index) => (
                <SkillBar
                  key={name}
                  name={name}
                  level={level}
                  color={color}
                  index={index}
                  trigger={triggered}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  name,
  level,
  color,
  index,
  trigger,
}: {
  name: string;
  level: number;
  color: string;
  index: number;
  trigger: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const timer = setTimeout(
      () => {
        if (barRef.current) barRef.current.style.width = `${level}%`;
      },
      index * 120 + 300
    );

    return () => clearTimeout(timer);
  }, [trigger, level, index]);

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="font-mono text-sm text-fg">{name}</span>
        <span className="font-mono text-xs" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}88 100%)` }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency ${level}%`}
        />
      </div>
    </div>
  );
}
