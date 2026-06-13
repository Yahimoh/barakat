import type { SVGProps } from "react";

/**
 * An eight-fold girih (Islamic geometric) lattice built from interlaced
 * 8-pointed stars on a square grid — the motif that tiles the spandrels of
 * Persian mosques. Tiles seamlessly as a background; keep it at low opacity
 * behind hero / feature panels.
 *
 * The star path is defined once at the origin and reused at the tile centre,
 * its four corners, and four edge midpoints so the pattern repeats cleanly.
 */

// 8-pointed star, 16 vertices alternating outer radius 20 / inner radius 8.
const STAR_8 =
  "M20 0 L7.39 3.06 L14.14 14.14 L3.06 7.39 L0 20 L-3.06 7.39 " +
  "L-14.14 14.14 L-7.39 3.06 L-20 0 L-7.39 -3.06 L-14.14 -14.14 " +
  "L-3.06 -7.39 L0 -20 L3.06 -7.39 L14.14 -14.14 L7.39 -3.06 Z";

export function GirihPattern({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      {...rest}
    >
      <defs>
        <path id="girih-star" d={STAR_8} />
        <pattern
          id="girih-tile"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          >
            {/* Connecting lattice — a rotated square joining the stars. */}
            <path d="M50 0 L100 50 L50 100 L0 50 Z" strokeWidth="0.8" />
            <path d="M0 0 L50 50 L100 0 M0 100 L50 50 L100 100" strokeWidth="0.6" />

            {/* Full star at the tile centre. */}
            <use href="#girih-star" transform="translate(50 50)" />

            {/* Edge-midpoint stars (shared with the neighbouring tile). */}
            <use href="#girih-star" transform="translate(50 0) scale(0.7)" />
            <use href="#girih-star" transform="translate(50 100) scale(0.7)" />
            <use href="#girih-star" transform="translate(0 50) scale(0.7)" />
            <use href="#girih-star" transform="translate(100 50) scale(0.7)" />

            {/* Corner stars (shared with three neighbours). */}
            <use href="#girih-star" transform="translate(0 0) scale(0.7)" />
            <use href="#girih-star" transform="translate(100 0) scale(0.7)" />
            <use href="#girih-star" transform="translate(0 100) scale(0.7)" />
            <use href="#girih-star" transform="translate(100 100) scale(0.7)" />
          </g>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#girih-tile)" />
    </svg>
  );
}
