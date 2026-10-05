import * as React from 'react';

/**
 * Hirelytics motion tokens — the JS mirror of the CSS custom properties in
 * `globals.css`. Use the CSS tokens whenever an effect can be expressed
 * declaratively; reach for these only when motion is coordinated in JS.
 */
export const MOTION = {
  duration: {
    /** Micro feedback: press, icon nudge. */
    instant: 90,
    /** Hover, focus, small state changes. */
    fast: 150,
    /** Component transitions: cards, menus, tabs. */
    normal: 250,
    /** Section entrances. */
    slow: 400,
    /** Storytelling moments: hero sequence, product demonstration. */
    story: 700,
  },
  /** Per-item offset for staggered groups. */
  stagger: 55,
  distance: { rise: 12, riseLg: 22 },
  ease: {
    standard: [0.2, 0, 0, 1],
    enter: [0.19, 1, 0.22, 1],
    exit: [0.4, 0, 1, 1],
    spring: [0.34, 1.28, 0.64, 1],
  },
} as const;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Synchronous preference check (safe during render guards and effects). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Tracks the reduced-motion preference; defaults to `false` during SSR. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return reduced;
}

/**
 * Fires once, when the element first approaches the viewport. Sections below
 * the fold use this to activate their entrance exactly when it can be seen.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '0px 0px -10% 0px'
) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

/**
 * Two-way visibility flag for continuous effects. Loops are paused whenever
 * the owning section leaves the viewport, so off-screen motion costs nothing.
 */
export function useLiveWhenVisible<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '180px 0px'
) {
  const ref = React.useRef<T | null>(null);
  const [live, setLive] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      rootMargin,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, live };
}

type PointerParallaxHandlers = {
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
};

/**
 * Writes normalized pointer coordinates (`--px` / `--py`, range -1..1) onto an
 * element so descendant layers can depth-shift with `calc()`. Updates are
 * rAF-batched, never trigger React renders, and switch off entirely on coarse
 * pointers or for users who prefer reduced motion.
 */
export function usePointerParallax<T extends HTMLElement = HTMLDivElement>(strength = 1) {
  const ref = React.useRef<T | null>(null);
  const frame = React.useRef(0);
  const enabled = React.useRef(false);

  React.useEffect(() => {
    enabled.current =
      !prefersReducedMotion() &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const handlers: PointerParallaxHandlers = {
    onPointerMove: (event) => {
      if (!enabled.current) return;
      const el = ref.current;
      if (!el) return;
      const x = event.clientX;
      const y = event.clientY;
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const rect = el.getBoundingClientRect();
        const px = ((x - rect.left) / rect.width) * 2 - 1;
        const py = ((y - rect.top) / rect.height) * 2 - 1;
        el.style.setProperty('--px', (px * strength).toFixed(3));
        el.style.setProperty('--py', (py * strength).toFixed(3));
      });
    },
    onPointerLeave: () => {
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    },
  };

  return { ref, handlers };
}
