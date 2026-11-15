import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { getMemberAccount } from "@/content/memberAccount";

export const memberCookie = "uw-member";
export const sessionLifetime = 60 * 60 * 8;

const runtime = globalThis as typeof globalThis & { uwMemberSessionSecret?: string };

function sign(payload: string) {
  const secret = process.env.UW_SESSION_SECRET || (runtime.uwMemberSessionSecret ??= randomBytes(32).toString("hex"));
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createMemberSession(memberId: string) {
  const expires = Math.floor(Date.now() / 1000) + sessionLifetime;
  const payload = `${memberId}.${expires}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

export async function getMemberSession() {
  const value = (await cookies()).get(memberCookie)?.value;
  if (!value) return undefined;
  const [memberId, expires, sessionId, signature, ...rest] = value.split(".");
  if (!signature || rest.length || !/^\d+$/.test(expires) || !/^[a-f0-9]{32}$/.test(sessionId)) return undefined;
  await connection();
  if (Number(expires) <= Math.floor(Date.now() / 1000)) return undefined;
  const expected = Buffer.from(sign(`${memberId}.${expires}.${sessionId}`));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return undefined;
  const account = getMemberAccount(memberId);
  return account ? { account, sessionId } : undefined;
}
