import { ExternalLink, FolderGit2, Gamepad2, FileText, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function AIActions({ actions = [], onTriggerAction }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="pt-3 border-t border-slate-800/80 space-y-2">
      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
        Related
      </div>
      <div className="flex flex-wrap gap-2">
      {actions.map((act, idx) => {
        if (act.type === 'project') {
          return (
            <button
              key={idx}
              onClick={() => onTriggerAction && onTriggerAction({ type: 'project', id: act.id })}
              className="px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 hover:text-white hover:bg-sky-500/30 transition-all font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
              <span>{act.label || 'Open Project Modal'}</span>
            </button>
          );
        }

        if (act.type === 'live') {
          return (
            <a
              key={idx}
              href={act.url}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 hover:text-white hover:bg-emerald-500/30 transition-all font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>{act.label || 'View Live Demo'}</span>
            </a>
          );
        }

        if (act.type === 'github') {
          return (
            <a
              key={idx}
              href={act.url}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 hover:text-white hover:bg-purple-500/30 transition-all font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <FaGithub className="w-3.5 h-3.5 text-purple-400" />
              <span>{act.label || 'GitHub Repository'}</span>
            </a>
          );
        }

        if (act.type === 'playzone') {
          return (
            <button
              key={idx}
              onClick={() => onTriggerAction && onTriggerAction({ type: 'playzone', gameId: act.gameId })}
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:text-white hover:bg-amber-500/30 transition-all font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{act.label || 'Launch Play Zone'}</span>
            </button>
          );
        }

        if (act.type === 'resume') {
          return (
            <a
              key={idx}
              href={act.url || '/Saquib_Sarfaraz_FullStack_Resume.pdf'}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 hover:text-white hover:bg-indigo-500/30 transition-all font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>{act.label || 'Download Resume PDF'}</span>
            </a>
          );
        }

        if (act.type === 'scroll') {
          return (
            <button
              key={idx}
              onClick={() => onTriggerAction && onTriggerAction({ type: 'scroll', target: act.target })}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all font-mono text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <span>{act.label || `Scroll to ${act.target}`}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          );
        }

        return null;
      })}
      </div>
    </div>
  );
}
