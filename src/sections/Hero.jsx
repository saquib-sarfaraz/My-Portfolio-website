import { motion } from 'framer-motion';
import { ArrowDown, FileText, FolderGit2, Sparkles, Mail } from 'lucide-react';
import HeroScene3D from '../components/HeroScene3D';
import { profileData } from '../content/profile';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 bg-[#0B1020] overflow-hidden">
      {/* Hero Volumetric Radial Glow Sources */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full radial-glow-cyan blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full radial-glow-purple blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">

        {/* LEFT COLUMN: 45% Layout Span */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* OS Version & Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-xs font-mono tracking-tight shadow-[0_4px_20px_rgba(56,189,248,0.2)] backdrop-blur-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            <span className="text-sky-300 font-extrabold">{profileData.osName} {profileData.osVersion}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-100 font-semibold">{profileData.availability}</span>
          </div>

          {/* Headline Typography */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Hi, I'm <br />
              <span className="text-sky-400 text-glow-cyan">Saquib Sarfaraz</span>.
            </h1>

            <div className="text-xl sm:text-2xl font-bold text-white font-mono">
              Full Stack Developer <span className="text-sky-400 animate-pulse">_</span>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-lg pt-1 font-normal">
              {profileData.tagline}
            </p>

            <p className="text-slate-300 text-xs font-mono">
              B.Tech Computer Science Engineering • Jamia Hamdard University
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.3)] flex items-center gap-2"
            >
              <FolderGit2 className="w-4 h-4 text-black" />
              <span>View Products</span>
            </a>

            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(56,189,248,0.15)] backdrop-blur-xl"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Resume PDF</span>
            </a>

            <a
              href="#contact"
              className="px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-white/30 text-xs font-mono transition-colors backdrop-blur-md"
            >
              Contact
            </a>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-white/15">
            {profileData.metrics.slice(0, 4).map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-2xl glass-card space-y-1 shadow-[0_8px_32px_rgba(56,189,248,0.12)]"
              >
                <div className="text-base sm:text-lg font-extrabold text-white font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-slate-100">{metric.label}</div>
                <div className="text-[11px] text-slate-300 font-mono truncate">{metric.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: 55% Layout Span */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 w-full"
        >
          <HeroScene3D />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="pt-8 opacity-80 hover:opacity-100 transition-opacity">
        <a href="#journey" className="flex flex-col items-center gap-1 text-[11px] font-mono text-slate-300">
          <span>Scroll to explore Saquib OS</span>
          <ArrowDown className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
        </a>
      </div>
    </section>
  );
}
