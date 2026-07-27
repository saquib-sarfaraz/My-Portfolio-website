import { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Compass, Sparkles, Rocket, ChevronDown, ChevronUp, CheckCircle2, Calendar, MapPin, Building2 } from 'lucide-react';
import { marvelTimelineData } from '../content/experience';

export default function EngineeringJourney() {
  const containerRef = useRef(null);
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
    <section id="journey" ref={containerRef} className="py-24 px-4 sm:px-6 relative bg-[#10182C] text-left overflow-hidden">
      {/* Volumetric Radial Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full radial-glow-cyan blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] rounded-full radial-glow-purple blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-sky-400 text-xs font-mono uppercase tracking-widest border border-white/20 shadow-md backdrop-blur-xl">
            <Compass className="w-4 h-4 text-sky-400" /> Career Milestones
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Engineering <span className="text-sky-400">Journey</span>
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-mono">
            A chronological timeline of my internships, leadership roles, and technical growth.
          </p>
        </motion.div>

        {/* Timeline Track Container */}
        <div className="relative ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
          {/* Background Track Line */}
          <div className="absolute left-0 top-3 bottom-12 w-1.5 bg-slate-700/80 rounded-full" />

          {/* Glowing Animated Fill Line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-0 top-3 bottom-12 w-1.5 bg-gradient-to-b from-sky-400 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_18px_rgba(56,189,248,0.9)]"
          />

          {/* Timeline Nodes */}
          {marvelTimelineData.map((node, idx) => {
            const isCurrent = node.isCurrent;
            const isExpanded = expandedId === node.id;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                data-cursor-label="MILESTONE"
                className="relative space-y-3"
              >
                {/* Node Marker */}
                <div
                  className={`absolute -left-[41px] sm:-left-[57px] top-6 w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center z-10 ${
                    isCurrent
                      ? 'bg-[#10182C] border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.9)] scale-125'
                      : 'bg-[#10182C] border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isCurrent ? 'bg-emerald-400 animate-ping' : 'bg-sky-400'
                    }`}
                  />
                </div>

                {/* Node Card Box */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl transition-all cursor-pointer ${
                    isCurrent
                      ? 'glass-card border-2 border-emerald-400/80 shadow-[0_16px_50px_rgba(34,197,94,0.25)] relative overflow-hidden'
                      : 'glass-card glass-card-hover'
                  }`}
                  onClick={() => toggleExpand(node.id)}
                >
                  {/* Top Bar info */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-3 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300">
                          {node.year}
                        </span>
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                            isCurrent
                              ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300'
                              : 'bg-white/10 text-white border border-white/15'
                          }`}
                        >
                          {node.highlightBadge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white pt-1">
                        {node.title}
                      </h3>
                      <div className="text-slate-200 font-semibold flex items-center gap-2 text-xs sm:text-sm font-mono">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span>{node.company}</span>
                        <span>•</span>
                        <span className="text-slate-300">{node.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs font-mono text-slate-200 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-sky-400" />
                        <span>{node.period}</span>
                      </div>

                      <button
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="Expand details"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Impact Bullets (Expanded) */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4 space-y-4"
                    >
                      <div className="space-y-2 text-xs sm:text-sm text-slate-200 font-medium">
                        {node.impactBullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2
                              className={`w-4 h-4 mt-0.5 shrink-0 ${
                                isCurrent ? 'text-emerald-400' : 'text-sky-400'
                              }`}
                            />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {node.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white font-medium"
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

          {/* Timeline End Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gradient-to-r from-sky-500/25 via-[#10182C] to-purple-600/25 border border-sky-400/40 text-center space-y-4 shadow-[0_16px_50px_rgba(56,189,248,0.25)] relative overflow-hidden backdrop-blur-xl"
          >
            <div className="w-12 h-12 rounded-full bg-sky-500/25 border border-sky-400/50 flex items-center justify-center mx-auto text-sky-300 shadow-lg">
              <Rocket className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-300 font-bold">
                NEXT CHAPTER IN PROGRESS
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Full Stack Developer & Software Engineer
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm font-mono max-w-md mx-auto">
                Open for full-time software engineering roles, internships, and development opportunities.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all shadow-md"
              >
                <span>Get in Touch</span>
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
