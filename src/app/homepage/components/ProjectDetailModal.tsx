'use client';

import React, { useEffect, useState } from 'react';

import AppImage from '@/components/ui/AppImage';

import type { ProjectDetail } from '../data/projectDetails';

interface ProjectDetailModalProps {
  project: ProjectDetail;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const activeImage = project.gallery[activeImageIndex] || project.gallery[0];

  return (
    <div
      className="fixed inset-0 z-[80] bg-[rgba(7,5,3,0.82)] backdrop-blur-md p-4 md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-title`}
        className="relative mx-auto flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(18,14,10,0.98)] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(10,8,6,0.78)] text-fg-muted transition-colors duration-200 hover:border-primary hover:text-primary"
          aria-label="Close project details"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid max-h-[92vh] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-[rgba(255,255,255,0.06)] p-5 md:p-8 lg:border-b-0 lg:border-r">
            <div className="group/gallery relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <div className="aspect-[16/10]">
                <AppImage
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(10,8,6,0.6)] text-fg opacity-0 backdrop-blur-md transition-all hover:bg-[rgba(255,255,255,0.1)] group-hover/gallery:opacity-100"
                    aria-label="Previous image"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(10,8,6,0.6)] text-fg opacity-0 backdrop-blur-md transition-all hover:bg-[rgba(255,255,255,0.1)] group-hover/gallery:opacity-100"
                    aria-label="Next image"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {project.gallery.map((image, index) => {
                const isActive = index === activeImageIndex;

                return (
                  <button
                    key={`${project.id}-img-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-[18px] border transition-all duration-200 ${
                      isActive
                        ? 'border-primary shadow-[0_0_0_1px_rgba(255,107,43,0.18)]'
                        : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,107,43,0.28)]'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Show ${image.title}`}
                  >
                    <div className="aspect-[4/3]">
                      <AppImage
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="max-h-[92vh] overflow-y-auto p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              Project Detail
            </p>
            <h3
              id={`${project.id}-title`}
              className="mt-4 text-3xl font-black leading-tight text-fg md:text-4xl"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-fg">{project.headline}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <span key={tool} className="tech-tag">
                  {tool}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  Overview
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.overview}</p>
              </div>

              <div className="rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  Why it matters
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.impact}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                Key highlights
              </p>
              <div className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-[18px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-4 py-3"
                  >
                    <span
                      className="mt-1 block h-2.5 w-2.5 rounded-full"
                      style={{ background: project.accent }}
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-relaxed text-fg-muted">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 text-sm transition-all duration-200"
                aria-label={`Open ${project.title} GitHub repository`}
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
                Open Git Repo
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-3 text-sm transition-all duration-200"
                  aria-label={`Visit ${project.title} live site`}
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-fg)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Visit Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
