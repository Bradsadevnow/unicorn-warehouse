/** Annual Percentage Sparkle. Sparkle is displayed and never redeemable. */
export const annualPercentageSparkle = 0.05;
/** Share of a pending payout available as an Early Payday advance. */
export const advanceShare = 0.7;
/** Early Payday fee, as a share of the advance. */
export const advanceFeeRate = 0.1;
export const welcomePeriodEnds = "December 31, 2026";
export const maintenanceWaiverBalance = 10_000;

export const savingsGoal = {
  name: "Saturday Suite",
  tokens: 10_000,
  href: "/redemption",
} as const;

export const products = [
  {
    id: "everyday",
    name: "Everyday Tokens",
    kind: "Checking",
    tone: "mint",
    line: "The account your payouts call home.",
    points: [
      "Payouts arrive the moment they post.",
      "Spend at every Unicorn Warehouse business.",
      `No monthly maintenance with a balance of ${maintenanceWaiverBalance.toLocaleString("en-US")} Tokens.`,
    ],
    fine: "A pending payout is displayed for your convenience and is not a deposit.",
  },
  {
    id: "sparkle",
    name: "Sparkle Savings",
    kind: "Savings",
    tone: "lilac",
    line: "Watch your Tokens feel appreciated.",
    points: [
      `${(annualPercentageSparkle * 100).toFixed(2)}% Annual Percentage Sparkle.`,
      "Sparkle is added every day, automatically.",
      "Set a goal and see your pace toward it.",
    ],
    fine: "Sparkle is not redeemable, transferable, or convertible to Tokens.",
  },
  {
    id: "early-payday",
    name: "Early Payday",
    kind: "Advances",
    tone: "butter",
    line: "Why wait for the client?",
    points: [
      `Advance up to ${advanceShare * 100}% of a pending payout.`,
      "Available as soon as your work is submitted.",
      "One simple fee, taken care of up front.",
    ],
    fine: "If the payout is not accepted, the advance settles against future earnings.",
  },
  {
    id: "courtesy",
    name: "Courtesy Coverage",
    kind: "Overdraft",
    tone: "pink",
    line: "We’ve got you when your balance doesn’t.",
    points: [
      "Purchases go through when you need them.",
      "No enrollment needed. You’re already covered.",
      "Coverage is reviewed with every purchase.",
    ],
    fine: "A coverage fee that exceeds the available balance is itself a covered item.",
  },
] as const;

export const fees = [
  ["Monthly maintenance", "4 Tokens", `Waived with ${maintenanceWaiverBalance.toLocaleString("en-US")} Tokens on deposit`],
  ["Early Payday advance", `${advanceFeeRate * 100}% of the advance`, "Deducted before deposit"],
  ["Courtesy Coverage", "12 Tokens per item", "Includes covered coverage fees"],
  ["Balance inquiry", "1 Token", "Complimentary on this page"],
  ["Paper statement", "6 Tokens", "Mailed to the address on file at Unicorn Warehouse Living"],
  ["Savings withdrawal", "3 Tokens", "First withdrawal each month"],
  ["Inactivity", "5 Tokens per month", "After 30 days without a deposit"],
  ["Fee notification", "1 Token", "Per notification of a fee"],
  ["Account closing", "25 Tokens", "Tokens remain at the Bank"],
] as const;

export const bankWork = {
  gigs: [
    { title: "Review overdraft appeals", tokens: 42, board: "Goodshift" },
    { title: "Reconcile held balances", tokens: 56, board: "Goodshift" },
  ],
  role: { title: "Balance Preservation Associate", rung: 2 },
} as const;
