import { motion } from 'framer-motion';
import { ArrowDown, FileText, FolderGit2 } from 'lucide-react';
import HeroScene3D from '../components/HeroScene3D';
import { profileData } from '../content/profile';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)', scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-20 pb-10 bg-[#02040a] overflow-hidden select-none">
      {/* Subtle Deep Atmospheric Volumetric Glows */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[650px] rounded-full bg-sky-500/10 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-purple-500/10 blur-[180px] pointer-events-none" />

      {/* Main Spacious Hero Grid: 3D Anime Developer is the Centerpiece */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">

        {/* LEFT COLUMN: Minimal Text Hierarchy with Handcrafted Stagger (40% Span) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 space-y-8"
        >
          {/* Minimal Typography: Hi, I'm Saquib Sarfaraz */}
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-slate-400 font-mono text-sm sm:text-base font-medium tracking-wide">
              Hi, I'm
            </motion.p>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.05] font-sans">
              Saquib <br />
              <span className="text-sky-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
                Sarfaraz
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl sm:text-3xl font-bold text-slate-200 font-mono tracking-tight pt-1">
              Full Stack Developer <span className="text-sky-400 animate-pulse">_</span>
            </motion.div>

            <motion.p variants={itemVariants} className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md font-normal pt-2">
              Building production web experiences.
            </motion.p>
          </div>

          {/* Clean Action Buttons with Soft Hover Lift & Glow */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#products"
              className="px-7 py-4 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.25)] flex items-center gap-2.5 transform hover:-translate-y-1 hover:scale-[1.03]"
            >
              <FolderGit2 className="w-4 h-4 text-black" />
              <span>View Products</span>
            </a>

            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(56,189,248,0.15)] backdrop-blur-xl transform hover:-translate-y-1 hover:scale-[1.03]"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Resume</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Anime Developer Character Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 w-full flex justify-center items-center"
        >
          <HeroScene3D mode="hero" />
        </motion.div>
      </div>

      {/* Breathing Animated Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: [0, 0.8, 0.6], y: [15, 0, 5] }}
        transition={{ delay: 0.9, duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="pt-8 hover:opacity-100 transition-opacity pointer-events-auto"
      >
        <a href="#workspace" className="flex flex-col items-center gap-2 text-xs font-mono text-slate-400 tracking-wider">
          <span>Scroll to enter my workspace</span>
          <ArrowDown className="w-4 h-4 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        </a>
      </motion.div>
    </section>
  );
}
