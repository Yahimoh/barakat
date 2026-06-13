import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import { StatTile } from "@/components/ui/StatTile";
import { ProjectForm } from "@/components/ProjectForm";
import { getProject } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProject(params.id);
  if (!project) notFound();

  const pct = project.goal > 0 ? project.committed / project.goal : 0;

  return (
    <div className="container-page max-w-3xl space-y-6 py-8">
      <header>
        <Link
          href="/manager"
          className="text-sm font-medium text-emerald hover:underline"
        >
          ← Back to dashboard
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            {project.title}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1 text-sm text-muted">{project.summary}</p>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          label="Goal"
          value={formatCurrency(project.goal)}
          tone="emerald"
        />
        <StatTile
          label="Committed"
          value={formatCurrency(project.committed)}
          tone="gold"
        />
        <StatTile label="Backers" value={project.backers} tone="navy" />
        <StatTile
          label="Funded"
          value={formatPercent(pct)}
          tone="crimson"
        />
      </section>

      <section className="rounded-lg border border-muted/15 bg-white p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold text-ink">
          Edit project
        </h2>
        <p className="mt-1 text-sm text-muted">
          Changes are saved locally in this template build.
        </p>
        <div className="mt-4">
          <ProjectForm mode="edit" initial={project} />
        </div>
      </section>
    </div>
  );
}
