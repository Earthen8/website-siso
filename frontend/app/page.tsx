import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  fetchSections,
  fetchOrganization,
  fetchPrograms,
  fetchAchievements,
  fetchMedia,
  type Section,
  type ProgramKerja,
  type MediaAsset,
} from "@/lib/api";
import AchievementCarousel from "@/components/AchievementCarousel";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "SISO Prasmul | BEM Fakultas Sekolah STEM Prasetiya Mulya",
  description:
    "Profil resmi STEM Prasetiya Mulya Innovation Student Organization (SISO), wadah representasi, pengembangan, kolaborasi, dan pengabdian mahasiswa STEM Prasmul.",
  openGraph: {
    title: "SISO Prasmul | BEM Fakultas Sekolah STEM Prasetiya Mulya",
    description:
      "Wadah resmi representasi, pengembangan, kolaborasi, dan pengabdian mahasiswa Sekolah STEM Universitas Prasetiya Mulya.",
    locale: "id_ID",
    type: "website",
  },
};

const buildOrganizationSchema = (siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SISO Prasmul",
  url: siteUrl,
  logo: `${siteUrl}/logo-siso.png`,
  sameAs: [
    "https://instagram.com/siso.prasmul",
    "https://tiktok.com/@siso.prasmul",
  ],
});

function getSection(sections: Section[], type: string): Section | undefined {
  return sections.find((s) => s.section_type === type);
}

function isSectionVisible(
  sections: Section[],
  type: string,
  defaultValue = true
): boolean {
  const section = getSection(sections, type);
  return section ? section.is_visible : defaultValue;
}

// ── Curated Fallback Assets ──────────────────────────────────────────────────
const DEFAULT_PROGRAM_COVERS: Record<string, string> = {
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

const DEFAULT_DOC_IMAGES = [
  {
    id: 1,
    file: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=700&auto=format&fit=crop",
    caption: "Pameran Karya & Kolaborasi Industri di InnoFair",
  },
  {
    id: 2,
    file: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=700&auto=format&fit=crop",
    caption: "Pelatihan Pemrograman Visual di Prog{r}amming",
  },
  {
    id: 3,
    file: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=700&auto=format&fit=crop",
    caption: "Eksperimen Sains Interaktif di Science Fun Day",
  },
  {
    id: 4,
    file: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=700&auto=format&fit=crop",
    caption: "Sidang Permusyawaratan SISO Grand Assembly",
  },
];

const FALLBACK_MISSION_POINTS = [
  "Mewadahi dan memperjuangkan aspirasi mahasiswa STEM melalui mekanisme representasi serta advokasi yang aktif.",
  "Mengembangkan potensi akademik, nonakademik, kreativitas, dan kepemimpinan mahasiswa melalui program kerja.",
  "Memfasilitasi kolaborasi strategis antara mahasiswa STEM dengan civitas academica, alumni, dan mitra eksternal.",
  "Menjalankan pengabdian masyarakat berbasis sains dan teknologi serta menjaga keberlanjutan regenerasi SISO.",
];

const FALLBACK_VALUE_PROPS = [
  {
    title: "Representasi & Advokasi Mahasiswa",
    text: "Menjadi jembatan komunikasi resmi yang menghimpun, mengawal, dan memperjuangkan aspirasi serta kesejahteraan seluruh mahasiswa aktif Sekolah STEM (STEMians).",
  },
  {
    title: "Pengembangan Kapasitas & Kepemimpinan",
    text: "Membentuk karakter kepemimpinan, manajemen organisasi yang profesional, serta budaya kerja berbasis data (evidence-based) melalui pengalaman kepengurusan.",
  },
  {
    title: "Kolaborasi Eksternal & Pengabdian",
    text: "Membangun sinergi kemitraan strategis dengan korporasi, alumni, dan organisasi lain sekaligus menghadirkan program edukasi teknologi bagi masyarakat luas.",
  },
];

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

export default async function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sisoprasmul.com";

  const [sections, org, highlightedPrograms, upcomingEvents, achievements, media] =
    await Promise.all([
      fetchSections("home").catch(() => []),
      fetchOrganization().catch(() => null),
      fetchPrograms({ featured: true, limit: 3 }).catch(() => []),
      fetchPrograms({ upcoming: true, limit: 3 }).catch(() => []),
      fetchAchievements(6).catch(() => []),
      fetchMedia(4).catch(() => []),
    ]);

  const visionSection = getSection(sections, "vision_mission");
  const visionText: string =
    (visionSection?.config?.vision_text as string) ??
    org?.visi ??
    "Menjadi organisasi kemahasiswaan tingkat fakultas yang otonom, inklusif, kolaboratif, dan berkelanjutan dalam mewadahi aspirasi, pengembangan kepemimpinan, serta inovasi mahasiswa Sekolah STEM Universitas Prasetiya Mulya.";

  const missionPoints: string[] =
    (visionSection?.config?.mission_points as string[]) ??
    FALLBACK_MISSION_POINTS;

  const valuePropSection = getSection(sections, "value_proposition");
  const valuePropConfig = valuePropSection?.config as
    | {
        badge?: string;
        title?: string;
        subtitle?: string;
        items?: { title: string; text: string }[];
      }
    | undefined;

  const valueProps: { title: string; text: string }[] =
    valuePropConfig?.items && valuePropConfig.items.length > 0
      ? valuePropConfig.items
      : FALLBACK_VALUE_PROPS;

  const socialPosts: { image: string; url: string }[] =
    (getSection(sections, "social_media")?.config?.posts as {
      image: string;
      url: string;
    }[]) ?? [];

  const displayMedia = media.length > 0 ? media : (DEFAULT_DOC_IMAGES as MediaAsset[]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationSchema(siteUrl)),
        }}
      />

      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      {isSectionVisible(sections, "hero") && (
        <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/images/hero-team.jpg"
            alt="Fungsionaris SISO Sekolah STEM Universitas Prasetiya Mulya"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            BEM Fakultas Sekolah STEM Prasetiya Mulya
          </div>
          <h1 className={styles.heroTitle}>
            {org?.slogan ? (
              org.slogan
            ) : (
              <>
                With STEM We Can:{" "}
                <span className={styles.heroTitleHighlight}>Represent, Collaborate, Innovate</span>
              </>
            )}
          </h1>
          <p className={styles.heroSubtitle}>
            STEM Prasetiya Mulya Innovation Student Organization (SISO) adalah wadah resmi mahasiswa Sekolah STEM dalam menjalankan fungsi representasi, pengembangan, kolaborasi, dan pengabdian.
          </p>

          <div className={styles.heroActions}>
            <Link href="/about" className={styles.heroBtnPrimary}>
              Mengenal Profil SISO
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/program-kerja" className={styles.heroBtnSecondary}>
              Lihat Program Kerja
            </Link>
          </div>

          <a href="#about" className={styles.heroScroll} aria-label="Scroll ke konten">
            <span className={styles.heroChevron} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Gulir untuk mengenal SISO</span>
          </a>
        </div>
        </section>
      )}

      {/* ── 2. About SISO ───────────────────────────────────────────────────── */}
      {isSectionVisible(sections, "about") && (
        <section id="about" className="section-block">
          <div className={`container ${styles.about}`}>
            <div className={styles.aboutMediaWrapper}>
              <div className={styles.aboutMedia}>
                <Image
                  src="/images/about-siso.jpg"
                  alt="Fungsionaris SISO berdiskusi dalam forum kelembagaan"
                  fill
                  sizes="(min-width: 900px) 500px, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.aboutFloatBadge}>
                <div className={styles.aboutBadgeIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className={styles.aboutBadgeTitle}>BEM Fakultas STEM</div>
                  <div className={styles.aboutBadgeValue}>With STEM We Can</div>
                </div>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <span className={styles.sectionBadge}>Profil Organisasi</span>
              <h2 className={styles.aboutTitle}>Mengenal SISO Lebih Dekat</h2>
              <p className={styles.aboutText}>
                STEM Prasetiya Mulya Innovation Student Organization (SISO) merupakan organisasi kemahasiswaan resmi tingkat fakultas di lingkungan Sekolah STEM Universitas Prasetiya Mulya. Berlandaskan asas kedaulatan mahasiswa, SISO hadir menghimpun aspirasi, mengembangkan kepemimpinan, serta memfasilitasi kolaborasi seluruh mahasiswa aktif STEM (STEMians).
              </p>
              <Link href="/about" className={styles.aboutBtn}>
                Baca Selengkapnya
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Vision & Mission ─────────────────────────────────────────────── */}
      {isSectionVisible(sections, "vision_mission") && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Mandat Kelembagaan</span>
              <h2 className={styles.sectionHeading}>Vision &amp; Institutional Mission</h2>
              <p className={styles.sectionSubtitle}>
                Landasan strategis SISO yang berlaku berkesinambungan lintas periode kepengurusan untuk melayani seluruh mahasiswa Sekolah STEM.
              </p>
            </div>

            <div className={styles.visionMissionGrid}>
              <div className={styles.visionCard}>
                <div>
                  <div className={styles.visionIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <h3>Our Vision</h3>
                  <p>{visionText}</p>
                </div>
              </div>

              <div className={styles.missionCol}>
                <div className={styles.missionHeader}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 11l3 3L22 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Empat Pilar Misi Kelembagaan
                </div>
                <div className={styles.missionGrid}>
                  {missionPoints.map((point: string, idx: number) => (
                    <div className={styles.missionCard} key={point}>
                      <span className={styles.missionIndex}>0{idx + 1}</span>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Highlighted Programs ─────────────────────────────────────────── */}
      {isSectionVisible(sections, "highlighted_programs") && (
        <section className="section-block">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Program Kerja Utama</span>
              <h2 className={styles.sectionHeading}>Our Signature Programs</h2>
              <p className={styles.sectionSubtitle}>
                Rangkaian program kerja berkelanjutan yang diselenggarakan oleh SISO untuk memberikan manfaat bagi internal maupun eksternal Sekolah STEM.
              </p>
            </div>

            {highlightedPrograms.length > 0 ? (
              <div className={styles.programsGrid}>
                {highlightedPrograms.map((program: ProgramKerja) => {
                  const cover =
                    program.cover_image ||
                    DEFAULT_PROGRAM_COVERS[program.category] ||
                    DEFAULT_PROGRAM_COVERS.event;

                  return (
                    <Link
                      href={`/program-kerja/${program.slug}`}
                      className={styles.programCard}
                      key={program.id}
                    >
                      <div className={styles.programImage}>
                        <Image
                          src={cover}
                          alt={program.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          style={{ objectFit: "cover" }}
                        />
                        <div className={styles.programOverlay} />
                        <span className={styles.programTag}>{program.category}</span>
                      </div>

                      <div className={styles.programBody}>
                        <div>
                          <div className={styles.programMeta}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>{formatEventDate(program.date)}</span>
                          </div>
                          <h3 className={styles.programTitle}>{program.title}</h3>
                          <p className={styles.programDescription}>
                            {program.description || "Program pengembangan inovasi dan sains dari SISO Prasmul."}
                          </p>
                        </div>

                        <div className={styles.programFooter}>
                          <span>Pelajari Detail</span>
                          <span className={styles.programArrow}>&rarr;</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>Belum ada Program Unggulan</p>
                <p className={styles.emptyStateDesc}>
                  Tambahkan program kerja di Django Admin dan centang opsi <strong>&quot;is_featured&quot;</strong> untuk menampilkannya di halaman ini.
                </p>
              </div>
            )}

            <div className={styles.centered}>
              <Link href="/program-kerja" className={styles.pillBtn}>
                Lihat Semua Program
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Upcoming Events ──────────────────────────────────────────────── */}
      {isSectionVisible(sections, "upcoming_events") && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Kalender Kegiatan</span>
              <h2 className={styles.sectionHeading}>Upcoming Activities</h2>
              <p className={styles.sectionSubtitle}>
                Informasi pelaksanaan program kerja, forum permusyawaratan, workshop, dan kegiatan kolaborasi SISO pada periode berjalan.
              </p>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className={styles.eventsList}>
                {upcomingEvents.map((event: ProgramKerja) => {
                  const cover =
                    event.cover_image ||
                    DEFAULT_PROGRAM_COVERS[event.category] ||
                    DEFAULT_PROGRAM_COVERS.workshop;

                  return (
                    <div className={styles.eventRow} key={event.id}>
                      <div className={styles.eventImage}>
                        <Image
                          src={cover}
                          alt={event.title}
                          fill
                          sizes="(min-width: 860px) 340px, 100vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className={styles.eventCard}>
                        <div>
                          <div className={styles.eventTopMeta}>
                            <span className={styles.eventCategoryTag}>{event.category}</span>
                            <span className={styles.eventDateBadge}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" />
                              </svg>
                              {formatEventDate(event.date)}
                            </span>
                          </div>
                          <h3 className={styles.eventTitle}>{event.title}</h3>
                          <p className={styles.eventDescription}>{event.description}</p>
                        </div>
                        <Link
                          href={`/program-kerja/${event.slug}`}
                          className={styles.eventRegisterBtn}
                        >
                          Daftar Sekarang &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>Belum ada event mendatang</p>
                <p className={styles.emptyStateDesc}>
                  Event dengan tanggal yang akan datang akan otomatis muncul di bagian ini.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 6. Student Achievements ─────────────────────────────────────────── */}
      {isSectionVisible(sections, "student_achievements") && (
        <section className="section-block">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Apresiasi &amp; Karya</span>
              <h2 className={styles.sectionHeading}>Milestones &amp; Appreciations</h2>
              <p className={styles.sectionSubtitle}>
                Dokumentasi pencapaian kolektif, karya inovatif program kerja, dan kontribusi fungsionaris SISO di lingkungan kampus maupun masyarakat.
              </p>
            </div>

            {achievements.length > 0 ? (
              <AchievementCarousel achievements={achievements} />
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>Milestones &amp; Appreciations</p>
                <p className={styles.emptyStateDesc}>
                  Dokumentasi pencapaian kolektif dan kontribusi fungsionaris SISO akan tampil di bagian ini.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 7. Documentations ───────────────────────────────────────────────── */}
      {isSectionVisible(sections, "documentations") && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Arsip Dokumentasi</span>
              <h2 className={styles.sectionHeading}>SISO in Action</h2>
              <p className={styles.sectionSubtitle}>
                Rekaman visual pelaksanaan program kerja, forum permusyawaratan SISO Grand Assembly, hingga kegiatan pengabdian masyarakat oleh SISO.
              </p>
            </div>

            <div className={styles.documentationGrid}>
              {displayMedia.map((item: MediaAsset) => (
                <div className={styles.docItem} key={item.id}>
                  <Image
                    src={item.file}
                    alt={item.caption ?? "Dokumentasi kegiatan SISO Prasmul"}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 560px) 50vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                  {item.caption && (
                    <div className={styles.docOverlay}>
                      <span className={styles.docCaption}>{item.caption}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.centered}>
              <Link href="/gallery" className={styles.pillBtn}>
                Buka Galeri SISO
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Our Social Media ─────────────────────────────────────────────── */}
      {isSectionVisible(sections, "social_media") && (
        <section className="section-block" style={{ paddingInline: 0 }}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Kanal Komunikasi Resmi</span>
              <h2 className={styles.sectionHeading}>Official Social Media</h2>
              <p className={styles.sectionSubtitle}>
                Dapatkan informasi resmi organisasi, publikasi kegiatan, dan pengumuman terkini melalui akun Instagram{" "}
                <a
                  href="https://www.instagram.com/siso.prasmul/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--siso-navy)", fontWeight: 600 }}
                >
                  @siso.prasmul
                </a>.
              </p>
            </div>
          </div>

          <div className={styles.socialGridFull}>
            {(socialPosts.length > 0
              ? socialPosts
              : [
                  {
                    image:
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
                    url: "https://www.instagram.com/siso.prasmul/",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop",
                    url: "https://www.instagram.com/siso.prasmul/",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
                    url: "https://www.instagram.com/siso.prasmul/",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop",
                    url: "https://www.instagram.com/siso.prasmul/",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
                    url: "https://www.instagram.com/siso.prasmul/",
                  },
                  {
                    image:
                      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
                    url: "https://www.instagram.com/siso.prasmul/",
                  },
                ]
            ).map((post, i) => (
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className={styles.socialItemFull}
                key={post.url + i}
              >
                <Image
                  src={post.image}
                  alt="Postingan Instagram SISO Prasmul"
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 600px) 33vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.socialItemOverlay}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── 9. Value Proposition ───────────────────────────────────────────── */}
      {isSectionVisible(sections, "value_proposition") && (
        <section className={`section-block ${styles.altBg}`} id="value-proposition">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                {valuePropConfig?.badge || "Peran & Fungsi Utama"}
              </span>
              <h2 className={styles.sectionHeading}>
                {valuePropConfig?.title || "Core Pillars of SISO"}
              </h2>
              <p className={styles.sectionSubtitle}>
                {valuePropConfig?.subtitle ||
                  "Sebagai organisasi kemahasiswaan tingkat fakultas, SISO menjalankan tiga peran strategis yang berorientasi pada kepentingan mahasiswa (student-centered) dan kemitraan."}
              </p>
            </div>

            <div className={styles.valueGrid}>
              {valueProps.map((item, idx) => (
                <div className={styles.valueCard} key={item.title}>
                  <div className={styles.valueIconWrap}>
                    {idx % 3 === 0 && (
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="2.5" />
                        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
                        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
                      </svg>
                    )}
                    {idx % 3 === 1 && (
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" />
                        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                      </svg>
                    )}
                    {idx % 3 === 2 && (
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                      </svg>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}