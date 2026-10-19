/**
 * Honeypot bot protection.
 * A hidden field named "website" is added to forms. Bots fill all fields;
 * humans don't see the hidden field. If "website" is filled, it's a bot.
 * The field is also checked server-side.
 */
export const HONEYPOT_FIELD = "website";

/** Check if the honeypot field is filled (indicates a bot). Returns true if bot detected. */
export function isBot(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.length > 0;
}
