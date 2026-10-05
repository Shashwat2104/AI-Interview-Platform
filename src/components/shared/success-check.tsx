/**
 * Animated success check: the ring draws first, then the check stroke.
 * Pure SVG + CSS (no JS), honors prefers-reduced-motion via globals.css.
 */
export function SuccessCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        className="ring-draw"
      />
      <path
        d="M30 52 L45 66 L72 38"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="check-draw"
      />
    </svg>
  );
}
