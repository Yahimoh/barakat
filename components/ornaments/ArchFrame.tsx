import type { SVGProps } from "react";

/**
 * Pointed (ogee) arch frame used as a card thumbnail. The viewBox is sized so
 * a square <div> wrapping this SVG renders as a pointed arch.
 */
export function ArchFrame({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 130"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M2 128 L2 50 Q2 2 50 2 Q98 2 98 50 L98 128 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
