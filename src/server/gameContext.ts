import "server-only";

import { dreamwellPricing } from "@/content/dreamwellPricing";
import { funHourRate } from "@/content/funplex";
import { rentals } from "@/content/living";
import { getTokenBalances, type MemberAccount } from "@/content/memberAccount";
import { completedFunHours } from "./funHours";
import { gameDay, projectGameAccount, type Bill, type GameState, type ObjectiveId } from "./gameState";

export const sampleLeases: Record<string, string> = { "UW-0482": "peach", "UW-0716": "sunbeam" };
export const firstRentDate = "2026-12-01";
// AirLink has no public catalog price yet. This is the rate on the seeded account's plan.
export const renewalPrices: Partial<Record<string, { amount: number; days: number; service: Bill["service"] }>> = {
  everair: { amount: 120, days: 30, service: "everair" },
  dreamwell: { amount: dreamwellPricing.subscriptions.plus.tokens, days: 1, service: "dreamwell" },
  softspace: { amount: 180, days: 30, service: "softspace" },
};

export class GameActionError extends Error {}

export function reject(message: string): never {
  throw new GameActionError(message);
}

export function getRentBill(game: GameState): Bill | undefined {
  const rental = rentals.find(({ id }) => id === sampleLeases[game.player.id]);
  if (!rental) return undefined;
  const today = gameDay(game);
  const due = today < firstRentDate ? firstRentDate : `${today.slice(0, 7)}-01`;
  return game.unpaid.find(({ service }) => service === "living") ?? {
    id: `rent-${due.slice(0, 7)}`, service: "living", label: `Living · ${rental.name} rent`,
    amount: rental.rent, due,
  };
}

/**
 * The ledger and objective helpers shared by player actions and calendar events.
 * `today` always reads the game clock, so entries are dated when they happen.
 */
export function createGameContext(seed: MemberAccount, next: GameState) {
  const today = () => gameDay(next);
  const account = () => projectGameAccount(seed, next);
  const available = () => getTokenBalances(account()).available;
  const append = (bill: Bill) => {
    const date = today();
    next.ledger.push({ id: bill.id, eventId: `${seed.id}-${bill.id}`, date,
      label: bill.label, amount: bill.amount, status: "spent", service: bill.service,
      ...(bill.due === date ? {} : { serviceDate: bill.due }),
    });
  };
  return {
    seed,
    next,
    today,
    account,
    available,
    append,
    complete(id: ObjectiveId) {
      const objective = next.objectives.find((item) => item.id === id);
      if (objective) objective.completed = true;
    },
    /** Charges a bill now, or rejects the action when it cannot be paid. */
    charge(bill: Bill) {
      if (next.ledger.some(({ id }) => id === bill.id)) reject("This item has already been paid.");
      if (available() < bill.amount) reject(`You need ${bill.amount} available Tokens for this payment.`);
      append(bill);
      next.unpaid = next.unpaid.filter(({ id }) => id !== bill.id);
    },
    /** Charges a bill when it falls due, or records it as unpaid. */
    billIfDue(bill: Bill) {
      if (next.ledger.some(({ id }) => id === bill.id) || next.unpaid.some(({ id }) => id === bill.id)) return;
      if (available() >= bill.amount) append(bill);
      else next.unpaid.push(bill);
    },
    /** Past-due charges get first claim on newly available Tokens. */
    collectUnpaid() {
      next.unpaid = next.unpaid.filter((bill) => {
        if (available() < bill.amount) return true;
        append(bill);
        return false;
      });
    },
    funBill(label: string): Bill {
      return { id: `fun-${today()}`, service: "funplex", label, amount: funHourRate, due: today() };
    },
    funCount() {
      return completedFunHours(account()) + next.unpaid.filter(({ service, due }) =>
        service === "funplex" && due.startsWith(today().slice(0, 7))).length;
    },
  };
}

export type GameContext = ReturnType<typeof createGameContext>;
