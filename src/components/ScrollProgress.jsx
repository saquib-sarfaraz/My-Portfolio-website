import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-purple-500 to-emerald-400 z-[100] pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.8)]"
    />
  );
}
