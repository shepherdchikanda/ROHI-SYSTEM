import type { MetadataRoute } from "next";

const SITE_URL = "https://rohi.systems";

const STATIC_ROUTES = [
  "",
  "/solutions",
  "/products",
  "/approach",
  "/engagement",
  "/case-studies",
  "/insights",
  "/faq",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
