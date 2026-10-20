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
    // NOTE: 'unsafe-eval' is required for Next.js dev mode (HMR / React Refresh).
    // For a production deployment, remove 'unsafe-eval' and consider using
    // per-request nonces for inline scripts to also drop 'unsafe-inline'.
    // 'unsafe-inline' (style-src) is required by Tailwind's runtime styles +
    // Framer Motion inline styles.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
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
