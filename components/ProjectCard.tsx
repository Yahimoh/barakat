import Link from "next/link";
import { ArchFrame } from "./ornaments/ArchFrame";
import { Badge, StatusBadge } from "./ui/Badge";
import { formatCompact, formatPercent } from "@/lib/format";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const pct = project.goal > 0 ? project.committed / project.goal : 0;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-lg border border-muted/15 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div
        className="arch-thumb relative h-32 w-full"
        style={{
          background: `linear-gradient(160deg, hsl(${project.imageHue} 45% 78%) 0%, hsl(${(project.imageHue + 30) % 360} 35% 55%) 100%)`,
        }}
      >
        <ArchFrame className="absolute inset-0 h-full w-full text-emerald-deep" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs">
          <Badge tone="muted" className="bg-white/85 backdrop-blur">
            {project.category}
          </Badge>
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink group-hover:text-emerald">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{project.summary}</p>

        <div className="pt-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ivory">
            <div
              className="h-full rounded-full bg-emerald"
              style={{ width: `${Math.min(100, pct * 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs text-muted">
            <span className="font-medium text-ink">
              {formatCompact(project.committed)}{" "}
              <span className="text-muted">
                / {formatCompact(project.goal)}
              </span>
            </span>
            <span className="text-emerald">{formatPercent(pct)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
