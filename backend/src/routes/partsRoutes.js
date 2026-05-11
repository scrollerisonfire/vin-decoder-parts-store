import express from 'express';
const router = express.Router();

const PARTS = [
  { id:1,  icon:'🔧', category:'engine',    categoryLabel:'Двигател',  name:'Маслена помпа BMW N54',           compatibility:'BMW 1/3/5 Series 2006-2013', price:189, inStock:true,  sku:'BMW-N54-OP001' },
  { id:2,  icon:'🛑', category:'brakes',    categoryLabel:'Спирачки',  name:'Предни спирачни дискове Brembo',  compatibility:'Универсален 312mm',          price:124, inStock:true,  sku:'BRB-312-FD'    },
  { id:3,  icon:'⚙️', category:'suspension',categoryLabel:'Окачване',  name:'Амортисьор Bilstein B6',           compatibility:'VW Golf IV/V, Audi A3',      price:218, inStock:true,  sku:'BIL-B6-VWG'    },
  { id:4,  icon:'🔌', category:'electrical',categoryLabel:'Електрика', name:'Алтернатор Valeo 120A',            compatibility:'Mercedes C/E-Class 2000-2008',price:345, inStock:false, sku:'VAL-ALT-120'   },
  { id:5,  icon:'🧹', category:'filters',   categoryLabel:'Филтри',    name:'Маслен филтър Mann W719/5',        compatibility:'BMW / Mini / Rolls-Royce',    price:14,  inStock:true,  sku:'MAN-W7195'     },
  { id:6,  icon:'💨', category:'filters',   categoryLabel:'Филтри',    name:'Въздушен филтър K&N',              compatibility:'Honda Civic 2006-2015',       price:89,  inStock:true,  sku:'KN-E-0815'     },
  { id:7,  icon:'⚙️', category:'engine',    categoryLabel:'Двигател',  name:'Комплект ангренажен ремък Gates',  compatibility:'Toyota 1.6/1.8 VVT-i',       price:156, inStock:true,  sku:'GAT-TK-TOY18'  },
  { id:8,  icon:'🔩', category:'suspension',categoryLabel:'Окачване',  name:'Носач преден ляв Lemföder',        compatibility:'Ford Focus Mk2/Mk3',          price:97,  inStock:true,  sku:'LEM-FF-LCA'    },
  { id:9,  icon:'🔋', category:'electrical',categoryLabel:'Електрика', name:'Акумулатор Bosch S5 74Ah',         compatibility:'Универсален',                 price:229, inStock:true,  sku:'BSH-S5-74'     },
  { id:10, icon:'🌡️', category:'engine',    categoryLabel:'Двигател',  name:'Термостат Wahler с уплътнение',    compatibility:'Opel Astra/Vectra 1.6/1.8',  price:42,  inStock:true,  sku:'WAH-THERM-OP'  },
  { id:11, icon:'🛑', category:'brakes',    categoryLabel:'Спирачки',  name:'Задни накладки TRW',               compatibility:'Audi A4 B6/B7 2001-2008',    price:58,  inStock:true,  sku:'TRW-BP-A4B7'   },
  { id:12, icon:'🧹', category:'filters',   categoryLabel:'Филтри',    name:'Горивен филтър Mahle KL151',       compatibility:'Mercedes E/S-Class CDI',      price:32,  inStock:false, sku:'MAH-KL151'     },
];

// GET /api/parts
router.get('/', (req, res) => {
  let { category, search, sort } = req.query;
  let result = [...PARTS];

  if (category) result = result.filter(p => p.category === category.toLowerCase());
  if (search)   result = result.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.compatibility.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === 'price_asc')  result.sort((a,b) => a.price - b.price);
  if (sort === 'price_desc') result.sort((a,b) => b.price - a.price);
  if (sort === 'name_asc')   result.sort((a,b) => a.name.localeCompare(b.name, 'bg'));

  res.json({ parts: result, total: result.length });
});

// GET /api/parts/:id
router.get('/:id', (req, res) => {
  const part = PARTS.find(p => p.id === Number(req.params.id));
  if (!part) return res.status(404).json({ error: 'Part not found' });
  res.json(part);
});

// GET /api/parts/:make/:model
router.get('/:make/:model', (req, res) => {
  const { make, model } = req.params;
  const { category } = req.query;
  let result = PARTS;
  if (category) result = result.filter(p => p.category === category);
  res.json({ parts: result, make, model, total: result.length });
});

export default router;