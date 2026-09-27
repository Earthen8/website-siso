import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchPrograms, fetchSections, type ProgramKerja, type Section } from "@/lib/api";
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

function parseTimelineDate(dateString: string) {
  try {
    const d = new Date(dateString);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString("id-ID", { month: "short" }).toUpperCase(),
      year: d.getFullYear(),
      isUpcoming: d.getTime() >= Date.now(),
      fullDate: d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  } catch {
    return {
      day: "--",
      month: "TBA",
      year: "",
      isUpcoming: true,
      fullDate: dateString,
    };
  }
}

function isSectionVisible(
  sections: Section[],
  type: string,
  defaultValue = true
): boolean {
  const section = sections.find((s) => s.section_type === type);
  return section ? section.is_visible : defaultValue;
}

interface TimelineProgramData {
  id: number;
  title: string;
  slug: string;
  category: ProgramCategory;
  description: string;
  date: string | null;
  location?: string | null;
  registration_url?: string | null;
}

const DEMO_TIMELINE_PROGRAMS: TimelineProgramData[] = [
  {
    id: 991,
    title: "STEM Innovation Summit 2026",
    slug: "stem-innovation-summit-2026",
    category: "event",
    description:
      "Konferensi tahunan inovasi teknologi dan sains terbesar mahasiswa STEM Prasetiya Mulya.",
    date: "2026-10-02",
    location: "Auditorium Kampus BSD",
    registration_url: null,
  },
  {
    id: 992,
    title: "AI & Deep Learning Bootcamp",
    slug: "ai-deep-learning-bootcamp",
    category: "workshop",
    description:
      "Pelatihan intensif pemodelan deep learning, computer vision, dan implementasi transformer modern.",
    date: "2026-11-17",
    location: "Lab Komputasi STEM & Hybrid",
    registration_url: null,
  },
  {
    id: 993,
    title: "Prasmul Hackathon Techfest",
    slug: "prasmul-hackathon-techfest",
    category: "competition",
    description:
      "Kompetisi 48 jam penciptaan solusi digital dan hardware untuk tantangan industri riil.",
    date: "2026-11-24",
    location: "Main Hall Kampus BSD",
    registration_url: null,
  },
];

function TimelineItem({
  program,
  isLast,
}: {
  program: TimelineProgramData;
  isLast: boolean;
}) {
  const { day, month, isUpcoming, fullDate } = parseTimelineDate(program.date || "");

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineNodeCol}>
        <div className={`${styles.dateBadge} ${isUpcoming ? styles.dateBadgeUpcoming : ""}`}>
          <span className={styles.dateDay}>{day}</span>
          <span className={styles.dateMonth}>{month}</span>
        </div>
        {!isLast && <div className={styles.timelineLine} />}
      </div>

      <div className={styles.timelineCard}>
        <div className={styles.timelineCardHeader}>
          <div className={styles.timelineBadges}>
            <span className={styles.categoryBadge}>
              {CATEGORY_META[program.category]?.title || program.category}
            </span>
            <span className={isUpcoming ? styles.statusUpcoming : styles.statusPast}>
              {isUpcoming ? "● Mendatang" : "✓ Terlaksana"}
            </span>
          </div>
          <span className={styles.timelineFullDate}>{fullDate}</span>
        </div>

        <h3 className={styles.timelineTitle}>
          <Link href={`/program-kerja/${program.slug}`}>{program.title}</Link>
        </h3>

        <p className={styles.timelineDesc}>{program.description}</p>

        <div className={styles.timelineFooter}>
          {program.location ? (
            <span className={styles.timelineLocation}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {program.location}
            </span>
          ) : (
            <span />
          )}

          <div className={styles.timelineActions}>
            <Link href={`/program-kerja/${program.slug}`} className={styles.timelineLink}>
              Detail Program &rarr;
            </Link>
            {program.registration_url && isUpcoming && (
              <a
                href={program.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.timelineRegisterBtn}
              >
                Daftar
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  searchParams: { category?: string };
}

export default async function ProgramKerjaPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ProgramCategory | undefined;

  const [allPrograms, sections] = await Promise.all([
    fetchPrograms().catch(() => []),
    fetchSections("program").catch(() => []),
  ]);
  const programs = activeCategory
    ? allPrograms.filter((p) => p.category === activeCategory)
    : allPrograms;

  const timelinePrograms = allPrograms
    .filter((p) => Boolean(p.date))
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

  const timelineList =
    timelinePrograms.length > 0
      ? timelinePrograms
      : programs.length === 0
        ? DEMO_TIMELINE_PROGRAMS
        : [];

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
      {isSectionVisible(sections, "hero") && (
        <section className={styles.heroContainer}>
          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
              </svg>
              Inisiatif SISO Prasmul
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
      )}

      {/* ── 2. Quick Category Filter Bar ────────────────────────────────────── */}
      {isSectionVisible(sections, "filter") && (
        <nav className={styles.filterSection} aria-label="Filter kategori program">
          <div className="container">
            <div className={styles.filterBar}>
              <Link
                href="/program-kerja"
                scroll={false}
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
                    scroll={false}
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
                <Link href="/program-kerja" scroll={false} className={styles.resetFilterLink}>
                  ✕ Reset Filter
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* ── 3. Programs Grid Showcase ───────────────────────────────────────── */}
      {isSectionVisible(sections, "catalog") && (
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
      )}

      {/* ── 4. Vertical Timeline & Roadmap Section ──────────────────────────── */}
      {isSectionVisible(sections, "timeline") && (
        <section className={`${styles.timelineSection} ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Roadmap &amp; Linimasa</span>
              <h2 className={styles.sectionTitle}>Agenda &amp; Timeline Kegiatan</h2>
              <p className={styles.sectionSubtitle}>
                Linimasa pelaksanaan program kerja dan milestone penting SISO sepanjang periode kepengurusan.
              </p>
            </div>

            {timelineList.length > 0 ? (
              <div className={styles.timelineWrapper}>
                {timelineList.map((prog, index) => (
                  <TimelineItem
                    key={prog.id}
                    program={prog}
                    isLast={index === timelineList.length - 1}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.timelineEmpty}>
                <div className={styles.emptyIconBox}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className={styles.emptyTitle}>Linimasa Sedang Diperbarui</h3>
                <p className={styles.emptyDesc}>
                  Pengurus SISO sedang menyusun jadwal pelaksanaan kegiatan untuk periode ini. Pantau terus halaman ini untuk pembaruan agenda resmi.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. Categories Exploration Section ───────────────────────────────── */}
      {/* <section className={styles.categoriesSection}>
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
      </section> */}
    </div>
  );
}
