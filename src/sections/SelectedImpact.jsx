import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, TrendingUp } from 'lucide-react';
import { impactData } from '../content/impact';

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  const numericMatch = value.match(/\d+/);
  const number = numericMatch ? parseInt(numericMatch[0], 10) : null;
  const prefix = number !== null ? value.split(numericMatch[0])[0] : '';
  const suffix = number !== null ? value.split(numericMatch[0])[1] : '';

  useEffect(() => {
    if (!isInView || number === null) return;

    const duration = 1500;
    const startTime = performance.now();

    const updateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeProgress * number));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, number]);

  if (number === null) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function SelectedImpact() {
  return (
    <section className="py-20 px-4 sm:px-6 relative bg-[#040814] overflow-hidden border-t border-slate-900/80">
      {/* Volumetric Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono uppercase tracking-widest backdrop-blur-xl">
            <Target className="w-4 h-4 text-sky-400" /> Measurable Engineering Outcomes
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Selected <span className="text-sky-400">Impact</span> & Metrics
          </h2>
        </motion.div>

        {/* Impact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {impactData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              data-cursor-label="METRIC"
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 space-y-3 shadow-xl backdrop-blur-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight group-hover:text-sky-400 transition-colors flex items-center justify-between">
                <AnimatedNumber value={item.metric} />
                <TrendingUp className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-xs font-bold text-slate-200 font-mono">
                {item.label}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {item.description}
              </p>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-800/80">
                Category: {item.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
