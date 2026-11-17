import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection, type NextResponse } from "next/server";
import { decodeGameSnapshot, encodeGameSnapshot, gameCookie } from "./gameSnapshot";
import { createPlayerAccount, projectGameAccount, type GameState } from "./gameState";

export const memberCookie = "uw-member";
export const sessionLifetime = 60 * 60 * 8;

const runtime = globalThis as typeof globalThis & { uwMemberSessionSecret?: string };

function sign(payload: string) {
  const secret = process.env.UW_SESSION_SECRET || process.env.UW_RECORDS_SECRET ||
    (runtime.uwMemberSessionSecret ??= randomBytes(32).toString("hex"));
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function verifies(payload: string, signature: string) {
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function signGameState(state: GameState, sessionId: string) {
  return encodeGameSnapshot(state, (payload) => sign(`game.${sessionId}.${payload}`));
}

export function signSupportProposal(payload: string, sessionId: string) {
  return sign(`support-proposal.v1.${sessionId}.${payload}`);
}

export function verifySupportProposal(payload: string, signature: string, sessionId: string) {
  return verifies(`support-proposal.v1.${sessionId}.${payload}`, signature);
}

export function updateGameCookie(response: NextResponse, snapshot: string, secure: boolean) {
  response.cookies.set(gameCookie, snapshot, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: sessionLifetime });
}

function createMemberSession(memberId: string) {
  const expires = Math.floor(Date.now() / 1000) + sessionLifetime;
  const sessionId = randomBytes(16).toString("hex");
  const payload = `${memberId}.${expires}.${sessionId}`;
  return { token: `${payload}.${sign(payload)}`, sessionId };
}

export function startMemberSession(response: NextResponse, game: GameState, secure: boolean) {
  const session = createMemberSession(game.player.id);
  const options = { httpOnly: true, sameSite: "lax" as const, secure, path: "/", maxAge: sessionLifetime };
  response.cookies.set(memberCookie, session.token, options);
  updateGameCookie(response, signGameState(game, session.sessionId), secure);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function getMemberSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(memberCookie)?.value;
  if (!value) return undefined;
  const [memberId, expires, sessionId, signature, ...rest] = value.split(".");
  if (!signature || rest.length || !/^\d+$/.test(expires) || !/^[a-f0-9]{32}$/.test(sessionId)) return undefined;
  await connection();
  if (Number(expires) <= Math.floor(Date.now() / 1000)) return undefined;
  if (!verifies(`${memberId}.${expires}.${sessionId}`, signature)) return undefined;
  const snapshot = cookieStore.get(gameCookie)?.value;
  if (!snapshot) return undefined;
  const game = decodeGameSnapshot(snapshot, memberId, (payload, signature) => verifies(`game.${sessionId}.${payload}`, signature));
  if (!game) return undefined;
  const seed = createPlayerAccount(game);
  return { account: projectGameAccount(seed, game), game, seed, sessionId };
}
