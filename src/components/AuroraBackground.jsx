import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-gradient-to-b from-[#0B1020] via-[#10182C] to-[#0A0E1A]">
      {/* Primary Sky Cyan Radial Volumetric Glow */}
      <motion.div
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[15%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-radial from-sky-400/30 via-cyan-500/15 to-transparent blur-[130px]"
      />

      {/* Secondary Violet / Purple Volumetric Bloom */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-radial from-purple-600/30 via-indigo-500/15 to-transparent blur-[120px]"
      />

      {/* Bottom Teal Ambient Glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[10%] left-[15%] w-[65vw] h-[65vw] rounded-full bg-radial from-teal-400/25 via-sky-600/15 to-transparent blur-[140px]"
      />

      {/* Linear Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]"
      />
    </div>
  );
}
