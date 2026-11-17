import "server-only";

import { getStarterHome } from "@/content/living";
import {
  bedtime, comfortDrift, homelessComfort, homelessSleepQuality, interventions, lapsedOxygenPerHour, oxygenDrift,
  oxygenLevels, rates, softspaceComfort, startingStats, statIds, unpaidMoralePerHour, type Activity, type Stats,
} from "@/content/survival";
import type { GameContext } from "./gameContext";
import { addDays, addMinutes, atTime, minutesBetween, morning, type GameState, type TimeBlock } from "./gameState";

export type Survival = Stats & { at: string };

/** The member's stats as of the last time the clock moved. Saves made before stats existed start fresh. */
export function currentStats(game: Pick<GameState, "survival" | "now">): Survival {
  return game.survival ?? { ...startingStats, at: game.now };
}

/** What the player is doing during a time block. */
export function activityFor(kind: TimeBlock["kind"]): Activity {
  if (kind === "work" || kind === "extra-shift") return "work";
  if (kind === "rest") return "nap";
  return "awake";
}

/** Without a booked activity, members are awake by day and asleep from bedtime until morning. */
function defaultActivity(time: string): Activity {
  const clock = time.slice(11);
  return clock >= bedtime || clock < morning ? "sleep" : "awake";
}

/** The next time the default activity changes, so a slice never straddles bedtime or morning. */
function nextBoundary(time: string) {
  const day = time.slice(0, 10);
  const clock = time.slice(11);
  if (clock < morning) return atTime(day, morning);
  if (clock < bedtime) return atTime(day, bedtime);
  return atTime(addDays(day, 1), morning);
}

/** Everair Sync holds ambient air for synced members, so a past-due plan means no air at all. */
export function airSupply(ctx: Pick<GameContext, "seed" | "next">) {
  const plan = ctx.seed.subscriptions.find(({ id }) => id === "everair");
  if (!plan || plan.status.startsWith("Paused")) return "ambient" as const;
  return ctx.next.unpaid.some(({ service }) => service === "everair") ? "lapsed" as const : "everair" as const;
}

function softspaceActive(ctx: Pick<GameContext, "seed" | "next">) {
  const plan = ctx.seed.subscriptions.find(({ id }) => id === "softspace");
  return Boolean(plan && !plan.status.startsWith("Paused") && !ctx.next.unpaid.some(({ service }) => service === "softspace"));
}

const toward = (value: number, target: number, step: number) =>
  value < target ? Math.min(target, value + step) : Math.max(target, value - step);
const clamp = (value: number) => Math.max(0, Math.min(100, value));

/**
 * Moves the stats forward to `until`, slice by slice, using what the player is doing (`ctx.activity`,
 * or asleep at night and awake by day). When a stat runs out, the responsible department intervenes
 * and bills for it. Runs inside `advanceClock`, so it always sees the plans and bills of the moment.
 */
export function settleStats(ctx: GameContext, until: string) {
  const { next } = ctx;
  if (next.survival && until <= next.survival.at) return;
  const stats = currentStats(next);
  const home = getStarterHome(next.home?.homeId);
  let time = stats.at;
  while (time < until) {
    const activity = ctx.activity ?? defaultActivity(time);
    const end = [until, addMinutes(time, 60), ctx.activity ? until : nextBoundary(time)].sort()[0];
    const hours = minutesBetween(time, end) / 60;
    const rate = rates[activity];
    const malnourished = stats.satiety < 15;
    const distressed = stats.comfort < 20;

    stats.satiety = clamp(stats.satiety + rate.satiety * hours);
    let energy = rate.energy;
    if (energy < 0 && malnourished) energy *= 1.5;
    if (activity === "sleep") energy *= (home?.sleepQuality ?? homelessSleepQuality) * (distressed ? 0.6 : 1);
    stats.energy = clamp(stats.energy + energy * hours);
    const atHome = activity === "sleep";
    stats.morale = clamp(stats.morale + (rate.morale + next.unpaid.length * unpaidMoralePerHour
      + (atHome && distressed ? -0.5 : 0)) * hours);
    const comfortTarget = (home?.comfort ?? homelessComfort) + (softspaceActive(ctx) ? softspaceComfort : 0)
      - (stats.satiety < 30 ? 10 : 0);
    stats.comfort = clamp(toward(stats.comfort, comfortTarget, comfortDrift * hours) + rate.comfort * hours);
    const air = airSupply(ctx);
    stats.oxygen = clamp(air === "lapsed" ? stats.oxygen + lapsedOxygenPerHour * hours
      : toward(stats.oxygen, air === "everair" ? oxygenLevels.everair : activity === "work" ? oxygenLevels.ambientWork : oxygenLevels.ambient, oxygenDrift * hours));
    time = end;

    // Running out is never the end of the day. The department responsible steps in once a day and bills
    // for it. After that, the stat stays empty until the member does something about it.
    const day = time.slice(0, 10);
    const billed = (id: string) => next.ledger.some((entry) => entry.id === id) || next.unpaid.some((bill) => bill.id === id);
    if (stats.satiety <= 0 && !billed(`wellness-nutrition-${day}`)) {
      if (time > next.now) next.now = time;
      const care = interventions.nutrition;
      ctx.billIfDue({ id: `wellness-nutrition-${day}`, service: "wellness", label: care.label, amount: care.amount, due: day });
      stats.satiety = care.satiety;
      stats.energy = clamp(stats.energy + care.energy);
      stats.morale = clamp(stats.morale + care.morale);
    }
    if (stats.oxygen <= 0 && !billed(`everair-reconnect-${day}`)) {
      if (time > next.now) next.now = time;
      const care = interventions.reconnect;
      ctx.billIfDue({ id: `everair-reconnect-${day}`, service: "everair", label: care.label, amount: care.amount, due: day });
      stats.oxygen = care.oxygen;
    }
  }
  next.survival = { ...roundStats(stats), at: until };
}

function roundStats(stats: Stats): Stats {
  return Object.fromEntries(statIds.map((id) => [id, Math.round(stats[id] * 10) / 10])) as Stats;
}

/** Applies an immediate change, such as a meal or a Fun Hour, at the current time. */
export function adjustStats(ctx: GameContext, change: Partial<Stats>) {
  settleStats(ctx, ctx.next.now);
  const stats = ctx.next.survival!;
  for (const id of statIds) if (change[id]) stats[id] = clamp(stats[id] + change[id]!);
}
