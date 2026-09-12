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
  title: "Home | SISO Prasmul",
  description:
    "STEM Prasetiya Mulya Innovation Student Organization (SISO) — Menginspirasi, Mengembangkan, dan Menghubungkan Mahasiswa STEM.",
  openGraph: {
    title: "SISO Prasmul — Empowering Future STEM Innovators",
    description:
      "STEM Prasetiya Mulya Innovation Student Organization (SISO) — Himpunan Mahasiswa STEM Universitas Prasetiya Mulya.",
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
    "https://tiktok.com/@sisoprasmul",
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
    file: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=700&auto=format&fit=crop",
    caption: "Hands-on robotics prototyping session",
  },
  {
    id: 2,
    file: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=700&auto=format&fit=crop",
    caption: "AI & Data Science peer workshop",
  },
  {
    id: 3,
    file: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=700&auto=format&fit=crop",
    caption: "Team brainstorm at Innovation Hub",
  },
  {
    id: 4,
    file: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=700&auto=format&fit=crop",
    caption: "Annual STEM Student Exhibition",
  },
];

const FALLBACK_MISSION_POINTS = [
  "Mengembangkan potensi dan keahlian aplikatif mahasiswa STEM",
  "Menyelenggarakan program riset, workshop, dan kompetisi inovatif",
  "Menjalin kolaborasi strategis dengan industri dan ekosistem kampus",
  "Membangun komunitas mahasiswa yang solid, adaptif, dan inklusif",
];

const FALLBACK_VALUE_PROPS = [
  {
    title: "Networking Luas",
    text: "Terhubung langsung dengan mahasiswa STEM lintas angkatan, alumni berprestasi, dan jaringan korporasi teknologi ternama.",
  },
  {
    title: "Skill Development",
    text: "Asah kemampuan teknis (Coding, AI, IoT, Robotics) dan soft skill kepemimpinan melalui bootcamp dan workshop aplikatif.",
  },
  {
    title: "Real-World Impact",
    text: "Buktikan kapabilitas melalui proyek riset riil, program pengabdian masyarakat, dan kompetisi sains & teknologi bergengsi.",
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

  // TODO: [Backend Integration] Dynamic Section Reordering
  // Backend DRF endpoint /api/v1/sections/?page=home mengembalikan urutan field `order`.
  // Ke depannya, section bisa dirender secara dinamis looping map() sesuai urutan dari backend.

  const [sections, org, highlightedPrograms, upcomingEvents, achievements, media] =
    await Promise.all([
      fetchSections("home").catch(() => []),
      fetchOrganization().catch(() => null),
      fetchPrograms({ featured: true, limit: 3 }).catch(() => []),
      fetchPrograms({ upcoming: true, limit: 3 }).catch(() => []),
      fetchAchievements(6).catch(() => []),
      fetchMedia(4).catch(() => []),
    ]);

  const missionPoints: string[] =
    (getSection(sections, "vision_mission")?.config?.mission_points as string[]) ??
    FALLBACK_MISSION_POINTS;

  const valueProps: { title: string; text: string }[] =
    (getSection(sections, "value_proposition")?.config?.items as {
      title: string;
      text: string;
    }[]) ?? FALLBACK_VALUE_PROPS;

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
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/images/hero-team.jpg"
            alt="Mahasiswa STEM SISO Prasmul berkolaborasi di laboratorium"
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
            Himpunan Mahasiswa STEM Prasetiya Mulya
          </div>
          <h1 className={styles.heroTitle}>
            {org?.slogan ? (
              org.slogan
            ) : (
              <>
                Empowering Future{" "}
                <span className={styles.heroTitleHighlight}>STEM Innovators</span>
              </>
            )}
          </h1>
          <p className={styles.heroSubtitle}>
            Wadah kolaborasi, riset aplikatif, dan pengembangan talenta sains & teknologi
            menuju masa depan digital Indonesia.
          </p>

          <div className={styles.heroActions}>
            <Link href="/program-kerja" className={styles.heroBtnPrimary}>
              Jelajahi Program
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
            <Link href="/about" className={styles.heroBtnSecondary}>
              Tentang SISO
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
            <span>Scroll untuk menjelajahi</span>
          </a>
        </div>
      </section>

      {/* ── 2. About SISO ───────────────────────────────────────────────────── */}
      {isSectionVisible(sections, "about") && (
        <section id="about" className="section-block">
          <div className={`container ${styles.about}`}>
            <div className={styles.aboutMediaWrapper}>
              <div className={styles.aboutMedia}>
                <Image
                  src="/images/about-siso.jpg"
                  alt="Anggota SISO Prasmul berdiskusi proyek inovasi"
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
                  <div className={styles.aboutBadgeTitle}>Est. STEM Prasmul</div>
                  <div className={styles.aboutBadgeValue}>Innovation Hub</div>
                </div>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <span className={styles.sectionBadge}>Tentang Kami</span>
              <h2 className={styles.aboutTitle}>Mengenal SISO Prasmul</h2>
              <p className={styles.aboutText}>
                {org?.visi
                  ? org.visi
                  : "STEM Prasetiya Mulya Innovation Student Organization (SISO) merupakan organisasi kemahasiswaan resmi di bawah Sekolah STEM Universitas Prasetiya Mulya yang berfokus pada kolaborasi multidisiplin, inovasi teknologi, dan kepemimpinan."}
              </p>
              <Link href="/about" className={styles.aboutBtn}>
                Pelajari Selengkapnya
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
              <span className={styles.sectionBadge}>Arah & Tujuan</span>
              <h2 className={styles.sectionHeading}>Vision &amp; Mission</h2>
              <p className={styles.sectionSubtitle}>
                Komitmen kami dalam menggerakkan inovasi teknologi dan membentuk karakter
                pemimpin masa depan di lingkungan kampus maupun masyarakat.
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
                  <p>
                    {org?.visi ??
                      "Menjadi episentrum pergerakan mahasiswa STEM yang unggul, inovatif, dan berintegritas dalam menciptakan solusi teknologi yang aplikatif."}
                  </p>
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
                  Empat Pilar Misi SISO
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
      {/* 
        NOTE: Section ini aktif jika di-toggle di Django Admin (Section.is_visible = True).
        TODO: [Backend Integration] Pastikan ada program dengan flag `is_featured = True` di Django Admin.
      */}
      {isSectionVisible(sections, "highlighted_programs") && (
        <section className="section-block">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Program Pilihan</span>
              <h2 className={styles.sectionHeading}>Highlighted Programs</h2>
              <p className={styles.sectionSubtitle}>
                Inisiatif unggulan SISO yang dirancang untuk mengasah kapabilitas teknis
                dan membuka pintu peluang industri bagi mahasiswa.
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
      {/* 
        TODO: [Backend Integration] Sambungkan tombol registrasi langsung ke endpoint
        pendaftaran atau link form eksternal yang diatur via Django Admin.
      */}
      {isSectionVisible(sections, "upcoming_events") && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Agenda Terdekat</span>
              <h2 className={styles.sectionHeading}>Upcoming Events</h2>
              <p className={styles.sectionSubtitle}>
                Jangan lewatkan agenda workshop, seminar, dan kompetisi mendatang. Daftarkan diri Anda sekarang!
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
              <span className={styles.sectionBadge}>Prestasi Mahasiswa</span>
              <h2 className={styles.sectionHeading}>Student Achievements</h2>
              <p className={styles.sectionSubtitle}>
                Apresiasi atas pencapaian membanggakan mahasiswa STEM Prasetiya Mulya di kancah nasional dan internasional.
              </p>
            </div>

            {achievements.length > 0 ? (
              <AchievementCarousel achievements={achievements} />
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>Prestasi Mahasiswa</p>
                <p className={styles.emptyStateDesc}>
                  Data prestasi yang diinputkan melalui Django Admin akan tampil di carousel ini.
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
              <span className={styles.sectionBadge}>Galeri Kegiatan</span>
              <h2 className={styles.sectionHeading}>Documentations</h2>
              <p className={styles.sectionSubtitle}>
                Momen-momen inspiratif dan dokumentasi keseruan kegiatan mahasiswa bersama SISO.
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
                Lihat Galeri Lengkap
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
      {/* 
        TODO: [Backend Integration] Integrasi otomatis dengan Instagram Basic Display API 
        atau cron scraper untuk meng-update postingan foto secara realtime.
      */}
      {isSectionVisible(sections, "social_media") && (
        <section className="section-block" style={{ paddingInline: 0 }}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Terhubung Bersama Kami</span>
              <h2 className={styles.sectionHeading}>Our Social Media</h2>
              <p className={styles.sectionSubtitle}>
                Ikuti update terkini, info lomba, dan keseruan kegiatan kami di Instagram{" "}
                <a
                  href="https://www.instagram.com/siso.prasmul/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--siso-navy)", fontWeight: 600 }}
                >
                  @siso.prasmul
                </a>
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
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Nilai Keunggulan</span>
              <h2 className={styles.sectionHeading}>Why Join SISO?</h2>
              <p className={styles.sectionSubtitle}>
                Manfaat nyata dan ekosistem bertumbuh yang akan Anda dapatkan sebagai bagian dari keluarga besar SISO.
              </p>
            </div>

            <div className={styles.valueGrid}>
              {valueProps.map((item, idx) => (
                <div className={styles.valueCard} key={item.title}>
                  <div className={styles.valueIconWrap}>
                    {idx === 0 && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                        <circle cx="5" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                        <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8v5M12 13l-5 4M12 13l5 4" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path
                          d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
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