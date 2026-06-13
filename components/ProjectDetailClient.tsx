"use client";

import { useState } from "react";
import Link from "next/link";
import { useRole } from "@/lib/role";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { StatTile } from "@/components/ui/StatTile";
import { ProjectImage, sceneForCategory } from "@/components/ProjectImage";
import { PledgeDialog } from "@/components/PledgeDialog";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
} from "@/lib/format";
import type { Project } from "@/types";

export function ProjectDetailClient({ initial }: { initial: Project }) {
  const [role] = useRole();
  const [project, setProject] = useState(initial);

  const pct = project.goal > 0 ? project.committed / project.goal : 0;

  function commit(amount: number) {
    setProject((p) => ({
      ...p,
      committed: p.committed + amount,
      backers: p.backers + 1,
    }));
  }

  return (
    <div className="container-page grid gap-6 py-6 lg:grid-cols-3 lg:py-10">
      {/* Main column */}
      <article className="space-y-6 lg:col-span-2">
        <ProjectImage
          scene={sceneForCategory(project.category)}
          hue={project.imageHue}
          image={project.image}
          className="arch-thumb h-44 w-full md:h-56"
        />

        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="muted">{project.category}</Badge>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            {project.title}
          </h1>
          <p className="text-base text-muted">{project.summary}</p>
        </header>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatTile label="Goal" value={formatCurrency(project.goal)} />
          <StatTile
            label="Committed"
            value={formatCurrency(project.committed)}
            tone="gold"
          />
          <StatTile label="Backers" value={project.backers} tone="navy" />
          <StatTile
            label="Funded"
            value={formatPercent(pct)}
            tone="emerald"
            hint={`${formatCompact(project.goal - project.committed)} remaining`}
          />
        </div>

        <div className="rounded-lg border border-muted/15 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">
            About this project
          </h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/80">
            {project.description}
          </p>
        </div>
      </article>

      {/* CTA column */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-lg border border-muted/15 bg-white p-5 shadow-card">
          {role === "investor" ? (
            <PledgeDialog
              goal={project.goal}
              committed={project.committed}
              projectTitle={project.title}
              onCommit={commit}
            />
          ) : role === "manager" ? (
            <div className="space-y-2">
              <p className="text-sm text-muted">
                You're viewing this as a project manager.
              </p>
              <Link
                href={`/manager/${project.id}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald px-5 text-sm font-medium text-ivory hover:bg-emerald-light"
              >
                Edit this project
              </Link>
            </div>
          ) : (
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted">
                Switch to the <span className="font-medium text-emerald">Investor</span>{" "}
                role to commit funds.
              </p>
              <p className="text-xs text-muted">
                This template doesn't require sign-in — the role switcher is in
                the header.
              </p>
            </div>
          )}

          <div className="mt-4 border-t border-muted/15 pt-4 text-xs text-muted">
            <div className="flex items-center justify-between">
              <span>Created</span>
              <span className="text-ink">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span>Project ID</span>
              <span className="font-mono text-ink">{project.id}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
