'use client';

import { StatusBadge } from '@/components/shared/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  title: string;
  description?: string;
  timestamp: string;
  status?: string;
}

function ActivityItem({ title, description, timestamp, status }: ActivityItemProps) {
  return (
    <li className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-snug">{title}</p>
        {description && <p className="truncate text-sm text-muted-foreground">{description}</p>}
      </div>
      {status && <StatusBadge status={status} />}
      <time className="numeric shrink-0 text-xs text-muted-foreground">{timestamp}</time>
    </li>
  );
}

interface ActivityFeedProps {
  title: string;
  description?: string;
  items: Array<ActivityItemProps>;
  className?: string;
  emptyMessage?: string;
}

export function ActivityFeed({
  title,
  description,
  items,
  className,
  emptyMessage = 'No recent activity',
}: ActivityFeedProps) {
  return (
    <Card className={cn('col-span-1', className)}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="divide-y">
            {items.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </ul>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}
