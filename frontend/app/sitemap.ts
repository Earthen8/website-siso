import type { MetadataRoute } from "next";
import { fetchPrograms, fetchArticles, fetchDivisions } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sisoprasmul.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/program-kerja`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/articles`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Fetch dynamic routes — fall back to static-only if the API is unavailable.
  try {
    const [programs, articles, divisions] = await Promise.all([
      fetchPrograms(),
      fetchArticles(),
      fetchDivisions(),
    ]);

    const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
      url: `${BASE}/program-kerja/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${BASE}/articles/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : new Date(),
      changeFrequency: "never",
      priority: 0.6,
    }));

    const divisionRoutes: MetadataRoute.Sitemap = divisions.map((d) => ({
      url: `${BASE}/about/divisi/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    }));

    return [...staticRoutes, ...programRoutes, ...articleRoutes, ...divisionRoutes];
  } catch {
    // API not available during build — return static routes only.
    return staticRoutes;
  }
}
