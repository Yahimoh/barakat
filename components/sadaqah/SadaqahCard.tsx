"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { ArchFrame } from "@/components/ornaments/ArchFrame";
import { formatCompact, formatPercent } from "@/lib/format";
import type { SadaqahProject } from "@/types";

export function SadaqahCard({ project }: { project: SadaqahProject }) {
  const [raised, setRaised] = useState(project.raised);
  const [donors, setDonors] = useState(project.donors);
  const pct = project.goal > 0 ? raised / project.goal : 0;
  const hue = 175 + (project.imageHue % 45);

  function donate() {
    setRaised((r) => Math.min(project.goal, r + 50));
    setDonors((d) => d + 1);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-muted/15 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
      <div
        className="relative h-28"
        style={{
          background: `linear-gradient(155deg, hsl(${hue} 55% 50%), hsl(${(hue + 25) % 360} 60% 28%))`,
        }}
      >
        <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-20" />
        <ArchFrame className="absolute inset-0 h-full w-full text-gold/60" />
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-lapis-deep backdrop-blur">
          via LaunchGood
        </span>
        <Badge tone="muted" className="absolute bottom-2 left-2 bg-white/85 backdrop-blur">
          {project.category}
        </Badge>
      </div>

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
