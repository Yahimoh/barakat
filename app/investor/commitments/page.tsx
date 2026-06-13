import Link from "next/link";
import { getInvestor, getProjectTitle } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";

export default function CommitmentsPage() {
  const investor = getInvestor();

  return (
    <div className="container-page space-y-6 py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            Commitment history
          </h1>
          <p className="mt-1 text-sm text-muted">
            All commitments attributed to {investor.name}.
          </p>
        </div>
        <Link
          href="/investor"
          className="text-sm font-medium text-emerald hover:underline"
        >
          ← Back to dashboard
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border border-muted/15 bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-ivory text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-2 text-start">Project</th>
              <th className="px-4 py-2 text-end">Amount</th>
              <th className="px-4 py-2 text-start">Date</th>
              <th className="px-4 py-2 text-start">Reference</th>
            </tr>
          </thead>
          <tbody>
            {investor.commitments.map((c) => (
              <tr key={c.id} className="border-t border-muted/10">
                <td className="px-4 py-3 font-medium text-ink">
                  {getProjectTitle(c.projectId)}
                </td>
                <td className="px-4 py-3 text-end font-semibold text-emerald">
                  {formatCurrency(c.amount)}
                </td>
                <td className="px-4 py-3 text-muted">
                  {formatDate(c.createdAt)}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted">
                  {c.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
