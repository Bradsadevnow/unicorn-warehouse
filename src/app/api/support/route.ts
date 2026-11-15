import { type MemberAccount, getTokenBalances } from "@/content/memberAccount";
import { terms, productDetails } from "@/content/portfolioTerms";
import { getMemberReportStatus } from "@/server/companyWorkflows";
import { complete } from "@/server/model";
import { getMemberSession } from "@/server/memberSession";
import { getServiceHistory, serviceNames } from "@/server/serviceHistory";
import { supportPrompt } from "../../support/supportPrompt";

function getAccountReferences(memberAccount: MemberAccount, transaction?: MemberAccount["ledger"][number]) {
  const balances = getTokenBalances(memberAccount);
  const report = getMemberReportStatus(memberAccount.id, "report");
  const history = getServiceHistory(memberAccount);
  const serviceRefs = [...new Set(history.map(({ service }) => service))].map((service) => ({
    id: `A:${service}`,
    label: `${serviceNames[service]} history`,
    href: `/account?tab=activity&service=${service}#activity`,
    text: JSON.stringify(history.filter((event) => event.service === service)),
  }));
  return [
    { id: "A:statement", label: "Token statement", href: "/account?tab=wallet#statement", text: JSON.stringify({ balances, ledger: memberAccount.ledger }) },
    { id: "A:memberships", label: "Memberships", href: "/account?tab=memberships#memberships", text: JSON.stringify(memberAccount.subscriptions) },
    { id: "A:requests", label: "Support requests", href: "/account?tab=activity#requests", text: JSON.stringify(memberAccount.requests) },
    { id: "A:activity", label: "Member notices", href: "/account?tab=activity#notices", text: JSON.stringify(memberAccount.notices) },
    { id: "A:work", label: "Assignment history", href: "/account?tab=work#work", text: JSON.stringify(memberAccount.assignments) },
    ...serviceRefs,
    ...(report ? [{ id: "A:report", label: "Goodshift report status", href: "/account?tab=wallet&transaction=report#transaction", text: JSON.stringify(report) }] : []),
    ...(transaction ? [{
      id: "A:transaction", label: "Selected transaction",
      href: `/account?tab=wallet&transaction=${encodeURIComponent(transaction.id)}#transaction`,
      text: JSON.stringify(transaction),
    }] : []),
  ];
}

const policyReferences = [
  ...([
    ["T", "Terms & Conditions", "/terms", terms],
    ["P", "Product Details", "/product-details", productDetails],
  ] as const).flatMap(([prefix, title, path, sections]) =>
    sections.flatMap((section, index) =>
      section.paragraphs.map((text, clause) => ({
        id: `${prefix}:${index + 1}.${clause + 1}`,
        label: `${title} · ${index + 1}.${clause + 1}`,
        href: `${path}#${section.id}`,
        text: `${section.title}. ${text}`,
      })),
    ),
  ),
];

type Message = { role: "user" | "assistant"; content: string };

const openingRequest: Message = {
  role: "user",
  content: "Open the chat with a brief, personal welcome. Use the member’s name, mention a timely account issue supported by the records, and ask what they’d like help with. Cite the account evidence.",
};

function classifyEvidence(source: { label: string; href: string }) {
  return { ...source, kind: source.href.startsWith("/account?") ? "account" : "policy" };
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

  try {
    const references = [...getAccountReferences(memberAccount, transaction), ...policyReferences];
    const { content, provider } = await complete([
      {
        role: "system",
        content: [
          supportPrompt,
          `Member: ${memberAccount.name}. Account date: ${memberAccount.date}. Household: ${memberAccount.household}. Employer: ${memberAccount.employer}.`,
          ...(transaction ? ["The member opened this chat from [A:transaction]. Use it as the active transaction when the member refers to this payment or purchase. In the opening, offer help with that record. Cite [A:transaction] if you discuss it."] : []),
          "Reference material:",
          ...references.map(({ id, text }) => `[${id}] ${text}`),
        ].join("\n\n"),
      },
      ...(messages[0]?.role === "user" ? [] : [openingRequest]),
      ...messages,
    ], 0.35);
    const ids = new Set([...content.matchAll(/\[((?:A|T|P):[^\]\s]+)\]/g)].map((match) => match[1]));
    const answer = content.replace(/\[(?:A|T|P):[^\]\s]+\]/g, "").trim();
    if (!answer) throw new Error("Model reply contained only citations");
    return Response.json({
      answer,
      mode: provider,
      sources: references.filter(({ id }) => ids.has(id)).map(({ id, label, href, text }) => ({
        ...classifyEvidence({ label, href }), excerpt: id.startsWith("A:") ? undefined : text,
      })),
    });
  } catch (error) {
    console.error("Support model unavailable", error);
    return Response.json({ error: "Support model unavailable." }, { status: 503 });
  }
}
