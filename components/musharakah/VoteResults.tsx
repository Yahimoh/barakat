import { getProject, getProjectTitle } from "@/lib/data";
import { formatCompact, formatPercent } from "@/lib/format";
import type { Tally } from "@/lib/musharakah";
import type { PoolStatus } from "@/types";

/**
 * Weighted vote tally as a horizontal ranked-bar chart. Each bar's length is
 * the project's share of the whole pot (= the contribution-weighted votes it
 * holds). A dashed marker shows the 50%-of-pot majority threshold; the leader
 * and the funded winner get gold emphasis.
 */
export function VoteResults({
  tally,
  status,
  yourVoteProjectId,
  winningProjectId,
}: {
  tally: Tally;
  status: PoolStatus;
  yourVoteProjectId?: string;
  winningProjectId?: string;
}) {
  return (
    <div className="space-y-4">
      {tally.rows.map((row) => {
        const isLeader = row.projectId === tally.leaderId;
        const isWinner = row.projectId === winningProjectId;
        const isYours = row.projectId === yourVoteProjectId;
        const project = getProject(row.projectId);
        const hue = project ? 175 + (project.imageHue % 45) : 190;

        return (
          <div key={row.projectId}>
            <div className="mb-1 flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-sm ring-1 ring-black/5"
                  style={{ background: `hsl(${hue} 55% 45%)` }}
                />
                <span
                  className={
                    isWinner || isLeader
                      ? "font-semibold text-ink"
                      : "text-ink"
                  }
                >
                  {getProjectTitle(row.projectId)}
                </span>
                {isWinner && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-ink">
                    ★ Funded
                  </span>
                )}
                {isYours && status !== "invested" && (
                  <span className="rounded-full border border-gold/50 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold-deep">
                    Your vote
                  </span>
                )}
              </span>
              <span className="flex items-center gap-2 tabular-nums text-muted">
                <span className="font-semibold text-turquoise-deep">
                  {formatPercent(row.share)}
                </span>
                <span className="hidden sm:inline">
                  {formatCompact(row.weight)}
                </span>
              </span>
            </div>

            <div className="relative h-3 w-full overflow-hidden rounded-full bg-turquoise/10">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.max(2, row.share * 100)}%`,
                  background: isWinner
                    ? "linear-gradient(90deg, #D4A537, #9C7320)"
                    : isLeader
                      ? "linear-gradient(90deg, #46C7D6, #1E5BA8)"
                      : "linear-gradient(90deg, #17A6B8, #123C75)",
                  opacity: isLeader || isWinner ? 1 : 0.8,
                }}
              />
              {/* 50%-of-pot majority threshold */}
              <span
                className="absolute inset-y-0 w-px bg-gold-deep/60"
                style={{ left: "50%" }}
                aria-hidden="true"
              />
            </div>

            <div className="mt-1 text-[11px] text-muted">
              {row.voterCount === 0
                ? "No votes yet"
                : `${row.voterCount} ${row.voterCount === 1 ? "voter" : "voters"}: ${row.voterNames.join(", ")}`}
            </div>
          </div>
        );
      })}

      {/* Undecided weight */}
      {tally.undecidedShare > 0.001 && status !== "invested" && (
        <div>
          <div className="mb-1 flex items-center justify-between text-sm text-muted">
            <span>Undecided</span>
            <span className="tabular-nums">{formatPercent(tally.undecidedShare)}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${tally.undecidedShare * 100}%`,
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(91,107,112,0.35) 0, rgba(91,107,112,0.35) 6px, transparent 6px, transparent 12px)",
              }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-muted/15 pt-3 text-xs">
        <span className="inline-block h-3 w-px bg-gold-deep/60" />
        <span className="text-muted">
          {tally.majorityReached ? (
            <span className="font-medium text-gold-deep">
              A candidate holds a majority of the pot.
            </span>
          ) : (
            <>Dashed line marks the 50%-of-pot majority threshold.</>
          )}
        </span>
      </div>
    </div>
  );
}
