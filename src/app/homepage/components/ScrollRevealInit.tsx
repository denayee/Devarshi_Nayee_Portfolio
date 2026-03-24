'use client';

import { useEffect } from 'react';

// Initializes Intersection Observer for scroll reveal animations
export default function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger delay based on element index within parent
            const siblings = Array.from(entry.target.parentElement?.children ?? []);
            const idx = siblings.indexOf(entry.target as Element);
            const delay = idx * 80;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe all reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal-hidden, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
      });
    };

    // Initial pass + re-check after content loads
    observe();
    const timer = setTimeout(observe, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return null;
}