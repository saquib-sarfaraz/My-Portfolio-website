import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'midnight', label: 'Midnight', icon: '🌙' },
    { id: 'aurora', label: 'Aurora', icon: '✨' },
    { id: 'frost', label: 'Frost', icon: '☀️' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl shadow-md font-mono text-xs select-none">
      {themes.map((item) => {
        const isActive = theme === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setTheme(item.id)}
            className={`relative px-2.5 py-1 rounded-full transition-all flex items-center gap-1 font-semibold ${
              isActive
                ? 'text-sky-400 font-extrabold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title={`Switch to ${item.label} theme`}
          >
            {isActive && (
              <motion.div
                layoutId="themePill"
                className="absolute inset-0 rounded-full bg-white/20 border border-white/30 -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span>{item.icon}</span>
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
