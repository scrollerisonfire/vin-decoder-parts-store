# Compatibility Service

Отговаря на въпроса: "Тази част пасва ли на този автомобил?"

## Източници на истина (по приоритет)
1. TecDoc linkages (най-авторитетно за Европа)
2. ACES (за US пазар)
3. Ръчно потвърдени съвместимости от админ
4. AI inference (само като подсказка, не като продажбено обещание)

## Public method

```ts
async checkCompatibility(partId: string, vehicle: { make, model, year, engineCode }): Promise<{
  compatible: boolean;
  source: 'tecdoc' | 'manual' | 'ai_suggestion';
  confidence: number;  // 0-1
}> { ... }
```

## Заявка към БД

```sql
SELECT 1 FROM part_compatibility
WHERE part_id = $1
  AND vehicle_make = $2
  AND vehicle_model = $3
  AND $4 BETWEEN year_from AND year_to
  AND ($5 IS NULL OR engine_code = $5)
LIMIT 1;
```

## UI правила
- ✅ Зелена отметка "Гарантирано пасва" — ако TecDoc го потвърждава
- ⚠️ Жълто "Вероятно пасва" — AI suggestion
- ❌ Не показвай несъвместими в основния списък
