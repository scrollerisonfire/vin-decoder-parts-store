import express from 'express';
import { getAiRecommendation } from '../aiService.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  const { query, vehicle } = req.body;
  const mockInventory = [
    { id: 101, brand: "Brembo", name: "Накладки", price: 85.00 },
    { id: 102, brand: "TRW", name: "Накладки", price: 65.00 }
  ];

  try {
    const recommendation = await getAiRecommendation(query, vehicle, mockInventory);
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: "Грешка при AI услугата" });
  }
});

export default router;
