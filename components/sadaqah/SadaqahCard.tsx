"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectImage, type SceneKey } from "@/components/ProjectImage";
import { formatCompact, formatPercent } from "@/lib/format";
import type { SadaqahProject } from "@/types";

const SADAQAH_SCENE: Record<string, SceneKey> = {
  Families: "community",
  Children: "community",
  Community: "real-estate",
  Food: "agriculture",
  Water: "energy",
};

export function SadaqahCard({ project }: { project: SadaqahProject }) {
  const [raised, setRaised] = useState(project.raised);
  const [donors, setDonors] = useState(project.donors);
  const pct = project.goal > 0 ? raised / project.goal : 0;

  function donate() {
    setRaised((r) => Math.min(project.goal, r + 50));
    setDonors((d) => d + 1);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-muted/15 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
      <ProjectImage
        scene={SADAQAH_SCENE[project.category] ?? "community"}
        hue={project.imageHue}
        image={project.image}
        className="h-28"
      >
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-lapis-deep backdrop-blur">
          via LaunchGood
        </span>
        <Badge tone="muted" className="absolute bottom-2 left-2 bg-white/85 backdrop-blur">
          {project.category}
        </Badge>
      </ProjectImage>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {project.title}
        </h3>
        <p className="mt-1 flex-1 text-sm text-muted">{project.summary}</p>

        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-turquoise/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-turquoise to-lapis transition-all duration-500"
              style={{ width: `${Math.min(100, pct * 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs text-muted">
            <span className="font-medium text-ink">
              {formatCompact(raised)}{" "}
              <span className="text-muted">/ {formatCompact(project.goal)}</span>
            </span>
            <span className="font-semibold text-turquoise-deep">
              {formatPercent(pct)}
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-muted">{donors} donors</div>
        </div>

        <Button size="sm" fullWidth className="mt-3" onClick={donate}>
          Give Sadaqah
        </Button>
      </div>
    </div>
  );
}
