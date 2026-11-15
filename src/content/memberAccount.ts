import "server-only";

type LedgerStatus = "posted" | "pending" | "held" | "spent";

export type MemberAccount = {
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly asOf: string;
  readonly household: string;
  readonly employer: string;
  readonly ledger: readonly {
    readonly id: string;
    readonly date: string;
    readonly label: string;
    readonly amount: number;
    readonly status: LedgerStatus;
    readonly eventId?: string;
  }[];
  readonly subscriptions: readonly { id: string; name: string; renewal: string; status: string; note: string }[];
  readonly assignments: readonly { id: string; ledgerEntryId: string; status: string; postingId?: string }[];
  readonly requests: readonly { id: string; title: string; status: string; date: string; ledgerEntryId?: string }[];
  readonly notices: readonly string[];
};

const poppyAccount = {
  name: "Poppy",
  id: "UW-0482",
  date: "November 14, 2026",
  asOf: "2026-11-14",
  household: "Poppy and her sister Clover",
  employer: "Goodshift · Reporting",
  ledger: [
    { id: "opening", date: "2026-08-17", label: "Opening balance", amount: 504, status: "posted" },
    { id: "aug-report", date: "2026-08-23", label: "Goodshift · August inventory report", amount: 160, status: "posted" },
    { id: "aug-market", date: "2026-08-28", label: "Market · Groceries", amount: 34, status: "spent" },
    { id: "sep-report", date: "2026-09-10", label: "Goodshift · Reconcile supplier invoices", amount: 120, status: "posted" },
    { id: "sep-lodge", date: "2026-09-22", label: "Everair · Lodge Collection blend", amount: 64, status: "spent" },
    { id: "market-original", date: "2026-10-01", label: "Market · Pantry order", amount: 24, status: "spent", eventId: "UW-0482-MKT-1001" },
    { id: "market-refund", date: "2026-10-03", label: "Market · Missing order refund", amount: 24, status: "posted", eventId: "UW-0482-MKT-1001" },
    { id: "oct-market", date: "2026-10-21", label: "Market · Pantry restock", amount: 34, status: "spent" },
    { id: "overtime", date: "2026-11-10", label: "Goodshift · Reconcile the weekly report, overtime assignment", amount: 140, status: "posted" },
    { id: "delivery", date: "2026-11-11", label: "HelpingHand · Unload a delivery at Market", amount: 12, status: "posted" },
    { id: "groceries", date: "2026-11-11", label: "Market · Six rolls of toilet paper from the same warehouse", amount: 12, status: "spent" },
    { id: "rest", date: "2026-11-12", label: "Dreamwell Plus · Four-hour session", amount: 250, status: "spent", eventId: "UW-0482-DW-1112" },
    { id: "report", date: "2026-11-13", label: "Goodshift · Second weekly report, awaiting client acceptance", amount: 140, status: "pending", eventId: "UW-0482-GS-1113" },
    { id: "lodge", date: "2026-11-13", label: "Everair · Lodge Collection order, awaiting fulfillment", amount: 60, status: "held" },
  ],
  subscriptions: [
    { id: "dreamwell", name: "Dreamwell Plus", renewal: "November 15, 2026", status: "Active", note: "Clover’s bundled rest access depends on the household account remaining in good standing." },
    { id: "everair", name: "Everair AirLink Premium", renewal: "November 14, 2026", status: "Cancellation in verification", note: "Requested November 13. Estimated verification November 16. Renewal is due during verification. Everair Sync is active. No Sync release is scheduled." },
    { id: "estate", name: "Estate continuity · Former Tomorrowly policy", renewal: "January 1, 2027", status: "Employer-sponsored through December 31, 2026", note: "Goodshift sponsors Poppy’s coverage through the end of the quarter." },
    { id: "softspace", name: "Softspace Daily Balance", renewal: "Paused", status: "Paused October 7", note: "The next billing date will be set when the membership resumes." },
  ],
  assignments: [
    { id: "GS-0823-01", ledgerEntryId: "aug-report", status: "Client accepted" },
    { id: "GS-0910-01", ledgerEntryId: "sep-report", status: "Client accepted" },
    { id: "GS-1110-01", ledgerEntryId: "overtime", status: "Client accepted", postingId: "GS-P-2001" },
    { id: "HH-1111-01", ledgerEntryId: "delivery", status: "Completed" },
    { id: "GS-1113-02", ledgerEntryId: "report", status: "Awaiting client acceptance", postingId: "GS-P-2001" },
  ],
  requests: [
    { id: "appeal", title: "Goodshift · Unpaid report appeal", status: "Awaiting provider response", date: "November 13, 2026", ledgerEntryId: "report" },
    { id: "quote", title: "Dreamwell · Revised rest quote clarification", status: "Awaiting explanation", date: "November 14, 2026" },
    { id: "air-request", title: "Everair · Cancellation request", status: "In verification", date: "November 13, 2026" },
    { id: "missing-order", title: "Market · Missing pantry order", status: "Resolved", date: "October 3, 2026", ledgerEntryId: "market-refund" },
  ],
  notices: [
    "September 22 · Poppy redeemed a Lodge Collection blend she’d been saving for.",
    "October 3 · Market refunded a missing order in full.",
    "October 7 · Poppy paused Softspace Daily Balance.",
    "October 24 · Clover used a Dreamwell session through the household benefit.",
    "November 10 · Poppy picked up an extra Goodshift report to put toward four hours of sleep.",
    "November 12 · Poppy completed her Dreamwell session. Goodshift recorded a higher productivity score and opened an evening assignment window that had been reserved for rest.",
    "November 13 · Poppy submitted a second report in the evening window. The client has yet to accept it. Poppy appealed the pending payout.",
    "November 14 · Dreamwell issued a revised rest quote. The notice gives no reason for the revision.",
  ],
} as const satisfies MemberAccount;

const juniperAccount = {
  id: "UW-0716",
  name: "Juniper",
  date: "November 14, 2026",
  asOf: "2026-11-14",
  household: "Juniper",
  employer: "HelpingHand · Retail",
  ledger: [
    { id: "opening", date: "2026-08-17", label: "Opening balance", amount: 216, status: "posted" },
    { id: "shelf-shift", date: "2026-08-25", label: "HelpingHand · Restock the front shelves", amount: 36, status: "posted" },
    { id: "towels", date: "2026-09-06", label: "Market · Bath towels", amount: 28, status: "spent" },
    { id: "lunch-shift", date: "2026-10-02", label: "HelpingHand · Lunch rush coverage", amount: 42, status: "posted" },
    { id: "heat", date: "2026-10-28", label: "Softspace · Heating package", amount: 20, status: "spent" },
    { id: "market-hold", date: "2026-11-11", label: "Market · Organic apples awaiting pickup", amount: 15, status: "held" },
  ],
  subscriptions: [
    { id: "softspace", name: "Softspace Seasonal Select", renewal: "November 22, 2026", status: "Active", note: "Warming is your primary direction this cycle." },
  ],
  assignments: [
    { id: "HH-0825-01", ledgerEntryId: "shelf-shift", status: "Completed" },
    { id: "HH-1002-01", ledgerEntryId: "lunch-shift", status: "Completed" },
  ],
  requests: [
    { id: "pickup", title: "Market · Pickup window correction", status: "Resolved", date: "November 12, 2026", ledgerEntryId: "market-hold" },
  ],
  notices: ["November 12 · Market confirmed Juniper’s updated pickup window."],
} as const satisfies MemberAccount;

const memberAccounts: ReadonlyMap<string, MemberAccount> = new Map(
  [poppyAccount, juniperAccount].map((account) => [account.id, account]),
);
export const signInProfiles = [
  { name: poppyAccount.name, id: poppyAccount.id, maskedNumber: "•••-••-0140" },
  { name: juniperAccount.name, id: juniperAccount.id, maskedNumber: "•••-••-0716" },
] as const;
export const memberAccount = poppyAccount;

export function getMemberAccount(id: string) {
  return memberAccounts.get(id);
}

export function getTokenBalances(account: MemberAccount) {
  const sum = (status: LedgerStatus) =>
    account.ledger.filter((entry) => entry.status === status).reduce((total, entry) => total + entry.amount, 0);
  return {
    available: sum("posted") - sum("spent") - sum("held"),
    pending: sum("pending"),
    held: sum("held"),
    spent: sum("spent"),
  };
}

export const balances = getTokenBalances(memberAccount);
