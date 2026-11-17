import "server-only";

import { getTokenBalances, type MemberAccount } from "@/content/memberAccount";
import { createGameContext } from "./gameContext";
import { advanceClock } from "./gameEvents";
import { lastDayOfMonth } from "./funHours";
import { addDays, atTime, gameDay, projectGameAccount, type GameEvent, type GameState } from "./gameState";

export type CalendarEntry = {
  id: string;
  /** "YYYY-MM-DDTHH:MM" */
  at: string;
  /** For booked time blocks. */
  end?: string;
  kind: "block" | "bill" | "unpaid" | "payout" | "milestone" | "overdue";
  title: string;
  detail?: string;
  /** Tokens. Negative for charges. */
  amount?: number;
};

const probationDays = 90;

/**
 * The member's calendar from the start of this month through the end of the `months`th month, built by
 * playing the real event schedule forward on a copy of the game with no further player actions.
 * Every charge and payout it shows is exactly what the engine would do if nothing else happened.
 */
export function projectCalendar(seed: MemberAccount, game: GameState, months = 3) {
  const today = gameDay(game);
  const from = `${today.slice(0, 7)}-01`;
  let until = today;
  for (let i = 0; i < months; i++) until = addDays(lastDayOfMonth(until), 1);
  until = addDays(until, -1);

  const entries: CalendarEntry[] = [];
  const simulation = structuredClone(game);
  const ctx = createGameContext(seed, simulation);
  const seen = new Set(game.ledger.map(({ id }) => id));
  const seenUnpaid = new Set(game.unpaid.map(({ id }) => id));

  // Bills land at the time of the event that charged them. Stat interventions happen between events,
  // so anything dated another day is placed at the start of its own day.
  const placed = (date: string, at: string) => date === at.slice(0, 10) ? at : atTime(date, "00:00");
  const collect = (at: string) => {
    for (const entry of simulation.ledger) {
      if (seen.has(entry.id)) continue;
      seen.add(entry.id);
      entries.push({ id: `bill-${entry.id}`, at: placed(entry.date, at), kind: "bill", title: entry.label, amount: -entry.amount });
    }
    for (const bill of simulation.unpaid) {
      if (seenUnpaid.has(bill.id)) continue;
      seenUnpaid.add(bill.id);
      const short = bill.amount - getTokenBalances(projectGameAccount(seed, simulation)).available;
      entries.push({ id: `unpaid-${bill.id}`, at: placed(bill.due, at), kind: "unpaid", title: bill.label, amount: -bill.amount,
        detail: `At your current balance you’d be ${short} Tokens short. It stays outstanding until it can be collected.` });
    }
  };
  advanceClock(ctx, atTime(until, "23:59"), (event: GameEvent) => {
    collect(event.at);
    if (event.kind === "settle-shift" && event.ref) {
      const payout = simulation.ledger.find(({ id }) => id === event.ref);
      if (payout) {
        entries.push({ id: `payout-${event.ref}`, at: event.at, kind: "payout",
          title: `${payout.label.replace(", awaiting client acceptance", "")} accepted`, amount: payout.amount });
      }
    }
  });
  collect(atTime(until, "23:59"));

  for (const block of game.blocks) {
    entries.push({ id: `block-${block.id}`, at: block.start, end: block.end, kind: "block", title: block.label });
  }
  for (const bill of game.unpaid) {
    entries.push({ id: `overdue-${bill.id}`, at: atTime(today, "00:00"), kind: "overdue", title: bill.label,
      detail: `Overdue since ${bill.due}. Collected as soon as your balance covers it.`, amount: -bill.amount });
  }
  const probationEnd = addDays(game.employment.hired, probationDays);
  if (probationEnd > today && probationEnd <= until) {
    entries.push({ id: "probation", at: atTime(probationEnd, "09:00"), kind: "milestone", title: "Probation complete",
      detail: "You become eligible to be considered for a horn fitting." });
  }

  entries.sort((a, b) => a.at.localeCompare(b.at));
  return { now: game.now, today, from, until, entries };
}

export type ProjectedCalendar = ReturnType<typeof projectCalendar>;
