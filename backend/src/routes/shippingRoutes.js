import express from 'express';
const router = express.Router();

// Mock offices — в production: Econt API + Speedy API
const OFFICES = {
  econt: [
    { id:'e1', name:'Еконт — София Младост', address:'ж.к. Младост 1, бл. 1', city:'София' },
    { id:'e2', name:'Еконт — София Люлин',   address:'ж.к. Люлин 2, бл. 201',  city:'София' },
    { id:'e3', name:'Еконт — Пловдив Център',address:'ул. Мария Луиза 5',       city:'Пловдив' },
  ],
  speedy: [
    { id:'s1', name:'Спийди — София Дружба', address:'ж.к. Дружба 2, бл. 3',   city:'София' },
    { id:'s2', name:'Спийди — София Надежда',address:'ж.к. Надежда, бл. 15',    city:'Sofia' },
    { id:'s3', name:'Спийди — Варна Левски', address:'ж.к. Левски, бл. 11',     city:'Варна' },
  ],
};

router.get('/offices', (req, res) => {
  const { carrier } = req.query;
  const offices = carrier ? (OFFICES[carrier] || []) : OFFICES;
  res.json({ offices });
});

router.post('/calculate', (req, res) => {
  const { carrier, weightKg = 2 } = req.body;
  const basePrice = carrier === 'speedy' ? 6.49 : 7.99;
  const price = basePrice + (weightKg > 5 ? (weightKg - 5) * 0.80 : 0);
  res.json({ carrier, price: Number(price.toFixed(2)), estimatedDays: 1 });
});

export default router;