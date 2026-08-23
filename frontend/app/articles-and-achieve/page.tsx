import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticles } from "@/lib/api";
import type { ArticleCategory } from "@/lib/types";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Articles & Achievements | STEM Innovation Student Organization",
  description:
    "News, publications, research, and milestones from the SISO community. Celebrating our journey of academic excellence and technical innovation.",
  openGraph: {
    title: "Articles & Achievements | SISO Prasmul",
    locale: "id_ID",
  },
};

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  jurnal: "Jurnal",
  kajian: "Kajian",
  achievement: "Prestasi",
  beasiswa: "Beasiswa",
};

interface Props {
  searchParams: { category?: string };
}

export default async function ArticlesPage({ searchParams }: Props) {
  const activeCategory = searchParams.category as ArticleCategory | undefined;
  const articles = await fetchArticles(activeCategory).catch(() => []);

  return (
    <>
      {/* ── 1. Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.sectionBadge}>[ HERO SECTION ]</span>
          <h1 className={styles.heroTitle}>Articles &<br />Achievements</h1>
          <p className={styles.heroSubtitle}>
            News, publications, research, and milestones from the SISO community.
            Celebrating our journey of academic excellence and technical innovation.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0" }}></div>
        </div>
      </section>

      {/* ── 2. News & Updates ── */}
      <section className={styles.sectionAlt}>
        <h2 className={styles.sectionTitle}>News & Updates</h2>

        {/* Category filter */}
        <div className={styles.filterContainer}>
          <Link
            href="/articles-and-achieve"
            className={`${styles.filterTag} ${!activeCategory ? styles.filterTagActive : ''}`}
          >
            All News
          </Link>
          {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(
            ([key, label]) => (
              <Link
                key={key}
                href={`/articles-and-achieve?category=${key}`}
                className={`${styles.filterTag} ${activeCategory === key ? styles.filterTagActive : ''}`}
              >
                {label}
              </Link>
            )
          )}
        </div>

        {articles.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#718096" }}>
            Belum ada artikel.
          </p>
        ) : (
          <div className={styles.newsGrid}>
            {articles.map((article) => (
              <Link key={article.id} href={`/articles-and-achieve/${article.slug}`} className={styles.newsCard}>
                <div className={styles.newsImage}></div>
                <div className={styles.newsBody}>
                  {article.published_at && (
                    <span className={styles.newsDate}>
                      {new Date(article.published_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  <h3 className={styles.newsTitle}>{article.title}</h3>
                  <p className={styles.newsExcerpt}>
                    {article.body.slice(0, 100)}
                    {article.body.length > 100 ? "..." : ""}
                  </p>
                  <span className={styles.newsBtn}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── 3. Student Publications ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Student Publications</h2>
        <div className={styles.pubList}>
          {/* Static Mock Data */}
          {[
            {
              title: "Optimizing Campus Network Infrastructure",
              author: "Ricky A. et al",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Analysis of high-traffic node performance and scalability requirements for modern campus environments.",
              badge: "Whitepaper",
            },
            {
              title: "Machine Learning in Academic Advising Systems",
              author: "SISO AI Division",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Predictive modeling for student success pathways using advanced neural networks.",
              badge: "Student Research Paper",
            },
          ].map((pub, i) => (
            <div key={i} className={styles.pubCard}>
              <div className={styles.pubIcon}>PDF</div>
              <div className={styles.pubBody}>
                <h3 className={styles.pubTitle}>{pub.title}</h3>
                <p className={styles.pubAuthor}>By: {pub.author}</p>
                <p className={styles.pubDesc}>{pub.desc}</p>
              </div>
              <span className={styles.pubBadge}>{pub.badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Research and Studies ── */}
      <section className={styles.sectionAlt}>
        <h2 className={styles.sectionTitle}>Research and Studies</h2>
        <div className={styles.researchGrid}>
          {/* Static Mock Data */}
          {[
            {
              title: "The Role of Student Organizations in Academic Performance",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A comprehensive study on extracurricular impact.",
            },
            {
              title: "Urban Sustainability in Modern Architecture",
              desc: "Exploring the intersection of green technology and passive living spaces in Southeast Asia.",
            },
            {
              title: "Blockchain for Transparent Academic Credentialing",
              desc: "Building secure decentralized ledgers for verifiable and falsification-proof diplomas.",
            },
            {
              title: "Mental Health Support Patterns in STEM Students",
              desc: "A qualitative analysis of stress management systems and peer network efficacy in rigorous academic environments.",
            },
          ].map((study, i) => (
            <div key={i} className={styles.researchCard}>
              <div className={styles.researchIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div className={styles.researchBody}>
                <h3 className={styles.researchTitle}>{study.title}</h3>
                <p className={styles.researchDesc}>{study.desc}</p>
                <Link href="#" className={styles.researchLink}>Read Study →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Students Achievements ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Students Achievements</h2>
        <div className={styles.achieveGrid}>
          {/* Static Mock Data */}
          {[
            { name: "Aditya S.", role: "1st Place - Hackathon Indonesia 2025" },
            { name: "Maria K.", role: "Best Speaker - Debate UI 2025" },
            { name: "Hassan W.", role: "UI/UX Champion - DesignFest" },
            { name: "Lily Y.", role: "Outstanding Contribution in STEM" },
            { name: "David T.", role: "Published Research Paper (IEEE)" },
            { name: "Sarah M.", role: "Top 10 Finalist (AI Competition)" },
          ].map((achieve, i) => (
            <div key={i} className={styles.achieveCard}>
              <div className={styles.achieveIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div className={styles.achieveBody}>
                <h3 className={styles.achieveName}>{achieve.name}</h3>
                <p className={styles.achieveRole}>{achieve.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Scholarship Information ── */}
      <section className={styles.sectionAlt}>
        <h2 className={styles.sectionTitle}>Scholarship Information</h2>
        <div className={styles.infoGrid}>
          {/* Static Mock Data */}
          {[
            {
              title: "SISO Excellence Scholarship",
              amount: "Rp 15,000,000 / sem",
              deadline: "12 March 2026",
              eligibility: "GPA ≥ 3.5",
              quota: "20 Students",
            },
            {
              title: "Corporate Partner Scholarship",
              amount: "Rp 10,000,000 / sem",
              deadline: "15 March 2026",
              eligibility: "GPA ≥ 3.2",
              quota: "15 Students",
            },
            {
              title: "Government Merit Grant",
              amount: "Rp 12,000,000 / sem",
              deadline: "30 March 2026",
              eligibility: "GPA ≥ 3.5",
              quota: "10 Students",
            },
          ].map((schol, i) => (
            <div key={i} className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{schol.title}</h3>
              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Amount</span>
                  <span className={styles.infoValueHighlight}>{schol.amount}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Deadline</span>
                  <span className={styles.infoValue}>{schol.deadline}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Eligibility</span>
                  <span className={styles.infoValue}>{schol.eligibility}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quota</span>
                  <span className={styles.infoValue}>{schol.quota}</span>
                </div>
              </div>
              <Link href="#" className={styles.infoBtn}>Apply Now</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Competition Information ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Competition Information</h2>
        <div className={styles.infoGrid}>
          {/* Static Mock Data */}
          {[
            {
              title: "National Hackathon",
              type: "Technology",
              date: "March 2026",
              level: "National",
              status: "Open",
              statusHighlight: true,
            },
            {
              title: "Business Case Competition",
              type: "Management",
              date: "April 2026",
              level: "Regional",
              status: "Open",
              statusHighlight: true,
            },
            {
              title: "Scientific Paper Contest",
              type: "Research",
              date: "May 2026",
              level: "National",
              status: "Upcoming",
              statusHighlight: false,
            },
          ].map((comp, i) => (
            <div key={i} className={styles.infoCard}>
              <h3 className={styles.infoTitle}>{comp.title}</h3>
              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Type</span>
                  <span className={styles.infoValue}>{comp.type}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Date</span>
                  <span className={styles.infoValue}>{comp.date}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Level</span>
                  <span className={styles.infoValue}>{comp.level}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Status</span>
                  <span className={comp.statusHighlight ? styles.infoValueHighlightGreen : styles.infoValueHighlight}>
                    {comp.status}
                  </span>
                </div>
              </div>
              <Link href="#" className={styles.infoBtn}>Details →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
