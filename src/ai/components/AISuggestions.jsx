import { Sparkles } from 'lucide-react';

export default function AISuggestions({ suggestions = [], onSelectSuggestion }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-2 pt-3 border-t border-slate-800/60">
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <span>You may also ask</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-sky-400/50 text-slate-300 hover:text-white font-mono text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-sky-400">○</span>
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
