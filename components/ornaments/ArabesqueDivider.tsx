import type { SVGProps } from "react";

/**
 * A thin arabesque divider — a horizontal line of repeating geometric
 * leaves. Use above footers or between major page sections.
 */
export function ArabesqueDivider({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 12"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <g fill="currentColor">
        <path d="M0 6 L40 6" stroke="currentColor" strokeWidth="0.6" />
        <path d="M160 6 L200 6" stroke="currentColor" strokeWidth="0.6" />
        <g transform="translate(100 6)">
          <path d="M-40 0 L-20 0" stroke="currentColor" strokeWidth="0.6" />
          <path d="M20 0 L40 0" stroke="currentColor" strokeWidth="0.6" />
          <path d="M-10 0 L-5 -3 L0 0 L5 -3 L10 0 L5 3 L0 0 L-5 3 Z" />
          <circle cx="-15" cy="0" r="1.2" />
          <circle cx="15" cy="0" r="1.2" />
        </g>
      </g>
    </svg>
  );
}
