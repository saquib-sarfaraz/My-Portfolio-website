import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Briefcase, Rocket, Code2, Sparkles } from 'lucide-react';
import { profileData } from '../content/profile';
import profilePic from '../assets/profile-pic.jpeg';

export default function AboutMe() {
  const quickStats = [
    {
      icon: <GraduationCap className="w-5 h-5 text-sky-400" />,
      label: 'Education',
      value: 'B.Tech CSE',
      detail: 'Jamia Hamdard University'
    },
    {
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      label: 'Current Internship',
      value: 'WonderKids Club',
      detail: 'Full Stack Web Developer Intern'
    },
    {
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      label: 'Flagship Platform',
      value: 'InCampus SaaS Network',
      detail: 'Private Campus Social Ecosystem'
    },
    {
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      label: 'Location',
      value: 'New Delhi, India',
      detail: 'Open for Remote & Onsite'
    }
  ];

  const techBadges = [
    'React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 
    'JavaScript (ES6+)', 'PHP', 'Python', 'Git', 'Cloudinary', 'REST APIs', 'Tailwind CSS'
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative bg-gradient-to-b from-[#0B1020] via-[#10182C] to-[#0B1020] text-left overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-5 w-[450px] h-[450px] rounded-full radial-glow-cyan blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-[500px] h-[500px] rounded-full radial-glow-purple blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sky-400 text-xs font-mono uppercase tracking-widest border border-white/15 shadow-md backdrop-blur-xl">
            <User className="w-4 h-4 text-sky-400" /> Executive Overview
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-mono">
            Full Stack Developer specializing in real-time systems, scalable SaaS architecture, and interactive web products.
          </p>
        </div>

        {/* Two-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE (5 Grid Cols): Profile Image & Bio Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 glass-card p-8 rounded-3xl space-y-6 flex flex-col items-center justify-between text-center"
          >
            <div className="space-y-6 flex flex-col items-center w-full">
              {/* Prominent Circular Profile Image Presentation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                className="relative p-1.5 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-emerald-400 shadow-[0_0_35px_rgba(56,189,248,0.35)] cursor-pointer"
              >
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-[#10182C] bg-[#10182C]">
                  <img
                    src={profilePic}
                    alt="Saquib Sarfaraz - Full Stack Developer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Saquib Sarfaraz</h3>
                <p className="text-xs font-mono text-sky-400 font-bold">Full Stack Web Developer</p>
              </div>

              {/* Status Badge */}
              <div className="w-full p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)] shrink-0" />
                <div className="text-xs font-mono text-left">
                  <div className="font-extrabold text-emerald-300">Available for Opportunities</div>
                  <div className="text-slate-300">Full-time roles & internships</div>
                </div>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed text-center font-normal">
                Computer Science Engineering student at Jamia Hamdard with hands-on experience building production web applications, SaaS platforms, and interactive software.
              </p>
            </div>

            {/* Location & University Tag */}
            <div className="w-full pt-4 border-t border-white/15 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Jamia Hamdard University • CSE</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (7 Grid Cols): Written Overview & Quick Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 flex flex-col justify-between"
          >
            {/* Paragraph Bio Box */}
            <div className="glass-card p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-400" />
                <span>Professional Summary</span>
              </h3>

              <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  I'm <strong className="text-white font-semibold">Saquib Sarfaraz</strong>, a Computer Science Engineering student at Jamia Hamdard and a Full Stack Developer passionate about building scalable web applications, real-time systems, and interactive digital products.
                </p>
                <p>
                  Currently, I'm working as a <strong className="text-emerald-300 font-semibold">Full Stack Developer Intern at WonderKids Club</strong>, where I build production-ready educational platforms and interactive learning modules using HTML, CSS, JavaScript, PHP, and Python.
                </p>
                <p>
                  I enjoy engineering products that combine clean architecture, sub-100ms API performance, and engaging user interfaces—from campus social ecosystems like <strong className="text-sky-300 font-semibold">InCampus</strong> to high-speed backend microservices.
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-[11px] font-mono text-slate-300 font-semibold">{stat.label}</span>
                  </div>
                  <div className="text-sm font-extrabold text-white font-mono pt-1">{stat.value}</div>
                  <div className="text-[11px] text-slate-300 font-mono truncate">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Tech Highlights Badges */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold block">
                Primary Technical Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
