# CarVertical API (партньорска интеграция)

**Платено per-report. Revenue share модел.**

URL: https://www.carvertical.com (за партньори: partners.carvertical.com)

## Setup
1. Регистрирай се за партньорска програма
2. Получаваш `partner_id` и API ключ
3. Договори се за условията (commission %)

## Workflow

```
POST https://api.carvertical.com/v1/reports
Headers: Authorization: Bearer {API_KEY}
Body: {
  "vin": "WBA3B5C50EJ986123",
  "partner_id": "your_id",
  "external_order_id": "your_order_uuid"
}
```

Отговор:
```json
{
  "report_id": "rpt_abc123",
  "status": "ready" | "processing",
  "report_url": "https://carvertical.com/reports/...",
  "data": { ... }   // структурирани данни (mileage, accidents, ...)
}
```

## Webhook за завършен отчет
```
POST /api/webhooks/carvertical
{ report_id, status: "ready", report_url, data }
```

## UI flow
1. User въвежда VIN → "Виж пълен отчет — 19.99 лв"
2. Stripe checkout
3. След плащане → backend извиква CarVertical
4. Показва се отчет (embed PDF или собствен UI върху JSON данните)
5. Email с линк (валиден 30 дни)

## Cost (примерно)
- За партньор: ~10-12 лв на отчет
- Продаваш на ~19.99 лв
- Маржин: 7-8 лв на отчет

## Важно
- Не извиквай преди потвърдено плащане
- Кеширай по VIN — ако same VIN до 30 дни → от cache
- Audit log за reconciliation с CarVertical billing
