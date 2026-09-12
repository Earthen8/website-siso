import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchMedia, fetchPrograms, type MediaAsset, type ProgramKerja } from "@/lib/api";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Gallery & Dokumentasi | SISO Prasmul",
    description:
        "Eksplorasi dokumentasi foto, video recap, arsip program kerja, dan publikasi tahunan STEM Prasetiya Mulya Innovation Student Organization.",
    openGraph: {
        title: "Gallery & Dokumentasi | SISO Prasmul",
        description: "Galeri dokumentasi kegiatan inovasi dan kemahasiswaan SISO Prasmul.",
        locale: "id_ID",
        type: "website",
    },
};

// ── Curated Fallback Visual Assets ───────────────────────────────────────────
const FALLBACK_PHOTOS = [
    {
        title: "Robotics Prototyping Workshop",
        category: "Workshop",
        year: "2026",
        image:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        caption: "Mahasiswa STEM merakit modul sensor dan mikroprosesor di lab robotika.",
    },
    {
        title: "STEM Innovation Summit Exhibition",
        category: "Event",
        year: "2026",
        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        caption: "Pameran hasil karya rekayasa teknologi mahasiswa kepada mitra industri.",
    },
    {
        title: "AI & Machine Learning Sprint",
        category: "Workshop",
        year: "2026",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        caption: "Sesi hands-on coding model computer vision dan neural network.",
    },
    {
        title: "Prasmul Hackathon 48-Hour Sprint",
        category: "Competition",
        year: "2026",
        image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
        caption: "Kolaborasi intensif tim mahasiswa memecahkan tantangan smart city.",
    },
    {
        title: "IoT Hardware Hands-on Session",
        category: "Workshop",
        year: "2025",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        caption: "Implementasi sensor nirkabel berbasis LoRaWAN dan gateway terintegrasi.",
    },
    {
        title: "National Tech Competition Gala",
        category: "Achievement",
        year: "2025",
        image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
        caption: "Penganugerahan medali emas bagi delegasi mahasiswa SISO di kompetisi nasional.",
    },
    {
        title: "SISO Goes to School Mentorship",
        category: "Pengmas",
        year: "2025",
        image:
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
        caption: "Pengenalan dasar logika komputasi dan sains bagi generasi muda sekolah mitra.",
    },
    {
        title: "BPH Annual Strategic Welcoming",
        category: "Internal",
        year: "2025",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        caption: "Sinergi rapat kerja dan perumusan target kepengurusan tahunan SISO.",
    },
];

const FALLBACK_VIDEOS = [
    {
        title: "Annual Tech Showcase 2026 Recap",
        duration: "04:35",
        views: "1.4K views",
        event: "Tech Showcase",
        thumbnail:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        url: "https://www.instagram.com/siso.prasmul/",
    },
    {
        title: "SISO Hackathon 48-Hours Behind The Scenes",
        duration: "06:12",
        views: "2.1K views",
        event: "Hackathon 2026",
        thumbnail:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        url: "https://www.instagram.com/siso.prasmul/",
    },
    {
        title: "Student Innovator Story: Michelle & Jonathan",
        duration: "08:50",
        views: "980 views",
        event: "Innovation Spotlight",
        thumbnail:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        url: "https://www.instagram.com/siso.prasmul/",
    },
];

const ANNUAL_DOCS = [
    {
        title: "Laporan Pertanggungjawaban (LPJ) 2026",
        format: "PDF • 85 Halaman",
        year: "2026",
    },
    {
        title: "SISO Annual Accountability Report 2025",
        format: "PDF • 140 Halaman",
        year: "2025",
    },
    {
        title: "STEM Innovation Yearbook 2024",
        format: "PDF • 120 Halaman",
        year: "2024",
    },
    {
        title: "SISO Inaugural Annual Report 2023",
        format: "PDF • 95 Halaman",
        year: "2023",
    },
];

const FALLBACK_PROGRAMS: ProgramKerja[] = [
    {
        id: 1,
        title: "STEM Innovation Summit 2026",
        slug: "stem-innovation-summit-2026",
        category: "event",
        description:
            "Konferensi tahunan terbesar mahasiswa STEM menghadirkan keynote speaker industri, pameran inovasi, dan networking session.",
        date: "2026-10-02",
        cover_image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
    {
        id: 2,
        title: "AI & Deep Learning Hands-on Bootcamp",
        slug: "ai-deep-learning-bootcamp",
        category: "workshop",
        description:
            "Workshop intensif 2 pekan membangun pipeline machine learning dan generative AI model dari nol hingga deployment.",
        date: "2026-10-17",
        cover_image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
    {
        id: 3,
        title: "Prasmul Hackathon & Techfest",
        slug: "prasmul-hackathon-techfest",
        category: "competition",
        description:
            "Kompetisi problem-solving 48 jam untuk merancang solusi cerdas kota masa depan dengan total hadiah puluhan juta rupiah.",
        date: "2026-11-11",
        cover_image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
];


export default async function GalleryPage() {
    // TODO: [Backend Integration] Dynamic Media Fetching
    // Mengambil media assets foto & video dari endpoint /api/v1/media-assets/.
    // Ketika admin mengunggah dokumentasi via Django Admin, data akan langsung muncul di sini.
    const [mediaList, programs] = await Promise.all([
        fetchMedia({ limit: 12 }).catch(() => []),
        fetchPrograms({ limit: 4 }).catch(() => []),
    ]);

    // Combine backend media with fallback gallery if DB has few photos
    const displayPhotos =
        mediaList.length > 0
            ? mediaList.map((m: MediaAsset, idx: number) => ({
                title: m.caption || `Dokumentasi Kegiatan #${idx + 1}`,
                category: "Dokumentasi",
                year: "2026",
                image: m.file,
                caption: m.caption || "Dokumentasi resmi kegiatan kemahasiswaan SISO Prasmul.",
            }))
            : FALLBACK_PHOTOS;

    const displayPrograms = programs.length > 0 ? programs : FALLBACK_PROGRAMS;

    return (
        <div className={styles.pageWrapper}>
            {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
            <section className={styles.heroContainer}>
                <div className={`container ${styles.heroContent}`}>
                    <div className={styles.heroBadge}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                            <polyline points="21 15 16 10 5 21" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Dokumentasi &amp; Arsip Kegiatan
                    </div>
                    <h1 className={styles.heroTitle}>
                        Capturing Moments,{" "}
                        <span className={styles.heroTitleHighlight}>Inspiring Impact</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Jelajahi rekaman visual perjalanan mahasiswa STEM Prasetiya Mulya — dari dinamika riset laboratorium,
                        keseruan workshop teknologi, ajang kompetisi nasional, hingga dedikasi pengabdian masyarakat.
                    </p>

                    <div className={styles.heroStatsRow}>
                        <div className={styles.heroStatItem}>
                            <span className={styles.heroStatDot} />
                            <span>120+ Dokumentasi Foto</span>
                        </div>
                        <div className={styles.heroStatItem}>
                            <span className={styles.heroStatDot} />
                            <span>15+ Video Highlights</span>
                        </div>
                        <div className={styles.heroStatItem}>
                            <span className={styles.heroStatDot} />
                            <span>4 Edisi Arsip Tahunan</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Quick Filter Navigation Bar ──────────────────────────────────── */}
            <nav className={styles.filterSection} aria-label="Navigasi kategori galeri">
                <div className="container">
                    <div className={styles.filterBar}>
                        <a href="#photos" className={`${styles.filterChip} ${styles.filterChipActive}`}>
                            Foto Kegiatan
                        </a>
                        <a href="#videos" className={styles.filterChip}>
                            Video Highlights
                        </a>
                        <a href="#events" className={styles.filterChip}>
                            Arsip Program Kerja
                        </a>
                        <a href="#docs" className={styles.filterChip}>
                            Laporan Tahunan (PDF)
                        </a>
                    </div>
                </div>
            </nav>

            {/* ── 3. Photos Section ───────────────────────────────────────────────── */}
            <section id="photos" className={styles.photosSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Galeri Foto</span>
                        <h2 className={styles.sectionTitle}>Moments of Collaboration</h2>
                        <p className={styles.sectionSubtitle}>
                            Kumpulan dokumentasi foto kegiatan mahasiswa STEM SISO dalam berinovasi dan berkarya.
                        </p>
                    </div>

                    <div className={styles.photosGrid}>
                        {displayPhotos.map((photo, i) => (
                            <div key={photo.title + i} className={styles.photoCard}>
                                <div className={styles.photoImageWrapper}>
                                    <Image
                                        src={photo.image}
                                        alt={photo.title}
                                        fill
                                        sizes="(min-width: 1100px) 25vw, (min-width: 768px) 33vw, 50vw"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span className={styles.photoBadge}>{photo.category}</span>
                                    <div className={styles.photoOverlay}>
                                        <p className={styles.photoOverlayText}>{photo.caption}</p>
                                    </div>
                                </div>
                                <div className={styles.photoCardInfo}>
                                    <h3 className={styles.photoTitle}>{photo.title}</h3>
                                    <p className={styles.photoCategoryTag}>Tahun {photo.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Videos Section ───────────────────────────────────────────────── */}
            {/* 
        TODO: [Backend Integration] Dynamic Video Embed URL
        Field `video_url` pada model MediaAsset Django untuk mendukung embed YouTube / Vimeo langsung.
      */}
            <section id="videos" className={`${styles.videosSection} ${styles.altBg}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Video Dokumentasi</span>
                        <h2 className={styles.sectionTitle}>Recap &amp; Aftermovie</h2>
                        <p className={styles.sectionSubtitle}>
                            Saksikan kembali kemeriahan dan antusiasme setiap acara melalui video rekaman aftermovie.
                        </p>
                    </div>

                    <div className={styles.videosGrid}>
                        {FALLBACK_VIDEOS.map((video, i) => (
                            <div key={video.title + i} className={styles.videoCard}>
                                <div className={styles.videoThumbnailWrapper}>
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        sizes="(min-width: 960px) 33vw, (min-width: 600px) 50vw, 100vw"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <a
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.playButton}
                                        aria-label={`Tonton video ${video.title}`}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </a>
                                    <span className={styles.videoDurationBadge}>{video.duration}</span>
                                </div>

                                <div className={styles.videoCardBody}>
                                    <div>
                                        <h3 className={styles.videoCardTitle}>{video.title}</h3>
                                    </div>
                                    <div className={styles.videoMetaRow}>
                                        <span>{video.event}</span>
                                        <span>•</span>
                                        <span>{video.views}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. Event Archives Section ───────────────────────────────────────── */}
            <section id="events" className={styles.eventsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Arsip Kegiatan</span>
                        <h2 className={styles.sectionTitle}>Event Archives</h2>
                        <p className={styles.sectionSubtitle}>
                            Kilas balik program-program kerja unggulan yang telah berhasil diselenggarakan oleh SISO.
                        </p>
                    </div>

                    <div className={styles.eventsList}>
                        {displayPrograms.map((item) => (
                            <div key={item.id} className={styles.eventCard}>
                                <div className={styles.eventThumbWrapper}>
                                    <Image
                                        src={
                                            item.cover_image ||
                                            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
                                        }
                                        alt={item.title}
                                        fill
                                        sizes="(min-width: 900px) 280px, 100vw"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className={styles.eventContent}>
                                    <span className={styles.eventMetaBadge}>
                                        {item.category} • {item.date || "Arsip 2026"}
                                    </span>
                                    <h3 className={styles.eventCardTitle}>{item.title}</h3>
                                    <p className={styles.eventCardDesc}>{item.description}</p>
                                </div>
                                <div>
                                    <Link href={`/program-kerja/${item.slug}`} className={styles.eventCardBtn}>
                                        Lihat Arsip &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. Annual Documentation Section ─────────────────────────────────── */}
            {/* 
        TODO: [Backend Integration] PDF Document Asset Upload
        Tambahkan model `AnnualReport` atau tipe file document pada MediaAsset untuk unduhan file PDF riil.
      */}
            <section id="docs" className={`${styles.docsSection} ${styles.altBg}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Publikasi &amp; Laporan</span>
                        <h2 className={styles.sectionTitle}>Annual Documentation</h2>
                        <p className={styles.sectionSubtitle}>
                            Laporan akuntabilitas tahunan dan rekam jejak kepengurusan SISO yang dapat diakses secara transparan.
                        </p>
                    </div>

                    <div className={styles.docsGrid}>
                        {ANNUAL_DOCS.map((doc, i) => (
                            <div key={doc.title + i} className={styles.docCard}>
                                <div className={styles.docThumbWrapper}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" />
                                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
                                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
                                        <polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3 className={styles.docCardTitle}>{doc.title}</h3>
                                <p className={styles.docMetaBadge}>{doc.format}</p>
                                <a
                                    href={`#download-${doc.year}`}
                                    className={styles.docDownloadBtn}
                                    aria-label={`Unduh ${doc.title}`}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" />
                                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" />
                                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    Unduh PDF
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
