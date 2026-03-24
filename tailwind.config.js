/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-card': 'var(--color-bg-card)',
        primary: 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        accent: 'var(--color-accent)',
        'accent-dim': 'var(--color-accent-dim)',
        teal: 'var(--color-teal)',
        'teal-dim': 'var(--color-teal-dim)',
        fg: 'var(--color-fg)',
        'fg-muted': 'var(--color-fg-muted)',
        border: 'var(--color-border)',
        'border-warm': 'var(--color-border-warm)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.8rem, 6vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FF6B2B 0%, #FFD166 50%, #06D6A0 100%)',
        'gradient-fire': 'linear-gradient(90deg, #FF6B2B 0%, #FF3D00 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD166 0%, #FF6B2B 100%)',
      },
      animation: {
        'float': 'float 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
        'pulse-warm': 'pulseWarm 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 20s linear infinite',
        'marquee2': 'marquee2 20s linear infinite',
        'wiggle': 'wiggle 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw-line': 'drawLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'count-up': 'countUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
};
