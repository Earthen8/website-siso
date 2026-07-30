from django.http import Http404
from rest_framework import generics

from .models import (
    Achievement,
    Article,
    BPHMember,
    ContactInfo,
    Division,
    FAQ,
    FormSubmission,
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
    OrganizationSerializer,
    ProgramKerjaSerializer,
    SectionSerializer,
)


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
        queryset = ProgramKerja.objects.all()
        category = self.request.query_params.get("category")
        visible = self.request.query_params.get("visible")

        if category:
            queryset = queryset.filter(category=category)
        if visible is not None:
            queryset = queryset.filter(is_visible=visible.lower() in ["true", "1", "yes"])
        return queryset


class ProgramDetailView(generics.RetrieveAPIView):
    queryset = ProgramKerja.objects.all()
    serializer_class = ProgramKerjaSerializer
    lookup_field = "slug"


# ── Achievement ───────────────────────────────────────────────────────────────

class AchievementListView(generics.ListAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer


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


# ── Section ───────────────────────────────────────────────────────────────────

class SectionListView(generics.ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = Section.objects.all()
        page = self.request.query_params.get("page")
        visible = self.request.query_params.get("visible")

        if page:
            queryset = queryset.filter(page=page)
        if visible is not None:
            queryset = queryset.filter(is_visible=visible.lower() in ["true", "1", "yes"])
        return queryset
