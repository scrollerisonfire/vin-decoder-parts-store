# 05 — Deployment

## Локално развитие

```bash
# 1. Клонирай и инсталирай
git clone <repo>
cd autoparts-bg
cp .env.example .env  # попълни ключовете

# 2. Стартирай инфраструктурата
docker-compose up -d  # PostgreSQL, Redis, Elasticsearch

# 3. База данни
psql -U postgres -d autoparts -f database/schema.sql
psql -U postgres -d autoparts -f mock-data/seed.sql

# 4. Backend
cd backend && npm install && npm run dev

# 5. Frontend
cd frontend && npm install && npm run dev
```

## Environment variables

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/autoparts
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200

# External APIs
NHTSA_BASE=https://vpic.nhtsa.dot.gov/api/vehicles
TECDOC_API_KEY=...
TECDOC_PROVIDER_ID=...
CARAPI_TOKEN=...
RAPIDAPI_KEY=...
CARVERTICAL_API_KEY=...
CARVERTICAL_PARTNER_ID=...

# Shipping
ECONT_USERNAME=...
ECONT_PASSWORD=...
ECONT_BASE=https://ee.econt.com
SPEEDY_USERNAME=...
SPEEDY_PASSWORD=...
SPEEDY_BASE=https://api.speedy.bg/v1

# Payments
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Storage
S3_ENDPOINT=https://...r2.cloudflarestorage.com
S3_BUCKET=autoparts-assets
S3_ACCESS_KEY=...
S3_SECRET_KEY=...

# Auth
JWT_SECRET=<random 64 chars>
```

## Production options

| Стек | Цена/мес | Сложност |
|------|----------|----------|
| Railway / Render | $20–$100 | Лесно — добре за MVP |
| Fly.io | $30–$150 | Средно — добра производителност |
| Hetzner VPS + Docker | €20–€80 | Ръчно, но евтино |
| AWS ECS / GCP Cloud Run | $100+ | Сложно, scale-ready |

## CI/CD

```yaml
# .github/workflows/deploy.yml
on: { push: { branches: [main] } }
jobs:
  test:
    - npm test (backend + frontend)
  build:
    - docker build
  deploy:
    - push image
    - trigger deploy
```

## Мониторинг

- **Sentry** — грешки
- **Plausible / PostHog** — аналитика
- **UptimeRobot** — uptime
- **Better Stack** — логове
