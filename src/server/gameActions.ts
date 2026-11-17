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
import { createGameContext, getRentBill, reject, type GameContext } from "./gameContext";
import { advanceClock, schedule } from "./gameEvents";
import { applyQuestInteraction } from "./recognitionQuestEngine";
import { addDays, addMinutes, atTime, formatClockTime, gameDay, morning, objectiveComplete, type GameState, type TimeBlock } from "./gameState";

export { GameActionError, getRentBill } from "./gameContext";

export type GameAction =
  | { type: "take-shift"; postingId: string }
  | { type: "buy"; product: string }
  | { type: "transfer"; positionId: string }
  | { type: "quest"; questId: string; interactionId: string; answer?: string }
  | { type: "meet-manager" | "buy-kit" | "work-shift" | "sleep" | "attend-fun" | "pay-rent" | "end-day" };

export const regularShiftHours = 8;
/** The regular shift starts at 9:00 a.m. Clocking in earlier waits for the start. */
export const regularShiftStart = "09:00";

/** How long each action takes, in minutes. Extra shifts use the posting's own duration. */
export const actionMinutes = {
  "meet-manager": 30,
  "buy-kit": 30,
  "work-shift": regularShiftHours * 60,
  buy: 30,
  sleep: 20,
  "attend-fun": 60,
  "pay-rent": 10,
  quest: 15,
} as const;

/** Brightside briefs describe the clip, not the work. Producing one takes this long. */
const briefMinutes = 90;

/** "45 minutes", "2 hours", or "90 minutes" to minutes. */
export function parseDuration(text: string | undefined) {
  const match = text?.match(/(\d+)\s*(minute|hour)/);
  if (!match) return 60;
  return Number(match[1]) * (match[2] === "hour" ? 60 : 1);
}

/**
 * Books the player's time from `start` for `minutes`, moving the clock through the activity so anything
 * scheduled meanwhile happens in order. Activities must finish before midnight and cannot overlap
 * another booked block.
 */
function book(ctx: GameContext, block: Omit<TimeBlock, "start" | "end">, minutes: number, start = ctx.next.now) {
  const { next } = ctx;
  const end = addMinutes(start, minutes);
  if (end.slice(0, 10) !== start.slice(0, 10) || end > atTime(start.slice(0, 10), "23:59")) {
    reject(`That takes until ${formatClockTime(end)}, past the end of the day. Finish the day and start fresh tomorrow.`);
  }
  const clash = next.blocks.find((other) => other.end > start && other.start < end);
  if (clash) reject(`You’re booked for ${clash.label} from ${formatClockTime(clash.start)} to ${formatClockTime(clash.end)}.`);
  advanceClock(ctx, end);
  next.blocks.push({ ...block, start, end });
}

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
      book(ctx, { id: `quest-${next.revision}`, kind: "quest", label: "Recognition Quest errand" }, actionMinutes.quest);
      break;
    }
    case "meet-manager":
      if (objectiveComplete(previous, "meet-manager")) reject("Your manager introduction is already on file.");
      book(ctx, { id: "meet-manager", kind: "onboarding", label: "Meeting your manager" }, actionMinutes["meet-manager"]);
      complete("meet-manager");
      break;
    case "buy-kit": {
      if (!objectiveComplete(previous, "meet-manager")) reject("Your manager needs to introduce you before you collect your kit.");
      const position = getPosition(next.employment.positionId)!;
      const kit = getTrack(position.track)!.pathwayKit;
      charge({ id: "pathway-kit", service: "market", label: `Market · ${kit.name}`, amount: kit.tokens, due: today });
      for (const item of kit.items) next.inventory[item] = (next.inventory[item] ?? 0) + 1;
      book(ctx, { id: "buy-kit", kind: "onboarding", label: "Collecting your Pathway Kit" }, actionMinutes["buy-kit"]);
      complete("buy-kit");
      break;
    }
    case "work-shift": {
      const id = `regular-${today}`;
      if (next.ledger.some((entry) => entry.id === id)) reject("Your regular shift is already on today’s statement.");
      const position = getPosition(next.employment.positionId)!;
      // Clock in at the scheduled start, or now if the shift has already begun. Pay posts at the end of the shift.
      const shiftStart = atTime(today, regularShiftStart);
      book(ctx, { id, kind: "work", label: `${position.title} shift` }, actionMinutes["work-shift"], next.now > shiftStart ? next.now : shiftStart);
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
      book(ctx, { id, kind: "extra-shift", label: `${company} · ${posting.title}` },
        creator ? briefMinutes : parseDuration("duration" in posting ? String(posting.duration) : undefined));
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
      book(ctx, { id: `purchase-${next.revision}`, kind: "errand", label: `Shopping at Market` }, actionMinutes.buy);
      next.inventory[name] = (next.inventory[name] ?? 0) + 1;
      break;
    }
    case "sleep":
      charge({ id: `nap-${today}`, service: "dreamwell", label: "Dreamwell · 20-minute nap",
        amount: dreamwellPricing.nap.tokens, due: today });
      book(ctx, { id: `nap-${today}`, kind: "rest", label: "Dreamwell nap" }, actionMinutes.sleep);
      break;
    case "attend-fun":
      if (funCount() >= requiredFunHours) reject("You’re already caught up on your Fun Hours.");
      charge(funBill("Funplex · Fun Hour check-in"));
      book(ctx, { id: `fun-${today}`, kind: "fun", label: "Fun Hour at the Funplex" }, actionMinutes["attend-fun"]);
      break;
    case "pay-rent": {
      const rent = getRentBill(next);
      if (!rent) reject("There is no lease on this account.");
      if (rent.due > today) reject("Your first rent payment is due December 1.");
      charge(rent);
      book(ctx, { id: `pay-${rent.id}`, kind: "errand", label: "Paying rent" }, actionMinutes["pay-rent"]);
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
      // Yesterday's blocks are on the ledger. Keep only what is still ahead.
      next.blocks = next.blocks.filter(({ end }) => end > next.now);
      complete("finish-day");
      break;
  }
  return next;
}
