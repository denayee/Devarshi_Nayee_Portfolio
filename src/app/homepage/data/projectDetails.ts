'use client';

export interface ProjectReference {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  updated_at: string;
  stargazers_count?: number;
  forks_count?: number;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  headline: string;
  summary: string;
  overview: string;
  impact: string;
  features: string[];
  stack: string[];
  repoUrl: string;
  gallery: ProjectGalleryImage[];
  accent: string;
}

interface ProjectFrame {
  title: string;
  caption: string;
}

interface ProjectContent {
  id: string;
  aliases: string[];
  title: string;
  headline: string;
  summary: string;
  overview: string;
  impact: string;
  features: string[];
  stack: string[];
  repoUrl?: string;
  accent: string;
  frames: ProjectFrame[];
}

const DEFAULT_REPO_URL = 'https://github.com/denayee';

const LANGUAGE_ACCENTS: Record<string, string> = {
  JavaScript: '#FFD166',
  TypeScript: '#06D6A0',
  Python: '#FF6B2B',
  HTML: '#FF6B2B',
  CSS: '#00B4D8',
  'Jupyter Notebook': '#FF6B2B',
  Shell: '#06D6A0',
  Go: '#00ADD8',
};

const PROJECT_CONTENT: ProjectContent[] = [];

function toLookupKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

function escapeSvgText(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length - 3)}...` : value;
}

function humanizeRepoName(value: string) {
  return value
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildProjectFrameImage(
  projectTitle: string,
  frame: ProjectFrame,
  accent: string,
  index: number
) {
  const secondary = ['#FFD166', '#06D6A0', '#00B4D8'][index % 3];
  const title = escapeSvgText(truncate(projectTitle, 28));
  const frameTitle = escapeSvgText(truncate(frame.title, 24));
  const caption = escapeSvgText(truncate(frame.caption, 72));

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#0D0B08" />
          <stop offset="100%" stop-color="#17110B" />
        </linearGradient>
        <linearGradient id="panel" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.18" />
          <stop offset="100%" stop-color="${secondary}" stop-opacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="1200" height="720" fill="url(#bg)" />
      <circle cx="1000" cy="120" r="190" fill="${accent}" fill-opacity="0.14" />
      <circle cx="1140" cy="600" r="150" fill="${secondary}" fill-opacity="0.12" />
      <rect x="36" y="36" width="1128" height="648" rx="28" fill="#12100C" stroke="${accent}" stroke-opacity="0.5" />
      <rect x="72" y="84" width="1056" height="552" rx="24" fill="url(#panel)" stroke="${secondary}" stroke-opacity="0.25" />
      <text x="112" y="148" fill="${accent}" font-family="JetBrains Mono, monospace" font-size="24" letter-spacing="6">PROJECT SNAPSHOT</text>
      <text x="112" y="248" fill="#F0EBE3" font-family="DM Sans, Arial, sans-serif" font-size="58" font-weight="700">${title}</text>
      <text x="112" y="330" fill="#FFD166" font-family="JetBrains Mono, monospace" font-size="28" letter-spacing="2">${frameTitle}</text>
      <text x="112" y="388" fill="#CFC5B9" font-family="DM Sans, Arial, sans-serif" font-size="28">${caption}</text>
      <rect x="112" y="456" width="300" height="16" rx="8" fill="${accent}" fill-opacity="0.85" />
      <rect x="112" y="496" width="430" height="12" rx="6" fill="#F0EBE3" fill-opacity="0.18" />
      <rect x="112" y="526" width="360" height="12" rx="6" fill="#F0EBE3" fill-opacity="0.12" />
      <rect x="728" y="216" width="300" height="192" rx="26" fill="#0D0B08" stroke="${secondary}" stroke-opacity="0.35" />
      <rect x="768" y="258" width="220" height="24" rx="12" fill="${secondary}" fill-opacity="0.9" />
      <rect x="768" y="310" width="170" height="14" rx="7" fill="#F0EBE3" fill-opacity="0.18" />
      <rect x="768" y="338" width="200" height="14" rx="7" fill="#F0EBE3" fill-opacity="0.12" />
      <rect x="768" y="420" width="300" height="110" rx="22" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.3" />
      <rect x="804" y="454" width="96" height="16" rx="8" fill="${accent}" fill-opacity="0.75" />
      <rect x="804" y="486" width="180" height="12" rx="6" fill="#F0EBE3" fill-opacity="0.16" />
      <rect x="804" y="512" width="136" height="12" rx="6" fill="#F0EBE3" fill-opacity="0.1" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function withGallery(content: ProjectContent, repoUrl?: string): ProjectDetail {
  return {
    id: content.id,
    title: content.title,
    headline: content.headline,
    summary: content.summary,
    overview: content.overview,
    impact: content.impact,
    features: content.features,
    stack: content.stack,
    repoUrl: repoUrl || content.repoUrl || DEFAULT_REPO_URL,
    accent: content.accent,
    gallery: content.frames.map((frame, index) => ({
      src: buildProjectFrameImage(content.title, frame, content.accent, index),
      alt: `${content.title} - ${frame.title}`,
      title: frame.title,
      caption: frame.caption,
    })),
  };
}

function buildFallbackDetail(repo: ProjectReference): ProjectDetail {
  const title = humanizeRepoName(repo.name);
  const accent = repo.language ? LANGUAGE_ACCENTS[repo.language] || '#FF6B2B' : '#FF6B2B';
  const topics = repo.topics.filter(Boolean);
  const techList = [repo.language, ...topics].filter(Boolean).slice(0, 6) as string[];
  const frames: ProjectFrame[] = [
    {
      title: 'Overview',
      caption: 'Landing layer, product framing, and the main problem this repository tackles.',
    },
    {
      title: 'Feature Walkthrough',
      caption:
        topics.length > 0
          ? `Focus areas include ${topics.slice(0, 3).join(', ')}.`
          : 'Core capabilities and the primary user flow.',
    },
    {
      title: 'Engineering Snapshot',
      caption: `Built with ${repo.language || 'modern tooling'} and refreshed in ${new Date(repo.updated_at).getFullYear()}.`,
    },
  ];

  return {
    id: toLookupKey(repo.name),
    title,
    headline: `${title} is a hands-on build focused on solving a concrete product problem.`,
    summary:
      repo.description ||
      'A portfolio project with a local detail view and direct access to the repository.',
    overview:
      'This entry is generated from repository metadata so each project can still open in the detailed popup even when there is no hand-written case study yet.',
    impact:
      'The modal is ready for richer case-study content, screenshots, and exact links as the project library grows.',
    features: [
      'Local popup with structured project notes and visual gallery.',
      'Technology tags sourced from repository metadata.',
      'Direct GitHub CTA for anyone who wants to inspect the code.',
    ],
    stack: techList.length > 0 ? techList : ['Project', 'Case Study', 'GitHub'],
    repoUrl: repo.html_url || DEFAULT_REPO_URL,
    accent,
    gallery: frames.map((frame, index) => ({
      src: buildProjectFrameImage(title, frame, accent, index),
      alt: `${title} - ${frame.title}`,
      title: frame.title,
      caption: frame.caption,
    })),
  };
}

export function getProjectDetailByTitle(title: string) {
  const match = PROJECT_CONTENT.find((content) =>
    content.aliases.some((alias) => toLookupKey(alias) === toLookupKey(title))
  );

  return match ? withGallery(match) : null;
}

export function getProjectDetailFromRepo(repo: ProjectReference) {
  const match = PROJECT_CONTENT.find((content) =>
    content.aliases.some((alias) => toLookupKey(alias) === toLookupKey(repo.name))
  );

  return match ? withGallery(match, repo.html_url) : buildFallbackDetail(repo);
}
