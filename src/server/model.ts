import "server-only";

type ModelMessage = { role: "system" | "user" | "assistant"; content: string };

export async function complete(messages: ModelMessage[], temperature: number) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const provider = apiKey ? "OpenAI" : "LM Studio";
  const baseUrl = apiKey ? "https://api.openai.com/v1" : process.env.LM_STUDIO_URL ?? "http://127.0.0.1:1234/v1";
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    signal: AbortSignal.timeout(apiKey ? 90_000 : 180_000),
    body: JSON.stringify({
      model: apiKey ? process.env.OPENAI_MODEL ?? "gpt-4.1-mini" : process.env.LM_STUDIO_MODEL ?? "google/gemma-4-12b",
      messages,
      temperature,
      ...(!apiKey ? { chat_template_kwargs: { enable_thinking: false } } : {}),
    }),
  });
  if (!response.ok) throw new Error(`${provider} HTTP ${response.status}`);
  const result = await response.json();
  const choice = result.choices?.[0];
  const content = choice?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error(`Empty model reply (finish reason: ${choice?.finish_reason ?? "unknown"})`);
  }
  return { content, provider };
}
