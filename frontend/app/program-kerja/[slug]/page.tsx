import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchProgram } from "@/lib/api";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await fetchProgram(params.slug).catch(() => null);
  if (!program) {
    return { title: "Program tidak ditemukan" };
  }
  return {
    title: program.title,
    description: program.description
      ? program.description.slice(0, 160)
      : `Detail program ${program.title} — SISO Prasmul.`,
    openGraph: {
      title: `${program.title} | SISO Prasmul`,
      images: program.cover_image ? [{ url: program.cover_image }] : [],
      locale: "id_ID",
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const program = await fetchProgram(params.slug).catch(() => null);

  if (!program) {
    notFound();
  }

  const photoAssets = program.media_assets.filter((a) => a.type === "photo");
  const videoAssets = program.media_assets.filter((a) => a.type === "video");

  return (
    <>
      {program.cover_image && (
        <div style={{ position: "relative", height: "400px", width: "100%" }}>
          <Image
            src={program.cover_image}
            alt={program.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      <article className="container" style={{ paddingBlock: "var(--space-xl)" }}>
        <span className="card-tag">{program.category}</span>
        <h1 className="section-title" style={{ fontSize: "2rem", marginTop: "var(--space-xs)" }}>
          {program.title}
        </h1>
        {program.date && (
          <p className="card-meta" style={{ marginBottom: "var(--space-md)" }}>
            {new Date(program.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
          {program.description}
        </p>
      </article>

      {/* Photo gallery */}
      {photoAssets.length > 0 && (
        <section className="section-block container">
          <h2 className="section-title">Foto Dokumentasi</h2>
          <div className="card-grid">
            {photoAssets.map((asset) => (
              <Image
                key={asset.id}
                src={asset.file}
                alt="Dokumentasi kegiatan"
                width={400}
                height={300}
                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "var(--radius)" }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {videoAssets.length > 0 && (
        <section className="section-block container">
          <h2 className="section-title">Video Dokumentasi</h2>
          <div className="card-grid">
            {videoAssets.map((asset) => (
              <video
                key={asset.id}
                src={asset.file}
                controls
                style={{ width: "100%", borderRadius: "var(--radius)" }}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
