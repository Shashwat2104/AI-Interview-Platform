'use client';

import * as React from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Extra delay in ms for staggered groups. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance for whole sections (not individual elements).
 * Content rises in once, when it enters the viewport; users with reduced
 * motion get the final state immediately.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={`${shown ? 'rise-in' : 'opacity-0'} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
