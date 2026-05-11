# Shipping Service

Интегрира **Еконт** и **Спиди** — двете задължителни за български пазар.

## Methods

```ts
// Списък офиси в град
getEcontOffices(city: string): Promise<Office[]>
getSpeedyOffices(city: string): Promise<Office[]>

// Калкулация цена
quoteShipping(provider, { from, to, weightKg, codAmount? }): Promise<Quote>

// Създаване на товарителница (след поръчка)
createShipment(orderId, provider): Promise<{ tracking: string, labelUrl: string }>

// Tracking
trackShipment(provider, tracking): Promise<TrackingEvent[]>
```

## Workflow при поръчка

```
1. User checkout → избира provider + офис
2. Backend:
   a) Pay със Stripe (или COD)
   b) createShipment() → получаваме tracking + PDF етикет
   c) Save в orders таблица
   d) Email на клиента с tracking
3. Webhook от Еконт/Спиди при всяка промяна на статус
   → update orders.status
   → notify user (email/push)
```

## Office picker UI данни
Кеширай списъка офиси на 24ч (Redis), защото е голям JSON и рядко се променя.

```ts
// /api/shipping/econt/offices?city=Sofia
// → return cached or fetch fresh from Econt
```

## COD (наложен платеж)
Подкрепя се и от двете. При `payment_method = 'cod'`:
- `codAmount` = total + shipping
- Парите идват в твоята банкова сметка от куриера (със закъснение 3-7 дни)

Виж детайли:
- `backend/integrations/econt.md`
- `backend/integrations/speedy.md`
