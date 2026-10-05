/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import { PieChartCard } from '@/components/dashboard/pie-chart-card';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { statusColorVar } from '@/components/shared/status-badge';
import { useDashboardStats } from '@/hooks/use-dashboard-stats';

interface ChartDatum {
  name: string;
  value: number;
  color: string;
}

interface JobActivity {
  title: string;
  description?: string;
  timestamp: string;
}

const recruiterPalette = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function AdminDashboard() {
  const { stats, loading, error, refetch } = useDashboardStats();
  const [applicationStatusData, setApplicationStatusData] = useState<ChartDatum[]>([]);
  const [jobsPerRecruiterData, setJobsPerRecruiterData] = useState<ChartDatum[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobActivity[]>([]);

  useEffect(() => {
    if (!stats) return;

    if (stats.applicationStatusData) {
      setApplicationStatusData(
        stats.applicationStatusData.map((item: any) => ({
          name: item._id,
          value: item.count,
          color: statusColorVar(item._id),
        }))
      );
    }

    if (stats.jobsPerRecruiter) {
      setJobsPerRecruiterData(
        stats.jobsPerRecruiter.map((item: any, index: number) => ({
          name: item._id,
          value: item.count,
          color: recruiterPalette[index % recruiterPalette.length],
        }))
      );
    }

    if (stats.recentJobs) {
      setRecentJobs(
        stats.recentJobs.map((job: any) => ({
          title: job.title || 'Untitled job',
          description: `Posted by ${job.recruiter?.name || 'unknown recruiter'}`,
          timestamp: format(new Date(job.createdAt), 'MMM d, yyyy'),
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
        title="Unable to load the dashboard"
        description="We couldn't retrieve platform statistics. Check your connection and try again."
        onRetry={refetch}
        className="min-h-[400px]"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin dashboard"
        description="Platform-wide activity across jobs, users and applications."
      />

      <div className="rise-in grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total jobs"
          value={stats?.totalJobs ?? 0}
          hint="Listings on the platform"
          href="/dashboard/manage-jobs"
        />
        <StatCard
          label="Total candidates"
          value={stats?.totalCandidates ?? 0}
          hint="Registered candidates"
          href="/dashboard/candidates"
        />
        <StatCard
          label="Total recruiters"
          value={stats?.totalRecruiters ?? 0}
          hint="Recruiter accounts"
          href="/dashboard/recruiters"
        />
      </div>

      <div className="rise-in rise-in-d1 grid gap-4 lg:grid-cols-2">
        <PieChartCard
          title="Applications by status"
          description="Distribution of job applications across the platform"
          data={applicationStatusData}
        />
        <PieChartCard
          title="Jobs per recruiter"
          description="Listings posted by the most active recruiters"
          data={jobsPerRecruiterData}
        />
      </div>

      <ActivityFeed
        className="rise-in rise-in-d2"
        title="Recently posted jobs"
        items={recentJobs}
        emptyMessage="No jobs have been posted yet."
      />
    </div>
  );
}
