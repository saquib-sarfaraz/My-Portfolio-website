import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Cpu, Database, Globe, Cloud, Sparkles, ArrowRight } from 'lucide-react';
import { architectureNodes } from '../content/architecture';

const iconMap = {
  client: Globe,
  api: Cpu,
  database: Database,
  socket: Network,
  cdn: Cloud
};

export default function ArchitectureVisualizer() {
  const [activeNode, setActiveNode] = useState(architectureNodes[0]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-[#090B1A] border border-zinc-800 space-y-8 shadow-2xl text-left">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              Live Architecture System
            </span>
            <span className="text-xs font-mono text-zinc-400 px-3 py-1 rounded-full bg-zinc-800/80">
              Data Flow Simulator
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-white pt-1">
            Real-Time System Flow & Architecture
          </h3>
          <p className="text-zinc-400 text-xs font-mono">
            Hover over any component node to inspect specifications, data protocols, and latency guarantees.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Packet Streams Live</span>
        </div>
      </div>

      {/* Nodes Connection Pipeline Stream */}
      <div className="relative grid grid-cols-2 md:grid-cols-5 gap-3 py-4">
        {architectureNodes.map((node, idx) => {
          const Icon = iconMap[node.id] || Network;
          const isSelected = activeNode.id === node.id;

          return (
            <motion.div
              key={node.id}
              whileHover={{ y: -3, scale: 1.02 }}
              onClick={() => setActiveNode(node)}
              onMouseEnter={() => setActiveNode(node)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                isSelected
                  ? 'bg-zinc-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'bg-[#050816] border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="p-2.5 rounded-xl text-white font-bold"
                  style={{ backgroundColor: `${node.color}20`, color: node.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-white leading-snug">{node.title}</div>
                <div className="text-[10px] font-mono text-zinc-400 pt-0.5">{node.type}</div>
              </div>

              {/* Connected Arrow Indicator */}
              {idx < architectureNodes.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-zinc-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Node Detail Spec Box */}
      <div className="p-6 rounded-2xl bg-[#050816] border border-zinc-800 space-y-3 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">{activeNode.title} Specifications</h4>
          </div>
          <span
            className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded"
            style={{ backgroundColor: `${activeNode.color}20`, color: activeNode.color }}
          >
            {activeNode.status}
          </span>
        </div>

        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
          {activeNode.description}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="text-zinc-400">
            Tech Protocol: <span className="text-white font-semibold">{activeNode.tech}</span>
          </div>
          <div className="text-zinc-500">
            Component ID: #{activeNode.id}
          </div>
        </div>
      </div>
    </div>
  );
}
