import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, LIMITS } from "@/lib/rate-limit";
import { z } from "zod";

// Lightweight, privacy-friendly analytics endpoint.
// Stores event name + page path + small JSON payload. No PII, no cookies.
//
// PRIVACY: The payload schema is deliberately restrictive to prevent
// accidental PII capture. Keys must be short alphanumeric/snake_case
// identifiers (e.g. "cta_label", "section") — NOT field names like "email",
// "name", "phone". Values must be primitives (string/number/boolean) capped
// at 200 chars. Any payload key that looks like a PII field name is dropped
// silently before storage.

// Keys that resemble PII field names — dropped from payloads before storage.
const PII_KEY_PATTERNS = /^(email|e-mail|name|phone|tel|telephone|address|cpf|nuit|tax|passport|id_card|credit|card|cvv|password|secret|token|address_line|zip|postal|ssn|national_id)$/i;

const payloadValueSchema = z.union([
  z.string().max(200),
  z.number(),
  z.boolean(),
]);

const payloadSchema = z
  .record(z.string(), payloadValueSchema)
  // Filter out PII-looking keys + cap the number of keys
  .transform((obj) => {
    const filtered: Record<string, string | number | boolean> = {};
    let count = 0;
    for (const [k, v] of Object.entries(obj)) {
      if (count >= 20) break; // max 20 keys per event
      if (PII_KEY_PATTERNS.test(k)) continue; // drop PII-looking keys
      filtered[k] = v;
      count++;
    }
    return filtered;
  })
  .optional();

const schema = z.object({
  name: z
    .string()
    .max(80)
    .regex(/^[a-z0-9_]+$/i, "Event name must be alphanumeric/underscore"),
  page: z.string().max(200).optional().or(z.literal("")),
  payload: payloadSchema,
});

export async function POST(req: Request) {
  const _rl = checkRateLimit(req, LIMITS.track, "track"); if (_rl) return _rl;
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
