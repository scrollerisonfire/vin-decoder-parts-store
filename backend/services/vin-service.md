# VIN Service

## Отговорност
Декодира VIN → връща структурирани данни за автомобила. Кеширане за 30 дни.

## Public method

```ts
async decodeVin(vin: string): Promise<DecodedVehicle> {
  // 1. Валидация
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) throw new BadRequestException();

  // 2. Cache check
  const cached = await redis.get(`vin:${vin}`);
  if (cached) return JSON.parse(cached);

  // 3. Primary: NHTSA vPIC (безплатно)
  let result = await this.fetchNhtsa(vin);

  // 4. Ако данните са непълни → fallback CarAPI
  if (!result.engine_code || !result.body_type) {
    const fallback = await this.fetchCarApi(vin);
    result = { ...result, ...fallback };
  }

  // 5. Persist
  await db.vehicles.upsert({ vin, ...result });
  await redis.setex(`vin:${vin}`, 60 * 60 * 24 * 30, JSON.stringify(result));

  return result;
}
```

## NHTSA call

```
GET https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/{vin}?format=json
```

Map → `{ make, model, year, engine_code, body_type, ... }`.

## Грешки и наблюдение
- ако NHTSA timeout → продължи с CarAPI
- ако и двете fail → 502 + alert (Sentry)
- log всяко уникално VIN (за бизнес метрики)
