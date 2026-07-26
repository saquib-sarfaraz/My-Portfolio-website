import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, RotateCw, Code2, Sparkles } from 'lucide-react';
import { skillsData } from '../content/skills';
import TechTooltip from './TechTooltip';

export default function SkillOrbit() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'orbit'
  const [activeCategory, setActiveCategory] = useState('All');

  const allSkills = skillsData.categories.flatMap((cat) => cat.skills);

  const filteredCategories = activeCategory === 'All'
    ? skillsData.categories
    : skillsData.categories.filter((cat) => cat.title.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-left">
      {/* View Switcher & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Frontend', 'Backend', 'Database', 'Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold border-white'
                  : 'bg-[#111111] text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Orbit vs Grid Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111111] border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>

          <button
            onClick={() => setViewMode('orbit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'orbit'
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Orbit View</span>
          </button>
        </div>
      </div>

      {/* Mode Viewport */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider border-l-2 border-sky-400 pl-3">
                  {cat.title}
                </h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {cat.skills.map((skill) => (
                    <TechTooltip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="orbit"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative min-h-[380px] flex items-center justify-center p-8 rounded-3xl bg-[#090B1A] border border-zinc-800 overflow-hidden"
          >
            {/* Center Core Node */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-sky-500/20 to-purple-600/20 border border-sky-400/40 flex flex-col items-center justify-center text-center p-2 shadow-2xl backdrop-blur-md">
              <Code2 className="w-6 h-6 text-sky-400" />
              <span className="text-[10px] font-mono font-bold text-white pt-1">Saquib Stack</span>
            </div>

            {/* Orbit Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[240px] h-[240px] rounded-full border border-zinc-800/80 pointer-events-none"
            />

            {/* Orbit Ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[340px] h-[340px] rounded-full border border-zinc-800/50 pointer-events-none"
            />

            {/* Orbiting Skill Chips */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {allSkills.slice(0, 8).map((skill, index) => {
                const angle = (index / 8) * (2 * Math.PI);
                const radius = 130;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={skill.name}
                    style={{ x, y }}
                    className="absolute pointer-events-auto px-3 py-1.5 rounded-full bg-[#111111] border border-zinc-700 text-xs font-mono text-zinc-200 shadow-xl flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
