import datetime
from django.core.management.base import BaseCommand
from content.models import (
    Organization,
    Section,
    ProgramKerja,
    Achievement,
    Division,
    BPHMember,
    Article,
)


class Command(BaseCommand):
    help = "Seeds the database with official evergreen company profile copywriting from SISO RnD (AD/ART based)."

    def handle(self, *args, **options):
        self.stdout.write("Seeding official evergreen SISO RnD data (v3)...")

        # 1. Organization Singleton
        org = Organization.objects.get_or_create_singleton()
        org.slogan = "With STEM We Can: Represent, Collaborate, Innovate"
        org.visi = (
            "Membangun ekosistem kemahasiswaan Sekolah STEM Universitas Prasetiya Mulya "
            "yang aktif, inklusif, kolaboratif, inovatif, dan berkelanjutan melalui "
            "tata kelola organisasi yang profesional, transparan, akuntabel, serta "
            "berpusat pada mahasiswa (student-centered)."
        )
        org.misi = (
            "1. Mewadahi dan memperjuangkan aspirasi mahasiswa STEM melalui mekanisme representasi serta advokasi yang aktif.\n"
            "2. Mengembangkan potensi akademik, nonakademik, kreativitas, dan kepemimpinan mahasiswa melalui program kerja.\n"
            "3. Memfasilitasi kolaborasi strategis antara mahasiswa STEM dengan civitas academica, alumni, dan mitra eksternal.\n"
            "4. Menjalankan pengabdian masyarakat berbasis sains dan teknologi serta menjaga keberlanjutan regenerasi SISO."
        )
        org.nilai = [
            "Caring",
            "Humility",
            "Achieving",
            "Integrity",
            "Non-discrimination",
            "Innovation",
        ]
        org.filosofi_logo = (
            "1. Burung Phoenix (Kesinambungan & Pembaruan): Melambangkan ketangguhan organisasi dan kesinambungan kelembagaan SISO yang terus beregenerasi, bertumbuh, dan membawa pembaruan positif di setiap periode.\n"
            "2. Simpul Molekular (Keilmuan & Kolaborasi): Mencerminkan asas keilmuan, pendekatan rasional berbasis data, serta persatuan erat seluruh mahasiswa lintas program studi di bawah naungan SISO.\n"
            "3. Rentang Sayap Dinamis (Otonomi & Inovasi): Menggambarkan kemandirian, keluwesan adaptasi, dan keberanian fungsionaris SISO dalam melahirkan terobosan program kerja yang berdampak luas.\n"
            "4. Warna Biru Navy & Putih (Integritas & Transparansi): Biru tua melambangkan kematangan berpikir, profesionalisme, dan wibawa kelembagaan, sedangkan putih mencerminkan transparansi, akuntabilitas, dan ketulusan pengabdian."
        )
        org.save()
        self.stdout.write(self.style.SUCCESS("✓ Organization updated"))

        # 2. Home Sections (Achievements toggled off as instructed)
        home_sections = [
            {"type": "hero", "order": 0, "is_visible": True, "config": {}},
            {"type": "about", "order": 1, "is_visible": True, "config": {}},
            {
                "type": "vision_mission",
                "order": 2,
                "is_visible": True,
                "config": {
                    "vision_text": org.visi,
                    "mission_points": [
                        "Mewadahi dan memperjuangkan aspirasi mahasiswa STEM melalui mekanisme representasi serta advokasi yang aktif.",
                        "Mengembangkan potensi akademik, nonakademik, kreativitas, dan kepemimpinan mahasiswa melalui program kerja.",
                        "Memfasilitasi kolaborasi strategis antara mahasiswa STEM dengan civitas academica, alumni, dan mitra eksternal.",
                        "Menjalankan pengabdian masyarakat berbasis sains dan teknologi serta menjaga keberlanjutan regenerasi SISO.",
                    ],
                },
            },
            {"type": "highlighted_programs", "order": 3, "is_visible": True, "config": {}},
            {"type": "upcoming_events", "order": 4, "is_visible": True, "config": {}},
            # Achievement section toggled off by default in v3
            {"type": "student_achievements", "order": 5, "is_visible": False, "config": {}},
            {"type": "documentations", "order": 6, "is_visible": True, "config": {}},
            {
                "type": "social_media",
                "order": 7,
                "is_visible": True,
                "config": {
                    "posts": [
                        {"image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", "url": "https://www.instagram.com/siso.prasmul/"},
                        {"image": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop", "url": "https://www.instagram.com/siso.prasmul/"},
                        {"image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", "url": "https://www.instagram.com/siso.prasmul/"},
                        {"image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop", "url": "https://www.instagram.com/siso.prasmul/"},
                        {"image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop", "url": "https://www.instagram.com/siso.prasmul/"},
                        {"image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop", "url": "https://www.instagram.com/siso.prasmul/"},
                    ]
                },
            },
            {
                "type": "value_proposition",
                "order": 8,
                "is_visible": True,
                "config": {
                    "badge": "Peran & Fungsi Utama",
                    "title": "Core Pillars of SISO",
                    "subtitle": "Sebagai organisasi kemahasiswaan tingkat fakultas, SISO menjalankan tiga peran strategis yang berorientasi pada kepentingan mahasiswa (student-centered) dan kemitraan.",
                    "items": [
                        {
                            "title": "Representasi & Advokasi Mahasiswa",
                            "text": "Menjadi jembatan komunikasi resmi yang menghimpun, mengawal, dan memperjuangkan aspirasi serta kesejahteraan seluruh mahasiswa aktif Sekolah STEM (STEMians).",
                        },
                        {
                            "title": "Pengembangan Kapasitas & Kepemimpinan",
                            "text": "Membentuk karakter kepemimpinan, manajemen organisasi yang profesional, serta budaya kerja berbasis data (evidence-based) melalui pengalaman kepengurusan.",
                        },
                        {
                            "title": "Kolaborasi Eksternal & Pengabdian",
                            "text": "Membangun sinergi kemitraan strategis dengan korporasi, alumni, dan organisasi lain sekaligus menghadirkan program edukasi teknologi bagi masyarakat luas.",
                        },
                    ],
                },
            },
        ]

        for s in home_sections:
            Section.objects.update_or_create(
                page="home",
                section_type=s["type"],
                defaults={
                    "is_visible": s.get("is_visible", True),
                    "order": s["order"],
                    "config": s["config"],
                },
            )

        other_sections = [
            # About page
            {"page": "about", "type": "about", "order": 1, "is_visible": True, "config": {}},
            {"page": "about", "type": "vision_mission", "order": 2, "is_visible": True, "config": {}},
            {"page": "about", "type": "values", "order": 3, "is_visible": True, "config": {}},
            {"page": "about", "type": "philosophy", "order": 4, "is_visible": True, "config": {}},
            {"page": "about", "type": "structure", "order": 5, "is_visible": True, "config": {}},
            {"page": "about", "type": "recruitment", "order": 6, "is_visible": True, "config": {}},
            # Program page
            {"page": "program", "type": "hero", "order": 1, "is_visible": True, "config": {}},
            {"page": "program", "type": "filter", "order": 2, "is_visible": True, "config": {}},
            {"page": "program", "type": "catalog", "order": 3, "is_visible": True, "config": {}},
            {"page": "program", "type": "timeline", "order": 4, "is_visible": True, "config": {}},
            # Gallery page
            {"page": "gallery", "type": "hero", "order": 1, "is_visible": True, "config": {}},
            {"page": "gallery", "type": "filter", "order": 2, "is_visible": True, "config": {}},
            {"page": "gallery", "type": "photos", "order": 3, "is_visible": True, "config": {}},
            {"page": "gallery", "type": "videos", "order": 4, "is_visible": True, "config": {}},
            {"page": "gallery", "type": "events", "order": 5, "is_visible": True, "config": {}},
            {"page": "gallery", "type": "docs", "order": 6, "is_visible": True, "config": {}},
            # Articles & Achievements page
            {"page": "articles", "type": "hero", "order": 1, "is_visible": True, "config": {}},
            {"page": "articles", "type": "quick_nav", "order": 2, "is_visible": True, "config": {}},
            {"page": "articles", "type": "news", "order": 3, "is_visible": True, "config": {}},
            {"page": "articles", "type": "publications", "order": 4, "is_visible": True, "config": {}},
            {"page": "articles", "type": "research", "order": 5, "is_visible": True, "config": {}},
            {"page": "articles", "type": "achievements", "order": 6, "is_visible": False, "config": {}},  # Toggle off
            {"page": "articles", "type": "scholarships", "order": 7, "is_visible": True, "config": {}},
            {"page": "articles", "type": "competitions", "order": 8, "is_visible": True, "config": {}},
        ]
        for s in other_sections:
            Section.objects.update_or_create(
                page=s["page"],
                section_type=s["type"],
                defaults={
                    "is_visible": s.get("is_visible", True),
                    "order": s["order"],
                    "config": s["config"],
                },
            )
        self.stdout.write(self.style.SUCCESS("✓ All page sections configured"))

        # 3. 6 Signature Evergreen Programs (No STEM INC)
        programs_data = [
            {
                "title": "InnoFair: Annual STEM Innovation & Prototype Exhibition",
                "slug": "innofair-stem-innovation-exhibition",
                "category": "event",
                "description": (
                    "Pameran inovasi tahunan yang diselenggarakan SISO untuk mewadahi unjuk karya prototipe "
                    "mahasiswa, diskusi praktisi industri, dan kolaborasi publik."
                ),
                "date": datetime.date(2026, 4, 2),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Prog{r}amming: Interactive Coding & Game Development Workshop",
                "slug": "programming-interactive-coding-workshop",
                "category": "workshop",
                "description": (
                    "Program pelatihan pemrograman interaktif oleh SISO yang mengenalkan logika coding, "
                    "pembuatan gim sederhana, dan pengembangan aplikasi bagi pelajar."
                ),
                "date": datetime.date(2026, 11, 14),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Science Fun Day: Eksperimen Sains Aplikatif & Pengabdian Anak",
                "slug": "science-fun-day",
                "category": "pengmas",
                "description": (
                    "Program pengabdian masyarakat SISO berupa workshop eksperimen sains interaktif untuk "
                    "menumbuhkan rasa ingin tahu anak-anak terhadap ilmu pengetahuan alam."
                ),
                "date": datetime.date(2026, 11, 28),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Perspective: 3D Modeling & Engineering Design Workshop",
                "slug": "perspective-3d-modeling-workshop",
                "category": "workshop",
                "description": (
                    "Program pengembangan keterampilan teknis yang diselenggarakan SISO dengan fokus pada "
                    "pelatihan pemodelan tiga dimensi (3D modeling) dan desain produk."
                ),
                "date": datetime.date(2026, 9, 19),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Welcoming Night & SISO Day: Orientasi & Kaderisasi Internal",
                "slug": "welcoming-night-dan-siso-day",
                "category": "event",
                "description": (
                    "Program internalisasi tahunan SISO untuk menyambut mahasiswa baru sekaligus membekali "
                    "fungsionaris aktif dengan nilai budaya dan kepemimpinan organisasi."
                ),
                "date": datetime.date(2026, 9, 5),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": False,
                "is_visible": True,
            },
            {
                "title": "SISO Grand Assembly (SGA) & Suksesi Kepemimpinan Demokratis",
                "slug": "siso-grand-assembly-dan-pemilu",
                "category": "seminar",
                "description": (
                    "Forum permusyawaratan tertinggi SISO untuk pengesahan AD/ART, program kerja, dan LPJ, "
                    "serta penyelenggaraan Pemilu Ketua & Wakil Ketua secara demokratis."
                ),
                "date": datetime.date(2026, 8, 15),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": False,
                "is_visible": True,
            },
        ]

        active_slugs = [p["slug"] for p in programs_data]
        ProgramKerja.objects.exclude(slug__in=active_slugs).delete()

        for p in programs_data:
            ProgramKerja.objects.update_or_create(
                slug=p["slug"],
                defaults=p,
            )
        self.stdout.write(self.style.SUCCESS("✓ 6 Signature Evergreen Programs seeded (STEM INC removed)"))

        # 4. Old Achievements Cleared (Per RnD instruction to keep focus on Company Profile)
        Achievement.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("✓ Old achievements cleaned up (Section toggled off)"))

        # 5. 8 Official Divisions of SISO (Evergreen AD/ART Based)
        divisions_data = [
            {
                "name": "Event Planner (EP)",
                "slug": "event-planner",
                "jobdesc": (
                    "Unit kerja perencana dan pelaksana kegiatan besar (major events) di bawah naungan SISO bagi internal maupun eksternal Sekolah STEM:\n"
                    "• Merancang konsep kegiatan, proposal terstruktur, dan linimasa pelaksanaan untuk program kerja besar SISO seperti InnoFair, Prog{r}amming, Science Fun Day, dan Perspective.\n"
                    "• Mengoordinasikan pembentukan kepanitiaan pelaksana melalui mekanisme rekrutmen kepanitiaan yang transparan dan sesuai kebutuhan kegiatan.\n"
                    "• Memastikan seluruh penyelenggaraan acara memenuhi standar operasional prosedur (SOP) SISO serta ketentuan administratif BangKISI STEM dan Universitas.\n"
                    "• Menyusun laporan evaluasi dan pertanggungjawaban pelaksanaan kegiatan sebagai acuan keberlanjutan di periode berikutnya."
                ),
                "order": 1,
            },
            {
                "name": "Research and Development (R&D)",
                "slug": "research-and-development",
                "jobdesc": (
                    "Penggerak riset berbasis data (evidence-based), penjaringan aspirasi mahasiswa, serta evaluasi kualitas program kerja SISO:\n"
                    "• Menjalankan fungsi riset dan pengumpulan data (evidence-based) untuk memetakan kebutuhan, aspirasi, serta minat pengembangan diri mahasiswa aktif Sekolah STEM (STEMians).\n"
                    "• Melakukan kajian, monitoring, dan evaluasi terukur terhadap efektivitas pelaksanaan setiap program kerja SISO.\n"
                    "• Menyusun publikasi kajian keilmuan dan inovasi teknologi yang memperkaya wawasan civitas academica.\n"
                    "• Mengembangkan sistem dokumentasi pengetahuan dan inovasi organisasi guna menjamin transfer pengetahuan lintas periode kepengurusan."
                ),
                "order": 2,
            },
            {
                "name": "Human Resource (HR)",
                "slug": "human-resource",
                "jobdesc": (
                    "Pelaksana fungsi manajemen sumber daya manusia, rekrutmen fungsionaris, orientasi, dan pengembangan kapasitas internal SISO:\n"
                    "• Mengelola rangkaian rekrutmen dan seleksi calon fungsionaris SISO mulai dari screening CV dan Cover Letter hingga tahap wawancara secara objektif dan transparan.\n"
                    "• Menyelenggarakan proses pelantikan, orientasi fungsionaris (SISO Day), serta penyambutan mahasiswa baru (Welcoming Night).\n"
                    "• Menjaga kohesivitas, kinerja, dan kepatuhan fungsionaris terhadap kode etik serta ketentuan AD/ART SISO.\n"
                    "• Merancang program peningkatan kapasitas kepemimpinan dan kerja sama tim bagi seluruh fungsionaris aktif selama masa kepengurusan."
                ),
                "order": 3,
            },
            {
                "name": "Public Relation (PR)",
                "slug": "public-relation",
                "jobdesc": (
                    "Jembatan komunikasi kelembagaan, kemitraan strategis eksternal, serta advokasi dan kesejahteraan mahasiswa Sekolah STEM:\n"
                    "• Menjalankan fungsi representasi dan hubungan kelembagaan antara SISO dengan unit kemahasiswaan (BangKISI STEM dan SNA), organisasi mahasiswa lain, serta alumni.\n"
                    "• Mengembangkan kemitraan strategis dan kolaborasi produktif dengan industri, komunitas, sekolah mitra, dan institusi eksternal.\n"
                    "• Memfasilitasi saluran komunikasi, pelayanan informasi, serta penyerapan aspirasi dan advokasi kesejahteraan mahasiswa STEM.\n"
                    "• Menjaga reputasi dan citra kelembagaan SISO dalam setiap interaksi bilateral maupun multilateral dengan pemangku kepentingan."
                ),
                "order": 4,
            },
            {
                "name": "Financing",
                "slug": "financing",
                "jobdesc": (
                    "Penggerak kemandirian finansial SISO melalui penggalangan dana yang sah, kemitraan sponsorship, dan dukungan pihak eksternal:\n"
                    "• Merencanakan dan melaksanakan kegiatan penggalangan dana (fundraising) yang sah, kreatif, dan selaras dengan ketentuan Universitas Prasetiya Mulya.\n"
                    "• Menjalin kerja sama sponsorship, hibah, dan dukungan komersial dengan mitra eksternal untuk menopang keberlangsungan program kerja SISO.\n"
                    "• Berkoordinasi dengan Bendahara (Treasurer) dalam menjaga akuntabilitas dan transparansi pencatatan seluruh pemasukan dana usaha dan kemitraan.\n"
                    "• Memastikan pemenuhan kesepakatan kerja sama dengan pihak sponsor secara profesional dan bertanggung jawab."
                ),
                "order": 5,
            },
            {
                "name": "Online Media",
                "slug": "online-media",
                "jobdesc": (
                    "Pengelola kanal komunikasi resmi SISO untuk menjamin keterbukaan informasi, publikasi program, dan edukasi kreatif mahasiswa:\n"
                    "• Mengelola kanal komunikasi digital resmi SISO (@siso.prasmul dan website) sebagai wujud prinsip transparansi dan keterbukaan informasi organisasi.\n"
                    "• Menyebarluaskan pengumuman resmi organisasi, agenda kegiatan, hasil ketetapan publik, serta liputan program kerja kepada seluruh STEMians.\n"
                    "• Memproduksi konten komunikasi kreatif, siniar (podcast), dan rubrik edukatif yang relevan dengan kehidupan mahasiswa STEM.\n"
                    "• Menjaga etika komunikasi publik yang inklusif, non-partisan, dan profesional di seluruh platform media sosial SISO."
                ),
                "order": 6,
            },
            {
                "name": "Design",
                "slug": "design",
                "jobdesc": (
                    "Pengembang identitas visual dan komunikasi grafis SISO untuk seluruh kebutuhan publikasi, program kerja, dan atribut organisasi:\n"
                    "• Menyusun dan menjaga standar panduan identitas visual (visual guideline) organisasi agar tetap konsisten dan representatif.\n"
                    "• Merancang kebutuhan grafis untuk publikasi media sosial, situs web, materi pameran, serta kelengkapan visual seluruh program kerja SISO.\n"
                    "• Berkolaborasi erat dengan Online Media dan Documentation dalam mengemas informasi organisasi secara komunikatif dan estetis.\n"
                    "• Mengelola aset desain organisasi sebagai bagian dari kekayaan intelektual nonfisik SISO yang diwariskan lintas periode."
                ),
                "order": 7,
            },
            {
                "name": "Documentation",
                "slug": "documentation",
                "jobdesc": (
                    "Penjaga memori kolektif dan arsip visual SISO melalui peliputan fotografi, videografi, serta dokumentasi resmi kegiatan organisasi:\n"
                    "• Melaksanakan peliputan foto dan video pada seluruh program kerja, rapat, sidang SISO Grand Assembly (SGA), serta agenda resmi organisasi.\n"
                    "• Memproduksi karya audio-visual seperti profil kepengurusan, video dokumentasi kegiatan, dan rekapitulasi perjalanan organisasi (aftermovie).\n"
                    "• Menata sistem pengarsipan dokumentasi multimedia secara terpusat untuk mendukung penyusunan Laporan Pertanggungjawaban (LPJ) dan keberlanjutan sejarah SISO."
                ),
                "order": 8,
            },
        ]

        div_map = {}
        for d in divisions_data:
            div_obj, _ = Division.objects.update_or_create(
                slug=d["slug"],
                defaults=d,
            )
            div_map[d["slug"]] = div_obj
        self.stdout.write(self.style.SUCCESS("✓ 8 Official Divisions seeded"))

        # 6. BPH Members (Evergreen governance titles)
        members_data = [
            {
                "name": "Chairman (Ketua SISO)",
                "role": "Chairman (Ketua SISO)",
                "order": 1,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Vice / Co-Chairman (Wakil Ketua)",
                "role": "Vice / Co-Chairman (Wakil Ketua)",
                "order": 2,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Secretary (Sekretaris)",
                "role": "Secretary (Sekretaris)",
                "order": 3,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Treasurer (Bendahara)",
                "role": "Treasurer (Bendahara)",
                "order": 4,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Coordinator of Event Planner",
                "role": "Division Coordinator",
                "order": 5,
                "generation_year": 2026,
                "division": div_map["event-planner"],
            },
            {
                "name": "Coordinator of Research & Development",
                "role": "Division Coordinator",
                "order": 6,
                "generation_year": 2026,
                "division": div_map["research-and-development"],
            },
            {
                "name": "Coordinator of Human Resource",
                "role": "Division Coordinator",
                "order": 7,
                "generation_year": 2026,
                "division": div_map["human-resource"],
            },
            {
                "name": "Coordinator of Public Relation",
                "role": "Division Coordinator",
                "order": 8,
                "generation_year": 2026,
                "division": div_map["public-relation"],
            },
            {
                "name": "Coordinator of Financing",
                "role": "Division Coordinator",
                "order": 9,
                "generation_year": 2026,
                "division": div_map["financing"],
            },
            {
                "name": "Coordinator of Online Media",
                "role": "Division Coordinator",
                "order": 10,
                "generation_year": 2026,
                "division": div_map["online-media"],
            },
            {
                "name": "Coordinator of Design",
                "role": "Division Coordinator",
                "order": 11,
                "generation_year": 2026,
                "division": div_map["design"],
            },
            {
                "name": "Coordinator of Documentation",
                "role": "Division Coordinator",
                "order": 12,
                "generation_year": 2026,
                "division": div_map["documentation"],
            },
            # 2025 Archive BPH Members
            {
                "name": "Demisioner Chairman (Ketua SISO 2025)",
                "role": "Chairman (Ketua SISO)",
                "order": 1,
                "generation_year": 2025,
                "division": None,
            },
            {
                "name": "Demisioner Vice Chairman (Wakil Ketua 2025)",
                "role": "Vice / Co-Chairman (Wakil Ketua)",
                "order": 2,
                "generation_year": 2025,
                "division": None,
            },
            {
                "name": "Demisioner Secretary (Sekretaris 2025)",
                "role": "Secretary (Sekretaris)",
                "order": 3,
                "generation_year": 2025,
                "division": None,
            },
            {
                "name": "Demisioner Treasurer (Bendahara 2025)",
                "role": "Treasurer (Bendahara)",
                "order": 4,
                "generation_year": 2025,
                "division": None,
            },
            {
                "name": "Demisioner Coordinator Event Planner 2025",
                "role": "Division Coordinator",
                "order": 5,
                "generation_year": 2025,
                "division": div_map["event-planner"],
            },
            {
                "name": "Demisioner Coordinator R&D 2025",
                "role": "Division Coordinator",
                "order": 6,
                "generation_year": 2025,
                "division": div_map["research-and-development"],
            },
        ]

        # Clean old named members and update with evergreen roles
        BPHMember.objects.all().delete()
        for m in members_data:
            BPHMember.objects.create(**m)
        self.stdout.write(self.style.SUCCESS("✓ BPH & Division Coordinators seeded (2026 Active & 2025 Archive)"))

        # 7. Articles (2 Official Evergreen Articles based on AD/ART)
        articles_data = [
            {
                "title": "Peran SISO sebagai Organisasi Kemahasiswaan Tingkat Fakultas dalam Mewadahi Aspirasi dan Kolaborasi STEMians",
                "slug": "peran-siso-sebagai-organisasi-kemahasiswaan-tingkat-fakultas",
                "category": "jurnal",
                "published_at": datetime.datetime(2026, 9, 8, 9, 0, 0, tzinfo=datetime.timezone.utc),
                "is_visible": True,
                "body": (
                    "Di dalam ekosistem pendidikan tinggi, keberadaan organisasi kemahasiswaan tingkat fakultas memegang peranan vital sebagai jembatan antara mahasiswa, institusi akademik, dan masyarakat luas. Di lingkungan Sekolah STEM Universitas Prasetiya Mulya, mandat tersebut diemban secara resmi oleh STEM Prasetiya Mulya Innovation Student Organization (SISO).\n\n"
                    "Berdasarkan Anggaran Dasar SISO Bab I Pasal 1, SISO berkedudukan sebagai organisasi kemahasiswaan tingkat fakultas yang bersifat otonom, demokratis, independen, inklusif, kolaboratif, nirlaba, serta non-partisan. Sifat kesinambungan kelembagaan yang dimiliki SISO memastikan bahwa identitas, nilai perjuangan, dan sistem tata kelola organisasi terus terjaga serta diwariskan secara berkelanjutan meskipun terjadi pergantian kepengurusan setiap tahunnya.\n\n"
                    "Empat Fungsi Utama bagi Seluruh STEMians\n"
                    "Sebagai wadah resmi bagi seluruh mahasiswa aktif Sekolah STEM (STEMians), SISO menjalankan empat fungsi utama:\n"
                    "1. Fungsi Representasi dan Advokasi: Menghimpun, menyalurkan, dan memperjuangkan aspirasi serta kebutuhan mahasiswa melalui komunikasi kelembagaan yang konstruktif bersama Bagian Pengembangan Karakter Inovatif STEM (BangKISI STEM) dan unit tingkat universitas.\n"
                    "2. Fungsi Pengembangan Kapasitas: Menyediakan ruang belajar di luar kelas melalui pengelolaan organisasi, kepemimpinan, manajemen proyek, serta penyelenggaraan lokakarya teknis seperti Prog{r}amming dan Perspective.\n"
                    "3. Fungsi Kolaborasi Lintas Disiplin dan Eksternal: Mempertemukan mahasiswa dari berbagai program studi STEM untuk bersinergi dengan alumni, praktisi industri, dan mitra eksternal, salah satunya melalui pameran inovasi tahunan InnoFair.\n"
                    "4. Fungsi Pengabdian Masyarakat: Menghadirkan kontribusi nyata bagi lingkungan sekitar melalui kegiatan edukasi sains aplikatif seperti Science Fun Day.\n\n"
                    "Tata Kelola yang Demokratis dan Akuntabel\n"
                    "Seluruh pengambilan keputusan strategis di dalam SISO berlandaskan asas kedaulatan mahasiswa melalui forum tertinggi SISO Grand Assembly (SGA) serta mekanisme Pemilihan Umum (Pemilu) berprinsip one student, one vote. Dengan berpegang teguh pada enam nilai dasar—Caring, Humility, Achieving, Integrity, Non-discrimination, dan Innovation—SISO berkomitmen untuk terus menjadi rumah bertumbuh yang inklusif dan profesional bagi setiap generasi STEMians."
                ),
            },
            {
                "title": "Penerapan Prinsip Student-Centered dan Evidence-Based dalam Perencanaan Program Kerja SISO",
                "slug": "penerapan-prinsip-student-centered-dan-evidence-based-siso",
                "category": "kajian",
                "published_at": datetime.datetime(2026, 8, 25, 14, 30, 0, tzinfo=datetime.timezone.utc),
                "is_visible": True,
                "body": (
                    "Sebuah organisasi kemahasiswaan yang relevan adalah organisasi yang mampu mendengar kebutuhan anggotanya secara presisi dan menerjemahkannya ke dalam program kerja yang tepat sasaran. Dalam Anggaran Dasar SISO Pasal 6, dua prinsip operasional yang menjadi tulang punggung penyusunan kebijakan organisasi adalah prinsip Student-Centered (berpusat pada mahasiswa) dan Evidence-Based (berbasis bukti dan data).\n\n"
                    "Mengapa Pendekatan Evidence-Based Penting bagi BEM Fakultas?\n"
                    "Sebagai organisasi yang tumbuh di lingkungan sains, teknologi, rekayasa, dan matematika, SISO menjadikan pemikiran kritis, data, dan pendekatan rasional sebagai landasan dalam memecahkan permasalahan organisasi. Setiap program kerja yang diajukan oleh departemen maupun Event Planner tidak hanya disusun berdasarkan rutinitas tahunan, melainkan harus didahului oleh pemetaan kebutuhan mahasiswa, analisis kelayakan proposal, serta penetapan indikator keberhasilan yang terukur.\n\n"
                    "Siklus Perencanaan, Audit, dan Evaluasi Berkelanjutan\n"
                    "Mengacu pada Anggaran Rumah Tangga SISO Bab X dan Bab XI, setiap pelaksanaan kegiatan wajib melewati tahapan tata kelola yang ketat:\n"
                    "- Perencanaan Terstruktur: Penyusunan proposal kegiatan dan linimasa realistis yang ditinjau serta disetujui oleh Badan Pengurus Harian (BPH) sebelum dieksekusi.\n"
                    "- Penjaringan Aspirasi dan Evaluasi R&D: Pengumpulan umpan balik peserta serta survei kepuasan pasca-kegiatan untuk mengukur dampak riil program terhadap pengembangan kompetensi internal maupun masyarakat eksternal.\n"
                    "- Transparansi dan Audit Internal: Pengelolaan sumber daya finansial—baik dari alokasi universitas, iuran yang disepakati di SGA, penggalangan dana, maupun sponsorship—wajib melalui mekanisme audit internal independen serta dipertanggungjawabkan secara terbuka dalam Laporan Pertanggungjawaban (LPJ) di forum SISO Grand Assembly.\n\n"
                    "Melalui perpaduan prinsip Student-Centered dan Evidence-Based ini, SISO memastikan setiap sumber daya organisasi dikelola secara efektif, akuntabel, dan memberikan nilai tambah yang berkelanjutan bagi seluruh keluarga besar Sekolah STEM Universitas Prasetiya Mulya."
                ),
            },
        ]

        active_art_slugs = [a["slug"] for a in articles_data]
        Article.objects.exclude(slug__in=active_art_slugs).delete()

        for art in articles_data:
            Article.objects.update_or_create(
                slug=art["slug"],
                defaults=art,
            )
        self.stdout.write(self.style.SUCCESS("✓ 2 Evergreen Articles seeded"))

        self.stdout.write(self.style.SUCCESS("All official SISO RnD v3 evergreen data successfully seeded!"))
