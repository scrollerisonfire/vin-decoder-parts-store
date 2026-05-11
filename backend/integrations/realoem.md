# RealOEM (BMW OEM схеми)

**Без официално API. Използва се чрез scraping (с уважение към ToS).**

URL: https://www.realoem.com

## Структура на URL-те
```
https://www.realoem.com/bmw/enUS/showparts?id={chassis_id}&diagId={diagram_id}
```

## Стратегия

### Опция 1: Scraper + cache (препоръка за MVP)
```
1. При първо искане на схема → headless browser (Playwright)
2. Извличане на:
   - SVG диаграма
   - Координати на номерата
   - OEM номера и описания
3. Запазване в S3 + Postgres → следващи заявки от cache
4. Refresh cache на 30 дни
```

⚠️ Уважавай robots.txt и не претоварвай.

### Опция 2: Партньорство
Свържи се с RealOEM за официален data feed (не е публикуван, но е възможен).

### Опция 3: TecDoc графики
TecDoc предоставя вградени схеми като част от лиценза. По-чисто решение.

## Данни модел

```ts
interface OemDiagram {
  make: 'BMW';
  chassis: 'F30' | 'E90' | ...;
  category: 'engine' | 'transmission' | 'suspension' | ...;
  subcategory: string;
  svgUrl: string;       // в S3
  hotspots: Array<{
    number: number;     // номер на схемата
    coordinates: { x, y, w, h };
    oemNumber: string;
    name: string;
  }>;
}
```

## Други марки
- VW/Audi — EPC (без публичен API)
- Mercedes — EPC / WIS
- Toyota — Toyodiy
- Универсално — Partsouq (scraping)
