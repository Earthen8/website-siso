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
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://instagram.com/sisoprasmul",
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

const FALLBACK_MISSION_POINTS = [
  "Mengembangkan potensi mahasiswa STEM",
  "Menyelenggarakan program akademik dan non-akademik",
  "Menjalin kerja sama dengan industri",
  "Membangun komunitas yang suportif dan inovatif",
];

const FALLBACK_VALUE_PROPS = [
  {
    title: "Networking",
    text: "Terhubung dengan mahasiswa STEM lintas angkatan, alumni, dan mitra industri terkemuka.",
  },
  {
    title: "Skill Development",
    text: "Asah kemampuan teknis dan non-teknis lewat workshop interaktif, seminar, dan proyek nyata.",
  },
  {
    title: "Real-World Impact",
    text: "Ambil bagian dalam program pengabdian masyarakat dan kompetisi sains & teknologi nasional.",
  },
];

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationSchema(siteUrl)),
        }}
      />

      {/* ── 1. Hero ────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/images/hero-team.jpg"
            alt="Mahasiswa STEM SISO Prasmul berkolaborasi"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            {org?.slogan ?? "Empowering Future STEM Innovators"}
          </h1>
          <p className={styles.heroSubtitle}>
            Menginspirasi, Mengembangkan, dan Menghubungkan Mahasiswa STEM
          </p>
          <a href="#about" className={styles.heroScroll} aria-label="Scroll down to explore">
            <span className={styles.heroScrollPill}>Scroll to explore</span>
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
          </a>
        </div>
      </section>

      {/* ── 2. About SISO ─────────────────────────────────────────────────── */}
      {isSectionVisible(sections, "about") && (
        <section id="about" className="section-block">
          <div className={`container ${styles.about}`}>
            <div className={styles.aboutMedia}>
              <Image
                src="/images/about-siso.jpg"
                alt="Anggota SISO Prasmul berdiskusi di lab"
                fill
                sizes="(min-width: 900px) 480px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.aboutContent}>
              <h2 className={styles.aboutTitle}>SISO</h2>
              <p className={styles.aboutText}>
                {org?.visi
                  ? `Visi: ${org.visi}`
                  : "STEM Prasetiya Mulya Innovation Student Organization (SISO) merupakan organisasi mahasiswa di bawah naungan Sekolah STEM Universitas Prasetiya Mulya."}
              </p>
              <Link href="/about" className={styles.aboutBtn}>
                Read More
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. Vision & Mission ───────────────────────────────────────────── */}
      {isSectionVisible(sections, "vision_mission") && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 80px)" }}>
              VISION &amp; MISSION
            </h2>
            <div className={styles.visionMissionGrid}>
              <div className={styles.visionCard}>
                <h3>Our Vision</h3>
                <p>
                  {org?.visi ??
                    "Menjadi organisasi mahasiswa STEM yang inovatif, kolaboratif, dan berdampak positif bagi mahasiswa maupun masyarakat."}
                </p>
              </div>
              <div className={styles.missionCol}>
                <div className={styles.missionHeader}>Our Mission</div>
                <div className={styles.missionGrid}>
                  {missionPoints.map((point: string) => (
                    <div className={styles.missionCard} key={point}>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Highlighted Programs ───────────────────────────────────────── */}
      {isSectionVisible(sections, "highlighted_programs") &&
        highlightedPrograms.length > 0 && (
          <section className="section-block">
            <div className="container">
              <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 80px)" }}>
                HIGHLIGHTED PROGRAMS
              </h2>
              <div className={styles.programsGrid}>
                {highlightedPrograms.map((program: ProgramKerja) => (
                  <Link
                    href={`/program-kerja/${program.slug}`}
                    className={styles.programCard}
                    key={program.id}
                  >
                    <div className={styles.programImage}>
                      {program.cover_image && (
                        <Image
                          src={program.cover_image}
                          alt={program.title}
                          fill
                          sizes="(min-width: 900px) 33vw, 100vw"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                      <div className={styles.programOverlay} />
                      <span className={styles.programTag}>
                        {program.category}
                      </span>
                    </div>
                    <p className={styles.programDescription}>
                      {program.description}
                    </p>
                  </Link>
                ))}
              </div>
              <div className={styles.centered}>
                <Link href="/program-kerja" className={styles.pillBtn}>
                  View All Programs
                </Link>
              </div>
            </div>
          </section>
        )}

      {/* ── 5. Upcoming Events ────────────────────────────────────────────── */}
      {isSectionVisible(sections, "upcoming_events") && upcomingEvents.length > 0 && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 80px)" }}>
              UPCOMING EVENTS
            </h2>
            <div className={styles.eventsList}>
              {upcomingEvents.map((event: ProgramKerja) => (
                <div className={styles.eventRow} key={event.id}>
                  <div className={styles.eventImage}>
                    {event.cover_image && (
                      <Image
                        src={event.cover_image}
                        alt={event.title}
                        fill
                        sizes="(min-width: 900px) 440px, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className={styles.eventCard}>
                    <div>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <p className={styles.eventDescription}>
                        {event.description}
                      </p>
                    </div>
                    <Link
                      href={`/program-kerja/${event.slug}`}
                      className={styles.eventRegisterBtn}
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Student Achievements ───────────────────────────────────────── */}
      {isSectionVisible(sections, "student_achievements") &&
        achievements.length > 0 && (
          <section className="section-block">
            <div className="container">
              <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 80px)" }}>
                STUDENT ACHIEVEMENTS
              </h2>
              <AchievementCarousel achievements={achievements} />
            </div>
          </section>
        )}

      {/* ── 7. Documentations ─────────────────────────────────────────────── */}
      {isSectionVisible(sections, "documentations") && media.length > 0 && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 80px)" }}>
              DOCUMENTATIONS
            </h2>
            <div className={styles.documentationGrid}>
              {media.map((item: MediaAsset) => (
                <div className={styles.docItem} key={item.id}>
                  <Image
                    src={item.file}
                    alt={item.caption ?? "Dokumentasi kegiatan SISO Prasmul"}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.centered}>
              <Link href="/program-kerja" className={styles.pillBtn}>
                See more
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Our Social Media ───────────────────────────────────────────── */}
      {isSectionVisible(sections, "social_media") && (
        <section className="section-block" style={{ paddingInline: 0 }}>
          <div className="container">
            <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 80px)" }}>
              OUR SOCIAL MEDIA
            </h2>
          </div>
          <div className={styles.socialGridFull}>
            {(socialPosts.length > 0
              ? socialPosts
              : [
                { image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
                { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop", url: "https://www.instagram.com/siso.prasmul/" },
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
                  sizes="(min-width: 900px) 16vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── 9. Value Proposition ──────────────────────────────────────────── */}
      {isSectionVisible(sections, "value_proposition") && (
        <section className={`section-block ${styles.altBg}`}>
          <div className="container">
            <h2 className={`section-title ${styles.centered}`} style={{ fontSize: "clamp(2rem, 5vw, 84px)" }}>
              Value Proposition
            </h2>
            <div className={styles.valueGrid}>
              {valueProps.map((item) => (
                <div className={styles.valueCard} key={item.title}>
                  <span className={styles.valueIcon} aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="5"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="5"
                        cy="19"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="19"
                        cy="19"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 7.5v5M12 12.5L6.5 17M12 12.5l5.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>
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