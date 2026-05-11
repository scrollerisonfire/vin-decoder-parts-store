import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRoutes      from './routes/aiRoutes.js';
import vinRoutes     from './routes/vinRoutes.js';
import partsRoutes   from './routes/partsRoutes.js';
import makesRoutes   from './routes/makesRoutes.js';
import compareRoutes from './routes/compareRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import ordersRoutes  from './routes/ordersRoutes.js';
import cvRoutes      from './routes/carverticalRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/ai',          aiRoutes);
app.use('/api/vin',         vinRoutes);
app.use('/api/parts',       partsRoutes);
app.use('/api/makes',       makesRoutes);
app.use('/api/compare',     compareRoutes);
app.use('/api/shipping',    shippingRoutes);
app.use('/api/orders',      ordersRoutes);
app.use('/api/carvertical', cvRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend works on http://localhost:${PORT}`);
});
