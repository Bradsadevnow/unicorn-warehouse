export const flockContinuity = { price: 24, days: 30 } as const;

export const flockCheckIns = [
  {
    id: "home",
    name: "Made it home",
    household: "Poppy made it home! 💚",
    workplace: "Poppy has cleared her commute and may be available.",
  },
  {
    id: "late",
    name: "Running late",
    household: "Poppy hasn’t checked in yet. We’ll keep an eye out! 🐦",
    workplace: "Scheduled commute window elapsed. Availability remains unconfirmed.",
  },
  {
    id: "continuity",
    name: "Benefit eligibility changed",
    household: "Keep your flock together! Add a payment method to continue receiving Poppy’s check-ins. 💕",
    workplace: "Employer sponsorship ended. Household Continuity offer delivered.",
  },
] as const;
