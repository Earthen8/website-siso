.PHONY: dev dev-build down shell superuser

dev:
	docker compose -f docker-compose.dev.yml up

dev-build:
	docker compose -f docker-compose.dev.yml up --build

down:
	docker compose -f docker-compose.dev.yml down

superuser:
	docker compose -f docker-compose.dev.yml exec backend python manage.py createsuperuser
