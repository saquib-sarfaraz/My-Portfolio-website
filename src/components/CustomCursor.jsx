import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // default, button, link, card, text, image
  const [cursorText, setCursorText] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Position state (raw mouse position)
  const mousePos = useRef({ x: -100, y: -100 });
  // Follower position state (lerped interpolation for 60 FPS spring physics)
  const followerPos = useRef({ x: -100, y: -100 });

  const coreDotRef = useRef(null);
  const followerRingRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility & Touch Device check
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    // Hide native cursor on desktop
    document.body.style.cursor = 'none';

    // 2. Mouse position tracking
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Core dot moves instantly
      if (coreDotRef.current) {
        coreDotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }

      // Check hovered element type
      const target = e.target;
      const clickableButton = target.closest('button, [role="button"], .btn-magnetic');
      const clickableLink = target.closest('a');
      const heading = target.closest('h1, h2, h3, .hover-text');
      const projectCard = target.closest('.hover-card, [data-cursor-label]');

      if (projectCard) {
        setCursorType('card');
        const label = projectCard.getAttribute('data-cursor-label') || 'OPEN →';
        setCursorText(label);
      } else if (clickableButton) {
        setCursorType('button');
        setCursorText('');
      } else if (clickableLink) {
        setCursorType('link');
        setCursorText('');
      } else if (heading) {
        setCursorType('text');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }

      // Magnetic Button interaction (gentle 2-4px pull)
      if (clickableButton) {
        const rect = clickableButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;
        clickableButton.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.02)`;
        clickableButton.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    };

    // Reset button transform on mouse out
    const handleMouseOut = (e) => {
      const button = e.target.closest('button, [role="button"], .btn-magnetic');
      if (button) {
        button.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Scroll detection for slight vertical compression
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    // 60 FPS lerp loop for follower ring weighted physics
    let animFrameId;
    const loop = () => {
      const ease = 0.2; // Spring stiffness factor
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      if (followerRingRef.current) {
        followerRingRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);
    loop();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      
      {/* LAYER 1: Core Dot (6px, #3DBBFF bright cyan with soft glow) */}
      <div
        ref={coreDotRef}
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#3DBBFF] shadow-[0_0_10px_#3DBBFF] transition-transform duration-100 ease-out ${
          isMouseDown ? 'scale-[0.6]' : 'scale-100'
        } ${cursorType === 'text' ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* LAYER 2: Follower Ring (Weighted lerped spring ring) */}
      <div
        ref={followerRingRef}
        style={{ willChange: 'transform' }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <motion.div
          animate={{
            width: cursorType === 'button' ? 44 : cursorType === 'card' ? 68 : cursorType === 'text' ? 3 : cursorType === 'link' ? 34 : 26,
            height: cursorType === 'button' ? 44 : cursorType === 'card' ? 32 : cursorType === 'text' ? 24 : cursorType === 'link' ? 26 : 26,
            borderRadius: cursorType === 'card' ? '14px' : cursorType === 'text' ? '2px' : '9999px',
            scale: isMouseDown ? 0.88 : isScrolling ? 0.95 : 1,
            scaleY: isScrolling ? 1.2 : 1,
            borderColor: cursorType === 'button' || cursorType === 'card' ? 'rgba(56, 189, 248, 0.8)' : 'rgba(56, 189, 248, 0.4)',
            backgroundColor: cursorType === 'card' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.03)',
            boxShadow: cursorType === 'button' || cursorType === 'card' ? '0 0 20px rgba(56, 189, 248, 0.25)' : 'none',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="border border-[#3DBBFF]/40 backdrop-blur-[2px] flex items-center justify-center font-mono text-[10px] font-bold text-sky-300 tracking-wider shadow-sm"
        >
          {cursorType === 'card' && cursorText}
        </motion.div>
      </div>

    </div>
  );
}
