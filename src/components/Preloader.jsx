import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isPresent, setIsPresent] = useState(true);
  const [stage, setStage] = useState(1);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [currentActiveIdx, setCurrentActiveIdx] = useState(-1);
  const [isReadyHighlighted, setIsReadyHighlighted] = useState(false);

  const statusLogs = [
    '✓ Authenticating Session',
    '✓ Restoring Workspace',
    '✓ Loading Engineering Journey',
    '✓ Opening Product Showcase',
    '✓ Preparing Experience Timeline',
    '✓ Activating Interactive Portfolio',
    '✓ Workspace Ready'
  ];

  useEffect(() => {
    // Stage 1: Pure black screen (0-200ms)
    // Stage 2: Power LED pulse (200ms-600ms)
    const t2 = setTimeout(() => setStage(2), 200);

    // Stage 3: SAQUIB OS large title reveals (600ms)
    const t3 = setTimeout(() => setStage(3), 600);

    // Stage 4: Subtitle "Initializing Workspace..." reveals (1100ms)
    const t4 = setTimeout(() => setStage(4), 1100);

    // Stage 5: One status line at a time with 130ms delay (1500ms - 2500ms)
    const t5 = setTimeout(() => {
      setStage(5);
      statusLogs.forEach((log, index) => {
        setTimeout(() => {
          setVisibleLogs((prev) => [...prev, log]);
          setCurrentActiveIdx(index);
          if (index === statusLogs.length - 1) {
            setIsReadyHighlighted(true);
          }
        }, index * 140);
      });
    }, 1500);

    // Stage 6: "Welcome. Entering Workspace..." end message (2700ms)
    const t6 = setTimeout(() => setStage(6), 2700);

    // Stage 7: Smooth exit transition (3300ms)
    const t7 = setTimeout(() => {
      setStage(7);
      setIsPresent(false);
      if (onComplete) onComplete();
    }, 3300);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ 
            opacity: 0, 
            filter: 'blur(16px)',
            scale: 1.02,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#02040a] flex flex-col items-center justify-center px-6 select-none font-mono text-center overflow-hidden"
        >
          {/* Volumetric Radial Glow */}
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0.3, 0.75, 0.5], scale: [0.8, 1.6, 1.4] }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[750px] h-[750px] rounded-full bg-sky-500/20 blur-[170px] pointer-events-none"
            />
          )}

          {/* Stage 2: Power LED Indicator */}
          {stage >= 2 && stage < 3 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.8] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_28px_rgba(56,189,248,1)] mb-6"
            />
          )}

          {/* Stage 3 & 4: Large SAQUIB OS Title & Initializing Workspace Subtitle */}
          {stage >= 3 && (
            <div className="space-y-3 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)', letterSpacing: '0.25em' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.18em' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl font-extrabold text-white font-mono drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]"
              >
                SAQUIB OS
              </motion.h1>

              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs sm:text-sm text-sky-400/90 tracking-[0.25em] uppercase font-bold"
                >
                  Initializing Workspace...
                </motion.div>
              )}
            </div>
          )}

          {/* Stage 5: Status Checkmark Lines (Revealing 1-by-1 with 70% opacity for previous lines) */}
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 w-full max-w-sm text-left space-y-2 bg-slate-900/80 p-6 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative z-10 font-mono"
            >
              {visibleLogs.map((log, index) => {
                const isCurrent = index === currentActiveIdx;
                const isLast = index === statusLogs.length - 1;

                return (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -14, filter: 'blur(4px)' }}
                    animate={{ 
                      opacity: isCurrent ? 1 : 0.7, 
                      x: 0, 
                      filter: 'blur(0px)' 
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-xs flex items-center justify-between tracking-wide transition-all ${
                      isLast && isReadyHighlighted
                        ? 'text-emerald-400 font-extrabold text-sm drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]'
                        : isCurrent
                        ? 'text-emerald-300 font-bold'
                        : 'text-slate-300 font-medium'
                    }`}
                  >
                    <span>{log}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Stage 6: Ending Welcome Message */}
          {stage >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
              className="mt-6 space-y-1 relative z-10"
            >
              <div className="text-sm sm:text-base text-white font-mono font-bold tracking-widest uppercase">
                Welcome.
              </div>
              <div className="text-xs text-sky-400 font-mono tracking-widest animate-pulse">
                Entering Workspace...
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
