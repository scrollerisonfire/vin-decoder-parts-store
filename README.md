# AutoParts BG — Архитектура на проекта

Платформа за продажба на авточасти с VIN декодиране, AI препоръки, сравнение на цени, проверка на история (CarVertical) и доставка чрез Еконт/Спиди.

## Какво прави платформата

1. Потребителят въвежда **VIN** или избира **марка / модел / година**
2. Системата декодира автомобила (NHTSA vPIC + TecDoc)
3. Показва съвместими части (TecDoc/ACES) и оригинални OEM схеми (RealOEM за BMW)
4. AI асистент препоръчва най-добрата част спрямо бюджет и качество
5. Сравнява цени от множество магазини (наши + външни доставчици)
6. Опционално: плащане за CarVertical отчет (revenue share)
7. Поръчка → автоматично създаване на товарителница в Еконт или Спиди

## Структура на файловете (как да си го свалиш в VSCode)

```
autoparts-architecture/
├── README.md                          # този файл — общ преглед
├── docs/
│   ├── 01-system-overview.md          # системна архитектура
│   ├── 02-api-strategy.md             # кои API да използваш и защо
│   ├── 03-data-model.md               # таблици в БД
│   ├── 04-user-flows.md               # потребителски сценарии
│   └── 05-deployment.md               # как се deploy-ва
├── frontend/
│   ├── routes.md                      # карта на страниците
│   └── components.md                  # ключови компоненти
├── backend/
│   ├── api-gateway.md                 # auth, rate limiting
│   ├── services/
│   │   ├── vin-service.md
│   │   ├── parts-service.md
│   │   ├── compatibility-service.md
│   │   ├── pricing-service.md
│   │   ├── ai-recommendation-service.md
│   │   ├── shipping-service.md
│   │   ├── vehicle-history-service.md
│   │   └── payments-service.md
│   └── integrations/
│       ├── nhtsa-vpic.md
│       ├── tecdoc-aces.md
│       ├── carapi.md
│       ├── realoem.md
│       ├── carvertical.md
│       ├── econt.md
│       └── speedy.md
├── database/
│   └── schema.sql                     # PostgreSQL схема
├── mock-data/
│   ├── vehicles.json
│   ├── parts.json
│   └── orders.json
└── infra/
    └── docker-compose.yml
```

## Технологичен стек (препоръка)

| Слой | Технология |
|------|------------|
| Frontend | React + Vite + TypeScript + TailwindCSS |
| Backend | Node.js (NestJS) или Python (FastAPI) |
| База данни | PostgreSQL 16 |
| Search | Elasticsearch (за части по марка/модел/OEM №) |
| Cache | Redis (VIN резултати, цени) |
| Object storage | S3 / Cloudflare R2 (OEM схеми, изображения) |
| AI | Claude (Anthropic) или OpenAI за препоръки |
| Queue | BullMQ / RabbitMQ за товарителници |
| Deploy | Docker + Kubernetes / Railway / Fly.io |

## Започни оттук

1. Прочети `docs/01-system-overview.md` — общата картина
2. След това `docs/02-api-strategy.md` — критично за решения с външни API
3. `database/schema.sql` — създай локалната БД
4. `mock-data/*.json` — за да тестваш без реални интеграции
