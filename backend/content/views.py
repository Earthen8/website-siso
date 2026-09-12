from datetime import date

from django.http import Http404
from rest_framework import generics
from rest_framework.throttling import ScopedRateThrottle

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
from .serializers import (
    AchievementSerializer,
    ArticleSerializer,
    BPHMemberSerializer,
    ContactInfoSerializer,
    DivisionSerializer,
    FAQSerializer,
    FormSubmissionSerializer,
    MediaAssetSerializer,
    OrganizationSerializer,
    ProgramKerjaSerializer,
    SectionSerializer,
)


def _is_truthy(value: str | None) -> bool | None:
    if value is None:
        return None
    return value.lower() in ("true", "1", "yes")


def _apply_limit(queryset, raw_limit: str | None):
    if not raw_limit:
        return queryset
    try:
        limit = int(raw_limit)
    except (TypeError, ValueError):
        return queryset
    if limit < 1:
        return queryset
    return queryset[: min(limit, 100)]


# ── Organization (singleton) ──────────────────────────────────────────────────

class OrganizationView(generics.RetrieveAPIView):
    serializer_class = OrganizationSerializer

    def get_object(self):
        obj = Organization.objects.first()
        if obj is None:
            raise Http404("Organization info has not been set up yet.")
        return obj


# ── Division & Members ────────────────────────────────────────────────────────

class DivisionListView(generics.ListAPIView):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer


class DivisionDetailView(generics.RetrieveAPIView):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    lookup_field = "slug"


class MemberListView(generics.ListAPIView):
    serializer_class = BPHMemberSerializer

    def get_queryset(self):
        queryset = BPHMember.objects.all()
        generation = self.request.query_params.get("generation")
        if generation:
            queryset = queryset.filter(generation_year=generation)
        return queryset


# ── Program Kerja ─────────────────────────────────────────────────────────────

class ProgramListView(generics.ListAPIView):
    serializer_class = ProgramKerjaSerializer

    def get_queryset(self):
        queryset = ProgramKerja.objects.prefetch_related("media_assets")
        category = self.request.query_params.get("category")
        visible = _is_truthy(self.request.query_params.get("visible"))
        featured = _is_truthy(self.request.query_params.get("featured"))
        upcoming = _is_truthy(self.request.query_params.get("upcoming"))

        if category:
            queryset = queryset.filter(category=category)
        if visible is not None:
            queryset = queryset.filter(is_visible=visible)
        if featured is True:
            queryset = queryset.filter(is_featured=True)
        if upcoming is True:
            queryset = queryset.filter(date__gte=date.today()).order_by("date")

        return _apply_limit(queryset, self.request.query_params.get("limit"))


class ProgramDetailView(generics.RetrieveAPIView):
    queryset = ProgramKerja.objects.filter(is_visible=True).prefetch_related(
        "media_assets"
    )
    serializer_class = ProgramKerjaSerializer
    lookup_field = "slug"


# ── Achievement ───────────────────────────────────────────────────────────────

class AchievementListView(generics.ListAPIView):
    serializer_class = AchievementSerializer

    def get_queryset(self):
        return _apply_limit(
            Achievement.objects.all(),
            self.request.query_params.get("limit"),
        )


# ── Media Assets (documentations / gallery) ───────────────────────────────────

class MediaAssetListView(generics.ListAPIView):
    serializer_class = MediaAssetSerializer

    def get_queryset(self):
        queryset = MediaAsset.objects.all()
        asset_type = self.request.query_params.get("type")
        if asset_type:
            queryset = queryset.filter(type=asset_type)
        return _apply_limit(queryset, self.request.query_params.get("limit"))


# ── Article ───────────────────────────────────────────────────────────────────

class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.filter(is_visible=True)
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.filter(is_visible=True)
    serializer_class = ArticleSerializer
    lookup_field = "slug"


# ── Contact ───────────────────────────────────────────────────────────────────

class ContactInfoView(generics.RetrieveAPIView):
    serializer_class = ContactInfoSerializer

    def get_object(self):
        obj = ContactInfo.objects.first()
        if obj is None:
            raise Http404("Contact info has not been set up yet.")
        return obj


class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_visible=True)
    serializer_class = FAQSerializer


# ── Form Submission ───────────────────────────────────────────────────────────

class FormSubmissionCreateView(generics.CreateAPIView):
    serializer_class = FormSubmissionSerializer
    queryset = FormSubmission.objects.none()
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "form_submission"


# ── Section ───────────────────────────────────────────────────────────────────

class SectionListView(generics.ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = Section.objects.all()
        page = self.request.query_params.get("page")
        visible = _is_truthy(self.request.query_params.get("visible"))

        if page:
            queryset = queryset.filter(page=page)
        if visible is not None:
            queryset = queryset.filter(is_visible=visible)
        return queryset
