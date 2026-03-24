'use client';

import React, { useRef, useState } from 'react';
import {
  AI_ML_TOOLS,
  BACKEND_TOOLS,
  CLOUD_DATABASE_TOOLS,
  FEATURED_TOOLS,
  FRONTEND_TOOLS,
  TOOLING_PLATFORM_TOOLS,
} from '@/app/homepage/data/tools';

const TOOLKIT_CARDS = [
  {
    id: 'web-foundations',
    label: 'Web Foundations',
    color: '#FF6B2B',
    colorDim: 'rgba(255, 107, 43, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 5h16v14H4z" />
        <path d="M4 9h16" />
        <path d="M8 13h3" />
      </svg>
    ),
    skills: FRONTEND_TOOLS.slice(0, 4),
    description: 'Core web languages and browser-first basics for responsive interface work.',
  },
  {
    id: 'frontend-frameworks',
    label: 'Frontend Frameworks',
    color: '#FF8A4C',
    colorDim: 'rgba(255, 138, 76, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: FRONTEND_TOOLS.slice(4),
    description: 'Modern UI frameworks and fast frontend tooling for product delivery.',
  },
  {
    id: 'backend-core',
    label: 'Backend Core',
    color: '#FFD166',
    colorDim: 'rgba(255, 209, 102, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
      </svg>
    ),
    skills: ['PHP', 'Python', 'Node.js', 'Flask', 'Jinja'],
    description: 'Languages and application-layer frameworks used for APIs and server logic.',
  },
  {
    id: 'server-tooling',
    label: 'Server Tooling',
    color: '#F4A261',
    colorDim: 'rgba(244, 162, 97, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 2v6" />
        <path d="M12 16v6" />
        <path d="M4.93 4.93l4.24 4.24" />
        <path d="M14.83 14.83l4.24 4.24" />
        <path d="M2 12h6" />
        <path d="M16 12h6" />
      </svg>
    ),
    skills: ['npm', 'Nodemon', 'Gunicorn', 'Apache', 'Apache Tomcat', 'Apache Maven'],
    description: 'Runtime, process, and deployment tooling that supports backend development.',
  },
  {
    id: 'cloud-hosting',
    label: 'Cloud & Hosting',
    color: '#A78BFA',
    colorDim: 'rgba(167, 139, 250, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25" />
        <path d="M8 17h8" />
      </svg>
    ),
    skills: CLOUD_DATABASE_TOOLS.slice(0, 3),
    description: 'Cloud platforms and hosting layers for deployments, scaling, and delivery.',
  },
  {
    id: 'databases',
    label: 'Databases',
    color: '#8B5CF6',
    colorDim: 'rgba(139, 92, 246, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v10c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
        <path d="M5 10c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </svg>
    ),
    skills: CLOUD_DATABASE_TOOLS.slice(3),
    description: 'Relational and NoSQL databases for transactional and document-based systems.',
  },
  {
    id: 'data-science',
    label: 'Data Science',
    color: '#06D6A0',
    colorDim: 'rgba(6, 214, 160, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19v-3" />
      </svg>
    ),
    skills: ['Pandas', 'NumPy', 'SciPy', 'Plotly', 'Power BI'],
    description: 'Analysis, visualization, and reporting tools for data-driven product work.',
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    color: '#14B8A6',
    colorDim: 'rgba(20, 184, 166, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="M4.93 4.93l2.12 2.12" />
        <path d="M16.95 16.95l2.12 2.12" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
      </svg>
    ),
    skills: ['MLflow', 'scikit-learn', 'TensorFlow'],
    description: 'Model training, experiment tracking, and applied ML workflow tooling.',
  },
  {
    id: 'collaboration',
    label: 'Tooling & Platforms',
    color: '#4CC9F0',
    colorDim: 'rgba(76, 201, 240, 0.1)',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M8 7h8" />
        <path d="M8 12h8" />
        <path d="M8 17h8" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
      </svg>
    ),
    skills: TOOLING_PLATFORM_TOOLS,
    description: 'Version control, design, and collaboration software used across shipping work.',
  },
];

function SkillCard({
  category,
  index,
}: {
  category: (typeof TOOLKIT_CARDS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="bento-card reveal-hidden relative overflow-hidden"
      style={{
        borderColor: `${category.color}18`,
        transition:
          'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      aria-label={`${category.label} skills`}
    >
      <div
        className="absolute right-0 top-0 h-20 w-20 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${category.color}20, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute bottom-4 right-6 select-none font-mono font-black pointer-events-none transition-opacity duration-300"
        style={{
          fontSize: '5rem',
          color: `${category.color}08`,
          lineHeight: 1,
          opacity: hovered ? 1 : 0.5,
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-sm transition-transform duration-300"
          style={{
            background: category.colorDim,
            color: category.color,
            transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {category.icon}
        </div>
        <div>
          <h3 className="font-mono text-sm font-bold text-fg">{category.label}</h3>
          <p className="font-mono text-xs text-fg-muted">{category.skills.length} skills</p>
        </div>
      </div>

      <p className="relative z-10 mb-5 text-sm leading-relaxed text-fg-muted">
        {category.description}
      </p>

      <div className="relative z-10 flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <span
            key={skill}
            className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: `${category.color}28`,
              background: `${category.color}06`,
              color: category.color,
              transitionDelay: `${skillIndex * 20}ms`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative" aria-label="Skills">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #06D6A0, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-[-150px] w-[400px] h-[400px] opacity-[0.05] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #06D6A0, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal-hidden">
          <span className="section-tag mb-5 block">Skills</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-black text-fg"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: '1.05',
              }}
            >
              The <span className="text-gradient-warm">toolkit</span> I build with
            </h2>
            <p className="text-fg-muted max-w-sm text-sm leading-relaxed">
              Three years of building across the full stack, from training neural networks to
              shipping production React apps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {TOOLKIT_CARDS.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <div className="mt-16 py-6 border-y border-border overflow-hidden reveal-hidden">
          <div className="marquee-track gap-8 flex items-center">
            {[...Array(3)].flatMap(() =>
              FEATURED_TOOLS.map((tech, index) => (
                <React.Fragment key={`${tech}-${index}`}>
                  <span className="font-mono text-sm text-fg-muted whitespace-nowrap">{tech}</span>
                  <span className="text-primary opacity-40" aria-hidden="true">
                    +
                  </span>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
