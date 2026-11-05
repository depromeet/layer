import type { MetadataRoute } from "next";
import { isPublicSite, siteUrl } from "@/lib/site";
import { templates } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicSite) return [];
  return [
    {
      url: new URL("/", siteUrl).href,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...templates.map(({ slug }) => ({
      url: new URL(`/templates/${slug}`, siteUrl).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
