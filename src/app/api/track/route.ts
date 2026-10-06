import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Lightweight, privacy-friendly analytics endpoint.
// Stores event name + page path + small JSON payload. No PII, no cookies.
const schema = z.object({
  name: z
    .string()
    .max(80)
    .regex(/^[a-z0-9_]+$/i, "Event name must be alphanumeric/underscore"),
  page: z.string().max(200).optional().or(z.literal("")),
  payload: z.record(z.string(), z.unknown()).optional(),
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

  // Fire-and-forget: never block the user on analytics
  try {
    await db.analyticsEvent.create({
      data: {
        name: parsed.data.name,
        page: parsed.data.page || null,
        payload: parsed.data.payload
          ? JSON.stringify(parsed.data.payload).slice(0, 4000)
          : null,
      },
    });
  } catch (err) {
    // Log but don't fail the request
    console.error("[track] failed", err);
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
