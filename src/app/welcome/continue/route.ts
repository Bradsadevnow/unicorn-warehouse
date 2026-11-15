import { NextResponse, type NextRequest } from "next/server";
import { signInProfiles } from "@/content/memberAccount";
import { createMemberSession, memberCookie, sessionLifetime } from "@/server/memberSession";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return new Response("Invalid sign-in origin.", { status: 403 });
  const form = await request.formData().catch(() => null);
  const profile = signInProfiles.find(({ id }) => id === form?.get("profile"));
  if (!profile) return new Response("Choose a member profile.", { status: 400 });

  const response = NextResponse.redirect(new URL("/home", request.url), 303);
  response.cookies.set(memberCookie, createMemberSession(profile.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: sessionLifetime,
  });
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
