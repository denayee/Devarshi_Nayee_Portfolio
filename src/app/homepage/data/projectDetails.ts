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
  liveUrl?: string;
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
  liveUrl?: string;
  accent: string;
  frames?: ProjectFrame[];
  images?: { src: string; alt?: string; title: string; caption: string }[];
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

const PROJECT_CONTENT: ProjectContent[] = [
  
  // 💡 TEMPLATE: Uncomment and copy this block for each GitHub repository you want to customize.
  // The 'aliases' array must include the exact name of your GitHub repository.
  {
  id: 'stackit_qa_platform',
  aliases: ['StackIt-A-Minimal-Q-A-Forum-Platform-dev '],
  title: 'StackIt – Minimal Q&A Forum Platform',
  headline: 'A lightweight developer-focused Q&A platform inspired by Stack Overflow.',
  summary: 'A full-stack discussion platform where users can ask questions, post answers, and engage in knowledge sharing.',
  overview: 'StackIt is designed to replicate a simplified Q&A ecosystem. It enables users to create posts, respond to queries, and build a collaborative knowledge-sharing community.',
  impact: 'Helps developers learn, share knowledge, and build communities similar to Stack Overflow in a simplified way.',
  features: [
    'Ask and answer questions',
    'User authentication system',
    'Clean and minimal UI',
    'Thread-based discussions'
  ],
  stack: ['React', 'Node.js', 'MongoDB'],
  accent: '#FF6B6B',
  images: [
    {
      src: 'public/assets/images/StackIt.png',
      title: 'Q&A Interface',
      caption: 'Main discussion and question listing UI'
    }
  ]
},
{
  id: 'devarshi_portfolio',
  aliases: ['Devarshi_Nayee_Portfolio '],
  title: 'Developer Portfolio Website',
  headline: 'Modern interactive portfolio showcasing projects and skills.',
  summary: 'A personal portfolio website to highlight projects, skills, and achievements with a modern UI design.',
  overview: 'Built to create a strong online presence, this portfolio includes project showcases, smooth animations, and responsive layouts.',
  impact: 'Helps attract recruiters and freelance clients by presenting work professionally.',
  features: [
    'Project showcase section',
    'Responsive design',
    'Smooth animations',
    'Contact integration'
  ],
  stack: ['React', 'Tailwind CSS', 'JavaScript'],
  accent: '#FFD166',
  images: [
    {
      src: '/assets/images/portfolio.png',
      title: 'Homepage',
      caption: 'Landing page of the portfolio'
    }
  ]
},
{
  id: 'ez_appointify',
  aliases: ['EZ-appointify'], 
  title: 'EZ Appointify – Appointment Booking System',
  headline: 'Smart appointment scheduling platform for seamless bookings.',
  summary: 'A web-based system allowing users to book, manage, and track appointments easily.',
  overview: 'Designed for businesses and professionals, this platform streamlines scheduling with user-friendly booking and management features.',
  impact: 'Reduces manual scheduling effort and improves appointment management efficiency.',
  features: [
    'Online appointment booking',
    'Admin dashboard',
    'Time slot management',
    'User notifications'
  ],
  stack: ['React', 'Node.js', 'MongoDB'],
  accent: '#06D6A0',
  images: [
    {
      src: '/assets/images/EZ-APPIONTIFY VIDEO 1.png',
      alt: 'EZ Appointify',
      title: 'Booking System4',
      caption: 'Appointment scheduling interface'
    },
    {
      src: '/assets/images/EZ-APPIONTIFY VIDEO 2.png',
      alt: 'EZ Appointify2',
      title: 'Booking System3',
      caption: 'Appointment scheduling interface'
    },
    {
      src: '/assets/images/EZ-APPIONTIFY VIDEO 3.png',
      alt: 'EZ Appointify3',
      title: 'Booking System2',
      caption: 'Appointment scheduling interface'
    },
    {
      src: '/assets/images/EZ-APPIONTIFY VIDEO 4.png',
      alt: 'EZ Appointify4',
      title: 'Booking System1',
      caption: 'Appointment scheduling interface'
    },
    {
      src: '/assets/images/EZ-APPIONTIFY VIDEO 5.png',
      alt: 'EZ Appointify5',
      title: 'Booking System1',
      caption: 'Appointment scheduling interface'
    },
    {
      src: '/assets/images/EZ-APPIONTIFY VIDEO 6.png',
      alt: 'EZ Appointify6',
      title: 'Booking System1',
      caption: 'Appointment scheduling interface'
    },
  ]
},
{
  id: 'ayura_ai',
  aliases: ['ayuraAI'],
 title: 'AyuraAI – Personalized Beauty Recommendation System',
  headline: 'AI-powered platform that recommends beauty products based on skin and hair type.',
  summary: 'AyuraAI is a smart recommendation system that suggests personalized skincare and haircare products using user-specific inputs.',
  overview: 'This project focuses on delivering customized beauty solutions by analyzing user inputs such as skin type, hair condition, and concerns. Based on this data, the system intelligently recommends suitable products to enhance user experience and effectiveness.',
  impact: 'Helps users choose the right beauty products without confusion, saving time and improving skincare and haircare results through personalization.',
  features: [
    'Personalized product recommendations',
    'Skin type and hair type analysis',
    'User-friendly input system',
    'Smart suggestion engine'
  ],
  stack: ['Python', 'Machine Learning', 'Flask'],
  liveUrl: 'https://ayuraai.onrender.com', // <-- REPLACE THIS WITH YOUR REAL LINK
  accent: '#FFAFCC',
  images: [
    {
      src: '/assets/images/AyuraAI _ 1.png',
      title: 'Recommendation Interface1',
      caption: 'Personalized beauty product suggestions based on user input'
    },
    {
      src: '/assets/images/AyuraAI _ 2.png',
      title: 'Recommendation Interface2',
      caption: 'Personalized beauty product suggestions based on user input'
    },
    {
      src: '/assets/images/AyuraAI _ 3.png',
      title: 'Recommendation Interface3',
      caption: 'Personalized beauty product suggestions based on user input'
    },
    {
      src: '/assets/images/AyuraAI _4.png',
      title: 'Recommendation Interface4',
      caption: 'Personalized beauty product suggestions based on user input'
    },
    {
      src: '/assets/images/AyuraAI _ 5.png',
      title: 'Recommendation Interface5',
      caption: 'Personalized beauty product suggestions based on user input'
    },
    {
      src: '/assets/images/AyuraAI _ 6.png',
      title: 'Recommendation Interface6',
      caption: 'Personalized beauty product suggestions based on user input'
    },
  ]
},
{
  id: 'recipe_platform',
  aliases: ['Recipe-Sharing-web-devlopment-platform'],
  title: 'Recipe Sharing Web Platform',
  headline: 'A community-driven platform to share and discover recipes.',
  summary: 'A web application where users can upload, explore, and manage recipes.',
  overview: 'This platform allows food lovers to share their recipes and discover new dishes from others.',
  impact: 'Encourages community interaction and knowledge sharing in cooking.',
  features: [
    'Upload recipes',
    'Browse recipes',
    'User-friendly interface',
    'Search functionality'
  ],
  stack: ['React', 'Node.js', 'MongoDB'],
  accent: '#F4A261',
  images: [
    {
      src: '/assets/images/RecipeShare_1.png',
      title: 'Recipe Feed1',
      caption: 'List of recipes shared by users'
    },
    { 
      src: '/assets/images/RecipeShare_2.png',
      title: 'Recipe Feed2',
      caption: 'List of recipes shared by users'  
    },
    { 
      src: '/assets/images/RecipeShare_3.png',
      title: 'Recipe Feed3',
      caption: 'List of recipes shared by users'  
    }
  ]
},
{
  id: 'society_management',
  aliases: ['Society-Management-System'],
  title: 'Society Management System',
  headline: 'Digital solution for managing residential societies.',
  summary: 'A system designed to manage residents, payments, and society operations efficiently.',
  overview: 'This platform simplifies administrative tasks such as resident records, maintenance tracking, and communication.',
  impact: 'Improves efficiency and transparency in society management.',
  features: [
    'Resident management',
    'Maintenance tracking',
    'Admin controls',
    'Record keeping'
  ],
  stack: ['PHP', 'MySQL', 'JavaScript'],
  accent: '#8D99AE',
  images: [
    {
      src: '/assets/images/sociaty_1.jpg',
      title: 'Dashboard1',
      caption: 'Admin dashboard for management'
    },
    {
      src: '/assets/images/sociaty_2.jpg',
      title: 'Dashboard2',
      caption: 'Admin dashboard for management'
    },
    {
      src: '/assets/images/sociaty_3.jpg',
      title: 'Dashboard3',
      caption: 'Admin dashboard for management'
    }
  ]
},
{
  id: 'expense_tracker',
  aliases: ['php-expense-tracker'],
  title: 'Expense Tracker System',
  headline: 'Simple and effective personal finance tracking application.',
  summary: 'A PHP-based system to track daily expenses and manage personal finances.',
  overview: 'Users can record expenses, categorize spending, and monitor financial habits.',
  impact: 'Helps users manage money efficiently and track spending patterns.Also download monthly report in pdf.',
  features: [
    'Add and track expenses',
    'Category-wise tracking',
    'Simple dashboard',
    'Data storage with MySQL',
    'Download monthly report in pdf'
  ],
  stack: ['PHP', 'MySQL', 'HTML', 'CSS'],
  accent: '#2A9D8F',
  images: [
    {
      src: '/assets/images/bugget_buddy_1.png',
      title: 'Expense Dashboard1',
      caption: 'Overview of expenses and categories'
    },
    {
      src: '/assets/images/bugget_buddy_2.png',
      title: 'Expense Dashboard2',
      caption: 'Overview of expenses and categories'
    },
    {
      src: '/assets/images/bugget_buddy_3.png',
      title: 'Expense Dashboard3',
      caption: 'Overview of expenses and categories'
    }
  ]
},
{
  id: 'gan_story_converter',
  aliases: ['gan-ai-story-converter'],
  title: 'GAN AI Story Converter',
  headline: 'AI-powered system to convert input text into creative story formats with audio output.',
  summary: 'A generative AI-based application that transforms text into creative stories with audio output. also download story audio.',
  overview: 'Uses AI techniques like GAN or NLP models to generate engaging narratives from user input.',
  impact: 'Demonstrates advanced AI creativity and content generation capabilities with audio output.',
  features: [
    'AI-generated storytelling',
    'User input processing',
    'Creative output generation',
    'Interactive UI',
    'Audio output',
    'Download story audio'
  ],
  stack: ['Python', 'Machine Learning', 'NLP'],
  accent: '#9B5DE5',
  liveUrl : 'https://gan-ai-story-converter-production-0665.up.railway.app/',
  images: [
    {
      src: '/assets/images/gan ai story converter_1.png', 
      title: 'Story Output',
      caption: 'AI-generated story interface'
    }
  ]
}
  
];

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
  const gallery = content.images && content.images.length > 0
    ? content.images.map(img => ({
        src: img.src,
        alt: img.alt || `${content.title} - ${img.title}`,
        title: img.title,
        caption: img.caption,
      }))
    : (content.frames || []).map((frame, index) => ({
        src: buildProjectFrameImage(content.title, frame, content.accent, index),
        alt: `${content.title} - ${frame.title}`,
        title: frame.title,
        caption: frame.caption,
      }));

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
    liveUrl: content.liveUrl,
    accent: content.accent,
    gallery,
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
