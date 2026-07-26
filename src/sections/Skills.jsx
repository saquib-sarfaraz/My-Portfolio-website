import SkillOrbit from '../components/SkillOrbit';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative bg-[#090B1A]">
      <div className="max-w-5xl mx-auto space-y-12 text-left">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Technical Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Technical Stack
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Switch between Grid View and Orbit View to explore core competencies, concepts, and project counts.
          </p>
        </div>

        {/* Dual-Mode Skill Showcase */}
        <SkillOrbit />
      </div>
    </section>
  );
}
