import type { ReactNode } from "react";

export function StatTile({
  label,
  value,
  hint,
  tone = "emerald",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "emerald" | "gold" | "crimson" | "navy";
}) {
  const accent = {
    emerald: "text-emerald",
    gold: "text-gold-deep",
    crimson: "text-crimson",
    navy: "text-navy",
  }[tone];

  return (
    <div className="rounded-lg border border-muted/15 bg-white p-4 shadow-card">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className={["mt-1 text-2xl font-semibold", accent].join(" ")}>
        {value}
      </div>
      {hint ? <div className="mt-1 text-xs text-muted">{hint}</div> : null}
    </div>
  );
}
