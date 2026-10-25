import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  fetchOrganization,
  fetchDivisions,
  fetchMembers,
  fetchSections,
  type BPHMember,
  type Section,
} from "@/lib/api";
import styles from "./page.module.css";
import OrgStructure from "./OrgStructure";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About SISO | SISO Prasmul",
  description:
    "Profil resmi kelembagaan, Anggaran Dasar/Anggaran Rumah Tangga (AD/ART), 6 nilai dasar, filosofi lambang, serta tata kelola organisasi SISO Prasmul.",
  openGraph: {
    title: "About SISO — STEM Prasetiya Mulya Innovation Student Organization",
    description:
      "Profil resmi kelembagaan, Anggaran Dasar/Anggaran Rumah Tangga (AD/ART), 6 nilai dasar, filosofi lambang, serta tata kelola organisasi SISO Prasmul.",
    locale: "id_ID",
    type: "website",
  },
};

// ── Default Fallbacks ────────────────────────────────────────────────────────
const FALLBACK_MISSION_POINTS = [
  "Menempatkan kedaulatan dan aspirasi mahasiswa STEM sebagai dasar utama pengambilan keputusan organisasi.",
  "Menjalankan program kerja secara partisipatif, transparan, akuntabel, dan berbasis data (evidence-based).",
  "Menjadi representasi resmi mahasiswa STEM dalam hubungan kelembagaan dengan universitas dan pihak eksternal.",
  "Menjamin kesinambungan organisasi melalui sistem kaderisasi, dokumentasi, dan transfer pengetahuan.",
];

const DEFAULT_ORGANIZATIONAL_VALUES = [
  {
    title: "Caring & Humility",
    text: "Memiliki kepekaan tinggi terhadap aspirasi sesama mahasiswa dan lingkungan, disertai kerendahan hati untuk menghargai masukan serta perubahan.",
  },
  {
    title: "Achieving",
    text: "Mendayagunakan seluruh potensi secara optimal untuk mencapai standar kualitas kerja terbaik dan berorientasi pada penciptaan kontribusi nyata.",
  },
  {
    title: "Integrity & Inclusive",
    text: "Menjaga keselarasan perkataan dan tindakan secara jujur dan bertanggung jawab, serta menjamin perlakuan setara tanpa diskriminasi (non-discrimination).",
  },
  {
    title: "Innovation",
    text: "Berani menciptakan, mengembangkan, dan menerapkan gagasan atau solusi baru berbasis keilmuan dan teknologi dalam menjawab berbagai permasalahan.",
  },
];

const DEFAULT_PHILOSOPHY_POINTS = [
  {
    title: "Burung Phoenix (Kesinambungan & Pembaruan)",
    text: "Melambangkan ketangguhan organisasi dan kesinambungan kelembagaan SISO yang terus beregenerasi, bertumbuh, dan membawa pembaruan positif di setiap periode.",
  },
  {
    title: "Simpul Molekular (Keilmuan & Kolaborasi)",
    text: "Mencerminkan asas keilmuan, pendekatan rasional berbasis data, serta persatuan erat seluruh mahasiswa lintas program studi di bawah naungan SISO.",
  },
  {
    title: "Rentang Sayap Dinamis (Otonomi & Inovasi)",
    text: "Menggambarkan kemandirian, keluwesan adaptasi, dan keberanian fungsionaris SISO dalam melahirkan terobosan program kerja yang berdampak luas.",
  },
  {
    title: "Warna Biru Navy & Putih (Integritas & Transparansi)",
    text: "Biru tua melambangkan kematangan berpikir, profesionalisme, dan wibawa kelembagaan, sedangkan putih mencerminkan transparansi, akuntabilitas, dan ketulusan pengabdian.",
  },
];

const FALLBACK_LEADERS: BPHMember[] = [
  {
    id: 1,
    name: "Chairman (Ketua SISO)",
    photo: null,
    role: "Chairman (Ketua SISO)",
    order: 1,
    generation_year: 2026,
    division: null,
  },
  {
    id: 2,
    name: "Vice / Co-Chairman (Wakil Ketua)",
    photo: null,
    role: "Vice / Co-Chairman (Wakil Ketua)",
    order: 2,
    generation_year: 2026,
    division: null,
  },
  {
    id: 3,
    name: "Secretary (Sekretaris)",
    photo: null,
    role: "Secretary (Sekretaris)",
    order: 3,
    generation_year: 2026,
    division: null,
  },
  {
    id: 4,
    name: "Treasurer (Bendahara)",
    photo: null,
    role: "Treasurer (Bendahara)",
    order: 4,
    generation_year: 2026,
    division: null,
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function isSectionVisible(
  sections: Section[],
  type: string,
  defaultValue = true
): boolean {
  const section = sections.find((s) => s.section_type === type);
  return section ? section.is_visible : defaultValue;
}

export default async function AboutPage() {
  // TODO: [Backend Integration] Dynamic Generation Filtering
  // Endpoint /api/v1/members/?generation=2026 memungkinkan filter tahun kepengurusan.
  // Ke depannya dapat ditambahkan dropdown selector tahun untuk melihat arsip kepengurusan sebelumnya.

  const [sections, org, divisions, members] = await Promise.all([
    fetchSections("about").catch(() => []),
    fetchOrganization().catch(() => null),
    fetchDivisions().catch(() => []),
    fetchMembers().catch(() => []),
  ]);

  // Extract Mission Points
  const rawMission = org?.misi || "";
  const missionPoints = rawMission
    ? rawMission
      .split("\n")
      .map((m: string) => m.trim().replace(/^(?:(?:\d+[.)]|[-*•.])\s*)+/, "").trim())
      .filter(Boolean)
    : FALLBACK_MISSION_POINTS;

  // Organizational Values
  const valuesData =
    org?.nilai && org.nilai.length > 0
      ? org.nilai.map((v) => {
        const match = DEFAULT_ORGANIZATIONAL_VALUES.find(
          (def) => def.title.toLowerCase() === v.toLowerCase()
        );
        return {
          title: v,
          text: match ? match.text : "Nilai fundamental pergerakan mahasiswa STEM SISO Prasmul.",
        };
      })
      : DEFAULT_ORGANIZATIONAL_VALUES;

  // Logo Philosophy
  const rawPhilosophy = org?.filosofi_logo || "";
  const parsedPhilosophyLines = rawPhilosophy
    ? rawPhilosophy
      .split(/\n+/)
      .map((line) => line.trim().replace(/^(?:(?:\d+[.)]|[-*•.])\s*)+/, "").trim())
      .filter(Boolean)
    : [];

  const philosophyItems =
    parsedPhilosophyLines.length > 1
      ? parsedPhilosophyLines.map((line, i) => {
        const match = line.match(/^([^:-]+)[:\-]\s*(.+)$/);
        if (match) {
          return { title: match[1].trim(), text: match[2].trim() };
        }
        return {
          title: DEFAULT_PHILOSOPHY_POINTS[i]?.title || `Pilar Filosofi 0${i + 1}`,
          text: line,
        };
      })
      : DEFAULT_PHILOSOPHY_POINTS;

  // Leadership & Members Grouping
  const activeMembers = members.length > 0 ? members : FALLBACK_LEADERS;

  return (
    <div className={styles.pageWrapper}>
      {/* ── 1. Hero & Stats Section ─────────────────────────────────────────── */}
      {isSectionVisible(sections, "about") && (
        <section className={styles.heroContainer}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Profil Resmi SISO • Est. 2017
          </div>
          <h1 className={styles.heroTitle}>
            Organisasi Kemahasiswaan{" "}
            <span className={styles.heroTitleHighlight}>Tingkat Fakultas Sekolah STEM</span>
          </h1>
          <p className={styles.heroSubtitle}>
            STEM Prasetiya Mulya Innovation Student Organization (SISO) adalah organisasi kemahasiswaan resmi tingkat fakultas di Sekolah STEM Universitas Prasetiya Mulya yang bersifat otonom, demokratis, independen, inklusif, kolaboratif, dan nirlaba dalam mewadahi seluruh mahasiswa aktif STEM (STEMians).
          </p>
        </div>

        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>4</p>
                <p className={styles.statLabel}>Organ Kelembagaan</p>
              </div>
              <div className={styles.statIconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>5</p>
                <p className={styles.statLabel}>Fungsi Operasional</p>
              </div>
              <div className={styles.statIconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="5" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v5M12 13l-5 4M12 13l5 4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>6</p>
                <p className={styles.statLabel}>Nilai Dasar SISO</p>
              </div>
              <div className={styles.statIconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>7</p>
                <p className={styles.statLabel}>Asas Pergerakan</p>
              </div>
              <div className={styles.statIconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        </section>
      )}

      {/* ── 2. Vision & Mission Section ─────────────────────────────────────── */}
      {isSectionVisible(sections, "vision_mission") && (
        <section className={styles.visionMissionSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Landasan Kelembagaan</span>
            <h2 className={styles.sectionTitle}>Institutional Purpose</h2>
            <p className={styles.sectionSubtitle}>
              Landasan konstitusional dan arah gerak SISO dalam AD/ART untuk mengabdi dan memberdayakan seluruh mahasiswa Sekolah STEM Universitas Prasetiya Mulya.
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
                <h3 className={styles.visionTitle}>Our Vision</h3>
                <p className={styles.visionText}>
                  {org?.visi ||
                    "Mewujudkan SISO sebagai organisasi kemahasiswaan tingkat fakultas yang representatif, inklusif, adaptif, berintegritas, dan unggul dalam memfasilitasi aspirasi serta pengembangan potensi mahasiswa Sekolah STEM Universitas Prasetiya Mulya secara berkelanjutan."}
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
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Empat Pilar Misi SISO Prasmul
              </div>
              <div className={styles.missionGrid}>
                {missionPoints.slice(0, 4).map((point, i) => (
                  <div key={i} className={styles.missionCard}>
                    <span className={styles.missionIndex}>0{i + 1}</span>
                    <p className={styles.missionText}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>
      )}

      {/* ── 3. Organizational Values ────────────────────────────────────────── */}
      {isSectionVisible(sections, "values") && (
        <section className={`${styles.valuesSection} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Nilai Dasar Organisasi</span>
            <h2 className={styles.sectionTitle}>6 Fundamental Values</h2>
            <p className={styles.sectionSubtitle}>
              Enam nilai dasar keorganisasian yang menjadi pedoman perilaku, etika pergerakan, dan budaya kerja seluruh fungsionaris SISO Universitas Prasetiya Mulya.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {valuesData.map((val, i) => (
              <div key={val.title + i} className={styles.valueCard}>
                <div className={styles.valueIconWrapper}>
                  {i === 0 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="19" cy="11" r="3" stroke="currentColor" strokeWidth="2" />
                      <path d="M23 21v-2a3 3 0 0 0-3-3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {i > 3 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueText}>{val.text}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      )}

      {/* ── 4. Logo Philosophy ──────────────────────────────────────────────── */}
      {isSectionVisible(sections, "philosophy") && (
        <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Identitas Visual &amp; Makna Lambang</span>
            <h2 className={styles.sectionTitle}>Official Emblem Philosophy</h2>
            <p className={styles.sectionSubtitle}>
              Filosofi lambang resmi SISO yang merepresentasikan sinergi rumpun ilmu STEM, karakter fungsionaris, dan tekad pengabdian berkelanjutan bagi almamater.
            </p>
          </div>

          <div className={styles.philosophyContent}>
            <div className={styles.philosophyLogoWrapper}>
              <Image
                src={org?.logo || "/logo-siso.png"}
                alt="Lambang Resmi SISO Prasmul"
                width={400}
                height={400}
                className={styles.philosophyLogoImg}
                priority
              />
            </div>

            <div className={styles.philosophyCards}>
              {philosophyItems.map((pt, i) => (
                <div key={i} className={styles.philosophyCard}>
                  <span className={styles.philosophyIconBadge}>0{i + 1}</span>
                  <div className={styles.philosophyCardBody}>
                    <h3 className={styles.philosophyCardTitle}>{pt.title}</h3>
                    <p className={styles.philosophyCardText}>{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>
      )}

      {/* ── 5. Organizational Structure ─────────────────────────────────────── */}
      {isSectionVisible(sections, "structure") && (
        <section className={`${styles.structureSection} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tata Kelola &amp; Kelembagaan</span>
            <h2 className={styles.sectionTitle}>Organizational Governance</h2>
            <p className={styles.sectionSubtitle}>
              Struktur kelembagaan berlandaskan AD/ART SISO yang membagi wewenang antara SISO Grand Assembly (SGA), Board of Advisor (BoA), Badan Pengurus Harian (BPH), dan 8 Departemen Fungsional.
            </p>
          </div>

          <OrgStructure members={activeMembers} divisions={divisions} />
        </div>
        </section>
      )}

      {/* ── 6. Open Recruitment / Join SISO ─────────────────────────────────── */}
      {isSectionVisible(sections, "recruitment") && (
        <section className={styles.recruitmentSection}>
          <div className="container">
            <div className={styles.recruitmentCard}>
              <div className={styles.recruitmentBadge}>
                <span className={styles.recruitmentBadgePulse} />
                Regenerasi Fungsionaris
              </div>
              <h2 className={styles.recruitmentTitle}>
                Mari Berkontribusi sebagai Fungsionaris SISO
              </h2>
              <p className={styles.recruitmentDesc}>
                Daftarkan diri Anda dalam proses regenerasi kepengurusan SISO berikutnya. Kembangkan kepemimpinan, bangun relasi lintas program studi, dan berkontribusi nyata bagi mahasiswa Sekolah STEM.
              </p>
              <div className={styles.recruitmentActions}>
                <Link href="/join-siso" className={styles.recruitmentBtnPrimary}>
                  <span>Alur Rekrutmen</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/program-kerja" className={styles.recruitmentBtnSecondary}>
                  Program Kerja SISO
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
