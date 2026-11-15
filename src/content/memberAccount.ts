import "server-only";

type LedgerStatus = "posted" | "pending" | "held" | "spent";

type MemberAccount = {
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly household: string;
  readonly employer: string;
  readonly ledger: readonly {
    readonly id: string;
    readonly date: string;
    readonly label: string;
    readonly amount: number;
    readonly status: LedgerStatus;
  }[];
  readonly subscriptions: readonly { id: string; name: string; renewal: string; status: string; note: string }[];
  readonly requests: readonly { id: string; title: string; status: string; date: string }[];
  readonly notices: readonly string[];
};

const poppyAccount = {
  name: "Poppy",
  id: "UW-0482",
  date: "November 14, 2026",
  household: "Poppy and her sister Clover",
  employer: "Goodshift · Reporting",
  ledger: [
    { id: "opening", date: "Nov 9", label: "Opening balance", amount: 652, status: "posted" },
    { id: "overtime", date: "Nov 10", label: "Goodshift · Reconcile the weekly report, overtime assignment", amount: 140, status: "posted" },
    { id: "delivery", date: "Nov 11", label: "HelpingHand · Unload a delivery at Market", amount: 12, status: "posted" },
    { id: "groceries", date: "Nov 11", label: "Market · Six rolls of toilet paper from the same warehouse", amount: 12, status: "spent" },
    { id: "rest", date: "Nov 12", label: "Dreamwell Plus · Four-hour session", amount: 250, status: "spent" },
    { id: "report", date: "Nov 13", label: "Goodshift · Second weekly report, awaiting client acceptance", amount: 140, status: "pending" },
    { id: "lodge", date: "Nov 13", label: "Everair · Lodge Collection order, awaiting fulfillment", amount: 60, status: "held" },
  ],
  subscriptions: [
    { id: "dreamwell", name: "Dreamwell Plus", renewal: "November 15, 2026", status: "Active", note: "Clover’s bundled rest access depends on the household account remaining in good standing." },
    { id: "everair", name: "Everair AirLink Premium", renewal: "November 14, 2026", status: "Cancellation in verification", note: "Requested November 13. Estimated verification November 16. Renewal is due during verification. Everair Sync is active. No Sync release is scheduled." },
    { id: "estate", name: "Estate continuity · Former Tomorrowly policy", renewal: "January 1, 2027", status: "Employer-sponsored through December 31, 2026", note: "Goodshift sponsors Poppy’s coverage through the end of the quarter." },
  ],
  requests: [
    { id: "appeal", title: "Goodshift · Unpaid report appeal", status: "Awaiting provider response", date: "November 13, 2026" },
    { id: "quote", title: "Dreamwell · Revised rest quote clarification", status: "Awaiting explanation", date: "November 14, 2026" },
    { id: "air-request", title: "Everair · Cancellation request", status: "In verification", date: "November 13, 2026" },
  ],
  notices: [
    "November 10 · Poppy picked up an extra Goodshift report to put toward four hours of sleep.",
    "November 12 · Poppy completed her Dreamwell session. Goodshift recorded a higher productivity score and opened an evening assignment window that had been reserved for rest.",
    "November 13 · Poppy submitted a second report in the evening window. The client has yet to accept it. Poppy appealed the pending payout.",
    "November 14 · Dreamwell issued a revised rest quote. The notice gives no reason for the revision.",
  ],
} as const satisfies MemberAccount;

const memberAccounts: ReadonlyMap<string, MemberAccount> = new Map([[poppyAccount.id, poppyAccount]]);
export const demoMemberId = poppyAccount.id;
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
