/**
 * Pure Zakat math. Zakat is due at 2.5% of net zakatable wealth, but only if
 * that wealth meets the nisab threshold (the minimum, pegged to gold or
 * silver). The EUR nisab values are demo estimates — they track live metal
 * prices in reality.
 */
export const ZAKAT_RATE = 0.025;

export const NISAB: Record<"gold" | "silver", number> = {
  gold: 7300, // ~85g gold
  silver: 560, // ~595g silver
};

export type NisabStandard = keyof typeof NISAB;

export interface ZakatInputs {
  cash: number; // cash + bank savings
  metals: number; // value of gold & silver held
  investments: number; // shares, business assets, receivables
  other: number; // other zakatable assets
  liabilities: number; // debts due now
}

export interface ZakatResult {
  assets: number;
  net: number;
  nisab: number;
  eligible: boolean;
  due: number;
}

export function computeZakat(
  i: ZakatInputs,
  standard: NisabStandard
): ZakatResult {
  const assets = i.cash + i.metals + i.investments + i.other;
  const net = Math.max(0, assets - i.liabilities);
  const nisab = NISAB[standard];
  const eligible = net >= nisab;
  return {
    assets,
    net,
    nisab,
    eligible,
    due: eligible ? net * ZAKAT_RATE : 0,
  };
}
