import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchPrograms } from "@/lib/api";
import styles from "./page.module.css";

// You can re-export or define this based on your backend
type ProgramCategory = "event" | "workshop" | "seminar" | "competition" | "pengmas";

const CATEGORY_LABELS: Record<ProgramCategory, { title: string; desc: string }> = {
  event: {
    title: "Event Information",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  workshop: {
    title: "Workshop",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  seminar: {
    title: "Seminar & Talkshows",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  competition: {
    title: "Competition Information",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  pengmas: {
    title: "Community Service",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Program Kerja",
  description: "Daftar program kerja dan kegiatan SISO Prasmul.",
  openGraph: {
    title: "Program Kerja | SISO Prasmul",
    description: "Program kerja, seminar, workshop, dan event dari SISO.",
  },
};

interface Props {
  searchParams: { category?: string };
}

export default async function ProgramKerjaPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ProgramCategory | undefined;
  const programs = await fetchPrograms(activeCategory).catch(() => []);

  return (
    <>
      {/* ── 1. Hero Section ── */}
      <section className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Programs That Shape Innovators</h1>
          <p className={styles.heroSubtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* ── 2. Annual Events ── */}
      <section className={`container ${styles.eventsSection}`}>
        <h2 className={styles.sectionTitle}>ANNUAL EVENTS</h2>
        <div className={styles.eventsContainer}>
          {programs.length > 0 ? (
            programs.map((prog) => (
              <div key={prog.id} className={styles.eventCard}>
                <div className={styles.eventImageWrapper}>
                  {prog.cover_image ? (
                    <Image
                      src={prog.cover_image}
                      alt={prog.title}
                      fill
                      className={styles.eventImage}
                    />
                  ) : (
                    // Static placeholder (Figma light purple)
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#e6d9ff" }}></div>
                  )}
                </div>
                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{prog.title}</h3>
                  <p className={styles.eventMeta}>
                    {prog.location || "Jakarta"}, {prog.date ? new Date(prog.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "10 January 1945"}
                  </p>
                  <p className={styles.eventDesc}>
                    {prog.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                  </p>
                  {prog.registration_url ? (
                    <a href={prog.registration_url} target="_blank" rel="noopener noreferrer" className={styles.eventButton}>
                      Register
                    </a>
                  ) : (
                    <Link href={`/program-kerja/${prog.slug}`} className={styles.eventButton}>
                      Register
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>Tidak ada program kerja yang ditemukan.</p>
          )}
        </div>
      </section>

      {/* ── 3. Calendar Placeholder ── */}
      <section className={`container ${styles.calendarSection}`}>
        <h2 className={styles.sectionTitle}>CALENDAR</h2>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarHeader}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className={styles.calendarDay}>{day}</div>
            ))}
          </div>
          <div className={styles.calendarGrid}>
            {/* Simple static grid representing days in a month (e.g. 5 weeks) */}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px" }}>
                {/* Randomly place a couple of pills for static UI visualization */}
                {i === 8 && <div className={styles.calendarEventPill}>P3RSPECTIVE</div>}
                {i === 24 && <div className={styles.calendarEventPill}>Science Fun Day</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Our Programs (Categories) ── */}
      <section className={`container ${styles.programsSection}`}>
        <h2 className={styles.sectionTitle}>OUR PROGRAMS</h2>
        <div className={styles.programsGrid}>
          {/* Include a reset filter linking to just /program-kerja */}
          <Link href="/program-kerja" className={styles.programCategoryCard} style={{ background: "linear-gradient(to bottom, #777, #333)" }}>
            <h3 className={styles.programCategoryTitle}>All Programs</h3>
            <p className={styles.programCategoryDesc}>Lihat semua program kerja SISO.</p>
          </Link>

          {(Object.entries(CATEGORY_LABELS) as [ProgramCategory, { title: string; desc: string }][]).map(
            ([key, categoryInfo]) => (
              <Link
                key={key}
                href={`/program-kerja?category=${key}`}
                className={styles.programCategoryCard}
              >
                <h3 className={styles.programCategoryTitle}>{categoryInfo.title}</h3>
                <p className={styles.programCategoryDesc}>{categoryInfo.desc}</p>
              </Link>
            )
          )}
        </div>
      </section>
    </>
  );
}
