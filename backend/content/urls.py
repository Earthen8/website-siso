from django.urls import path

from . import views

urlpatterns = [
    # Sections (content toggle)
    path("sections/", views.SectionListView.as_view(), name="section-list"),

    # Organization
    path("organization/", views.OrganizationView.as_view(), name="organization"),

    # Members & Divisions
    path("members/", views.MemberListView.as_view(), name="member-list"),
    path("divisions/", views.DivisionListView.as_view(), name="division-list"),
    path("divisions/<slug:slug>/", views.DivisionDetailView.as_view(), name="division-detail"),

    # Program Kerja
    path("programs/", views.ProgramListView.as_view(), name="program-list"),
    path("programs/<slug:slug>/", views.ProgramDetailView.as_view(), name="program-detail"),

    # Achievements
    path("achievements/", views.AchievementListView.as_view(), name="achievement-list"),

    # Media / documentations
    path("media-assets/", views.MediaAssetListView.as_view(), name="media-asset-list"),

    # Articles
    path("articles/", views.ArticleListView.as_view(), name="article-list"),
    path("articles/<slug:slug>/", views.ArticleDetailView.as_view(), name="article-detail"),

    # Contact
    path("contact/", views.ContactInfoView.as_view(), name="contact"),
    path("faq/", views.FAQListView.as_view(), name="faq-list"),
    path("contact/submissions/", views.FormSubmissionCreateView.as_view(), name="form-submission"),
]
