import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isClickable = target.closest('a, button, input, textarea, [role="button"], .interactive');
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-zinc-500/40 pointer-events-none z-[999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 14,
          y: mousePosition.y - 14,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.3,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[999]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
        }}
      />
    </>
  );
}
