import type { SVGProps } from "react";

/**
 * Muqarnas stalactite row — the nested pointed-arch niches seen above
 * mosque portals and at the base of minarets throughout Iran.
 * Use as a decorative bottom-edge on the hero panel.
 * (Masjid-e-Shah / Imam Mosque, Isfahan; Nasir-ol-Molk, Shiraz)
 */
export function MuqarnasRow({ className, ...rest }: SVGProps<SVGSVGElement>) {
  const W = 560;
  const H = 52;

  // Ogee (Persian pointed) arch: base at y=H, tip at y=H-h, with S-curve sides
  function arch(cx: number, halfW: number, h: number): string {
    const x0 = cx - halfW;
    const x1 = cx + halfW;
    const tip = H - h;
    const ctrl = h * 0.55;
    return (
      `M ${x0},${H} ` +
      `C ${x0},${H - ctrl} ${cx - halfW * 0.12},${tip} ${cx},${tip} ` +
      `C ${cx + halfW * 0.12},${tip} ${x1},${H - ctrl} ${x1},${H} Z`
    );
  }

  // Large arches: 7 × 80px = 560px
  const largeHW = 40;
  const largeH = 44;
  const largeCxs = [40, 120, 200, 280, 360, 440, 520];

  // Small niches nestled between large arches
  const smallHW = 20;
  const smallH = 26;
  const smallCxs = [80, 160, 240, 320, 400, 480];

  // Tiny accent niches at the very top of each large arch gap
  const tinyHW = 8;
  const tinyH = 12;
  const tinyCxs = [80, 160, 240, 320, 400, 480];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      {...rest}
    >
      <g>
        {/* Fills — depth shading */}
        <g fill="currentColor">
          {tinyCxs.map((cx) => (
            <path key={`tf-${cx}`} d={arch(cx, tinyHW, tinyH)} fillOpacity="0.04" />
          ))}
          {smallCxs.map((cx) => (
            <path key={`sf-${cx}`} d={arch(cx, smallHW, smallH)} fillOpacity="0.07" />
          ))}
          {largeCxs.map((cx) => (
            <path key={`lf-${cx}`} d={arch(cx, largeHW, largeH)} fillOpacity="0.12" />
          ))}
        </g>

        {/* Outline strokes */}
        <g fill="none" stroke="currentColor">
          {tinyCxs.map((cx) => (
            <path key={`ts-${cx}`} d={arch(cx, tinyHW, tinyH)} strokeWidth="0.5" strokeOpacity="0.35" />
          ))}
          {smallCxs.map((cx) => (
            <path key={`ss-${cx}`} d={arch(cx, smallHW, smallH)} strokeWidth="0.7" strokeOpacity="0.50" />
          ))}
          {largeCxs.map((cx) => (
            <path key={`ls-${cx}`} d={arch(cx, largeHW, largeH)} strokeWidth="0.9" strokeOpacity="0.70" />
          ))}
        </g>

        {/* Keystone dot at tip of each large arch */}
        {largeCxs.map((cx) => (
          <circle key={`dot-${cx}`} cx={cx} cy={H - largeH} r="1.8" fill="currentColor" fillOpacity="0.65" />
        ))}

        {/* Top baseline */}
        <line x1="0" y1="1" x2={W} y2="1" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" />
      </g>
    </svg>
  );
}
