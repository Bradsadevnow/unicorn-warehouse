import "server-only";

import { getPosition } from "@/content/careerTracks";
import { getStarterHome } from "@/content/living";
import { getTokenBalances } from "@/content/memberAccount";
import { statIds, type Stats } from "@/content/survival";
import { townPath } from "@/content/unicornopolis";
import { getRentBill } from "./gameActions";
import { formatClockTime, formatGameDate, formatGameTime, gameDay } from "./gameState";
import type { getMemberSession } from "./memberSession";
import { starterHomeAddress } from "./starterHomes";
import { currentStats } from "./survival";

type Session = NonNullable<Awaited<ReturnType<typeof getMemberSession>>>;

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const day = (date: string) => shortDate.format(new Date(date));

/** Everything the member panel shows, as plain data for the client. */
export function getMemberPanel({ account, game }: Session) {
  const today = gameDay(game);
  const stats = currentStats(game);
  const balances = getTokenBalances(account);
  const home = getStarterHome(game.home?.homeId);
  const rent = getRentBill(game);
  const position = getPosition(game.employment.positionId);
  return {
    name: account.name,
    clock: formatGameTime(game.now),
    date: formatGameDate.format(new Date(today)),
    position: position?.title ?? "",
    stats: Object.fromEntries(statIds.map((id) => [id, stats[id]])) as Stats,
    schedule: [...game.blocks].sort((a, b) => a.start.localeCompare(b.start))
      .map(({ id, label, start, end }) => ({ id, label, time: `${formatClockTime(start)}–${formatClockTime(end)}`, done: end <= game.now })),
    unpaid: game.unpaid.map(({ id, label, amount, due }) => ({ id, label, amount, due: day(due) })),
    balances: { available: balances.available, pending: balances.pending, held: balances.held },
    recent: [...account.ledger].reverse().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
      .map(({ id, label, amount, status, date }) => ({ id, label, amount, status, date: day(date) })),
    pantry: Object.entries(game.pantry ?? {}).map(([item, servings]) => ({ item, servings })),
    home: home ? {
      name: home.name, address: starterHomeAddress(home), weeklyRent: home.weeklyRent, mapHref: townPath(home.lotId),
      kitchen: home.kitchen, nextRent: rent && !game.unpaid.some(({ id }) => id === rent.id) ? day(rent.due) : undefined,
    } : undefined,
  };
}

export type MemberPanelData = ReturnType<typeof getMemberPanel>;
