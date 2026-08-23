import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticles } from "@/lib/api";
import type { ArticleCategory } from "@/lib/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Baca artikel, jurnal, kajian ilmu sosial, info beasiswa, dan liputan prestasi dari SISO Prasmul.",
  openGraph: {
    title: "Articles | SISO Prasmul",
    locale: "id_ID",
  },
};

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  jurnal: "Jurnal",
  kajian: "Kajian",
  achievement: "Prestasi",
  beasiswa: "Beasiswa",
};

interface Props {
  searchParams: { category?: string };
}

export default async function ArticlesPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ArticleCategory | undefined;
  const articles = await fetchArticles(activeCategory).catch(() => []);

  return (
    <>
      <section className="page-hero container">
        <h1>Articles</h1>
        <p>Jurnal, kajian, prestasi, dan info beasiswa dari SISO Prasmul.</p>
      </section>

      {/* Category filter */}
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginBottom: "var(--space-lg)" }}>
        <Link href="/articles" className="card-tag" style={{ cursor: "pointer" }}>
          Semua
        </Link>
        {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(
          ([key, label]) => (
            <Link
              key={key}
              href={`/articles?category=${key}`}
              className="card-tag"
              style={{ cursor: "pointer" }}
            >
              {label}
            </Link>
          )
        )}
      </div>

      {/* Articles list */}
      <div className="container" style={{ marginBottom: "var(--space-2xl)" }}>
        {articles.length === 0 ? (
          <p className="card-meta" style={{ textAlign: "center", padding: "var(--space-xl)" }}>
            Belum ada artikel.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="card" style={{ display: "block" }}>
                <div className="card-body">
                  <span className="card-tag">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  <h2 className="card-title">{article.title}</h2>
                  {article.published_at && (
                    <p className="card-meta">
                      {new Date(article.published_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <p className="card-meta" style={{ marginTop: "var(--space-xs)" }}>
                    {article.body.slice(0, 150)}
                    {article.body.length > 150 ? "…" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
