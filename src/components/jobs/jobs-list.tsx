'use client';

import { Briefcase, Loader2 } from 'lucide-react';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IJob } from '@/models/job';

import { JobCard } from './job-card';
import { JobFilter } from './job-filter';

interface JobWithId extends Omit<IJob, '_id'> {
  id: string;
}

export function JobsList() {
  const [jobs, setJobs] = React.useState<JobWithId[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hasMore, setHasMore] = React.useState(false);
  const [page, setPage] = React.useState(1);

  // Filter states
  const [search, setSearch] = React.useState('');
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState('');

  // Infinite scroll setup
  const { ref, inView } = useInView();

  // Build query string from filters
  const buildQueryString = React.useCallback(
    (page: number) => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '12');

      if (search) params.append('search', search);
      if (selectedSkills.length > 0) params.append('skills', selectedSkills.join(','));
      if (location) params.append('location', location);

      return params.toString();
    },
    [search, selectedSkills, location]
  );

  // Initial load and filter changes
  const loadJobs = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryString = buildQueryString(1);
      const response = await fetch(`/api/jobs/list?${queryString}`);

      if (!response.ok) {
        throw new Error(`Error fetching jobs: ${response.status}`);
      }

      const result = await response.json();
      setJobs(result.jobs);
      setHasMore(result.hasMore);
      setPage(1);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('Unable to load jobs');
    } finally {
      setLoading(false);
    }
  }, [buildQueryString]);

  React.useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Load more when scrolled to bottom
  React.useEffect(() => {
    const loadMoreJobs = async () => {
      if (inView && hasMore && !loading) {
        const nextPage = page + 1;
        setLoading(true);

        try {
          const queryString = buildQueryString(nextPage);
          const response = await fetch(`/api/jobs/list?${queryString}`);

          if (!response.ok) {
            throw new Error(`Error fetching more jobs: ${response.status}`);
          }

          const result = await response.json();
          setJobs((prevJobs) => [...prevJobs, ...result.jobs]);
          setHasMore(result.hasMore);
          setPage(nextPage);
        } catch (error) {
          console.error('Failed to load more jobs:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMoreJobs();
  }, [inView, hasMore, loading, page, buildQueryString]);

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const hasActiveFilters = Boolean(search) || selectedSkills.length > 0 || Boolean(location);

  const clearFilters = () => {
    setSearch('');
    setSelectedSkills([]);
    setLocation('');
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 rounded-lg border bg-card p-4">
        <JobFilter
          onSearchChange={handleSearchChange}
          onSkillsChange={handleSkillsChange}
          onLocationChange={handleLocationChange}
        />
      </div>

      {loading && jobs.length === 0 ? (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
          aria-live="polite"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      ) : error && jobs.length === 0 ? (
        <ErrorState
          title="Unable to load jobs"
          description="We couldn't retrieve the job listings right now. Please try again."
          onRetry={loadJobs}
        />
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          description={
            hasActiveFilters
              ? 'Nothing matches your current filters. Try broadening your search or clearing the filters.'
              : 'There are no open positions right now. Check back soon — new jobs are posted regularly.'
          }
          action={
            hasActiveFilters ? (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-8 flex justify-center" ref={ref}>
            {loading && (
              <Button disabled variant="outline" className="w-full max-w-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more jobs...
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
