'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Landing navigation — part of the brand environment. It sits on the hero's
 * deep brand field (matching its top colour exactly, so there is no seam in
 * either theme), then condenses into an elevated branded surface once the page
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
          ? 'border-white/10 bg-brand-deep/95 shadow-lg shadow-brand-deep/20 backdrop-blur dark:bg-[#071b2b]/95'
          : 'border-transparent bg-brand-deep dark:bg-[#071b2b]',
        className
      )}
    >
      {children}
    </header>
  );
}
