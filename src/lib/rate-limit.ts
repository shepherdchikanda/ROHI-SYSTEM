/**
 * Simple in-memory rate limiter.
 * Works for local dev + single-server deployments.
 * For Vercel serverless production, upgrade to Upstash Redis
 * (free tier — see https://docs.upstash.com/redis/sdts/ratelimit)
 */

type RateEntry = { count: number; resetTime: number };
const rateMap = new Map<string, RateEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (now > entry.resetTime) rateMap.delete(key);
  }
}, 300000).unref?.();

/** Check if a request is allowed. Returns true if allowed, false if rate-limited. */
export function rateLimit(
  identifier: string,
  max: number,
  windowMs: number,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetTime };
  }

  entry.count++;
  return { allowed: true, remaining: max - entry.count, resetAt: entry.resetTime };
}

/** Extract the client IP from request headers.
 *
 * SECURITY: Only trusts forwarded headers when behind a known proxy.
 * In production behind Caddy/Nginx/etc, set TRUST_PROXY=1 so the
 * X-Forwarded-For header is used (the proxy strips spoofed values).
 * Without TRUST_PROXY, falls back to X-Real-IP then 'unknown' — which
 * means direct connections (no proxy) still get rate-limited per-IP,
 * but a visitor cannot fake the header to bypass limits.
 */
export function getClientIP(req: Request): string {
  const trustProxy = process.env.TRUST_PROXY === "1" || process.env.NODE_ENV !== "production";
  if (trustProxy) {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      // X-Forwarded-For is "client, proxy1, proxy2". The client is first.
      // Only the FIRST hop is the visitor; the rest are trusted proxies.
      return forwarded.split(",")[0].trim();
    }
    const real = req.headers.get("x-real-ip");
    if (real) return real.trim();
  }
  return "unknown";
}

/** Rate limit presets per endpoint. */
export const LIMITS = {
  chat: { max: 15, windowMs: 60_000 },        // 15 messages per minute
  contact: { max: 5, windowMs: 3_600_000 },    // 5 submissions per hour
  subscribe: { max: 5, windowMs: 3_600_000 },  // 5 per hour
  assessment: { max: 10, windowMs: 3_600_000 }, // 10 per hour
  track: { max: 100, windowMs: 60_000 },        // 100 events per minute
  handoff: { max: 10, windowMs: 3_600_000 },    // 10 per hour
} as const;

/** Check rate limit and return a 429 response if blocked. Returns null if allowed. */
export function checkRateLimit(
  req: Request,
  preset: { max: number; windowMs: number },
  prefix: string,
): Response | null {
  const ip = getClientIP(req);
  const result = rateLimit(`${prefix}:${ip}`, preset.max, preset.windowMs);
  if (!result.allowed) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Too many requests. Please try again later.",
        retryAfter,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
        },
      },
    );
  }
  return null; // allowed
}
