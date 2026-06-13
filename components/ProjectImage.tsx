import type { ReactNode } from "react";
import { GirihPattern } from "./ornaments/GirihPattern";
import { ArchFrame } from "./ornaments/ArchFrame";
import type { ProjectCategory } from "@/types";

/**
 * Project cover art. Instead of a bare gradient, each project gets a flat
 * illustrated scene that matches its category, drawn in the mosque palette
 * over a hue-tinted sky. If a real photo URL is supplied via `image`, it is
 * used instead — so photography can be dropped in later with no other changes.
 */
export type SceneKey =
  | "agriculture"
  | "crafts"
  | "energy"
  | "tech"
  | "real-estate"
  | "community";

const GOLD = "#ECC971";
const GOLD_D = "#D4A537";
const IVORY = "#F6F1E4";
const DEEP = "#071F40";

export function sceneForCategory(category: ProjectCategory): SceneKey {
  return category;
}

export function ProjectImage({
  scene,
  hue,
  image,
  className = "",
  children,
}: {
  scene: SceneKey;
  hue: number;
  image?: string;
  className?: string;
  children?: ReactNode;
}) {
  // Fold the stored hue into the cyan→cobalt band so every sky stays on-palette.
  const h = 175 + (hue % 45);
  const background = `linear-gradient(160deg, hsl(${h} 60% 52%) 0%, hsl(${(h + 28) % 360} 65% 26%) 100%)`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={image ? undefined : { background }}
    >
      {image ? (
        // Cover is decorative — the card/page always renders the title as text.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-[0.12]" />
          <svg
            viewBox="0 0 120 72"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <Scene scene={scene} h={h} />
          </svg>
        </>
      )}
      <ArchFrame className="absolute inset-0 h-full w-full text-gold/60" />
      {children}
    </div>
  );
}

function Sun({ cx = 99, cy = 17, r = 8.5 }: { cx?: number; cy?: number; r?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    const x1 = cx + Math.cos(a) * (r + 2.5);
    const y1 = cy + Math.sin(a) * (r + 2.5);
    const x2 = cx + Math.cos(a) * (r + 6.5);
    const y2 = cy + Math.sin(a) * (r + 6.5);
    return (
      <line
        key={i}
        x1={x1.toFixed(1)}
        y1={y1.toFixed(1)}
        x2={x2.toFixed(1)}
        y2={y2.toFixed(1)}
        stroke={GOLD}
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    );
  });
  return (
    <g>
      {rays}
      <circle cx={cx} cy={cy} r={r} fill={GOLD} fillOpacity="0.9" />
    </g>
  );
}

function Scene({ scene, h }: { scene: SceneKey; h: number }) {
  switch (scene) {
    case "agriculture":
      return (
        <g>
          <Sun cx={99} cy={16} r={8} />
          {/* rolling hills */}
          <path d="M0 50 Q40 38 78 47 T120 44 L120 72 L0 72 Z" fill={DEEP} fillOpacity="0.28" />
          <path d="M0 60 Q44 49 120 58 L120 72 L0 72 Z" fill={DEEP} fillOpacity="0.45" />
          {/* crop rows + sprouts on the front hill */}
          {Array.from({ length: 9 }, (_, i) => {
            const x = 10 + i * 12;
            return (
              <g key={i} stroke={GOLD} strokeOpacity="0.7" strokeWidth="1" strokeLinecap="round">
                <line x1={x} y1="66" x2={x} y2="60" />
                <path d={`M${x} 61 q-2.4 -1.6 -3.4 1`} fill="none" />
                <path d={`M${x} 61 q2.4 -1.6 3.4 1`} fill="none" />
              </g>
            );
          })}
        </g>
      );
    case "energy":
      return (
        <g>
          <Sun cx={26} cy={18} r={9} />
          {/* solar panels on posts */}
          {[14, 52, 90].map((x, i) => (
            <g key={i}>
              <line x1={x + 8} y1="58" x2={x + 8} y2="66" stroke={DEEP} strokeOpacity="0.5" strokeWidth="1.6" />
              <g transform={`translate(${x} 44) skewX(-12)`}>
                <rect width="22" height="14" rx="1" fill={DEEP} fillOpacity="0.5" stroke={GOLD} strokeOpacity="0.7" strokeWidth="0.8" />
                <line x1="0" y1="7" x2="22" y2="7" stroke={GOLD} strokeOpacity="0.45" strokeWidth="0.6" />
                <line x1="7.3" y1="0" x2="7.3" y2="14" stroke={GOLD} strokeOpacity="0.45" strokeWidth="0.6" />
                <line x1="14.6" y1="0" x2="14.6" y2="14" stroke={GOLD} strokeOpacity="0.45" strokeWidth="0.6" />
              </g>
            </g>
          ))}
          <line x1="0" y1="66" x2="120" y2="66" stroke={DEEP} strokeOpacity="0.4" strokeWidth="1.2" />
        </g>
      );
    case "tech":
      return (
        <g>
          {/* network dots */}
          {[[20, 16], [40, 26], [100, 18], [88, 34]].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2="60" y2="30" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.7" />
              <circle cx={x} cy={y} r="2.2" fill={GOLD} fillOpacity="0.8" />
            </g>
          ))}
          {/* device / app window */}
          <rect x="44" y="30" width="32" height="34" rx="3" fill={IVORY} fillOpacity="0.92" />
          <rect x="44" y="30" width="32" height="7" rx="3" fill={GOLD_D} fillOpacity="0.85" />
          <circle cx="48" cy="33.5" r="1" fill={IVORY} />
          {/* little bar chart inside */}
          <rect x="48" y="52" width="4" height="8" rx="1" fill="#17A6B8" />
          <rect x="55" y="47" width="4" height="13" rx="1" fill="#1E5BA8" />
          <rect x="62" y="43" width="4" height="17" rx="1" fill="#17A6B8" />
          <rect x="69" y="49" width="4" height="11" rx="1" fill="#1E5BA8" />
        </g>
      );
    case "real-estate":
    case "community":
      return (
        <g>
          {/* crescent */}
          <g transform="translate(99 16)">
            <circle r="7" fill={GOLD} fillOpacity="0.9" />
            {/* cutout matches the gradient's bright top stop where the crescent sits */}
            <circle cx="2.6" cy="-1.5" r="6" fill={`hsl(${h} 60% 52%)`} />
          </g>
          <line x1="0" y1="64" x2="120" y2="64" stroke={DEEP} strokeOpacity="0.4" strokeWidth="1.2" />
          {/* side blocks */}
          <g fill={DEEP} fillOpacity="0.45" stroke={GOLD} strokeOpacity="0.55" strokeWidth="0.7">
            <rect x="20" y="44" width="20" height="20" />
            <rect x="80" y="44" width="20" height="20" />
          </g>
          {/* central block with dome */}
          <rect x="44" y="34" width="32" height="30" fill={DEEP} fillOpacity="0.55" stroke={GOLD} strokeOpacity="0.6" strokeWidth="0.8" />
          <path d="M44 34 Q60 18 76 34 Z" fill={DEEP} fillOpacity="0.6" stroke={GOLD} strokeOpacity="0.7" strokeWidth="0.9" />
          <line x1="60" y1="20" x2="60" y2="14" stroke={GOLD} strokeOpacity="0.8" strokeWidth="1" />
          <circle cx="60" cy="13" r="1.4" fill={GOLD} />
          {/* arched door + windows */}
          <path d="M55 64 L55 50 Q60 44 65 50 L65 64 Z" fill={GOLD} fillOpacity="0.28" stroke={GOLD} strokeOpacity="0.7" strokeWidth="0.7" />
          <path d="M26 58 L26 50 Q30 46 34 50 L34 58 Z" fill={GOLD} fillOpacity="0.22" />
          <path d="M86 58 L86 50 Q90 46 94 50 L94 58 Z" fill={GOLD} fillOpacity="0.22" />
        </g>
      );
    case "crafts":
    default:
      return (
        <g>
          {/* mihrab niche */}
          <path
            d="M40 66 L40 36 Q60 12 80 36 L80 66 Z"
            fill={DEEP}
            fillOpacity="0.4"
            stroke={GOLD}
            strokeOpacity="0.7"
            strokeWidth="1"
          />
          {/* hanging lamp */}
          <line x1="60" y1="20" x2="60" y2="30" stroke={GOLD} strokeOpacity="0.7" strokeWidth="0.8" />
          <circle cx="60" cy="33" r="3" fill={GOLD} fillOpacity="0.85" />
          {/* eight-point tile star inside the niche */}
          <g transform="translate(60 50)" fill={GOLD} fillOpacity="0.85">
            <rect x="-9" y="-9" width="18" height="18" />
            <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" />
            <circle r="3" fill={DEEP} fillOpacity="0.55" />
          </g>
        </g>
      );
  }
}
