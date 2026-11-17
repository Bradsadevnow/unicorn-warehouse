import "server-only";

import { attractions, funHourRate, requiredFunHours } from "@/content/funplex";
import { type MemberAccount, getTokenBalances } from "@/content/memberAccount";

const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

export function completedFunHours(account: MemberAccount) {
  const month = account.asOf.slice(0, 7);
  return account.ledger.filter(({ date, serviceDate, label, status }) =>
    (serviceDate ?? date).startsWith(month) && label.startsWith("Funplex") && status === "spent").length;
}

export function lastDayOfMonth(date: string) {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
}

/** A member's Fun Hours for the month of their account date, derived from the Token ledger. */
export function getFunHours(account: MemberAccount) {
  const completed = completedFunHours(account);
  const unpaid = account.outstandingFunDates?.filter((date) => date.startsWith(account.asOf.slice(0, 7))).length ?? 0;
  const remaining = Math.max(0, requiredFunHours - completed - unpaid);

  // Unused Fun Hours are scheduled on the last days of the month, latest first.
  const [year, monthNumber, lastDay] = lastDayOfMonth(account.asOf).split("-").map(Number);
  const offset = Number(account.id.replace(/\D/g, "")) % attractions.length;
  const scheduled = Array.from({ length: remaining }, (_, index) => {
    const attraction = attractions[(offset + index) % attractions.length];
    return {
      date: dateFormat.format(new Date(Date.UTC(year, monthNumber - 1, lastDay - index))),
      time: "6:00 a.m.",
      attraction: `${attraction.name} · ${attraction.kind}`,
    };
  }).reverse();

  return {
    required: requiredFunHours,
    completed,
    unpaid,
    scheduled,
    due: remaining * funHourRate,
    available: getTokenBalances(account).available,
  };
}
