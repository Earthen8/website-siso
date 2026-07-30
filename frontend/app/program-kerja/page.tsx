import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchPrograms } from "@/lib/api";
import type { ProgramCategory } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Program Kerja & Events",
  description:
    "Daftar program kerja dan kegiatan SISO Prasmul — seminar, workshop, event, kompetisi, dan pengabdian masyarakat.",
  openGraph: {
    title: "Program Kerja & Events | SISO Prasmul",
    locale: "id_ID",
  },
};

const CATEGORY_LABELS: Record<ProgramCategory, string> = {
  event: "Event",
  workshop: "Workshop",
  seminar: "Seminar",
  competition: "Kompetisi",
  pengmas: "Pengabdian Masyarakat",
};

interface Props {
  searchParams: { category?: string };
}

export default async function ProgramKerjaPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ProgramCategory | undefined;
  const programs = await fetchPrograms(activeCategory).catch(() => []);

  return (
    <>
      <section className="page-hero container">
        <h1>Program Kerja & Events</h1>
        <p>Kegiatan dan program kerja SISO Prasmul.</p>
      </section>

      {/* Category filter */}
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginBottom: "var(--space-lg)" }}>
        <Link
          href="/program-kerja"
          className={`card-tag ${!activeCategory ? "" : "card-tag--muted"}`}
          style={{ cursor: "pointer" }}
        >
          Semua
        </Link>
        {(Object.entries(CATEGORY_LABELS) as [ProgramCategory, string][]).map(
          ([key, label]) => (
            <Link
              key={key}
              href={`/program-kerja?category=${key}`}
              className="card-tag"
              style={{ cursor: "pointer" }}
            >
              {label}
            </Link>
          )
        )}
      </div>

      {/* Programs grid */}
      <div className="container" style={{ marginBottom: "var(--space-2xl)" }}>
        {programs.length === 0 ? (
          <p className="card-meta" style={{ textAlign: "center", padding: "var(--space-xl)" }}>
            Belum ada program kerja.
          </p>
        ) : (
          <div className="card-grid">
            {programs.map((program) => (
              <Link key={program.id} href={`/program-kerja/${program.slug}`} className="card">
                {program.cover_image ? (
                  <Image
                    src={program.cover_image}
                    alt={program.title}
                    width={400}
                    height={200}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      background: "var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="card-meta">No image</span>
                  </div>
                )}
                <div className="card-body">
                  <span className="card-tag">
                    {CATEGORY_LABELS[program.category]}
                  </span>
                  <h2 className="card-title">{program.title}</h2>
                  {program.date && (
                    <p className="card-meta">
                      {new Date(program.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
