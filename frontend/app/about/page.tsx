import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchOrganization, fetchDivisions, fetchMembers } from "@/lib/api";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About SISO",
  description:
    "Kenali visi, misi, nilai, dan struktur kepengurusan SISO Prasmul — Himpunan Mahasiswa Ilmu Sosial.",
  openGraph: {
    title: "About SISO | SISO Prasmul",
    description: "Visi, misi, nilai, dan struktur kepengurusan SISO Prasmul.",
    locale: "id_ID",
  },
};

export default async function AboutPage() {
  const [org, divisions, members] = await Promise.all([
    fetchOrganization().catch(() => null),
    fetchDivisions().catch(() => []),
    fetchMembers().catch(() => []),
  ]);

  // Extract a few mission points safely. Or default to the Figma ones.
  const rawMission = org?.misi || "";
  const missionPoints = rawMission
    ? rawMission
      .split("\n")
      .map((m: string) => m.replace(/^[-\d.]\s*/, "").trim())
      .filter(Boolean)
    : [
      "Mengembangkan potensi mahasiswa STEM",
      "Menyelenggarakan program akademik dan non-akademik",
      "Menjalin kerja sama dengan industri",
      "Membangun komunitas yang suportif dan inovatif",
    ];

  const defaultValues = [
    { title: "Integrity", text: "Menjunjung tinggi nilai kejujuran." },
    { title: "Innovation", text: "Terus berkreasi dan berinovasi." },
    { title: "Excellence", text: "Memberikan hasil yang terbaik." },
  ];

  const valuesData =
    org?.nilai && org.nilai.length > 0
      ? org.nilai.map((v) => ({ title: v, text: "" }))
      : defaultValues;

  const philosophyText =
    org?.filosofi_logo ||
    "SISO (STEM Prasetiya Mulya Innovation Student Organization) merepresentasikan semangat kolaborasi...";

  const philosophyPoints = philosophyText.split("\n\n").filter(Boolean);
  if (philosophyPoints.length === 0) philosophyPoints.push("Logo Philosophy");

  return (
    <>
      {/* ── 1. Hero Section ── */}
      <section className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div>
            <h1 className={styles.heroTitle}>ABOUT SISO</h1>
            <p className={styles.heroSubtitle}>
              SISO (STEM Prasetiya Mulya Innovation Student Organization)
              merupakan organisasi mahasiswa di bawah naungan Sekolah STEM
              Universitas Prasetiya Mulya yang menjadi wadah bagi seluruh
              mahasiswa STEM untuk berkembang, berkolaborasi, dan berkontribusi
              melalui berbagai kegiatan akademik maupun non-akademik.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>99</p>
                <p className={styles.statLabel}>Program Kerja</p>
              </div>
              <div className={styles.statIconWrapper}>
                {/* SVG placeholder */}
                <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: "50%", opacity: 0.2 }}></div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>10+</p>
                <p className={styles.statLabel}>Divisi</p>
              </div>
              <div className={styles.statIconWrapper}>
                <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: "50%", opacity: 0.2 }}></div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>300+</p>
                <p className={styles.statLabel}>Anggota</p>
              </div>
              <div className={styles.statIconWrapper}>
                <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: "50%", opacity: 0.2 }}></div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div>
                <p className={styles.statNumber}>50+</p>
                <p className={styles.statLabel}>Mitra</p>
              </div>
              <div className={styles.statIconWrapper}>
                <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: "50%", opacity: 0.2 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Vision & Mission ── */}
      <section className={styles.visionMissionSection}>
        <div className={styles.sectionTitleContainer}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCentered}`}>
            VISION & MISSION
          </h2>
        </div>
        <div className={styles.visionMissionContent}>
          <div className={styles.visionCard}>
            <h3 className={styles.visionTitle}>OUR VISION</h3>
            <p className={styles.visionText}>
              {org?.visi ||
                "Menjadi organisasi mahasiswa STEM yang inovatif, kolaboratif, dan berdampak positif bagi mahasiswa maupun masyarakat."}
            </p>
          </div>
          <div className={styles.missionContainer}>
            <div className={styles.missionHeader}>
              <h3 className={styles.missionHeaderTitle}>OUR MISSION</h3>
            </div>
            <div className={styles.missionGrid}>
              {missionPoints.slice(0, 4).map((point, i) => (
                <div key={i} className={styles.missionCard}>
                  <p className={styles.missionText}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Organizational Values ── */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionTitleContainer}>
          <h2 className={styles.sectionTitle}>ORGANIZATIONAL VALUES</h2>
        </div>
        <div className={styles.valuesGrid}>
          {valuesData.slice(0, 3).map((val, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                {/* SVG placeholder */}
              </div>
              <h3 className={styles.valueTitle}>{val.title}</h3>
              {val.text && <p className={styles.valueText}>{val.text}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Logo Philosophy ── */}
      <section className={styles.philosophySection}>
        <div className={styles.sectionTitleContainer}>
          <h2 className={styles.sectionTitle}>LOGO PHILOSOPHY</h2>
        </div>
        <div className={styles.philosophyContent}>
          <div className={styles.philosophyImageWrapper}>
            {org?.logo ? (
              <Image src={org.logo} alt="Logo SISO" fill style={{ objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: "#d9d9d9" }}></div>
            )}
          </div>
          <div className={styles.philosophyCards}>
            {philosophyPoints.slice(0, 3).map((pt, i) => (
              <div key={i} className={styles.philosophyCard}>
                <h3 className={styles.philosophyCardTitle}>Meaning {i + 1}</h3>
                <p className={styles.philosophyCardText}>{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Organizational Structure ── */}
      <section className={styles.structureSection}>
        <div className={styles.sectionTitleContainer}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCentered}`}>
            ORGANIZATIONAL STRUCTURE
          </h2>
        </div>
        <div className={styles.structureContent}>
          {/* Main Card (Ketua/Wakil) */}
          <div className={styles.structureMainCard}>
            {members[0]?.photo && (
              <Image src={members[0].photo} alt={members[0].name} fill className={styles.structureCardImage} />
            )}
            <h3 className={styles.structureCardTitle}>Badan Pengurus Harian</h3>
            <p className={styles.structureCardText}>
              {members[0]?.name || "Lorem ipsum dolor sit amet"}
              <br />
              {members[0]?.role || "Ketua Himpunan"}
            </p>
          </div>

          <div className={styles.structureGrid}>
            {members.slice(1, 5).map((member, i) => (
              <div key={i} className={styles.structureGridCard}>
                {member.photo && (
                  <Image src={member.photo} alt={member.name} fill className={styles.structureCardImage} />
                )}
                <h3 className={styles.structureCardTitleSmall}>{member.role}</h3>
                <p className={styles.structureCardText}>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Open Recruitment / Join SISO ── */}
      <section className={styles.recruitmentSection}>
        <div className={styles.recruitmentCard}>
          <div className={styles.recruitmentBadge}>
            <span className={styles.recruitmentBadgePulse} />
            Open Recruitment
          </div>
          <h2 className={styles.recruitmentTitle}>
            Ready to Create Impact with SISO?
          </h2>
          <p className={styles.recruitmentDesc}>
            Bergabunglah dengan keluarga besar STEM Prasetiya Mulya Innovation Student Organization. Kembangkan potensi kepemimpinanmu, perluas relasi, dan berkolaborasi dalam berbagai proyek inovatif.
          </p>
          <div className={styles.recruitmentActions}>
            <Link href="/join-siso" className={styles.recruitmentBtnPrimary}>
              <span>Daftar Sekarang</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
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
      </section>
    </>
  );
}
