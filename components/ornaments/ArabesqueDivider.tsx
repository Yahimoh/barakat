import type { SVGProps } from "react";

/**
 * A thin arabesque divider — symmetric tendrils flanking a central
 * eight-point star, with small bosses along the rule. Use above footers or
 * between major page sections. Driven by `currentColor` (use gold).
 */
export function ArabesqueDivider({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 14"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
      >
        {/* Baseline rules fading toward the centre star. */}
        <path d="M2 7 L78 7" fill="none" />
        <path d="M122 7 L198 7" fill="none" />

        {/* Tendrils curling off the rule. */}
        <path d="M78 7 q8 -6 16 0" fill="none" />
        <path d="M122 7 q-8 -6 -16 0" fill="none" />
        <path d="M60 7 q5 5 10 0" fill="none" />
        <path d="M140 7 q-5 5 -10 0" fill="none" />

        {/* Bosses. */}
        <circle cx="40" cy="7" r="1.3" stroke="none" />
        <circle cx="160" cy="7" r="1.3" stroke="none" />

        {/* Central eight-point star. */}
        <g transform="translate(100 7)" stroke="none">
          <rect x="-4.5" y="-4.5" width="9" height="9" />
          <rect x="-4.5" y="-4.5" width="9" height="9" transform="rotate(45)" />
        </g>
      </g>
    </svg>
  );
}
