# NHTSA vPIC API

**Безплатно. Без ключ. Целия свят, US фокус.**

Базов URL: `https://vpic.nhtsa.dot.gov/api/vehicles`

## Endpoints

### Декодиране на VIN (extended values)
```
GET /DecodeVinValuesExtended/{VIN}?format=json
```

Отговор:
```json
{
  "Results": [{
    "Make": "BMW",
    "Model": "320i",
    "ModelYear": "2014",
    "BodyClass": "Sedan/Saloon",
    "EngineConfiguration": "In-Line",
    "EngineCylinders": "4",
    "DisplacementL": "2.0",
    "FuelTypePrimary": "Gasoline",
    ...
  }]
}
```

### Списък марки
```
GET /GetAllMakes?format=json
```

### Модели по марка
```
GET /GetModelsForMake/{make}?format=json
```

## Ограничения
- Не дава Европейски опции (trim, equipment) толкова добре като платени API
- За европейски VIN (особено по-стари) понякога връща непълни данни
- Няма rate limit публикуван, но дръж под 1000 req/мин
