import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect if device supports touch
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, [role="button"], .clickable');
        setIsHovered(!!interactive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer subtle glow circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        animate={{
          x: position.x - (isHovered ? 24 : 16),
          y: position.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: isHovered ? 'rgba(129, 140, 248, 0.7)' : 'rgba(148, 163, 184, 0.35)',
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.4,
        }}
        style={{
          borderWidth: '1.5px',
          borderStyle: 'solid',
        }}
      />
      {/* Inner pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 bg-indigo-400 rounded-full"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 400,
          mass: 0.1,
        }}
      />
    </>
  );
}
