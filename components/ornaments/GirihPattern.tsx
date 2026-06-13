import type { SVGProps } from "react";

/**
 * A simple tileable girih (Islamic geometric) pattern. Tiles seamlessly
 * when used as a CSS background. Keep it subtle — meant to be rendered
 * at low opacity behind hero sections.
 */
export function GirihPattern({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <pattern
          id="girih-tile"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="miter"
          >
            <path d="M40 0 L80 40 L40 80 L0 40 Z" />
            <path d="M0 0 L40 40 L80 0" />
            <path d="M0 80 L40 40 L80 80" />
            <path d="M40 40 L40 0" />
            <path d="M40 40 L40 80" />
            <circle cx="40" cy="40" r="6" />
          </g>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#girih-tile)" />
    </svg>
  );
}
