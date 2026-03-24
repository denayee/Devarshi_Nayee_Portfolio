'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
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
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[95%] max-w-6xl transition-all duration-500">
      <div
        className={`transition-all duration-500 overflow-hidden ${
          menuOpen
            ? 'rounded-3xl backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : scrolled
            ? 'rounded-full backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'rounded-full backdrop-blur-md border border-border shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
        }`}
        style={{
          backgroundColor: menuOpen
            ? 'var(--header-bg-open)'
            : scrolled
            ? 'var(--header-bg-closed)'
            : 'var(--header-bg-unscrolled)',
        }}
      >
        <div
          className={`flex items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? 'py-2.5' : 'py-3.5'
          }`}
        >
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
              Devarshi Nayee
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-3 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 group rounded-full hover:bg-surface"
                  style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-fg-muted)' }}
                >
                  {item.label}
                  {/* Hover underline replacing the border hack */}
                  <span
                    className="absolute bottom-1.5 left-3 right-3 h-[1px] opacity-0 group-hover:opacity-40 transition-all duration-300"
                    style={{ background: 'var(--color-primary)' }}
                    aria-hidden="true"
                  />
                  {isActive && (
                    <span
                      className="absolute bottom-1.5 left-3 right-3 h-[1px] transition-all duration-300"
                      style={{ background: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full border border-border bg-surface hover:bg-surface-hover transition-all justify-center items-center"
              style={{ width: '38px', height: '38px', borderColor: 'var(--color-border)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                // Sun icon for Dark Mode (click to switch to light)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                // Moon icon for Light Mode (click to switch to dark)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* CTA */}
            <a
              href="https://github.com/denayee"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 btn-primary text-[10px] sm:text-xs py-1.5 px-3 sm:py-2.5 sm:px-5 !rounded-full !clip-path-none"
              style={{ clipPath: 'none', borderRadius: '9999px' }}
              aria-label="View GitHub profile"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="hidden sm:block">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 flex flex-col justify-center items-center gap-[6px] z-50 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-6 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--color-fg)',
                  transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-6 h-[2px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-fg)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--color-fg)',
                  transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-400 overflow-hidden ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav
            className="px-6 py-4 flex flex-col gap-1 border-t border-border bg-transparent"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-mono text-sm text-fg-muted hover:text-primary transition-colors text-left py-3 border-b border-border last:border-0"
              >
                <span className="text-primary opacity-50 mr-2">→</span>
                {item.label}
              </button>
            ))}
            
            {/* Mobile Actions (Theme & GitHub) */}
            <div className="flex items-center justify-between pt-5 mt-2 border-t border-border">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 font-mono text-sm text-fg hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                <div className="p-2 rounded-full border border-border bg-surface flex justify-center items-center" style={{ width: '38px', height: '38px' }}>
                  {theme === 'dark' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </div>
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <a
                href="https://github.com/denayee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 btn-primary text-xs py-2 px-5 !rounded-full !clip-path-none"
                style={{ clipPath: 'none', borderRadius: '9999px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
