import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Layers, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background page scrolling when modal is active
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto text-left">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            data-lenis-prevent
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#111111] border border-zinc-800 rounded-3xl shadow-2xl overflow-y-auto z-10 text-zinc-200 scrollbar-thin"
          >
            {/* Modal Header Banner */}
            <div className="relative p-8 bg-[#161616] border-b border-zinc-800 overflow-hidden">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white border border-zinc-700 transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold px-3 py-1 rounded-full bg-zinc-800">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {project.status}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-zinc-400 text-base font-medium font-mono">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Tech Stack Chips */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  Tech Stack & Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-zinc-800/80 text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-zinc-400" /> Executive Overview
                </h4>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Challenge & Approach */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-semibold">
                    <ShieldAlert className="w-4 h-4 text-rose-400" /> Engineering Challenge
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-semibold">
                    <Cpu className="w-4 h-4 text-zinc-300" /> Technical Approach
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* System Architecture Breakdown */}
              {project.architecture && (
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 font-mono">
                    <Layers className="w-4 h-4 text-zinc-400" /> Core Architecture Modules
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm text-zinc-300">
                    {project.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Results & Lessons */}
              {project.results && (
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Measurable Impact & Results
                  </h4>
                  <div className="space-y-2">
                    {project.results.map((res, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs md:text-sm text-zinc-200">
                        ✓ {res}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons Learned */}
              {project.lessonsLearned && (
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Senior Engineering Takeaway
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-300 italic">
                    "{project.lessonsLearned}"
                  </p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium text-sm hover:bg-zinc-700 transition-all flex items-center gap-2"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                >
                  Press ESC to close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
