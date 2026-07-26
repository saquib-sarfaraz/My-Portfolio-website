import { motion } from 'framer-motion';
import { Building2, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { wonderkidsInternship } from '../content/experience';

export default function CurrentInternshipSpotlight() {
  if (!wonderkidsInternship.isCurrent) return null;

  return (
    <section className="py-12 px-4 sm:px-6 relative bg-[#0B0B0C]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-10 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 shadow-xl relative overflow-hidden text-left"
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {wonderkidsInternship.statusBadge}
                </span>
                <span className="text-xs font-mono text-zinc-400 px-3 py-1 rounded-full bg-zinc-800/80">
                  {wonderkidsInternship.company}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white pt-1">
                {wonderkidsInternship.role}
              </h2>
              <div className="text-zinc-400 text-sm font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-400" />
                <span>{wonderkidsInternship.company}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Duration</div>
                <div className="text-zinc-200 font-semibold">{wonderkidsInternship.period}</div>
                <div className="text-[10px] text-zinc-500">{wonderkidsInternship.expectedCompletion}</div>
              </div>
            </div>
          </div>

          {/* Ongoing Summary Statement */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
              {wonderkidsInternship.ongoingSummary}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              Core Engineering Focus:
            </h3>

            <div className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-zinc-300">
              {wonderkidsInternship.impactBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800">
            <div className="flex flex-wrap gap-1.5">
              {wonderkidsInternship.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-zinc-800 text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="text-[11px] font-mono text-zinc-500">
              Official Offer • Vaultboard Consulting Pvt. Ltd.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
