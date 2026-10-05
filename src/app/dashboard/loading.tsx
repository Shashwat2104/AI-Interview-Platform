import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <DashboardSkeleton tiles={3} />
    </div>
  );
}
