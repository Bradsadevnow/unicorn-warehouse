import "server-only";

import { advanceFeeRate, advanceShare, annualPercentageSparkle, savingsGoal } from "@/content/bank";
import { type MemberAccount, getTokenBalances } from "@/content/memberAccount";

const day = 24 * 60 * 60 * 1000;

/** Bank view of a member account. Every figure is derived from the Token ledger. */
export function getBankAccount(account: MemberAccount) {
  const balances = getTokenBalances(account);
  const opening = account.ledger.find(({ id }) => id === "opening");
  const openedOn = opening?.date ?? account.ledger[0]?.date ?? account.asOf;
  const daysOpen = Math.max(0, Math.round((Date.parse(account.asOf) - Date.parse(openedOn)) / day));
  const sparkle = Math.floor(balances.available * annualPercentageSparkle * (daysOpen / 365));

  // Pace toward the savings goal: change in available Tokens since opening, per 30 days.
  const months = daysOpen / 30;
  const pace = months > 0 ? (balances.available - (opening?.amount ?? 0)) / months : 0;
  const monthsToGoal = pace > 0 ? Math.ceil((savingsGoal.tokens - balances.available) / pace) : undefined;

  const advances = account.ledger
    .filter(({ status }) => status === "pending")
    .map(({ id, label, amount }) => {
      const advance = Math.floor(amount * advanceShare);
      const fee = Math.ceil(advance * advanceFeeRate);
      return { ledgerEntryId: id, label, payout: amount, advance, fee, deposited: advance - fee };
    });

  return {
    available: balances.available,
    pending: balances.pending,
    held: balances.held,
    total: balances.available + balances.held,
    sparkle,
    daysOpen,
    goal: { ...savingsGoal, saved: balances.available, pacePerMonth: Math.round(pace), monthsToGoal },
    advances,
  };
}
