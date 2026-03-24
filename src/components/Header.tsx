'use client';

import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[rgba(13,11,8,0.9)] backdrop-blur-xl border-b border-[rgba(255,107,43,0.1)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              background: 'rgba(255,107,43,0.15)',
              border: '1px solid rgba(255,107,43,0.4)',
            }}
          >
            <span className="font-mono text-sm font-black text-primary">D</span>
          </div>
          <span className="font-mono text-sm font-bold tracking-widest text-fg group-hover:text-primary transition-colors duration-200">
            Devarshi
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 group"
                style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-fg-muted)' }}
              >
                {item.label}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-4 right-4 h-[1px] transition-all duration-300"
                  style={{
                    background: 'var(--color-primary)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                  aria-hidden="true"
                />
                {/* Hover underline */}
                <span
                  className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-40 transition-all duration-300"
                  style={{ background: 'var(--color-primary)' }}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="https://github.com/denayee"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 btn-primary text-xs py-2.5 px-5"
          aria-label="View GitHub profile"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className="w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: 'var(--color-fg)',
              transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }}
          />
          <span
            className="w-6 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--color-fg)',
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
            }}
          />
          <span
            className="w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: 'var(--color-fg)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="px-6 py-5 flex flex-col gap-1 border-t"
          style={{ background: 'rgba(13,11,8,0.97)', borderColor: 'rgba(255,107,43,0.1)' }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-mono text-sm text-fg-muted hover:text-primary transition-colors text-left py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0"
            >
              <span className="text-primary opacity-50 mr-2">→</span>
              {item.label}
            </button>
          ))}
          <a
            href="https://github.com/denayee"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-3 text-center mt-3"
          >
            GitHub Profile
          </a>
        </nav>
      </div>
    </header>
  );
}
