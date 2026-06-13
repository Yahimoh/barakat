import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { StatTile } from "@/components/ui/StatTile";
import { getInvestor, loadValidatedProjects, getProjectTitle } from "@/lib/data";
import { formatCompact, formatCurrency, formatDate } from "@/lib/format";

export default function InvestorPage() {
  const investor = getInvestor();
  const validated = loadValidatedProjects();

  const totalCommitted = investor.commitments.reduce(
    (s, c) => s + c.amount,
    0
  );
  const activeProjects = new Set(investor.commitments.map((c) => c.projectId))
    .size;

  return (
    <div className="container-page space-y-8 py-8">
      <header>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
          Welcome back, {investor.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Joined {formatDate(investor.joinedAt)}
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          label="Total committed"
          value={formatCurrency(totalCommitted)}
          tone="emerald"
        />
        <StatTile
          label="Active commitments"
          value={investor.commitments.length}
          tone="navy"
        />
        <StatTile
          label="Projects backed"
          value={activeProjects}
          tone="gold"
        />
        <StatTile
          label="Available to browse"
          value={formatCompact(
            validated.reduce((s, p) => s + (p.goal - p.committed), 0)
          )}
          hint="across validated projects"
        />
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink">
          Your commitments
        </h2>
        <div className="mt-3 overflow-hidden rounded-lg border border-muted/15 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-ivory text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-2 text-start">Project</th>
                <th className="px-4 py-2 text-end">Amount</th>
                <th className="hidden px-4 py-2 text-start sm:table-cell">
                  Date
                </th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {investor.commitments.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-muted/10 hover:bg-ivory/50"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/projects/${c.projectId}`}
                      className="font-medium text-ink hover:text-emerald"
                    >
                      {getProjectTitle(c.projectId)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-end font-semibold text-emerald">
                    {formatCurrency(c.amount)}
                  </td>
                  <td className="hidden px-4 py-3 text-muted sm:table-cell">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <Link
                      href={`/projects/${c.projectId}`}
                      className="text-xs text-emerald hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">
            Browse validated projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-emerald hover:underline"
          >
            All projects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {validated.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
