import type { MetadataRoute } from "next";

const url = process.env.URL_FRONT || "";

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
