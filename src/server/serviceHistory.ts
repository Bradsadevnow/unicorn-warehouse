import "server-only";

import type { MemberAccount } from "@/content/memberAccount";

export const serviceNames = {
  dreamwell: "💤 Dreamwell",
  market: "🛒 Market",
  goodshift: "💼 Goodshift",
  helpinghand: "🤝 HelpingHand",
  brightside: "🎬 Brightside",
  everair: "🌬️ Everair",
  softspace: "🌡️ Softspace",
  living: "🏡 Living",
  bank: "🪙 Bank",
  funplex: "🎟️ Funplex",
  payroll: "💼 Payroll",
} as const;

type Service = keyof typeof serviceNames;
type LedgerEntry = MemberAccount["ledger"][number];
type HistoryRecord = {
  eventId: string;
  service: Service;
  date: string;
  title: string;
  detail: string;
  ledgerEntryIds?: readonly string[];
};

const marketOrders = [
  { member: "UW-0482", id: "0828", date: "2026-08-28", title: "Weekly groceries collected", detail: "Oats, apples and a carton of milk. Pickup completed at 5:20 p.m.", ledgerEntryIds: ["aug-market"] },
  { member: "UW-0482", id: "1001", date: "2026-10-03", title: "Missing pantry order refunded", detail: "The October 1 order never reached the pickup counter. Market closed the case on October 3.", ledgerEntryIds: ["market-original", "market-refund"], refund: true },
  { member: "UW-0482", id: "1021", date: "2026-10-21", title: "Pantry restock collected", detail: "Pasta, rice and tinned tomatoes. The requested substitution was accepted.", ledgerEntryIds: ["oct-market"] },
  { member: "UW-0482", id: "1111", date: "2026-11-11", title: "Household supplies collected", detail: "Six rolls collected from the warehouse pickup counter.", ledgerEntryIds: ["groceries"] },
  { member: "UW-0716", id: "0906", date: "2026-09-06", title: "Bath towels collected", detail: "Two sage towels picked up at the front counter.", ledgerEntryIds: ["towels"] },
  { member: "UW-0716", id: "1111", date: "2026-11-12", title: "Apple pickup window moved", detail: "Market moved the pickup to November 15 and closed the scheduling request. The reservation remains held.", ledgerEntryIds: ["market-hold"] },
] as const;

const restSessions = [
  { member: "UW-0482", id: "0902", date: "2026-09-02", title: "Afternoon rest", booked: 30, used: 24 },
  { member: "UW-0482", id: "0926", date: "2026-09-26", title: "Saturday rest", booked: 60, used: 52 },
  { member: "UW-0482", id: "1024", date: "2026-10-24", title: "Clover’s household nap", booked: 30, used: 27, grantId: "DW-HH-0482-10" },
  { member: "UW-0482", id: "1112", date: "2026-11-12", title: "Four-hour Dreamwell Plus session", booked: 240, used: 223, ledgerEntryIds: ["rest"] },
] as const;

const householdGrants = [{
  id: "DW-HH-0482-10",
  member: "UW-0482",
  beneficiary: "Clover",
  membership: "dreamwell",
  starts: "2026-10-01",
  ends: "2026-10-31",
  minutes: 60,
  standing: "good" as const,
}];

const membershipEvents = [
  { member: "UW-0482", service: "everair", eventId: "UW-0482-EA-0922", date: "2026-09-22", title: "Lodge blend delivered", detail: "The saved-up Lodge blend arrived at the household address.", ledgerEntryIds: ["sep-lodge"] },
  { member: "UW-0482", service: "everair", eventId: "UW-0482-EA-1018", date: "2026-10-18", title: "Offline allowance downloaded", detail: "Twelve breaths downloaded before travel. Eight used and four expired at reconnection." },
  { member: "UW-0482", service: "everair", eventId: "UW-0482-EA-1113", date: "2026-11-13", title: "AirLink cancellation requested", detail: "Verification opened. Everair Sync remains active, with no release appointment scheduled." },
  { member: "UW-0482", service: "everair", eventId: "UW-0482-EA-1113-LODGE", date: "2026-11-13", title: "Lodge shipment reserved", detail: "Fulfillment is outstanding. The reservation remains held.", ledgerEntryIds: ["lodge"] },
  { member: "UW-0482", service: "softspace", eventId: "UW-0482-SS-0919", date: "2026-09-19", title: "Evening adjustment applied", detail: "Used two warming adjustments from the Daily Balance allowance." },
  { member: "UW-0482", service: "softspace", eventId: "UW-0482-SS-1007", date: "2026-10-07", title: "Daily Balance paused", detail: "The pause was confirmed. The next billing date will be set on resumption." },
  { member: "UW-0716", service: "softspace", eventId: "UW-0716-SS-0916", date: "2026-09-16", title: "Evening warming applied", detail: "Used one warming adjustment from the Seasonal Select allowance." },
  { member: "UW-0716", service: "softspace", eventId: "UW-0716-SS-1028", date: "2026-10-28", title: "Heating package redeemed", detail: "The package was applied to the home profile.", ledgerEntryIds: ["heat"] },
  { member: "UW-0716", service: "softspace", eventId: "UW-0716-SS-1104", date: "2026-11-04", title: "Warming selected", detail: "Juniper selected warming as the primary direction for the billing cycle." },
] as const satisfies readonly (HistoryRecord & { member: string })[];

function requireEntry(account: MemberAccount, id: string): LedgerEntry {
  const entry = account.ledger.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing ledger entry ${account.id}/${id}`);
  return entry;
}

export function getServiceHistory(account: MemberAccount): HistoryRecord[] {
  const market: HistoryRecord[] = marketOrders.filter(({ member }) => member === account.id).map((order) => {
    const eventId = `${account.id}-MKT-${order.id}`;
    if ("refund" in order) {
      const [charge, refund] = order.ledgerEntryIds.map((id) => requireEntry(account, id));
      if (charge.status !== "spent" || refund.status !== "posted" || charge.amount !== refund.amount ||
          charge.date > refund.date || refund.date !== order.date || charge.eventId !== eventId || refund.eventId !== eventId) {
        throw new Error(`Refund does not reconcile for ${eventId}`);
      }
    }
    return { service: "market", eventId, date: order.date, title: order.title, detail: order.detail, ledgerEntryIds: order.ledgerEntryIds };
  });

  const grantUsage = new Map<string, number>();
  const dreamwell: HistoryRecord[] = restSessions.filter(({ member }) => member === account.id).map((session) => {
    const eventId = `${account.id}-DW-${session.id}`;
    let detail = `${session.used} of ${session.booked} booked minutes used.`;
    if (session.used > session.booked || session.used < 0) throw new Error(`Invalid rest duration for ${eventId}`);
    if ("grantId" in session) {
      const grant = householdGrants.find(({ id, member }) => id === session.grantId && member === account.id);
      const used = (grantUsage.get(session.grantId) ?? 0) + session.used;
      if (!grant || grant.standing !== "good" || session.date < grant.starts || session.date > grant.ends ||
          !account.subscriptions.some(({ id }) => id === grant.membership) || used > grant.minutes ||
          "ledgerEntryIds" in session) {
        throw new Error(`Household rest grant is invalid for ${eventId}`);
      }
      grantUsage.set(grant.id, used);
      detail += ` ${grant.beneficiary} used grant ${grant.id}. ${grant.minutes - used} minutes remained. No separate Token charge was posted.`;
    }
    return {
      service: "dreamwell", eventId, date: session.date, title: session.title, detail,
      ledgerEntryIds: "ledgerEntryIds" in session ? session.ledgerEntryIds : undefined,
    };
  });

  const work: HistoryRecord[] = account.assignments.map((assignment) => {
    const entry = requireEntry(account, assignment.ledgerEntryId);
    const expected = assignment.status === "Awaiting client acceptance" ? "pending" : "posted";
    if (entry.status !== expected || entry.amount <= 0) throw new Error(`Invalid payout for ${assignment.id}`);
    return {
      service: assignment.id.startsWith("GS-") ? "goodshift" : assignment.id.startsWith("BS-") ? "brightside" : "helpinghand",
      eventId: entry.eventId ?? assignment.id, date: entry.date, title: entry.label,
      detail: `${assignment.status}. ${entry.amount} Tokens ${entry.status} on the statement.`,
      ledgerEntryIds: [entry.id],
    };
  });

  const membership = membershipEvents.flatMap(({ member, ...event }) => member === account.id ? [event] : []);
  const activity: HistoryRecord[] = account.ledger.flatMap(({ service, eventId, id, date, serviceDate, label, amount, status }) =>
    service && eventId ? [{
      service, eventId, date, title: label, ledgerEntryIds: [id],
      detail: `${amount} Tokens ${status === "spent" ? "charged" : "credited"}.${serviceDate ? ` Service date: ${serviceDate}.` : ""}`,
    }] : []);
  const records: HistoryRecord[] = [...market, ...dreamwell, ...work, ...membership, ...activity];
  if (new Set(records.map(({ eventId }) => eventId)).size !== records.length) {
    throw new Error(`Duplicate service event for ${account.id}`);
  }
  for (const record of records) {
    for (const id of record.ledgerEntryIds ?? []) {
      const entry = requireEntry(account, id);
      if (entry.eventId && entry.eventId !== record.eventId) throw new Error(`Event mismatch for ${account.id}/${id}`);
    }
  }
  return records.sort((a, b) => b.date.localeCompare(a.date));
}
