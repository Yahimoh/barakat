import Link from "next/link";
import { ArchFrame } from "./ornaments/ArchFrame";
import { GirihPattern } from "./ornaments/GirihPattern";
import { Badge, StatusBadge } from "./ui/Badge";
import { formatCompact, formatPercent } from "@/lib/format";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const pct = project.goal > 0 ? project.committed / project.goal : 0;
  // Fold the stored hue into the mosque's cyan→cobalt band so every
  // thumbnail stays within the turquoise / lapis palette.
  const hue = 175 + (project.imageHue % 45);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block overflow-hidden rounded-lg border border-muted/15 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
    >
      <div
        className="arch-thumb relative h-32 w-full"
        style={{
          background: `linear-gradient(155deg, hsl(${hue} 55% 52%) 0%, hsl(${(hue + 25) % 360} 60% 30%) 100%)`,
        }}
      >
        {/* Girih tilework + ogee arch outline, like a glazed mihrab. */}
        <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-20" />
        <ArchFrame className="absolute inset-0 h-full w-full text-gold/70" />
        {/* Travelling gold sheen on hover. */}
        <div className="sheen-strip pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-sheen" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs">
          <Badge tone="muted" className="bg-white/85 capitalize backdrop-blur">
            {project.category}
          </Badge>
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-turquoise-deep">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{project.summary}</p>

        <div className="pt-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-turquoise/10">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-turquoise to-lapis"
              style={{ width: `${Math.min(100, pct * 100)}%` }}
            >
              <div className="sheen-strip absolute inset-0 animate-sheen rounded-full" />
            </div>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs text-muted">
            <span className="font-medium text-ink">
              {formatCompact(project.committed)}{" "}
              <span className="text-muted">
                / {formatCompact(project.goal)}
              </span>
            </span>
            <span className="font-semibold text-turquoise-deep">
              {formatPercent(pct)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
