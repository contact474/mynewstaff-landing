/* ─── Claude API Client for ScaleX AI Features ────────────────────── */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

interface ClaudeResponse {
  content: { type: "text"; text: string }[];
  model: string;
  usage: { input_tokens: number; output_tokens: number };
}

export async function generateWithClaude(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: options?.model || "claude-sonnet-4-6",
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      system: systemPrompt,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data: ClaudeResponse = await res.json();
  return data.content[0]?.text || "";
}

export async function streamWithClaude(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: options?.model || "claude-sonnet-4-6",
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature ?? 0.7,
      system: systemPrompt,
      messages,
      stream: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const reader = res.body!.getReader();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }

      // Parse SSE events and extract text deltas
      const text = new TextDecoder().decode(value);
      const lines = text.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const event = JSON.parse(data);
          if (event.type === "content_block_delta" && event.delta?.text) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        } catch {
          // Skip malformed events
        }
      }
    },
  });
}
