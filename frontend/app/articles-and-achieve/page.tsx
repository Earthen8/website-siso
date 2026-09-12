import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchArticles, fetchAchievements } from "@/lib/api";
import type { Article, ArticleCategory, Achievement } from "@/lib/types";
import styles from "./page.module.css";

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
    title: "Penerapan Generative AI dalam Akselerasi Riset Akademik STEM",
    slug: "penerapan-generative-ai-riset-stem",
    body: "Eksplorasi penggunaan Large Language Models dan automated pipeline data synthesis untuk mempercepat proses literatur review serta formulasi hipotesis eksperimental pada laboratorium sains rekayasa.",
    category: "jurnal",
    published_at: "2026-09-08T09:00:00Z",
    is_visible: true,
  },
  {
    id: 2,
    title: "Kajian Komprehensif: Optimalisasi Smart Grid pada Infrastruktur Kampus Hijau",
    slug: "kajian-optimalisasi-smart-grid-kampus-hijau",
    body: "Studi kelayakan teknis penerapan jaringan microgrid terdistribusi dengan integrasi panel surya cerdas dan baterai penyimpanan energi pada lingkungan universitas masa depan.",
    category: "kajian",
    published_at: "2026-08-25T14:30:00Z",
    is_visible: true,
  },
  {
    id: 3,
    title: "Delegasi Mahasiswa SISO Raih Juara 1 di National Hackathon & IoT Summit 2026",
    slug: "siso-juara-1-national-hackathon-2026",
    body: "Inovasi prototipe peringatan dini banjir berbasis sensor LoRaWAN dan computer vision karya tim kolaborasi mahasiswa Informatika & Rekayasa Sistem berhasil meraih penghargaan utama nasional.",
    category: "achievement",
    published_at: "2026-08-10T10:00:00Z",
    is_visible: true,
  },
  {
    id: 4,
    title: "Panduan Lengkap Pendaftaran Beasiswa Riset & Inovasi Teknologi 2026",
    slug: "panduan-beasiswa-riset-inovasi-teknologi-2026",
    body: "Informasi alur seleksi, kelengkapan berkas esai gagasan, serta kriteria evaluasi program beasiswa riset terapan kemitraan industri untuk mahasiswa semester ganjil.",
    category: "beasiswa",
    published_at: "2026-07-28T08:00:00Z",
    is_visible: true,
  },
  {
    id: 5,
    title: "Analisis Kebutuhan Talenta Software Engineering & AI di Industri Indonesia",
    slug: "analisis-kebutuhan-talenta-ai-indonesia",
    body: "Laporan survei divisi riset SISO terhadap tren kompetensi digital yang paling dicari perusahaan teknologi terkemuka sepanjang tahun 2025–2026.",
    category: "kajian",
    published_at: "2026-07-15T11:20:00Z",
    is_visible: true,
  },
  {
    id: 6,
    title: "Eksplorasi Algoritma Quantum Annealing untuk Optimasi Rantai Pasok",
    slug: "eksplorasi-quantum-annealing-rantai-pasok",
    body: "Makalah pemodelan komputasi kuantum dalam menyelesaikan permasalahan traveling salesperson dan efisiensi logistik terdistribusi skala metropolitan.",
    category: "jurnal",
    published_at: "2026-06-30T16:00:00Z",
    is_visible: true,
  },
];

const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    student_name: "Aditya Pratama & Tim",
    title: "Juara 1 - National AI Hackathon Indonesia 2026",
    description: "Merancang sistem deteksi anomali transmisi listrik berbasis edge intelligence dengan akurasi 98.4%.",
    date: "2026-08-12",
    image: null,
  },
  {
    id: 2,
    student_name: "Maria Clarissa",
    title: "Best Paper Award - IEEE Student Conference 2026",
    description: "Publikasi penelitian optimasi routing protokol nirkabel berdaya rendah untuk smart agriculture.",
    date: "2026-07-24",
    image: null,
  },
  {
    id: 3,
    student_name: "Hassan Wirayuda",
    title: "Champion UI/UX - ASEAN Tech DesignFest 2026",
    description: "Desain sistem aplikasi kesehatan inklusif bagi penyandang disabilitas berbasis voice command.",
    date: "2026-06-18",
    image: null,
  },
  {
    id: 4,
    student_name: "Jonathan Kevin & Nathan",
    title: "Top 3 Finalist - International Cyber Security CTF",
    description: "Berhasil menyelesaikan tantangan reverse engineering dan kriptografi dalam kompetisi internasional 24 jam.",
    date: "2026-05-30",
    image: null,
  },
  {
    id: 5,
    student_name: "Sarah Michelle",
    title: "Gold Medal - National STEM Innovation Award",
    description: "Inovasi filter air mikroplastik berbasis nanomaterial biodegradable untuk ekosistem pesisir.",
    date: "2026-04-15",
    image: null,
  },
  {
    id: 6,
    student_name: "David Tandean",
    title: "Outstanding Student Innovator 2026",
    description: "Penghargaan atas kontribusi aktif memimpin pengembangan software open source kemahasiswaan.",
    date: "2026-03-20",
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
    title: "SISO STEM Excellence Scholarship",
    amount: "Rp 15.000.000 / semester",
    deadline: "15 Oktober 2026",
    eligibility: "Mahasiswa STEM Aktif, IPK ≥ 3.50",
    quota: "20 Penerima",
    tag: "Beasiswa Internal",
  },
  {
    title: "Corporate Tech Partner Innovation Grant",
    amount: "Rp 25.000.000 + Mentorship",
    deadline: "30 November 2026",
    eligibility: "Tim Proyek Akhir / Capstone AI & Robotika",
    quota: "5 Tim Riset",
    tag: "Hibah Industri",
  },
  {
    title: "Government National Merit Award",
    amount: "Rp 12.000.000 / semester",
    deadline: "20 Desember 2026",
    eligibility: "Mahasiswa Berprestasi Nasional, IPK ≥ 3.30",
    quota: "15 Penerima",
    tag: "Beasiswa Prestasi",
  },
];

const COMPETITIONS_DATA = [
  {
    title: "National Student Hackathon & Techfest 2026",
    type: "Rekayasa Perangkat Lunak & AI",
    date: "14 – 16 November 2026",
    level: "Nasional",
    status: "Registrasi Dibuka",
    isOpen: true,
  },
  {
    title: "ASEAN Business Case & Tech Ideation Challenge",
    type: "Teknologi & Manajemen Bisnis",
    date: "5 – 7 Desember 2026",
    level: "Regional ASEAN",
    status: "Registrasi Dibuka",
    isOpen: true,
  },
  {
    title: "IEEE Indonesian Scientific Paper Contest",
    type: "Riset Sains & Makalah Ilmiah",
    date: "Januari 2027",
    level: "Nasional",
    status: "Akan Datang",
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
  const [articles, achievements] = await Promise.all([
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
            Wawasan &amp; Prestasi • SISO Prasmul
          </div>

          <h1 className={styles.heroTitle}>
            Empowering Minds,{" "}
            <span className={styles.heroTitleHighlight}>
              Celebrating Milestones
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            Pusat publikasi ilmiah, artikel kajian teknologi, informasi beasiswa,
            serta rekam jejak prestasi mahasiswa STEM Universitas Prasetiya
            Mulya dalam berkarya dan berinovasi untuk bangsa.
          </p>

          <div className={styles.heroStatsRow}>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatDot} />
              <span>25+ Artikel &amp; Publikasi</span>
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatDot} />
              <span>18+ Prestasi Mahasiswa</span>
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatDot} />
              <span>Peluang Beasiswa &amp; Hibah</span>
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatDot} />
              <span>Terbuka untuk Civitas STEM</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Quick Jump Navigation Bar ────────────────────────────────────── */}
      <nav className={styles.navSection} aria-label="Navigasi rubrik artikel dan prestasi">
        <div className="container">
          <div className={styles.navBar}>
            <a href="#news" className={styles.navChip}>
              Berita &amp; Artikel
            </a>
            <a href="#publications" className={styles.navChip}>
              Publikasi Mahasiswa
            </a>
            <a href="#research" className={styles.navChip}>
              Kajian &amp; Riset
            </a>
            <a href="#achievements" className={styles.navChip}>
              Prestasi Mahasiswa
            </a>
            <a href="#scholarships" className={styles.navChip}>
              Info Beasiswa
            </a>
            <a href="#competitions" className={styles.navChip}>
              Agenda Kompetisi
            </a>
          </div>
        </div>
      </nav>

      {/* ── 3. News & Updates Section ───────────────────────────────────────── */}
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

      {/* ── 5. Research and Studies Section ─────────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Research & Study Papers
        Dapat disinkronisasikan otomatis dengan artikel bertipe `kajian` atau
        membuat endpoint spesifik `/api/v1/research-studies/` untuk melampirkan metodologi & dataset.
      */}
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

      {/* ── 6. Students Achievements Section (Hall of Fame) ─────────────────── */}
      {/* 
        TODO: [Backend Integration] Achievement Image & Certificate Upload
        Model `Achievement` telah tersedia di backend. Ke depannya dapat ditambahkan:
        - sertifikat URL atau link media berita resmi kompetisi.
        - filter berdasarkan tahun pencapaian dan kategori kompetisi.
      */}
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

      {/* ── 8. Competition Information Section ──────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Competitions Model
        Tambahkan model `Competition` atau perluas integrasi agenda di backend
        agar BPH dapat menambahkan link panduan lomba dan registrasi eksternal.
      */}
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
    </div>
  );
}
