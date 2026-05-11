# Еконт API

**Безплатно. Задължително за български пазар.**

URL: https://ee.econt.com/services/

## Auth
HTTP Basic Auth с твоя Еконт business account (username + password).

## Ключови endpoints

### Списък офиси
```
POST https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json
Body: { "countryCode": "BGR", "cityID": 41 }   // Sofia
```

### Калкулация цена
```
POST .../Shipments/ShipmentService.createLabel.json?mode=calculate
Body: {
  "label": {
    "senderClient": { "name": "...", "phones": [...] },
    "senderAddress": { "city": {...}, "street": "..." },
    "receiverClient": { ... },
    "receiverOfficeCode": "1010",
    "packCount": 1,
    "shipmentType": "PACK",
    "weight": 2.5,
    "shipmentDescription": "Auto parts",
    "services": { "cdAmount": 156.00, "cdCurrency": "BGN" }   // COD
  }
}
```

### Създаване на товарителница
```
POST .../Shipments/ShipmentService.createLabel.json
// Same body, без mode=calculate
// Response: { label: { shipmentNumber, pdfURL } }
```

### Tracking
```
POST .../Shipments/ShipmentService.getShipmentStatuses.json
Body: { "shipmentNumbers": ["123456789"] }
```

## Webhook за статуси
Регистрираш URL в Еконт админ панела → пращат POST на всяка промяна.

## Important
- Тествай със **demo акаунт** първо: `https://demo.econt.com/...`
- Production: само след approval от Еконт
- Запази PDF етикета в S3 (потребителят може да го отпечата от профила си)
