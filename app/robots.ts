import type { MetadataRoute } from "next";

const url = process.env.BASE_URL || "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
