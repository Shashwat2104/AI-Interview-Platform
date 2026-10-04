'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react';

import { getQueryClient } from '@/lib/query-client';

// DevTools are heavy (~800KB) and only needed in development.
// Using next/dynamic ensures the import is tree-shaken out of the production bundle entirely.
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
  {
    ssr: false,
    loading: () => null,
  }
);

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  // Devtools are now loaded via next/dynamic (ssr:false handles hydration mismatch),
  // and are only bundled in development builds. No mounted state check needed.
  // HydrationBoundary + dehydrate are server-only utilities — do NOT use in a client component.
  // QueryClientProvider handles client-side hydration natively in TanStack Query v5.
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
