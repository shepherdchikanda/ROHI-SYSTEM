import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const answerSchema = z.object({
  questionId: z.string(),
  label: z.string().max(200),
  score: z.number().int().min(0).max(3),
});

const schema = z.object({
  email: z.string().email().max(200).optional().or(z.literal("")),
  answers: z.array(answerSchema).min(1).max(20),
  score: z.number().int().min(0).max(30),
  stage: z.string().max(60),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  try {
    await db.assessment.create({
      data: {
        email: parsed.data.email || null,
        answers: JSON.stringify(parsed.data.answers),
        score: parsed.data.score,
        stage: parsed.data.stage,
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[assessment] failed", err);
    return NextResponse.json({ ok: false, error: "Could not save your assessment." }, { status: 500 });
  }
}
