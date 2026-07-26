import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function TechTooltip({ skill }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Skill Card Badge */}
      <motion.div
        whileHover={{ y: -2 }}
        className="p-3.5 rounded-xl bg-[#111111] border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer shadow-sm flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300 text-sm font-bold border border-zinc-700">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
              {skill.name}
            </div>
            <div className="text-[11px] font-mono text-zinc-500">
              {skill.experience} • {skill.level}
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400">
          {skill.projectsCount} Apps
        </div>
      </motion.div>

      {/* Popover Metadata Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 w-60 p-3.5 rounded-xl bg-[#161616] border border-zinc-700 shadow-xl z-30 pointer-events-none text-xs space-y-2"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 font-mono">
              <span className="font-bold text-white">{skill.name}</span>
              <span className="text-[10px] text-zinc-400">{skill.level}</span>
            </div>

            <div>
              <div className="text-[10px] uppercase font-mono text-zinc-500 mb-1">
                Core Mastered Concepts:
              </div>
              <div className="flex flex-wrap gap-1">
                {skill.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-mono"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1 text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Applied in {skill.projectsCount} projects</span>
              <span className="text-emerald-400">Verified</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
