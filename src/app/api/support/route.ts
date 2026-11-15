import { demoMemberId, getMemberAccount, getTokenBalances } from "@/content/memberAccount";
import { terms, productDetails } from "@/content/portfolioTerms";
import { getMemberReportStatus } from "@/server/companyWorkflows";
import { complete } from "@/server/model";
import { supportPrompt } from "../../support/supportPrompt";

function getAccountReferences(memberAccount: NonNullable<ReturnType<typeof getMemberAccount>>) {
  const balances = getTokenBalances(memberAccount);
  const report = getMemberReportStatus(memberAccount.id, "report");
  return [
    { id: "A:statement", label: "Token statement", href: "/account#statement", text: JSON.stringify({ balances, ledger: memberAccount.ledger }) },
    { id: "A:memberships", label: "Memberships", href: "/account#memberships", text: JSON.stringify(memberAccount.subscriptions) },
    { id: "A:requests", label: "Open requests", href: "/account#requests", text: JSON.stringify(memberAccount.requests) },
    { id: "A:activity", label: "Member notices", href: "/account#activity", text: JSON.stringify(memberAccount.notices) },
    ...(report ? [{ id: "A:report", label: "Goodshift report status", href: "/account#report", text: JSON.stringify(report) }] : []),
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
  return { ...source, kind: source.href.startsWith("/account#") ? "account" : "policy" };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const messages: unknown = body?.messages;
  if (!Array.isArray(messages) ||
      !messages.every((item): item is Message =>
        item && ["user", "assistant"].includes(item.role) &&
        typeof item.content === "string" && item.content.trim()) ||
      (messages.length > 0 && messages.at(-1)?.role !== "user")) {
    return Response.json({ error: "Invalid conversation." }, { status: 400 });
  }

  try {
    const memberAccount = getMemberAccount(demoMemberId);
    if (!memberAccount) throw new Error("Demo account is missing");
    const references = [...getAccountReferences(memberAccount), ...policyReferences];
    const { content, provider } = await complete([
      {
        role: "system",
        content: [
          supportPrompt,
          `Member: ${memberAccount.name}. Account date: ${memberAccount.date}. Household: ${memberAccount.household}. Employer: ${memberAccount.employer}.`,
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
