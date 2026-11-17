import "server-only";

import { departments } from "@/app/market/catalog";
import { inactivityFee, maintenanceFee, maintenanceWaiverBalance, welcomePeriodEnds } from "@/content/bank";
import { getPosition, getTrack, isOpenEntryPosition, payByLevel } from "@/content/careerTracks";
import { dreamwellPricing } from "@/content/dreamwellPricing";
import { funHourRate, requiredFunHours } from "@/content/funplex";
import { getPosting } from "@/content/goodshiftPostings";
import { getHelpingHandPosting } from "@/content/helpingHandPostings";
import { getBrightsideBrief } from "@/content/gigCatalogs";
import { rentals } from "@/content/living";
import { getTokenBalances, type MemberAccount } from "@/content/memberAccount";
import { postingTrack } from "./employeeRecord";
import { completedFunHours, lastDayOfMonth } from "./funHours";
import { applyQuestInteraction } from "./recognitionQuestEngine";
import { addDays, objectiveComplete, projectGameAccount, type Bill, type GameState, type ObjectiveId } from "./gameState";

export type GameAction =
  | { type: "take-shift"; postingId: string }
  | { type: "buy"; product: string }
  | { type: "transfer"; positionId: string }
  | { type: "quest"; questId: string; interactionId: string; answer?: string }
  | { type: "meet-manager" | "buy-kit" | "work-shift" | "sleep" | "attend-fun" | "pay-rent" | "end-day" };

export const regularShiftHours = 8;

const sampleLeases: Record<string, string> = { "UW-0482": "peach", "UW-0716": "sunbeam" };
const firstRentDate = "2026-12-01";
// AirLink has no public catalog price yet. This is the rate on the seeded account's plan.
const renewalPrices: Partial<Record<string, { amount: number; days: number; service: Bill["service"] }>> = {
  everair: { amount: 120, days: 30, service: "everair" },
  dreamwell: { amount: dreamwellPricing.subscriptions.plus.tokens, days: 1, service: "dreamwell" },
  softspace: { amount: 180, days: 30, service: "softspace" },
};

export class GameActionError extends Error {}

function reject(message: string): never {
  throw new GameActionError(message);
}

export function getRentBill(game: GameState): Bill | undefined {
  const rental = rentals.find(({ id }) => id === sampleLeases[game.player.id]);
  if (!rental) return undefined;
  const due = game.day < firstRentDate ? firstRentDate : `${game.day.slice(0, 7)}-01`;
  return game.unpaid.find(({ service }) => service === "living") ?? {
    id: `rent-${due.slice(0, 7)}`, service: "living", label: `Living · ${rental.name} rent`,
    amount: rental.rent, due,
  };
}

export function applyGameAction(seed: MemberAccount, previous: GameState, action: GameAction): GameState {
  if (!objectiveComplete(previous, "buy-kit") && action.type !== "meet-manager" && action.type !== "buy-kit") {
    reject("Meet your manager and collect your Pathway Kit to start your first day.");
  }
  const next = structuredClone(previous);
  next.revision += 1;
  const complete = (id: ObjectiveId) => {
    const objective = next.objectives.find((item) => item.id === id);
    if (objective) objective.completed = true;
  };
  const today = next.day;
  const account = () => projectGameAccount(seed, next);
  const available = () => getTokenBalances(account()).available;
  const append = (bill: Bill) => {
    next.ledger.push({ id: bill.id, eventId: `${seed.id}-${bill.id}`, date: today,
      label: bill.label, amount: bill.amount, status: "spent", service: bill.service,
      ...(bill.due === today ? {} : { serviceDate: bill.due }),
    });
  };
  const charge = (bill: Bill) => {
    if (next.ledger.some(({ id }) => id === bill.id)) reject("This item has already been paid.");
    if (available() < bill.amount) reject(`You need ${bill.amount} available Tokens for this payment.`);
    append(bill);
    next.unpaid = next.unpaid.filter(({ id }) => id !== bill.id);
  };
  const billIfDue = (bill: Bill) => {
    if (next.ledger.some(({ id }) => id === bill.id)) return;
    if (available() >= bill.amount) append(bill);
    else next.unpaid.push(bill);
  };
  const funBill = (label: string): Bill => ({
    id: `fun-${today}`, service: "funplex", label, amount: funHourRate, due: today,
  });
  const funCount = () => completedFunHours(account()) + next.unpaid.filter(({ service, due }) =>
    service === "funplex" && due.startsWith(today.slice(0, 7))).length;

  switch (action.type) {
    case "quest": {
      const error = applyQuestInteraction(next, account(), action.questId, action.interactionId, action.answer);
      if (error) reject(error);
      break;
    }
    case "meet-manager":
      if (objectiveComplete(previous, "meet-manager")) reject("Your manager introduction is already on file.");
      complete("meet-manager");
      break;
    case "buy-kit": {
      if (!objectiveComplete(previous, "meet-manager")) reject("Your manager needs to introduce you before you collect your kit.");
      const position = getPosition(next.employment.positionId)!;
      const kit = getTrack(position.track)!.pathwayKit;
      charge({ id: "pathway-kit", service: "market", label: `Market · ${kit.name}`, amount: kit.tokens, due: today });
      for (const item of kit.items) next.inventory[item] = (next.inventory[item] ?? 0) + 1;
      complete("buy-kit");
      break;
    }
    case "work-shift": {
      const id = `regular-${today}`;
      if (next.ledger.some((entry) => entry.id === id)) reject("Your regular shift is already on today’s statement.");
      const position = getPosition(next.employment.positionId)!;
      next.ledger.push({ id, eventId: `${seed.id}-${id}`, date: today, label: `Payroll · ${position.title} · ${regularShiftHours} hours`,
        amount: payByLevel[position.level] * regularShiftHours, status: "posted", service: "payroll" });
      complete("first-shift");
      break;
    }
    case "take-shift": {
      const helping = action.postingId.startsWith("helpinghand:");
      const creator = action.postingId.startsWith("brightside:");
      const posting = helping ? getHelpingHandPosting(action.postingId.slice("helpinghand:".length))
        : creator ? getBrightsideBrief(action.postingId) : getPosting(action.postingId);
      if (!posting) reject("This shift is unavailable.");
      const postingId = "id" in posting ? posting.id : `helpinghand:${posting.slug}`;
      if (postingTrack(postingId) !== getPosition(next.employment.positionId)?.track) {
        reject("Choose an extra shift in your career track.");
      }
      const id = `${helping ? "HH" : creator ? "BS" : "GS"}-${today}-extra`;
      const company = helping ? "HelpingHand" : creator ? "Brightside" : "Goodshift";
      if (next.shifts.some((shift) => shift.id.endsWith(`${today}-extra`))) reject("Today’s extra shift is already recorded.");
      next.shifts.push({ id, postingId, acceptance: addDays(today, 1) });
      next.ledger.push({ id, eventId: `${seed.id}-${id}`, date: today, amount: posting.payout,
        label: `${company} · ${posting.title}, awaiting client acceptance`, status: "pending" });
      break;
    }
    case "buy": {
      const item = departments.flatMap(({ products }) => products).find(([name]) => name === action.product);
      if (!item) reject("This Market item is unavailable.");
      const [name, size, amount] = item;
      charge({ id: `purchase-${next.revision}`, service: "market", label: `Market · ${name} · ${size}`, amount, due: today });
      next.inventory[name] = (next.inventory[name] ?? 0) + 1;
      break;
    }
    case "sleep":
      charge({ id: `nap-${today}`, service: "dreamwell", label: "Dreamwell · 20-minute nap",
        amount: dreamwellPricing.nap.tokens, due: today });
      break;
    case "attend-fun":
      if (funCount() >= requiredFunHours) reject("You’re already caught up on your Fun Hours.");
      charge(funBill("Funplex · Fun Hour check-in"));
      break;
    case "pay-rent": {
      const rent = getRentBill(next);
      if (!rent) reject("There is no lease on this account.");
      if (rent.due > today) reject("Your first rent payment is due December 1.");
      charge(rent);
      break;
    }
    case "transfer": {
      const position = getPosition(action.positionId);
      const current = getPosition(next.employment.positionId);
      if (!position || position.track === current?.track || !isOpenEntryPosition(position)) {
        reject("Choose an open entry position in a different track.");
      }
      next.employment = { ...next.employment, positionId: position.id, beforeTransfer: account().assignments.map(({ id }) => id) };
      break;
    }
    case "end-day": {
      const acceptances = [...next.shifts];
      if (seed.id === "UW-0482") acceptances.push({ id: "report", postingId: "GS-P-2001", acceptance: "2026-11-15" });
      for (const { id, acceptance } of acceptances) {
        if (acceptance <= today && !next.settlements[id]) next.settlements[id] = today;
      }
      // Past due charges get first claim on newly available Tokens.
      next.unpaid = next.unpaid.filter((bill) => {
        if (available() < bill.amount) return true;
        append(bill);
        return false;
      });
      const rent = getRentBill({ ...next, unpaid: [] });
      if (rent?.due === today) billIfDue(rent);
      for (const subscription of seed.subscriptions) {
        const price = renewalPrices[subscription.id];
        if (!price || subscription.status.startsWith("Paused")) continue;
        const due = next.renewalDates[subscription.id] ?? new Date(subscription.renewal).toISOString().slice(0, 10);
        if (due !== today) continue;
        billIfDue({ id: `renewal-${subscription.id}-${today}`, ...price, label: `${subscription.name} · Renewal`, due });
        next.renewalDates[subscription.id] = addDays(today, price.days);
      }
      if (today > new Date(welcomePeriodEnds).toISOString().slice(0, 10) && today.endsWith("-01")) {
        const balances = getTokenBalances(account());
        const lastDeposit = account().ledger.filter(({ status }) => status === "posted").map(({ date }) => date).sort().at(-1);
        if (balances.available + balances.held < maintenanceWaiverBalance) {
          billIfDue({ id: `maintenance-${today}`, service: "bank", label: "Bank · Monthly maintenance", amount: maintenanceFee, due: today });
        }
        if (lastDeposit && lastDeposit <= addDays(today, -30)) {
          billIfDue({ id: `inactivity-${today}`, service: "bank", label: "Bank · Inactivity", amount: inactivityFee, due: today });
        }
      }
      const remaining = requiredFunHours - funCount();
      const tomorrow = addDays(today, 1);
      if (remaining > 0 && today >= addDays(lastDayOfMonth(today), 1 - remaining)) {
        billIfDue(funBill("Funplex · Scheduled Fun Hour check-in"));
      }
      next.day = tomorrow;
      complete("finish-day");
      break;
    }
  }
  return next;
}
