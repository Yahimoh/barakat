"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRole } from "@/lib/role";
import { Badge } from "@/components/ui/Badge";
import { StatTile } from "@/components/ui/StatTile";
import { Button } from "@/components/ui/Button";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { ArchFrame } from "@/components/ornaments/ArchFrame";
import { ContributeDialog } from "./ContributeDialog";
import { MemberShareBar } from "./MemberShareBar";
import { VoteResults } from "./VoteResults";
import { computePot, computeTally, poolStatusMeta } from "@/lib/musharakah";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";
import type { Pool, PoolMember, PoolVote, Project } from "@/types";

export function PoolDetailClient({
  initial,
  candidateProjects,
  youId,
  youName,
}: {
  initial: Pool;
  candidateProjects: Project[];
  youId: string;
  youName: string;
}) {
  const [role] = useRole();
  const [members, setMembers] = useState<PoolMember[]>(initial.members);
  const [votes, setVotes] = useState<PoolVote[]>(initial.votes);

  const meta = poolStatusMeta[initial.status];
  const isInvestor = role === "investor";
  const youMember = members.find((m) => m.id === youId);
  const youContribution = youMember?.contribution ?? 0;
  const pot = computePot(members);
  const yourShare = pot > 0 ? youContribution / pot : 0;
  const yourVote = votes.find((v) => v.memberId === youId)?.projectId;

  const tally = useMemo(
    () => computeTally(initial, { members, votes }),
    [initial, members, votes]
  );

  const canContribute = isInvestor && initial.status === "open";
  const canVote = isInvestor && initial.status === "voting" && !!youMember;

  function contribute(amount: number) {
    setMembers((prev) => {
      const existing = prev.find((m) => m.id === youId);
      if (existing) {
        return prev.map((m) =>
          m.id === youId ? { ...m, contribution: m.contribution + amount } : m
        );
      }
      return [...prev, { id: youId, name: youName, contribution: amount }];
    });
  }

  function castVote(projectId: string) {
    if (!canVote) return;
    setVotes((prev) => [
      ...prev.filter((v) => v.memberId !== youId),
      { memberId: youId, projectId },
    ]);
  }

  return (
    <div className="container-page space-y-8 py-6 lg:py-10">
      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-turquoise via-lapis to-azure-deep p-6 text-ivory shadow-glow md:p-8">
        <GirihPattern className="absolute -right-10 -top-10 h-56 w-56 text-gold opacity-15" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone={meta.tone} className="border-white/30 bg-white/90">
              {meta.label}
            </Badge>
            {youMember && (
              <Badge tone="gold" className="border-white/30 bg-white/90">
                ★ You&apos;re a member
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <EightPointStar className="h-9 w-9 text-gold-light" />
            <div>
              <h1 className="font-display text-2xl font-semibold md:text-3xl">
                {initial.name}
              </h1>
              <div className="text-sm text-gold-light">
                {initial.arabicName} · Musharakah circle
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/85">
            {initial.description}
          </p>
          <div className="mt-4 text-xs text-ivory/70">
            {initial.status === "invested" ? (
              <>Closed {formatDate(initial.votingClosesAt)}</>
            ) : (
              <>
                {initial.status === "voting" ? "Voting closes" : "Voting opens"}{" "}
                {formatDate(initial.votingClosesAt)}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Key stats */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Shared pot" value={formatCurrency(pot)} tone="emerald" />
        <StatTile label="Members" value={members.length} tone="navy" />
        <StatTile
          label="Your contribution"
          value={formatCurrency(youContribution)}
          tone="gold"
        />
        <StatTile
          label="Your voting weight"
          value={formatPercent(yourShare)}
          tone="emerald"
          hint="share of the pot"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column — candidates / ballot */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-ink">
                {initial.status === "invested"
                  ? "The candidates"
                  : "Candidate projects"}
              </h2>
              {canVote && (
                <span className="text-xs text-muted">
                  Tap a project to cast your weighted vote
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {candidateProjects.map((p) => (
                <CandidateCard
                  key={p.id}
                  project={p}
                  selected={yourVote === p.id}
                  isWinner={initial.winningProjectId === p.id}
                  canVote={canVote}
                  onVote={() => castVote(p.id)}
                />
              ))}
            </div>

            {initial.status === "voting" && !canVote && (
              <p className="mt-3 rounded-lg border border-muted/15 bg-white p-3 text-sm text-muted">
                {isInvestor
                  ? "Only members of this circle can vote. "
                  : "Switch to the "}
                {!isInvestor && (
                  <span className="font-medium text-turquoise-deep">
                    Investor
                  </span>
                )}
                {!isInvestor && " role (top-right) to vote."}
              </p>
            )}
          </div>
        </div>

        {/* Aside — pot composition, action, live results */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          {/* Action panel */}
          <div className="rounded-xl border border-muted/15 bg-white p-5 shadow-card">
            {initial.status === "invested" ? (
              <InvestedSummary pool={initial} pot={pot} />
            ) : canContribute ? (
              <>
                <h3 className="font-display text-base font-semibold text-ink">
                  Grow your stake
                </h3>
                <p className="mb-3 mt-1 text-xs text-muted">
                  Contributions are open. More in the pot means more voting
                  weight for you.
                </p>
                <ContributeDialog
                  minContribution={initial.minContribution}
                  currentContribution={youContribution}
                  pot={pot}
                  label={youMember ? "Add to the pot" : "Join & contribute"}
                  onContribute={contribute}
                />
              </>
            ) : initial.status === "open" ? (
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted">
                  Switch to the{" "}
                  <span className="font-medium text-turquoise-deep">
                    Investor
                  </span>{" "}
                  role to contribute to this pot.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-base font-semibold text-ink">
                  Your vote
                </h3>
                {yourVote ? (
                  <p className="mt-1 text-sm text-muted">
                    You&apos;re backing{" "}
                    <span className="font-semibold text-ink">
                      {candidateProjects.find((p) => p.id === yourVote)?.title}
                    </span>{" "}
                    with{" "}
                    <span className="font-semibold text-gold-deep">
                      {formatPercent(yourShare)}
                    </span>{" "}
                    of the pot. You can change it until voting closes.
                  </p>
                ) : canVote ? (
                  <p className="mt-1 text-sm text-muted">
                    You haven&apos;t voted yet. Tap a candidate to commit your{" "}
                    {formatPercent(yourShare)} weight.
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-muted">
                    Voting is live for members of this circle.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Pot composition */}
          <div className="rounded-xl border border-muted/15 bg-white p-5 shadow-card">
            <h3 className="font-display text-base font-semibold text-ink">
              Pot composition
            </h3>
            <p className="mb-4 mt-1 text-xs text-muted">
              Each member&apos;s share of the pot is their voting weight.
            </p>
            <MemberShareBar members={members} youId={youId} />
          </div>

          {/* Live results */}
          <div className="rounded-xl border border-muted/15 bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-ink">
                {initial.status === "invested"
                  ? "Final allocation"
                  : "Live results"}
              </h3>
              {initial.status === "voting" && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-2 w-2 animate-twinkle rounded-full bg-crimson" />
                  Live
                </span>
              )}
            </div>
            {initial.status === "open" ? (
              <p className="text-sm text-muted">
                Voting opens once contributions close. Weights below preview
                each member&apos;s influence.
              </p>
            ) : (
              <VoteResults
                tally={tally}
                status={initial.status}
                yourVoteProjectId={yourVote}
                winningProjectId={initial.winningProjectId}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function CandidateCard({
  project,
  selected,
  isWinner,
  canVote,
  onVote,
}: {
  project: Project;
  selected: boolean;
  isWinner: boolean;
  canVote: boolean;
  onVote: () => void;
}) {
  const hue = 175 + (project.imageHue % 45);
  return (
    <div
      className={[
        "overflow-hidden rounded-xl border bg-white shadow-card transition-all",
        selected
          ? "border-gold ring-2 ring-gold/40"
          : isWinner
            ? "border-gold/60"
            : "border-muted/15",
      ].join(" ")}
    >
      <div
        className="relative h-20"
        style={{
          background: `linear-gradient(155deg, hsl(${hue} 55% 50%), hsl(${(hue + 25) % 360} 60% 28%))`,
        }}
      >
        <ArchFrame className="absolute inset-0 h-full w-full text-gold/60" />
        {isWinner && (
          <span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-ink">
            ★ Funded
          </span>
        )}
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-sm font-semibold leading-snug text-ink">
            {project.title}
          </h4>
        </div>
        <p className="line-clamp-2 text-xs text-muted">{project.summary}</p>
        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/projects/${project.id}`}
            className="text-xs font-medium text-turquoise-deep hover:underline"
          >
            View details →
          </Link>
          {canVote && (
            <Button
              size="sm"
              variant={selected ? "primary" : "secondary"}
              onClick={onVote}
              aria-pressed={selected}
            >
              {selected ? "✓ Your vote" : "Vote"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InvestedSummary({ pool, pot }: { pool: Pool; pot: number }) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-ink">
        Pot allocated
      </h3>
      <p className="mt-1 text-sm text-muted">
        The circle voted, weighted by contribution. The entire{" "}
        <span className="font-semibold text-turquoise-deep">
          {formatCurrency(pot)}
        </span>{" "}
        pot was invested into the winning project.
      </p>
      <Link
        href={`/projects/${pool.winningProjectId}`}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-br from-gold to-gold-deep px-5 text-sm font-medium text-ink transition-all hover:brightness-105"
      >
        View the funded project →
      </Link>
    </div>
  );
}
