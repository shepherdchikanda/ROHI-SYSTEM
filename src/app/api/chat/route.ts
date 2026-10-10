import { ROHI_AGENT_SYSTEM_PROMPT } from "@/lib/rohi-agent-prompt";
import { ROHI_KNOWLEDGE_BASE } from "@/lib/rohi-knowledge-base";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().max(8000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(30),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
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
      JSON.stringify({
        error: "Validation failed",
        issues: parsed.error.issues,
      }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );
  }

  // Prepend the ROHI agent system prompt + the confirmed knowledge base.
  // The prompt instructs the assistant to treat the KB as the source of truth
  // and to never invent beyond it.
  const messages = [
    {
      role: "system" as const,
      content: ROHI_AGENT_SYSTEM_PROMPT,
    },
    {
      role: "system" as const,
      content: `# ROHI SYSTEMS KNOWLEDGE BASE — confirmed facts (source of truth)\nUse this as the primary source for ROHI-specific information. Do not invent beyond what is documented here. If a fact is not in this knowledge base, say you do not have enough confirmed information.\n\n${ROHI_KNOWLEDGE_BASE}`,
    },
    ...parsed.data.messages,
  ];

  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  const zai = await ZAI.create();

  let upstreamStream: ReadableStream<Uint8Array> | null = null;
  try {
    const result = await zai.chat.completions.create({
      model: process.env.ZAI_MODEL || "glm-4-plus",
      messages,
      stream: true,
      thinking: { type: "disabled" },
    });
    if (result instanceof ReadableStream) {
      upstreamStream = result;
    } else if (
      result &&
      typeof result === "object" &&
      result.body instanceof ReadableStream
    ) {
      upstreamStream = result.body;
    } else {
      // Non-streaming fallback (SDK returned full JSON)
      const text =
        result?.choices?.[0]?.message?.content ??
        "I'm not able to respond right now. Please try again.";
      return new Response(text, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  } catch (err) {
    console.error("[chat] upstream error", err);
    return new Response(
      "I'm having trouble responding right now. Please try again in a moment, or use the contact form to reach the ROHI team.",
      { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  // Parse the upstream SSE stream and emit plain-text deltas to the client.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const clientStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstreamStream!.getReader();
      let buffer = "";
      let done = false;
      try {
        while (true) {
          const { done: readerDone, value } = await reader.read();
          if (readerDone) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by double newlines
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line) continue;
            if (line.startsWith(":")) continue; // SSE comment / heartbeat
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              done = true;
              break;
            }
            try {
              const json = JSON.parse(data);
              const delta =
                json?.choices?.[0]?.delta?.content ??
                json?.choices?.[0]?.message?.content ??
                "";
              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // Partial JSON — ignore, will be completed next chunk
            }
          }
        }
        // Flush any remaining buffered line (only if not already done)
        if (!done && buffer.startsWith("data:")) {
          const data = buffer.slice(5).trim();
          if (data && data !== "[DONE]") {
            try {
              const json = JSON.parse(data);
              const delta =
                json?.choices?.[0]?.delta?.content ??
                json?.choices?.[0]?.message?.content ??
                "";
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* ignore */
            }
          }
        }
      } catch (err) {
        console.error("[chat] stream read error", err);
        try {
          controller.enqueue(
            encoder.encode(
              "\n\n[I encountered an issue mid-response. Please reach out via the Contact page if this continues.]",
            ),
          );
        } catch {
          /* controller already closed */
        }
      } finally {
        try {
          reader.releaseLock();
        } catch {
          /* ignore */
        }
        try {
          controller.close();
        } catch {
          /* already closed (e.g. [DONE] path or cancel) */
        }
      }
    },
    cancel() {
      try {
        upstreamStream!.cancel();
      } catch {
        /* ignore */
      }
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
