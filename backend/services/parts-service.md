# Parts Service

CRUD над `parts`, `inventory`, `stores`. Експозва каталога и наличностите.

## Methods

```ts
listParts(filter: { make?, model?, year?, category?, oem?, page, pageSize })
getPart(id)
getPartCompatibility(id) → списък съвместими автомобили
syncFromTecDoc(brandId)   // cron, обновява каталога
updateInventory(partId, storeId, { stock, price })
```

## Sync с TecDoc (cron, daily)

```
1. За всеки производител (Bosch, Brembo...):
   GET TecDoc /articles?supplierId=X&page=N
2. Upsert в `parts`
3. За всеки article → GET /linkages → upsert в `part_compatibility`
```

## Search

Elasticsearch индекс `parts_v1` с полета: `oem_number`, `name`, `brand`, `category`, `make`, `model`.

```
PUT parts_v1/_doc/{partId}
{ oem_number, brand, name, vehicles: ["BMW F30", "BMW E90"] }
```

Frontend търсене → `/api/parts?q=...` → Elasticsearch → ID-та → подробности от Postgres.
