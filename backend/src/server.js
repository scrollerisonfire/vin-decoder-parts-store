import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

app.use(cors()); // Позволява на фронтенда да говори с бекенда
app.use(express.json()); // Позволява на сървъра да чете JSON данни

// Свързваме маршрутите
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Бекендът работи на http://localhost:${PORT}`);
});