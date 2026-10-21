import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // SECURITY: Do NOT swallow TypeScript errors at build time.
  // Previously this was `true`, which silently masked type regressions.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  allowedDevOrigins: [
    "*.space-z.ai",
    "preview-*.space-z.ai",
    "chat.z.ai",
    "*.chat.z.ai",
  ],
  async headers() {
    // Content Security Policy.
    // 'unsafe-eval' is required for Next.js dev mode (HMR / React Refresh).
    // In production we drop it so the page cannot load code via eval —
    // a meaningful hardening against XSS-driven code injection.
    // 'unsafe-inline' (script-src + style-src) is required by Next.js
    // inline hydration scripts + Tailwind/Framer Motion inline styles.
    // To also drop 'unsafe-inline' for scripts, use per-request nonces
    // (Next.js nonce support) in a production deployment.
    const isDev = process.env.NODE_ENV !== 'production';
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'self' https://*.space-z.ai https://*.chat.z.ai https://chat.z.ai",
      "base-uri 'self'",
      "form-action 'self' https://wa.me",
      "object-src 'none'",
      "worker-src 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
