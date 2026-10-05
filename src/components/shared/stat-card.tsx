'use client';

import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Counts up to the target once when the value arrives. Skipped entirely for
 * users who prefer reduced motion, and only used for single-load values.
 */
function useCountUp(target: number, enabled: boolean) {
  const [display, setDisplay] = React.useState(enabled ? 0 : target);

  React.useEffect(() => {
    if (!enabled) {
      setDisplay(target);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 800;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled]);

  return enabled ? display : target;
}

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: string;
  delta?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
    label?: string;
  };
  href?: string;
  className?: string;
}

/**
 * Single summary statistic rendered as a bordered tile.
 * Replaces the previous icon-heavy stat cards; color is used only
 * to communicate trend direction.
 */
export function StatCard({ label, value, hint, delta, href, className }: StatCardProps) {
  const isNumeric = typeof value === 'number';
  const shownValue = useCountUp(isNumeric ? (value as number) : 0, isNumeric);

  const body = (
    <>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="numeric text-2xl font-semibold tracking-tight">
          {isNumeric ? shownValue : value}
        </span>
        {delta && (
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              delta.trend === 'up' && 'text-success',
              delta.trend === 'down' && 'text-destructive',
              delta.trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {delta.trend === 'up' && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {delta.trend === 'down' && (
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {delta.trend === 'neutral' && <Minus className="h-3.5 w-3.5" aria-hidden="true" />}
            {delta.value}
            {delta.label && <span className="text-muted-foreground">{delta.label}</span>}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </>
  );

  const classes = cn(
    'rounded-lg border bg-card p-5 transition-all duration-200',
    href &&
      'hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 dark:hover:border-brand-cyan/40',
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
      >
        <div className={classes}>{body}</div>
      </Link>
    );
  }

  return (
    <div className={classes} aria-label={typeof label === 'string' ? label : undefined}>
      {body}
    </div>
  );
}
