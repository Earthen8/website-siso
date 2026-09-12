import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Join SISO | STEM Innovation Student Organization",
    description: "Unlock your potential in the field of STEM. Become a member of the Student Innovation & Science Organization.",
};

export default function JoinSisoPage() {
    return (
        <>
            {/* ── 1. Hero Section ── */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>RECRUITMENT 2026</div>
                    <h1 className={styles.heroTitle}>Join SISO !</h1>
                    <p className={styles.heroSubtitle}>
                        Unlock your potential in the field of STEM. Become a member of the Student
                        Innovation & Science Organization and grow alongside the brightest minds of the generation.
                    </p>
                    <Link href="#timeline" className={styles.heroBtn}>
                        Apply Now
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
                </div>
                <div className={styles.heroImageWrapper}>
                    {/* Static placeholder for Hero Image */}
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0" }}></div>
                </div>
            </section>

            {/* ── 2. Recruitment Information ── */}
            <section className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Recruitment Information</h2>
                    <div className={styles.sectionLine}></div>
                </div>
                <div className={styles.infoGrid}>
                    {/* Card 1 */}
                    <div className={styles.infoCard}>
                        <div className={styles.infoCardImage}></div>
                        <div className={styles.infoCardBody}>
                            <div className={styles.infoIconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <h3 className={styles.infoCardTitle}>Open Positions</h3>
                            <p className={styles.infoCardText}>
                                We are looking for passionate individuals to join our technical, creative, and management divisions. Explore roles in AI Research, UI/UX Design, and Project Management.
                            </p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className={styles.infoCard}>
                        <div className={styles.infoCardImage}></div>
                        <div className={styles.infoCardBody}>
                            <div className={styles.infoIconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h3 className={styles.infoCardTitle}>Requirements</h3>
                            <p className={styles.infoCardText}>
                                Applicants must be currently enrolled students with a minimum GPA of 3.0. A strong interest in STEM innovation and a collaborative mindset are essential for all candidates.
                            </p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className={styles.infoCard}>
                        <div className={styles.infoCardImage}></div>
                        <div className={styles.infoCardBody}>
                            <div className={styles.infoIconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </div>
                            <h3 className={styles.infoCardTitle}>Selection Process</h3>
                            <p className={styles.infoCardText}>
                                Our rigorous process includes portfolio review, technical assessment, and behavioral interviews to ensure we find the best fit for our innovative culture.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. Benefits of Joining ── */}
            <section className={styles.benefitsSection}>
                <div className={styles.benefitsContent}>
                    <h2 className={styles.benefitsTitle}>Benefits of Joining</h2>
                    <div className={styles.benefitList}>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>1</div>
                            <div className={styles.benefitText}>Access to state-of-the-art laboratory facilities and high-end tech equipment.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>2</div>
                            <div className={styles.benefitText}>Mentorship from industry leaders and distinguished faculty members.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>3</div>
                            <div className={styles.benefitText}>Opportunity to participate in prestigious international STEM competitions.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>4</div>
                            <div className={styles.benefitText}>Priority registration for exclusive innovation workshops and seminars.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>5</div>
                            <div className={styles.benefitText}>Develop a powerful professional network and lifetime friendships.</div>
                        </div>
                    </div>
                </div>
                <div className={styles.benefitsImageWrapper}>
                    {/* Static placeholder */}
                </div>
            </section>

            {/* ── 4. Recruitment Timeline ── */}
            <section id="timeline" className={styles.timelineSection}>
                <h2 className={styles.timelineTitle}>Recruitment Timeline</h2>
                <div className={styles.timelineContainer}>
                    <div className={styles.timelineLine}></div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>01</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Step 01</div>
                            <div className={styles.timelinePhase}>Registration Open</div>
                            <div className={styles.timelineDate}>1 - 10 Jan 2026</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>02</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Step 02</div>
                            <div className={styles.timelinePhase}>Document Submission</div>
                            <div className={styles.timelineDate}>11 - 15 Jan 2026</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>03</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Step 03</div>
                            <div className={styles.timelinePhase}>Interview Session</div>
                            <div className={styles.timelineDate}>20 - 22 Jan 2026</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>04</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Step 04</div>
                            <div className={styles.timelinePhase}>Announcement</div>
                            <div className={styles.timelineDate}>25 Jan 2026</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. FAQ Section ── */}
            <section className={styles.faqSection}>
                <div className={styles.faqHeader}>
                    <h2 className={styles.faqTitle}>Frequently Asked Questions (FAQ)</h2>
                    <p className={styles.faqSubtitle}>Everything you need to know about the SISO recruitment process.</p>
                </div>
                <div className={styles.faqList}>
                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Who is eligible to join SISO?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            All active students of STEM Prasetiya Mulya University are eligible to apply. We welcome students from all semesters and majors within the STEM faculty who share a passion for innovation.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            What documents are required for application?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            You will need to prepare your Student ID (KTM), Curriculum Vitae (CV), latest academic transcript, and a motivation letter explaining why you want to join SISO.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            When is the recruitment period open?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            The recruitment period usually opens at the beginning of the odd semester (around January or August). Keep an eye on our social media for exact dates.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            How will I be notified of the results?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            All applicants will be notified via their registered university email address regarding their application status at each stage of the process.
                        </div>
                    </details>

                    <details className={styles.faqItem} open>
                        <summary className={styles.faqSummary}>
                            Can I join multiple divisions at once?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Yes, you can apply for up to two divisions. However, the final selection will assign you to only one division where your skills and interests are most needed based on our assessment.
                        </div>
                    </details>
                </div>
            </section>
        </>
    );
}
