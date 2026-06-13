import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { MemberAvatars } from "./MemberAvatars";
import { formatCompact } from "@/lib/format";
import {
  computePot,
  computeTally,
  isMember,
  poolStatusMeta,
} from "@/lib/musharakah";
import { getProjectTitle } from "@/lib/data";
import type { Pool } from "@/types";

export function PoolCard({ pool, youId }: { pool: Pool; youId: string }) {
  const pot = computePot(pool.members);
  const meta = poolStatusMeta[pool.status];
  const youAreIn = isMember(pool, youId);
  const tally = computeTally(pool);

  const leaderTitle =
    pool.status === "invested" && pool.winningProjectId
      ? getProjectTitle(pool.winningProjectId)
      : tally.leaderId
        ? getProjectTitle(tally.leaderId)
        : null;

  return (
    <Link
      href={`/musharakah/${pool.id}`}
      className="group block overflow-hidden rounded-xl border border-muted/15 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover"
    >
      {/* Tile header */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-br from-turquoise via-lapis to-azure-deep">
        <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-20" />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-ivory">
            <EightPointStar className="h-7 w-7 text-gold-light" />
            <div>
              <div className="font-display text-lg font-semibold leading-tight">
                {pool.name}
              </div>
              <div className="text-[11px] text-gold-light">{pool.arabicName}</div>
            </div>
          </div>
          <Badge
            tone={meta.tone}
            className="border-white/30 bg-white/90 backdrop-blur"
          >
            {meta.label}
          </Badge>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted">
              Shared pot
            </div>
            <div className="font-display text-2xl font-semibold text-turquoise-deep">
              {formatCompact(pot)}
            </div>
          </div>
          <div className="text-end">
            <MemberAvatars members={pool.members} youId={youId} />
            <div className="mt-1 text-[11px] text-muted">
              {pool.members.length} members
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-ivory/70 p-3 text-xs">
          {pool.status === "invested" ? (
            <span className="text-muted">
              Pot invested in{" "}
              <span className="font-semibold text-ink">{leaderTitle}</span>
            </span>
          ) : pool.status === "voting" ? (
            <span className="text-muted">
              {leaderTitle ? (
                <>
                  Leading:{" "}
                  <span className="font-semibold text-ink">{leaderTitle}</span> ·{" "}
                  {Math.round((1 - tally.undecidedShare) * 100)}% of pot has voted
                </>
              ) : (
                "Voting open — no votes cast yet"
              )}
            </span>
          ) : (
            <span className="text-muted">
              {pool.candidateProjectIds.length} candidate projects · voting opens
              after contributions close
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {youAreIn ? (
            <Badge tone="gold">★ You&apos;re in this circle</Badge>
          ) : (
            <span className="text-xs text-muted">Open to join</span>
          )}
          <span className="text-sm font-medium text-turquoise-deep transition-transform group-hover:translate-x-0.5">
            {youAreIn ? "Open circle →" : "View & join →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
