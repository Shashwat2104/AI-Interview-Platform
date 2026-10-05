'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Landing navigation — part of the brand environment. Transparent over the
 * deep-blue hero, then condenses into a deep brand surface once the page
 * scrolls. Content inside stays white in both states.
 */
export function LandingHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-white/10 bg-brand-deep/95 shadow-lg shadow-brand-deep/20 backdrop-blur'
          : 'border-transparent bg-transparent',
        className
      )}
    >
      {children}
    </header>
  );
}
