"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArchFrame } from "@/components/ornaments/ArchFrame";
import { formatCurrency } from "@/lib/format";
import {
  computeZakat,
  NISAB,
  ZAKAT_RATE,
  type NisabStandard,
  type ZakatInputs,
} from "@/lib/zakat";
import type { ZakatBeneficiary } from "@/types";

const FIELDS: { key: keyof ZakatInputs; label: string; hint: string }[] = [
  { key: "cash", label: "Cash & bank savings", hint: "Everything liquid" },
  { key: "metals", label: "Gold & silver", hint: "Current market value" },
  { key: "investments", label: "Investments & business", hint: "Shares, stock, receivables" },
  { key: "other", label: "Other zakatable assets", hint: "Crypto, rental income held" },
  { key: "liabilities", label: "Debts due now", hint: "Subtracted from the total" },
];

export function ZakatCalculator({
  beneficiaries,
}: {
  beneficiaries: ZakatBeneficiary[];
}) {
  const [standard, setStandard] = useState<NisabStandard>("silver");
  const [inputs, setInputs] = useState<ZakatInputs>({
    cash: 12000,
    metals: 3000,
    investments: 5000,
    other: 0,
    liabilities: 2000,
  });
  const [chosen, setChosen] = useState<string | null>(null);

  const result = computeZakat(inputs, standard);

  function set(key: keyof ZakatInputs, value: number) {
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Inputs */}
      <div className="space-y-4 lg:col-span-3">
        <div className="rounded-xl border border-muted/15 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Your wealth
            </h2>
            <div className="flex items-center gap-1 rounded-full border border-muted/20 bg-ivory p-1 text-xs">
              {(["silver", "gold"] as NisabStandard[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStandard(s)}
                  className={[
                    "rounded-full px-3 py-1 capitalize transition-colors",
                    standard === s
                      ? "bg-gradient-to-br from-turquoise to-lapis text-ivory"
                      : "text-muted hover:text-turquoise-deep",
                  ].join(" ")}
                  aria-pressed={standard === s}
                >
                  {s} nisab
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {FIELDS.map((f) => (
              <div key={f.key} className="flex items-center justify-between gap-4">
                <label htmlFor={`z-${f.key}`} className="text-sm">
                  <span className="text-ink">{f.label}</span>
                  <span className="block text-xs text-muted">{f.hint}</span>
                </label>
                <div className="relative w-40 shrink-0">
                  <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-sm text-muted">
                    €
                  </span>
                  <input
                    id={`z-${f.key}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={100}
                    value={inputs[f.key]}
                    onChange={(e) => set(f.key, Number(e.target.value))}
                    className="w-full rounded-md border border-muted/30 bg-ivory py-2 ps-7 pe-3 text-end text-sm tabular-nums focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted">
            Nisab ({standard}) ≈ {formatCurrency(NISAB[standard])}. Zakat is 2.5%
            of net zakatable wealth. Figures are estimates for guidance.
          </p>
        </div>
      </div>

      {/* Result */}
      <div className="lg:col-span-2">
        <div className="sticky top-20 overflow-hidden rounded-xl border border-muted/15 bg-white shadow-card">
          <div className="relative bg-gradient-to-br from-turquoise via-lapis to-azure-deep p-5 text-ivory">
            <ArchFrame className="absolute inset-0 h-full w-full text-gold/30" />
            <div className="relative">
              <div className="mb-2">
                {result.eligible ? (
                  <Badge tone="gold" className="border-white/30 bg-white/90">
                    ✓ Zakat is due
                  </Badge>
                ) : (
                  <Badge tone="turquoise" className="border-white/30 bg-white/90">
                    Below nisab — not due
                  </Badge>
                )}
              </div>
              <div className="text-xs uppercase tracking-wide text-gold-light">
                Your Zakat ({Math.round(ZAKAT_RATE * 1000) / 10}%)
              </div>
              <div className="font-display text-4xl font-semibold">
                {formatCurrency(result.due)}
              </div>
            </div>
          </div>
          <dl className="space-y-2 p-5 text-sm">
            <Row label="Total assets" value={formatCurrency(result.assets)} />
            <Row label="Net zakatable wealth" value={formatCurrency(result.net)} strong />
            <Row label={`Nisab (${standard})`} value={formatCurrency(result.nisab)} />
          </dl>
        </div>
      </div>

      {/* Beneficiaries — you decide where it goes */}
      <div className="lg:col-span-5">
        <div className="mb-3 mt-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            You decide where your Zakat goes
          </h2>
          <p className="mt-1 text-sm text-muted">
            Every cause below is zakat-eligible. Choose one to direct your{" "}
            {formatCurrency(result.due)}.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beneficiaries.map((b) => {
            const selected = chosen === b.id;
            return (
              <div
                key={b.id}
                className={[
                  "flex flex-col rounded-xl border bg-white p-4 shadow-card transition-all",
                  selected
                    ? "border-gold ring-2 ring-gold/40"
                    : "border-muted/15 hover:-translate-y-0.5 hover:shadow-card-hover",
                ].join(" ")}
              >
                <Badge tone="turquoise" className="mb-2 w-fit">
                  {b.category}
                </Badge>
                <h3 className="font-display text-base font-semibold text-ink">
                  {b.name}
                </h3>
                <p className="mt-1 flex-1 text-sm text-muted">{b.description}</p>
                <Button
                  size="sm"
                  variant={selected ? "primary" : "secondary"}
                  fullWidth
                  className="mt-3"
                  disabled={!result.eligible}
                  onClick={() => setChosen(selected ? null : b.id)}
                  aria-pressed={selected}
                >
                  {selected ? "✓ Zakat directed here" : "Direct my Zakat here"}
                </Button>
              </div>
            );
          })}
        </div>
        {chosen && result.eligible && (
          <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
            You&apos;ll give{" "}
            <span className="font-semibold text-gold-deep">
              {formatCurrency(result.due)}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {beneficiaries.find((b) => b.id === chosen)?.name}
            </span>
            . <span className="text-muted">Mocked flow — no money is moved.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd
        className={[
          "tabular-nums",
          strong ? "font-semibold text-turquoise-deep" : "text-ink",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
