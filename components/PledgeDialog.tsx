"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/Button";

interface PledgeDialogProps {
  goal: number;
  committed: number;
  onCommit: (amount: number) => void;
}

export function PledgeDialog({
  goal,
  committed,
  onCommit,
}: PledgeDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(100);
  const [pending, startTransition] = useTransition();
  const remaining = Math.max(0, goal - committed);

  function submit() {
    if (amount <= 0) return;
    startTransition(() => {
      onCommit(amount);
      setOpen(false);
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
        Commit funds
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-card-hover sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted/30 sm:hidden" />
            <h3 className="font-display text-lg font-semibold text-ink">
              Commit to this project
            </h3>
            <p className="mt-1 text-sm text-muted">
              Mocked flow — no money is moved. The committed total updates
              optimistically.
            </p>

            <label className="mt-4 block text-sm font-medium text-ink">
              Amount (USD)
            </label>
            <input
              type="number"
              min={1}
              step={50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-muted/30 bg-ivory px-3 py-2 text-base focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />

            <div className="mt-2 flex flex-wrap gap-2">
              {[50, 100, 250, 500, 1000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className="rounded-full border border-muted/30 px-3 py-1 text-xs text-ink hover:border-emerald hover:text-emerald"
                >
                  ${v}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-md bg-ivory p-3 text-xs text-muted">
              Remaining to goal:{" "}
              <span className="font-semibold text-ink">
                ${remaining.toLocaleString()}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={submit}
                disabled={pending || amount <= 0}
              >
                {pending ? "Committing…" : `Commit $${amount}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
