import { NextResponse, type NextRequest } from "next/server";
import { applyGameAction, GameActionError, type GameAction } from "@/server/gameActions";
import { maxSnapshotSize } from "@/server/gameSnapshot";
import { getMemberSession, signGameState, updateGameCookie } from "@/server/memberSession";
import { questLocationPath } from "@/content/recognitionQuests";
import { getQuestInteraction } from "@/server/recognitionQuestEngine";

function parseAction(form: FormData): GameAction | undefined {
  const type = form.get("action");
  const choice = form.get("choice");
  switch (type) {
    case "quest": {
      const questId = form.get("questId");
      const interactionId = form.get("interactionId");
      return typeof questId === "string" && typeof interactionId === "string"
        ? { type, questId, interactionId, answer: typeof choice === "string" ? choice : undefined } : undefined;
    }
    case "take-shift": return typeof choice === "string" ? { type, postingId: choice } : undefined;
    case "buy": return typeof choice === "string" ? { type, product: choice } : undefined;
    case "transfer": return typeof choice === "string" ? { type, positionId: choice } : undefined;
    case "end-day":
    case "meet-manager":
    case "buy-kit":
    case "work-shift":
    case "attend-fun":
    case "sleep":
    case "pay-rent": return { type };
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return new Response("Invalid action origin.", { status: 403 });
  const session = await getMemberSession();
  if (!session) return NextResponse.redirect(new URL("/", request.url), 303);
  const form = await request.formData().catch(() => null);
  const action = form && parseAction(form);
  if (!action) return new Response("Choose a valid action.", { status: 400 });

  const onboardingAction = action.type === "meet-manager" || action.type === "buy-kit";
  const interaction = action.type === "quest" && getQuestInteraction(action.questId, action.interactionId);
  if (action.type === "quest" && !interaction) return new Response("This desk has no record of that interaction.", { status: 400 });
  const returnPath = action.type === "quest" && interaction
    ? questLocationPath(action.questId, interaction.location) : onboardingAction ? "/account#objectives" : "/account#member-day";
  const returnTo = new URL(returnPath, request.url);
  const response = (error?: string) => {
    if (error) returnTo.searchParams.set("actionError", error);
    const result = NextResponse.redirect(returnTo, 303);
    result.headers.set("Cache-Control", "private, no-store");
    return result;
  };

  if (form.get("revision") !== String(session.game.revision)) {
    return response("Your account has moved on since this page opened. Review your updated day and try again.");
  }
  try {
    const game = applyGameAction(session.seed, session.game, action);
    const snapshot = signGameState(game, session.sessionId);
    if (snapshot.length > maxSnapshotSize) {
      return response("Your session has reached its record limit. Your previous account state is still available.");
    }
    const result = response();
    updateGameCookie(result, snapshot, request.nextUrl.protocol === "https:");
    return result;
  } catch (error) {
    if (error instanceof GameActionError) return response(error.message);
    throw error;
  }
}
