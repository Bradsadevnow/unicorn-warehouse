import "server-only";

type ModelText = { role: "system" | "user" | "assistant"; content: string };
export type ModelToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };
export type ModelMessage = ModelText
  | { role: "assistant"; content: string | null; tool_calls: ModelToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };
export type ModelTool = {
  type: "function";
  function: { name: string; description: string; parameters: object };
};

export async function requestCompletion(
  messages: ModelMessage[], temperature: number,
  { tools = [], signal, conciseReasoning = false, requireTool = false }: {
    tools?: ModelTool[]; signal?: AbortSignal; conciseReasoning?: boolean; requireTool?: boolean;
  } = {},
) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const provider = apiKey ? "OpenAI" : "LM Studio";
  const model = apiKey ? process.env.OPENAI_MODEL ?? "gpt-4.1-mini" : process.env.LM_STUDIO_MODEL ?? "google/gemma-4-12b";
  const baseUrl = apiKey ? "https://api.openai.com/v1" : process.env.LM_STUDIO_URL ?? "http://127.0.0.1:1234/v1";
  const timeout = AbortSignal.timeout(apiKey ? 90_000 : 180_000);
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    body: JSON.stringify({
      model,
      messages,
      temperature,
      ...(tools.length ? { tools, tool_choice: requireTool ? "required" : "auto" } : {}),
      ...(!apiKey ? { chat_template_kwargs: { enable_thinking: false } } : {}),
      ...(!apiKey && conciseReasoning && /gemma-4/i.test(model) ? { reasoning_effort: "none" } : {}),
    }),
  });
  if (!response.ok) throw new Error(`${provider} HTTP ${response.status}`);
  const result = await response.json();
  const choice = result.choices?.[0];
  const content: string = typeof choice?.message?.content === "string" ? choice.message.content : "";
  const calls: ModelToolCall[] = choice?.message?.tool_calls ?? [];
  if (!content.trim() && !calls.length) {
    throw new Error(`Empty model reply (finish reason: ${choice?.finish_reason ?? "unknown"})`);
  }
  return {
    content, calls, provider,
    usage: {
      inputTokens: result.usage?.prompt_tokens as number | undefined,
      outputTokens: result.usage?.completion_tokens as number | undefined,
      reasoningTokens: result.usage?.completion_tokens_details?.reasoning_tokens as number | undefined,
    },
  };
}

export async function complete(messages: ModelText[], temperature: number) {
  const { content, provider } = await requestCompletion(messages, temperature);
  if (!content.trim()) throw new Error("Expected a text reply");
  return { content, provider };
}
