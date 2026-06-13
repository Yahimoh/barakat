import Link from "next/link";
import { StatTile } from "@/components/ui/StatTile";
import { StatusBadge } from "@/components/ui/Badge";
import { getManager, loadManagerProjects } from "@/lib/data";
import { formatCompact, formatCurrency, formatPercent } from "@/lib/format";

export default function ManagerPage() {
  const manager = getManager();
  const projects = loadManagerProjects(manager.id);

  const validated = projects.filter((p) => p.status === "validated").length;
  const pending = projects.filter((p) => p.status === "pending").length;
  const totalCommitted = projects.reduce((s, p) => s + p.committed, 0);

  return (
    <div className="container-page space-y-8 py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            {manager.name}
          </h1>
          <p className="mt-1 text-sm text-muted">{manager.bio}</p>
        </div>
        <Link
          href="/manager/new"
          className="inline-flex h-11 items-center justify-center rounded-md bg-emerald px-5 text-sm font-medium text-ivory hover:bg-emerald-light"
        >
          + New project
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="My projects" value={projects.length} tone="emerald" />
        <StatTile label="Validated" value={validated} tone="gold" />
        <StatTile label="Pending" value={pending} tone="crimson" />
        <StatTile
          label="Total committed"
          value={formatCurrency(totalCommitted)}
          tone="navy"
        />
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink">
          My projects
        </h2>
        <div className="mt-3 overflow-hidden rounded-lg border border-muted/15 bg-white shadow-card">
          {/* Desktop table */}
          <table className="hidden w-full text-sm md:table">
            <thead className="bg-ivory text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-2 text-start">Project</th>
                <th className="px-4 py-2 text-start">Category</th>
                <th className="px-4 py-2 text-start">Status</th>
                <th className="px-4 py-2 text-end">Committed / Goal</th>
                <th className="px-4 py-2 text-end">%</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const pct = p.goal > 0 ? p.committed / p.goal : 0;
                return (
                  <tr key={p.id} className="border-t border-muted/10">
                    <td className="px-4 py-3 font-medium text-ink">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 text-muted">{p.category}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-end">
                      <span className="font-semibold text-emerald">
                        {formatCompact(p.committed)}
                      </span>{" "}
                      <span className="text-muted">
                        / {formatCompact(p.goal)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-end font-medium text-ink">
                      {formatPercent(pct)}
                    </td>
                    <td className="px-4 py-3 text-end">
                      <Link
                        href={`/manager/${p.id}`}
                        className="text-xs font-medium text-emerald hover:underline"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Mobile cards */}
          <ul className="divide-y divide-muted/10 md:hidden">
            {projects.map((p) => {
              const pct = p.goal > 0 ? p.committed / p.goal : 0;
              return (
                <li key={p.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-ink">{p.title}</div>
                      <div className="mt-0.5 text-xs text-muted">
                        {p.category}
                      </div>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ivory">
                    <div
                      className="h-full bg-emerald"
                      style={{ width: `${Math.min(100, pct * 100)}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs text-muted">
                    <span>
                      {formatCompact(p.committed)} / {formatCompact(p.goal)}
                    </span>
                    <span className="font-medium text-emerald">
                      {formatPercent(pct)}
                    </span>
                  </div>
                  <div className="mt-3 text-end">
                    <Link
                      href={`/manager/${p.id}`}
                      className="text-xs font-medium text-emerald hover:underline"
                    >
                      Edit →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
