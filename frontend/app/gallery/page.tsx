import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    fetchMedia,
    fetchPrograms,
    fetchSections,
    type MediaAsset,
    type ProgramKerja,
    type Section,
} from "@/lib/api";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Galeri & Dokumentasi | SISO Prasmul",
    description:
        "Arsip dokumentasi foto, video recap aftermovie, dan publikasi program kerja STEM Prasetiya Mulya Innovation Student Organization.",
    openGraph: {
        title: "Galeri & Dokumentasi | SISO Prasmul",
        description: "Rekam jejak visual inovasi mahasiswa School of STEM Universitas Prasetiya Mulya.",
        locale: "id_ID",
        type: "website",
    },
};

// ── Curated Fallback Visual Assets ───────────────────────────────────────────
const FALLBACK_PHOTOS = [
    {
        title: "InnoFair: Innovation & Prototyping Showcase",
        category: "Exhibition",
        year: "Annual",
        image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        caption: "Mahasiswa memamerkan purwarupa inovasi terapan di hadapan civitas akademika dan mitra.",
    },
    {
        title: "Science Fun Day: Community Science Outreach",
        category: "Pengmas",
        year: "Annual",
        image:
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
        caption: "Demonstrasi eksperimen sains interaktif bagi siswa binaan dalam memupuk minat belajar sains.",
    },
    {
        title: "Prog{r}amming: Computational Thinking Lab",
        category: "Workshop",
        year: "Annual",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        caption: "Suasana pelatihan komputasi dasar dan logika pemrograman interaktif untuk pemula.",
    },
    {
        title: "Perspective: Computer-Aided Design Workshop",
        category: "Workshop",
        year: "Annual",
        image:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        caption: "Mahasiswa mempraktikkan perancangan model 3D purwarupa menggunakan software CAD industri.",
    },
    {
        title: "Welcoming Night & SISO Day Celebration",
        category: "Kelembagaan",
        year: "Annual",
        image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
        caption: "Kebersamaan menyambut mahasiswa baru Sekolah STEM serta mengukuhkan rasa persaudaraan.",
    },
    {
        title: "SISO Grand Assembly & Musyawarah Anggota",
        category: "Sidang Organisasi",
        year: "Annual",
        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
        caption: "Forum permusyawaratan tertinggi mahasiswa Sekolah STEM untuk evaluasi dan regenerasi.",
    },
];

const FALLBACK_VIDEOS = [
    {
        title: "Official Aftermovie InnoFair — STEM Innovation Exhibition",
        duration: "04:35",
        views: "1.4K views",
        event: "InnoFair",
        thumbnail:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        url: "https://www.instagram.com/siso.prasmul/",
    },
    {
        title: "Science Fun Day: Inspiring Future Innovators",
        duration: "03:40",
        views: "980 views",
        event: "Science Fun Day",
        thumbnail:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        url: "https://www.instagram.com/siso.prasmul/",
    },
    {
        title: "Prog{r}amming Workshop: Code, Create, Connect",
        duration: "02:50",
        views: "1.1K views",
        event: "Prog{r}amming",
        thumbnail:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        url: "https://www.instagram.com/siso.prasmul/",
    },
];

const ANNUAL_DOCS = [
    {
        title: "Anggaran Dasar & Anggaran Rumah Tangga (AD/ART) SISO",
        format: "PDF • Dokumen Konstitusi",
        year: "Resmi",
    },
    {
        title: "Laporan Pertanggungjawaban (LPJ) Akhir Periode Kepengurusan",
        format: "PDF • Akuntabilitas Fungsionaris",
        year: "Tahunan",
    },
    {
        title: "Pedoman & Standar Operasional Prosedur (SOP) Organisasi",
        format: "PDF • Panduan Operasional",
        year: "Panduan",
    },
];

const FALLBACK_PROGRAMS: ProgramKerja[] = [
    {
        id: 1,
        title: "InnoFair",
        slug: "innofair",
        category: "event",
        description:
            "Pameran prototipe dan karya inovasi terapan mahasiswa Sekolah STEM yang mempertemukan talenta muda dengan akademisi, industri, dan ekosistem inovasi.",
        date: "2026-06-18",
        cover_image:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
    {
        id: 2,
        title: "Prog{r}amming",
        slug: "programming",
        category: "workshop",
        description:
            "Lokakarya komputasi interaktif yang mengenalkan logika pemrograman dasar, computational thinking, dan algoritma praktis bagi mahasiswa dan pelajar.",
        date: "2026-09-05",
        cover_image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
    {
        id: 3,
        title: "Science Fun Day",
        slug: "science-fun-day",
        category: "pengmas",
        description:
            "Aksi pengabdian masyarakat SISO melalui demonstrasi eksperimen sains yang interaktif dan aplikatif guna menumbuhkan rasa ingin tahu generasi muda.",
        date: "2026-10-10",
        cover_image:
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
    {
        id: 4,
        title: "Perspective",
        slug: "perspective",
        category: "workshop",
        description:
            "Workshop intensif desain purwarupa fisik, Computer-Aided Design (CAD), dan 3D modeling untuk mendukung kesiapan riset manufaktur mahasiswa.",
        date: "2026-11-07",
        cover_image:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        is_visible: true,
        media_assets: [],
    },
];


function isSectionVisible(
    sections: Section[],
    type: string,
    defaultValue = true
): boolean {
    const section = sections.find((s) => s.section_type === type);
    return section ? section.is_visible : defaultValue;
}

export default async function GalleryPage() {
    // TODO: [Backend Integration] Dynamic Media Fetching
    // Mengambil media assets foto & video dari endpoint /api/v1/media-assets/.
    // Ketika admin mengunggah dokumentasi via Django Admin, data akan langsung muncul di sini.
    const [sections, mediaList, programs] = await Promise.all([
        fetchSections("gallery").catch(() => []),
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
            {isSectionVisible(sections, "hero") && (
                <section className={styles.heroContainer}>
                    <div className={`container ${styles.heroContent}`}>
                        <div className={styles.heroBadge}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                <polyline points="21 15 16 10 5 21" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Dokumentasi &amp; Arsip
                        </div>
                        <h1 className={styles.heroTitle}>
                            Recording Our{" "}
                            <span className={styles.heroTitleHighlight}>Organizational Journey</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Arsip visual dan rekaman jejak perjalanan pergerakan SISO dalam menyelenggarakan forum kemahasiswaan, pameran inovasi, lokakarya, pengabdian masyarakat, serta laporan pertanggungjawaban kelembagaan.
                        </p>

                        <div className={styles.heroStatsRow}>
                            <div className={styles.heroStatItem}>
                                <span className={styles.heroStatDot} />
                                <span>Dokumentasi Foto Program Kerja</span>
                            </div>
                            <div className={styles.heroStatItem}>
                                <span className={styles.heroStatDot} />
                                <span>Video Recap &amp; Aftermovie Resmi</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── 2. Quick Filter Navigation Bar ──────────────────────────────────── */}
            {isSectionVisible(sections, "filter") && (
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
            )}

            {/* ── 3. Photos Section ───────────────────────────────────────────────── */}
            {isSectionVisible(sections, "photos") && (
                <section id="photos" className={styles.photosSection}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>Galeri Foto Kegiatan</span>
                            <h2 className={styles.sectionTitle}>Moments of Movement</h2>
                            <p className={styles.sectionSubtitle}>
                                Kumpulan dokumentasi visual pelaksanaan program kerja, sidang organisasi, serta kebersamaan fungsionaris SISO.
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
                                        <p className={styles.photoCategoryTag}>{photo.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 4. Videos Section ───────────────────────────────────────────────── */}
            {/* 
                TODO: [Backend Integration] Dynamic Video Embed URL
                Field `video_url` pada model MediaAsset Django untuk mendukung embed YouTube / Vimeo langsung.
            */}
            {isSectionVisible(sections, "videos") && (
                <section id="videos" className={`${styles.videosSection} ${styles.altBg}`}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>Arsip Multimedia</span>
                            <h2 className={styles.sectionTitle}>Recap &amp; Aftermovie</h2>
                            <p className={styles.sectionSubtitle}>
                                Dokumentasi audiovisual rangkaian agenda unggulan dan dinamika kepengurusan SISO.
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
            )}

            {/* ── 5. Event Archives Section ───────────────────────────────────────── */}
            {isSectionVisible(sections, "events") && (
                <section id="events" className={styles.eventsSection}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>Arsip Kegiatan</span>
                            <h2 className={styles.sectionTitle}>Program Archives</h2>
                            <p className={styles.sectionSubtitle}>
                                Katalog rekam jejak program kerja yang telah dilaksanakan oleh SISO.
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
                                            {item.category} • {item.date || "Arsip SISO"}
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
            )}

            {/* ── 6. Annual Documentation Section ─────────────────────────────────── */}
            {/* 
                TODO: [Backend Integration] PDF Document Asset Upload
                Tambahkan model `AnnualReport` atau tipe file document pada MediaAsset untuk unduhan file PDF riil.
            */}
            {isSectionVisible(sections, "docs") && (
                <section id="docs" className={`${styles.docsSection} ${styles.altBg}`}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>Transparansi &amp; Akuntabilitas</span>
                            <h2 className={styles.sectionTitle}>Institutional Documents</h2>
                            <p className={styles.sectionSubtitle}>
                                Akses dokumen hukum keorganisasian, pedoman konstitusi, serta laporan pertanggungjawaban kepengurusan secara terbuka.
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
            )}

        </div>
    );
}
