import express from 'express';
const router = express.Router();

// Mock VIN database
const VIN_DB = {
  'WBAFG81080LY12345': { vin:'WBAFG81080LY12345', make:'BMW', model:'M5', year:2008, engine:'5.0L V10 S85', trim:'E60' },
  'WDD2050421F123456': { vin:'WDD2050421F123456', make:'Mercedes-Benz', model:'C220', year:2015, engine:'2.1L CDI', trim:'W205' },
  '1HGCM82633A004352': { vin:'1HGCM82633A004352', make:'Honda', model:'Accord', year:2003, engine:'2.4L i-VTEC', trim:'7th Gen' },
  'JN1AZ4EH0FM730213': { vin:'JN1AZ4EH0FM730213', make:'Nissan', model:'370Z', year:2015, engine:'3.7L VQ37VHR', trim:'Nismo' },
};

const RECS_DB = {
  'WBAFG81080LY12345': [
    { id:1, name:'Маслена помпа BMW N54', sku:'BMW-N54-OP001', price:189, priority:'Препоръчително', icon:'🔧' },
    { id:5, name:'Маслен филтър Mann W719/5', sku:'MAN-W7195', price:14, priority:'Задължително', icon:'🧹' },
    { id:7, name:'Ангренажен ремък Gates', sku:'GAT-TK-BMW', price:156, priority:'Препоръчително', icon:'⚙️' },
  ],
  'WDD2050421F123456': [
    { id:4, name:'Алтернатор Valeo 120A', sku:'VAL-ALT-120', price:345, priority:'По преценка', icon:'🔌' },
    { id:12, name:'Горивен филтър Mahle KL151', sku:'MAH-KL151', price:32, priority:'Задължително', icon:'🧹' },
    { id:2, name:'Предни спирачни дискове Brembo', sku:'BRB-312-FD', price:124, priority:'Препоръчително', icon:'🛑' },
  ],
  '1HGCM82633A004352': [
    { id:6, name:'Въздушен филтър K&N', sku:'KN-E-0815', price:89, priority:'Задължително', icon:'💨' },
    { id:2, name:'Предни спирачни дискове Brembo', sku:'BRB-312-FD', price:124, priority:'Препоръчително', icon:'🛑' },
    { id:5, name:'Маслен филтър Mann W719/5', sku:'MAN-W7195', price:14, priority:'Задължително', icon:'🧹' },
  ],
};

// GET /api/vin/:vin — decode
router.get('/:vin', async (req, res) => {
  const vin = req.params.vin.toUpperCase();

  // Try NHTSA first
  try {
    const nhtsaRes = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    );
    const nhtsaData = await nhtsaRes.json();
    const results = nhtsaData.Results;

    const get = (var_) => results.find(r => r.Variable === var_)?.Value;
    const make  = get('Make');
    const model = get('Model');
    const year  = get('Model Year');
    const engine = get('Displacement (L)') ? `${get('Displacement (L)')}L ${get('Engine Configuration') || ''}`.trim() : null;

    if (make && make !== 'null' && make !== null) {
      return res.json({ vin, make, model, year, engine: engine || 'N/A', trim: get('Trim') || '' });
    }
  } catch (e) {
    console.log('NHTSA failed, using mock:', e.message);
  }

  // Fallback to mock
  const mock = VIN_DB[vin];
  if (mock) return res.json(mock);

  res.status(404).json({ error: 'VIN not found' });
});

// GET /api/vin/:vin/recommendations
router.get('/:vin/recommendations', (req, res) => {
  const vin = req.params.vin.toUpperCase();
  const recs = RECS_DB[vin] || [];
  res.json(recs);
});

export default router;