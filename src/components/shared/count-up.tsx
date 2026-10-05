'use client';

import * as React from 'react';

import { MOTION, prefersReducedMotion, useInViewOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface CountUpProps {
  /** Target value. */
  to: number;
  from?: number;
  /** Duration in ms. */
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts a metric up once, when it scrolls into view. The final value is
 * rendered immediately for reduced-motion users, and tabular numerals keep the
 * layout from shifting while digits change.
 */
export function CountUp({
  to,
  from = 0,
  duration = MOTION.duration.story + 300,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [value, setValue] = React.useState(from);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      setDone(true);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  return (
    <span ref={ref} className={cn('numeric tabular-nums', className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
      {/* Keep the announced value stable once the animation settles. */}
      {done ? null : <span className="sr-only">{to.toFixed(decimals)}</span>}
    </span>
  );
}
