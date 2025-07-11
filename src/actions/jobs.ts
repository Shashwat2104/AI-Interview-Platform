'use server';

import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/models/job';

export type JobFilter = {
  search?: string;
  skills?: string[];
  location?: string;
  page?: number;
  limit?: number;
};

export async function getJobs({
  search = '',
  skills = [],
  location = '',
  page = 1,
  limit = 10,
}: JobFilter) {
  try {
    await connectToDatabase();

    // Build query based on filters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isActive: true };

    // Search in title, description and company name
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by skills
    if (skills.length > 0) {
      query.skills = { $in: skills };
    }

    // Filter by location
    if (location) {
      query.location = location;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch jobs with pagination
    const jobs = await Job.find(query)
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit + 1) // Get one extra to check if there are more results
      .lean();

    // Check if there are more results for the next page
    const hasMore = jobs.length > limit;
    const paginatedJobs = hasMore ? jobs.slice(0, limit) : jobs;

    // Serialize MongoDB documents for passing to client components
    const serializedJobs = JSON.parse(JSON.stringify(paginatedJobs));

    return {
      jobs: serializedJobs,
      hasMore,
      nextPage: hasMore ? page + 1 : null,
    };
  } catch (error: unknown) {
    console.error('Error in getJobs:', {
      error,
      filter: { search, skills, location, page, limit },
    });
    throw new Error(
      `Failed to fetch jobs in getJobs (filter: ${JSON.stringify({ search, skills, location, page, limit })}): ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getJobById(id: string) {
  try {
    await connectToDatabase();
    console.log('Fetching job with ID:', id);

    const job = await Job.findOne({ _id: id }).lean();

    if (!job) {
      throw new Error(`Job not found in getJobById (id: ${id})`);
    }

    // Serialize MongoDB document for passing to client components
    return JSON.parse(JSON.stringify(job));
  } catch (error: unknown) {
    console.error('Error in getJobById:', { error, id });
    throw new Error(
      `Failed to fetch job in getJobById (id: ${id}): ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getJobByUrlId(id: string) {
  try {
    await connectToDatabase();
    console.log('Fetching job with ID:', id);

    const job = await Job.findOne({ urlId: id }).lean();

    if (!job) {
      throw new Error(`Job not found in getJobByUrlId (urlId: ${id})`);
    }

    // Serialize MongoDB document for passing to client components
    return JSON.parse(JSON.stringify(job));
  } catch (error: unknown) {
    console.error('Error in getJobByUrlId:', { error, urlId: id });
    throw new Error(
      `Failed to fetch job in getJobByUrlId (urlId: ${id}): ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
