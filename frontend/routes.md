# Frontend — карта на страниците

## Routes

| Path | Описание |
|------|----------|
| `/` | Начална страница — VIN търсене + категории |
| `/vin/:vin` | Резултат от VIN декодиране + препоръчани части |
| `/catalog` | Преглед по марка/модел |
| `/catalog/:make` | Списък модели на марка (BMW → Серия 1, 3, 5...) |
| `/catalog/:make/:model` | Категории части за модел |
| `/catalog/:make/:model/oem-schemes` | OEM explosion views (за BMW през RealOEM) |
| `/parts/:id` | Детайл на част + сравнение на цени |
| `/search?q=...` | Текстово търсене |
| `/cart` | Кошница |
| `/checkout` | Адрес + офис на Еконт/Спиди + плащане |
| `/orders` | Моите поръчки (потребителски) |
| `/orders/:id` | Детайл + tracking |
| `/vin-check` | CarVertical проверка на история |
| `/vin-check/:reportId` | Резултат от отчет |
| `/login`, `/register` | Auth |
| `/admin/*` | Админ панел |

## Ключови компоненти

- `<VinInput />` — приема VIN, валидира 17 знака, дебъсва автокомплитнат
- `<VehicleCard />` — карта с декодиран автомобил
- `<PartCard />` — карта на част + бутон "Препоръчай за моя автомобил"
- `<PriceComparisonTable />` — таблица със цени от различни магазини
- `<AiAssistant />` — чат интерфейс за препоръки
- `<OemSchemeViewer />` — интерактивна SVG диаграма (zoom, click → част)
- `<EcontOfficePicker />` — dropdown с офиси (от Еконт API)
- `<SpeedyOfficePicker />` — същото за Спиди
- `<ShippingProviderSwitch />` — избор между двете
- `<CartDrawer />` — slide-out кошница
- `<VinHistoryUpsell />` — "Виж пълна история — 19.99 лв"
