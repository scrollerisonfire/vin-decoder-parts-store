import express from 'express';
const router = express.Router();

const orders = []; // в production: PostgreSQL

router.post('/', (req, res) => {
  const { name, phone, email, address, carrier, items } = req.body;
  if (!name || !phone || !address || !items?.length) {
    return res.status(400).json({ error: 'Липсват задължителни полета' });
  }

  const order = {
    id: `ORD-${Date.now()}`,
    trackingNumber: `AP${Math.floor(Math.random() * 9000000 + 1000000)}`,
    name, phone, email, address, carrier, items,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  console.log('New order:', order.id, '—', carrier, '—', items.length, 'items');

  res.status(201).json(order);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

export default router;