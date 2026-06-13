import { formatCurrency, formatPercent } from "@/lib/format";
import type { PoolMember } from "@/types";

const SEGMENT_FILLS = ["#17A6B8", "#1E5BA8", "#0E7C8B", "#3F7FD0", "#0A4E5A"];

/**
 * Pot composition as a 100%-stacked bar — each member's segment width is
 * their share of the pot, which is exactly their voting weight. The current
 * user's segment and row are flagged in gold.
 */
export function MemberShareBar({
  members,
  youId,
}: {
  members: PoolMember[];
  youId: string;
}) {
  const pot = members.reduce((s, m) => s + m.contribution, 0);
  // Largest contributor first — reads as a ranking of influence.
  const ordered = [...members].sort((a, b) => b.contribution - a.contribution);

  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full ring-1 ring-muted/15">
        {ordered.map((m, i) => {
          const share = pot > 0 ? m.contribution / pot : 0;
          const isYou = m.id === youId;
          return (
            <div
              key={m.id}
              title={`${m.name} · ${formatPercent(share)}`}
              style={{
                width: `${share * 100}%`,
                background: isYou ? "#D4A537" : SEGMENT_FILLS[i % SEGMENT_FILLS.length],
              }}
              className="h-full transition-all"
            />
          );
        })}
      </div>

      <ul className="mt-4 space-y-2">
        {ordered.map((m, i) => {
          const share = pot > 0 ? m.contribution / pot : 0;
          const isYou = m.id === youId;
          return (
            <li
              key={m.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: isYou
                      ? "#D4A537"
                      : SEGMENT_FILLS[i % SEGMENT_FILLS.length],
                  }}
                />
                <span className={isYou ? "font-semibold text-ink" : "text-ink"}>
                  {m.name}
                </span>
                {isYou && (
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold-deep">
                    You
                  </span>
                )}
              </span>
              <span className="flex items-center gap-3 tabular-nums">
                <span className="text-muted">{formatCurrency(m.contribution)}</span>
                <span className="w-10 text-end font-medium text-turquoise-deep">
                  {formatPercent(share)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
