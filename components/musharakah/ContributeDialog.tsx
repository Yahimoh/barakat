"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatPercent } from "@/lib/format";

interface ContributeDialogProps {
  minContribution: number;
  currentContribution: number;
  pot: number;
  label?: string;
  onContribute: (amount: number) => void;
}

/**
 * Add funds to the shared pot. Mirrors the project PledgeDialog, but also
 * previews how the contribution changes your voting weight (your share of
 * the pot), since in a Musharakah those are the same thing.
 */
export function ContributeDialog({
  minContribution,
  currentContribution,
  pot,
  label = "Add to the pot",
  onContribute,
}: ContributeDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(minContribution);
  const [pending, startTransition] = useTransition();

  const valid = amount >= minContribution;
  const newContribution = currentContribution + amount;
  const currentShare = pot > 0 ? currentContribution / pot : 0;
  const newShare = pot + amount > 0 ? newContribution / (pot + amount) : 0;

  function submit() {
    if (!valid) return;
    startTransition(() => {
      onContribute(amount);
      setOpen(false);
      setAmount(minContribution);
    });
  }

  return (
    <>
      <Button fullWidth size="lg" onClick={() => setOpen(true)}>
        {label}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-azure-deep/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Add to the pot"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-card-hover sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted/30 sm:hidden" />
            <h3 className="font-display text-lg font-semibold text-ink">
              Add to the shared pot
            </h3>
            <p className="mt-1 text-sm text-muted">
              Mocked flow — no money is moved. Your contribution is also your
              voting weight when the circle votes.
            </p>

            <label
              htmlFor="contribute-amount"
              className="mt-4 block text-sm font-medium text-ink"
            >
              Amount (USD)
            </label>
            <input
              id="contribute-amount"
              type="number"
              inputMode="numeric"
              min={minContribution}
              step={50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-muted/30 bg-ivory px-3 py-2 text-base focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20"
            />
            <p className="mt-1 text-xs text-muted">
              Minimum {formatCurrency(minContribution)}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {[minContribution, 500, 1000, 2500].map((v) => (
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

            <div className="mt-4 space-y-1 rounded-md bg-ivory p-3 text-xs text-muted">
              <div className="flex items-center justify-between">
                <span>Your contribution</span>
                <span className="tabular-nums text-ink">
                  {formatCurrency(currentContribution)} →{" "}
                  <span className="font-semibold text-turquoise-deep">
                    {formatCurrency(newContribution)}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Your voting weight</span>
                <span className="tabular-nums text-ink">
                  {formatPercent(currentShare)} →{" "}
                  <span className="font-semibold text-gold-deep">
                    {formatPercent(newShare)}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Button variant="secondary" fullWidth onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button fullWidth onClick={submit} disabled={pending || !valid}>
                {pending ? "Adding…" : `Add ${formatCurrency(amount)}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
