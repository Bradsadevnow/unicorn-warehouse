export const bankAutoFinancing = {
  vehicle: { apr: 12.9, terms: [48, 60, 72] },
  repair: { apr: 19.9, terms: [6, 12, 18] },
} as const;

export type AutoFinancingKind = keyof typeof bankAutoFinancing;

export function quoteAutoFinancing(kind: AutoFinancingKind, price: number, credit: number, months: number) {
  const { apr, terms } = bankAutoFinancing[kind];
  if (!terms.some((term) => term === months)) throw new Error("Unsupported auto financing term");
  const principal = Math.max(0, price - credit);
  const rate = apr / 1200;
  const monthly = principal * rate / (1 - (1 + rate) ** -months);
  return { apr, principal, monthly, totalPayments: monthly * months };
}
