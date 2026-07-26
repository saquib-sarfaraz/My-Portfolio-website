import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, GitBranch, Cpu, Code2, Globe, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { profileData } from '../content/profile';

export default function HeroWorkspace3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('App.jsx');

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10deg to 10deg
      const y = (e.clientY / innerHeight - 0.5) * -20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto perspective-1000 py-6">
      <motion.div
        animate={{
          rotateY: mousePos.x,
          rotateX: mousePos.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.5 }}
        className="relative rounded-3xl bg-[#090B1A]/90 border border-zinc-800 shadow-2xl p-4 md:p-6 space-y-4 backdrop-blur-xl text-left"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Window Titlebar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-zinc-400 font-medium ml-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              {profileData.osName} {profileData.osVersion} — Developer Workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              BUILD SUCCESSFUL
            </span>
          </div>
        </div>

        {/* Editor Tabs */}
        <div className="flex items-center gap-2 text-xs font-mono border-b border-zinc-800/60 pb-2">
          {['App.jsx', 'experience.js', 'WonderKids.jsx', 'incampus.config.ts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Editor & Terminal Canvas split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          {/* Main Code Preview Panel */}
          <div className="md:col-span-2 p-3.5 rounded-2xl bg-[#050816] border border-zinc-800/80 space-y-2 text-zinc-300 overflow-hidden leading-relaxed">
            <div className="text-[11px] text-zinc-500">// {activeTab} • Saquib OS Engine</div>
            <div className="text-sky-400">
              <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">'react'</span>;
            </div>
            <div className="text-sky-400">
              <span className="text-purple-400">import</span> &#123; wonderkidsInternship &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'./content/experience'</span>;
            </div>
            <br />
            <div>
              <span className="text-purple-400">export default function</span> <span className="text-yellow-300">DeveloperEngine</span>() &#123;
            </div>
            <div className="pl-4 text-zinc-400">
              <span className="text-purple-400">const</span> status = <span className="text-emerald-300">"{profileData.availability}"</span>;
            </div>
            <div className="pl-4 text-zinc-400">
              <span className="text-purple-400">return</span> (
            </div>
            <div className="pl-8 text-zinc-300">
              &lt;<span className="text-sky-400">PortfolioSystem</span> <span className="text-teal-300">isLive</span>=&#123;<span className="text-amber-400">true</span>&#125; /&gt;
            </div>
            <div className="pl-4 text-zinc-400">);</div>
            <div>&#125;</div>
          </div>

          {/* Side Status Widget Panel */}
          <div className="space-y-3">
            {/* Git Branch Widget */}
            <div className="p-3 rounded-2xl bg-[#050816] border border-zinc-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" /> main
                </span>
                <span className="text-[10px] text-emerald-400">v2.6 Synced</span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Latest Commit: "Feat: Saquib OS Awwwards polish"
              </div>
            </div>

            {/* Socket Stream Widget */}
            <div className="p-3 rounded-2xl bg-[#050816] border border-zinc-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Socket.io
                </span>
                <span className="text-[10px] text-cyan-400">connected</span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Latency: 24ms • Channels: Active
              </div>
            </div>

            {/* Current Active Internship Badge */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="text-[10px] font-bold text-emerald-400 uppercase">
                Active Internship
              </div>
              <div className="text-xs font-bold text-white">
                WonderKids Club
              </div>
              <div className="text-[10px] text-zinc-400">
                June 2026 – August 2026
              </div>
            </div>
          </div>
        </div>

        {/* Floating Ambient Card Tag */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-700 shadow-xl flex items-center justify-between text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-zinc-200">Interactive 3D Workspace Active</span>
          </div>
          <span className="text-[10px] text-zinc-500">React 19 + Framer Motion</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
