import { NextResponse, type NextRequest } from "next/server";
import { writeMemberRecordsPdf } from "@/server/memberRecordsPdf";
import { getRecordsSigningKey, maxRecordsPdfSize, openMemberRecords, sealMemberRecords } from "@/server/memberRecordsSeal";
import { getMemberSession, startMemberSession } from "@/server/memberSession";

const cacheControl = "private, no-store";
const maxFormSize = maxRecordsPdfSize + 8192;

function showRecords(request: NextRequest, status: "invalid" | "unavailable" | "sign-in") {
  const location = new URL("/member-records", request.url);
  location.searchParams.set("status", status);
  return NextResponse.redirect(location, { status: 303, headers: { "Cache-Control": cacheControl } });
}

async function readStatement(request: NextRequest) {
  const type = request.headers.get("content-type");
  const length = Number(request.headers.get("content-length"));
  if (!type?.startsWith("multipart/form-data;") || length > maxFormSize || !request.body) return undefined;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxFormSize) {
      await reader.cancel();
      return undefined;
    }
    chunks.push(value);
  }
  const form = await new Response(new Uint8Array(Buffer.concat(chunks)), {
    headers: { "Content-Type": type },
  }).formData();
  const statement = form.get("statement");
  if (!(statement instanceof File) || statement.size > maxRecordsPdfSize) return undefined;
  return Buffer.from(await statement.arrayBuffer());
}

export async function GET(request: NextRequest) {
  const session = await getMemberSession();
  if (!session) return showRecords(request, "sign-in");
  const key = await getRecordsSigningKey(true);
  if (!key) return showRecords(request, "unavailable");

  const document = await writeMemberRecordsPdf(session.account, session.game);
  const sealed = sealMemberRecords(document, session.game, key);
  return new Response(new Uint8Array(sealed), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="UW-Member-Records-${session.game.now.slice(0, 10)}.pdf"`,
      "Cache-Control": cacheControl,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return new Response("Member Records only accepts submissions from Unicorn Warehouse.", { status: 403 });
  }
  const statement = await readStatement(request).catch(() => undefined);
  if (!statement) return showRecords(request, "invalid");
  const key = await getRecordsSigningKey(false);
  if (!key) return showRecords(request, "unavailable");
  const game = openMemberRecords(statement, key);
  if (!game) return showRecords(request, "invalid");

  const response = NextResponse.redirect(new URL("/account?restored=1", request.url), 303);
  return startMemberSession(response, game, request.nextUrl.protocol === "https:");
}
