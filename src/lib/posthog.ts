import { PostHog } from 'posthog-node';

// Server-side PostHog is optional. Return null when it is not configured so
// callers can skip analytics instead of creating a client with an empty token.
export default function PostHogClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!key) {
    return null;
  }

  const posthogClient = new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
