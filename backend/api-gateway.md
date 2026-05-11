# API Gateway

Централизирана входна точка. Препоръка: **NestJS** (TypeScript) или **FastAPI** (Python).

## Отговорности

1. **Authentication** — JWT валидация
2. **Rate limiting** — защита от abuse и от изхарчване на платени API
3. **CORS** — само от твоите домейни
4. **Logging** — структурирани логове (pino / loguru)
5. **Routing** — диспечира към съответния сървис
6. **Webhooks** — приема callbacks от Stripe, Еконт, Спиди

## Endpoints (публични)

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/me

POST   /api/vin/decode                 # { vin } → vehicle
GET    /api/catalog/makes              # списък марки
GET    /api/catalog/:make/models
GET    /api/catalog/:make/:model/categories
GET    /api/parts                      # филтри: make, model, year, category, oem
GET    /api/parts/:id
GET    /api/parts/:id/compatibility
GET    /api/parts/:id/prices           # сравнение на цени
GET    /api/oem-schemes/:make/:model   # OEM диаграми

POST   /api/ai/recommend               # { vehicleId, query, budget }

POST   /api/cart                       # cart управление
GET    /api/cart
DELETE /api/cart/:itemId

POST   /api/checkout                   # създава Stripe session
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

POST   /api/shipping/econt/offices     # списък офиси
POST   /api/shipping/speedy/offices
POST   /api/shipping/quote             # калкулация на цена
GET    /api/orders/:id/tracking

POST   /api/vin-check/order            # CarVertical поръчка
GET    /api/vin-check/:reportId
```

## Webhooks (от външни)

```
POST   /api/webhooks/stripe            # plaintbasic events
POST   /api/webhooks/econt             # статуси на пратки
POST   /api/webhooks/speedy
```

## Rate limiting примери

| Endpoint | Лимит |
|----------|-------|
| `/api/vin/decode` | 30/мин на IP (защита на платените fallback API) |
| `/api/ai/recommend` | 10/мин на user (Claude е $$) |
| `/api/parts*` (cached) | 200/мин |
| Login | 5/мин на IP |

## Implementation pattern (NestJS)

```ts
@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 200 }]),
    AuthModule, VinModule, PartsModule, AiModule,
    ShippingModule, PaymentsModule, OrdersModule,
  ],
})
export class AppModule {}
```
