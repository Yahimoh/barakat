"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { loadValidatedProjects } from "@/lib/data";
import type { Project, ProjectCategory } from "@/types";

const categories: ProjectCategory[] = [
  "real-estate",
  "tech",
  "agriculture",
  "energy",
  "crafts",
];

export function ProjectsBrowser({
  initial,
}: {
  initial: Project[];
}) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const projects = useMemo(() => {
    const list = filter === "all" ? initial : initial.filter((p) => p.category === filter);
    return [...list].sort(
      (a, b) => b.committed / b.goal - a.committed / a.goal
    );
  }, [initial, filter]);

  return (
    <div className="container-page space-y-6 py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            Validated projects
          </h1>
          <p className="mt-1 text-sm text-muted">
            {projects.length} open for commitment
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip
            key={c}
            active={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </Chip>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="rounded-lg border border-muted/20 bg-white p-8 text-center text-muted">
          No projects match this filter.
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3.5 py-1 text-xs capitalize transition-all",
        active
          ? "border-transparent bg-gradient-to-br from-turquoise to-lapis text-ivory shadow-sm"
          : "border-muted/30 bg-white text-ink hover:border-turquoise/50 hover:text-turquoise-deep",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
