# CarAPI

**Freemium. Глобално. Добро за VIN fallback.**

URL: https://carapi.app/api

## Auth
JWT — извикваш `/auth/login` с credentials → получаваш token (валиден 24ч).

## Полезни endpoints

### VIN decode
```
GET /vin/{vin}
Headers: Authorization: Bearer {token}
```
Връща марка, модел, тип каросерия, опции.

### Brands / Models
```
GET /makes
GET /models?make_id=...
GET /years?make=BMW&model=320i
```

### Trims / Engines
```
GET /trims?make=BMW&model=320i&year=2014
GET /engines?make_model_trim_id=...
```

## Cost
Free tier: ~25 req/ден. Платени планове от $25/мес за 1000 req.

## Кога да го ползваш
- Като fallback на NHTSA когато връщат непълни данни
- За европейски trims/опции
- За автокомплит на марки/модели в UI
