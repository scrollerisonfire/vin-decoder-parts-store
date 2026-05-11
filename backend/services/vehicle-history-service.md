# Vehicle History Service (CarVertical)

Продава отчети за история на автомобил по VIN. Revenue share модел.

## Workflow

```
1. User → POST /api/vin-check/order { vin }
2. Backend:
   - Валидира VIN
   - Създава Stripe Checkout Session за 19.99 лв (или твоята цена)
   - Връща checkout URL
3. User плаща
4. Stripe webhook → /api/webhooks/stripe (event: checkout.session.completed)
5. Backend:
   - Verify signature (CRITICAL)
   - Извлича vin от metadata
   - Извиква CarVertical API: POST /reports { vin, partner_id }
   - Получава: report_id + report_url (или JSON)
   - Записва в vin_history_reports
   - Email на клиента
6. User вижда отчета на /vin-check/:reportId
```

## Important
- **Никога не извиквай CarVertical преди потвърдено плащане** (платено е on-demand)
- Кеширай отчетите — ако same VIN се иска отново до 30 дни → не плащай отново
- Revenue split — потвърди условията с CarVertical партньорска програма

## Цена/маржин примерен модел

| Поле | Стойност |
|------|----------|
| Цена за клиента | 19.99 лв |
| CarVertical cost | ~12 лв |
| Stripe fee | ~0.50 лв |
| **Маржин** | **~7.49 лв** |

Виж: `backend/integrations/carvertical.md`
