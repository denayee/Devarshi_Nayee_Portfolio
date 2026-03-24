// Server Component — composes all sections
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import CursorEffect from './components/CursorEffect';
import LoadingScreen from './components/LoadingScreen';
import ScrollRevealInit from './components/ScrollRevealInit';

export default function Homepage() {
  return (
    <>
      {/* Custom cursor (client) */}
      <CursorEffect />
      {/* Loading screen (client) */}
      <LoadingScreen />
      {/* Scroll reveal initializer (client) */}
      <ScrollRevealInit />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed navigation */}
      <Header />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
