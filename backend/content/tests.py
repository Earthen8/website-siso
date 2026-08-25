from datetime import date, timedelta

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from content.models import (
    Achievement,
    Article,
    ContactInfo,
    MediaAsset,
    Organization,
    ProgramKerja,
    Section,
)


@override_settings(
    REST_FRAMEWORK={
        "DEFAULT_PERMISSION_CLASSES": [
            "rest_framework.permissions.AllowAny",
        ],
        "DEFAULT_AUTHENTICATION_CLASSES": [],
        "DEFAULT_THROTTLE_RATES": {
            "form_submission": "1000/hour",
        },
    }
)
class APIV1Tests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_sections_filter_page_and_visible(self):
        Section.objects.create(page="home", section_type="hero", is_visible=True, order=0)
        Section.objects.create(
            page="home", section_type="about", is_visible=False, order=1
        )
        Section.objects.create(
            page="contact", section_type="form", is_visible=True, order=0
        )

        response = self.client.get("/api/v1/sections/?page=home&visible=true")
        self.assertEqual(response.status_code, 200)
        types = [row["section_type"] for row in response.json()]
        self.assertEqual(types, ["hero"])

    def test_organization_404_when_empty(self):
        response = self.client.get("/api/v1/organization/")
        self.assertEqual(response.status_code, 404)

    def test_organization_singleton(self):
        Organization.objects.create(slogan="Empowering Future STEM Innovators")
        response = self.client.get("/api/v1/organization/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["slogan"], "Empowering Future STEM Innovators"
        )

    def test_programs_featured_upcoming_and_limit(self):
        ProgramKerja.objects.create(
            title="Old Workshop",
            slug="old-workshop",
            category="workshop",
            date=date.today() - timedelta(days=10),
            is_visible=True,
            is_featured=True,
        )
        ProgramKerja.objects.create(
            title="Innofair",
            slug="innofair",
            category="event",
            date=date.today() + timedelta(days=14),
            is_visible=True,
            is_featured=True,
        )
        ProgramKerja.objects.create(
            title="Hidden",
            slug="hidden",
            category="event",
            date=date.today() + timedelta(days=7),
            is_visible=False,
        )

        featured = self.client.get("/api/v1/programs/?visible=true&featured=true")
        self.assertEqual(len(featured.json()), 2)

        upcoming = self.client.get(
            "/api/v1/programs/?visible=true&upcoming=true&limit=1"
        )
        self.assertEqual(len(upcoming.json()), 1)
        self.assertEqual(upcoming.json()[0]["slug"], "innofair")

        hidden_detail = self.client.get("/api/v1/programs/hidden/")
        self.assertEqual(hidden_detail.status_code, 404)

    def test_media_assets_limit_and_caption(self):
        image = SimpleUploadedFile("doc.jpg", b"fake-image", content_type="image/jpeg")
        MediaAsset.objects.create(file=image, type="photo", caption="Workshop 2026")

        response = self.client.get("/api/v1/media-assets/?limit=4")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["caption"], "Workshop 2026")

    def test_achievements_limit(self):
        Achievement.objects.create(student_name="Austin", title="Gold Medal")
        Achievement.objects.create(student_name="Andre", title="Silver Medal")

        response = self.client.get("/api/v1/achievements/?limit=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_articles_hide_unpublished(self):
        Article.objects.create(
            title="Visible",
            slug="visible",
            body="Hello",
            category="jurnal",
            is_visible=True,
        )
        Article.objects.create(
            title="Draft",
            slug="draft",
            body="Nope",
            category="jurnal",
            is_visible=False,
        )

        listing = self.client.get("/api/v1/articles/")
        slugs = [row["slug"] for row in listing.json()]
        self.assertEqual(slugs, ["visible"])

        draft = self.client.get("/api/v1/articles/draft/")
        self.assertEqual(draft.status_code, 404)

    def test_contact_and_form_submission(self):
        ContactInfo.objects.create(email="siso@prasmul.ac.id")
        contact = self.client.get("/api/v1/contact/")
        self.assertEqual(contact.status_code, 200)
        self.assertEqual(contact.json()["email"], "siso@prasmul.ac.id")

        created = self.client.post(
            "/api/v1/contact/submissions/",
            {"type": "kritik_saran", "payload": {"message": "Halo SISO"}},
            format="json",
        )
        self.assertEqual(created.status_code, 201)
        self.assertEqual(created.json()["type"], "kritik_saran")
