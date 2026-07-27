import { motion } from 'framer-motion';
import { Layers, Server, Palette, Cpu } from 'lucide-react';
import { profileData } from '../content/profile';

const iconMap = {
  0: Layers,
  1: Server,
  2: Palette,
  3: Cpu
};

export default function CurrentlyBuilding() {
  const items = profileData?.currentlyBuilding || [];

  return (
    <section id="currently-building" className="py-16 px-4 sm:px-6 relative bg-[#090B1A]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Current Engineering Focus
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Currently Building
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left">
          {items.map((item, idx) => {
            const Icon = iconMap[idx] || Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-4 sm:p-6 rounded-2xl bg-[#050816] border border-zinc-800 hover:border-zinc-700 transition-all space-y-2 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-zinc-800/60 text-sky-400">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
