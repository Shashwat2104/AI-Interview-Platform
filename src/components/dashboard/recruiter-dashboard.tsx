/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { PieChartCard } from '@/components/dashboard/pie-chart-card';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { statusColorVar } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { useDashboardStats } from '@/hooks/use-dashboard-stats';

interface ChartDatum {
  name: string;
  value: number;
  color: string;
}

interface ApplicationActivity {
  title: string;
  description?: string;
  timestamp: string;
  status?: string;
}

export function RecruiterDashboard() {
  const { stats, loading, error, refetch } = useDashboardStats();
  const [statusData, setStatusData] = useState<ChartDatum[]>([]);
  const [recentApplications, setRecentApplications] = useState<ApplicationActivity[]>([]);

  useEffect(() => {
    if (!stats) return;

    if (stats.applicationsByStatus) {
      setStatusData(
        stats.applicationsByStatus.map((item: any) => ({
          name: item._id,
          value: item.count,
          color: statusColorVar(item._id),
        }))
      );
    }

    if (stats.recentApplications) {
      setRecentApplications(
        stats.recentApplications.map((app: any) => ({
          title: app.jobInfo?.title || 'Unknown job',
          description: `Applied by ${app.candidateName || 'unknown candidate'}`,
          timestamp: format(new Date(app.createdAt), 'MMM d, yyyy'),
          status: app.status,
        }))
      );
    }
  }, [stats]);

  if (loading) {
    return <DashboardSkeleton tiles={3} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load your dashboard"
        description="We couldn't retrieve your hiring data. Check your connection and try again."
        onRetry={refetch}
        className="min-h-[400px]"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recruiter dashboard"
        description="Your job listings and candidate activity at a glance."
        actions={
          <Button asChild size="sm">
            <Link href="/dashboard/job-listing">
              <Plus className="size-4" />
              Post a job
            </Link>
          </Button>
        }
      />

      <div className="rise-in grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="My jobs"
          value={stats?.myJobs ?? 0}
          hint="Listings you've posted"
          href="/dashboard/job-listing"
        />
        <StatCard
          label="Total applications"
          value={stats?.totalApplications ?? 0}
          hint="Applications to your listings"
          href="/dashboard/job-applications"
        />
        <StatCard
          label="Acceptance rate"
          value={`${calculateAcceptanceRate(stats?.applicationsByStatus || [])}%`}
          hint="Share of applications accepted"
        />
      </div>

      <div className="rise-in rise-in-d1 grid gap-4 lg:grid-cols-2">
        <PieChartCard
          title="Applications by status"
          description="Distribution of applications to your job listings"
          data={statusData}
        />
        <ActivityFeed
          title="Recent applications"
          description="Latest candidates applying to your jobs"
          items={recentApplications}
          emptyMessage="No applications yet. They will appear here once candidates start applying."
        />
      </div>
    </div>
  );
}

function calculateAcceptanceRate(applicationsByStatus: any[]): string {
  const accepted = applicationsByStatus.find((item) => item._id === 'accepted')?.count || 0;
  const total = applicationsByStatus.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) return '0';

  const rate = (accepted / total) * 100;
  return rate.toFixed(1);
}
