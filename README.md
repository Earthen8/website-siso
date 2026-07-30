# Website SISO Prasmul

A monorepo for the SISO Prasmul website: Next.js frontend with a Django + DRF backend and PostgreSQL, built around Django Admin as the CMS.

Why this project exists:
- Keep HIMA website content editable without code deploys.
- Make generational handover simple for student dev teams.
- Use Django Admin for content management and Next.js for SEO-friendly rendering.

Quick start:
1. Copy `.env.example` to `.env` and update values as needed.
2. Run `docker compose -f docker-compose.dev.yml up --build`.
3. Open `http://localhost:3000` for the frontend.
4. Open `http://localhost:8000/admin` for Django Admin.

Project layout:
- `/frontend` — Next.js App Router, TypeScript.
- `/backend` — Django project, Django REST Framework.
- `docker-compose.dev.yml` — local dev environment.
- `spesifikasi-teknis.md` — architectural decisions and standards.
