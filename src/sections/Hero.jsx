import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, FileText, FolderGit2 } from 'lucide-react';
import HeroScene3D from '../components/HeroScene3D';
import { profileData } from '../content/profile';

export default function Hero() {
  const sectionRef = useRef(null);
  
  // Hero Scroll-linked exit fade & overlap physics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Staggered reveal sequence item variants
  const itemVariant = (delayTime) => ({
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        delay: delayTime,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-8 bg-[#02040a] overflow-hidden select-none"
    >
      {/* Subtle Deep Atmospheric Volumetric Glows */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[650px] rounded-full bg-sky-500/10 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-purple-500/10 blur-[180px] pointer-events-none" />

      {/* Main Spacious Hero Grid: Smooth Scroll Fade & Scale Overlap */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 text-left my-auto"
      >

        {/* LEFT COLUMN: Minimal Text Hierarchy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            {/* Step 2 in Reveal Sequence: Greeting & Name */}
            <motion.p
              variants={itemVariant(0.6)}
              initial="hidden"
              animate="visible"
              className="text-slate-400 font-mono text-sm sm:text-base font-medium tracking-wide"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              variants={itemVariant(0.7)}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.05] font-sans"
            >
              Saquib <br />
              <span className="text-sky-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
                Sarfaraz
              </span>
            </motion.h1>

            {/* Step 3 in Reveal Sequence: Role */}
            <motion.div
              variants={itemVariant(0.9)}
              initial="hidden"
              animate="visible"
              className="text-xl sm:text-3xl font-bold text-slate-200 font-mono tracking-tight pt-2"
            >
              Full Stack Developer <span className="text-sky-400 animate-pulse">_</span>
            </motion.div>
          </div>

          {/* Step 4 in Reveal Sequence: Buttons */}
          <motion.div
            variants={itemVariant(1.2)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) {
                  if (window.lenis) {
                    window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
                  } else {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="px-7 py-4 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.25)] flex items-center gap-2.5 transform hover:-translate-y-1 hover:scale-[1.03]"
            >
              <FolderGit2 className="w-4 h-4 text-black" />
              <span>View Projects</span>
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
        </div>

        {/* Step 1 in Reveal Sequence: 3D Character Centerpiece (Occupies 60-70%) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 w-full flex justify-center items-center"
        >
          <HeroScene3D mode="hero" />
        </motion.div>
      </motion.div>

      {/* Step 5 in Reveal Sequence: Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="pt-4 hover:opacity-100 transition-opacity pointer-events-auto"
      >
        <a href="#workspace" className="flex flex-col items-center gap-2 text-xs font-mono text-slate-400 tracking-wider group">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] group-hover:scale-110 transition-transform" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
