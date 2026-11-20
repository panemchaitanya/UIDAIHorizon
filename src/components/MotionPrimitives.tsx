import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring } from 'motion/react';

/**
 * Scroll-linked Aadhaar Crimson-to-Saffron precision reading line at top of viewport.
 */
export function ScrollProgressHairline() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="h-[2.5px] w-full bg-gradient-to-r from-[#C8232C] via-[#E86F1F] to-[#111111]"
      aria-hidden="true"
    />
  );
}

/**
 * Smoothly ticks numeric metrics into view.
 */
interface AnimatedNumberProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export function AnimatedNumber({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 1100,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
