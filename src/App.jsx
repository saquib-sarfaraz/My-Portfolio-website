import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AuroraBackground from './components/AuroraBackground';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CurrentInternshipSpotlight from './components/CurrentInternshipSpotlight';

import Hero from './sections/Hero';
import WorkspaceSection from './sections/WorkspaceSection';
import AboutMe from './sections/AboutMe';
import EngineeringJourney from './sections/EngineeringJourney';
import ArchitectureSection from './sections/ArchitectureSection';
import CurrentlyBuilding from './sections/CurrentlyBuilding';
import Skills from './sections/Skills';
import SelectedImpact from './sections/SelectedImpact';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import SocialProof from './sections/SocialProof';
import GameZone from './sections/GameZone';
import Contact from './sections/Contact';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis weighted smooth scroll inertia
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen selection:bg-sky-500 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-700">
        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Background Mesh */}
        <AuroraBackground />

        {/* Preloader */}
        <Preloader />

        {/* Custom Spring Cursor */}
        <CustomCursor />

        {/* Command Palette (⌘K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />

        {/* Navbar */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Main OS Viewport */}
        <main>
          <Hero />
          <WorkspaceSection />
          <AboutMe />
          <EngineeringJourney />
          <Projects />
          <ArchitectureSection />
          <CurrentlyBuilding />
          <Skills />
          <Experience />
          <SelectedImpact />
          <SocialProof />
          <GameZone />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
