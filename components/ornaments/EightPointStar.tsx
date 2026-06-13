import type { SVGProps } from "react";

/**
 * Ornate khatam-style eight-point star rosette — the Rub' al-Hizb motif
 * from Persian mosque tile-work and plaster carvings.
 * Two overlapping squares + inscribed octagon ring + inner star + center.
 * Driven by `currentColor`; add `animate-spin-slow` or `animate-twinkle`.
 */
export function EightPointStar({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  // Octagon ring vertex positions (radius 21 from center)
  const octR = 21;
  const octPts = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 - 90) * Math.PI) / 180;
    return `${+(octR * Math.cos(a)).toFixed(2)},${+(octR * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

  // 8 spoke accent dots (radius 26.5, at each star tip direction)
  const spokeR = 26.5;
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 - 90) * Math.PI) / 180;
    return {
      cx: +(spokeR * Math.cos(a)).toFixed(2),
      cy: +(spokeR * Math.sin(a)).toFixed(2),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <g transform="translate(50 50)">
        {/* Outer 8-pointed star (two 64×64 squares rotated 45°) */}
        <rect x="-32" y="-32" width="64" height="64" />
        <rect x="-32" y="-32" width="64" height="64" transform="rotate(45)" />

        {/* Inscribed octagon ring — marks the star's inner boundary */}
        <polygon
          points={octPts}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeOpacity="0.40"
        />

        {/* Spoke accent dots at each outer tip */}
        {spokes.map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="1.3" fillOpacity="0.45" />
        ))}

        {/* Inner 8-star (22×22, same rotation) */}
        <rect x="-11" y="-11" width="22" height="22" opacity="0.72" />
        <rect x="-11" y="-11" width="22" height="22" transform="rotate(45)" opacity="0.72" />

        {/* Center diamond */}
        <rect x="-4.5" y="-4.5" width="9" height="9" transform="rotate(45)" />

        {/* Center dot */}
        <circle r="2.8" />
      </g>
    </svg>
  );
}
