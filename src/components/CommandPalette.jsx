import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderGit2, Briefcase, User, Mail, FileText, ExternalLink, Gamepad2, X, Check } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profileData } from '../content/profile';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      id: 'projects',
      label: 'Go to Featured Products & Systems',
      category: 'Navigation',
      icon: FolderGit2,
      perform: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'experience',
      label: 'View Experience & Outcomes',
      category: 'Navigation',
      icon: Briefcase,
      perform: () => {
        const el = document.getElementById('experience');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'about',
      label: 'About & Background',
      category: 'Navigation',
      icon: User,
      perform: () => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'game',
      label: 'Launch XYXO Interactive Game',
      category: 'Interactive',
      icon: Gamepad2,
      perform: () => {
        const el = document.getElementById('game');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'contact',
      label: 'Contact & Send Message',
      category: 'Actions',
      icon: Mail,
      perform: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'resume',
      label: 'Download Resume (PDF)',
      category: 'Actions',
      icon: FileText,
      perform: () => {
        window.open(profileData.resumeUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'copy-email',
      label: 'Copy Email Address',
      category: 'Actions',
      icon: copied ? Check : Mail,
      perform: () => {
        navigator.clipboard.writeText(profileData.socials.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      category: 'Socials',
      icon: FaGithub,
      perform: () => {
        window.open(profileData.socials.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Socials',
      icon: FaLinkedin,
      perform: () => {
        window.open(profileData.socials.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-[#111111] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
              <Search className="w-4 h-4 text-zinc-500 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm font-medium"
              />
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No commands found matching "{query}"
                </div>
              ) : (
                filtered.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.perform}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-zinc-800/70 border border-transparent hover:border-zinc-700 text-left group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-800/80 text-zinc-400 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-200 group-hover:text-white">
                            {action.label}
                          </div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                            {action.category}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors opacity-0 group-hover:opacity-100" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">↑↓</span>
                <span>Navigate</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 ml-2">↵</span>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">ESC</span>
                <span>Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
