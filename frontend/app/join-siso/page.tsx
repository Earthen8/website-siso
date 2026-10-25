import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Join SISO | Open Recruitment Kepengurusan SISO Prasmul",
    description:
        "Bergabunglah bersama STEM Prasetiya Mulya Innovation Student Organization (SISO). Jadilah inovator masa depan dengan semangat 'With STEM We Can'!",
};

export default function JoinSisoPage() {
    return (
        <>
            {/* ── 1. Hero Section ── */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>OPEN RECRUITMENT SISO</div>
                    <h1 className={styles.heroTitle}>Join SISO: With STEM We Can!</h1>
                    <p className={styles.heroSubtitle}>
                        Jadilah bagian dari perhimpunan mahasiswa School of STEM Universitas Prasetiya Mulya. Asah kepemimpinan, perluas koneksi lintas prodi, dan ciptakan karya berdampak bersama SISO!
                    </p>
                    <Link href="#timeline" className={styles.heroBtn}>
                        Daftar Kepengurusan
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
                    {/* Placeholder image representation */}
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0" }}></div>
                </div>
            </section>

            {/* ── 2. Recruitment Information ── */}
            <section className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Informasi Rekrutmen</h2>
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
                            <h3 className={styles.infoCardTitle}>Posisi Divisi Terbuka</h3>
                            <p className={styles.infoCardText}>
                                Tersedia posisi staf aktif di 8 divisi: Event Planner, Research and Development, Human Resource, Public Relation, Financing, Online Media, Design, dan Documentation.
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
                            <h3 className={styles.infoCardTitle}>Persyaratan Calon Staf</h3>
                            <p className={styles.infoCardText}>
                                Mahasiswa aktif School of STEM (6 program studi S1: AI & Robotics, Business Mathematics, DBT, FBT, PDI, REE) berintegritas dan berkomitmen tinggi.
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
                            <h3 className={styles.infoCardTitle}>Alur Seleksi Transparan</h3>
                            <p className={styles.infoCardText}>
                                Tahapan seleksi transparan meliputi pendaftaran berkas, studi kasus/portofolio divisi, serta wawancara panelis bersama BPH.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. Benefits of Joining ── */}
            <section className={styles.benefitsSection}>
                <div className={styles.benefitsContent}>
                    <h2 className={styles.benefitsTitle}>Benefit Bergabung dengan SISO</h2>
                    <div className={styles.benefitList}>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>1</div>
                            <div className={styles.benefitText}>Kolaborasi multidisiplin lintas 6 program studi School of STEM.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>2</div>
                            <div className={styles.benefitText}>Akses eksklusif keterlibatan kepanitiaan InnoFair & kompetisi nasional STEM INC.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>3</div>
                            <div className={styles.benefitText}>Relasi luas dengan alumni berprestasi, akademisi, dan mitra industri teknologi.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>4</div>
                            <div className={styles.benefitText}>Pengembangan kepemimpinan berlandaskan nilai CHAIN (Caring, Humility, Achievement, Integrity) & AMICA.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>5</div>
                            <div className={styles.benefitText}>Portofolio kepengurusan resmi yang diakui universitas dan industri.</div>
                        </div>
                    </div>
                </div>
                <div className={styles.benefitsImageWrapper}>
                    {/* Static placeholder */}
                </div>
            </section>

            {/* ── 4. Recruitment Timeline ── */}
            <section id="timeline" className={styles.timelineSection}>
                <h2 className={styles.timelineTitle}>Linimasa Rekrutmen</h2>
                <div className={styles.timelineContainer}>
                    <div className={styles.timelineLine}></div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>01</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 01</div>
                            <div className={styles.timelinePhase}>Pemilihan Chairman & Co-Chair</div>
                            <div className={styles.timelineDate}>Musyawarah & Sidang Umum</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>02</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 02</div>
                            <div className={styles.timelinePhase}>Open Recruitment Divisi Staf</div>
                            <div className={styles.timelineDate}>Pendaftaran & Unggah Berkas</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>03</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 03</div>
                            <div className={styles.timelinePhase}>Seleksi Wawancara & Case</div>
                            <div className={styles.timelineDate}>Screening & Diskusi Kasus</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>04</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 04</div>
                            <div className={styles.timelinePhase}>Pengumuman & Welcoming SISO Day</div>
                            <div className={styles.timelineDate}>Inaugurasi & First Gathering</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. FAQ Section ── */}
            <section className={styles.faqSection}>
                <div className={styles.faqHeader}>
                    <h2 className={styles.faqTitle}>Frequently Asked Questions (FAQ)</h2>
                    <p className={styles.faqSubtitle}>Segala hal yang perlu kamu ketahui tentang proses rekrutmen dan kepengurusan SISO Prasmul.</p>
                </div>
                <div className={styles.faqList}>
                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Siapa saja yang dapat mendaftar menjadi pengurus SISO?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Seluruh mahasiswa aktif School of STEM Universitas Prasetiya Mulya dari 6 program studi S1 (AI & Robotics, Business Mathematics, Digital Business Technology, Food Business Technology, Product Design Innovation, Renewable Energy Engineering) berhak mendaftar.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Apa saja berkas yang perlu dipersiapkan?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Kamu perlu menyiapkan Kartu Tanda Mahasiswa (KTM), Curriculum Vitae (CV) terbaru, transkrip nilai akademik terakhir, serta portofolio karya jika memilih divisi kreatif atau teknis (seperti Design, Documentation, Online Media, atau RnD).
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Kapan periode open recruitment biasanya diselenggarakan?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Open recruitment staf SISO umumnya dibuka pada awal semester ganjil tahun akademik berjalan setelah pelantikan BPH terpilih. Pantau terus linimasa di situs ini dan Instagram resmi @siso.prasmul.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Bagaimana alur pengumuman hasil seleksi?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Seluruh pendaftar akan memperoleh notifikasi resmi mengenai status kelulusan di setiap tahapan via email universitas yang terdaftar serta portal informasi kepengurusan.
                        </div>
                    </details>

                    <details className={styles.faqItem} open>
                        <summary className={styles.faqSummary}>
                            Bolehkah memilih lebih dari satu divisi saat mendaftar?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Ya, kamu dapat mencantumkan maksimal dua pilihan divisi prioritas. Penempatan akhir akan ditentukan berdasarkan hasil wawancara, portofolio, dan kebutuhan formasi masing-masing divisi.
                        </div>
                    </details>
                </div>
            </section>
        </>
    );
}
