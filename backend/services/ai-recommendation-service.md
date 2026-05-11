# AI Recommendation Service

Препоръчва части на хора, които не разбират от автомобили.

## Stack
- **Claude Sonnet 4** (Anthropic API) — основен модел
- Function calling за достъп до твоите данни
- Streaming за UX

## Workflow

```
User: "Колата ми скърца като спирам"
  ↓
Vehicle context: { make: BMW, model: F30, year: 2014, engine: N47D20 }
  ↓
Claude:
  - tool_call: searchParts({ category: "brake_pads", vehicle })
  - tool_call: searchParts({ category: "brake_discs", vehicle })
  - tool_call: comparePrices(partIds)
  ↓
Response (structured):
{
  diagnosis: "Симптомът подсказва износени накладки или дискове.",
  recommendations: [
    { partId, brand: "Brembo", price: 78, reason: "Отлично качество, OEM спецификация" },
    { partId, brand: "Bosch", price: 62, reason: "По-евтина алтернатива, добро качество" }
  ],
  diy_difficulty: "Средна — нужни инструменти и крик",
  estimated_labor_cost: "60-100 лв в сервиз"
}
```

## System prompt (изваден файл)

```
Ти си експерт авто-механик с 20 г. опит. Помагаш на хора, които не разбират от коли,
да изберат правилните части за своя автомобил. Винаги:
- Обяснявай на прост език
- Предлагай 2-3 алтернативи (евтина / средна / премиум)
- Бъди честен — ако не си сигурен, кажи "трябва диагностика в сервиз"
- Никога не препоръчвай части, които не са в инвентара (използвай предоставените инструменти)
```

## Гардове
- Rate limit: 10 req/min на user (Claude е скъп)
- Max tokens: 1500 на отговор
- Audit log на всяка препоръка → таблица `ai_recommendations`
- Fallback: ако AI fails → "Препоръчани от експертите" (top sellers по категория)

## Цена изчисление
~$0.003 на стандартна заявка → при 1000 заявки/ден → ~$3/ден.
