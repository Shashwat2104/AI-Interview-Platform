'use client';

import * as React from 'react';

import { prefersReducedMotion, useInViewOnce } from '@/lib/motion';

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

interface RevealProps {
  children: React.ReactNode;
  /** Direction the block travels from. Defaults to a short rise. */
  variant?: RevealVariant;
  /** Extra delay in ms, for staggered groups of reveals. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance for whole blocks (not individual elements).
 * Content settles once, when it enters the viewport; users with reduced motion
 * get the final state immediately and never see a hidden frame.
 *
 * Only opacity/transform/filter are animated (see `.reveal` in globals.css),
 * so reveals can never introduce layout shift.
 */
export function Reveal({ children, variant = 'up', delay = 0, className }: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const [visible, setVisible] = React.useState(false);

  // The observer never fires for reduced-motion users (it resolves instantly),
  // but keep an explicit guard so the hidden frame can never trap content.
  React.useEffect(() => {
    if (prefersReducedMotion()) setVisible(true);
  }, []);

  const shown = inView || visible;

  return (
    <div
      ref={ref}
      data-reveal={variant}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={`reveal ${shown ? 'is-in' : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
