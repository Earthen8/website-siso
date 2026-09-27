from django.db import models


# ── Singleton helpers ─────────────────────────────────────────────────────────

class SingletonManager(models.Manager):
    """Ensures only one row can exist for models that are singletons."""

    def get_or_create_singleton(self):
        obj, _ = self.get_or_create(pk=1)
        return obj


# ── Organization ──────────────────────────────────────────────────────────────

class Organization(models.Model):
    """Singleton — top-level info about SISO Prasmul."""

    slogan = models.CharField(max_length=200, blank=True)
    visi = models.TextField(blank=True)
    misi = models.TextField(blank=True)
    nilai = models.JSONField(default=list, blank=True)  # list of value strings
    filosofi_logo = models.TextField(blank=True)
    logo = models.ImageField(upload_to="organization/", blank=True, null=True)

    objects = SingletonManager()

    class Meta:
        verbose_name = "Organization"
        verbose_name_plural = "Organization"

    def __str__(self):
        return "SISO Prasmul"


# ── Division & Members ────────────────────────────────────────────────────────

class Division(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    group_photo = models.ImageField(upload_to="divisions/", blank=True, null=True)
    jobdesc = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class BPHMember(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="members/", blank=True, null=True)
    role = models.CharField(max_length=100)
    division = models.ForeignKey(
        Division,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="members",
    )
    order = models.PositiveIntegerField(default=0)
    # generation_year preserves historical BPH data across annual handovers.
    generation_year = models.PositiveIntegerField()

    class Meta:
        ordering = ["generation_year", "order"]
        indexes = [
            models.Index(fields=["generation_year"]),
        ]

    def __str__(self):
        return f"{self.name} ({self.generation_year})"


# ── Program Kerja & Media ─────────────────────────────────────────────────────

class ProgramKerja(models.Model):
    CATEGORY_CHOICES = [
        ("event", "Event"),
        ("workshop", "Workshop"),
        ("seminar", "Seminar"),
        ("competition", "Competition"),
        ("pengmas", "Pengabdian Masyarakat"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    date = models.DateField(null=True, blank=True)
    cover_image = models.ImageField(upload_to="programs/", blank=True, null=True)
    is_visible = models.BooleanField(default=True)
    is_featured = models.BooleanField(
        default=False,
        help_text="Tampilkan di Highlighted Programs di halaman Home.",
    )

    class Meta:
        ordering = ["-date"]
        verbose_name = "Program Kerja"
        verbose_name_plural = "Program Kerja"
        indexes = [
            models.Index(fields=["is_visible", "category"], name="program_visible_category_idx"),
            models.Index(fields=["is_visible", "is_featured"], name="program_visible_featured_idx"),
            models.Index(fields=["is_visible", "date"], name="program_visible_date_idx"),
        ]

    def __str__(self):
        return self.title


class MediaAsset(models.Model):
    TYPE_CHOICES = [
        ("photo", "Photo"),
        ("video", "Video"),
    ]

    file = models.FileField(upload_to="media_assets/")
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    caption = models.CharField(max_length=255, blank=True)
    program = models.ForeignKey(
        ProgramKerja,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="media_assets",
    )

    class Meta:
        verbose_name = "Media Asset"

    def __str__(self):
        return f"{self.get_type_display()} — {self.file.name}"


# ── Achievement ───────────────────────────────────────────────────────────────

class Achievement(models.Model):
    student_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to="achievements/", blank=True, null=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"{self.student_name} — {self.title}"


# ── Article ───────────────────────────────────────────────────────────────────

class Article(models.Model):
    CATEGORY_CHOICES = [
        ("jurnal", "Jurnal"),
        ("kajian", "Kajian"),
        ("achievement", "Achievement"),
        ("beasiswa", "Beasiswa"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    body = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    published_at = models.DateTimeField(null=True, blank=True)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["-published_at"]
        indexes = [
            models.Index(fields=["is_visible", "category"], name="article_visible_category_idx"),
        ]

    def __str__(self):
        return self.title


# ── Section (content toggle) ──────────────────────────────────────────────────

class Section(models.Model):
    PAGE_CHOICES = [
        ("home", "Home"),
        ("about", "About SISO"),
        ("program", "Program Kerja & Events"),
        ("gallery", "Gallery & Dokumentasi"),
        ("articles", "Articles & Prestasi"),
    ]

    page = models.CharField(max_length=30, choices=PAGE_CHOICES)
    section_type = models.CharField(max_length=50)
    is_visible = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    config = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["page", "order"]
        indexes = [
            models.Index(fields=["page", "is_visible"], name="section_page_visible_idx"),
        ]

    SECTION_LABELS = {
        ("home", "hero"): "Hero Section",
        ("home", "about"): "Sambutan & Ringkasan About",
        ("home", "vision_mission"): "Visi & Misi (Vision & Mission)",
        ("home", "highlighted_programs"): "Program Unggulan (Highlighted Programs)",
        ("home", "upcoming_events"): "Agenda Terdekat (Upcoming Events)",
        ("home", "student_achievements"): "Prestasi Mahasiswa",
        ("home", "documentations"): "Galeri Dokumentasi",
        ("home", "social_media"): "Feed Media Sosial",
        ("home", "value_proposition"): "Value Proposition",
        ("about", "about"): "Pengantar Organisasi",
        ("about", "vision_mission"): "Visi & Misi Organisasi",
        ("about", "values"): "Nilai Organisasi (Core Values)",
        ("about", "philosophy"): "Filosofi Logo SISO",
        ("about", "structure"): "Struktur Organisasi (BPH & Divisi)",
        ("about", "recruitment"): "Ajakan Bergabung / Open Recruitment (Join SISO)",
        ("program", "hero"): "Hero Program Kerja",
        ("program", "filter"): "Filter Kategori Program",
        ("program", "catalog"): "Katalog Program Kerja",
        ("program", "timeline"): "Linimasa / Roadmap Agenda",
        ("gallery", "hero"): "Hero Galeri & Arsip",
        ("gallery", "filter"): "Filter Kategori Galeri",
        ("gallery", "photos"): "Galeri Foto Kegiatan",
        ("gallery", "videos"): "Video Dokumentasi & Aftermovie",
        ("gallery", "events"): "Arsip Program Kerja",
        ("gallery", "docs"): "Publikasi & Laporan Tahunan (PDF)",
        ("articles", "hero"): "Hero Artikel & Prestasi",
        ("articles", "quick_nav"): "Navigasi Rubrik Cepat (Quick Jump Nav)",
        ("articles", "news"): "Berita & Artikel Terkini (News & Updates)",
        ("articles", "publications"): "Karya Tulis Ilmiah (Student Publications)",
        ("articles", "research"): "Kajian & Riset (Research and Studies)",
        ("articles", "achievements"): "Prestasi Mahasiswa (Students Achievements)",
        ("articles", "scholarships"): "Informasi Beasiswa (Scholarship Information)",
        ("articles", "competitions"): "Agenda Perlombaan (Competition Information)",
    }

    @property
    def display_name(self) -> str:
        return self.SECTION_LABELS.get(
            (self.page, self.section_type),
            self.section_type.replace("_", " ").title(),
        )

    def __str__(self):
        return f"{self.get_page_display()} — {self.display_name}"


# ── Per-Page Proxy Models for Section Management ──────────────────────────────

class HomeSection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section Home"
        verbose_name_plural = "1. Halaman Home"


class AboutSection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section About"
        verbose_name_plural = "2. Halaman About"


class ProgramSection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section Program"
        verbose_name_plural = "3. Halaman Program Kerja"


class GallerySection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section Gallery"
        verbose_name_plural = "4. Halaman Gallery"


class ArticleSection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section Artikel & Prestasi"
        verbose_name_plural = "5. Halaman Artikel & Prestasi"

