import { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Building2, CheckCircle2, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, Rocket } from 'lucide-react';
import { getExperienceTimeline } from '../content/experience';

export default function Experience() {
  const containerRef = useRef(null);
  const timelineData = getExperienceTimeline();
  const [expandedId, setExpandedId] = useState('wonderkids-internship-2026');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" ref={containerRef} className="py-24 px-4 sm:px-6 relative bg-[#0B0F2A] text-left overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Professional Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience Timeline
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-mono">
            Newest first, featuring active industry production work and leadership roles.
          </p>
        </div>

        {/* Marvel-Style Animated Timeline Track */}
        <div className="relative ml-2 sm:ml-8 pl-6 sm:pl-12 space-y-8">
          {/* Background Track Line */}
          <div className="absolute left-0 top-3 bottom-8 w-1 bg-slate-800 rounded-full" />

          {/* Glowing Animated Fill Line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-0 top-3 bottom-8 w-1 bg-gradient-to-b from-emerald-400 via-sky-400 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.7)]"
          />

          {/* Timeline Cards */}
          {timelineData.map((exp, idx) => {
            const isPinned = exp.isCurrent;
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative space-y-3"
              >
                {/* Node Dot / Marker */}
                <div
                  className={`absolute -left-[33px] sm:-left-[57px] top-6 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all flex items-center justify-center z-10 ${
                    isPinned
                      ? 'bg-[#0B0F2A] border-emerald-400 shadow-[0_0_16px_rgba(34,197,94,0.9)] scale-125'
                      : 'bg-[#0B0F2A] border-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                  }`}
                >
                  <div
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                      isPinned ? 'bg-emerald-400 animate-ping' : 'bg-sky-400'
                    }`}
                  />
                </div>

                {/* Node Card Box */}
                <div
                  className={`p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all cursor-pointer shadow-lg overflow-hidden ${
                    isPinned
                      ? 'bg-[#0F173A] border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/10 relative'
                      : 'bg-[#0F173A]/90 border border-slate-700 hover:border-slate-500'
                  }`}
                  onClick={() => toggleExpand(exp.id)}
                >
                  {/* Glowing Top Line */}
                  {isPinned && (
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400 animate-pulse" />
                  )}

                  {/* Header Info Container */}
                  <div className="space-y-3 border-b border-slate-700/80 pb-4">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-200 font-semibold px-2 py-0.5 rounded bg-slate-800">
                        {exp.type}
                      </span>
                      <span
                        className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                          isPinned
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 animate-pulse'
                            : 'bg-sky-500/10 border border-sky-500/30 text-sky-400'
                        }`}
                      >
                        {exp.statusBadge || exp.highlightBadge}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight break-words">
                      {exp.title}
                    </h3>

                    {/* Mobile Metadata Stack (< md Viewports) */}
                    <div className="md:hidden space-y-1.5 text-xs font-mono text-slate-200 pt-0.5">
                      <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-white break-words">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Briefcase className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                        <span className="break-words">{exp.role}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          <span className="break-words">{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Desktop Metadata Row (≥ md Viewports) */}
                    <div className="hidden md:flex items-center gap-2 text-sm font-mono text-slate-200">
                      <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{exp.company}</span>
                      <span>•</span>
                      <span className="text-slate-300">{exp.role}</span>
                      {exp.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-400 text-xs">{exp.location}</span>
                        </>
                      )}
                    </div>

                    {/* Date Pill & Expand Controls Row */}
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <div className="text-[11px] sm:text-xs font-mono text-slate-300 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{exp.period}</span>
                      </div>

                      <button
                        className="p-1.5 sm:p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                        aria-label="Expand details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Impact Bullets */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4 space-y-4"
                    >
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Measurable Engineering Impact:
                      </h4>

                      <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {exp.impactBullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2
                              className={`w-4 h-4 mt-0.5 shrink-0 ${
                                isPinned ? 'text-emerald-400' : 'text-sky-400'
                              }`}
                            />
                            <span className="break-words">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="pt-2 border-t border-slate-700/80 flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] sm:text-xs font-mono text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Timeline End Rocket Launch Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-[#0F173A] to-sky-600/20 border border-emerald-500/40 text-center space-y-3 shadow-2xl relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
              <Rocket className="w-5 h-5 animate-bounce" />
            </div>

            <div className="space-y-1 font-mono">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                NEXT CHAPTER IN PROGRESS
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Full Stack Developer & Software Engineer
              </h3>
              <p className="text-slate-300 text-xs max-w-md mx-auto">
                Open for full-time software engineering roles, internships, and high-impact development.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
