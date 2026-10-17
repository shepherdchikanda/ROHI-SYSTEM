import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// On the free Resend tier without a verified domain, emails send from
// onboarding@resend.dev. For production, verify your domain at resend.com
// and set RESEND_FROM in .env (e.g. "hello@rohi.systems").
const FROM = process.env.RESEND_FROM || "ROHI SYSTEMS <onboarding@resend.dev>";

export type EnquiryData = {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  whatNeeded?: string | null;
  improving?: string | null;
  budgetRange?: string | null;
  preferredContact?: string | null;
};

/** Notify the ROHI team that a new enquiry was received. */
export async function notifyTeamOfEnquiry(data: EnquiryData) {
  if (!process.env.RESEND_API_KEY) return;
  const teamEmail = process.env.TEAM_EMAIL || "onboarding@resend.dev";
  try {
    await resend.emails.send({
      from: FROM,
      to: teamEmail,
      subject: `New enquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: `
        <h2>New enquiry received</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">Name</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">Company</td><td>${data.company || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">Email</td><td>${data.email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">Phone / WhatsApp</td><td>${data.phone || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">What they need</td><td>${data.whatNeeded || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">Budget</td><td>${data.budgetRange || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#667085;">Preferred contact</td><td>${data.preferredContact || "—"}</td></tr>
        </table>
        <h3 style="margin-top:20px;">What they're trying to improve</h3>
        <p style="white-space:pre-wrap;background:#f5f7fa;padding:12px;border-radius:8px;">${data.improving || "—"}</p>
        <p style="margin-top:16px;font-size:12px;color:#667085;">This enquiry was saved to the database. Reply directly to the visitor's email above.</p>
      `,
    });
  } catch (err) {
    console.error("[email] team notification failed", err);
  }
}

/** Send an auto-reply to the person who submitted the form. */
export async function sendAutoReply(data: EnquiryData) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "We received your message — ROHI SYSTEMS",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#20C7C9;">ROHI SYSTEMS</p>
          <h1 style="font-size:24px;margin:8px 0 16px;">Thank you, ${data.name}.</h1>
          <p style="font-size:16px;line-height:1.6;color:#374151;">We received your message and a member of the ROHI team will follow up${data.preferredContact ? ` via ${data.preferredContact}` : ""} shortly.</p>
          <p style="font-size:16px;line-height:1.6;color:#374151;">We start by understanding the problem — not by sending a quote. So we may ask a few questions before suggesting anything.</p>
          <div style="margin:24px 0;padding:16px;background:#f5f7fa;border-radius:8px;">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#667085;margin:0 0 8px;">What you sent us</p>
            <p style="font-size:14px;line-height:1.5;margin:0;white-space:pre-wrap;">${data.improving?.slice(0, 500) || "Your enquiry details"}</p>
          </div>
          <p style="font-size:14px;color:#667085;margin-top:24px;">Technology That Moves Business.<br>Built in Mozambique.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[email] auto-reply failed", err);
  }
}
