import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Reduce legacy polyfill overhead by targeting modern browsers.
  // Next.js 15 ships modern JS by default; this confirms the target.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  serverExternalPackages: ['pdf-parse'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hirelytics.t3.storage.dev',
      },
      {
        protocol: 'https',
        hostname: 'eu2.contabostorage.com',
      },
      {
        protocol: 'https',
        hostname: 's3.eu-north-1.amazonaws.com',
        pathname: '/shashwat-ai-bot/**',
      },
      {
        protocol: 'https',
        hostname: 'shashwat-ai-bot.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

// Use next-intl plugin without additional configuration
// The middleware will handle the locale detection
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
