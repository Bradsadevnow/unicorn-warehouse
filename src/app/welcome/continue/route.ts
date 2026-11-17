import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getPosition, isOpenEntryPosition } from "@/content/careerTracks";
import { getStarterHome } from "@/content/living";
import { getMembershipOffer } from "@/content/memberships";
import { enrollPlayer } from "@/server/gameState";
import { startMemberSession } from "@/server/memberSession";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin !== request.nextUrl.origin) return new Response("Invalid sign-in origin.", { status: 403 });
  const form = await request.formData().catch(() => null);
  const rawName = form?.get("name");
  const name = typeof rawName === "string" ? rawName.trim().replace(/\s+/g, " ") : "";
  const positionId = form?.get("position");
  const position = typeof positionId === "string" ? getPosition(positionId) : undefined;
  if (!name || name.length > 48) return new Response("Enter a name of up to 48 characters.", { status: 400 });
  if (!position || !isOpenEntryPosition(position) || position.track !== form?.get("track")) {
    return new Response("Choose an open entry position in your selected track.", { status: 400 });
  }

  const homeId = form?.get("home");
  const home = typeof homeId === "string" ? getStarterHome(homeId) : undefined;
  if (!home) return new Response("Choose a starter home.", { status: 400 });

  const player = { id: `UW-${randomBytes(8).toString("hex").toUpperCase()}`, name };
  const memberships = form!.getAll("membership").filter((id): id is string => typeof id === "string" && Boolean(getMembershipOffer(id)));
  const game = enrollPlayer(player, position, home.id, memberships);
  const response = NextResponse.redirect(new URL("/account#objectives", request.url), 303);
  return startMemberSession(response, game, request.nextUrl.protocol === "https:");
}
