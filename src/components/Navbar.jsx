import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profileData } from '../content/profile';

export default function Navbar({ onOpenCommandPalette }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'journey', 'architecture', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Workspace' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Products' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300">
      <div
        className={`w-full max-w-6xl rounded-full border transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between backdrop-blur-2xl shadow-xl ${
          isScrolled
            ? 'bg-[#10182C]/90 border-white/20 shadow-2xl py-2'
            : 'bg-[#0B1020]/80 border-white/15 shadow-lg'
        }`}
      >
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 font-mono group">
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
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
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
          {/* ⌘K Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-mono transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          {/* Resume CTA Button */}
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
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
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-all font-medium text-xs flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-slate-400">→</span>
                </motion.a>
              ))}
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
