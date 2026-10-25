import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Join SISO | Regenerasi & Rekrutmen Fungsionaris",
    description:
        "Bergabunglah dalam jajaran fungsionaris SISO Universitas Prasetiya Mulya. Mengabdi, bertumbuh dalam kepemimpinan, dan mewujudkan dampak nyata bagi civitas akademika Sekolah STEM.",
};

export default function JoinSisoPage() {
    return (
        <>
            {/* ── 1. Hero Section ── */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>REGENERASI &amp; REKRUTMEN</div>
                    <h1 className={styles.heroTitle}>Become a SISO Functionary</h1>
                    <p className={styles.heroSubtitle}>
                        Bergabunglah dalam jajaran fungsionaris SISO. Mengabdi, bertumbuh dalam kepemimpinan, menyuarakan aspirasi mahasiswa, dan mewujudkan dampak nyata bagi civitas akademika Sekolah STEM Universitas Prasetiya Mulya.
                    </p>
                    <Link href="#timeline" className={styles.heroBtn}>
                        Lihat Alur Seleksi
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
                            <h3 className={styles.infoCardTitle}>Open Departments</h3>
                            <p className={styles.infoCardText}>
                                Peluang kontribusi terbuka pada 8 departemen: Event Planner, Research and Development, Human Resource, Public Relation, Financing, Online Media, Design, dan Documentation.
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
                                Mahasiswa aktif Sekolah STEM Universitas Prasetiya Mulya (STEMians) yang memiliki integritas, komitmen pengabdian, dan berpedoman pada AD/ART SISO.
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
                                Rangkaian seleksi objektif dan transparan meliputi seleksi berkas administratif, uji kompetensi studi kasus/portofolio, serta wawancara panelis bersama BPH.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. Benefits of Joining ── */}
            <section className={styles.benefitsSection}>
                <div className={styles.benefitsContent}>
                    <h2 className={styles.benefitsTitle}>Why Join SISO Stewardship?</h2>
                    <div className={styles.benefitList}>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>1</div>
                            <div className={styles.benefitText}>Pengalaman langsung tata kelola keorganisasian tingkat fakultas berlandaskan konstitusi AD/ART.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>2</div>
                            <div className={styles.benefitText}>Keterlibatan strategis dalam perencanaan dan eksekusi program unggulan seperti InnoFair, Science Fun Day, dan Prog&#123;r&#125;amming.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>3</div>
                            <div className={styles.benefitText}>Jejaring relasi profesional dengan akademisi, alumni Sekolah STEM, pimpinan fakultas, dan mitra industri.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>4</div>
                            <div className={styles.benefitText}>Pengasahan kepemimpinan etis, integritas, dan budaya kerja kolaboratif berakar pada 6 Nilai Dasar SISO.</div>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitNumber}>5</div>
                            <div className={styles.benefitText}>Rekam jejak kontribusi kemahasiswaan resmi yang diakui universitas dan membekali kesiapan karier profesional.</div>
                        </div>
                    </div>
                </div>
                <div className={styles.benefitsImageWrapper}>
                    {/* Static placeholder */}
                </div>
            </section>

            {/* ── 4. Recruitment Timeline ── */}
            <section id="timeline" className={styles.timelineSection}>
                <h2 className={styles.timelineTitle}>Annual Regeneration Flow</h2>
                <div className={styles.timelineContainer}>
                    <div className={styles.timelineLine}></div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>01</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 01</div>
                            <div className={styles.timelinePhase}>Pemilihan Ketua SISO &amp; Sidang SGA</div>
                            <div className={styles.timelineDate}>Proses demokrasi kampus melalui Pemilu Raya dan persidangan SISO Grand Assembly untuk menetapkan pucuk kepemimpinan.</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>02</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 02</div>
                            <div className={styles.timelinePhase}>Open Recruitment &amp; Pengumpulan Berkas</div>
                            <div className={styles.timelineDate}>Pembukaan pendaftaran calon staf fungsionaris 8 departemen serta submisi berkas portofolio dan administratif.</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>03</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 03</div>
                            <div className={styles.timelinePhase}>Screening Portofolio &amp; Wawancara</div>
                            <div className={styles.timelineDate}>Proses verifikasi kecocokan kompetensi divisi, pemecahan studi kasus, dan wawancara pendalaman visi kepengurusan.</div>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineDot}>04</div>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineStep}>Tahap 04</div>
                            <div className={styles.timelinePhase}>Penetapan Fungsionaris &amp; SGA I</div>
                            <div className={styles.timelineDate}>Pengesahan resmi susunan pengurus periode berjalan dalam forum SISO Grand Assembly I dan pelantikan fungsionaris.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. FAQ Section ── */}
            <section className={styles.faqSection}>
                <div className={styles.faqHeader}>
                    <h2 className={styles.faqTitle}>Frequently Asked Questions (FAQ)</h2>
                    <p className={styles.faqSubtitle}>Jawaban resmi seputar ketentuan keanggotaan, status fungsionaris, dan mekanisme rekrutmen SISO.</p>
                </div>
                <div className={styles.faqList}>
                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Siapa sajakah yang berhak mendaftar sebagai calon pengurus SISO?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Seluruh mahasiswa aktif Sekolah STEM Universitas Prasetiya Mulya (STEMians) yang memenuhi persyaratan akademik dan administratif sesuai Anggaran Rumah Tangga (ART) SISO berhak mendaftar sebagai calon fungsionaris.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Apa perbedaan antara anggota biasa (STEMians) dan fungsionaris SISO?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Sesuai AD/ART SISO, seluruh mahasiswa aktif Sekolah STEM secara otomatis berstatus sebagai anggota biasa. Fungsionaris adalah anggota yang melalui proses seleksi regenerasi untuk menjalankan fungsi kepengurusan harian organisasi.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Kapan periode rekrutmen terbuka staf SISO dilaksanakan?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Open recruitment fungsionaris dilaksanakan secara periodik satu kali setiap tahun kepengurusan, tepatnya setelah Ketua terpilih dilantik melalui forum SISO Grand Assembly.
                        </div>
                    </details>

                    <details className={styles.faqItem}>
                        <summary className={styles.faqSummary}>
                            Bagaimana sistem penilaian dan seleksi calon fungsionaris?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Penilaian didasarkan pada keselarasan nilai organisasi (6 Nilai Dasar SISO), rekam jejak integritas, komitmen waktu, serta kesesuaian kompetensi teknis pada departemen yang dipilih.
                        </div>
                    </details>

                    <details className={styles.faqItem} open>
                        <summary className={styles.faqSummary}>
                            Apakah fungsionaris SISO dapat berpartisipasi dalam kepanitiaan program kerja?
                            <span className={styles.faqSummaryIcon}>+</span>
                        </summary>
                        <div className={styles.faqContent}>
                            <br />
                            Ya, fungsionaris SISO memiliki kesempatan untuk menjadi pengarah, koordinator, maupun panitia pelaksana pada program-program kerja tahunan seperti InnoFair, Prog&#123;r&#125;amming, dan Science Fun Day.
                        </div>
                    </details>
                </div>
            </section>
        </>
    );
}
