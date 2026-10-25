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
  title: "Articles & Achievements | SISO Prasmul",
  description:
    "Pusat publikasi ilmiah, artikel kajian teknologi, informasi beasiswa, serta rekam jejak prestasi mahasiswa STEM Universitas Prasetiya Mulya.",
  openGraph: {
    title: "Articles & Achievements | SISO Prasmul",
    description: "Kumpulan artikel riset, kabar capaian prestasi, dan peluang beasiswa mahasiswa STEM SISO Prasmul.",
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
    title: "6 Inovasi Game Changer Mahasiswa STEM Prasetiya Mulya",
    slug: "enam-inovasi-game-changer-mahasiswa-stem-prasetiya-mulya",
    body: "Ulasan mendalam 6 proyek aplikatif mahasiswa School of STEM Prasetiya Mulya: mulai dari Trash Sea untuk pembersihan sampah laut, aplikasi edukasi iMoonApp, alat deteksi diabetes non-invasif, hingga formulasi pangan fungsional berkelanjutan.",
    category: "kajian",
    published_at: "2026-03-15T09:00:00Z",
    is_visible: true,
  },
  {
    id: 2,
    title: "Mengintegrasikan Life Cycle Analysis dalam Inovasi Desain Produk",
    slug: "mengintegrasikan-life-cycle-analysis-inovasi-desain-produk",
    body: "Kajian komprehensif mengenai penerapan metodologi Life Cycle Analysis (LCA) bagi mahasiswa Product Design Innovation dan Renewable Energy Engineering guna memvalidasi jejak karbon dan sirkularitas material.",
    category: "jurnal",
    published_at: "2026-04-10T14:30:00Z",
    is_visible: true,
  },
  {
    id: 3,
    title: "Mahasiswa STEM Sabet Juara 1 StudentsxCEOs 13th Grand Summit",
    slug: "prestasi-juara-1-studentsxceos-grand-summit",
    body: "Merrilyn Pauliusman dari program studi Product Design Innovation mengharumkan almamater dengan memenangkan kompetisi business case tingkat nasional.",
    category: "achievement",
    published_at: "2024-05-20T10:00:00Z",
    is_visible: true,
  },
  {
    id: 4,
    title: "Tim ABC Food Business Technology Raih Juara 2 PepsiCo PEP Pitch",
    slug: "tim-abc-fbt-juara-2-pepsico-pep-pitch",
    body: "Inovasi produk pangan fungsional berkelanjutan karya Aaron, Bill, dan Cherie berhasil memikat dewan juri industri internasional.",
    category: "achievement",
    published_at: "2024-11-25T11:00:00Z",
    is_visible: true,
  },
  {
    id: 5,
    title: "Panduan Seleksi Beasiswa Technopreneur STEM Prasmul 2026",
    slug: "panduan-beasiswa-technopreneur-stem-prasmul",
    body: "Informasi lengkap persyaratan, berkas proposal portofolio inovasi, dan timeline wawancara beasiswa penuh/parsial School of STEM Universitas Prasetiya Mulya.",
    category: "beasiswa",
    published_at: "2026-05-01T08:00:00Z",
    is_visible: true,
  },
  {
    id: 6,
    title: "Sosialisasi Program Beasiswa Bakti Prestasi Unggulan & Tech-Law Grant",
    slug: "beasiswa-bakti-prestasi-tech-law-grant",
    body: "Peluang bantuan dana studi dan hibah riset lintas disiplin teknologi, hukum, dan etika kecerdasan buatan bagi mahasiswa aktif STEM.",
    category: "beasiswa",
    published_at: "2026-05-10T13:00:00Z",
    is_visible: true,
  },
];

const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    student_name: "Merrilyn Pauliusman (Product Design Innovation)",
    title: "Juara 1 StudentsxCEOs 13th Grand Summit (National Business Case Competition)",
    description: "Meraih Juara 1 tingkat nasional dalam kompetisi business case bergengsi dengan solusi inovasi desain produk berkelanjutan.",
    date: "2024-05-18",
    image: null,
  },
  {
    id: 2,
    student_name: "Tim ABC (Aaron, Bill, Cherie - Food Business Technology)",
    title: "Juara 2 PepsiCo PEP Pitch Competition",
    description: "Menciptakan inovasi produk pangan berkelanjutan bernilai gizi tinggi dan ramah lingkungan.",
    date: "2024-11-20",
    image: null,
  },
  {
    id: 3,
    student_name: "Tim Mahasiswa STEM Prasmul",
    title: "Juara 1 CODIG 2.0 (Developing Sustainable Smart Society)",
    description: "Mengembangkan inovasi Trash Sea untuk mengentaskan persoalan sampah laut berbasis teknologi cerdas.",
    date: "2023-10-15",
    image: null,
  },
  {
    id: 4,
    student_name: "Tim iMoonApp (S1 STEM Prasetiya Mulya)",
    title: "Pemenang FNWMU Universitas Udayana (Kategori Poster)",
    description: "Menggagas poster inovasi aplikasi iMoonApp untuk monitoring dan edukasi interaktif kesehatan reproduksi.",
    date: "2023-09-22",
    image: null,
  },
  {
    id: 5,
    student_name: "Avril & Ferdinand (School of STEM Prasetiya Mulya)",
    title: "Awardee IISMA (Indonesian International Student Mobility Awards)",
    description: "Terpilih sebagai penerima beasiswa mobilitas internasional ke universitas mitra terkemuka di luar negeri.",
    date: "2023-08-01",
    image: null,
  },
];

const STUDENT_PUBLICATIONS = [
  {
    title: "Optimizing Campus Network Infrastructure Through Edge-Caching",
    author: "Ricky A., Farhan M. (Divisi Jaringan & Infrastruktur SISO)",
    desc: "Analisis performa node lalu lintas jaringan kampus berkecepatan tinggi menggunakan algoritma predictive caching terdistribusi untuk mengurangi latensi transmisi hingga 42%.",
    badge: "Whitepaper",
    format: "PDF • 24 Halaman",
    year: "2026",
  },
  {
    title: "Machine Learning in Academic Advising: Predictive Pathways",
    author: "SISO AI & Data Science Research Group",
    desc: "Pemodelan prediktif berbasis deep neural network untuk mendeteksi dini hambatan studi mahasiswa dan memberikan rekomendasi kurikulum yang dipersonalisasi.",
    badge: "Student Research Paper",
    format: "PDF • 18 Halaman",
    year: "2026",
  },
  {
    title: "Decentralized Credential Verification Protocol for Academic Records",
    author: "Inovator Blockchain STEM Prasetiya Mulya",
    desc: "Rancangan smart contract dan arsitektur ledger privat untuk verifikasi ijazah serta transkrip digital yang anti pemalsuan dan dapat diaudit secara instan.",
    badge: "Technical Report",
    format: "PDF • 16 Halaman",
    year: "2025",
  },
];

const RESEARCH_STUDIES = [
  {
    title: "The Role of Student Innovation Labs in Technology Commercialization",
    desc: "Kajian komparatif efektivitas inkubasi proyek laboratorium mahasiswa menuju hilirisasi produk startup teknologi bernilai tambah tinggi.",
    field: "Technopreneurship",
  },
  {
    title: "Urban Sustainability & Smart Sensor Grid in Southeast Asian Metropolises",
    desc: "Eksplorasi sensor jaringan cuaca mikro dan integrasi data pemantauan emisi karbon lingkungan perkotaan secara real-time.",
    field: "Smart City & IoT",
  },
  {
    title: "Mental Health Support Patterns & Stress Resilience in STEM Students",
    desc: "Analisis kualitatif dan kuantitatif mengenai efektivitas sistem peer-mentoring dan beban kurikulum komputasi modern.",
    field: "Academic Well-being",
  },
  {
    title: "Zero-Knowledge Proofs for Privacy-Preserving Student Data Governance",
    desc: "Penerapan skema kriptografi modern untuk validasi identitas dan otentikasi data mahasiswa tanpa membocorkan informasi privat.",
    field: "Cyber Security",
  },
];

const SCHOLARSHIPS_DATA = [
  {
    title: "Beasiswa Technopreneur STEM Prasmul",
    amount: "Bantuan Biaya Kuliah Penuh & Parsial",
    deadline: "30 Juli 2026",
    eligibility: "Mahasiswa berjiwa inovator teknologi & bisnis di 6 Prodi STEM",
    quota: "20 Kuota",
    tag: "Beasiswa Unggulan",
  },
  {
    title: "Beasiswa Bakti Prestasi Unggulan",
    amount: "Dana Studi & Pengembangan Prestasi",
    deadline: "15 Agustus 2026",
    eligibility: "Peraih medali olimpiade sains, kompetisi riset & teknologi, IPK ≥ 3.50",
    quota: "15 Kuota",
    tag: "Apresiasi Prestasi",
  },
  {
    title: "Tech & Law Dual-Competency Grant",
    amount: "Hibah Riset Rp 20.000.000 / Tim",
    deadline: "30 September 2026",
    eligibility: "Proyek kolaboratif etika AI, regulasi siber, & perlindungan data",
    quota: "5 Tim Riset",
    tag: "Hibah Riset",
  },
];

const COMPETITIONS_DATA = [
  {
    title: "STEM INC (STEM Innovation & National Competition) 2026",
    type: "Business Case & STEM Ideation Challenge",
    date: "14 – 16 Agustus 2026",
    level: "Nasional",
    status: "Registrasi Dibuka",
    isOpen: true,
  },
  {
    title: "InnoFair Prototype Exhibition & Pitching Day 2026",
    type: "Pameran Prototipe & Seleksi Pendanaan Industri",
    date: "18 Juni 2026",
    level: "Universitas & Industri Mitra",
    status: "Registrasi Dibuka",
    isOpen: true,
  },
  {
    title: "The Genius Math League & Data Competition",
    type: "Penalaran Matematika Bisnis & Analisis Data Komputasi",
    date: "Oktober 2026",
    level: "Nasional",
    status: "Segera Hadir",
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
              Karya &amp; Prestasi • SISO
            </div>

            <h1 className={styles.heroTitle}>
              Empowering Minds,{" "}
              <span className={styles.heroTitleHighlight}>
                Celebrating Achievements
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Pusat publikasi inovasi teknologi, kajian keberlanjutan industri, informasi beasiswa School of STEM, serta deretan prestasi nasional dan internasional mahasiswa STEM Universitas Prasetiya Mulya.
            </p>

            <div className={styles.heroStatsRow}>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>6 Prodi Inovatif S1 STEM</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Prestasi Nasional &amp; Global</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Beasiswa Technopreneur &amp; Bakti Prestasi</span>
              </div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatDot} />
                <span>Sinergi Riset &amp; STEMpreneur</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. Quick Jump Navigation Bar ────────────────────────────────────── */}
      {isSectionVisible(sections, "quick_nav") && (
        <nav className={styles.navSection} aria-label="Navigasi rubrik artikel dan prestasi">
          <div className="container">
            <div className={styles.navBar}>
              {isSectionVisible(sections, "news") && (
                <a href="#news" className={styles.navChip}>
                  Berita &amp; Artikel
                </a>
              )}
              {isSectionVisible(sections, "publications") && (
                <a href="#publications" className={styles.navChip}>
                  Publikasi Mahasiswa
                </a>
              )}
              {isSectionVisible(sections, "research") && (
                <a href="#research" className={styles.navChip}>
                  Kajian &amp; Riset
                </a>
              )}
              {isSectionVisible(sections, "achievements") && (
                <a href="#achievements" className={styles.navChip}>
                  Prestasi Mahasiswa
                </a>
              )}
              {isSectionVisible(sections, "scholarships") && (
                <a href="#scholarships" className={styles.navChip}>
                  Info Beasiswa
                </a>
              )}
              {isSectionVisible(sections, "competitions") && (
                <a href="#competitions" className={styles.navChip}>
                  Agenda Kompetisi
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
            <span className={styles.sectionBadge}>Publikasi &amp; Berita</span>
            <h2 className={styles.sectionTitle}>News &amp; Updates</h2>
            <p className={styles.sectionSubtitle}>
              Kumpulan artikel editorial, kabar riset, catatan prestasi, dan
              pengumuman penting dari civitas akademika SISO.
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
      {isSectionVisible(sections, "publications") && (
        <section id="publications" className={`${styles.section} ${styles.altBg}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Karya Tulis Ilmiah</span>
              <h2 className={styles.sectionTitle}>Student Publications</h2>
              <p className={styles.sectionSubtitle}>
                Makalah teknis, whitepaper, dan laporan riset independen karya
                civitas akademika mahasiswa STEM SISO yang siap diunduh.
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
              <span className={styles.sectionBadge}>Eksplorasi &amp; Analisis</span>
              <h2 className={styles.sectionTitle}>Research and Studies</h2>
              <p className={styles.sectionSubtitle}>
                Kajian mendalam mengenai arah kemajuan sains terapan, kecerdasan
                buatan, ketahanan siber, dan dinamika kemahasiswaan STEM.
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
              <span className={styles.sectionBadge}>Bantuan &amp; Pendanaan</span>
              <h2 className={styles.sectionTitle}>Scholarship Information</h2>
              <p className={styles.sectionSubtitle}>
                Peluang beasiswa akademik, bantuan riset inovasi, dan kemitraan
                industri yang dapat diakses oleh seluruh mahasiswa STEM.
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
              <span className={styles.sectionBadge}>Agenda Perlombaan</span>
              <h2 className={styles.sectionTitle}>Competition Information</h2>
              <p className={styles.sectionSubtitle}>
                Jadwal kompetisi nasional dan internasional yang direkomendasikan
                oleh SISO untuk mengasah keahlian teknis mahasiswa.
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

