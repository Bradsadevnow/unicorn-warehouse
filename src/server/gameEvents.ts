import "server-only";

import { inactivityFee, maintenanceFee, maintenanceWaiverBalance, welcomePeriodEnds } from "@/content/bank";
import { requiredFunHours } from "@/content/funplex";
import { getTokenBalances } from "@/content/memberAccount";
import { firstRentDate, getRentBill, renewalPrices, type GameContext } from "./gameContext";
import { lastDayOfMonth } from "./funHours";
import { addDays, atTime, gameDay, type GameEvent } from "./gameState";

/** Times of day for repeating events. Bills fall due at midnight; scheduled Fun Hours start at 6:00 a.m. */
const times = { bill: "00:00", bankMonth: "00:30", funHour: "06:00", shiftAcceptance: "17:00" } as const;
const welcomeEnd = new Date(welcomePeriodEnds).toISOString().slice(0, 10);

/** Events that share a time fire in this order. */
const kindOrder: GameEvent["kind"][] = ["rent", "renewal", "bank-month", "fun-hour", "settle-shift"];

export function schedule(ctx: GameContext, event: GameEvent) {
  const exists = ctx.next.events.some(({ kind, ref, at }) => kind === event.kind && ref === event.ref && at === event.at);
  if (!exists) ctx.next.events.push(event);
}

const pending = (ctx: GameContext, kind: GameEvent["kind"], ref?: string) =>
  ctx.next.events.some((event) => event.kind === kind && event.ref === ref);

function firstOfNextMonth(date: string) {
  return addDays(lastDayOfMonth(date), 1);
}

/** The first day of the month's scheduled Fun Hours window on or after `date`. */
function nextFunHourDay(date: string) {
  const windowStart = addDays(lastDayOfMonth(date), 1 - requiredFunHours);
  if (date <= windowStart) return windowStart;
  if (date <= lastDayOfMonth(date)) return date;
  return addDays(lastDayOfMonth(firstOfNextMonth(date)), 1 - requiredFunHours);
}

/**
 * Puts the next occurrence of every repeating obligation on the calendar if it is missing.
 * New games and upgraded saves get their schedule this way.
 */
function ensureRecurring(ctx: GameContext) {
  const { next, seed } = ctx;
  const today = gameDay(next);

  // Rent and bank events are safe to run twice, so a save made on the 1st reschedules that day
  // in case its charges have not run yet. The charges skip bills already on the statement.
  const firstOfMonth = today.endsWith("-01");
  if (!pending(ctx, "rent") && getRentBill({ ...next, unpaid: [] })) {
    const due = today < firstRentDate ? firstRentDate : firstOfMonth ? today : firstOfNextMonth(today);
    schedule(ctx, { at: atTime(due, times.bill), kind: "rent" });
  }
  for (const subscription of seed.subscriptions) {
    const price = renewalPrices[subscription.id];
    if (!price || subscription.status.startsWith("Paused") || pending(ctx, "renewal", subscription.id)) continue;
    const due = new Date(subscription.renewal).toISOString().slice(0, 10);
    // A seeded renewal date in the past was already handled before this account's game began.
    if (due >= today) schedule(ctx, { at: atTime(due, times.bill), kind: "renewal", ref: subscription.id });
  }
  if (!pending(ctx, "bank-month")) {
    const first = firstOfMonth && today > welcomeEnd ? today : firstOfNextMonth(today > welcomeEnd ? today : welcomeEnd);
    schedule(ctx, { at: atTime(first, times.bankMonth), kind: "bank-month" });
  }
  if (!pending(ctx, "fun-hour")) {
    const day = nextFunHourDay(next.now <= atTime(today, times.funHour) ? today : addDays(today, 1));
    schedule(ctx, { at: atTime(day, times.funHour), kind: "fun-hour" });
  }
  // The legacy sample report for UW-0482 settles on its original acceptance date.
  if (seed.id === "UW-0482" && !next.settlements.report && !pending(ctx, "settle-shift", "report")) {
    schedule(ctx, { at: atTime("2026-11-15", times.shiftAcceptance), kind: "settle-shift", ref: "report" });
  }
}

function runEvent(ctx: GameContext, event: GameEvent) {
  const { next, seed } = ctx;
  const today = gameDay(next);
  switch (event.kind) {
    case "settle-shift":
      if (event.ref && !next.settlements[event.ref]) next.settlements[event.ref] = today;
      break;
    case "rent": {
      const rent = getRentBill({ ...next, unpaid: [] });
      if (rent?.due === today) ctx.billIfDue(rent);
      schedule(ctx, { at: atTime(firstOfNextMonth(today), times.bill), kind: "rent" });
      break;
    }
    case "renewal": {
      const subscription = seed.subscriptions.find(({ id }) => id === event.ref);
      const price = subscription && renewalPrices[subscription.id];
      if (!subscription || !price) break;
      ctx.billIfDue({ id: `renewal-${subscription.id}-${today}`, ...price, label: `${subscription.name} · Renewal`, due: today });
      schedule(ctx, { at: atTime(addDays(today, price.days), times.bill), kind: "renewal", ref: subscription.id });
      break;
    }
    case "bank-month": {
      if (today > welcomeEnd) {
        const account = ctx.account();
        const balances = getTokenBalances(account);
        const lastDeposit = account.ledger.filter(({ status }) => status === "posted").map(({ date }) => date).sort().at(-1);
        if (balances.available + balances.held < maintenanceWaiverBalance) {
          ctx.billIfDue({ id: `maintenance-${today}`, service: "bank", label: "Bank · Monthly maintenance", amount: maintenanceFee, due: today });
        }
        if (lastDeposit && lastDeposit <= addDays(today, -30)) {
          ctx.billIfDue({ id: `inactivity-${today}`, service: "bank", label: "Bank · Inactivity", amount: inactivityFee, due: today });
        }
      }
      schedule(ctx, { at: atTime(firstOfNextMonth(today), times.bankMonth), kind: "bank-month" });
      break;
    }
    case "fun-hour": {
      const remaining = requiredFunHours - ctx.funCount();
      if (remaining > 0 && today >= addDays(lastDayOfMonth(today), 1 - remaining)) {
        ctx.billIfDue(ctx.funBill("Funplex · Scheduled Fun Hour check-in"));
      }
      schedule(ctx, { at: atTime(nextFunHourDay(addDays(today, 1)), times.funHour), kind: "fun-hour" });
      break;
    }
  }
}

/** The next event due at or before `until`, earliest first. */
function nextDue(events: GameEvent[], until: string) {
  let best = -1;
  events.forEach((event, index) => {
    if (event.at > until) return;
    const current = events[best];
    if (!current || event.at < current.at
      || (event.at === current.at && kindOrder.indexOf(event.kind) < kindOrder.indexOf(current.kind))) best = index;
  });
  return best;
}

/**
 * Moves the game clock forward to `target`, firing every scheduled event in between in chronological
 * order. Each event runs with the clock set to its own time, so its ledger entries carry its date.
 */
export function advanceClock(ctx: GameContext, target: string) {
  const { next } = ctx;
  if (target < next.now) throw new Error(`The game clock cannot move backward from ${next.now} to ${target}`);
  ensureRecurring(ctx);
  for (let guard = 0; guard < 1000; guard++) {
    const index = nextDue(next.events, target);
    if (index < 0) break;
    const [event] = next.events.splice(index, 1);
    if (event.at > next.now) next.now = event.at;
    runEvent(ctx, event);
    ctx.collectUnpaid();
    ensureRecurring(ctx);
  }
  next.now = target;
}
