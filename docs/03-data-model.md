# 03 — Модел на данните

## Основни таблици

### `vehicles` — каталог на автомобили (от VIN или ръчно)
| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| vin | VARCHAR(17) | Уникален, nullable |
| make | VARCHAR | BMW, Opel ... |
| model | VARCHAR | 320d, Astra H |
| year | INT | |
| engine_code | VARCHAR | N47D20, Z17DTH |
| body_type | VARCHAR | sedan, hatchback |
| decoded_data | JSONB | Целият NHTSA отговор |

### `parts` — авточасти
| Поле | Тип |
|------|-----|
| id | UUID |
| oem_number | VARCHAR — оригинален № |
| brand | VARCHAR — Bosch, Febi |
| name | VARCHAR |
| category | VARCHAR — brakes, filters ... |
| description | TEXT |
| image_urls | TEXT[] |
| weight_kg | DECIMAL |
| tecdoc_id | INT — ако идва от TecDoc |

### `part_compatibility` — кои части пасват на кой автомобил
| Поле | Тип |
|------|-----|
| part_id | UUID FK |
| vehicle_make | VARCHAR |
| vehicle_model | VARCHAR |
| year_from | INT |
| year_to | INT |
| engine_code | VARCHAR |

Индекси: `(vehicle_make, vehicle_model, year_from, year_to)`

### `inventory` — наличности по магазин
| Поле | Тип |
|------|-----|
| id | UUID |
| part_id | UUID FK |
| store_id | UUID FK |
| price_bgn | DECIMAL |
| stock | INT |
| condition | ENUM(new, used, refurbished) |
| updated_at | TIMESTAMP |

### `stores` — магазини / партньори
| Поле | Тип |
|------|-----|
| id | UUID |
| name | VARCHAR |
| is_internal | BOOLEAN — наш или външен |
| api_endpoint | VARCHAR — за scraping/sync |

### `orders` — поръчки
| Поле | Тип |
|------|-----|
| id | UUID |
| user_id | UUID FK |
| status | ENUM(pending, paid, shipped, delivered, cancelled) |
| total_bgn | DECIMAL |
| shipping_provider | ENUM(econt, speedy) |
| tracking_number | VARCHAR |
| econt_label_url | VARCHAR |
| created_at | TIMESTAMP |

### `order_items`
| Поле | Тип |
|------|-----|
| order_id | UUID FK |
| part_id | UUID FK |
| inventory_id | UUID FK |
| quantity | INT |
| unit_price_bgn | DECIMAL |

### `users`
| Поле | Тип |
|------|-----|
| id | UUID |
| email | VARCHAR |
| phone | VARCHAR |
| password_hash | VARCHAR |
| role | ENUM(customer, admin, mechanic) |

### `vin_history_reports` — CarVertical поръчки
| Поле | Тип |
|------|-----|
| id | UUID |
| user_id | UUID FK |
| vin | VARCHAR(17) |
| price_bgn | DECIMAL |
| carvertical_report_id | VARCHAR |
| report_url | VARCHAR |
| paid_at | TIMESTAMP |

### `ai_recommendations` — log за подобряване
| Поле | Тип |
|------|-----|
| id | UUID |
| user_id | UUID |
| query | TEXT |
| vehicle_id | UUID |
| recommended_part_id | UUID |
| user_accepted | BOOLEAN |

## Индекси и оптимизации

```sql
CREATE INDEX idx_parts_oem ON parts(oem_number);
CREATE INDEX idx_compat_vehicle ON part_compatibility(vehicle_make, vehicle_model);
CREATE INDEX idx_inventory_part ON inventory(part_id, price_bgn);
```

Виж `database/schema.sql` за пълния SQL.
