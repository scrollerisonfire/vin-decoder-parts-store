# TecDoc / ACES

**Платено. Индустриален стандарт за каталог на части.**

## Защо
- 3M+ части от 800+ производители
- Покрива всички европейски модели
- Точни OEM № и съвместимости (linkages)
- Изображения, документация, схеми

## Достъп
1. Регистрирай се на https://tecalliance.net/
2. Избери план (от ~€500/мес)
3. Получаваш credentials за TecDoc Web Service

## Основни заявки
- `getManufacturers` — производители (Bosch, Brembo, ...)
- `getArticles?supplierId=X` — части на производител (paginated)
- `getArticleLinkages?articleId=Y` — съвместими автомобили
- `getArticleMedia` — изображения
- `getDocumentsByArticle` — PDF, спецификации
- `getVehicleByCriteria` — намиране на автомобил по параметри
- `getArticlesByVehicle` — части за конкретен автомобил

## Sync стратегия
Cron job daily:
```
1. За всеки supplier:
   - getArticles → upsert в `parts`
   - за всеки нов article → getArticleLinkages → upsert в `part_compatibility`
   - getArticleMedia → запази URLs в S3
2. Промени в каталога → push в Elasticsearch
```

## Алтернатива за MVP
**RapidAPI Auto Parts Catalog** — https://rapidapi.com/makingdatameaningful/api/auto-parts-catalog
- По-малко покритие, но free tier
- Подходящо за прототип
