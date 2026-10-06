import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(8000),
});

const schema = z.object({
  sessionId: z.string().max(120).optional().or(z.literal("")),
  summary: z
    .object({
      business: z.string().max(500).optional().or(z.literal("")),
      problem: z.string().max(2000).optional().or(z.literal("")),
      currentProcess: z.string().max(2000).optional().or(z.literal("")),
      currentTech: z.string().max(2000).optional().or(z.literal("")),
      desiredOutcome: z.string().max(2000).optional().or(z.literal("")),
      potentialDirection: z.string().max(2000).optional().or(z.literal("")),
      urgency: z.string().max(200).optional().or(z.literal("")),
      contact: z.string().max(500).optional().or(z.literal("")),
    })
    .optional(),
  messages: z.array(messageSchema).min(1).max(60),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 422 },
    );
  }

  try {
    const record = await db.chatTranscript.create({
      data: {
        sessionId: parsed.data.sessionId || null,
        transcript: JSON.stringify(parsed.data.messages),
        summary: parsed.data.summary ? JSON.stringify(parsed.data.summary) : null,
      },
    });
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("[chat/handoff] failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not save conversation context." },
      { status: 500 },
    );
  }
}
