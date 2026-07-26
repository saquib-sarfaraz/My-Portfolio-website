import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { impactData } from '../content/impact';

export default function SelectedImpact() {
  return (
    <section className="py-16 px-4 sm:px-6 relative bg-[#0B0B0C]">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <Target className="w-3.5 h-3.5" /> Measurable Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Selected Impact & Achievements
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {impactData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 space-y-3 shadow-sm group"
            >
              <div className="text-3xl font-extrabold text-white font-mono">
                {item.metric}
              </div>
              <div className="text-sm font-bold text-zinc-200">
                {item.label}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.description}
              </p>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 pt-2 border-t border-zinc-800">
                Category: {item.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
