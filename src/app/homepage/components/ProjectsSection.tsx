'use client';

import React, { useEffect, useRef, useState } from 'react';

import ProjectDetailModal from './ProjectDetailModal';
import { getProjectDetailFromRepo } from '../data/projectDetails';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  languages_url?: string;
  all_languages?: string[];
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#FFD166',
  TypeScript: '#06D6A0',
  Python: '#FF6B2B',
  HTML: '#FF4500',
  CSS: '#00B4D8',
  'Jupyter Notebook': '#FF6B2B',
  Shell: '#06D6A0',
  Go: '#00ADD8',
};



function ProjectCard({
  repo,
  index,
  onOpenDetails,
}: {
  repo: GitHubRepo;
  index: number;
  onOpenDetails: (repo: GitHubRepo) => void;
}) {
  const langColor = repo.language ? LANG_COLORS[repo.language] || '#8A7F74' : '#8A7F74';
  const cardRef = useRef<HTMLDivElement>(null);

  const projectDetail = getProjectDetailFromRepo(repo);
  const liveUrl = projectDetail?.liveUrl;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const openDetails = () => {
    onOpenDetails(repo);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetails();
    }
  };

  return (
    <article
      ref={cardRef}
      className="project-card reveal-hidden group relative"
      style={{
        transitionDelay: `${index * 70}ms`,
        background: 'var(--color-bg-card)',
      }}
      onMouseMove={handleMouseMove}
      onClick={openDetails}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`Open details for ${repo.name}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
        style={{
          background:
            'radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,107,43,0.06), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-10 rounded-sm"
            style={{ background: `linear-gradient(180deg, ${langColor}, ${langColor}44)` }}
            aria-hidden="true"
          />
          <div>
            <h3 className="font-mono text-sm font-bold text-fg group-hover:text-primary transition-colors duration-200">
              {repo.name}
            </h3>
            {repo.language && (
              <span className="font-mono text-xs" style={{ color: langColor }}>
                {repo.language}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-3 py-1.5 rounded-sm flex items-center gap-2 transition-all duration-200 hover:brightness-125 hover:shadow-sm"
              style={{
                background: `${langColor}12`,
                border: `1px solid ${langColor}28`,
                color: langColor,
              }}
              aria-label={`Open live demo for ${repo.name}`}
              title="View Live Demo"
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: langColor }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: langColor }}></span>
              </span>
              Live
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 border border-border flex items-center justify-center text-fg-muted hover:text-primary hover:border-primary transition-all duration-200 rounded-sm group/link"
            aria-label={`Open ${repo.name} on GitHub`}
            title="View Source on GitHub"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <p className="text-fg-muted text-sm leading-relaxed mb-5 line-clamp-3">
        {repo.description ||
          'A project by Devarshi - open the popup for details and GitHub access.'}
      </p>

      {(repo.all_languages || repo.language || repo.topics.length > 0) && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {repo.all_languages && repo.all_languages.length > 0 ? (
            repo.all_languages.map((lang) => (
              <span key={`lang-${lang}`} className="tech-tag" style={{ border: `1px solid ${LANG_COLORS[lang] || '#8A7F74'}60`, color: LANG_COLORS[lang] || '#8A7F74' }}>
                {lang}
              </span>
            ))
          ) : (
            repo.language && !repo.topics.some(t => t.toLowerCase() === repo.language?.toLowerCase()) && (
              <span className="tech-tag" style={{ border: `1px solid ${LANG_COLORS[repo.language] || '#8A7F74'}60`, color: LANG_COLORS[repo.language] || '#8A7F74' }}>
                {repo.language}
              </span>
            )
          )}
          {repo.topics.filter(topic => !(repo.all_languages || []).some(lang => lang.toLowerCase() === topic.toLowerCase())).map((topic) => (
            <span key={topic} className="tech-tag">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-fg-muted">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-mono text-xs">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1.5 text-fg-muted">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="6" y1="3" x2="6" y2="15" />
              <path d="M18 3a3 3 0 010 6" />
              <path d="M6 18a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M18 9a9 9 0 01-9 9" />
            </svg>
            <span className="font-mono text-xs">{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-fg-muted">
            {new Date(repo.updated_at).getFullYear()}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            Details
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  
  const dynamicFilters = ['All', ...Array.from(new Set(repos.flatMap((r) => r.all_languages || (r.language ? [r.language] : [])).filter(Boolean))) as string[]];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Our internal API runs at CDN speeds because it's edge cached via Next.js
        const res = await fetch('/api/projects');

        if (!res.ok) {
          if (res.status === 503) {
            throw new Error('GitHub API rate limit exceeded.');
          }
          throw new Error(`API failed: ${res.status}`);
        }

        const data = await res.json();
        setRepos(Array.isArray(data) && data.length > 0 ? data : []);
      } catch (err: any) {
        console.error('Failed to load GitHub data:', err);
        setError(err.message || 'Failed to load projects');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos = filter === 'All' ? repos : repos.filter((repo) => (repo.all_languages || []).includes(filter) || repo.language === filter);
  const activeRepo = repos.find((repo) => repo.id === activeProjectId) || null;
  const activeProject = activeRepo ? getProjectDetailFromRepo(activeRepo) : null;

  return (
    <>
      <section id="projects" className="py-32 relative" aria-label="Projects">
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, #FFD166, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/3 right-[-150px] w-[400px] h-[400px] opacity-[0.05] pointer-events-none rounded-full"
          style={{ background: 'radial-gradient(circle, #FFD166, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 reveal-hidden">
            <div>
              <span className="section-tag mb-5 block">Projects</span>
              <h2
                className="font-black text-fg"
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.05',
                }}
              >
                Code I&apos;ve <span className="text-gradient-fire">shipped</span>
              </h2>
              <p className="text-fg-muted mt-3 text-sm font-mono">
                Live from{' '}
                <a
                  href="https://github.com/denayee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/denayee
                </a>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {dynamicFilters.map((currentFilter) => (
                <button
                  key={currentFilter}
                  onClick={() => setFilter(currentFilter)}
                  className={`font-mono text-xs px-4 py-2 rounded-sm border transition-all duration-200 ${
                    filter === currentFilter
                      ? 'border-primary bg-primary-dim text-primary'
                      : 'border-border text-fg-muted hover:border-primary hover:text-primary'
                  }`}
                  aria-pressed={filter === currentFilter}
                >
                  {currentFilter}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-64 rounded-sm border border-border bg-surface"
                  style={{
                    animation: 'pulseWarm 1.5s ease-in-out infinite',
                    animationDelay: `${index * 100}ms`,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 border border-[rgba(255,107,43,0.3)] bg-[rgba(255,107,43,0.05)] rounded-lg">
              <span className="text-primary font-mono text-xl mb-3 block">Oops! {error}</span>
              <p className="text-fg-muted max-w-lg mx-auto">
                {error.includes('rate limit')
                  ? "I've hit GitHub's unauthenticated API rate limit during local development. Please provide a NEXT_PUBLIC_GITHUB_TOKEN in your .env or check back later."
                  : "Could not fetch dynamic repository data from GitHub right now. Please try again later."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <ProjectCard
                  key={repo.id}
                  repo={repo}
                  index={index}
                  onOpenDetails={(selectedRepo) => setActiveProjectId(selectedRepo.id)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-16 reveal-hidden">
            <a
              href="https://github.com/denayee"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 text-sm"
              aria-label="View all projects on GitHub"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View All on GitHub
            </a>
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectDetailModal project={activeProject} onClose={() => setActiveProjectId(null)} />
      )}
    </>
  );
}
