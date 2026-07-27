import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profileData } from '../content/profile';

export default function Navbar({ onOpenCommandPalette, onOpenPlayZone, onOpenAISearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['workspace', 'about', 'journey', 'projects', 'skills', 'experience', 'contact'];
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 40);
      setIsScrollingDown(currentY > lastY && currentY > 100);
      lastY = currentY;

      const viewportHeight = window.innerHeight;
      const scrollPosition = currentY + viewportHeight * 0.35;

      let currentSection = sections[0];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 100) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'workspace', label: 'Workspace' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'playzone', label: '🎮 Play Zone', isModal: true },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const el = document.getElementById(targetId);
    if (!el) return;

    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300">
      <div
        className={`w-full max-w-6xl rounded-full border transition-all duration-300 backdrop-blur-2xl shadow-xl transform-gpu ${
          isScrollingDown
            ? 'py-1.5 px-3 scale-[0.98] bg-[#0B1020]/95 border-white/20 shadow-2xl'
            : isScrolled
            ? 'py-2 px-4 sm:px-6 bg-[#10182C]/90 border-white/20 shadow-2xl scale-100'
            : 'py-2.5 px-4 sm:px-6 bg-[#0B1020]/80 border-white/15 shadow-lg scale-100'
        } flex items-center justify-between`}
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-2 font-mono group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            S
          </div>
          <span className="font-extrabold text-sm text-white tracking-tight group-hover:text-sky-400 transition-colors">
            {profileData.osName} <span className="text-xs text-sky-400 font-mono font-normal">{profileData.osVersion}</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 font-mono text-xs text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            if (link.isModal) {
              return (
                <button
                  key={link.id}
                  onClick={onOpenPlayZone}
                  className="px-3 py-1.5 rounded-full text-sky-300 hover:text-white font-bold transition-all bg-sky-500/10 border border-sky-400/30 hover:bg-sky-500/20 cursor-pointer"
                >
                  {link.label}
                </button>
              );
            }

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-3 py-1.5 rounded-full transition-all relative ${
                  isActive ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-white/20 border border-white/30 -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2">
          {/* AI Search Dedicated Button */}
          <button
            onClick={onOpenAISearch}
            className="p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-emerald-500/20 border border-sky-400/40 hover:border-sky-400 text-sky-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-[1.03] cursor-pointer"
            title="AI Search"
            aria-label="Open AI Search"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">AI Search</span>
          </button>

          {/* Resume CTA Button */}
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-slate-200 transition-all items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/10 text-slate-200 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-3 right-3 p-6 rounded-3xl bg-[#10182C]/95 border border-white/20 text-center space-y-4 font-mono text-sm shadow-2xl backdrop-blur-2xl lg:hidden z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <span className="text-xs text-sky-400 font-bold tracking-widest uppercase">
                {profileData.osName} Navigation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left pt-1">
              {/* AI Search inside Mobile Hamburger Menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAISearch();
                }}
                className="col-span-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/25 to-purple-500/25 border border-sky-400/50 text-sky-300 hover:text-white transition-all font-bold text-xs flex items-center justify-between cursor-pointer shadow-md"
              >
                <span className="flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-sky-400" />
                  <span>AI Search</span>
                </span>
                <span className="text-[10px] text-sky-400">Open Workspace →</span>
              </button>

              {navLinks.map((link, idx) => {
                if (link.isModal) {
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenPlayZone();
                      }}
                      className="col-span-2 px-3.5 py-2.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 hover:text-white transition-all font-bold text-xs flex items-center justify-between cursor-pointer"
                    >
                      <span>🎮 Play Zone</span>
                      <span className="text-[10px] text-sky-400">Launch App →</span>
                    </button>
                  );
                }

                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-all font-medium text-xs flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-slate-400">→</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-around text-xs">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-200 hover:text-white"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-200 hover:text-white"
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
