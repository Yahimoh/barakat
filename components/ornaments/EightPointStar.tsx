import type { SVGProps } from "react";

export function EightPointStar({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {/* Rub el hizb — two overlapping squares rotated 45° */}
      <g transform="translate(50 50)">
        <rect x="-30" y="-30" width="60" height="60" />
        <rect
          x="-30"
          y="-30"
          width="60"
          height="60"
          transform="rotate(45)"
        />
      </g>
    </svg>
  );
}
