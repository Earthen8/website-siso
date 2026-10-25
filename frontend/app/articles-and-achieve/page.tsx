import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchArticles, fetchAchievements, fetchSections } from "@/lib/api";
import type { Article, ArticleCategory, Achievement, Section } from "@/lib/types";
import styles from "./page.module.css";

function isSectionVisible(sections: Section[], sectionType: string): boolean {
  if (sections.length === 0) return true;
  const sec = sections.find((s) => s.section_type === sectionType);
  return sec ? sec.is_visible : true;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Articles & Insights | SISO Prasmul",
  description:
    "Pusat publikasi resmi, rilis berita kelembagaan, hasil kajian riset R&D, serta informasi advokasi dan kanal aspirasi mahasiswa Sekolah STEM Universitas Prasetiya Mulya.",
  openGraph: {
    title: "Articles & Insights | SISO Prasmul",
    description: "Pusat wawasan, kajian riset, dan informasi kemahasiswaan Sekolah STEM Universitas Prasetiya Mulya.",
    locale: "id_ID",
    type: "website",
  },
};

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  jurnal: "Jurnal",
  kajian: "Kajian",
  achievement: "Prestasi",
  beasiswa: "Beasiswa",
};

const ARTICLE_DEFAULT_COVERS: Record<ArticleCategory, string> = {
  jurnal:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  kajian:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  achievement:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
  beasiswa:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
};

// ── Curated Fallback Data for Development & Empty Backend State ──────────────
const FALLBACK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Peran Representatif SISO dalam Membangun Ekosistem Kolaboratif Sekolah STEM",
    slug: "peran-representatif-siso-sekolah-stem",
    body: "Sebagai organisasi kemahasiswaan tingkat fakultas, SISO mengemban amanah representasi, koordinasi, dan advokasi mahasiswa lintas program studi di Sekolah STEM Universitas Prasetiya Mulya. Melalui sinergi antar-lembaga dan komunikasi dua arah dengan dekanat, SISO terus mendorong ekosistem belajar yang suportif, dinamis, dan inklusif.",
    category: "kajian",
    published_at: "2026-03-15T09:00:00Z",
    is_visible: true,
  },
  {
    id: 2,
    title: "Inovasi Purwarupa Mahasiswa Menjawab Kebutuhan Keberlanjutan Industri",
    slug: "inovasi-purwarupa-mahasiswa-keberlanjutan-industri",
    body: "Melalui inisiatif tahunan InnoFair, mahasiswa Sekolah STEM Prasetiya Mulya membuktikan bahwa riset terapan dan purwarupa rekayasa teknologi mampu menjawab tantangan industri nyata. Kolaborasi lintas disiplin ilmu sains dan rekayasa mempercepat hilirisasi ide mahasiswa menjadi solusi praktis.",
    category: "jurnal",
    published_at: "2026-04-10T14:30:00Z",
    is_visible: true,
  },
];

const FALLBACK_ACHIEVEMENTS: Achievement[] = [];

const STUDENT_PUBLICATIONS = [
  {
    title: "Kompilasi Hasil Sidang & Ketetapan SISO Grand Assembly",
    author: "Presidium SISO Grand Assembly (SGA)",
    desc: "Kumpulan ketetapan persidangan, hasil amandemen AD/ART, dan rekomendasi kerja kelembagaan untuk periode kepengurusan.",
    badge: "Ketetapan SGA",
    format: "PDF • Dokumen Sidang",
    year: "Resmi",
  },
  {
    title: "Laporan Penjaringan Aspirasi Mahasiswa Sekolah STEM",
    author: "Departemen Advokasi & Kesejahteraan Mahasiswa",
    desc: "Hasil survei berkala fasilitas perkuliahan, beban akademik, dan aspirasi kegiatan mahasiswa aktif lintas program studi STEM.",
    badge: "Laporan Advokasi",
    format: "PDF • Laporan Survei",
    year: "Berkala",
  },
  {
    title: "Buku Panduan Tata Kelola & SOP Organisasi SISO",
    author: "Badan Pengurus Harian (BPH) SISO",
    desc: "Pedoman administrasi surat-menyurat, pengelolaan keuangan, manajemen kepanitiaan, dan etika komunikasi fungsionaris.",
    badge: "SOP Organisasi",
    format: "PDF • Buku Panduan",
    year: "Panduan",
  },
];

const RESEARCH_STUDIES = [
  {
    title: "Pemetaan Kebutuhan Keterampilan Teknis Mahasiswa STEM Masa Depan",
    desc: "Analisis tren industri teknologi dan keterampilan komputasi yang paling dibutuhkan mahasiswa untuk program pelatihan internal.",
    field: "Riset Kompetensi",
  },
  {
    title: "Evaluasi Dampak Program Kerja SISO terhadap Pengembangan Karakter Mahasiswa",
    desc: "Kajian efektivitas ketercapaian nilai CHAIN dan kompetensi kepemimpinan melalui partisipasi aktif di organisasi.",
    field: "Evaluasi Program",
  },
  {
    title: "Studi Komparasi Tata Kelola BEM Fakultas Sains & Teknologi di Indonesia",
    desc: "Benchmarking struktur kelembagaan, sistem regenerasi, dan mekanisme advokasi pada organisasi mahasiswa fakultas terkemuka.",
    field: "Tata Kelola BEM",
  },
  {
    title: "Model Penjaringan Aspirasi Digital Berbasis Privasi untuk Mahasiswa Kampus",
    desc: "Rancangan platform aspirasi digital yang aman, transparan, dan menjamin perlindungan privasi mahasiswa dalam menyampaikan masukan.",
    field: "Sistem Aspirasi",
  },
];

const SCHOLARSHIPS_DATA = [
  {
    title: "Kanal Aspirasi & Advokasi Mahasiswa SISO",
    amount: "Pendampingan Terbuka",
    deadline: "Aktif Sepanjang Semester",
    eligibility: "Seluruh Mahasiswa Aktif Sekolah STEM",
    quota: "Tidak Terbatas",
    tag: "Layanan Advokasi",
  },
  {
    title: "Bantuan Pendanaan Delegasi Lomba & Konferensi",
    amount: "Bantuan Finansial Delegasi",
    deadline: "Pengajuan H-14 Kegiatan",
    eligibility: "Delegasi mewakili almamater Sekolah STEM",
    quota: "Sesuai Kuota Anggaran",
    tag: "Dukungan Prestasi",
  },
  {
    title: "Pusat Informasi Beasiswa Akademik & Industri",
    amount: "Bantuan Biaya Kuliah & Riset",
    deadline: "Sesuai Jadwal Mitra Beasiswa",
    eligibility: "Mahasiswa aktif memenuhi IPK & syarat mitra",
    quota: "Mengikuti Kuota Penyedia",
    tag: "Informasi Beasiswa",
  },
];

const COMPETITIONS_DATA = [
  {
    title: "InnoFair: Pameran Karya Inovasi & Purwarupa Mahasiswa",
    type: "Pameran Inovasi & Showcase Teknologi",
    date: "Semester Genap (Annual)",
    level: "Tingkat Universitas",
    status: "Tahap Persiapan",
    isOpen: true,
  },
  {
    title: "Prog{r}amming: Lokakarya Komputasi & Coding Dasar",
    type: "Workshop Pemrograman & Algoritma",
    date: "Semester Ganjil (Annual)",
    level: "Internal STEM",
    status: "Pendaftaran Dibuka",
    isOpen: true,
  },
  {
    title: "SISO Grand Assembly: Sidang Umum & Musyawarah Mahasiswa",
    type: "Forum Permusyawaratan & Laporan Pengurus",
    date: "Akhir Periode Kepengurusan",
    level: "Lembaga Mahasiswa",
    status: "Agenda Resmi",
    isOpen: false,
  },
];

function formatDisplayDate(dateString?: string | null): string {
  if (!dateString) return "Terbaru";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

function getCategoryBadgeClass(category: ArticleCategory): string {
  switch (category) {
    case "jurnal":
      return styles.badgeJurnal;
    case "kajian":
      return styles.badgeKajian;
    case "achievement":
      return styles.badgeAchievement;
    case "beasiswa":
      return styles.badgeBeasiswa;
    default:
      return styles.badgeJurnal;
  }
}

interface Props {
  searchParams: { category?: string };
}

export default async function ArticlesPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ArticleCategory | undefined;

  // ── Concurrent Backend API Fetching ────────────────────────────────────────
  // TODO: [Backend Integration] Dynamic Article & Achievement Sync
  // 1. Endpoint /api/v1/articles/ mendukung filter ?category= dan ?limit=.
  // 2. Endpoint /api/v1/achievements/ mendukung pagination dan pencarian nama mahasiswa.
  // 3. Admin dapat mengelola artikel berita, jurnal, kajian ilmiah via Django Admin.
  const [sections, articles, achievements] = await Promise.all([
    fetchSections("articles").catch(() => []),
    fetchArticles(activeCategory).catch(() => []),
    fetchAchievements(6).catch(() => []),
  ]);

  // Use backend articles if available; otherwise filter curated fallback data
  const displayArticles =
    articles.length > 0
      ? articles
      : FALLBACK_ARTICLES.filter(
        (article) => !activeCategory || article.category === activeCategory
      );

  const displayAchievements =
    achievements.length > 0 ? achievements : FALLBACK_ACHIEVEMENTS;

  return (
    <div className={styles.pageWrapper}>
      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      {isSectionVisible(sections, "hero") && (
        <section className={styles.heroContainer}>
          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Publikasi &amp; Wawasan • SISO
            </div>

            <h1 className={styles.heroTitle}>
              Insights, Research, and{" "}
              <span className={styles.heroTitleHighlight}>
                Student Advocacy
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Pusat publikasi resmi, rilis berita kelembagaan, hasil kajian riset R&amp;D, serta informasi advokasi dan kanal aspirasi mahasiswa Sekolah STEM Universitas Prasetiya Mulya.
            </p>

            <div className={styles.heroStatsRow}>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Rilis &amp; Publikasi Resmi Organisasi</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Kajian &amp; Riset Terapan RnD</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Advokasi &amp; Aspirasi Mahasiswa STEM</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Pemberdayaan Mahasiswa Berkelanjutan</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. Quick Jump Navigation Bar ────────────────────────────────────── */}
      {isSectionVisible(sections, "quick_nav") && (
        <nav className={styles.navSection} aria-label="Navigasi rubrik artikel dan wawasan">
          <div className="container">
            <div className={styles.navBar}>
              {isSectionVisible(sections, "news") && (
                <a href="#news" className={styles.navChip}>
                  Rilis &amp; Berita SISO
                </a>
              )}
              {isSectionVisible(sections, "publications") && (
                <a href="#publications" className={styles.navChip}>
                  Publikasi Organisasi
                </a>
              )}
              {isSectionVisible(sections, "research") && (
                <a href="#research" className={styles.navChip}>
                  Kajian &amp; Riset R&amp;D
                </a>
              )}
              {isSectionVisible(sections, "scholarships") && (
                <a href="#scholarships" className={styles.navChip}>
                  Info Kemahasiswaan
                </a>
              )}
              {isSectionVisible(sections, "competitions") && (
                <a href="#competitions" className={styles.navChip}>
                  Agenda Kegiatan
                </a>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* ── 3. News & Updates Section ───────────────────────────────────────── */}
      {isSectionVisible(sections, "news") && (
        <section id="news" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Rilis &amp; Berita SISO</span>
            <h2 className={styles.sectionTitle}>Official Releases &amp; Insights</h2>
            <p className={styles.sectionSubtitle}>
              Kumpulan artikel berita kelembagaan, peliputan program kerja, dan artikel wawasan ilmiah dari fungsionaris SISO.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className={styles.filterContainer}>
            <Link
              href="/articles-and-achieve#news"
              className={`${styles.filterTag} ${!activeCategory ? styles.filterTagActive : ""
                }`}
            >
              Semua Berita
            </Link>
            {(
              Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]
            ).map(([key, label]) => (
              <Link
                key={key}
                href={`/articles-and-achieve?category=${key}#news`}
                className={`${styles.filterTag} ${activeCategory === key ? styles.filterTagActive : ""
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {displayArticles.length === 0 ? (
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyStateIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v10a2 2 0 0 1-2 2z" />
                <polyline points="14 4 14 10 20 10" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="13" y2="17" />
              </svg>
              <p className={styles.emptyStateText}>
                Belum ada artikel yang dipublikasikan pada kategori ini.
              </p>
              <Link
                href="/articles-and-achieve#news"
                className={styles.filterTag}
              >
                Tampilkan Semua Kategori
              </Link>
            </div>
          ) : (
            <div className={styles.newsGrid}>
              {displayArticles.map((article) => {
                const coverImage =
                  ARTICLE_DEFAULT_COVERS[article.category] ||
                  ARTICLE_DEFAULT_COVERS.jurnal;
                const badgeClass = getCategoryBadgeClass(article.category);

                return (
                  <article key={article.id} className={styles.newsCard}>
                    <div className={styles.newsThumbWrapper}>
                      <span
                        className={`${styles.newsCategoryBadge} ${badgeClass}`}
                      >
                        {CATEGORY_LABELS[article.category] || article.category}
                      </span>
                      <Image
                        src={coverImage}
                        alt={article.title}
                        fill
                        sizes="(min-width: 1100px) 360px, (min-width: 640px) 50vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.newsBody}>
                      {article.published_at && (
                        <time
                          dateTime={article.published_at}
                          className={styles.newsDate}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {formatDisplayDate(article.published_at)}
                        </time>
                      )}
                      <h3 className={styles.newsTitle}>{article.title}</h3>
                      <p className={styles.newsExcerpt}>
                        {article.body.slice(0, 120)}
                        {article.body.length > 120 ? "..." : ""}
                      </p>
                      <div className={styles.newsBtnRow}>
                        <Link
                          href={`/articles-and-achieve/${article.slug}`}
                          className={styles.newsBtn}
                        >
                          Baca Selengkapnya &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      )}

      {/* ── 4. Student Publications Section ─────────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Student Publications Model
        Tambahkan model `Publication` di backend/content/models.py:
        - title = models.CharField(...)
        - authors = models.CharField(...)
        - abstract = models.TextField(...)
        - file = models.FileField(upload_to="publications/pdf/")
        - badge = models.CharField(...)
        - published_year = models.IntegerField(...)
      */}
      {/* ── 4. Student Publications Section ─────────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Student Publications Model
        Tambahkan model `Publication` di backend/content/models.py:
        - title = models.CharField(...)
        - authors = models.CharField(...)
        - abstract = models.TextField(...)
        - file = models.FileField(upload_to="publications/pdf/")
        - badge = models.CharField(...)
        - published_year = models.IntegerField(...)
      */}
      {isSectionVisible(sections, "publications") && (
        <section id="publications" className={`${styles.section} ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Publikasi &amp; Dokumen</span>
              <h2 className={styles.sectionTitle}>Institutional Publications</h2>
              <p className={styles.sectionSubtitle}>
                Kompilasi dokumen resmi kelembagaan, naskah kajian, dan panduan organisasi SISO yang dapat diakses secara publik.
              </p>
            </div>

            <div className={styles.pubList}>
              {STUDENT_PUBLICATIONS.map((pub, idx) => (
                <div key={pub.title + idx} className={styles.pubCard}>
                  <div className={styles.pubIconWrapper}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="14 2 14 8 20 8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="13"
                        x2="8"
                        y2="13"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="17"
                        x2="8"
                        y2="17"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className={styles.pubBody}>
                    <div className={styles.pubHeaderRow}>
                      <h3 className={styles.pubTitle}>{pub.title}</h3>
                      <span className={styles.pubBadge}>{pub.badge}</span>
                    </div>
                    <p className={styles.pubAuthor}>Oleh: {pub.author}</p>
                    <p className={styles.pubDesc}>{pub.desc}</p>
                    <div className={styles.pubFooter}>
                      <span className={styles.pubFormatTag}>{pub.format}</span>
                      <a
                        href="#download-publication"
                        className={styles.pubDownloadBtn}
                        aria-label={`Unduh ${pub.title}`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Unduh Makalah (PDF)
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Research and Studies Section ─────────────────────────────────── */}
      {isSectionVisible(sections, "research") && (
        <section id="research" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Kajian &amp; Riset R&amp;D</span>
              <h2 className={styles.sectionTitle}>Research &amp; Organizational Development</h2>
              <p className={styles.sectionSubtitle}>
                Kajian strategis dan riset internal divisi Research &amp; Development untuk mendukung perumusan kebijakan dan inovasi program SISO.
              </p>
            </div>

            <div className={styles.researchGrid}>
              {RESEARCH_STUDIES.map((study, idx) => (
                <div key={study.title + idx} className={styles.researchCard}>
                  <div className={styles.researchIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <div className={styles.researchBody}>
                    <span className={styles.researchPill}>{study.field}</span>
                    <h3 className={styles.researchTitle}>{study.title}</h3>
                    <p className={styles.researchDesc}>{study.desc}</p>
                    <Link
                      href={`/articles-and-achieve?category=kajian#news`}
                      className={styles.researchLink}
                    >
                      Eksplorasi Kajian Terkait &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Students Achievements Section (Hall of Fame) ─────────────────── */}
      {/* 
        TODO: [Backend Integration] Achievement Image & Certificate Upload
        Model `Achievement` telah tersedia di backend. Ke depannya dapat ditambahkan:
        - sertifikat URL atau link media berita resmi kompetisi.
        - filter berdasarkan tahun pencapaian dan kategori kompetisi.
      */}
      {isSectionVisible(sections, "achievements") && (
        <section id="achievements" className={`${styles.section} ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Prestasi Mahasiswa</span>
              <h2 className={styles.sectionTitle}>Students Achievements</h2>
              <p className={styles.sectionSubtitle}>
                Apresiasi torehan prestasi, medali, dan penghargaan yang berhasil
                diraub delegasi mahasiswa STEM SISO di tingkat nasional maupun
                internasional.
              </p>
            </div>

            <div className={styles.achieveGrid}>
              {displayAchievements.map((item) => (
                <div key={item.id} className={styles.achieveCard}>
                  <div className={styles.achieveHeader}>
                    <div className={styles.achieveIconWrapper}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                      </svg>
                    </div>
                    <div className={styles.achieveMeta}>
                      <h3 className={styles.achieveName}>{item.student_name}</h3>
                      <span className={styles.achieveDate}>
                        {formatDisplayDate(item.date)}
                      </span>
                    </div>
                  </div>
                  <h4 className={styles.achieveTitle}>{item.title}</h4>
                  <p className={styles.achieveDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. Scholarship Information Section ──────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Scholarship Portal Model
        Tambahkan model `Scholarship` pada Django backend:
        - title = models.CharField(...)
        - provider = models.CharField(...)
        - amount = models.CharField(...)
        - deadline = models.DateField(...)
        - eligibility = models.TextField(...)
        - application_url = models.URLField(...)
      */}
      {isSectionVisible(sections, "scholarships") && (
        <section id="scholarships" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Layanan Kemahasiswaan</span>
              <h2 className={styles.sectionTitle}>Student Advocacy &amp; Support</h2>
              <p className={styles.sectionSubtitle}>
                Informasi beasiswa kampus, bantuan pendanaan kegiatan mahasiswa, serta pendampingan advokasi kesejahteraan STEMians.
              </p>
            </div>

            <div className={styles.infoGrid}>
              {SCHOLARSHIPS_DATA.map((schol, idx) => (
                <div key={schol.title + idx} className={styles.infoCard}>
                  <div className={styles.infoCardTop}>
                    <span
                      className={`${styles.infoCardBadge} ${styles.badgeScholarship}`}
                    >
                      {schol.tag}
                    </span>
                    <h3 className={styles.infoTitle}>{schol.title}</h3>
                  </div>

                  <div className={styles.infoHighlightBox}>
                    <span className={styles.infoHighlightLabel}>Nilai Bantuan</span>
                    <div className={styles.infoHighlightValue}>
                      {schol.amount}
                    </div>
                  </div>

                  <div className={styles.infoList}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Batas Pendaftaran</span>
                      <span className={styles.infoValue}>{schol.deadline}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Kriteria</span>
                      <span className={styles.infoValue}>{schol.eligibility}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Kuota</span>
                      <span className={styles.infoValue}>{schol.quota}</span>
                    </div>
                  </div>

                  <a
                    href="#apply-scholarship"
                    className={styles.infoBtn}
                    aria-label={`Daftar ${schol.title}`}
                  >
                    Informasi Pendaftaran &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Competition Information Section ──────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Competitions Model
        Tambahkan model `Competition` atau perluas integrasi agenda di backend
        agar BPH dapat menambahkan link panduan lomba dan registrasi eksternal.
      */}
      {isSectionVisible(sections, "competitions") && (
        <section id="competitions" className={`${styles.section} ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Agenda Kegiatan</span>
              <h2 className={styles.sectionTitle}>Flagship Student Agendas</h2>
              <p className={styles.sectionSubtitle}>
                Agenda kegiatan unggulan dan forum kemahasiswaan Sekolah STEM yang dapat diikuti oleh seluruh STEMians.
              </p>
            </div>

            <div className={styles.infoGrid}>
              {COMPETITIONS_DATA.map((comp, idx) => (
                <div key={comp.title + idx} className={styles.infoCard}>
                  <div className={styles.infoCardTop}>
                    <span
                      className={`${styles.infoCardBadge} ${styles.badgeCompetition}`}
                    >
                      {comp.level}
                    </span>
                    <h3 className={styles.infoTitle}>{comp.title}</h3>
                  </div>

                  <div className={styles.infoList}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Bidang</span>
                      <span className={styles.infoValue}>{comp.type}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Pelaksanaan</span>
                      <span className={styles.infoValue}>{comp.date}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Status Registrasi</span>
                      <span
                        className={`${styles.statusPill} ${comp.isOpen ? styles.statusOpen : styles.statusUpcoming
                          }`}
                      >
                        <span className={styles.statusDot} />
                        {comp.status}
                      </span>
                    </div>
                  </div>

                  <a
                    href="#competition-guide"
                    className={styles.infoBtn}
                    aria-label={`Lihat panduan ${comp.title}`}
                  >
                    Lihat Buku Panduan &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

