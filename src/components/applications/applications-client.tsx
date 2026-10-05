'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { BarChart2, Briefcase, CheckCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Application status type
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

// Type definition for job application
export interface JobApplication {
  _id: string;
  jobId: string;
  userId: string;
  fileName: string;
  resumeUrl: string;
  preferredLanguage: string;
  status: ApplicationStatus;
  parsedResume?: {
    skills: string[];
    matchScore?: number;
    aiComments?: string;
    matchedAt?: string;
    topSkillMatches?: string[];
    missingSkills?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// Type definition for job details
export interface JobDetails {
  title: string;
  companyName: string;
  location: string;
  urlId: string;
}

export function ApplicationsClient() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');

  // Fetch all applications for the current user
  const { data: applicationsData, isLoading } = useQuery({
    queryKey: ['applications', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return { success: false, applications: [] };

      const response = await fetch(`/api/applications?userId=${session.user.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();

      // Fetch job details for each application
      const applicationsWithJobDetails = await Promise.all(
        data.applications.map(async (application: JobApplication) => {
          try {
            // Fetch job details by jobId
            const jobResponse = await fetch(`/api/jobs/${application.jobId}`);

            if (jobResponse.ok) {
              const jobData = await jobResponse.json();
              return {
                ...application,
                job: {
                  title: jobData.job.title,
                  companyName: jobData.job.companyName,
                  location: jobData.job.location,
                  urlId: jobData.job.urlId,
                },
              };
            }
            return {
              ...application,
              job: {
                title: 'Unknown Job',
                companyName: 'Unknown Company',
                location: 'Unknown',
                urlId: '',
              },
            };
          } catch (error) {
            console.error('Error fetching job details:', error);
            return {
              ...application,
              job: {
                title: 'Unknown Job',
                companyName: 'Unknown Company',
                location: 'Unknown',
                urlId: '',
              },
            };
          }
        })
      );

      return { ...data, applications: applicationsWithJobDetails };
    },
    enabled: !!session?.user?.id,
  });

  const applications = applicationsData?.applications || [];

  // Filter applications based on active tab
  const filteredApplications =
    activeTab === 'all'
      ? applications
      : applications.filter(
          (app: JobApplication & { job: JobDetails }) => app.status === activeTab
        );

  // Count applications by status
  const counts = applications.reduce(
    (acc: Record<string, number>, app: JobApplication) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { all: applications.length }
  );

  // Define columns for DataTable
  const columns: ColumnDef<JobApplication & { job: JobDetails }>[] = [
    {
      accessorKey: 'job.title',
      header: 'Job Title',
    },
    {
      accessorKey: 'job.companyName',
      header: 'Company',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as ApplicationStatus;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: 'parsedResume.matchScore',
      header: 'Match Score',
      sortingFn: (rowA, rowB) => {
        const scoreA = rowA.original.parsedResume?.matchScore || 0;
        const scoreB = rowB.original.parsedResume?.matchScore || 0;
        return scoreB - scoreA; // Sort in descending order (highest first)
      },
      cell: ({ row }) => {
        const application = row.original;
        const matchScore = application.parsedResume?.matchScore;

        if (matchScore === undefined)
          return <span className="text-sm text-muted-foreground">Not analyzed</span>;

        return (
          <div className="flex items-center gap-2">
            <div className="w-[52px] shrink-0">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${
                    matchScore >= 70
                      ? 'bg-success'
                      : matchScore >= 50
                        ? 'bg-warning'
                        : 'bg-destructive'
                  }`}
                  style={{ width: `${matchScore}%` }}
                />
              </div>
            </div>
            <span className="numeric text-sm font-medium">{matchScore}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Applied Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return <span>{format(date, 'PPP')}</span>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const application = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/dashboard/jobs/${application.job.urlId}`)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Job
            </Button>
            <Button
              variant={application.parsedResume?.matchScore !== undefined ? 'outline' : 'secondary'}
              size="sm"
              onClick={() => router.push(`/dashboard/applications/${application._id}`)}
            >
              {application.parsedResume?.matchScore !== undefined ? (
                <>
                  <BarChart2 className="h-4 w-4 mr-1" />
                  View Analysis
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        );
      },
    },
  ];

  if (!session) {
    return (
      <div className="container mx-auto py-6 text-center">
        <p>Please sign in to view your applications.</p>
      </div>
    );
  }

  return (
    <Card>
      <Tabs
        defaultValue="all"
        onValueChange={(value) => setActiveTab(value as ApplicationStatus | 'all')}
      >
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">
            All
            {counts.all > 0 && (
              <Badge variant="secondary" className="ml-2">
                {counts.all}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {(counts.pending || 0) > 0 && (
              <Badge variant="secondary" className="ml-2">
                {counts.pending}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviewed">
            Reviewed
            {(counts.reviewed || 0) > 0 && (
              <Badge variant="secondary" className="ml-2">
                {counts.reviewed}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted
            {(counts.accepted || 0) > 0 && (
              <Badge variant="secondary" className="ml-2">
                {counts.accepted}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            {(counts.rejected || 0) > 0 && (
              <Badge variant="secondary" className="ml-2">
                {counts.rejected}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="p-4">
          <DataTable columns={columns} data={filteredApplications} isLoading={isLoading} />
          {!isLoading && filteredApplications.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No applications yet"
              description="Browse open positions and apply with your resume to start tracking your progress here."
              action={
                <Button asChild size="sm">
                  <Link href="/dashboard/jobs">Browse jobs</Link>
                </Button>
              }
            />
          )}
        </TabsContent>

        <TabsContent value="pending" className="p-4">
          <DataTable columns={columns} data={filteredApplications} isLoading={isLoading} />
          {!isLoading && filteredApplications.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No pending applications"
              description="Applications waiting for a recruiter review will appear here."
            />
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="p-4">
          <DataTable columns={columns} data={filteredApplications} isLoading={isLoading} />
          {!isLoading && filteredApplications.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No reviewed applications"
              description="Once a recruiter reviews one of your applications, it will show up here."
            />
          )}
        </TabsContent>

        <TabsContent value="accepted" className="p-4">
          <DataTable columns={columns} data={filteredApplications} isLoading={isLoading} />
          {!isLoading && filteredApplications.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No accepted applications"
              description="Applications that move forward in the hiring process will appear here."
            />
          )}
        </TabsContent>

        <TabsContent value="rejected" className="p-4">
          <DataTable columns={columns} data={filteredApplications} isLoading={isLoading} />
          {!isLoading && filteredApplications.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No rejected applications"
              description="Applications that were not selected will appear here."
            />
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
