import { ArrowUp, Terminal } from 'lucide-react';
import { profileData } from '../content/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 bg-[#050816] border-t border-zinc-800 relative text-left">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Mission Statement Box */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#090B1A] border border-zinc-800 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-xs font-mono text-zinc-300">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>Developer Philosophy & Mission</span>
          </div>

          <p className="text-zinc-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto italic font-serif">
            "Thanks for exploring my engineering journey. Every project here represents curiosity, problem solving, and continuous improvement. Let's build something meaningful."
          </p>

          <div className="text-xs font-mono text-zinc-400">
            {profileData.name} • Full Stack Developer
          </div>
        </div>

        {/* Links & Production Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>© {new Date().getFullYear()} {profileData.name} • {profileData.osName} {profileData.osVersion}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profileData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-all ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
