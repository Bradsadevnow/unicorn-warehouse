import "server-only";

import { brotliCompressSync, brotliDecompressSync } from "node:zlib";
import type { GameState } from "./gameState";

export const gameCookie = "uw-game";
export const maxSnapshotSize = 3800;

export function encodeGameSnapshot(state: GameState, sign: (payload: string) => string) {
  const payload = brotliCompressSync(Buffer.from(JSON.stringify(state))).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeGameSnapshot(
  token: string, memberId: string, verify: (payload: string, signature: string) => boolean,
): GameState | undefined {
  if (token.length > maxSnapshotSize) return undefined;
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length || !verify(payload, signature)) return undefined;
  try {
    const state: GameState = JSON.parse(brotliDecompressSync(Buffer.from(payload, "base64url"), {
      maxOutputLength: 256 * 1024,
    }).toString("utf8"));
    if (state.version === 1 && state.player.id === memberId && typeof state.player.name === "string" && state.player.name.trim()) return state;
  } catch {
    return undefined;
  }
}
