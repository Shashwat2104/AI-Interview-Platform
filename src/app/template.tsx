'use client';

import * as React from 'react';

/**
 * True once the app has hydrated in this browsing session. Route transitions
 * animate; the very first paint of any hard load does not, so the transition
 * can never delay the Largest Contentful Paint of the initial page.
 */
let hasHydratedOnce = false;

/**
 * Route transition shell. Every client-side navigation fades the new route in
 * (400ms, opacity only) while the outgoing route is replaced immediately — no
 * blocking, no scroll restoration games, and users who prefer reduced motion
 * see the new route instantly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = React.useState(() => hasHydratedOnce);

  React.useEffect(() => {
    hasHydratedOnce = true;
  }, []);

  return <div className={animate ? 'enter-fade' : undefined}>{children}</div>;
}
