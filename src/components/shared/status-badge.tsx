import * as React from 'react';

import { cn } from '@/lib/utils';

export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

const statusStyles: Record<ApplicationStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/25',
  reviewed: 'bg-info/10 text-info border-info/25',
  accepted: 'bg-success/10 text-success border-success/25',
  rejected: 'bg-destructive/10 text-destructive border-destructive/25',
};

const statusLabels: Record<ApplicationStatus, string> = {
  pending: 'Pending',
  reviewed: 'Reviewed',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

/** Token color for a status, for use in charts and dot indicators. */
export function statusColorVar(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'var(--warning)';
    case 'reviewed':
      return 'var(--info)';
    case 'accepted':
      return 'var(--success)';
    case 'rejected':
      return 'var(--destructive)';
    default:
      return 'var(--muted-foreground)';
  }
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * Semantic status badge mapped to theme tokens. Unknown statuses fall back
 * to a neutral style instead of breaking.
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key =
    (status.toLowerCase() as ApplicationStatus) in statusStyles
      ? (status.toLowerCase() as ApplicationStatus)
      : null;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        key ? statusStyles[key] : 'bg-muted text-muted-foreground border-border',
        className
      )}
    >
      {key ? statusLabels[key] : status}
    </span>
  );
}
