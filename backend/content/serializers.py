from rest_framework import serializers

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


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ["id", "slogan", "visi", "misi", "nilai", "filosofi_logo", "logo"]


class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = ["id", "name", "slug", "group_photo", "jobdesc", "order"]


class BPHMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BPHMember
        fields = ["id", "name", "photo", "role", "division", "order", "generation_year"]


class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = ["id", "file", "type", "caption"]


class ProgramKerjaSerializer(serializers.ModelSerializer):
    media_assets = MediaAssetSerializer(many=True, read_only=True)

    class Meta:
        model = ProgramKerja
        fields = [
            "id", "title", "slug", "category", "description",
            "date", "cover_image", "is_visible", "is_featured", "media_assets",
        ]


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ["id", "student_name", "title", "description", "date", "image"]


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            "id", "title", "slug", "body", "category", "published_at", "is_visible",
        ]


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = [
            "id", "email", "instagram", "tiktok", "youtube",
            "spotify", "whatsapp", "line", "location", "maps_embed",
        ]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order", "is_visible"]


class FormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmission
        fields = ["id", "type", "payload", "created_at"]
        read_only_fields = ["id", "created_at"]


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ["id", "page", "section_type", "is_visible", "order", "config"]
