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
    help = "Seeds the database with official copywriting and factual data from SISO RnD."

    def handle(self, *args, **options):
        self.stdout.write("Seeding official SISO RnD data...")

        # 1. Organization
        org = Organization.objects.get_or_create_singleton()
        org.slogan = "With STEM We Can: Innovate to Elevate Future Leaders"
        org.visi = (
            "Menjadi wadah perhimpunan yang terbuka dan sinergis dalam menjembatani "
            "pengembangan potensi akademik, kepemimpinan, serta inovasi teknologi "
            "mahasiswa School of STEM Universitas Prasetiya Mulya secara aktif dan dinamis."
        )
        org.misi = (
            "1. Mewadahi pengembangan soft skills kepemimpinan, komunikasi, dan kerja sama tim lintas jurusan STEM.\n"
            "2. Menyelenggarakan pameran prototipe, kompetisi sains-teknologi, dan pelatihan teknis yang aplikatif.\n"
            "3. Memperkenalkan keunggulan inovasi mahasiswa STEM Prasetiya Mulya kepada industri dan masyarakat umum.\n"
            "4. Mempererat rasa kekeluargaan internal serta memperluas jejaring profesional bersama alumni dan mitra."
        )
        org.nilai = ["Caring", "Humility", "Achievement", "Integrity"]
        org.filosofi_logo = (
            "1. Burung Phoenix (Transformasi & Resiliensi): Melambangkan daya juang pantang menyerah, pembaruan berkelanjutan, dan semangat mahasiswa STEM Prasmul untuk terbang tinggi memimpin perubahan teknologi.\n"
            "2. Struktur Atom & Jejaring Saintifik: Simbol ikatan molekular di bagian atas mencerminkan fondasi riset sains terapan dan keterhubungan erat antara enam program studi di School of STEM.\n"
            "3. Kepakan Sayap Dinamis (With STEM We Can): Garis lengkung sayap yang dinamis dan adaptif melambangkan kelincahan berpikir, kreativitas tanpa batas, serta kesiapan menghadapi disrupsi industri.\n"
            "4. Harmoni Warna Biru Navy & Putih: Biru tua merepresentasikan kedalaman intelektual, profesionalisme, dan ketenangan analitis, sedangkan putih melambangkan integritas dan ketulusan mengabdi."
        )
        org.save()
        self.stdout.write(self.style.SUCCESS("✓ Organization updated"))

        # 2. Home Sections
        home_sections = [
            {"type": "hero", "order": 0, "config": {}},
            {"type": "about", "order": 1, "config": {}},
            {
                "type": "vision_mission",
                "order": 2,
                "config": {
                    "vision_text": org.visi,
                    "mission_points": [
                        "Mewadahi pengembangan soft skills kepemimpinan, komunikasi, dan kerja sama tim lintas jurusan STEM.",
                        "Menyelenggarakan pameran prototipe, kompetisi sains-teknologi, dan pelatihan teknis yang aplikatif.",
                        "Memperkenalkan keunggulan inovasi mahasiswa STEM Prasetiya Mulya kepada industri dan masyarakat umum.",
                        "Mempererat rasa kekeluargaan internal serta memperluas jejaring profesional bersama alumni dan mitra.",
                    ],
                },
            },
            {"type": "highlighted_programs", "order": 3, "config": {}},
            {"type": "upcoming_events", "order": 4, "config": {}},
            {"type": "student_achievements", "order": 5, "config": {}},
            {"type": "documentations", "order": 6, "config": {}},
            {
                "type": "social_media",
                "order": 7,
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
                "config": {
                    "badge": "Keunggulan Utama Kami",
                    "title": "Why SISO Prasetiya Mulya?",
                    "subtitle": "Mengintegrasikan keunggulan rekayasa sains-teknologi dengan ketajaman bisnis khas Prasetiya Mulya untuk mencetak technopreneur dan pemimpin masa depan.",
                    "items": [
                        {
                            "title": "Sinergi Lintas 6 Program Studi STEM",
                            "text": "Mempertemukan mahasiswa AI & Robotics, Matematika Bisnis, Software, Pangan, Desain Produk, dan Energi Terbarukan dalam satu ekosistem kolaboratif.",
                        },
                        {
                            "title": "DNA Technopreneurship & Prototipe Riil",
                            "text": "Tidak sekadar merancang teknologi di laboratorium, kami mendorong hilirisasi prototipe inovatif yang siap divalidasi oleh industri dan pasar nyata.",
                        },
                        {
                            "title": "Koneksi Industri & Dampak Sosial Luas",
                            "text": "Menghubungkan mahasiswa dengan praktisi korporasi global sekaligus mengedukasi generasi muda Indonesia melalui pengabdian sains dan pemrograman.",
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
                    "is_visible": True,
                    "order": s["order"],
                    "config": s["config"],
                },
            )

        other_sections = [
            # About page
            {"page": "about", "type": "about", "order": 1, "config": {}},
            {"page": "about", "type": "vision_mission", "order": 2, "config": {}},
            {"page": "about", "type": "values", "order": 3, "config": {}},
            {"page": "about", "type": "philosophy", "order": 4, "config": {}},
            {"page": "about", "type": "structure", "order": 5, "config": {}},
            {"page": "about", "type": "recruitment", "order": 6, "config": {}},
            # Program page
            {"page": "program", "type": "hero", "order": 1, "config": {}},
            {"page": "program", "type": "filter", "order": 2, "config": {}},
            {"page": "program", "type": "catalog", "order": 3, "config": {}},
            {"page": "program", "type": "timeline", "order": 4, "config": {}},
            # Gallery page
            {"page": "gallery", "type": "hero", "order": 1, "config": {}},
            {"page": "gallery", "type": "filter", "order": 2, "config": {}},
            {"page": "gallery", "type": "photos", "order": 3, "config": {}},
            {"page": "gallery", "type": "videos", "order": 4, "config": {}},
            {"page": "gallery", "type": "events", "order": 5, "config": {}},
            {"page": "gallery", "type": "docs", "order": 6, "config": {}},
            # Articles & Achievements page
            {"page": "articles", "type": "hero", "order": 1, "config": {}},
            {"page": "articles", "type": "quick_nav", "order": 2, "config": {}},
            {"page": "articles", "type": "news", "order": 3, "config": {}},
            {"page": "articles", "type": "publications", "order": 4, "config": {}},
            {"page": "articles", "type": "research", "order": 5, "config": {}},
            {"page": "articles", "type": "achievements", "order": 6, "config": {}},
            {"page": "articles", "type": "scholarships", "order": 7, "config": {}},
            {"page": "articles", "type": "competitions", "order": 8, "config": {}},
        ]
        for s in other_sections:
            Section.objects.update_or_create(
                page=s["page"],
                section_type=s["type"],
                defaults={
                    "is_visible": True,
                    "order": s["order"],
                    "config": s["config"],
                },
            )
        self.stdout.write(self.style.SUCCESS("✓ All page sections configured"))

        # 3. 6 Signature Programs from SISO RnD
        programs_data = [
            {
                "title": "InnoFair 2026: Annual STEM Innovation & Prototype Exhibition",
                "slug": "innofair-2026-stem-innovation-exhibition",
                "category": "event",
                "description": (
                    "Pameran inovasi tahunan terbesar SISO yang menampilkan prototipe mahasiswa "
                    "School of STEM, talkshow praktisi, dan jejaring bersama pelaku industri."
                ),
                "date": datetime.date(2026, 4, 2),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://bit.ly/Kehadiran_Penonton_InnoFair_2026",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "STEM INC 2026: Science, Technology, Engineering, and Mathematics Innovation Challenge",
                "slug": "stem-inc-2026-innovation-challenge",
                "category": "competition",
                "description": (
                    "Kompetisi nasional tahunan bagi siswa SMA/sederajat untuk mengasah ideation, "
                    "problem solving, dan inovasi berkelanjutan melalui Poster Research & Rally."
                ),
                "date": datetime.date(2026, 6, 26),
                "location": "Kampus BSD Prasetiya Mulya & Hybrid Online",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Prog{r}amming 9.0: Interactive Coding & Game Development Workshop",
                "slug": "programming-9-interactive-coding-workshop",
                "category": "workshop",
                "description": (
                    "Workshop interaktif yang mengenalkan dunia coding, pembuatan video game Scratch, "
                    "dan bahasa pemrograman Python secara menyenangkan bagi pelajar SD hingga SMA."
                ),
                "date": datetime.date(2026, 11, 14),
                "location": "Laboratorium Komputer Kampus BSD Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Science Fun Day: Eksperimen Sains Interaktif Anak Indonesia",
                "slug": "science-fun-day-eksperimen-sains-anak",
                "category": "pengmas",
                "description": (
                    "Kegiatan edukasi sains menyenangkan bagi anak usia 5–13 tahun melalui eksperimen "
                    "langsung pembuatan lava lamp, roket miniatur, hingga robotika sederhana."
                ),
                "date": datetime.date(2026, 11, 28),
                "location": "Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Perspective: 3D Modeling & Product Prototyping Workshop",
                "slug": "perspective-3d-modeling-prototyping-workshop",
                "category": "workshop",
                "description": (
                    "Pelatihan teknis dan ajang kreativitas SISO yang berfokus pada penguasaan 3D modeling, "
                    "rekayasa desain produk, serta visualisasi prototipe tiga dimensi."
                ),
                "date": datetime.date(2026, 9, 19),
                "location": "Design & Prototyping Lab Kampus BSD Prasmul",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": False,
                "is_visible": True,
            },
            {
                "title": "Welcoming Night & SISO Day: Penyambutan & Leadership Upgrading",
                "slug": "welcoming-night-dan-siso-day",
                "category": "event",
                "description": (
                    "Agenda internal tahunan untuk menyambut mahasiswa baru School of STEM "
                    "sekaligus membekali pengurus SISO dengan pelatihan teamwork dan kepemimpinan."
                ),
                "date": datetime.date(2026, 9, 5),
                "location": "Auditorium Kampus BSD Universitas Prasetiya Mulya",
                "registration_url": "https://www.instagram.com/siso.prasmul/",
                "is_featured": False,
                "is_visible": True,
            },
        ]

        for p in programs_data:
            ProgramKerja.objects.update_or_create(
                slug=p["slug"],
                defaults=p,
            )
        self.stdout.write(self.style.SUCCESS("✓ 6 Signature Programs seeded"))

        # 4. 5 Real Achievements from STEM Prasmul
        achievements_data = [
            {
                "student_name": "Merrilyn Pauliusman (S1 Business Mathematics)",
                "title": "Juara 2 Internasional — StudentsxCEOs 13th Grand Summit Business Case Competition",
                "description": (
                    "Mengungguli 192 peserta dari 23 universitas dan 4 negara melalui solusi strategis "
                    "BOSCH2Business dan BOSCH2Boosting untuk tantangan bisnis OCBC Ventura & BOSCH Automotive."
                ),
                "date": datetime.date(2024, 9, 27),
            },
            {
                "student_name": "Tim ABC — Bun Richita L., Clara Ferlin H., & Angelia Utojo (S1 FBT)",
                "title": "Juara 1 — Regional Competition PEP Pitch oleh PepsiCo Indonesia",
                "description": (
                    "Meraih juara pertama melalui inovasi produk kuliner streetfood terintegrasi beserta analisis "
                    "rantai pasok, validasi pasar, dan proyeksi finansial di hadapan eksekutif PepsiCo."
                ),
                "date": datetime.date(2024, 6, 4),
            },
            {
                "student_name": "Tim Software Engineering School of STEM Prasetiya Mulya",
                "title": "Juara 2 Nasional Game Development — CODIG Competition 2.0",
                "description": (
                    "Merancang aplikasi permainan edukatif 'Trash Sea' yang mengangkat misi penyelamatan "
                    "ekosistem laut Indonesia dari pencemaran sampah plastik di bawah bimbingan dosen STEM."
                ),
                "date": datetime.date(2025, 8, 26),
            },
            {
                "student_name": "Delegasi Mahasiswa S1 Product Design Innovation STEM Prasmul",
                "title": "Juara 1 Nasional Digital Poster — Festival Nasional Wirausaha Muda Udayana",
                "description": (
                    "Menciptakan inovasi aplikasi telemedis reservasi ambulans darurat 'iMoonApp' yang dilengkapi "
                    "fitur live tracking armada dan konsultasi dokter 1-on-1 bagi pasien kritis."
                ),
                "date": datetime.date(2025, 9, 10),
            },
            {
                "student_name": "Avril Lawrencia (Business Math) & Ferdinand Lunardy (AI & Robotics)",
                "title": "Awardee Indonesian International Student Mobility Awards (IISMA)",
                "description": (
                    "Terpilih mewakili mahasiswa School of STEM Prasetiya Mulya dalam program pertukaran pelajar "
                    "internasional ke Korea University dan National Taipei University of Technology."
                ),
                "date": datetime.date(2024, 8, 20),
            },
        ]

        for a in achievements_data:
            Achievement.objects.update_or_create(
                title=a["title"],
                defaults=a,
            )
        self.stdout.write(self.style.SUCCESS("✓ 5 Real Achievements seeded"))

        # 5. 8 Official Divisions of SISO
        divisions_data = [
            {
                "name": "Event Planner",
                "slug": "event-planner",
                "jobdesc": (
                    "Motor penggerak perencanaan konsep, manajemen kepanitiaan, dan eksekusi lima signature events tahunan SISO Prasmul:\n"
                    "• Merancang konsep kreatif, rundown, dan manajemen proyek untuk lima program unggulan: InnoFair, STEM INC, Prog{r}amming, Science Fun Day, dan Perspective.\n"
                    "• Membentuk dan membina kepanitiaan pelaksana agar setiap acara berjalan tepat waktu, terukur, dan berdampak luas.\n"
                    "• Berkoordinasi lintas divisi terkait kebutuhan logistik, perizinan kampus, narasumber industri, serta publikasi acara."
                ),
                "order": 1,
            },
            {
                "name": "Research and Development (R&D)",
                "slug": "research-and-development",
                "jobdesc": (
                    "Pusat riset kebutuhan mahasiswa, evaluasi mutu program kerja berkelanjutan, serta pengembangan kajian inovasi sains & teknologi:\n"
                    "• Menginisiasi riset dan penjaringan aspirasi mahasiswa School of STEM guna merumuskan program kerja yang relevan dengan tren teknologi terkini.\n"
                    "• Menyusun instrumen survei kepuasan peserta dan melakukan evaluasi berbasis data atas setiap program kerja SISO secara berkelanjutan.\n"
                    "• Mengembangkan rubrik kajian ilmiah, literatur teknologi terapan, serta kurasi informasi kompetisi dan beasiswa bagi civitas STEM Prasmul."
                ),
                "order": 2,
            },
            {
                "name": "Human Resource (HR)",
                "slug": "human-resource",
                "jobdesc": (
                    "Penjaga harmoni kekeluargaan internal, penggerak kaderisasi kepemimpinan, dan fasilitator pengembangan kapasitas pengurus SISO:\n"
                    "• Menyelenggarakan proses Open Recruitment pengurus baru, pemetaan minat-bakat, serta penempatan staf di setiap divisi secara optimal.\n"
                    "• Merancang program Welcoming Night untuk menyambut mahasiswa baru School of STEM dan memperkenalkan budaya akademik di enam program studi.\n"
                    "• Mengadakan SISO Day sebagai wadah penguatan ikatan kekeluargaan (bonding) sekaligus pelatihan teamwork dan leadership bagi seluruh anggota aktif."
                ),
                "order": 3,
            },
            {
                "name": "Public Relation (PR)",
                "slug": "public-relation",
                "jobdesc": (
                    "Wajah representasi eksternal SISO dalam menjalin kemitraan strategis dengan industri, sekolah mitra, media, dan himpunan kampus lain:\n"
                    "• Membangun dan menjaga hubungan baik dengan pemangku kepentingan eksternal, termasuk korporasi mitra, praktisi industri, alumni, dan media partner.\n"
                    "• Mengoordinasikan undangan sosialisasi dan roadshow kegiatan eksternal SISO ke berbagai SMA/SMP sederajat.\n"
                    "• Menjadi penghubung resmi komunikasi antara SISO dengan dekanat School of STEM, Student Board, dan organisasi mahasiswa kampus lain."
                ),
                "order": 4,
            },
            {
                "name": "Financing",
                "slug": "financing",
                "jobdesc": (
                    "Penggerak kemandirian finansial organisasi melalui strategi sponsorship korporasi, kemitraan komersial, dan usaha kreatif himpunan:\n"
                    "• Menyusun penawaran kerja sama sponsorship dan negosiasi pendanaan dengan perusahaan mitra untuk mendukung event besar SISO.\n"
                    "• Mengembangkan inisiatif fundraising kreatif, penjualan merchandise resmi STEM/SISO, serta program kemitraan bernilai tambah.\n"
                    "• Bersinergi erat dengan Treasurer dalam memastikan ketersediaan dana operasional bagi seluruh divisi dan kepanitiaan."
                ),
                "order": 5,
            },
            {
                "name": "Online Media",
                "slug": "online-media",
                "jobdesc": (
                    "Pengelola ekosistem komunikasi digital, strategi konten kreatif Instagram @siso.prasmul, serta produksi siniar (podcast) edukatif:\n"
                    "• Merencanakan kalender editorial dan mengelola akun media sosial resmi SISO (@siso.prasmul) agar selalu aktif, informatif, dan interaktif.\n"
                    "• Memproduksi konten edukasi populer seputar fakta sains, inovasi teknologi, kehidupan kampus STEM, serta liputan langsung kegiatan himpunan.\n"
                    "• Mengembangkan program podcast SISO untuk mengasah keterampilan komunikasi, public speaking, dan sound engineering anggota."
                ),
                "order": 6,
            },
            {
                "name": "Design",
                "slug": "design",
                "jobdesc": (
                    "Arsitek identitas visual SISO yang menerjemahkan gagasan sains dan teknologi ke dalam karya desain grafis yang modern dan estetis:\n"
                    "• Merancang panduan identitas visual (brand guideline) kepengurusan tahunan serta aset grafis untuk seluruh kanal publikasi SISO.\n"
                    "• Memproduksi materi desain unggahan media sosial, poster acara, spanduk pameran, buku panduan lomba, hingga tata letak panggung kegiatan.\n"
                    "• Menjaga konsistensi estetika dan standar kualitas desain pada setiap materi komunikasi internal maupun eksternal himpunan."
                ),
                "order": 7,
            },
            {
                "name": "Documentation",
                "slug": "documentation",
                "jobdesc": (
                    "Perekam jejak sejarah SISO melalui fotografi jurnalistik, produksi video teaser, dan penyuntingan aftermovie kegiatan yang sinematik:\n"
                    "• Melakukan peliputan foto dan video pada seluruh rangkaian kegiatan internal maupun eksternal yang diselenggarakan oleh SISO Prasmul.\n"
                    "• Memproduksi video profil kepengurusan (Meet Our Team), video teaser promosi acara, serta aftermovie resmi pasca-kegiatan.\n"
                    "• Mengelola pengarsipan aset multimedia organisasi secara terstruktur agar mudah diakses untuk kebutuhan publikasi website dan LPJ tahunan."
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

        # 6. BPH Members (Official data from RnD)
        members_data = [
            {
                "name": "I Putu Ary Raditya",
                "role": "Chairman (Ketua Himpunan)",
                "order": 1,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Co-Chairman SISO",
                "role": "Co-Chairman (Wakil Ketua)",
                "order": 2,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Secretary General",
                "role": "Secretary (Sekretaris Umum)",
                "order": 3,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Rona Salsabila",
                "role": "Treasurer (Bendahara Umum)",
                "order": 4,
                "generation_year": 2026,
                "division": None,
            },
            {
                "name": "Head of Event Planner",
                "role": "Head of Division",
                "order": 5,
                "generation_year": 2026,
                "division": div_map["event-planner"],
            },
            {
                "name": "Head of Research & Development",
                "role": "Head of Division",
                "order": 6,
                "generation_year": 2026,
                "division": div_map["research-and-development"],
            },
            {
                "name": "Head of Human Resource",
                "role": "Head of Division",
                "order": 7,
                "generation_year": 2026,
                "division": div_map["human-resource"],
            },
            {
                "name": "Head of Public Relation",
                "role": "Head of Division",
                "order": 8,
                "generation_year": 2026,
                "division": div_map["public-relation"],
            },
            {
                "name": "Head of Financing",
                "role": "Head of Division",
                "order": 9,
                "generation_year": 2026,
                "division": div_map["financing"],
            },
            {
                "name": "Head of Online Media",
                "role": "Head of Division",
                "order": 10,
                "generation_year": 2026,
                "division": div_map["online-media"],
            },
            {
                "name": "Head of Design",
                "role": "Head of Division",
                "order": 11,
                "generation_year": 2026,
                "division": div_map["design"],
            },
            {
                "name": "Head of Documentation",
                "role": "Head of Division",
                "order": 12,
                "generation_year": 2026,
                "division": div_map["documentation"],
            },
        ]

        for m in members_data:
            BPHMember.objects.update_or_create(
                name=m["name"],
                generation_year=m["generation_year"],
                defaults=m,
            )
        self.stdout.write(self.style.SUCCESS("✓ BPH & Division Heads seeded"))

        # 7. Articles from STEM Prasmul Research
        articles_data = [
            {
                "title": "Enam Inovasi Game Changer Karya Mahasiswa STEM Prasetiya Mulya yang Menjawab Tantangan Industri",
                "slug": "enam-inovasi-game-changer-mahasiswa-stem-prasetiya-mulya",
                "category": "jurnal",
                "published_at": datetime.datetime(2026, 9, 8, 9, 0, 0, tzinfo=datetime.timezone.utc),
                "is_visible": True,
                "body": (
                    "Inovasi sejati lahir ketika penguasaan sains dan rekayasa teknologi dipadukan dengan kepekaan membaca kebutuhan masyarakat serta dunia industri. "
                    "Di lingkungan School of STEM Universitas Prasetiya Mulya, semangat bereksperimen lintas disiplin tersebut terus melahirkan berbagai prototipe dan solusi aplikatif yang diakui oleh korporasi nasional maupun global.\n\n"
                    "1. Waste Warrior & Hologram Buffet (HOBU) untuk Industri Perhotelan\n"
                    "Berangkat dari permasalahan limbah makanan harian di sektor perhotelan, Valen Meicella Ishen (S1 Digital Business Technology) bersama tim lintas universitas merancang 'Waste Warrior' pada ajang kompetisi internasional IN2FOOD. Sistem ini melacak volume limbah makanan harian hotel sekaligus menghadirkan fitur gamifikasi berupa leaderboard kebersihan antar-properti. Di ajang yang sama, Alexander Bryan (S1 Food Business Technology) menghadirkan 'HOBU (Hologram Buffet)', teknologi proyeksi hologram pada live cooking station untuk memvisualisasikan sajian kuliner secara realistis tanpa memicu pemborosan makanan fisik. Kedua inovasi ini sukses memikat perhatian jaringan perhotelan global Marriott International.\n\n"
                    "2. Sistem Pemantauan Meter Listrik Off-Grid Berbasis AI & OCR\n"
                    "Di ranah rekayasa sistem komputer dan IoT, Muhammad Cakra Dwi Putra mengaplikasikan ilmu Artificial Intelligence (AI), Machine Learning (ML), dan Internet of Things (IoT) saat menjalani program magang industri di XL Axiata. Ia mengembangkan sistem berbasis Optical Character Recognition (OCR) yang mampu membaca digit angka pada kWh meter listrik secara otomatis dan mentransmisikan datanya secara real-time ke dasbor pemantauan berbasis web.\n\n"
                    "3. Pompa Air Tenaga Surya (PV System) untuk Lahan Kering Gunungkidul\n"
                    "Solusi berdampak langsung bagi masyarakat pedesaan juga dihadirkan oleh David Setianto Yustus dan tim mahasiswa energi terbarukan di Desa Wiladeg, Gunungkidul. Memanfaatkan melimpahnya radiasi energi matahari dan sumber air setempat, tim merancang bangun Pembangkit Listrik Tenaga Surya (PLTS) dari tahap survei hingga commissioning untuk menggerakkan pompa irigasi agrosilvopastoral. Kehadiran irigasi tenaga surya ini memungkinkan lahan tetap produktif di musim kemarau dan mendongkrak potensi pendapatan petani lokal secara signifikan.\n\n"
                    "4. Allianz CyberSecure Pro & Alat Bantu Tunanetra 'Mata'\n"
                    "Dari program studi S1 Business Mathematics, Putri Nurul Hasanah merancang inovasi produk asuransi perlindungan privasi dan keamanan siber 'Allianz CyberSecure Pro' bagi pelaku usaha pada ajang Allianz Indonesia MasterClass. Sementara dari S1 Product Design Innovation, I Komang Candrika Kumara berkolaborasi dengan Komunitas Komloving merancang prototipe 'Mata' berupa perangkat bantu inovatif bagi penyandang tunanetra dalam mata kuliah Design for Social Innovation.\n\n"
                    "Deretan karya tersebut membuktikan bahwa kolaborasi akademik, dukungan laboratorium, dan ekosistem organisasi di SISO Prasmul senantiasa mendorong setiap Prasmulyan STEM untuk berkarya melampaui batas ruang kelas."
                ),
            },
            {
                "title": "Mengintegrasikan Life Cycle Analysis dan Inovasi Energi Bersih Menuju Industri Berkelanjutan",
                "slug": "integrasi-life-cycle-analysis-dan-inovasi-energi-bersih",
                "category": "kajian",
                "published_at": datetime.datetime(2026, 8, 25, 14, 30, 0, tzinfo=datetime.timezone.utc),
                "is_visible": True,
                "body": (
                    "Sejak bergulirnya revolusi industri, peningkatan kapasitas produksi global selalu berjalan beriringan dengan tantangan lonjakan emisi gas rumah kaca—terutama dari sektor pembangkitan listrik, transportasi, manufaktur, dan agrikultur. Dalam forum diskusi ilmiah STEM Innovation Challenge (STEM INC) yang diselenggarakan oleh SISO Universitas Prasetiya Mulya, konsep keberlanjutan (sustainability) dikupas secara mendalam melalui tiga pilar utama yang tidak dapat dipisahkan: lingkungan, sosial, dan ekonomi.\n\n"
                    "Mengacu pada kerangka Donut Economics karya ekonom Kate Raworth, aktivitas rekayasa dan bisnis modern harus beroperasi di ruang aman yang memenuhi fondasi kebutuhan dasar manusia (air bersih, pangan, dan energi) tanpa melampaui batas daya dukung ekologis bumi (ecological ceiling). Bagi mahasiswa dan praktisi STEM, prinsip ini menuntut perubahan paradigma dari sekadar mengejar efisiensi biaya menuju perancangan sistem berorientasi siklus hidup penuh.\n\n"
                    "Pendekatan utama yang wajib diterapkan oleh industri masa depan adalah Life Cycle Analysis (LCA). Melalui LCA, setiap tahapan proses produksi dievaluasi secara sistematis untuk memetakan jejak karbon dan dampak ekologis yang ditimbulkan dari hulu ke hilir. Sebagai contoh konkret di industri pengolahan kelapa sawit, limbah tandan kosong yang sebelumnya terbuang kini dapat dikonversi menjadi sumber energi biomassa berkalori tinggi untuk menyuplai kebutuhan listrik pabrik itu sendiri.\n\n"
                    "Selain pemanfaatan limbah biomassa dalam skema ekonomi sirkular, rekayasa efisiensi energi—seperti pemulihan panas buang (waste heat recovery) pada sistem termal industri—menjadi kunci strategis dalam menekan pemborosan sumber daya. Melalui sinergi antara riset Renewable Energy Engineering, Food Business Technology, dan pemodelan Business Mathematics, mahasiswa STEM Prasetiya Mulya memegang peran sentral dalam merancang solusi teknologi hijau yang menjaga keseimbangan bumi bagi generasi mendatang."
                ),
            },
        ]

        for art in articles_data:
            Article.objects.update_or_create(
                slug=art["slug"],
                defaults=art,
            )
        self.stdout.write(self.style.SUCCESS("✓ Real Articles seeded"))

        self.stdout.write(self.style.SUCCESS("All official SISO RnD data successfully seeded!"))
