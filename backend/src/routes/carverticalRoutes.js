import express from 'express';
const router = express.Router();

// Mock previews — в production: CarVertical Partner API
const CV_PREVIEWS = {
  'WBAFG81080LY12345': { recordCount: 47, hasAccident: false, mileageRisk: false, owners: 2 },
  'WDD2050421F123456': { recordCount: 31, hasAccident: true,  mileageRisk: false, owners: 3 },
  '1HGCM82633A004352': { recordCount: 28, hasAccident: false, mileageRisk: true,  owners: 2 },
  'JN1AZ4EH0FM730213': { recordCount: 19, hasAccident: false, mileageRisk: false, owners: 1 },
};

router.get('/preview/:vin', (req, res) => {
  const preview = CV_PREVIEWS[req.params.vin.toUpperCase()];
  if (!preview) return res.json({ recordCount: 0, hasAccident: false, mileageRisk: false });
  res.json(preview);
});

router.post('/buy', (req, res) => {
  const { vin } = req.body;
  if (!vin) return res.status(400).json({ error: 'VIN е задължителен' });
  // В production: Stripe charge + CarVertical API call
  res.json({
    success: true,
    reportUrl: `https://www.carvertical.com/bg/check?vin=${vin}`,
    message: 'Докладът е платен успешно',
  });
});

export default router;