import "server-only";

import { requestCompletion, type ModelMessage, type ModelTool } from "./model";
import { runSupportGameTool, supportGameTools } from "./supportGameTools";
import type { SupportCard, SupportSession } from "./supportActions";
import { searchPolicy, type SupportReference } from "./supportPolicy";

const tools: ModelTool[] = [
  {
    type: "function", function: {
      name: "search_policy",
      description: "Search company policy and product details with your own keywords or an exact citation ID. Returns up to three complete clauses. Refine the query if needed.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Specific policy keywords or citation ID such as P:1.11" },
          product: { type: "string", description: "Optional brand or service name to prioritize" },
          document: { type: "string", enum: ["terms", "product_details"], description: "Optional document filter" },
        },
        required: ["query"], additionalProperties: false,
      },
    },
  },
  {
    type: "function", function: {
      name: "read_records",
      description: "Read selected account records for the signed-in member, or an available posting or horn rank. Choose IDs from the record menu in the system message.",
      parameters: {
        type: "object",
        properties: { ids: { type: "array", items: { type: "string" }, description: "Exact record IDs, without brackets" } },
        required: ["ids"], additionalProperties: false,
      },
    },
  },
];

function getReferences(name: string, args: string, records: ReadonlyMap<string, SupportReference>) {
  const input: unknown = JSON.parse(args);
  if (!input || typeof input !== "object") return [];
  if (name === "search_policy" && "query" in input && typeof input.query === "string" && input.query.trim()) {
    const product = "product" in input && typeof input.product === "string" ? input.product : undefined;
    const document = "document" in input && typeof input.document === "string" ? input.document : undefined;
    return searchPolicy(input.query, product, document);
  }
  if (name === "read_records" && "ids" in input) {
    // Gemma sometimes serializes a list of record IDs as a comma-separated string.
    const ids = Array.isArray(input.ids) ? input.ids : typeof input.ids === "string" ? input.ids.split(",") : [];
    const matching = new Map<string, SupportReference>();
    for (const value of ids) {
      if (typeof value !== "string") continue;
      const id = value.trim().replace(/^\[|\]$/g, "");
      const record = records.get(id) ?? records.get(`A:${id}`);
      if (record) matching.set(record.id, record);
    }
    return [...matching.values()];
  }
  return [];
}

export async function answerWithSupportTools(
  messages: ModelMessage[], available: SupportReference[], signal: AbortSignal,
  interactive?: { session: SupportSession; stop?: string; hasMemberRequest: boolean },
) {
  const records = new Map(available.map((reference) => [reference.id, reference]));
  const seen = new Map<string, SupportReference>();
  const conversation = [...messages];
  const usage: Awaited<ReturnType<typeof requestCompletion>>["usage"][] = [];
  const searches: { tool: string; query?: string; ids: string[] }[] = [];
  const cards: SupportCard[] = [];
  const availableTools = interactive ? [...tools, ...supportGameTools] : tools;
  const maxToolRounds = 5;
  let correctingEvidence = false;
  let gameResult = false;

  for (let round = 0; round <= maxToolRounds; round++) {
    const finalRound = round === maxToolRounds;
    if (finalRound) conversation.push({
      role: "user", content: "Use the retrieved evidence to answer the member’s latest question now. Explain any missing evidence and cite the records you used.",
    });
    const result = await requestCompletion(conversation, 0.25, {
      tools: finalRound ? [] : availableTools, signal,
      conciseReasoning: (!finalRound && correctingEvidence) || !seen.has("A:wallet"),
      requireTool: round === 0 || correctingEvidence,
    });
    usage.push(result.usage);
    if (!result.calls.length) {
      const cited = [...result.content.matchAll(/\[((?:A|T|P|J|C):[^\]\s]+)\]/g)].map((match) => match[1]);
      const searchedPolicy = searches.some(({ tool }) => tool === "search_policy");
      const citesPolicy = cited.some((id) => /^(T|P):/.test(id));
      if (finalRound || ((cited.length || gameResult) && cited.every((id) => seen.has(id)) && (!searchedPolicy || citesPolicy))) {
        return { ...result, references: [...seen.values()], usage, searches, cards };
      }
      correctingEvidence = searchedPolicy && !citesPolicy;
      conversation.push({
        role: "user",
        content: "Retrieve any missing evidence for the original question, including applicable clauses for each policy mentioned. Cite current tool results with their exact bracketed IDs.",
      });
      continue;
    }
    if (finalRound) break;

    correctingEvidence = false;
    conversation.push({ role: "assistant", content: result.content || null, tool_calls: result.calls });
    for (const call of result.calls) {
      const { name, arguments: args } = call.function;
      let references: SupportReference[] = [];
      let query: string | undefined;
      let note: string | undefined;
      try {
        references = getReferences(name, args, records);
        if (name === "search_policy" && interactive?.stop) {
          references = references.filter(({ href }) => !href.endsWith("#lost-property-release") && !href.endsWith("#wake-verification"));
        }
        if (interactive && supportGameTools.some(({ function: definition }) => definition.name === name)) {
          const result = name === "prepare_action" && cards.some(({ kind }) => kind === "confirm")
            ? { note: "One action is already prepared. Ask the member to review it first." }
            : runSupportGameTool(name, JSON.parse(args), interactive.session, interactive.stop, interactive.hasMemberRequest);
          if (result) {
            note = result.note;
            gameResult = true;
            references = result.references ?? [];
            if (result.card && !cards.some((card) => card.kind === "navigate" && result.card?.kind === "navigate" && card.href === result.card.href)) {
              cards.push(result.card);
            }
          }
        }
        if (name === "search_policy") {
          const value = JSON.parse(args)?.query;
          if (typeof value === "string") query = value;
        }
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
      }
      for (const reference of references) seen.set(reference.id, reference);
      searches.push({ tool: name, query, ids: references.map(({ id }) => id) });
      conversation.push({
        role: "tool", tool_call_id: call.id,
        content: note ? JSON.stringify({ note, references: references.map(({ id, label }) => ({ id, label })) }) : references.length
          ? JSON.stringify(references.map(({ id, label, text }) => ({ id, label, text })))
          : "No matching evidence. Try different keywords or use an available record ID.",
      });
    }
  }
  throw new Error("Support model did not produce an answer after retrieval");
}
