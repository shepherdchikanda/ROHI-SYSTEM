import { ROHI_AGENT_SYSTEM_PROMPT } from "@/lib/rohi-agent-prompt";
import { ROHI_KNOWLEDGE_BASE } from "@/lib/rohi-knowledge-base";
import { retrieveRelevantKB } from "@/lib/kb-retrieval";
import { z } from "zod";
import { checkRateLimit, LIMITS } from "@/lib/rate-limit";
import ZAI from "z-ai-web-dev-sdk";

const messageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().max(8000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(30),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reuse a single ZAI SDK instance across requests (per best-practice docs).
// The SDK is pre-authenticated by the platform — no API key needed.
let zaiPromise: Promise<unknown> | null = null;
function getZAI() {
  if (!zaiPromise) zaiPromise = ZAI.create();
  return zaiPromise;
}

export async function POST(req: Request) {
  const _rl = checkRateLimit(req, LIMITS.chat, "chat"); if (_rl) return _rl;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", issues: parsed.error.issues }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );
  }

  // RAG-lite: retrieve only the relevant KB sections for the latest user question.
  // Uses the latest user message for retrieval (not assistant messages).
  const allMsgs = parsed.data.messages;
  const lastUserMsg = [...allMsgs].reverse().find((m) => m.role === "user");
  const relevantKB = lastUserMsg
    ? retrieveRelevantKB(lastUserMsg.content)
    : ROHI_KNOWLEDGE_BASE;

  // Combine system prompt + retrieved KB sections into ONE system message.
  // (Model treats KB as authoritative system-level reference material.)
  const messages = [
    {
      role: "system" as const,
      content: `${ROHI_AGENT_SYSTEM_PROMPT}\n\n# ROHI SYSTEMS KNOWLEDGE BASE — relevant sections\nUse this as reference material to answer the user's question. If the answer is not in this information, say you don't have enough confirmed information. Do not invent beyond what is documented here.\n\n${relevantKB}`,
    },
    ...parsed.data.messages,
  ];

  // Get the ZAI SDK instance (platform-managed, no API key required)
  const zai = (await getZAI()) as {
    chat: {
      completions: {
        create: (body: {
          messages: { role: "system" | "user" | "assistant"; content: string }[];
          stream: boolean;
          thinking: { type: "enabled" | "disabled" };
        }) => Promise<ReadableStream<Uint8Array> | { choices: { message: { content: string } }[] }>;
      };
    };
  };

  let upstreamStream: ReadableStream<Uint8Array>;
  try {
    const result = await zai.chat.completions.create({
      messages,
      stream: true,
      thinking: { type: "disabled" },
    });

    // The SDK normally returns a ReadableStream<Uint8Array> when stream:true.
    // Be defensive: if it ever returns a non-stream object, treat it as a
    // one-shot completion and return the content directly.
    if (result instanceof ReadableStream) {
      upstreamStream = result as ReadableStream<Uint8Array>;
    } else {
      const text =
        (result as { choices?: { message?: { content?: string } }[] })
          ?.choices?.[0]?.message?.content ?? "";
      return new Response(text, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  } catch (err) {
    console.error("[chat] completion create error", err);
    return new Response(
      "I'm having trouble responding right now. Please try again in a moment, or use the contact form to reach the ROHI team.",
      { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  // Parse the upstream SSE stream and emit plain-text deltas to the client.
  // The SDK emits the standard OpenAI SSE format:
  //   data: {"choices":[{"delta":{"content":"..."}}]}
  //   data: [DONE]
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const clientStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstreamStream.getReader();
      let buffer = "";
      let done = false;
      try {
        while (true) {
          const { done: readerDone, value } = await reader.read();
          if (readerDone) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line || line.startsWith(":")) continue;
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") { done = true; break; }
            try {
              const json = JSON.parse(data);
              // Only forward content deltas (skip reasoning_content)
              const delta = json?.choices?.[0]?.delta?.content ??
                json?.choices?.[0]?.message?.content ?? "";
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch { /* partial JSON — ignore */ }
          }
          if (done) break;
        }
        if (!done && buffer.startsWith("data:")) {
          const data = buffer.slice(5).trim();
          if (data && data !== "[DONE]") {
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content ??
                json?.choices?.[0]?.message?.content ?? "";
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch { /* ignore */ }
          }
        }
      } catch (err) {
        console.error("[chat] stream read error", err);
        try {
          controller.enqueue(encoder.encode(
            "\n\n[I encountered an issue mid-response. Please reach out via the Contact page if this continues.]",
          ));
        } catch { /* controller already closed */ }
      } finally {
        try { reader.releaseLock(); } catch { /* ignore */ }
        try { controller.close(); } catch { /* already closed */ }
      }
    },
    cancel() {
      try { upstreamStream.cancel(); } catch { /* ignore */ }
    },
  });

  return new Response(clientStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
