import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, MapPin, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import RecruiterDashboard from '../components/RecruiterDashboard';
import { profileData } from '../content/profile';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setErrorMsg('');

    try {
      const response = await fetch("https://formspree.io/f/mgograry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Direct Message',
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Formspree response error');
      }
    } catch (err) {
      console.error('Formspree Send Error:', err);
      setErrorMsg('Unable to send message via Formspree. Please try again or email directly.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-[#0B1020] overflow-hidden text-left">
      {/* Radial Glow Blobs */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full radial-glow-cyan blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full radial-glow-purple blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Recruiter Dashboard */}
        <RecruiterDashboard />

        {/* Contact Form & Messaging Card */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl glass-card border border-white/20 space-y-8 shadow-[0_20px_60px_rgba(56,189,248,0.2)]">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-sky-400 text-xs font-mono uppercase tracking-widest border border-white/15 shadow-sm">
              <Mail className="w-4 h-4 text-sky-400" /> Direct Channel
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's Build Something Together
            </h2>
            <p className="text-slate-200 text-sm max-w-md mx-auto font-mono">
              Open for full stack roles, technical projects, and engineering collaborations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto font-mono text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase text-[10px]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saquib Sarfaraz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold uppercase text-[10px]">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="saquib@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase text-[10px]">Subject (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Job Opportunity / Collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase text-[10px]">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Share project details, job opportunity, or inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors leading-relaxed"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 text-black animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Message Delivered Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Direct Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
