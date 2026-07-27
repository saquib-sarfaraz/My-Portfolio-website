import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';
import AIMessage from './AIMessage';

export default function AIChat({ messages = [], isThinking = false, onTriggerAction }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div className="space-y-6">
      {messages.map((msg, idx) => (
        <AIMessage key={idx} message={msg} onTriggerAction={onTriggerAction} />
      ))}

      {/* Thinking / Streaming Indicator */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-emerald-400 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
            <Bot className="w-4 h-4 animate-bounce" />
          </div>

          <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-xs flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
            <span>Saquib AI is thinking & retrieving knowledge...</span>
            <div className="flex gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse delay-200" />
            </div>
          </div>
        </motion.div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
