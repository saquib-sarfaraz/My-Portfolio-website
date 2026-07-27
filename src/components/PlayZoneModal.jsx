import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, RotateCw, Play, Sparkles, Gamepad2, Maximize2, Minimize2, Lock, Clock } from 'lucide-react';

const ARCADE_GAMES = [
  {
    id: 'xyxo',
    title: 'XYXO',
    category: 'Realtime Socket Engine',
    difficulty: 'Medium',
    badge: 'Multiplayer',
    status: 'available',
    description: 'Real-time socket-based multiplayer Tic-Tac-Toe with global matchmaking & room codes.',
    url: 'https://xyxo.vercel.app/',
    gradient: 'from-sky-500/20 via-purple-600/20 to-indigo-500/20',
    borderColor: 'border-sky-400/50 hover:border-sky-400',
  },
  {
    id: 'cityflow',
    title: 'CityFlow Commander 3D',
    category: '3D Simulation Engine',
    difficulty: 'Pro',
    badge: '3D Traffic',
    status: 'comingSoon',
    description: 'Urban traffic signal optimization & multi-agent road pathfinding engine.',
    gradient: 'from-slate-900 via-slate-900/90 to-emerald-950/20',
    borderColor: 'border-slate-800 hover:border-emerald-500/30',
  },
  {
    id: 'codebreaker',
    title: 'Code Breaker Matrix',
    category: 'Cipher & Logic Challenge',
    difficulty: 'Hard',
    badge: 'Logic',
    status: 'comingSoon',
    description: 'Decrypt obfuscated hex payloads under time constraints in a terminal interface.',
    gradient: 'from-slate-900 via-slate-900/90 to-purple-950/20',
    borderColor: 'border-slate-800 hover:border-purple-500/30',
  },
  {
    id: 'speed-typer',
    title: 'Speed Typer OS',
    category: 'Code Speed Arcade',
    difficulty: 'Speed',
    badge: 'Developer',
    status: 'comingSoon',
    description: 'Measure your WPM & accuracy typing production JavaScript & React snippets.',
    gradient: 'from-slate-900 via-slate-900/90 to-amber-950/20',
    borderColor: 'border-slate-800 hover:border-amber-500/30',
  }
];

export default function PlayZoneModal({ isOpen, onClose }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const windowContainerRef = useRef(null);
  const gameContainerRef = useRef(null);

  // Sync fullscreen state with browser events (Esc key, browser gestures)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Manage body scroll lock and pause/resume Lenis smooth scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLaunchGame = (game, launchFullscreen = false) => {
    if (game.status !== 'available') return;
    setSelectedGame(game);
    setIframeKey((prev) => prev + 1);

    if (launchFullscreen) {
      setTimeout(() => {
        toggleFullscreen();
      }, 100);
    }
  };

  const handleBackToArcade = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setSelectedGame(null);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const target = gameContainerRef.current || windowContainerRef.current;
        if (target?.requestFullscreen) {
          await target.requestFullscreen();
        } else if (target?.webkitRequestFullscreen) {
          await target.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request could not be completed:', err);
    }
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto text-left font-sans safe-area-inset"
      >
        
        {/* Main OS Window Container */}
        <motion.div
          ref={windowContainerRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-5xl h-[92vh] sm:h-[90vh] max-h-[850px] rounded-3xl bg-[#090D1E]/95 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'max-w-none max-h-none h-full rounded-none border-none' : ''
          }`}
        >
          
          {/* OS Window Header Controls */}
          <div className="p-3.5 sm:p-5 border-b border-white/15 bg-slate-900/90 backdrop-blur-xl flex items-center justify-between shrink-0 pt-safe">
            <div className="flex items-center gap-2 sm:gap-3">
              {selectedGame ? (
                <button
                  onClick={handleBackToArcade}
                  className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-sky-300 font-mono text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  <Gamepad2 className="w-5 h-5" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-white font-sans flex items-center gap-1.5">
                    <span>🎮 {selectedGame ? selectedGame.title : 'Play Zone Arcade Library'}</span>
                    <span className="text-xs font-mono font-normal text-sky-400">v2.6 OS</span>
                  </h3>
                </div>
                <p className="text-xs font-mono text-slate-400 hidden sm:block">
                  {selectedGame ? selectedGame.category : 'Browse interactive mini experiences & arcade games.'}
                </p>
              </div>
            </div>

            {/* Window Right Action Trio */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Fullscreen Toggle Button (⛶) */}
              <button
                onClick={toggleFullscreen}
                className="px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-mono text-xs font-bold hover:bg-sky-500/30 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </button>

              {/* Reload Button (When Game Active) */}
              {selectedGame && selectedGame.url && (
                <button
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="p-2 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reload Game"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              )}

              {/* Close Button (✕) */}
              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                  }
                  setSelectedGame(null);
                  onClose();
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 transition-colors cursor-pointer"
                aria-label="Close Play Zone"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* OS Window Body — Independent Vertical Scroll Area with Lenis Scroll Lock Isolation */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-8 space-y-6 scrollbar-none"
          >
            
            {/* VIEW A: ARCADE SELECTION GRID */}
            {!selectedGame ? (
              <div className="space-y-6 max-w-5xl mx-auto">
                {/* Banner Header */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-500/10 via-purple-600/10 to-emerald-500/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> Saquib OS Arcade Library
                    </div>
                    <p className="text-xs text-slate-300 font-mono pt-1">
                      1 Active Game online • 3 Production Releases Coming Soon.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 font-bold">
                      🟢 1 Playable
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/30 font-bold">
                      🟡 3 Coming Soon
                    </span>
                  </div>
                </div>

                {/* Arcade Game Library Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ARCADE_GAMES.map((game) => {
                    const isPlayable = game.status === 'available';

                    return (
                      <motion.div
                        key={game.id}
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-6 rounded-3xl bg-gradient-to-br ${game.gradient} border ${game.borderColor} transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-xl group relative overflow-hidden`}
                      >
                        <div className="space-y-3">
                          {/* Header Status Row */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded bg-white/10 text-sky-300 border border-white/15">
                              {game.category}
                            </span>
                            
                            {isPlayable ? (
                              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                🟢 Play Now
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/30 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-400" />
                                🟡 Coming Soon
                              </span>
                            )}
                          </div>

                          {/* Game Info */}
                          <div>
                            <h4 className={`text-xl font-extrabold font-sans ${isPlayable ? 'text-white group-hover:text-sky-300' : 'text-slate-200'}`}>
                              {game.title}
                            </h4>
                            <p className="text-xs text-slate-300 pt-1 leading-relaxed font-sans line-clamp-2">
                              {game.description}
                            </p>
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <div className="pt-3 border-t border-white/15 flex items-center justify-between font-mono text-xs font-bold">
                          {isPlayable ? (
                            <div className="flex items-center gap-2 w-full">
                              <button
                                onClick={() => handleLaunchGame(game, false)}
                                className="flex-1 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>▶ Play</span>
                              </button>

                              <button
                                onClick={() => handleLaunchGame(game, true)}
                                className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 hover:bg-sky-500/30 hover:text-white transition-all cursor-pointer"
                                title="Play Fullscreen"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between w-full">
                              <span className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 text-[11px] font-mono font-medium flex items-center gap-1.5 cursor-not-allowed">
                                <Lock className="w-3 h-3 text-slate-500" />
                                <span>Coming Soon</span>
                              </span>
                              <span className="text-[10px] text-slate-500 uppercase">{game.badge}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* VIEW B: EMBEDDED GAME VIEWPORT */
              <div
                ref={gameContainerRef}
                className="w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden border border-white/15 bg-black/80 relative min-h-[500px]"
              >
                {selectedGame.url ? (
                  <iframe
                    key={iframeKey}
                    title={selectedGame.title}
                    src={selectedGame.url}
                    className="w-full h-full min-h-[600px] border-none flex-1"
                    allow="fullscreen; autoplay; clipboard-write"
                  />
                ) : (
                  /* Fallback View */
                  <div className="p-8 text-center space-y-6 my-auto max-w-md mx-auto">
                    <button
                      onClick={handleBackToArcade}
                      className="px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      Return to Arcade Grid
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* OS Window Footer Bar */}
          <div className="p-3 border-t border-white/15 bg-slate-950/90 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0 pb-safe">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Saquib OS Arcade Library</span>
            </span>
            <span className="hidden sm:inline">1 Playable • 3 Releases Coming Soon</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
