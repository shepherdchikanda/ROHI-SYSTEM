import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/rohi/site-header";
import { SiteFooter } from "@/components/rohi/site-footer";
import { ChatWidget } from "@/components/rohi/chat/chat-widget";
import { ThemeProvider } from "@/components/rohi/theme-provider";
import { ScrollUtilities } from "@/components/rohi/scroll-utilities";
import { WhatsAppButton } from "@/components/rohi/whatsapp-button";
import { AnalyticsListener } from "@/components/rohi/analytics-listener";
import { CookieConsent } from "@/components/rohi/cookie-consent";

const siteUrl = "https://rohi.systems";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ROHI SYSTEMS — Intelligent Business Systems",
    template: "%s · ROHI SYSTEMS",
  },
  description:
    "ROHI SYSTEMS designs and builds intelligent business systems — connecting processes, data, automation and intelligence to make organizations simpler and more effective. Built in Mozambique. Technology That Moves Business.",
  keywords: [
    "intelligent business systems",
    "business systems Mozambique",
    "custom business software Mozambique",
    "business automation Mozambique",
    "AI solutions Mozambique",
    "software development Mozambique",
    "business intelligence Mozambique",
    "workflow automation Mozambique",
    "custom systems Maputo",
  ],
  authors: [{ name: "ROHI SYSTEMS" }],
  creator: "ROHI SYSTEMS",
  publisher: "ROHI SYSTEMS",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ROHI SYSTEMS — Technology That Moves Business.",
    description:
      "Intelligent business systems built around the way your organization actually works. Systems, AI, automation and data — engineered with intent.",
    url: siteUrl,
    siteName: "ROHI SYSTEMS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROHI SYSTEMS — Technology That Moves Business.",
    description:
      "Intelligent business systems built around the way your organization actually works.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <AnalyticsListener />
          <ScrollUtilities />
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
          <WhatsAppButton />
          <ChatWidget />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
