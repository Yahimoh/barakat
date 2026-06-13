import type { ReactNode } from "react";

type Tone = "emerald" | "turquoise" | "lapis" | "gold" | "crimson" | "navy" | "muted";

const tones: Record<Tone, string> = {
  emerald: "bg-emerald/10 text-emerald-deep border-emerald/30",
  turquoise: "bg-turquoise/10 text-turquoise-deep border-turquoise/30",
  lapis: "bg-lapis/10 text-lapis-deep border-lapis/30",
  gold: "bg-gold/15 text-gold-deep border-gold/40",
  crimson: "bg-crimson/10 text-crimson border-crimson/30",
  navy: "bg-navy/10 text-navy border-navy/30",
  muted: "bg-muted/10 text-muted border-muted/30",
};

export function Badge({
  tone = "emerald",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5",
        "text-xs font-medium",
        tones[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "validated":
      return <Badge tone="emerald">● Validated</Badge>;
    case "pending":
      return <Badge tone="gold">● Pending review</Badge>;
    case "draft":
      return <Badge tone="muted">● Draft</Badge>;
    case "closed":
      return <Badge tone="navy">● Closed</Badge>;
    default:
      return <Badge tone="muted">{status}</Badge>;
  }
}
