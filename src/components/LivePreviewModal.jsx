import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function LivePreviewModal({ project, isOpen, onClose }) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeFailed, setIframeFailed] = useState(false);

  useEffect(() => {
    if (!isOpen || !project) return;

    setIframeLoading(true);
    setIframeFailed(false);

    document.body.style.overflow = 'hidden';
    window.lenis?.stop();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Safety timeout: if iframe fails or is blocked by CSP / X-Frame-Options, switch to rich fallback preview
    const timer = setTimeout(() => {
      if (!project.demoUrl) {
        setIframeFailed(true);
        setIframeLoading(false);
      }
    }, 4000);

    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, project, onClose]);

  if (!project) return null;

  const urlDisplay = project.demoUrl || `https://github.com/saquib-sarfaraz/${project.id}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden text-left">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Browser Mockup Glass Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            data-lenis-prevent
            className="relative w-full max-w-5xl h-[88vh] bg-[#0c101d] border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col z-10 backdrop-blur-2xl"
          >
            {/* macOS / Chrome Window Chrome Header */}
            <div className="px-5 py-3 bg.11172a border-b border-white/15 flex items-center justify-between gap-4 shrink-0 font-mono text-xs select-none bg-[#11172b]">
              {/* Traffic Lights & Title */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer"
                  title="Close Preview"
                />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                <span className="ml-2 font-bold text-white text-xs truncate max-w-[160px] sm:max-w-[260px]">
                  {project.title}
                </span>
              </div>

              {/* Fake URL Address Bar */}
              <div className="flex-1 max-w-xl hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-white/10 text-slate-300 text-[11px] truncate shadow-inner">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate text-slate-200">{urlDisplay}</span>
              </div>

              {/* Close Icon Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Browser Content Area */}
            <div className="relative flex-1 bg-[#050814] overflow-hidden flex flex-col">
              {/* Loading Skeleton */}
              {iframeLoading && !iframeFailed && (
                <div className="absolute inset-0 bg-[#070b19] flex flex-col items-center justify-center space-y-4 z-20">
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    Loading live website preview...
                  </div>
                </div>
              )}

              {/* Live iFrame OR Fallback View */}
              {project.demoUrl && !iframeFailed ? (
                <iframe
                  src={project.demoUrl}
                  title={`${project.title} Live Preview`}
                  onLoad={() => setIframeLoading(false)}
                  onError={() => {
                    setIframeFailed(true);
                    setIframeLoading(false);
                  }}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                /* Rich Fallback Overview UI if iFrame is restricted by X-Frame-Options or CSP headers */
                <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-gradient-to-b from-[#090e21] via-[#0d142b] to-[#090e21] text-white">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
                    <span>
                      Direct iframe embedding is restricted by cross-origin policies for <strong>{project.title}</strong>. Click <strong>Live Demo</strong> below to launch the website in a new tab.
                    </span>
                  </div>

                  {/* Rich Project Overview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono font-bold uppercase">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
                        {project.status}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      {project.title}
                    </h2>
                    <p className="text-slate-300 font-mono text-sm sm:text-base">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Overview Grid */}
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="p-6 rounded-2xl glass-card space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Product Description
                      </h4>
                      <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                        {project.overview}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl glass-card space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Core Architecture
                      </h4>
                      <div className="space-y-2">
                        {project.architecture?.map((arch, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 flex items-start gap-2 font-mono">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{arch}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="p-5 rounded-2xl glass-card space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls Footer Bar */}
            <div className="px-6 py-3.5 bg-[#0e1426] border-t border-white/15 flex flex-wrap items-center justify-between gap-4 shrink-0 font-mono text-xs">
              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all font-bold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
