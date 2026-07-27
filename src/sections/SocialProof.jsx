import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { profileData } from '../content/profile';

export default function SocialProof() {
  const proofs = [
    {
      title: 'Current Internship',
      detail: 'Full Stack Web Developer Intern at WonderKids.',
      badge: 'Active Role',
    },
    {
      title: 'Community Leadership',
      detail: 'GeeksforGeeks Campus Mantri Lead at Jamia Hamdard.',
      badge: 'Active Lead',
    },
    {
      title: 'Academic Standing',
      detail: 'Pursuing B.Tech Computer Science Engineering.',
      badge: 'Engineering',
    },
    {
      title: 'Production Deployments',
      detail: '15+ live web applications and API microservices.',
      badge: '100% Live',
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 relative bg-[#0B0B0C]">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Credentials
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Social Proof & Verified Engineering Credentials
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {proofs.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#111111] border border-zinc-800 space-y-2 relative group hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {p.badge}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 shrink-0" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {p.title}
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                  {p.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Repositories Direct CTA */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-zinc-800 text-white shrink-0">
              <FaGithub className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Explore Open Source Repositories</div>
              <div className="text-xs text-zinc-400">Inspect full commit logs, pull requests, and codebase architectures.</div>
            </div>
          </div>

          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
