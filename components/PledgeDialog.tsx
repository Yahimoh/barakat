"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { EightPointStar } from "./ornaments/EightPointStar";
import { formatCurrency, formatPercent } from "@/lib/format";

interface PledgeDialogProps {
  goal: number;
  committed: number;
  projectTitle?: string;
  onCommit: (amount: number) => void;
}

export function PledgeDialog({
  goal,
  committed,
  projectTitle,
  onCommit,
}: PledgeDialogProps) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"form" | "done">("form");
  const [amount, setAmount] = useState(100);
  const [pending, startTransition] = useTransition();
  const remaining = Math.max(0, goal - committed);
  const newPct = goal > 0 ? Math.min(1, (committed + amount) / goal) : 0;

  function close() {
    setOpen(false);
    setPhase("form");
    setAmount(100);
  }

  function submit() {
    if (amount <= 0) return;
    startTransition(() => {
      onCommit(amount);
      setPhase("done");
    });
  }

  return (
    <>
      <Button
        fullWidth
        size="lg"
        onClick={() => setOpen(true)}
        disabled={remaining === 0}
      >
        {remaining === 0 ? "Fully funded" : "Commit funds"}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-azure-deep/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-card-hover sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted/30 sm:hidden" />

            {phase === "form" ? (
              <>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Commit to this project
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Mocked flow — no money is moved. The committed total updates
                  optimistically.
                </p>

                <label
                  htmlFor="pledge-amount"
                  className="mt-4 block text-sm font-medium text-ink"
                >
                  Amount (EUR)
                </label>
                <input
                  id="pledge-amount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={50}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-muted/30 bg-ivory px-3 py-2 text-base focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                />

                <div className="mt-2 flex flex-wrap gap-2">
                  {[50, 100, 250, 500, 1000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAmount(v)}
                      className="rounded-full border border-muted/30 px-3 py-1 text-xs text-ink transition-colors hover:border-turquoise hover:text-turquoise-deep"
                    >
                      {formatCurrency(v)}
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-md bg-ivory p-3 text-xs text-muted">
                  Remaining to goal:{" "}
                  <span className="font-semibold text-ink">
                    {formatCurrency(remaining)}
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button variant="secondary" fullWidth onClick={close}>
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    onClick={submit}
                    disabled={pending || amount <= 0}
                  >
                    {pending ? "Committing…" : `Commit ${formatCurrency(amount)}`}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-turquoise to-lapis text-ivory">
                  <EightPointStar className="h-7 w-7 animate-twinkle text-gold-light" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  Commitment confirmed
                </h3>
                <p className="mt-1 text-sm text-muted">
                  You committed{" "}
                  <span className="font-semibold text-turquoise-deep">
                    {formatCurrency(amount)}
                  </span>
                  {projectTitle ? (
                    <>
                      {" "}to{" "}
                      <span className="font-medium text-ink">{projectTitle}</span>
                    </>
                  ) : null}
                  . <span className="text-muted">No money was moved (demo).</span>
                </p>

                <div className="mt-4 rounded-lg bg-ivory p-3">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>Now funded</span>
                    <span className="font-semibold text-turquoise-deep">
                      {formatPercent(newPct)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-turquoise/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-turquoise to-lapis transition-all duration-700"
                      style={{ width: `${newPct * 100}%` }}
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
                  What&apos;s next
                </p>
                <div className="mt-2 grid gap-2">
                  <Link
                    href="/investor"
                    onClick={close}
                    className="inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-br from-turquoise to-lapis text-sm font-medium text-ivory"
                  >
                    Track it in your dashboard
                  </Link>
                  <Link
                    href="/musharakah"
                    onClick={close}
                    className="inline-flex h-11 w-full items-center justify-center rounded-md border border-turquoise/40 text-sm font-medium text-turquoise-deep hover:bg-turquoise/5"
                  >
                    Invest together in a circle
                  </Link>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-1 text-xs text-muted hover:text-ink"
                  >
                    Keep browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
