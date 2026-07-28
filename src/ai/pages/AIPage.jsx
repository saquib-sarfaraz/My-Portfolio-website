import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, ArrowLeft, Search, RefreshCw, Terminal, Layers } from 'lucide-react';
import AIChat from '../components/AIChat';
import AISuggestions from '../components/AISuggestions';
import { sendChatMessage } from '../services/chatService';

const INITIAL_SUGGESTIONS = [
  'Tell me about yourself',
  'Show your best project',
  'Explain InCampus',
  'Show AI projects',
  'What technologies do you know?',
  'Why should I hire you?',
  'Tell me about WonderKids',
  'How can I contact you?'
];

const ROTATING_PLACEHOLDERS = [
  'Ask about InCampus...',
  'Why should I hire you?',
  'Explain AI Spend Audit...',
  'Tell me about your internship...',
  'What backend tech stack do you use?',
  'Show real-time socket projects...'
];

export default function AIPage({ onClose, onTriggerOSAction }) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [viewportHeight, setViewportHeight] = useState(null);
  const inputRef = useRef(null);

  // Rotate input placeholder
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle dynamic visualViewport resizing on mobile (e.g. soft keyboard open/close)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      setViewportHeight(window.visualViewport.height);
    };

    handleResize();

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);

    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
      window.visualViewport.removeEventListener('scroll', handleResize);
    };
  }, []);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isThinking) return;

    const userMsg = { role: 'user', content: textToSend.trim() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputQuery('');
    setIsThinking(true);

    try {
      const response = await sendChatMessage({
        messages: updatedMessages,
        query: textToSend.trim()
      });

      const assistantMsg = {
        role: 'assistant',
        content: response.text,
        sources: response.sources,
        actions: response.actions
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'An unexpected error occurred while communicating with Saquib AI. Please try again.',
          sources: ['System'],
          actions: []
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    handleSend(suggestion);
  };

  const handleActionTrigger = (action) => {
    if (onTriggerOSAction) {
      onTriggerOSAction(action);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  // Generate 2-3 dynamic follow-ups based on the last response
  const getLastFollowUps = () => {
    if (messages.length === 0) return INITIAL_SUGGESTIONS;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'assistant') return [];

    const content = (lastMsg.content || '').toLowerCase();
    if (content.includes('incampus')) {
      return [
        'What challenges did you face in InCampus?',
        'How does real-time chat work?',
        'Show project architecture'
      ];
    }
    if (content.includes('ai spend audit')) {
      return [
        'Which Groq model was used?',
        'How does tool overlap detection work?',
        'Show AI Spend Audit live demo'
      ];
    }
    if (content.includes('wonderkids')) {
      return [
        'What platforms are you building at WonderKids?',
        'What tech stack do you use at your internship?',
        'Show full experience history'
      ];
    }

    return [
      'Tell me about your flagship project',
      'Do you have experience with Socket.io?',
      'Why should I hire you?'
    ];
  };

  // Lock body scroll and pause Lenis while AI Search workspace is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();

    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#040814] text-white flex flex-col justify-between overflow-hidden text-left font-sans w-screen"
      style={{ height: viewportHeight ? `${viewportHeight}px` : '100dvh' }}
    >
      {/* Volumetric Ambient Lighting */}
      <div className="absolute top-1/6 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[180px] pointer-events-none" />

      {/* TOP GOOGLE AI MODE NAVBAR HEADER */}
      <header className="relative z-10 p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Return to Saquib OS</span>
          </button>

          <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <img
              src="/ai-search-logo.png"
              alt="Saquib OS AI Search"
              className="w-7 h-7 rounded-lg object-cover shadow-md border border-sky-400/40"
            />
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                AI Search
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Clear Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>KNOWLEDGE BASE READY</span>
          </div>
        </div>
      </header>

      {/* MAIN CHAT CONVERSATION VIEWPORT (SCROLLABLE CONTAINER) */}
      <main
        data-lenis-prevent
        className="relative z-10 flex-1 overflow-y-auto min-h-0 p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-8 scrollbar-thin touch-pan-y overscroll-contain"
      >
        {/* Welcome State when conversation is empty */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12 space-y-6 max-w-xl mx-auto"
          >
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-400 via-purple-500 to-emerald-400 opacity-80 blur-xl animate-pulse" />
              <img
                src="/ai-search-logo.png"
                alt="AI Search Logo"
                className="relative w-20 h-20 rounded-3xl object-cover border border-sky-400/50 shadow-2xl shadow-sky-500/30 mx-auto"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI <span className="text-sky-400">Search</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-mono leading-relaxed">
                Ask anything about my projects, experience, skills, achievements, and engineering journey.
              </p>
            </div>

            {/* Suggested Starter Chips */}
            <div className="pt-4 text-left">
              <AISuggestions
                suggestions={INITIAL_SUGGESTIONS}
                onSelectSuggestion={handleSuggestionSelect}
              />
            </div>
          </motion.div>
        )}

        {/* Conversation Stream */}
        {messages.length > 0 && (
          <AIChat
            messages={messages}
            isThinking={isThinking}
            onTriggerAction={handleActionTrigger}
          />
        )}

        {/* Follow-up Question Chips after AI Answers */}
        {messages.length > 0 && !isThinking && (
          <div className="pt-4 border-t border-slate-800/60">
            <AISuggestions
              suggestions={getLastFollowUps()}
              onSelectSuggestion={handleSuggestionSelect}
            />
          </div>
        )}
      </main>

      {/* BOTTOM SEARCH INPUT FLOATING BAR */}
      <footer className="relative z-10 p-4 sm:p-6 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />

            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              disabled={isThinking}
              className="w-full pl-12 pr-14 py-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-xl"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="absolute right-2.5 p-2.5 rounded-xl bg-sky-500 text-white font-bold disabled:opacity-40 disabled:bg-slate-800 hover:bg-sky-400 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-2">
            <span>Trained specifically on Saquib's portfolio context</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
