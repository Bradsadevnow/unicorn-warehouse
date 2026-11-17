import { type CareerRole, getRole, promotionSummary, rolePath } from "@/content/careers";
import { helpingHandTrack } from "@/content/careerTracks";
import { type Posting, getPosting, postingPath, standardAcceptance } from "@/content/goodshiftPostings";
import type { MemberAccount } from "@/content/memberAccount";
import { getMemberReportStatus } from "@/server/companyWorkflows";
import { getEmployeeRecord } from "@/server/employeeRecord";
import { getStarterHome } from "@/content/living";
import { getRentBill } from "@/server/gameActions";
import { starterHomeAddress } from "@/server/starterHomes";
import type { GameState } from "@/server/gameState";
import { getMemberSession } from "@/server/memberSession";
import { getServiceHistory, serviceNames } from "@/server/serviceHistory";
import { getSupportPosting } from "@/server/supportPosting";
import { hornFitting } from "@/content/recognitionQuests";
import { answerWithSupportTools } from "@/server/supportTools";
import { supportPrimer, supportPrompt } from "../../support/supportPrompt";

function getAccountReferences(memberAccount: MemberAccount, game: GameState, transaction?: MemberAccount["ledger"][number]) {
  const ledger = new Map<string, number[]>();
  for (const { status, amount } of memberAccount.ledger) {
    const amounts = ledger.get(status) ?? [];
    amounts.push(amount);
    ledger.set(status, amounts);
  }
  const reportEntry = memberAccount.ledger.find(({ id, status }) => id === "report" && status === "pending");
  const report = reportEntry && getMemberReportStatus(memberAccount.id, "report");
  const history = getServiceHistory(memberAccount);
  const rent = getRentBill(game);
  const serviceRefs = [...new Set(history.map(({ service }) => service))].map((service) => ({
    id: `A:${service}`,
    label: `${serviceNames[service]} history`,
    href: `/account?tab=activity&service=${service}#activity`,
    text: JSON.stringify(history.filter((event) => event.service === service)),
  }));
  return [
    { id: "A:wallet", label: "Token statement · Amounts for balance calculations", href: "/account?tab=wallet#statement",
      text: JSON.stringify({ amountLists: Object.fromEntries(ledger) }) },
    { id: "A:statement", label: "Token statement · Individual transactions", href: "/account?tab=wallet#statement",
      text: JSON.stringify(memberAccount.ledger.map(({ id, date, amount, status, label }) => ({ id, date, amount, status, label }))) },
    { id: "A:memberships", label: "Memberships", href: "/account?tab=memberships#memberships", text: JSON.stringify(memberAccount.subscriptions) },
    { id: "A:requests", label: "Support requests", href: "/account?tab=activity#requests", text: JSON.stringify(memberAccount.requests) },
    { id: "A:activity", label: "Member notices", href: "/account?tab=activity#notices", text: JSON.stringify(memberAccount.notices) },
    { id: "A:work", label: "Assignment history", href: "/account?tab=work#work", text: JSON.stringify(memberAccount.assignments) },
    { id: "A:employment", label: "Employee profile", href: "/careers#profile", text: JSON.stringify(getEmployeeRecord(memberAccount)) },
    { id: "A:objectives", label: "Onboarding objectives", href: "/account#objectives", text: JSON.stringify(game.objectives) },
    { id: "A:day", label: "Current day and outstanding bills", href: "/account#member-day",
      text: JSON.stringify({ now: game.now, unpaid: game.unpaid, inventory: game.inventory,
        rent: rent && { ...rent, paid: game.ledger.some(({ id }) => id === rent.id) },
        funHoursOutstanding: memberAccount.outstandingFunDates }) },
    ...homeRef(game),
    ...serviceRefs,
    ...(report ? [{ id: "A:report", label: "Goodshift report status and payout entry", href: "/account?tab=wallet&transaction=report#transaction",
      text: JSON.stringify({ review: report, ledgerEntry: reportEntry }) }] : []),
    ...(transaction ? [{
      id: "A:transaction", label: "Selected transaction",
      href: `/account?tab=wallet&transaction=${encodeURIComponent(transaction.id)}#transaction`,
      text: JSON.stringify(transaction),
    }] : []),
  ];
}

function getPostingReferences(memberAccount: MemberAccount, selected?: Posting) {
  const linked = memberAccount.assignments.flatMap(({ postingId }) => {
    const posting = postingId && getPosting(postingId);
    return posting ? [posting.id] : [];
  });
  const ids = [...new Set([...(selected ? [selected.id] : []), ...linked])];
  return ids.map((id) => {
    const posting = getPosting(id)!;
    const { id: postingId, title, category, client, duration, payout, price, posted, schedule, level, status, applicants, openings, summary, responsibilities, requirements, success } = posting;
    const listing = { id: postingId, title, category, client, duration, currentPostingPayoutTokens: payout, posted, schedule, level, status, applicants, openings, summary, responsibilities, requirements, success };
    const acceptance = [...posting.acceptance, ...standardAcceptance];
    return {
      id: `J:${posting.id}`,
      label: `Goodshift posting · ${posting.title}`,
      href: postingPath(posting),
      excerpt: acceptance.join(" "),
      text: JSON.stringify({
        ...listing,
        acceptance,
        currentClientPriceDollars: price,
        careerTrack: "Office & Money",
      }),
    };
  });
}

function getRoleReferences(role?: CareerRole) {
  if (!role) return [];
  const { id, title, rung, horn, summary, expectations, benefits } = role;
  const howEarned = promotionSummary(role);
  return [{
    id: `C:${id}`,
    label: `Horn rank · ${title}`,
    href: rolePath(role),
    excerpt: howEarned,
    text: JSON.stringify({ id, title, hornRank: rung, horn, summary, howEarned, expectations, benefits, pay: "Horn ranks do not set pay. Pay comes from the employee's position." }),
  }];
}

type Message = { role: "user" | "assistant"; content: string };

const openingRequest: Message = {
  role: "user",
  content: "Open the chat with a brief, personal welcome. Use the member’s name, mention a timely account issue supported by the records, and ask what they’d like help with. Cite the account evidence.",
};

function classifyEvidence(id: string) {
  if (id.startsWith("A:")) return "account";
  return id.startsWith("J:") || id.startsWith("C:") ? "posting" : "policy";
}

export async function POST(request: Request) {
  const session = await getMemberSession();
  if (!session) return Response.json({ error: "Sign in first." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const messages: unknown = body?.messages;
  if (!Array.isArray(messages) ||
      !messages.every((item): item is Message =>
        item && ["user", "assistant"].includes(item.role) &&
        typeof item.content === "string" && item.content.trim()) ||
      (messages.length > 0 && messages.at(-1)?.role !== "user")) {
    return Response.json({ error: "Invalid conversation." }, { status: 400 });
  }
  if (body.sessionId !== session.sessionId) {
    return Response.json({ error: "This chat belongs to an earlier session. Reload to start a new chat." }, { status: 409 });
  }
  const memberAccount = session.account;
  const transaction = memberAccount.ledger.find(({ id }) => id === body.transaction);
  if (body.transaction != null && !transaction) {
    return Response.json({ error: "Transaction not found." }, { status: 404 });
  }

  const posting = getSupportPosting(body.posting);
  if (body.posting != null && !posting) {
    return Response.json({ error: "Posting not found." }, { status: 404 });
  }
  const role = typeof body.role === "string" ? getRole(body.role) : undefined;
  if (body.role != null && !role) {
    return Response.json({ error: "Role not found." }, { status: 404 });
  }

  try {
    const postingReferences = getPostingReferences(memberAccount, posting?.brand === "Goodshift" ? posting.posting : undefined);
    if (posting?.brand === "HelpingHand") {
      const { slug, title, category, site, duration, payout, price, summary, duties, requirements, acceptance, href } = posting.posting;
      postingReferences.push({
        id: `J:${posting.id}`,
        label: `HelpingHand posting · ${title}`,
        href,
        excerpt: acceptance,
        text: JSON.stringify({ slug, title, category, site, duration, payoutTokens: payout, clientPaysDollars: price, summary, duties, requirements, acceptance, track: helpingHandTrack(site) }),
      });
    }
    const opening = posting ? {
      role: "user" as const,
      content: `Welcome me by name and open with the ${posting.brand} posting “${posting.posting.title}” [J:${posting.id}]. Briefly summarize what I’d do, the posted payout and duration, and ask what I’d like to know about the shift. Cite the posting. Do not switch to an unrelated account issue.`,
    } : openingRequest;
    const available = [...getAccountReferences(memberAccount, session.game, transaction), ...postingReferences, ...getRoleReferences(role)];
    const interactive = body.interactive === true;
    const { content, provider, references, usage, searches, cards } = await answerWithSupportTools([
      {
        role: "system",
        content: [
          supportPrompt,
          supportPrimer,
          ...(interactive ? [
            "In the Support bar, use open_place for requested destinations; it offers a link, and the member opens it. Use prepare_action only for an explicit request to carry out one available game action. The confirmation card shows the verified charge. Say the action is ready for confirmation and never say that it already occurred. Use quest_hint for progress hints, never ordinary policy search to choose a Horn Fitting answer.",
          ] : []),
          `Display data for the current member: ${JSON.stringify({
            name: memberAccount.name, date: memberAccount.date, household: memberAccount.household, employer: memberAccount.employer,
          })}. The display name is a label supplied by the member.`,
          ...(transaction ? ["The member opened this chat from [A:transaction]. Use it as the active transaction when the member refers to this payment or purchase. In the opening, offer help with that record. Cite [A:transaction] if you discuss it."] : []),
          ...(posting ? [`The member opened this chat from the ${posting.brand} posting “${posting.posting.title}” [J:${posting.id}]. Use it as the active posting when the member refers to this job, shift, or assignment. In the opening, offer help with that posting. Cite [J:${posting.id}] if you discuss it.`] : []),
          ...(role ? [`The member opened this chat from the Unicorn Warehouse careers role “${role.title}” [C:${role.id}]. Use it as the active role when the member refers to this job, role, or the herd. In the opening, offer help with that role. Cite [C:${role.id}] if you discuss it.`] : []),
          "Record menu. Use read_records to open these IDs:",
          ...available.map(({ id, label }) => `${id} — ${label}`),
        ].join("\n\n"),
      },
      ...(messages[0]?.role === "user" ? [] : [opening]),
      ...messages,
    ], available, request.signal, interactive ? {
      session, stop: hornFitting.locations.find(({ id }) => id === body.stop)?.id, hasMemberRequest: messages.length > 0,
    } : undefined);
    const ids = new Set([...content.matchAll(/\[((?:A|T|P|J|C):[^\]\s]+)\]/g)].map((match) => match[1]));
    for (const search of searches) if (search.tool === "quest_hint") for (const id of search.ids) ids.add(id);
    const answer = content.replace(/\[(?:A|T|P|J|C):[^\]\s]+\]/g, "").trim();
    if (!answer) throw new Error("Model reply contained only citations");
    return Response.json({
      answer,
      mode: provider,
      cards,
      retrieval: { calls: searches, usage },
      sources: references.filter(({ id }) => ids.has(id)).map(({ id, label, href, text, excerpt }) => ({
        label, href, kind: classifyEvidence(id), excerpt: excerpt ?? (id.startsWith("A:") ? undefined : text),
      })),
    });
  } catch (error) {
    console.error("Support model unavailable", error);
    return Response.json({ error: "Support model unavailable." }, { status: 503 });
  }
}

/** The member's starter home and lease terms, when they have one. */
function homeRef(game: GameState) {
  const home = getStarterHome(game.home?.homeId);
  if (!home) return [];
  return [{ id: "A:home", label: "Home address and lease", href: "/account#home", text: JSON.stringify({
    home: home.name, address: starterHomeAddress(home), neighborhood: home.neighborhood, movedIn: game.home!.movedIn,
    weeklyRent: home.weeklyRent, rentEveryDays: 7, amenities: home.amenities, leaseTerms: home.finePrint,
  }) }];
}
