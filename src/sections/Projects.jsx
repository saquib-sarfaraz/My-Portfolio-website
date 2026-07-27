import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Code2, Eye, Server, Terminal, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import ProjectModal from '../components/ProjectModal';
import LivePreviewModal from '../components/LivePreviewModal';
import { flagshipProject, ecosystemProjects, learningProjects } from '../content/projects';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activePreviewProject, setActivePreviewProject] = useState(null);

  const allProjects = [...ecosystemProjects, ...learningProjects];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative bg-[#10182C] overflow-hidden">
      {/* Volumetric Radial Glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full radial-glow-cyan blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full radial-glow-purple blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 text-left relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15 inline-block shadow-sm">
            Engineered SaaS Systems
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Featured Products & <span className="text-sky-400">Infrastructure</span>
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-mono">
            Architected around the InCampus SaaS ecosystem and real-time multiplayer engines.
          </p>
        </motion.div>

        {/* MOBILE DEDICATED 2-COLUMN RESPONSIVE GRID (< md Viewports) */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <h3 className="text-xs font-extrabold text-white font-mono uppercase tracking-wider border-l-4 border-sky-400 pl-3">
              Projects & SaaS Infrastructure
            </h3>
            <span className="text-[10px] font-mono text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-400/30 font-bold">
              {allProjects.length + 1} Apps
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[flagshipProject, ...allProjects].map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="p-3.5 rounded-2xl glass-card border border-white/15 hover:border-sky-400/50 flex flex-col justify-between space-y-3 cursor-pointer transition-all active:scale-[0.98] h-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-sky-300 px-2 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 truncate max-w-[70%] font-extrabold">
                      {project.category || 'SaaS App'}
                    </span>
                    <span className="text-[8px] font-mono text-emerald-300 font-bold">
                      {project.status || 'Live'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                    {project.title}
                  </h4>

                  <p className="text-[10px] text-slate-300 line-clamp-2 font-sans leading-relaxed">
                    {project.subtitle || project.overview}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {(project.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[8px] font-mono text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Trio Footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePreviewProject(project);
                    }}
                    className="text-sky-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-sky-400" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-1.5 py-0.5 rounded bg-white text-black font-bold hover:bg-slate-200 transition-colors"
                      >
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="GitHub Repo"
                      >
                        <FaGithub className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP FEATURED SHOWCASE (≥ md Viewports) */}
        <div className="hidden md:block space-y-16">
          {/* Flagship Product Showcase: InCampus */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            data-cursor-label="FLAGSHIP"
            className="p-6 md:p-10 rounded-3xl glass-card border-2 border-sky-400/50 space-y-8 shadow-[0_20px_60px_rgba(56,189,248,0.25)] relative overflow-hidden transition-all duration-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest px-3 py-0.5 rounded bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sky-300" />
                    <span>{flagshipProject.eyebrow}</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300 px-3 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 font-bold">
                    {flagshipProject.status}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white pt-1">{flagshipProject.title}</h3>
                <p className="text-slate-200 text-sm font-mono font-medium">{flagshipProject.subtitle}</p>
              </div>

              {/* 3 Action Buttons Cluster */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePreviewProject(flagshipProject)}
                  className="px-4 py-2 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold text-xs hover:bg-sky-500/30 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                {flagshipProject.demoUrl && (
                  <a
                    href={flagshipProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {flagshipProject.githubUrl && (
                  <a
                    href={flagshipProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Editorial Case Study Grid */}
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-1">
                    Product Overview
                  </h4>
                  <p className="text-slate-100 leading-relaxed font-medium">
                    {flagshipProject.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-1">
                    Core Engineering Challenge
                  </h4>
                  <p className="text-slate-200 leading-relaxed text-xs">
                    {flagshipProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-1">
                    Architecture & Implementation
                  </h4>
                  <p className="text-slate-100 leading-relaxed text-xs">
                    {flagshipProject.approach}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-2">
                  System Modules & Impact
                </h4>

                <div className="space-y-2.5">
                  {flagshipProject.architecture.map((arch, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white font-medium shadow-sm">
                      {arch}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {flagshipProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] font-mono text-white font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveModalProject(flagshipProject)}
                    className="text-xs font-mono text-sky-300 underline hover:text-white transition-colors flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span>View Full InCampus Architecture Specification</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ecosystem & Services Grid */}
          <div className="space-y-6">
            <h3 className="text-lg font-extrabold text-white font-mono uppercase tracking-wider border-l-4 border-sky-400 pl-3">
              InCampus Ecosystem & Real-Time Infrastructure
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {ecosystemProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-7 rounded-2xl glass-card glass-card-hover flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-300 px-2.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/40 font-extrabold">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 font-semibold">
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-extrabold text-white">
                        {project.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-200 font-medium">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-200 text-xs leading-relaxed font-normal">
                      {project.overview}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] font-mono text-white font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Controls: Case Study & 3 Action Buttons [Preview] [Live] [GitHub] */}
                  <div className="pt-4 border-t border-white/15 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-sky-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Case Study</span>
                        <span>→</span>
                      </button>

                      {/* Action Trio */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActivePreviewProject(project)}
                          className="px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold text-[11px] hover:bg-sky-500/30 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview</span>
                        </button>

                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-full bg-white text-black font-bold text-[11px] hover:bg-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all cursor-pointer"
                            aria-label="GitHub Repo"
                          >
                            <FaGithub className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Learning Projects Subsection */}
          <div className="space-y-4 pt-6 border-t border-white/15">
            <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">
              Learning Projects & UI Exercises
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {learningProjects.map((lp) => (
                <div
                  key={lp.id}
                  className="p-4 rounded-xl glass-card flex items-center justify-between gap-4 font-mono text-xs"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">{lp.title}</div>
                    <div className="text-xs text-slate-200 font-medium">{lp.subtitle}</div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {lp.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono text-white bg-white/10 border border-white/15 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setActivePreviewProject(lp)}
                      className="px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold text-[11px] hover:bg-sky-500/30 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={lp.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white text-black hover:bg-slate-200 transition-colors cursor-pointer"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Architecture Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Live Browser Window Preview Modal */}
      <LivePreviewModal
        project={activePreviewProject}
        isOpen={!!activePreviewProject}
        onClose={() => setActivePreviewProject(null)}
      />
    </section>
  );
}
