import "server-only";

import { getTokenBalances } from "@/content/memberAccount";
import { applyGameAction, GameActionError, type GameAction } from "./gameActions";
import { formatGameDate, gameDay, projectGameAccount } from "./gameState";
import { signSupportProposal, verifySupportProposal, type getMemberSession } from "./memberSession";

export type SupportSession = NonNullable<Awaited<ReturnType<typeof getMemberSession>>>;
export type SupportCard =
  | { kind: "navigate"; label: string; href: string }
  | { kind: "confirm"; label: string; detail: string; token: string };

const actions = {
  "work-shift": "Work your regular shift",
  sleep: "Book a 20-minute Dreamwell nap",
  "attend-fun": "Check in for a Fun Hour",
  "pay-rent": "Pay rent",
  "end-day": "Finish the day",
  buy: "Buy a Market item",
} as const;

export const supportedSupportActions = Object.keys(actions);

export function parseSupportAction(type: unknown, product?: unknown): GameAction | undefined {
  switch (type) {
    case "work-shift":
    case "sleep":
    case "attend-fun":
    case "pay-rent":
    case "end-day": return { type };
    case "buy": return typeof product === "string" && product.length <= 120 ? { type, product } : undefined;
  }
}

export function prepareSupportAction(session: SupportSession, type: unknown, product: unknown) {
  const action = parseSupportAction(type, product);
  if (!action || !Object.hasOwn(actions, action.type)) return { note: "That action is not available through Support." };
  try {
    const preview = applyGameAction(session.seed, session.game, action);
    const before = getTokenBalances(session.account);
    const after = getTokenBalances(projectGameAccount(session.seed, preview));
    const label = action.type === "buy" ? `Buy ${action.product}` : actions[action.type as keyof typeof actions];
    const parts = preview.ledger.slice(session.game.ledger.length).filter(({ status }) => status === "spent")
      .map(({ label, amount }) => `${label} · ${amount} Tokens`);
    if (gameDay(preview) !== gameDay(session.game)) parts.push(`Next account day: ${formatGameDate.format(new Date(gameDay(preview)))}`);
    const credited = after.available - before.available + (after.spent - before.spent);
    if (credited > 0) parts.push(`${credited} Tokens credited`);
    if (preview.unpaid.length) parts.push(`${preview.unpaid.length} outstanding bill(s) after confirmation`);
    parts.push(`${after.available} Tokens available after confirmation`);
    const payload = Buffer.from(JSON.stringify({
      action, revision: session.game.revision, expires: Date.now() + 5 * 60_000,
    })).toString("base64url");
    const token = `${payload}.${signSupportProposal(payload, session.sessionId)}`;
    const card: SupportCard = { kind: "confirm", label, detail: parts.join(" · "), token };
    return { note: `Confirmation offered: ${label}. ${card.detail}. The account has not changed.`, card };
  } catch (error) {
    if (error instanceof GameActionError) return { note: error.message };
    throw error;
  }
}

export function readSupportProposal(token: unknown, session: SupportSession): GameAction | undefined {
  if (typeof token !== "string" || token.length > 1024) return undefined;
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length || !verifySupportProposal(payload, signature, session.sessionId)) return undefined;
  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (value.revision !== session.game.revision || typeof value.expires !== "number" || value.expires < Date.now()) return undefined;
    return parseSupportAction(value.action?.type, value.action?.product);
  } catch {
    return undefined;
  }
}
