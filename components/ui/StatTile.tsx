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
    navy: "text-lapis",
  }[tone];

  const bar = {
    emerald: "from-turquoise to-lapis",
    gold: "from-gold-light to-gold-deep",
    crimson: "from-crimson-light to-crimson",
    navy: "from-lapis-light to-lapis-deep",
  }[tone];

  return (
    <div className="group relative overflow-hidden rounded-lg border border-muted/15 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
      <div
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${bar}`}
      />
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className={["mt-1 text-2xl font-semibold", accent].join(" ")}>
        {value}
      </div>
      {hint ? <div className="mt-1 text-xs text-muted">{hint}</div> : null}
    </div>
  );
}
