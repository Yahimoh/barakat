import type { Pool, PoolMember, PoolVote } from "@/types";

/**
 * Pure Musharakah math — shared by server and client so the live vote
 * tally stays consistent everywhere. Voting weight equals contribution,
 * so a member's influence is their share of the pot.
 */

export function computePot(members: PoolMember[]): number {
  return members.reduce((sum, m) => sum + m.contribution, 0);
}

export interface TallyRow {
  projectId: string;
  weight: number; // sum of contributions backing this project
  share: number; // weight / pot (0–1)
  voterCount: number;
  voterNames: string[];
}

export interface Tally {
  pot: number;
  rows: TallyRow[]; // one per candidate, sorted by weight desc
  decidedWeight: number; // weight that has voted
  undecidedWeight: number;
  undecidedShare: number;
  leaderId: string | null; // candidate with the most weight (null if a tie at 0)
  majorityReached: boolean; // a candidate holds > 50% of the whole pot
}

const MAJORITY = 0.5;

/**
 * Tally the weighted votes for a pool. `overrides` lets the client recompute
 * optimistically (e.g. after you change your own contribution or vote)
 * without mutating the source data.
 */
export function computeTally(
  pool: Pool,
  overrides?: { members?: PoolMember[]; votes?: PoolVote[] }
): Tally {
  const members = overrides?.members ?? pool.members;
  const votes = overrides?.votes ?? pool.votes;
  const pot = computePot(members);
  const weightOf = (memberId: string) =>
    members.find((m) => m.id === memberId)?.contribution ?? 0;
  const nameOf = (memberId: string) =>
    members.find((m) => m.id === memberId)?.name ?? "Member";

  const rows: TallyRow[] = pool.candidateProjectIds.map((projectId) => {
    const backers = votes.filter((v) => v.projectId === projectId);
    const weight = backers.reduce((s, v) => s + weightOf(v.memberId), 0);
    return {
      projectId,
      weight,
      share: pot > 0 ? weight / pot : 0,
      voterCount: backers.length,
      voterNames: backers.map((v) => nameOf(v.memberId)),
    };
  });

  rows.sort((a, b) => b.weight - a.weight);

  const decidedWeight = rows.reduce((s, r) => s + r.weight, 0);
  const undecidedWeight = Math.max(0, pot - decidedWeight);
  const top = rows[0];
  const leaderId = top && top.weight > 0 ? top.projectId : null;
  const majorityReached = !!top && pot > 0 && top.weight / pot > MAJORITY;

  return {
    pot,
    rows,
    decidedWeight,
    undecidedWeight,
    undecidedShare: pot > 0 ? undecidedWeight / pot : 0,
    leaderId,
    majorityReached,
  };
}

/** A member's share of the pot — i.e. the fraction of the vote they control. */
export function voteWeightShare(pool: Pool, memberId: string): number {
  const pot = computePot(pool.members);
  const member = pool.members.find((m) => m.id === memberId);
  if (!member || pot === 0) return 0;
  return member.contribution / pot;
}

export function isMember(pool: Pool, investorId: string): boolean {
  return pool.members.some((m) => m.id === investorId);
}

export function findVote(
  votes: PoolVote[],
  memberId: string
): PoolVote | undefined {
  return votes.find((v) => v.memberId === memberId);
}

export const poolStatusMeta: Record<
  Pool["status"],
  { label: string; tone: "turquoise" | "gold" | "lapis"; blurb: string }
> = {
  open: {
    label: "Open · contributing",
    tone: "turquoise",
    blurb: "Accepting contributions",
  },
  voting: {
    label: "Voting live",
    tone: "gold",
    blurb: "Weighted vote in progress",
  },
  invested: {
    label: "Invested",
    tone: "lapis",
    blurb: "Pot allocated to the winner",
  },
};
