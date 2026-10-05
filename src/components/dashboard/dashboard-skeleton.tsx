import { Skeleton } from '@/components/ui/skeleton';

interface DashboardSkeletonProps {
  tiles?: number;
}

/** Layout-matched loading state for role dashboards, so the page doesn't jump. */
export function DashboardSkeleton({ tiles = 3 }: DashboardSkeletonProps) {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="space-y-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: tiles }).map((_, i) => (
          <Skeleton key={i} className="h-[92px] rounded-lg" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-[360px] rounded-lg" />
        <Skeleton className="h-[360px] rounded-lg" />
      </div>
    </div>
  );
}
