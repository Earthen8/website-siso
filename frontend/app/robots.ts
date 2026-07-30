import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sisoprasmul.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Django admin is served under /admin/ at a separate subdomain or
        // directly on the backend port — disallow just in case it's proxied.
        disallow: "/admin/",
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
