import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

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
  alternates: {
    canonical: "/",
  },
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
