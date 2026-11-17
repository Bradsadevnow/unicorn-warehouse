import "server-only";

import { getPosition, getTrack, employers, type Position } from "@/content/careerTracks";
import type { MemberAccount } from "@/content/memberAccount";

export type LedgerEntry = MemberAccount["ledger"][number];
export type GameService = "market" | "dreamwell" | "everair" | "softspace" | "living" | "bank" | "funplex";
export type Bill = {
  id: string;
  service: GameService;
  label: string;
  amount: number;
  due: string;
};

export type GameState = {
  version: 1;
  revision: number;
  player: { id: string; name: string };
  day: string;
  employment: MemberAccount["employment"];
  ledger: LedgerEntry[];
  settlements: Record<string, string>;
  shifts: { id: string; postingId: string; acceptance: string }[];
  renewalDates: Record<string, string>;
  unpaid: Bill[];
  inventory: Record<string, number>;
  questFlags: Record<string, boolean>;
  objectives: { id: ObjectiveId; completed: boolean }[];
};

export const starterTokens = 100;
export const firstDay = "2026-11-14";
const objectiveIds = ["meet-manager", "buy-kit", "first-shift", "finish-day"] as const;
export type ObjectiveId = typeof objectiveIds[number];

export function enrollPlayer(player: GameState["player"], position: Position): GameState {
  return {
    version: 1, revision: 0, player, day: firstDay,
    employment: { positionId: position.id, hornRank: "unicorn-trainee", hired: firstDay },
    ledger: [{ id: "opening", date: firstDay, label: "New member welcome credit", amount: starterTokens, status: "posted" }],
    settlements: {}, shifts: [], renewalDates: {}, unpaid: [], inventory: {}, questFlags: {},
    objectives: objectiveIds.map((id) => ({ id, completed: false })),
  };
}

export function createPlayerAccount(game: GameState): MemberAccount {
  const position = getPosition(game.employment.positionId)!;
  return {
    ...game.player, date: formatGameDate.format(new Date(game.day)), asOf: game.day,
    household: "Individual household",
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
  ].map((assignment) => game.settlements[assignment.ledgerEntryId]
    ? { ...assignment, status: "Client accepted" }
    : assignment);
  return {
    ...seed, asOf: game.day, date: formatGameDate.format(new Date(game.day)),
    employment: game.employment, ledger, assignments,
    outstandingFunDates: game.unpaid.filter(({ service }) => service === "funplex").map(({ due }) => due),
    employer: changedJob ? `${employers[position.business]?.name ?? position.business} · ${getTrack(position.track)!.name}` : seed.employer,
    subscriptions: seed.subscriptions.map((subscription) => {
      const renewal = game.renewalDates[subscription.id];
      const arrears = game.unpaid.find((bill) => bill.service === subscription.id);
      return {
        ...subscription,
        renewal: renewal ? formatGameDate.format(new Date(renewal)) : subscription.renewal,
        ...(arrears ? { note: `${subscription.note} A ${arrears.amount}-Token renewal is outstanding.` } : {}),
      };
    }),
  };
}
