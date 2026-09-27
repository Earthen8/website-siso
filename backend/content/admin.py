from django import forms
from django.contrib import admin
from django.http import HttpRequest
from unfold.admin import ModelAdmin

from .models import (
    Achievement,
    Article,
    BPHMember,
    ContactInfo,
    Division,
    FAQ,
    FormSubmission,
    MediaAsset,
    Organization,
    ProgramKerja,
    Section,
    HomeSection,
    AboutSection,
    ProgramSection,
    ArticleSection,
    GallerySection,
)


# ── Helpers ───────────────────────────────────────────────────────────────────

class SingletonAdmin(ModelAdmin):
    """Prevents creating more than one instance of a singleton model."""

    def has_add_permission(self, request: HttpRequest) -> bool:
        return not self.model.objects.exists()

    def has_delete_permission(self, request: HttpRequest, obj=None) -> bool:
        return False


# ── Organization ──────────────────────────────────────────────────────────────

@admin.register(Organization)
class OrganizationAdmin(SingletonAdmin):
    pass


# ── Division & Members ────────────────────────────────────────────────────────

@admin.register(Division)
class DivisionAdmin(ModelAdmin):
    list_display = ("name", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(BPHMember)
class BPHMemberAdmin(ModelAdmin):
    list_display = ("name", "role", "division", "generation_year", "order")
    list_editable = ("order",)
    list_filter = ("generation_year", "division")
    search_fields = ("name", "role")


# ── Program Kerja & Media ─────────────────────────────────────────────────────

class MediaAssetInline(admin.TabularInline):
    model = MediaAsset
    extra = 1


@admin.register(ProgramKerja)
class ProgramKerjaAdmin(ModelAdmin):
    list_display = ("title", "category", "date", "is_featured", "is_visible")
    list_editable = ("is_featured", "is_visible")
    list_filter = ("category", "is_featured", "is_visible")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}
    inlines = [MediaAssetInline]


@admin.register(MediaAsset)
class MediaAssetAdmin(ModelAdmin):
    list_display = ("file", "type", "caption", "program")
    list_filter = ("type",)
    search_fields = ("caption",)


# ── Achievement ───────────────────────────────────────────────────────────────

@admin.register(Achievement)
class AchievementAdmin(ModelAdmin):
    list_display = ("student_name", "title", "date")
    search_fields = ("student_name", "title")


# ── Article ───────────────────────────────────────────────────────────────────

@admin.register(Article)
class ArticleAdmin(ModelAdmin):
    list_display = ("title", "category", "published_at", "is_visible")
    list_editable = ("is_visible",)
    list_filter = ("category", "is_visible")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}


# ── Contact ───────────────────────────────────────────────────────────────────

@admin.register(ContactInfo)
class ContactInfoAdmin(SingletonAdmin):
    pass


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ("question", "order", "is_visible")
    list_editable = ("order", "is_visible")


# ── Form Submissions ──────────────────────────────────────────────────────────

@admin.register(FormSubmission)
class FormSubmissionAdmin(ModelAdmin):
    list_display = ("type", "created_at")
    list_filter = ("type",)
    readonly_fields = ("type", "payload", "created_at")

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False  # Submissions come from the public form only.


# ── Section Management (Per-Page & Master) ────────────────────────────────────

class SectionAdminForm(forms.ModelForm):
    vision_text = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 4, "style": "width: 100%;"}),
        required=False,
        label="Teks Visi (Vision)",
        help_text="Teks visi organisasi yang akan ditampilkan di section Vision & Mission.",
    )
    mission_points_text = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 6, "style": "width: 100%;"}),
        required=False,
        label="Poin-Poin Misi (Mission)",
        help_text="Tuliskan satu poin misi per baris. Setiap baris baru otomatis menjadi satu kartu pilar misi di frontend.",
    )
    val_prop_badge = forms.CharField(
        max_length=100,
        required=False,
        label="Badge Value Proposition",
        help_text="Label kecil di atas judul (contoh: Nilai Keunggulan)",
    )
    val_prop_title = forms.CharField(
        max_length=200,
        required=False,
        label="Judul Utama Value Proposition",
    )
    val_prop_subtitle = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 3, "style": "width: 100%;"}),
        required=False,
        label="Sub-judul Value Proposition",
    )

    class Meta:
        model = Section
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            config = self.instance.config or {}

            if self.instance.section_type == "vision_mission":
                org = Organization.objects.first()
                initial_vision = config.get("vision_text") or (org.visi if org else "")
                self.fields["vision_text"].initial = initial_vision

                points = config.get("mission_points")
                if not points and org and org.misi:
                    points = [p.strip() for p in org.misi.splitlines() if p.strip()]
                if points and isinstance(points, list):
                    self.fields["mission_points_text"].initial = "\n".join(points)

            elif self.instance.section_type == "value_proposition":
                self.fields["val_prop_badge"].initial = config.get("badge", "")
                self.fields["val_prop_title"].initial = config.get("title", "")
                self.fields["val_prop_subtitle"].initial = config.get("subtitle", "")

    def clean(self):
        cleaned_data = super().clean()
        stype = self.instance.section_type if (self.instance and self.instance.pk) else cleaned_data.get("section_type")
        config = dict(cleaned_data.get("config") or {})

        if stype == "vision_mission":
            v_text = cleaned_data.get("vision_text", "").strip()
            m_text = cleaned_data.get("mission_points_text", "").strip()
            m_points = [line.strip() for line in m_text.splitlines() if line.strip()]

            if v_text:
                config["vision_text"] = v_text
            if m_points:
                config["mission_points"] = m_points
            cleaned_data["config"] = config

            # Keep Organization model synchronized
            org = Organization.objects.first()
            if org:
                if v_text:
                    org.visi = v_text
                if m_points:
                    org.misi = "\n".join(m_points)
                org.save()

        elif stype == "value_proposition":
            if cleaned_data.get("val_prop_badge"):
                config["badge"] = cleaned_data["val_prop_badge"]
            if cleaned_data.get("val_prop_title"):
                config["title"] = cleaned_data["val_prop_title"]
            if cleaned_data.get("val_prop_subtitle"):
                config["subtitle"] = cleaned_data["val_prop_subtitle"]
            cleaned_data["config"] = config

        return cleaned_data


class SectionBaseAdmin(ModelAdmin):
    form = SectionAdminForm
    list_display = ("display_name_col", "section_type", "is_visible", "order")
    list_editable = ("is_visible", "order")
    search_fields = ("section_type",)

    @admin.display(description="Nama Bagian (Section)")
    def display_name_col(self, obj: Section) -> str:
        return obj.display_name

    def get_readonly_fields(self, request: HttpRequest, obj=None):
        if obj:
            return ("page", "section_type")
        return ()

    def get_fieldsets(self, request: HttpRequest, obj=None):
        if not obj:
            return (
                ("Identitas Section", {
                    "fields": ("page", "section_type", "is_visible", "order"),
                }),
                ("Konfigurasi (JSON)", {
                    "fields": ("config",),
                }),
            )

        if obj.section_type == "vision_mission":
            return (
                ("Status & Urutan Tampilan", {
                    "fields": ("page", "section_type", "is_visible", "order"),
                    "description": "Atur apakah section ini muncul di website dan urutan posisinya.",
                }),
                ("Pengaturan Teks Visi & Misi", {
                    "description": "Ubah teks Visi dan butir-butir Misi secara langsung di bawah ini tanpa perlu mengubah format data mentah (JSON).",
                    "fields": ("vision_text", "mission_points_text"),
                }),
                ("Konfigurasi Tingkat Lanjut (Raw JSON)", {
                    "classes": ("collapse",),
                    "fields": ("config",),
                }),
            )

        if obj.section_type == "value_proposition":
            return (
                ("Status & Urutan Tampilan", {
                    "fields": ("page", "section_type", "is_visible", "order"),
                }),
                ("Pengaturan Value Proposition", {
                    "description": "Atur badge, judul, dan sub-judul section Value Proposition.",
                    "fields": ("val_prop_badge", "val_prop_title", "val_prop_subtitle"),
                }),
                ("Konfigurasi Tingkat Lanjut (Raw JSON)", {
                    "classes": ("collapse",),
                    "fields": ("config",),
                }),
            )

        return (
            ("Status & Urutan Tampilan", {
                "fields": ("page", "section_type", "is_visible", "order"),
            }),
            ("Konfigurasi Section (JSON)", {
                "fields": ("config",),
            }),
        )


@admin.register(HomeSection)
class HomeSectionAdmin(SectionBaseAdmin):
    list_display = ("display_name_col", "is_visible", "order")

    def get_queryset(self, request: HttpRequest):
        return super().get_queryset(request).filter(page="home")


@admin.register(AboutSection)
class AboutSectionAdmin(SectionBaseAdmin):
    list_display = ("display_name_col", "is_visible", "order")

    def get_queryset(self, request: HttpRequest):
        return super().get_queryset(request).filter(page="about")


@admin.register(ProgramSection)
class ProgramSectionAdmin(SectionBaseAdmin):
    list_display = ("display_name_col", "is_visible", "order")

    def get_queryset(self, request: HttpRequest):
        return super().get_queryset(request).filter(page="program")


@admin.register(ArticleSection)
class ArticleSectionAdmin(SectionBaseAdmin):
    list_display = ("display_name_col", "is_visible", "order")

    def get_queryset(self, request: HttpRequest):
        return super().get_queryset(request).filter(page="articles")


@admin.register(GallerySection)
class GallerySectionAdmin(SectionBaseAdmin):
    list_display = ("display_name_col", "is_visible", "order")

    def get_queryset(self, request: HttpRequest):
        return super().get_queryset(request).filter(page="gallery")


@admin.register(Section)
class SectionAdmin(SectionBaseAdmin):
    list_display = ("display_name_col", "page", "section_type", "is_visible", "order")
    list_filter = ("page", "is_visible")


admin.site.site_header = "SISO Prasmul CMS"
admin.site.site_title = "SISO CMS"
admin.site.index_title = "Kelola konten website"
