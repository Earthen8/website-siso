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
    help = "Seeds the database with realistic sample data for SISO Prasmul dev environment."

    def handle(self, *args, **options):
        self.stdout.write("Seeding SISO sample data...")

        # 1. Organization
        org = Organization.objects.get_or_create_singleton()
        org.slogan = "Empowering Future STEM Innovators"
        org.visi = "Menjadi organisasi mahasiswa STEM yang unggul, inovatif, dan berintegritas dalam menghasilkan solusi berbasis sains dan teknologi yang berdampak bagi masyarakat."
        org.misi = (
            "1. Membangun ekosistem belajar dan riset yang aplikatif serta kolaboratif bagi seluruh mahasiswa STEM.\n"
            "2. Menyelenggarakan program kerja yang relevan dengan perkembangan industri 4.0 dan kecerdasan buatan.\n"
            "3. Memfasilitasi jejaring kemitraan strategis dengan korporasi, alumni, dan komunitas teknologi nasional.\n"
            "4. Mewadahi pengembangan kepemimpinan dan soft skills yang adaptif terhadap perubahan zaman."
        )
        org.nilai = ["Innovation", "Collaboration", "Integrity", "Excellence"]
        org.filosofi_logo = (
            "1. Burung Phoenix (Transformasi & Resiliensi): Melambangkan tekad pantang menyerah, kebangkitan berkelanjutan, dan aspirasi mahasiswa STEM untuk membumbung tinggi menjadi pelopor inovasi.\n"
            "2. Struktur Molekular & Jejaring Saintifik: Ikatan atom melingkar di atas kepala melambangkan fondasi sains, teknologi presisi, dan sinergi riset kolaboratif antardisiplin ilmu STEM.\n"
            "3. Dinamika Sayap & Pertumbuhan Organik: Lekukan sayap dinamis yang menyerupai sulur alami mencerminkan inovasi teknologi yang hidup, adaptif terhadap zaman, dan berdampak berkelanjutan.\n"
            "4. Warna Deep Navy & Putih Bersih: Navy merefleksikan kedalaman intelektual, integritas, dan profesionalisme, sementara putih melambangkan transparansi, keterbukaan ide, dan kemurnian tujuan."
        )
        org.save()
        self.stdout.write(self.style.SUCCESS("✓ Organization seeded"))

        # 2. Home Sections
        home_sections = [
            {"type": "about", "order": 1, "config": {}},
            {
                "type": "vision_mission",
                "order": 2,
                "config": {
                    "mission_points": [
                        "Membangun ekosistem riset & inovasi aplikatif",
                        "Menyelenggarakan program pengembangan skill terkini",
                        "Membuka jejaring kemitraan strategis dengan industri",
                        "Mewadahi kepemimpinan & kolaborasi lintas angkatan",
                    ]
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
                    "badge": "Nilai Keunggulan",
                    "title": "Value Proposition",
                    "subtitle": "Pilar keunggulan dan nilai transformatif SISO dalam memberdayakan mahasiswa STEM melalui kolaborasi multidisipliner, riset terapan, dan kesiapan industri global.",
                    "items": [
                        {
                            "title": "Kolaborasi Multidisipliner STEM",
                            "text": "Menyatukan talenta sains, komputasi, dan rekayasa lintas program studi untuk mengeksplorasi solusi komprehensif atas permasalahan riil.",
                        },
                        {
                            "title": "Riset Terapan & Inovasi Teknologi",
                            "text": "Mengembangkan kapabilitas deep-tech (AI, IoT, Robotics, Data Science) melalui workshop intensif, hands-on prototyping, dan mentorship industri.",
                        },
                        {
                            "title": "Akselerasi Prestasi & Dampak Industri",
                            "text": "Menginkubasi tim kompetisi sains-teknologi di kancah nasional maupun global, serta membuka akses karir ke ekosistem industri masa depan.",
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

        # 3. Highlighted Programs & Upcoming Events
        today = datetime.date.today()
        programs_data = [
            {
                "title": "STEM Innovation Summit 2026",
                "slug": "stem-innovation-summit-2026",
                "category": "event",
                "description": "Konferensi tahunan terbesar mahasiswa STEM menghadirkan keynote speaker industri, pameran inovasi proyek, dan networking dinner.",
                "date": today + datetime.timedelta(days=20),
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "AI & Deep Learning Hands-on Bootcamp",
                "slug": "ai-deep-learning-bootcamp",
                "category": "workshop",
                "description": "Workshop intensif 2 pekan membangun pipeline machine learning dan generative AI model dari nol hingga deployment.",
                "date": today + datetime.timedelta(days=35),
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "Prasmul Hackathon & Techfest",
                "slug": "prasmul-hackathon-techfest",
                "category": "competition",
                "description": "Kompetisi problem-solving 48 jam untuk merancang solusi cerdas kota masa depan dengan total hadiah puluhan juta rupiah.",
                "date": today + datetime.timedelta(days=60),
                "is_featured": True,
                "is_visible": True,
            },
            {
                "title": "SISO Goes to School: STEM Mentorship",
                "slug": "siso-goes-to-school-mentorship",
                "category": "pengmas",
                "description": "Program pengabdian masyarakat memperkenalkan dasar-dasar coding dan robotika kepada siswa SMA di Tangerang.",
                "date": today - datetime.timedelta(days=30),
                "is_featured": False,
                "is_visible": True,
            },
        ]

        for p in programs_data:
            ProgramKerja.objects.update_or_create(
                slug=p["slug"],
                defaults=p,
            )
        self.stdout.write(self.style.SUCCESS("✓ Programs seeded"))

        # 4. Achievements
        achievements_data = [
            {
                "student_name": "Tim SISO Robotics",
                "title": "Juara 1 National Autonomous Drone Competition 2026",
                "description": "Mengembangkan algoritma path planning otonom dengan Computer Vision dan ROS2.",
                "date": today - datetime.timedelta(days=45),
            },
            {
                "student_name": "Michelle & Jonathan",
                "title": "Gold Medalist International AI Hackathon Singapore",
                "description": "Solusi IoT Early Warning System untuk mitigasi polusi udara perkotaan berbasis sensor LoRaWAN.",
                "date": today - datetime.timedelta(days=90),
            },
            {
                "student_name": "Dev SISO Prasmul",
                "title": "Best Technical Paper at IEEE STEM Youth Forum",
                "description": "Publikasi ilmiah mengenai arsitektur microservices terdesentralisasi pada smart campus.",
                "date": today - datetime.timedelta(days=120),
            },
        ]

        for a in achievements_data:
            Achievement.objects.update_or_create(
                title=a["title"],
                defaults=a,
            )
        self.stdout.write(self.style.SUCCESS("✓ Achievements seeded"))

        # 5. Divisions & BPH Members
        divisions_data = [
            {"name": "Research & Development (R&D)", "slug": "rnd", "jobdesc": "Fokus pada riset teknologi baru, workshop rekayasa perangkat lunak, AI, dan inovasi hardware.", "order": 1},
            {"name": "Media, Komunikasi & Informasi (Medkominfo)", "slug": "medkominfo", "jobdesc": "Mengelola publikasi branding visual, website organisasi, serta dokumentasi seluruh proker SISO.", "order": 2},
            {"name": "Pengembangan Sumber Daya Mahasiswa (PSDM)", "slug": "psdm", "jobdesc": "Membina keakraban internal, pelatihan soft skills, serta kaderisasi kepemimpinan anggota.", "order": 3},
            {"name": "Hubungan Eksternal & Kemitraan", "slug": "eksternal", "jobdesc": "Membangun relasi strategis dengan korporasi teknologi, alumni, dan himpunan universitas lain.", "order": 4},
        ]

        div_map = {}
        for d in divisions_data:
            div_obj, _ = Division.objects.update_or_create(
                slug=d["slug"],
                defaults=d,
            )
            div_map[d["slug"]] = div_obj
        self.stdout.write(self.style.SUCCESS("✓ Divisions seeded"))

        members_data = [
            {"name": "Nicholas Nathaniel", "role": "Ketua Himpunan", "order": 1, "generation_year": 2026, "division": None},
            {"name": "Clarissa Stephanie", "role": "Wakil Ketua Himpunan", "order": 2, "generation_year": 2026, "division": None},
            {"name": "Bryan Adrian", "role": "Sekretaris Umum", "order": 3, "generation_year": 2026, "division": None},
            {"name": "Jessica Aurelia", "role": "Bendahara Umum", "order": 4, "generation_year": 2026, "division": None},
            {"name": "Darren Emmanuel", "role": "Kepala Divisi R&D", "order": 5, "generation_year": 2026, "division": div_map["rnd"]},
            {"name": "Amanda Valerie", "role": "Kepala Divisi Medkominfo", "order": 6, "generation_year": 2026, "division": div_map["medkominfo"]},
            {"name": "Farhan Pratama", "role": "Kepala Divisi PSDM", "order": 7, "generation_year": 2026, "division": div_map["psdm"]},
            {"name": "Natasha Olivia", "role": "Kepala Divisi Eksternal", "order": 8, "generation_year": 2026, "division": div_map["eksternal"]},
        ]

        for m in members_data:
            BPHMember.objects.update_or_create(
                name=m["name"],
                generation_year=m["generation_year"],
                defaults=m,
            )
        self.stdout.write(self.style.SUCCESS("✓ BPH Members seeded"))

        self.stdout.write(self.style.SUCCESS("All sample data successfully seeded!"))
