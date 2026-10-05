'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface LazyMountProps {
  children: React.ReactNode;
  /**
   * Height reserved while the section is still unmounted. Reserving space is
   * what keeps deferred mounting free of layout shift.
   */
  minHeight?: number | string;
  /** How far ahead of the viewport the children may mount. */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers a heavy, below-fold section (scroll storytelling, product
 * demonstrations) until the reader approaches it. The placeholder occupies the
 * final layout box, so mounting causes no CLS, and no JS for the section is
 * executed while it is off screen.
 */
export function LazyMount({
  children,
  minHeight = 480,
  rootMargin = '400px 0px',
  className,
}: LazyMountProps) {
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={
        mounted
          ? undefined
          : { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }
      }
    >
      {mounted ? children : null}
    </div>
  );
}
