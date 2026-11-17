import "server-only";

import { departments } from "@/app/market/catalog";
import { getPosition, getTrack, isOpenEntryPosition, payByLevel } from "@/content/careerTracks";
import { dreamwellPricing } from "@/content/dreamwellPricing";
import { requiredFunHours } from "@/content/funplex";
import { getPosting } from "@/content/goodshiftPostings";
import { getHelpingHandPosting } from "@/content/helpingHandPostings";
import { getBrightsideBrief } from "@/content/gigCatalogs";
import type { MemberAccount } from "@/content/memberAccount";
import { postingTrack } from "./employeeRecord";
import { createGameContext, getRentBill, reject } from "./gameContext";
import { advanceClock, schedule } from "./gameEvents";
import { applyQuestInteraction } from "./recognitionQuestEngine";
import { addDays, atTime, gameDay, morning, objectiveComplete, type GameState } from "./gameState";

export { GameActionError, getRentBill } from "./gameContext";

export type GameAction =
  | { type: "take-shift"; postingId: string }
  | { type: "buy"; product: string }
  | { type: "transfer"; positionId: string }
  | { type: "quest"; questId: string; interactionId: string; answer?: string }
  | { type: "meet-manager" | "buy-kit" | "work-shift" | "sleep" | "attend-fun" | "pay-rent" | "end-day" };

export const regularShiftHours = 8;

export function applyGameAction(seed: MemberAccount, previous: GameState, action: GameAction): GameState {
  if (!objectiveComplete(previous, "buy-kit") && action.type !== "meet-manager" && action.type !== "buy-kit") {
    reject("Meet your manager and collect your Pathway Kit to start your first day.");
  }
  const next = structuredClone(previous);
  next.revision += 1;
  const ctx = createGameContext(seed, next);
  const { account, charge, complete, funBill, funCount } = ctx;
  const today = gameDay(next);

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
      const acceptance = addDays(today, 1);
      next.shifts.push({ id, postingId, acceptance });
      schedule(ctx, { at: atTime(acceptance, "17:00"), kind: "settle-shift", ref: id });
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
    case "end-day":
      // Past-due charges are collected at the close of the day, then the player sleeps until tomorrow
      // morning. Everything scheduled overnight happens in order on the way.
      ctx.collectUnpaid();
      advanceClock(ctx, atTime(addDays(today, 1), morning));
      complete("finish-day");
      break;
  }
  return next;
}
