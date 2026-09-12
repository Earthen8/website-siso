import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchOrganization, fetchDivisions, fetchMembers, type BPHMember } from "@/lib/api";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About SISO | SISO Prasmul",
  description:
    "Kenali visi, misi, nilai organisasi, filosofi logo, dan struktur kepengurusan STEM Prasetiya Mulya Innovation Student Organization (SISO).",
  openGraph: {
    title: "About SISO — STEM Prasetiya Mulya Innovation Student Organization",
    description:
      "Visi, misi, nilai organisasi, filosofi logo, dan struktur kepengurusan SISO Prasmul.",
    locale: "id_ID",
    type: "website",
  },
};

// ── Default Fallbacks ────────────────────────────────────────────────────────
const FALLBACK_MISSION_POINTS = [
  "Membangun ekosistem belajar dan riset aplikatif bagi seluruh mahasiswa STEM.",
  "Menyelenggarakan program pengembangan skill terkini yang relevan dengan kebutuhan industri.",
  "Membuka jejaring kemitraan strategis dengan korporasi, alumni, dan komunitas teknologi.",
  "Mewadahi pengembangan kepemimpinan dan soft skills mahasiswa yang adaptif dan inklusif.",
];

const DEFAULT_ORGANIZATIONAL_VALUES = [
  {
    title: "Innovation",
    text: "Mendorong pemikiran kritis dan keberanian menciptakan solusi baru berbasis sains & teknologi.",
  },
  {
    title: "Collaboration",
    text: "Menyatukan beragam disiplin ilmu STEM dalam semangat sinergi dan kerja sama yang inklusif.",
  },
  {
    title: "Integrity",
    text: "Menjunjung etika akademik, profesionalitas, dan tanggung jawab dalam setiap karya dan aksi.",
  },
  {
    title: "Excellence",
    text: "Berkomitmen memberikan standar kualitas tertinggi dalam setiap program dan pencapaian.",
  },
];

const DEFAULT_PHILOSOPHY_POINTS = [
  {
    title: "Sinergi Multidisiplin STEM",
    text: "Menyatukan sains, teknologi, rekayasa, dan matematika menjadi satu kekuatan solutif bagi tantangan masa depan.",
  },
  {
    title: "Dinamika Evolusi & Inovasi",
    text: "Simbol pergerakan mahasiswa yang terus belajar, bereksplorasi, dan adaptif terhadap kemajuan zaman.",
  },
  {
    title: "Dampak Nyata bagi Masyarakat",
    text: "Fokus tidak hanya pada pencapaian akademik di kampus, melainkan manfaat nyata bagi kemajuan Indonesia.",
  },
];

const FALLBACK_LEADERS: BPHMember[] = [
  {
    id: 1,
    name: "Nicholas Nathaniel",
    role: "Ketua Himpunan",
    order: 1,
    generation_year: 2026,
    division: null,
  },
  {
    id: 2,
    name: "Clarissa Stephanie",
    role: "Wakil Ketua Himpunan",
    order: 2,
    generation_year: 2026,
    division: null,
  },
  {
    id: 3,
    name: "Bryan Adrian",
    role: "Sekretaris Umum",
    order: 3,
    generation_year: 2026,
    division: null,
  },
  {
    id: 4,
    name: "Jessica Aurelia",
    role: "Bendahara Umum",
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

export default async function AboutPage() {
  // TODO: [Backend Integration] Dynamic Generation Filtering
  // Endpoint /api/v1/members/?generation=2026 memungkinkan filter tahun kepengurusan.
  // Ke depannya dapat ditambahkan dropdown selector tahun untuk melihat arsip kepengurusan sebelumnya.

  const [org, divisions, members] = await Promise.all([
    fetchOrganization().catch(() => null),
    fetchDivisions().catch(() => []),
    fetchMembers().catch(() => []),
  ]);

  // Extract Mission Points
  const rawMission = org?.misi || "";
  const missionPoints = rawMission
    ? rawMission
        .split("\n")
        .map((m: string) => m.replace(/^[-\d.]\s*/, "").trim())
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
  const philosophyItems = rawPhilosophy
    ? rawPhilosophy.split("\n\n").filter(Boolean).map((pt, i) => ({
        title: DEFAULT_PHILOSOPHY_POINTS[i]?.title || `Filosofi Bagian ${i + 1}`,
        text: pt,
      }))
    : DEFAULT_PHILOSOPHY_POINTS;

  // Leadership & Members Grouping
  const activeMembers = members.length > 0 ? members : FALLBACK_LEADERS;
  const topLeaders = activeMembers.slice(0, 2);
  const otherMembers = activeMembers.slice(2);

  return (
    <div className={styles.pageWrapper}>
      {/* ── 1. Hero & Stats Section ─────────────────────────────────────────── */}
      <section className={styles.heroContainer}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Tentang SISO Prasmul • Est. 2017
          </div>
          <h1 className={styles.heroTitle}>
            Membentuk Inovator STEM{" "}
            <span className={styles.heroTitleHighlight}>Masa Depan</span>
          </h1>
          <p className={styles.heroSubtitle}>
            STEM Prasetiya Mulya Innovation Student Organization (SISO) merupakan
            organisasi kemahasiswaan resmi di bawah naungan Sekolah STEM Universitas Prasetiya
            Mulya yang menjadi motor penggerak riset aplikatif, jejaring industri, dan
            pengembangan talenta sains & teknologi.
          </p>
        </div>

        <div className="container">
          {/* TODO: [Backend Integration] Live counters from /api/v1/organization/stats/ */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>25+</p>
                <p className={styles.statLabel}>Program Kerja</p>
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
                <p className={styles.statNumber}>{divisions.length > 0 ? divisions.length : "4"}</p>
                <p className={styles.statLabel}>Divisi Inti</p>
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
                <p className={styles.statNumber}>50+</p>
                <p className={styles.statLabel}>Pengurus & Anggota</p>
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
                <p className={styles.statNumber}>15+</p>
                <p className={styles.statLabel}>Mitra Industri</p>
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

      {/* ── 2. Vision & Mission Section ─────────────────────────────────────── */}
      <section className={styles.visionMissionSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Landasan Pergerakan</span>
            <h2 className={styles.sectionTitle}>Vision &amp; Mission</h2>
            <p className={styles.sectionSubtitle}>
              Prinsip dan arah tujuan yang membimbing setiap langkah, program, dan kolaborasi SISO.
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
                    "Menjadi episentrum pergerakan mahasiswa STEM yang unggul, inovatif, dan berintegritas dalam menciptakan solusi teknologi yang aplikatif bagi kemajuan bangsa."}
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
                Empat Pilar Misi SISO
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

      {/* ── 3. Organizational Values ────────────────────────────────────────── */}
      <section className={`${styles.valuesSection} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Budaya & Karakter</span>
            <h2 className={styles.sectionTitle}>Organizational Values</h2>
            <p className={styles.sectionSubtitle}>
              Nilai-nilai esensial yang kami tanamkan dalam setiap interaksi, riset, dan inisiatif kemahasiswaan.
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
                </div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueText}>{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Logo Philosophy ──────────────────────────────────────────────── */}
      <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Identitas Visual</span>
            <h2 className={styles.sectionTitle}>Logo Philosophy</h2>
            <p className={styles.sectionSubtitle}>
              Setiap elemen garis, bentuk, dan warna melambangkan identitas dan visi besar pergerakan SISO.
            </p>
          </div>

          <div className={styles.philosophyContent}>
            <div className={styles.philosophyImageCard}>
              <div className={styles.philosophyImageWrapper}>
                <Image
                  src={org?.logo || "/logo-siso.png"}
                  alt="Lambang SISO Prasmul"
                  width={140}
                  height={140}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className={styles.philosophyImageTitle}>SISO Prasmul</p>
              <p className={styles.philosophyImageSub}>Official Identity &amp; Insignia</p>
            </div>

            <div className={styles.philosophyCards}>
              {philosophyItems.map((pt, i) => (
                <div key={i} className={styles.philosophyCard}>
                  <span className={styles.philosophyIconBadge}>0{i + 1}</span>
                  <div>
                    <h3 className={styles.philosophyCardTitle}>{pt.title}</h3>
                    <p className={styles.philosophyCardText}>{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Organizational Structure ─────────────────────────────────────── */}
      {/* 
        TODO: [Backend Integration] Year Filter / Generation Switcher
        Gunakan query param ?generation=XXXX untuk menampilkan susunan kepengurusan tahun lain.
      */}
      <section className={`${styles.structureSection} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Badan Pengurus Harian</span>
            <h2 className={styles.sectionTitle}>Organizational Structure</h2>
            <p className={styles.sectionSubtitle}>
              Susunan kepengurusan Badan Pengurus Harian SISO Periode 2026 yang mengemban amanah kepemimpinan.
            </p>
          </div>

          <div className={styles.structureContainer}>
            {/* Leadership Tier: Ketua & Wakil */}
            <div className={styles.leadershipRow}>
              {topLeaders.map((leader) => (
                <div className={styles.leaderCard} key={leader.id}>
                  <div className={styles.leaderAvatar}>
                    {leader.photo ? (
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span>{getInitials(leader.name)}</span>
                    )}
                  </div>
                  <div>
                    <span className={styles.leaderRoleBadge}>{leader.role}</span>
                    <h3 className={styles.leaderName}>{leader.name}</h3>
                    <p className={styles.leaderGen}>Generasi {leader.generation_year} • BPH Inti</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Officers & Division Heads */}
            {otherMembers.length > 0 && (
              <div className={styles.structureGrid}>
                {otherMembers.map((member) => (
                  <div className={styles.memberCard} key={member.id}>
                    <div className={styles.memberAvatar}>
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span>{getInitials(member.name)}</span>
                      )}
                    </div>
                    <div>
                      <p className={styles.memberRole}>{member.role}</p>
                      <h4 className={styles.memberName}>{member.name}</h4>
                      <p className={styles.memberDivision}>
                        {member.division ? `Divisi ${member.division}` : "Pengurus Harian"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 6. Open Recruitment / Join SISO ─────────────────────────────────── */}
      <section className={styles.recruitmentSection}>
        <div className="container">
          <div className={styles.recruitmentCard}>
            <div className={styles.recruitmentBadge}>
              <span className={styles.recruitmentBadgePulse} />
              Open Recruitment
            </div>
            <h2 className={styles.recruitmentTitle}>
              Ready to Create Impact with SISO?
            </h2>
            <p className={styles.recruitmentDesc}>
              Bergabunglah dengan keluarga besar STEM Prasetiya Mulya Innovation Student Organization.
              Kembangkan potensi kepemimpinanmu, perluas jejaring profesional, dan berkolaborasi
              dalam proyek teknologi yang berdampak nyata.
            </p>
            <div className={styles.recruitmentActions}>
              <Link href="/join-siso" className={styles.recruitmentBtnPrimary}>
                <span>Daftar Sekarang</span>
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
                Lihat Program Kerja
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
