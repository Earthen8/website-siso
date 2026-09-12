import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchPrograms, type ProgramKerja } from "@/lib/api";
import styles from "./page.module.css";

type ProgramCategory = "event" | "workshop" | "seminar" | "competition" | "pengmas";

const CATEGORY_META: Record<
  ProgramCategory,
  { title: string; subtitle: string; desc: string; icon: string }
> = {
  workshop: {
    title: "Workshop & Bootcamp",
    subtitle: "Hands-on Technical Training",
    desc: "Pelatihan intensif rekayasa perangkat lunak, AI, robotika, dan cloud computing dengan bimbingan mentor ahli.",
    icon: "workshop",
  },
  seminar: {
    title: "Seminar & Tech Talk",
    subtitle: "Industry Expert Sharing",
    desc: "Sesi berbagi wawasan tren industri sains & teknologi terkini langsung dari praktisi dan pemimpin perusahaan teknologi ternama.",
    icon: "seminar",
  },
  competition: {
    title: "Hackathon & Competition",
    subtitle: "Showcase Your Skills",
    desc: "Ajang problem-solving dan perlombaan inovasi multidisiplin untuk menguji kemampuan teknis dan merebut gelar juara.",
    icon: "competition",
  },
  pengmas: {
    title: "Pengabdian Masyarakat",
    subtitle: "Social Impact Through Tech",
    desc: "Inisiatif edukasi sains, coding, dan pemberdayaan literasi digital bagi generasi muda dan komunitas masyarakat luas.",
    icon: "pengmas",
  },
  event: {
    title: "Events & Gathering",
    subtitle: "Networking & Community",
    desc: "Pertemuan akrab, pameran karya inovasi tahunan, dan welcoming event bagi seluruh mahasiswa STEM Prasetiya Mulya.",
    icon: "event",
  },
};

const DEFAULT_COVERS: Record<string, string> = {
  event:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
  workshop:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  seminar:
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
  competition:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
  pengmas:
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
};

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Program Kerja & Events | SISO Prasmul",
  description:
    "Daftar program kerja, workshop, seminar, kompetisi, dan agenda kegiatan STEM Prasetiya Mulya Innovation Student Organization.",
  openGraph: {
    title: "Program Kerja & Agenda | SISO Prasmul",
    description: "Katalog program kerja inovatif dan kegiatan kemahasiswaan SISO Prasmul.",
    locale: "id_ID",
    type: "website",
  },
};

function formatEventDate(dateString?: string | null): string {
  if (!dateString) return "Segera Hadir";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

interface Props {
  searchParams: { category?: string };
}

export default async function ProgramKerjaPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ProgramCategory | undefined;

  // TODO: [Backend Integration] Search & Pagination
  // DRF endpoint support `category` & `visible`.
  // Ke depannya dapat ditambahkan support query parameter `search` dan `page` untuk penomoran halaman.
  const programs = await fetchPrograms(activeCategory).catch(() => []);

  // Filter categories list
  const categoryKeys: ProgramCategory[] = [
    "workshop",
    "seminar",
    "competition",
    "pengmas",
    "event",
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      <section className={styles.heroContainer}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            Kalender &amp; Inisiatif SISO Prasmul
          </div>
          <h1 className={styles.heroTitle}>
            Programs That Shape{" "}
            <span className={styles.heroTitleHighlight}>STEM Innovators</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Jelajahi rangkaian workshop aplikatif, kompetisi teknologi, seminar industri, dan
            kegiatan sosial yang dirancang untuk mengasah kapabilitas teknis dan kepemimpinanmu.
          </p>
        </div>
      </section>

      {/* ── 2. Quick Category Filter Bar ────────────────────────────────────── */}
      <nav className={styles.filterSection} aria-label="Filter kategori program">
        <div className="container">
          <div className={styles.filterBar}>
            <Link
              href="/program-kerja"
              className={`${styles.filterChip} ${!activeCategory ? styles.filterChipActive : ""}`}
            >
              Semua Program ({programs.length})
            </Link>
            {categoryKeys.map((catKey) => {
              const isActive = activeCategory === catKey;
              return (
                <Link
                  key={catKey}
                  href={`/program-kerja?category=${catKey}`}
                  className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
                >
                  {CATEGORY_META[catKey].title}
                </Link>
              );
            })}
          </div>

          {activeCategory && (
            <div className={styles.activeFilterNotice}>
              <span>
                Menampilkan kategori: <strong>{CATEGORY_META[activeCategory]?.title || activeCategory}</strong>
              </span>
              <Link href="/program-kerja" className={styles.resetFilterLink}>
                ✕ Reset Filter
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ── 3. Programs Grid Showcase ───────────────────────────────────────── */}
      <section className={styles.eventsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Katalog Kegiatan</span>
            <h2 className={styles.sectionTitle}>
              {activeCategory ? CATEGORY_META[activeCategory]?.title : "Annual & Featured Programs"}
            </h2>
            <p className={styles.sectionSubtitle}>
              {activeCategory
                ? CATEGORY_META[activeCategory]?.desc
                : "Rangkaian agenda kegiatan terstruktur SISO untuk mendukung ekosistem belajar mahasiswa STEM."}
            </p>
          </div>

          <div className={styles.programsGrid}>
            {programs.length > 0 ? (
              programs.map((prog: ProgramKerja) => {
                const cover =
                  prog.cover_image ||
                  DEFAULT_COVERS[prog.category] ||
                  DEFAULT_COVERS.workshop;

                return (
                  <article key={prog.id} className={styles.programCard}>
                    <div className={styles.programImageWrapper}>
                      <Image
                        src={cover}
                        alt={prog.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                      <span className={styles.programCategoryBadge}>
                        {prog.category}
                      </span>
                      {/* TODO: [Backend Integration] Read is_featured from backend */}
                      {(prog as unknown as { is_featured?: boolean }).is_featured && (
                        <span className={styles.programFeaturedBadge}>Featured</span>
                      )}
                    </div>

                    <div className={styles.programContent}>
                      <div>
                        <div className={styles.programMetaRow}>
                          <span className={styles.programMetaItem}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            {formatEventDate(prog.date)}
                          </span>
                          <span className={styles.programMetaItem}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
                              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            {/* TODO: [Backend Integration] Add location to ProgramKerja model */}
                            {prog.location || "Kampus BSD / Hybrid"}
                          </span>
                        </div>

                        <h3 className={styles.programTitle}>{prog.title}</h3>
                        <p className={styles.programDesc}>
                          {prog.description ||
                            "Inisiatif program kerja SISO Prasmul untuk mendorong akselerasi inovasi teknologi."}
                        </p>
                      </div>

                      <div className={styles.programActions}>
                        <Link href={`/program-kerja/${prog.slug}`} className={styles.btnDetail}>
                          Detail Lengkap &rarr;
                        </Link>
                        {/* TODO: [Backend Integration] Connect registration_url to live form */}
                        {prog.registration_url ? (
                          <a
                            href={prog.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnRegister}
                          >
                            Daftar Sekarang
                          </a>
                        ) : (
                          <Link href={`/program-kerja/${prog.slug}`} className={styles.btnRegister}>
                            Daftar
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className={styles.emptyStateTitle}>Belum Ada Program di Kategori Ini</h3>
                <p className={styles.emptyStateDesc}>
                  Program kerja untuk kategori ini belum dipublikasikan atau sedang dalam tahap persiapan panitia.
                </p>
                <Link href="/program-kerja" className={styles.emptyStateBtn}>
                  Lihat Semua Program
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Interactive Schedule & Calendar Section ──────────────────────── */}
      {/* 
        TODO: [Backend Integration] Live Calendar Synchronization
        Endpoint /api/v1/programs/calendar/ atau iCal sync untuk feed tanggal otomatis.
      */}
      <section className={`${styles.calendarSection} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Jadwal &amp; Timeline</span>
            <h2 className={styles.sectionTitle}>Activity Calendar</h2>
            <p className={styles.sectionSubtitle}>
              Pantau jadwal kegiatan dan jangan lewatkan tanggal penting pelaksanaan program SISO.
            </p>
          </div>

          <div className={styles.calendarCard}>
            <div className={styles.calendarMonthHeader}>
              <div className={styles.calendarMonthTitle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Oktober – November 2026
              </div>
              <div className={styles.calendarLegend}>
                <span>
                  <span className={styles.legendDot} style={{ background: "#2575fc" }} />
                  Workshop / Event
                </span>
                <span>
                  <span className={styles.legendDot} style={{ background: "#f59e0b" }} />
                  Competition
                </span>
              </div>
            </div>

            <div className={styles.calendarGridWrapper}>
              <div className={styles.calendarHeaderDays}>
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
                <span>Min</span>
              </div>

              <div className={styles.calendarDaysGrid}>
                {/* Visual Representation of 28 Days */}
                {Array.from({ length: 28 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isSummit = dayNum === 2;
                  const isBootcamp = dayNum === 17;
                  const isHackathon = dayNum === 24;

                  return (
                    <div key={i} className={styles.calendarDayCell}>
                      <span className={styles.calendarDayNumber}>{dayNum}</span>
                      {isSummit && (
                        <Link href="/program-kerja/stem-innovation-summit-2026" className={styles.calendarEventChip}>
                          Summit 2026
                        </Link>
                      )}
                      {isBootcamp && (
                        <Link href="/program-kerja/ai-deep-learning-bootcamp" className={styles.calendarEventChip}>
                          AI Bootcamp
                        </Link>
                      )}
                      {isHackathon && (
                        <Link href="/program-kerja/prasmul-hackathon-techfest" className={styles.calendarEventChip}>
                          Hackathon
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Categories Exploration Section ───────────────────────────────── */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Eksplorasi Jalur Minat</span>
            <h2 className={styles.sectionTitle}>Pilar Inisiatif SISO</h2>
            <p className={styles.sectionSubtitle}>
              Berbagai jalur pengembangan diri yang dapat kamu ikuti sesuai aspirasi dan minat kariermu.
            </p>
          </div>

          <div className={styles.categoryGrid}>
            {categoryKeys.map((catKey) => {
              const meta = CATEGORY_META[catKey];
              return (
                <Link
                  key={catKey}
                  href={`/program-kerja?category=${catKey}`}
                  className={styles.categoryCard}
                >
                  <div>
                    <div className={styles.categoryIconBox}>
                      {catKey === "workshop" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      )}
                      {catKey === "seminar" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" />
                          <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      )}
                      {catKey === "competition" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      )}
                      {catKey === "pengmas" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      )}
                      {catKey === "event" && (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      )}
                    </div>
                    <h3 className={styles.categoryCardTitle}>{meta.title}</h3>
                    <p className={styles.categoryCardDesc}>{meta.desc}</p>
                  </div>
                  <span className={styles.categoryCardLink}>
                    Eksplorasi Program &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
