import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { link, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { getPosition } from "@/content/careerTracks";
import { getRole } from "@/content/careers";
import { decodeGameSnapshot, encodeGameSnapshot, maxSnapshotSize } from "./gameSnapshot";
import type { GameState } from "./gameState";

const marker = "%UW-MEMBER-RECORDS-v1 ";
export const maxRecordsPdfSize = 768 * 1024;

function hasCode(error: unknown, code: string) {
  return error instanceof Error && "code" in error && error.code === code;
}

export async function getRecordsSigningKey(create: boolean) {
  const configured = process.env.UW_RECORDS_SECRET || process.env.UW_SESSION_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV !== "development") return undefined;

  const keyPath = join(process.cwd(), ".local-member-records-key.pem");
  try {
    return (await readFile(keyPath, "utf8")).trim();
  } catch (error) {
    if (!hasCode(error, "ENOENT")) throw error;
    if (!create) return undefined;
  }

  const key = randomBytes(32).toString("hex");
  const temporary = `${keyPath}.${randomBytes(8).toString("hex")}.pem`;
  await writeFile(temporary, key, { flag: "wx", mode: 0o600 });
  try {
    await link(temporary, keyPath);
    return key;
  } catch (error) {
    if (!hasCode(error, "EEXIST")) throw error;
    return (await readFile(keyPath, "utf8")).trim();
  } finally {
    await unlink(temporary);
  }
}

function signature(key: string, document: Buffer, memberId: string, payload: string) {
  return createHmac("sha256", key).update(`uw-member-records.v1.${memberId}.${payload}\n`)
    .update(document).digest("base64url");
}

export function sealMemberRecords(document: Buffer, game: GameState, key: string) {
  // A PDF comment above startxref leaves the file's existing cross-reference offsets intact.
  const trailer = document.lastIndexOf("\nstartxref\n") + 1;
  if (trailer < 1) throw new Error("Member Records PDF has no cross-reference trailer.");
  const token = encodeGameSnapshot(game, (payload) => signature(key, document, game.player.id, payload));
  const sealed = Buffer.concat([
    document.subarray(0, trailer), Buffer.from(`${marker}${game.player.id} ${token}\n`), document.subarray(trailer),
  ]);
  if (token.length > maxSnapshotSize || sealed.length > maxRecordsPdfSize) {
    throw new Error("Member Records PDF exceeds the supported size.");
  }
  return sealed;
}

export function openMemberRecords(document: Buffer, key: string) {
  if (document.length > maxRecordsPdfSize || !document.subarray(0, 5).equals(Buffer.from("%PDF-"))) return undefined;
  const start = document.lastIndexOf(`\n${marker}`) + 1;
  if (!start || document.length - start > maxSnapshotSize + 128) return undefined;
  const footer = document.subarray(start + marker.length).toString("latin1");
  const match = /^([A-Z0-9-]{1,32}) ([A-Za-z0-9_.-]+)\n(startxref\n\d+\n%%EOF\n?)$/.exec(footer);
  if (!match || match[0].length !== footer.length) return undefined;
  const [, memberId, token, trailer] = match;
  const original = Buffer.concat([document.subarray(0, start), Buffer.from(trailer)]);
  const game = decodeGameSnapshot(token, memberId, (payload, supplied) => {
    const expected = Buffer.from(signature(key, original, memberId, payload));
    const actual = Buffer.from(supplied);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
  if (!game || !getPosition(game.employment.positionId) || !getRole(game.employment.hornRank)) return undefined;
  return game;
}
