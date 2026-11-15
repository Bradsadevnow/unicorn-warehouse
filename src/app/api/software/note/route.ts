import { getMemberAccount } from "@/content/memberAccount";
import { getCompanyWorkflow } from "@/server/companyWorkflows";
import { complete } from "@/server/model";

const departmentPrompts = {
  assurance: "Write a candid internal Brightside Assurance review. Celebrate a meticulous completeness check while making the narrow scope of the review sound like an achievement.",
  insights: "Write a Goodshift Insights note for an employer. Celebrate the work as throughput and describe the pending settlement with the optimism of a quarterly productivity dashboard.",
  harmony: "Write a Portfolio Harmony message to the member in bright, affectionate Unicorn Warehouse language. Celebrate the completed review and plainly explain what the payout status means for spending.",
} as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const department = body?.department;
  if (typeof body?.id !== "string" || typeof department !== "string" ||
      !Object.hasOwn(departmentPrompts, department)) {
    return Response.json({ error: "Invalid department or assignment." }, { status: 400 });
  }

  const workflow = getCompanyWorkflow(body.id);
  if (!workflow) return Response.json({ error: "Assignment not found." }, { status: 404 });
  const account = getMemberAccount(workflow.memberId);
  const entry = account?.ledger.find(({ id }) => id === workflow.ledgerEntryId);
  if (!account || !entry) return Response.json({ error: "Assignment record unavailable." }, { status: 503 });

  const facts = {
    assignment: workflow.assignment,
    handoff: workflow.handoff,
    review: workflow.quality,
    ...(department === "insights" ? { metricsPolicy: workflow.insights } : {}),
    ...(department === "harmony" ? { memberName: account.name, amount: entry.amount } : {}),
    settlement: entry.status,
  };
  try {
    const { content, provider } = await complete([
      { role: "system", content: `${departmentPrompts[department as keyof typeof departmentPrompts]} Write plain text. Use the supplied facts for all outcomes and figures. Pending Tokens cannot be spent. Do not invent approvals, dates, amounts, metrics or account events. Play the policy straight and give the voice room to breathe.` },
      { role: "user", content: JSON.stringify(facts) },
    ], 0.65);
    return Response.json({ note: content, provider });
  } catch (error) {
    console.error("Department note unavailable", error);
    return Response.json({ error: "Department note unavailable." }, { status: 503 });
  }
}
