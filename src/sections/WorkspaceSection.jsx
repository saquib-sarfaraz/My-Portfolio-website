import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, GitBranch, Globe, Sparkles, CheckCircle2, Server, Activity, Laptop, ArrowRight } from 'lucide-react';
import { profileData } from '../content/profile';
import { flagshipProject, ecosystemProjects } from '../content/projects';

export default function WorkspaceSection() {
  const [activeTab, setActiveTab] = useState('Developer.tsx');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * -12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const editorTabs = ['Developer.tsx', 'InCampus.ts', 'AISpendAudit.ts', 'WonderKids.jsx', 'SocketEngine.js'];

  const projects = [flagshipProject, ...ecosystemProjects];

  return (
    <section id="workspace" className="relative py-24 px-4 sm:px-8 bg-[#040814] text-left overflow-hidden border-t border-slate-900/80">
      {/* Background Volumetric Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Title & OS Tag */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono uppercase tracking-widest backdrop-blur-xl">
            <Laptop className="w-4 h-4 text-sky-400" /> Interactive OS Environment
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
            Saquib's <span className="text-sky-400">Workspace</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-mono">
            Explore the live development environment, code architecture, dual monitor feeds, and active engineering pipelines.
          </p>
        </motion.div>

        {/* DEDICATED MOBILE COMPACT 2-COLUMN GRID (< lg Viewports) */}
        <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider border-l-4 border-sky-400 pl-3">
              Workspace Modules & Systems
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              ONLINE v2.6
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Developer.tsx', tag: 'Core Stack', desc: 'React 19, Node.js, MongoDB, Socket.io', badge: 'Active' },
              { title: 'InCampus.ts', tag: 'Flagship SaaS', desc: 'Realtime Campus Social & Chat Engine', badge: 'v2.6 Live' },
              { title: 'AISpendAudit.ts', tag: 'Groq AI Audit', desc: 'SaaS Subscription Overlap Optimization', badge: '$3.4k Saved' },
              { title: 'WonderKids.jsx', tag: 'Active Internship', desc: 'Educational Web Platforms & Simulators', badge: 'Intern' },
              { title: 'SocketEngine.js', tag: 'Realtime Gateway', desc: 'Sub-100ms Latency Broadcast Stream', badge: '18ms' },
              { title: 'Deployments', tag: 'Infra Status', desc: 'AWS us-east-1 + Vercel Edge CDN', badge: '100% Green' },
            ].map((module) => (
              <div
                key={module.title}
                onClick={() => setActiveTab(module.title)}
                className={`p-3.5 rounded-2xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between space-y-2 text-left ${
                  activeTab === module.title
                    ? 'border-sky-400 bg-slate-900 shadow-md'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-sky-400 font-bold px-1.5 py-0.5 rounded bg-sky-500/10 truncate max-w-[75%]">
                      {module.tag}
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400 font-extrabold">{module.badge}</span>
                  </div>

                  <div className="text-xs font-mono font-bold text-white pt-1">
                    {module.title}
                  </div>

                  <p className="text-[10px] font-sans text-slate-400 leading-snug line-clamp-2">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3 text-sky-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP WORKSPACE CANVAS: Interactive 3D Desk & Developer.tsx Code Window (≥ lg Viewports) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 7 COLS: Developer.tsx IDE Window & Terminal Log */}
          <motion.div
            style={{ rotateY: mousePos.x, rotateX: mousePos.y }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 space-y-4 font-mono text-xs flex flex-col justify-between"
          >
            {/* VS Code Titlebar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-300 font-bold ml-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  Saquib OS — {activeTab}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE v2.6
                </span>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
              {editorTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === tab
                      ? 'bg-slate-800 text-sky-400 font-bold border border-slate-700'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Editor Code Snippet */}
            <div className="p-4 rounded-2xl bg-[#060919] border border-slate-800/80 leading-relaxed text-slate-300 overflow-x-auto min-h-[220px]">
              {activeTab === 'Developer.tsx' && (
                <pre>
                  <code>
                    <span className="text-purple-400">interface</span> <span className="text-sky-300">Developer</span> &#123;{'\n'}
                    {'  '}<span className="text-slate-400">name:</span> <span className="text-emerald-300">"{profileData.name}"</span>;{'\n'}
                    {'  '}<span className="text-slate-400">role:</span> <span className="text-emerald-300">"{profileData.title}"</span>;{'\n'}
                    {'  '}<span className="text-slate-400">internship:</span> <span className="text-amber-300">"WonderKids Club"</span>;{'\n'}
                    {'  '}<span className="text-slate-400">flagshipProduct:</span> <span className="text-sky-400">"InCampus"</span>;{'\n'}
                    {'  '}<span className="text-slate-400">stack:</span> [<span className="text-emerald-300">"React"</span>, <span className="text-emerald-300">"Node.js"</span>, <span className="text-emerald-300">"MongoDB"</span>, <span className="text-emerald-300">"Socket.io"</span>];{'\n'}
                    &#125;{'\n\n'}
                    <span className="text-purple-400">export default function</span> <span className="text-yellow-300">SaquibWorkspace</span>() &#123;{'\n'}
                    {'  '}<span className="text-purple-400">return</span> &lt;<span className="text-sky-400">SaquibOS</span> <span className="text-teal-300">status</span>=<span className="text-emerald-300">"Deploying Production SaaS"</span> /&gt;;{'\n'}
                    &#125;
                  </code>
                </pre>
              )}

              {activeTab === 'InCampus.ts' && (
                <pre>
                  <code>
                    <span className="text-purple-400">import</span> &#123; Socket, MongoAtlas &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@incampus/core'</span>;{'\n\n'}
                    <span className="text-purple-400">export const</span> <span className="text-sky-300">incampusConfig</span> = &#123;{'\n'}
                    {'  '}<span className="text-slate-400">auth:</span> <span className="text-emerald-300">"OAuth 2.0 + JWT Auto-Rotation"</span>,{'\n'}
                    {'  '}<span className="text-slate-400">feedPipeline:</span> <span className="text-emerald-300">"MongoDB Compound Indexing"</span>,{'\n'}
                    {'  '}<span className="text-slate-400">realtimeChat:</span> <span className="text-emerald-300">"Socket.io Sub-100ms Latency"</span>,{'\n'}
                    {'  '}<span className="text-slate-400">privacyBoundaries:</span> <span className="text-amber-300">"Strict Campus Feed Isolation"</span>{'\n'}
                    &#125;;
                  </code>
                </pre>
              )}

              {activeTab === 'AISpendAudit.ts' && (
                <pre>
                  <code>
                    <span className="text-purple-400">import</span> &#123; GroqAI &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@groq/sdk'</span>;{'\n\n'}
                    <span className="text-purple-400">export async function</span> <span className="text-yellow-300">analyzeAISpend</span>(<span className="text-sky-300">subscriptions</span>) &#123;{'\n'}
                    {'  '}<span className="text-purple-400">const</span> <span className="text-slate-300">recommendations</span> = <span className="text-purple-400">await</span> GroqAI.<span className="text-yellow-300">auditOverlap</span>(subscriptions);{'\n'}
                    {'  '}<span className="text-purple-400">return</span> &#123;{'\n'}
                    {'    '}<span className="text-slate-400">annualSavings:</span> <span className="text-emerald-400">"$3,420"</span>,{'\n'}
                    {'    '}<span className="text-slate-400">redundantSeatsDetected:</span> <span className="text-sky-300">8</span>,{'\n'}
                    {'    '}<span className="text-slate-400">liveDemo:</span> <span className="text-emerald-300">"ai-audit-lilac.vercel.app"</span>{'\n'}
                    {'  '}&#125;;{'\n'}
                    &#125;
                  </code>
                </pre>
              )}

              {activeTab === 'WonderKids.jsx' && (
                <pre>
                  <code>
                    <span className="text-purple-400">const</span> <span className="text-sky-300">internshipDetails</span> = &#123;{'\n'}
                    {'  '}<span className="text-slate-400">company:</span> <span className="text-emerald-300">"WonderKids Club"</span>,{'\n'}
                    {'  '}<span className="text-slate-400">period:</span> <span className="text-emerald-300">"June 2026 – August 2026"</span>,{'\n'}
                    {'  '}<span className="text-slate-400">deliverables:</span> <span className="text-emerald-300">"Educational web platforms, simulation engines"</span>,{'\n'}
                    {'  '}<span className="text-slate-400">tech:</span> [<span className="text-sky-400">"HTML5"</span>, <span className="text-sky-400">"CSS3"</span>, <span className="text-sky-400">"JS"</span>, <span className="text-sky-400">"PHP"</span>, <span className="text-sky-400">"Python"</span>]{'\n'}
                    &#125;;
                  </code>
                </pre>
              )}

              {activeTab === 'SocketEngine.js' && (
                <pre>
                  <code>
                    <span className="text-purple-400">const</span> io = <span className="text-purple-400">require</span>(<span className="text-emerald-300">'socket.io'</span>)(server, &#123; cors: &#123; origin: <span className="text-emerald-300">'*'</span> &#125; &#125;);{'\n'}
                    io.on(<span className="text-emerald-300">'connection'</span>, (socket) =&gt; &#123;{'\n'}
                    {'  '}socket.on(<span className="text-emerald-300">'join_campus_room'</span>, (roomId) =&gt; socket.join(roomId));{'\n'}
                    {'  '}socket.on(<span className="text-emerald-300">'send_msg'</span>, (data) =&gt; io.to(data.room).emit(<span className="text-emerald-300">'msg'</span>, data));{'\n'}
                    &#125;);
                  </code>
                </pre>
              )}
            </div>

            {/* Live Deployment Stream Bar */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deploy Status: <strong className="text-emerald-400">Production Live</strong></span>
              </div>
              <div className="text-slate-400">Vercel & AWS us-east-1</div>
            </div>
          </motion.div>

          {/* RIGHT 5 COLS: Internship Status, Dual Monitor Activity & System Health */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Active Internship Widget */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Active Internship
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">WonderKids Club</h3>
                <p className="text-xs font-mono text-slate-400">Full Stack Web Developer Intern • June 2026 – August 2026</p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Engineering interactive educational platforms, game simulation modules, and full-stack web applications.
              </p>
            </div>

            {/* GitHub Activity & Live System Metrics */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 text-left font-mono">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-white font-bold">
                  <GitBranch className="w-4 h-4 text-purple-400" /> GitHub Stream
                </span>
                <span className="text-[10px] text-sky-400 font-semibold">saquib-sarfaraz</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">InCampus SaaS:</span>
                  <span className="text-emerald-400 font-bold">v2.6 Live</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Socket Latency:</span>
                  <span className="text-sky-400 font-bold">18ms Avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">College Search API:</span>
                  <span className="text-purple-400 font-bold">&lt; 15ms Query</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> All Systems Green
                </span>
                <span>AWS + Vercel</span>
              </div>
            </div>

            {/* Live Workspace Status Card */}
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs font-mono flex items-center justify-between text-sky-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Saquib OS Interactive Session</span>
              </div>
              <span className="text-slate-400 text-[10px]">React 19 + Three.js</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
