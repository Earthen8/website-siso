import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchArticle } from "@/lib/api";

export const revalidate = 300;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await fetchArticle(params.slug).catch(() => null);
  if (!article) {
    return { title: "Artikel tidak ditemukan" };
  }
  return {
    title: article.title,
    description: article.body.slice(0, 160),
    openGraph: {
      title: `${article.title} | SISO Prasmul`,
      description: article.body.slice(0, 160),
      type: "article",
      publishedTime: article.published_at ?? undefined,
      locale: "id_ID",
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await fetchArticle(params.slug).catch(() => null);

  if (!article) {
    notFound();
  }

  return (
    <article className="container" style={{ paddingBlock: "var(--space-xl)", maxWidth: "780px" }}>
      <span className="card-tag">{article.category}</span>
      <h1 className="section-title" style={{ fontSize: "2.25rem", marginTop: "var(--space-xs)" }}>
        {article.title}
      </h1>
      {article.published_at && (
        <p className="card-meta" style={{ marginBottom: "var(--space-lg)" }}>
          {new Date(article.published_at).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div
        style={{
          lineHeight: 1.9,
          whiteSpace: "pre-line",
          fontSize: "1.05rem",
        }}
      >
        {article.body}
      </div>
    </article>
  );
}
