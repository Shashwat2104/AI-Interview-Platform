import React from 'react';

import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  /** Retained for API compatibility; the backdrop is intentionally uniform. */
  patternColor?: string;
  patternOpacity?: number;
  animate?: boolean;
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'indigo' | 'default';
}

/**
 * Calm page backdrop for public and auth surfaces: a faint dot grid that fades
 * toward the edges. Replaces the previous drifting blur orbs.
 */
export function AnimatedBackground({ children, className }: AnimatedBackgroundProps) {
  return (
    <div className={cn('relative min-h-screen w-full overflow-hidden', className)}>
      <div aria-hidden="true" className="bg-dots bg-dots-fade absolute inset-0" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
