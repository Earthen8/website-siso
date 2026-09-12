import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Gallery | STEM Innovation Student Organization",
    description: "Explore our collection of photos, videos, and event documentation from SISO activities.",
};

export default function GalleryPage() {
    return (
        <>
            {/* ── 1. Hero Section ── */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <span className={styles.sectionBadge}>[ HERO SECTION ]</span>
                    <h1 className={styles.heroTitle}>Gallery</h1>
                    <p className={styles.heroSubtitle}>
                        Explore our collection of photos, videos, and event documentation from SISO activities.
                        Witness the fusion of technology and creativity in every project.
                    </p>
                </div>
                <div className={styles.heroImageWrapper}>
                    {/* Static placeholder for Hero Image */}
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0" }}></div>
                </div>
            </section>

            {/* ── 2. Filter Navigation ── */}
            <nav className={styles.navFilter}>
                <Link href="#photos" className={`${styles.navFilterLink} ${styles.navFilterLinkActive}`}>
                    All
                </Link>
                <Link href="#photos" className={styles.navFilterLink}>
                    Photos
                </Link>
                <Link href="#videos" className={styles.navFilterLink}>
                    Videos
                </Link>
                <Link href="#events" className={styles.navFilterLink}>
                    Event Archives
                </Link>
                <Link href="#docs" className={styles.navFilterLink}>
                    Annual Documentation
                </Link>
            </nav>

            {/* ── 3. Photos Section ── */}
            <section id="photos" className={styles.photosSection}>
                <h2 className={styles.sectionTitle}>Photos</h2>
                <div className={styles.photosGrid}>
                    {/* Photo Cards */}
                    {[
                        { title: "Robotics Workshop", year: "2026" },
                        { title: "Hardware Expo", year: "2026" },
                        { title: "Team Sprint", year: "2026" },
                        { title: "Guest Lecture", year: "2026" },
                        { title: "Science Fair", year: "2026" },
                        { title: "Achievement Gala", year: "2026" },
                        { title: "Lab Sessions", year: "2026" },
                        { title: "Hackathon", year: "2026" },
                    ].map((photo, i) => (
                        <div key={i} className={styles.photoCard}>
                            <div className={styles.photoImageWrapper}>
                                <div style={{ width: "100%", height: "100%", backgroundColor: "#cbd5e1" }}></div>
                            </div>
                            <h3 className={styles.photoTitle}>{photo.title} — {photo.year}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 4. Videos Section ── */}
            <section id="videos" className={styles.videosSection}>
                <h2 className={styles.sectionTitle}>Videos</h2>
                <div className={styles.videosGrid}>
                    {/* Video Cards */}
                    {[
                        { title: "Annual Tech Showcase Recap", duration: "5:08", views: "1.2K" },
                        { title: "Student Innovation Interview", duration: "12:45", views: "856" },
                        { title: "SISO Hackathon Highlights", duration: "3:20", views: "2.1K" },
                    ].map((video, i) => (
                        <div key={i} className={styles.videoCard}>
                            <div className={styles.videoThumbnail}>
                                <div style={{ width: "100%", height: "100%", backgroundColor: "#94a3b8" }}></div>
                                <div className={styles.playIconWrapper}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.videoInfo}>
                                <h3 className={styles.videoTitle}>{video.title}</h3>
                                <p className={styles.videoMeta}>Duration: {video.duration} • Views: {video.views}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 5. Event Archives Section ── */}
            <section id="events" className={styles.eventsSection}>
                <h2 className={styles.sectionTitle}>Event Archives</h2>
                <div className={styles.eventsList}>
                    {/* Event Cards */}
                    {[
                        {
                            title: "Tech Summit 2026",
                            desc: "Gathering of world-class innovators and students to discuss the future of sustainable energy and AI integration.",
                            stats: "50 PHOTOS | 5 VIDEOS",
                        },
                        {
                            title: "Annual Gala Night 2025",
                            desc: "A prestigious evening celebrating the milestones and achievements of SISO members throughout the academic year.",
                            stats: "120 PHOTOS | 2 VIDEOS",
                        },
                        {
                            title: "Hackathon 2025",
                            desc: "48 hours of intense coding, problem-solving, and radical innovation for social impact.",
                            stats: "45 PHOTOS | 8 VIDEOS",
                        },
                    ].map((event, i) => (
                        <div key={i} className={styles.eventCard}>
                            <div className={styles.eventThumbnail}>
                                <div style={{ width: "100%", height: "100%", backgroundColor: "#cbd5e1" }}></div>
                            </div>
                            <div className={styles.eventInfo}>
                                <h3 className={styles.eventTitle}>{event.title}</h3>
                                <p className={styles.eventDesc}>{event.desc}</p>
                                <span className={styles.eventMeta}>{event.stats}</span>
                            </div>
                            <Link href="#" className={styles.eventAction}>
                                View Archive →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 6. Annual Documentation Section ── */}
            <section id="docs" className={styles.docsSection}>
                <h2 className={styles.sectionTitle}>Annual Documentation</h2>
                <div className={styles.docsGrid}>
                    {/* Doc Cards */}
                    {[
                        { title: "Annual Documentation 2023", format: "PDF - 150 PAGES" },
                        { title: "Annual Documentation 2024", format: "PDF - 120 PAGES" },
                        { title: "Annual Documentation 2025", format: "PDF - 180 PAGES" },
                        { title: "Annual Documentation 2026", format: "PDF - 75 PAGES" },
                    ].map((doc, i) => (
                        <div key={i} className={styles.docCard}>
                            <div className={styles.docImageWrapper}>
                                <div style={{ width: "100%", height: "100%", backgroundColor: "#94a3b8" }}></div>
                            </div>
                            <h3 className={styles.docTitle}>{doc.title}</h3>
                            <p className={styles.docMeta}>{doc.format}</p>
                            <Link href="#" className={styles.docAction}>
                                Download Report
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
