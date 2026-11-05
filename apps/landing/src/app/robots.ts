import type { MetadataRoute } from "next";
import { isPublicSite, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return isPublicSite
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: new URL("/sitemap.xml", siteUrl).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
