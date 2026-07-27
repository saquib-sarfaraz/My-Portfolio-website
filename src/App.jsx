import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AuroraBackground from './components/AuroraBackground';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import PlayZoneModal from './components/PlayZoneModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AIPage from './ai/pages/AIPage';

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
import Contact from './sections/Contact';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPlayZoneOpen, setIsPlayZoneOpen] = useState(false);
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);

  // Sync /ai route with state cleanly without hash tags
  useEffect(() => {
    const handlePopState = () => {
      setIsAISearchOpen(window.location.pathname === '/ai');
    };

    if (window.location.pathname === '/ai') {
      setIsAISearchOpen(true);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openAISearch = () => {
    setIsAISearchOpen(true);
    window.history.pushState({ page: 'ai' }, '✨ AI Search — Saquib OS', '/ai');
  };

  const closeAISearch = () => {
    setIsAISearchOpen(false);
    if (window.location.pathname === '/ai') {
      window.history.pushState({ page: 'home' }, 'Saquib OS', '/');
    }
  };

  // Live OS Action Controller (triggered by AI Search recommendations)
  const handleOSAction = (action) => {
    if (!action) return;

    if (action.type === 'scroll' && action.target) {
      closeAISearch();
      setTimeout(() => {
        const el = document.getElementById(action.target);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else if (action.type === 'playzone') {
      closeAISearch();
      setTimeout(() => {
        setIsPlayZoneOpen(true);
      }, 150);
    } else if (action.type === 'project') {
      closeAISearch();
      setTimeout(() => {
        const projectsEl = document.getElementById('projects');
        if (projectsEl) {
          if (window.lenis) {
            window.lenis.scrollTo(projectsEl, { offset: -60, duration: 1.2 });
          } else {
            projectsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else if (action.type === 'resume') {
      window.open(action.url || '/saquib-cv.pdf', '_blank');
    } else if (action.type === 'live' || action.type === 'github' || action.type === 'external') {
      if (action.url) {
        window.open(action.url, '_blank');
      }
    }
  };

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis weighted smooth scroll inertia optimized for mobile & desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      if (window.lenis === lenis) {
        window.lenis = null;
      }
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen selection:bg-sky-500 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-700">
        {/* Full-Screen AI Search Workspace View (/ai) */}
        {isAISearchOpen && (
          <AIPage
            onClose={closeAISearch}
            onTriggerOSAction={handleOSAction}
          />
        )}

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
          onOpenAISearch={openAISearch}
        />

        {/* Play Zone Application Window */}
        <PlayZoneModal
          isOpen={isPlayZoneOpen}
          onClose={() => setIsPlayZoneOpen(false)}
        />

        {/* Navbar */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenPlayZone={() => setIsPlayZoneOpen(true)}
          onOpenAISearch={openAISearch}
        />

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
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
