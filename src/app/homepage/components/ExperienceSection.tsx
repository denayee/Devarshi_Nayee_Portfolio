import React, { type CSSProperties } from 'react';

interface ExperienceCard {
  category: 'Education' | 'Internship' | 'Freelance Demo';
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  num: string;
}

const EXPERIENCE_CARDS: ExperienceCard[] = [
    {
    category: 'Freelance Demo',
    period: 'Present - 2026',
    title: 'Freelance Full Stack Developer & AI/ML Enthusiast',
    org: '🤖',
    description:
      'Delivered a business website concept with contact flows, service pages, admin-friendly content structure, and deployment-ready frontend architecture. Implemented a responsive design, intuitive navigation, and a contact form to enhance user engagement and lead generation for the client.',
    tags: ['Next.js', 'Tailwind CSS', 'React', 'Python', 'Flask' , 'AI/ML' , 'Node.js', 'Client Demo', 'Deployment'],
    color: '#A78BFA',
    icon: '💻',
    num: '01',
  },
  {
    category: 'Education',
    period: '2022 to 2026 - Present',
    title: 'B.E. Computer Engineering',
    org: 'Gujarat Technological University, Ahmedabad',
    description:
      'Building a strong base in software engineering, AI/ML, databases, operating systems, and modern web development while leading academic project work.',
    tags: ['CGPA 8.81/10', 'AI/ML Focus', 'Project Lead', 'Web Dev', 'Databases', 'OS Concepts', 'Leadership', 'Teamwork'],
    color: '#FF6B2B',
    icon: '🎓',
    num: '02',
  },
   {
    category: 'Internship',
    period: 'Winter 2026',
    title: 'AI/ML Intern',
    org: 'Akantik Solutions LLP., Bhavnagar',
    description:
      'Supported model evaluation, dataset cleanup, and lightweight ML feature integration for internal tools while documenting experiments and results.In AyuraAI project, contributed to data preprocessing, model testing, and performance analysis to enhance the AI assistant’s capabilities in skin and hair diseases.',
    tags: ['AI/ML', 'Flask','Python', 'Pandas', 'Model Testing', 'Data Prep', 'Documentation', 'Teamwork', 'Client Demo', ],
    color: '#06D6A0',
    icon: '🤖',
    num: '03',
  },
  {
    category: 'Internship',
    period: 'Summer 2025',
    title: 'Backend Developer Intern',
    org: 'Challange Rate LLP., Surat',
    description:
      'Built responsive web pages using HTML, CSS, JavaScript( node.js ) , and collaborated on real-world team project. Gained experience with REST APIs, version control, and UI polish while contributing to a client-facing project.I built DishDelight web app for recipie sharing and discovery, implementing user authentication, recipe CRUD operations, and a responsive design to enhance user engagement and experience.',
    tags: ['Node.js', 'CSS', 'REST APIs', 'UI Polish', 'Teamwork', 'Client Demo'],
    color: '#FFD166',
    icon: '⚙️',
    num: '04',
  },
 

];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-32 relative overflow-hidden"
      aria-label="Experience and Education"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #A78BFA, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-[-100px] w-[500px] h-[500px] opacity-[0.04] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, #A78BFA, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal-hidden">
          <span className="section-tag mb-5 block">Experience</span>
          <h2
            className="font-black text-fg"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
            }}
          >
            Learning, <span className="text-gradient-warm">understanding</span>, and building
          </h2>
          <p className="text-fg-muted mt-3 max-w-2xl text-sm">
            A simple snapshot with one education card, two internship demo cards, and one freelance
            demo card.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {EXPERIENCE_CARDS.map((item, index) => {
            const cardStyle = {
              '--experience-accent': item.color,
              '--experience-accent-soft': `${item.color}1A`,
              '--experience-accent-border': `${item.color}26`,
              '--experience-accent-hover': `${item.color}66`,
              '--experience-accent-glow': `${item.color}20`,
              transitionDelay: `${index * 70}ms`,
            } as CSSProperties;

            return (
              <article
                key={item.num}
                className="experience-card reveal-hidden glass rounded-sm p-7 min-h-[320px] relative overflow-hidden"
                style={cardStyle}
                aria-label={`${item.category}: ${item.title}`}
              >
                <div className="experience-card-glow" aria-hidden="true" />
                <div
                  className="experience-card-watermark absolute top-4 right-5 font-mono font-black select-none pointer-events-none"
                  style={{ fontSize: '4rem', color: `${item.color}10`, lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {item.num}
                </div>

                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between mb-5">
                  <span
                    className="experience-card-icon w-10 h-10 flex items-center justify-center rounded-sm text-xs font-mono tracking-[0.22em]"
                    style={{ background: `${item.color}15`, color: item.color }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span
                    className="font-mono text-xs px-3 py-1.5 rounded-sm"
                    style={{
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}28`,
                      color: item.color,
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4 text-fg-muted">
                  {item.category}
                </p>
                <h3 className="experience-card-title font-sans font-bold text-fg text-base mb-1 leading-tight">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-fg-muted mb-4">{item.org}</p>

                <p className="text-fg-muted text-sm leading-relaxed mb-5">{item.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
