import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import ScrollToTop from '../components/ScrollToTop';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Devarshi Nayee — AI/ML & Full Stack Developer',
  description: 'Computer engineering student building intelligent systems and modern web apps with React, Node.js, Python, and Machine Learning.',
  icons: {
    icon: [
      { url: '/assets/icon-icons.svg', type: 'image/svg+xml' }
    ],
  },
};

import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ScrollToTop />
          {children}

          <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdevarshipo9436back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
          <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
        </ThemeProvider>
      </body>
    </html>
  );
}