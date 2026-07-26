import { motion } from 'framer-motion';
import { Briefcase, Calendar, Mail, FileText, CheckCircle2, Clock, MapPin, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profileData } from '../content/profile';

export default function RecruiterDashboard() {
  const { recruiterInfo, socials, resumeUrl } = profileData;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-[#090B1A] border border-zinc-800 space-y-6 shadow-2xl text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              {recruiterInfo.status}
            </span>
            <span className="text-xs font-mono text-zinc-400 px-3 py-1 rounded-full bg-zinc-800/80">
              Recruiter Dashboard
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white pt-1">
            Engineering Availability & Direct Hiring Metrics
          </h3>
        </div>

        <div className="text-xs font-mono text-zinc-400 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Avg Response Time: <strong className="text-white">{recruiterInfo.responseTime}</strong></span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-[#050816] border border-zinc-800 space-y-1.5">
          <div className="text-zinc-500 uppercase">Target Roles</div>
          <div className="text-zinc-200 font-semibold leading-relaxed">
            {recruiterInfo.preferredRoles.join(' • ')}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#050816] border border-zinc-800 space-y-1.5">
          <div className="text-zinc-500 uppercase">Current Location</div>
          <div className="text-zinc-200 font-semibold">
            {recruiterInfo.currentLocation}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#050816] border border-zinc-800 space-y-1.5">
          <div className="text-zinc-500 uppercase">Portfolio Version & Date</div>
          <div className="text-zinc-200 font-semibold">
            {profileData.osName} {profileData.osVersion} ({recruiterInfo.lastUpdated})
          </div>
        </div>
      </div>

      {/* Quick Action CTAs */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${socials.email}`}
            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-sm"
          >
            <Mail className="w-4 h-4 text-black" />
            <span>Send Direct Email</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full bg-zinc-800 text-white font-semibold text-xs hover:bg-zinc-700 transition-all flex items-center gap-2 border border-zinc-700"
          >
            <FileText className="w-4 h-4 text-zinc-300" />
            <span>Download CV (PDF)</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>

          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
