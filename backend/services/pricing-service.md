# Pricing Service

Сравнява цени между наши магазини и външни конкуренти.

## Източници
1. Локална `inventory` таблица (наши магазини)
2. Партньорски API (ако има)
3. Scraped цени от конкуренти (cron, не realtime)

## Method

```ts
async getPrices(partId: string): Promise<PriceQuote[]> {
  // [{ store, price, stock, deliveryDays, affiliateUrl?, isInternal }]
}
```

## Scraping стратегия

⚠️ Внимание: scraping може да наруши ToS на конкуренти. Алтернативи:
- Партньорски програми (commission)
- Marketplace интеграции
- Договорни data feeds

```
cron */15 * * * *  → scrape job runner
```

## Кеш
Redis 15 минути за `prices:{partId}`.

## Алгоритъм "най-добра цена"

```ts
function bestDeal(quotes: PriceQuote[]) {
  return quotes
    .filter(q => q.stock > 0)
    .map(q => ({ ...q, total: q.price + q.shipping }))
    .sort((a, b) => a.total - b.total)[0];
}
```
