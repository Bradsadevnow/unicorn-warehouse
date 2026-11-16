export const dreamwellPricing = {
  version: "dreamwell-v1",
  effectiveFrom: "2026-11-15",
  nap: { tokens: 5, unit: "session", minutes: 20 },
  subscriptions: {
    essential: { tokens: 8, hours: 2 },
    plus: { tokens: 12, hours: 4 },
    premium: { tokens: 16, hours: 6 },
    complete: { tokens: 20, hours: 8 },
  },
  subscriptionUnit: "day",
} as const;
