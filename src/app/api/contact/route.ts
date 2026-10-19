import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, LIMITS } from "@/lib/rate-limit";
import { isBot } from "@/lib/honeypot";
import { z } from "zod";
import { notifyTeamOfEnquiry, sendAutoReply } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  company: z.string().max(200).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email").max(200),
  phone: z.string().max(60).optional().or(z.literal("")),
  whatNeeded: z.string().max(120).optional().or(z.literal("")),
  improving: z.string().max(2000).optional().or(z.literal("")),
  currentProcess: z.string().max(2000).optional().or(z.literal("")),
  currentTech: z.string().max(2000).optional().or(z.literal("")),
  successLooksLike: z.string().max(2000).optional().or(z.literal("")),
  budgetRange: z.string().max(60).optional().or(z.literal("")),
  preferredContact: z.string().max(40).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const _rl = checkRateLimit(req, LIMITS.contact, "contact"); if (_rl) return _rl;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (isBot(body as Record<string, unknown>)) return NextResponse.json({ ok: true, message: "Enquiry received" }, { status: 201 });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }

  try {
    // Save to database
    await db.enquiry.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company || null,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        whatNeeded: parsed.data.whatNeeded || null,
        improving: parsed.data.improving || null,
        currentProcess: parsed.data.currentProcess || null,
        currentTech: parsed.data.currentTech || null,
        successLooksLike: parsed.data.successLooksLike || null,
        budgetRange: parsed.data.budgetRange || null,
        preferredContact: parsed.data.preferredContact || null,
      },
    });

    // Send emails (fire-and-forget — don't block the response)
    // Only runs if RESEND_API_KEY is set in .env
    const enquiryData = {
      name: parsed.data.name,
      company: parsed.data.company || null,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      whatNeeded: parsed.data.whatNeeded || null,
      improving: parsed.data.improving || null,
      budgetRange: parsed.data.budgetRange || null,
      preferredContact: parsed.data.preferredContact || null,
    };
    void notifyTeamOfEnquiry(enquiryData);
    void sendAutoReply(enquiryData);

    return NextResponse.json(
      { ok: true, message: "Enquiry received" },
      { status: 201 },
    );
  } catch (err) {
    console.error("[contact] failed to persist enquiry", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
