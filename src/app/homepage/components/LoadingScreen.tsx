'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(25), 100),
      setTimeout(() => setProgress(55), 350),
      setTimeout(() => setProgress(80), 650),
      setTimeout(() => setProgress(100), 950),
      setTimeout(() => setFadeOut(true), 1200),
      setTimeout(() => setVisible(false), 1600),
    ];
    return () => intervals?.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg overflow-hidden"
      style={{
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: fadeOut ? 0 : 1,
      }}
      aria-hidden="true"
    >
      {/* Background warm orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,43,0.08), transparent 70%)',
          animation: 'pulseWarm 2s ease-in-out infinite',
        }}
      />

      {/* Logo mark */}
      <div className="mb-10 relative">
        <div
          className="w-20 h-20 flex items-center justify-center relative"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            border: '2px solid rgba(255,107,43,0.4)',
            background: 'rgba(255,107,43,0.06)',
          }}
        >
          <span
            className="font-mono text-3xl font-black text-primary"
            style={{ textShadow: '0 0 20px rgba(255,107,43,0.8)' }}
          >
            D
          </span>
        </div>
        {/* Orbiting dot */}
        <div
          className="absolute w-2 h-2 rounded-full bg-accent"
          style={{
            top: '50%',
            left: '50%',
            marginTop: '-4px',
            marginLeft: '-4px',
            animation: 'rotateOrbit 2s linear infinite',
            transformOrigin: '4px 4px',
          }}
        />
      </div>

      {/* Name */}
      <p
        className="font-mono text-xs tracking-[0.4em] text-fg-muted uppercase mb-8"
        style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
      >
        Devarshi
      </p>

      {/* Progress bar */}
      <div className="w-56 h-[2px] bg-[rgba(255,255,255,0.05)] overflow-hidden rounded-full">
        <div
          className="loader-bar h-full rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </div>

      {/* Progress number */}
      <p className="font-mono text-xs text-fg-muted mt-3 tracking-widest">
        {progress}%
      </p>
    </div>
  );
}
