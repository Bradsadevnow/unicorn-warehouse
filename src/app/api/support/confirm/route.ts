import { NextResponse, type NextRequest } from "next/server";
import { applyGameAction, GameActionError } from "@/server/gameActions";
import { maxSnapshotSize } from "@/server/gameSnapshot";
import { getMemberSession, signGameState, updateGameCookie } from "@/server/memberSession";
import { readSupportProposal } from "@/server/supportActions";

const headers = { "Cache-Control": "private, no-store" };

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Open Unicorn Warehouse to confirm this action." }, { status: 403, headers });
  }
  const session = await getMemberSession();
  if (!session) return NextResponse.json({ error: "Open your account to confirm this action." }, { status: 401, headers });
  const body = await request.json().catch(() => null);
  const action = readSupportProposal(body?.token, session);
  if (!action) return NextResponse.json({ error: "This confirmation has expired or the account has moved on. Ask me to prepare it again." }, { status: 409, headers });
  try {
    const game = applyGameAction(session.seed, session.game, action);
    const snapshot = signGameState(game, session.sessionId);
    if (snapshot.length > maxSnapshotSize) {
      return NextResponse.json({ error: "Your session has reached its record limit. Your account stayed as it was." }, { status: 409, headers });
    }
    const response = NextResponse.json({ ok: true }, { headers });
    updateGameCookie(response, snapshot, request.nextUrl.protocol === "https:");
    return response;
  } catch (error) {
    if (error instanceof GameActionError) return NextResponse.json({ error: error.message }, { status: 409, headers });
    throw error;
  }
}
