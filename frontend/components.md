# Frontend компоненти — детайли

## VinInput

```tsx
interface VinInputProps {
  onDecoded: (vehicle: DecodedVehicle) => void;
}

// State:
// - vin (string, валидиран regex /^[A-HJ-NPR-Z0-9]{17}$/)
// - loading
// - error

// При submit:
// POST /api/vin/decode { vin }
// → onDecoded(result)
```

## AiAssistant

Streaming chat с Claude. Системен prompt включва декодирания автомобил като контекст.

```tsx
<AiAssistant
  vehicle={decodedVehicle}
  onPartRecommended={(part) => addToCart(part)}
/>
```

Поддържа function calling за:
- `searchParts(category, budget)`
- `comparePrice(partId)`
- `addToCart(partId)`

## OemSchemeViewer

SVG диаграма с интерактивни hotspots:

```tsx
<OemSchemeViewer
  make="BMW"
  model="F30"
  diagram="engine/cylinder-head"
  onPartClick={(oemNumber) => navigate(`/parts?oem=${oemNumber}`)}
/>
```

Данните: SVG + JSON с координати на номерата → запазено в S3, кеширано.

## EcontOfficePicker

```tsx
<EcontOfficePicker
  city="Sofia"  // от user адрес
  onSelect={(office) => setShippingOffice(office)}
/>
```

Зад кулисите: `GET /api/shipping/econt/offices?city=Sofia` (backend кешира 24ч).

## PriceComparisonTable

```tsx
<PriceComparisonTable
  partId="..."
  // Backend връща:
  // [
  //   { store: "Нашият склад", price: 16, stock: 12, delivery: "1-2 дни" },
  //   { store: "AutoZona", price: 18, stock: 5, delivery: "3-5 дни", affiliateUrl: "..." },
  // ]
/>
```
