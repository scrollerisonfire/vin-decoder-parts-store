import express from 'express';
const router = express.Router();

// Mock competitor prices — в production тук идва scraper/API
const COMPETITOR_PRICES = {
  'BRB-312-FD':    [{ source:'Autodoc.bg', price:138 }, { source:'Amazon.de', price:151 }],
  'MAN-W7195':     [{ source:'Autodoc.bg', price:16  }, { source:'Elit.bg',   price:15  }],
  'BIL-B6-VWG':    [{ source:'Autodoc.bg', price:235 }, { source:'Amazon.de', price:249 }],
  'BSH-S5-74':     [{ source:'Autodoc.bg', price:248 }, { source:'Elit.bg',   price:239 }],
  'KN-E-0815':     [{ source:'Autodoc.bg', price:95  }, { source:'Amazon.de', price:102 }],
};

router.get('/:sku', (req, res) => {
  const competitors = COMPETITOR_PRICES[req.params.sku] || [];
  res.json({ sku: req.params.sku, competitors });
});

export default router;