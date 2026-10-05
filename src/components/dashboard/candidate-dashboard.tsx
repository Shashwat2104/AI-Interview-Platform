/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { format } from 'date-fns';
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

export function CandidateDashboard() {
  const { stats, loading, error, refetch } = useDashboardStats();
  const [statusData, setStatusData] = useState<ChartDatum[]>([]);
  const [recentApplications, setRecentApplications] = useState<ApplicationActivity[]>([]);
  const [recentJobs, setRecentJobs] = useState<ApplicationActivity[]>([]);

  useEffect(() => {
    if (!stats) return;

    if (stats.myApplicationsByStatus) {
      setStatusData(
        stats.myApplicationsByStatus.map((item: any) => ({
          name: item._id,
          value: item.count,
          color: statusColorVar(item._id),
        }))
      );
    }

    if (stats.myRecentApplications) {
      setRecentApplications(
        stats.myRecentApplications.map((app: any) => ({
          title: app.jobInfo?.title || 'Unknown job',
          description: `at ${app.jobInfo?.companyName || 'unknown company'}`,
          timestamp: format(new Date(app.createdAt), 'MMM d, yyyy'),
          status: app.status,
        }))
      );
    }

    if (stats.recentJobs) {
      setRecentJobs(
        stats.recentJobs.map((job: any) => ({
          title: job.title,
          description: `${job.companyName} — ${job.location}`,
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
        title="Unable to load your dashboard"
        description="We couldn't retrieve your application data. Check your connection and try again."
        onRetry={refetch}
        className="min-h-[400px]"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate dashboard"
        description="Track your applications and find your next opportunity."
      />

      <div className="rise-in grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="My applications"
          value={stats?.myApplicationsCount ?? 0}
          hint="Jobs you've applied to"
          href="/dashboard/applications"
        />
        <StatCard
          label="Success rate"
          value={`${calculateSuccessRate(stats?.myApplicationsByStatus || [])}%`}
          hint="Applications accepted"
        />
        <StatCard
          label="In review or accepted"
          value={countInterviewOpportunities(stats?.myApplicationsByStatus || [])}
          hint="Applications moving forward"
        />
      </div>

      <div className="rise-in rise-in-d1 flex flex-col items-start justify-between gap-3 rounded-lg border bg-muted/40 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium">Looking for your next role?</p>
          <p className="text-sm text-muted-foreground">
            Browse open positions and apply with your resume.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard/jobs">Browse jobs</Link>
        </Button>
      </div>

      <div className="rise-in rise-in-d1 grid gap-4 lg:grid-cols-2">
        <PieChartCard
          title="Applications by status"
          description="Where your applications currently stand"
          data={statusData}
        />
        <ActivityFeed
          title="Recent applications"
          description="Your most recent job applications"
          items={recentApplications}
          emptyMessage="You haven't applied to any jobs yet. Browse jobs to get started."
        />
      </div>

      <ActivityFeed
        className="rise-in rise-in-d2"
        title="Recently posted jobs"
        description="Latest opportunities from recruiters"
        items={recentJobs}
        emptyMessage="No new job postings right now. Check back soon."
      />
    </div>
  );
}

function calculateSuccessRate(applicationsByStatus: any[]): string {
  const accepted = applicationsByStatus.find((item) => item._id === 'accepted')?.count || 0;
  const total = applicationsByStatus.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) return '0';

  const rate = (accepted / total) * 100;
  return rate.toFixed(1);
}

function countInterviewOpportunities(applicationsByStatus: any[]): number {
  const reviewed = applicationsByStatus.find((item) => item._id === 'reviewed')?.count || 0;
  const accepted = applicationsByStatus.find((item) => item._id === 'accepted')?.count || 0;

  return reviewed + accepted;
}
