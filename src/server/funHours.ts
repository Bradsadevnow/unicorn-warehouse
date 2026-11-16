import "server-only";

import { attractions, funHourRate, requiredFunHours } from "@/content/funplex";
import { type MemberAccount, getTokenBalances } from "@/content/memberAccount";

const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

/** A member's Fun Hours for the month of their account date, derived from the Token ledger. */
export function getFunHours(account: MemberAccount) {
  const month = account.asOf.slice(0, 7);
  const completed = account.ledger.filter(({ date, label, status }) =>
    date.startsWith(month) && label.startsWith("Funplex") && status === "spent").length;
  const remaining = Math.max(0, requiredFunHours - completed);

  // Unused Fun Hours are scheduled on the last days of the month, latest first.
  const [year, monthNumber] = month.split("-").map(Number);
  const lastDay = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
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
    scheduled,
    due: remaining * funHourRate,
    available: getTokenBalances(account).available,
  };
}
