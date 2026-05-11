# Спиди API

**Безплатно. Задължително за български пазар.**

URL: https://api.speedy.bg/v1/

## Auth
HTTP Basic с username/password от Спиди business account.

## Ключови endpoints

### Списък офиси
```
POST /location/office
Body: { "userName": "...", "password": "...", "siteId": 68134 }
```

### Калкулация
```
POST /calculation
Body: {
  "userName": "...", "password": "...",
  "language": "BG",
  "sender": { "clientId": ... },
  "recipient": { "pickupOfficeId": ... },
  "service": { "serviceIds": [505], "autoAdjustPickupDate": true },
  "content": { "parcelsCount": 1, "totalWeight": 2.5 },
  "payment": {
    "courierServicePayer": "RECIPIENT",
    "cod": { "amount": 156.00, "currency": "BGN" }
  }
}
```

### Създаване на товарителница
```
POST /shipment
// → response: { id, parcels: [{ id, seriesId }], pdfURL }
```

### Tracking
```
POST /track
Body: { "parcels": [{ "id": "..." }] }
```

## Webhook
В Спиди админ панела → задаваш URL за статуси.

## Сравнение с Еконт
- И двете покриват цяла България
- Цени и услуги сходни
- Дай избор на потребителя — не избирай вместо него
- Кеширай списък офиси на 24ч
