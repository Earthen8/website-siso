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


# ── Contact ───────────────────────────────────────────────────────────────────

class ContactInfo(models.Model):
    """Singleton — social links and location info for the Contact page."""

    email = models.EmailField(blank=True)
    instagram = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)
    youtube = models.URLField(blank=True)
    spotify = models.URLField(blank=True)
    whatsapp = models.URLField(blank=True)
    line = models.CharField(max_length=100, blank=True)
    location = models.TextField(blank=True)
    maps_embed = models.TextField(blank=True)

    objects = SingletonManager()

    class Meta:
        verbose_name = "Contact Info"
        verbose_name_plural = "Contact Info"

    def __str__(self):
        return "Contact Info"


class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "FAQ"

    def __str__(self):
        return self.question


# ── Form Submissions ──────────────────────────────────────────────────────────

class FormSubmission(models.Model):
    TYPE_CHOICES = [
        ("kritik_saran", "Kritik & Saran"),
        ("request_seminar", "Request Seminar"),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Form Submission"

    def __str__(self):
        return f"{self.get_type_display()} — {self.created_at:%Y-%m-%d %H:%M}"


# ── Section (content toggle) ──────────────────────────────────────────────────

class Section(models.Model):
    PAGE_CHOICES = [
        ("home", "Home"),
        ("about", "About SISO"),
        ("program", "Program Kerja & Events"),
        ("articles", "Articles"),
        ("contact", "Contact"),
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
        ("program", "hero"): "Hero Program Kerja",
        ("program", "filter"): "Filter Kategori Program",
        ("program", "catalog"): "Katalog Program Kerja",
        ("program", "timeline"): "Linimasa / Roadmap Agenda",
        ("articles", "hero"): "Hero Artikel & Prestasi",
        ("articles", "catalog"): "Katalog Artikel",
        ("articles", "achievements"): "Daftar Prestasi Mahasiswa",
        ("contact", "info"): "Informasi Kontak & Sosmed",
        ("contact", "form"): "Formulir Aspirasi & Pesan",
        ("contact", "faq"): "Frequently Asked Questions (FAQ)",
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


class ArticleSection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section Artikel"
        verbose_name_plural = "4. Halaman Artikel & Prestasi"


class ContactSection(Section):
    class Meta:
        proxy = True
        verbose_name = "Section Contact"
        verbose_name_plural = "5. Halaman Contact & FAQ"
