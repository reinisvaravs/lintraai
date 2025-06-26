import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://setinbound.com/sitemap.xml",
    host: "https://setinbound.com",
  };
}
