from django.contrib import admin
from django.http import HttpRequest
# pyrefly: ignore [missing-import]
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
    list_display = ("title", "category", "date", "is_visible")
    list_editable = ("is_visible",)
    list_filter = ("category", "is_visible")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}
    inlines = [MediaAssetInline]


@admin.register(MediaAsset)
class MediaAssetAdmin(ModelAdmin):
    list_display = ("file", "type", "program")
    list_filter = ("type",)


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


# ── Section ───────────────────────────────────────────────────────────────────

@admin.register(Section)
class SectionAdmin(ModelAdmin):
    list_display = ("page", "section_type", "is_visible", "order")
    list_editable = ("is_visible", "order")
    list_filter = ("page", "is_visible")
