'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Surface with a pointer-following brand spotlight (hero product surfaces).
 * Desktop pointers only — coarse pointers and touch devices render a plain card.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={handlePointerMove} className={cn('spotlight', className)}>
      {children}
    </div>
  );
}
