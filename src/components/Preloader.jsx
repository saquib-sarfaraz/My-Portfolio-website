import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { profileData } from '../content/profile';

export default function Preloader({ onComplete }) {
  const [isPresent, setIsPresent] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Saquib OS v2.6...');

  useEffect(() => {
    // Percentage ticker animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next > 30 && next < 60) setStatusText('Loading Developer Workspace & 3D Canvas...');
        if (next >= 60 && next < 90) setStatusText('Loading InCampus SaaS & WonderKids Experience...');
        if (next >= 90) setStatusText('System Ready. Launching Saquib OS...');
        return Math.min(next, 100);
      });
    }, 120);

    const timer = setTimeout(() => {
      setIsPresent(false);
      if (onComplete) onComplete();
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center px-6 overflow-hidden select-none font-mono text-left"
        >
          <div className="w-full max-w-md space-y-6">
            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold text-white tracking-tight">
                  {profileData.osName} <span className="text-sky-400">{profileData.osVersion}</span>
                </span>
              </div>

              <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                BOOTING
              </div>
            </div>

            {/* Status logs */}
            <div className="space-y-2 text-xs text-zinc-400 bg-[#090B1A] p-4 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between text-zinc-200 font-bold">
                <span>{statusText}</span>
                <span className="text-sky-400">{progress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 via-purple-500 to-emerald-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="pt-2 text-[10px] text-zinc-500 space-y-0.5">
                <div>&gt; Loading React 19 & Framer Motion engines...</div>
                <div>&gt; Initializing Socket.io realtime channels & 3D canvas...</div>
                <div>&gt; Verifying recruiter status & CV PDF links...</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
