import "server-only";

import { getPosition, getTrack, employers, type Position } from "@/content/careerTracks";
import { getStarterHome } from "@/content/living";
import type { MemberAccount } from "@/content/memberAccount";
import { startingStats, type Stats } from "@/content/survival";

export type LedgerEntry = MemberAccount["ledger"][number];
export type GameService = "market" | "dreamwell" | "everair" | "softspace" | "living" | "bank" | "funplex" | "wellness" | "quickserve";
export type Bill = {
  id: string;
  service: GameService;
  label: string;
  amount: number;
  due: string;
};

/**
 * Something scheduled on the game calendar. Advancing the clock fires every event up to the new time,
 * in chronological order. Repeating events keep only their next occurrence, so the queue stays small.
 */
export type GameEvent = {
  /** Calendar time, "YYYY-MM-DDTHH:MM". */
  at: string;
  kind: "settle-shift" | "rent" | "renewal" | "bank-month" | "fun-hour";
  /** What the event is about, such as a shift id or a subscription id. */
  ref?: string;
};

/**
 * A span of calendar time the player is busy: a shift, an errand, a Fun Hour, a delivery window.
 * Every system that books time uses this one shape, so the calendar can show them together and
 * the game can refuse to put the player in two places at once.
 */
export type TimeBlock = {
  id: string;
  kind: "work" | "extra-shift" | "errand" | "rest" | "fun" | "quest" | "onboarding" | "meal";
  label: string;
  /** "YYYY-MM-DDTHH:MM" */
  start: string;
  /** "YYYY-MM-DDTHH:MM" */
  end: string;
};

export type GameState = {
  version: 2;
  revision: number;
  player: { id: string; name: string };
  /** The authoritative game clock, "YYYY-MM-DDTHH:MM". Every date in the game derives from it. */
  now: string;
  events: GameEvent[];
  /** Today's and upcoming time blocks. Earlier days are cleared when the day ends; the ledger keeps the record. */
  blocks: TimeBlock[];
  /** Where the player lives: a starter home from living.ts. Saves made before homes existed have none. */
  home?: { homeId: string; movedIn: string };
  /** Oxygen, satiety, energy, comfort and morale as of `at`. Saves made before stats existed start fresh. */
  survival?: Stats & { at: string };
  /** Grocery servings at home, by Market product name. */
  pantry?: Record<string, number>;
  employment: MemberAccount["employment"];
  ledger: LedgerEntry[];
  settlements: Record<string, string>;
  /** Extra shifts. `productivity` is the score at clock-in; clients do not accept work below the threshold. */
  shifts: { id: string; postingId: string; acceptance: string; productivity?: number; declined?: boolean }[];
  unpaid: Bill[];
  inventory: Record<string, number>;
  questFlags: Record<string, boolean>;
  objectives: { id: ObjectiveId; completed: boolean }[];
};

export const starterTokens = 100;
export const firstDay = "2026-11-14";
/** Each game day starts at this time, including the first. */
export const morning = "08:00";
const objectiveIds = ["meet-manager", "buy-kit", "first-shift", "finish-day"] as const;
export type ObjectiveId = typeof objectiveIds[number];

export function enrollPlayer(player: GameState["player"], position: Position, homeId?: string): GameState {
  return {
    version: 2, revision: 0, player, now: `${firstDay}T${morning}`, events: [], blocks: [],
    survival: { ...startingStats, at: `${firstDay}T${morning}` },
    ...(getStarterHome(homeId) ? { home: { homeId: homeId!, movedIn: firstDay } } : {}),
    employment: { positionId: position.id, hornRank: "unicorn-trainee", hired: firstDay },
    ledger: [{ id: "opening", date: firstDay, label: "New member welcome credit", amount: starterTokens, status: "posted" }],
    settlements: {}, shifts: [], unpaid: [], inventory: {}, questFlags: {},
    objectives: objectiveIds.map((id) => ({ id, completed: false })),
  };
}

/** The calendar date of the game clock, "YYYY-MM-DD". */
export function gameDay(game: Pick<GameState, "now">) {
  return game.now.slice(0, 10);
}

/** Adds minutes to a calendar time. */
export function addMinutes(time: string, minutes: number) {
  return new Date(Date.parse(`${time}:00Z`) + minutes * 60_000).toISOString().slice(0, 16);
}

/** Minutes between two calendar times. */
export function minutesBetween(start: string, end: string) {
  return Math.round((Date.parse(`${end}:00Z`) - Date.parse(`${start}:00Z`)) / 60_000);
}

/** A calendar time on a date, "YYYY-MM-DDTHH:MM". */
export function atTime(date: string, time: string) {
  return `${date}T${time}`;
}

type GameStateV1 = Omit<GameState, "version" | "now" | "events" | "blocks"> & { version: 1; day: string; renewalDates: Record<string, string> };

/**
 * Upgrades a saved game to the current version. Version 1 saves tracked a date only. They resume at
 * the start of that day, with their renewals and pending shift acceptances moved onto the calendar.
 */
export function migrateGameState(saved: GameState | GameStateV1): GameState | undefined {
  // Version 2 saves made before time blocks existed have no blocks yet.
  if (saved.version === 2) return { ...saved, blocks: saved.blocks ?? [] };
  if (saved.version !== 1) return undefined;
  const { day, renewalDates, ...rest } = saved;
  const events: GameEvent[] = [
    ...Object.entries(renewalDates).map(([ref, date]): GameEvent => ({ at: atTime(date, "00:00"), kind: "renewal", ref })),
    ...rest.shifts.filter(({ id }) => !rest.settlements[id])
      .map(({ id, acceptance }): GameEvent => ({ at: atTime(acceptance, "17:00"), kind: "settle-shift", ref: id })),
  ];
  return { ...rest, version: 2, now: atTime(day, morning), events, blocks: [] };
}

export function createPlayerAccount(game: GameState): MemberAccount {
  const position = getPosition(game.employment.positionId)!;
  return {
    ...game.player, date: formatGameDate.format(new Date(gameDay(game))), asOf: gameDay(game),
    household: getStarterHome(game.home?.homeId) ? `Individual household · ${getStarterHome(game.home?.homeId)!.name}` : "Individual household",
    employer: `${employers[position.business]?.name ?? position.business} · ${getTrack(position.track)!.name}`,
    employment: game.employment, ledger: [], subscriptions: [], assignments: [], requests: [],
    notices: ["Your Trainee enrollment is on file. Your welcome credit is ready in your Token wallet. ✨"],
  };
}

export function objectiveComplete(game: GameState, id: ObjectiveId) {
  return game.objectives.some((objective) => objective.id === id && objective.completed);
}

export const formatGameDate = new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
});

const formatClock = new Intl.DateTimeFormat("en-US", { weekday: "long", hour: "numeric", minute: "2-digit", timeZone: "UTC" });

const formatHour = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });

/** "9:00 AM" for a calendar time. */
export function formatClockTime(time: string) {
  return formatHour.format(new Date(`${time}:00Z`));
}

/** "Saturday, 8:00 AM" for the game clock. */
export function formatGameTime(now: string) {
  return formatClock.format(new Date(`${now}:00Z`));
}

export function addDays(date: string, days: number) {
  const value = new Date(date);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function projectGameAccount(seed: MemberAccount, game: GameState): MemberAccount {
  const position = getPosition(game.employment.positionId)!;
  const changedJob = position.id !== seed.employment.positionId;
  const ledger = [...seed.ledger, ...game.ledger].map((entry) => {
    const settled = game.settlements[entry.id];
    return settled ? {
      ...entry, date: settled, status: "posted" as const,
      label: entry.label.replace(", awaiting client acceptance", ""),
    } : entry;
  });
  const assignments = [
    ...seed.assignments,
    ...game.shifts.map(({ id, postingId }) => ({
      id, postingId, ledgerEntryId: id, status: "Awaiting client acceptance",
    })),
  ].map((assignment) => game.shifts.some(({ id, declined }) => declined && id === assignment.ledgerEntryId)
    ? { ...assignment, status: "Not accepted by client" }
    : game.settlements[assignment.ledgerEntryId]
      ? { ...assignment, status: "Client accepted" }
      : assignment);
  return {
    ...seed, asOf: gameDay(game), date: formatGameDate.format(new Date(gameDay(game))),
    employment: game.employment, ledger, assignments,
    outstandingFunDates: game.unpaid.filter(({ service }) => service === "funplex").map(({ due }) => due),
    employer: changedJob ? `${employers[position.business]?.name ?? position.business} · ${getTrack(position.track)!.name}` : seed.employer,
    subscriptions: seed.subscriptions.map((subscription) => {
      const renewal = game.events.find(({ kind, ref }) => kind === "renewal" && ref === subscription.id)?.at.slice(0, 10);
      const arrears = game.unpaid.find((bill) => bill.service === subscription.id);
      return {
        ...subscription,
        renewal: renewal ? formatGameDate.format(new Date(renewal)) : subscription.renewal,
        ...(arrears ? { note: `${subscription.note} A ${arrears.amount}-Token renewal is outstanding.` } : {}),
      };
    }),
  };
}
