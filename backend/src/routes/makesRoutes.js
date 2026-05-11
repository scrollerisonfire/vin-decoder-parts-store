import express from 'express';
const router = express.Router();

const MAKES = [
  { slug:'bmw',        name:'BMW',          logo:'🇩🇪' },
  { slug:'mercedes',   name:'Mercedes-Benz',logo:'⭐'  },
  { slug:'volkswagen', name:'Volkswagen',   logo:'🔵'  },
  { slug:'audi',       name:'Audi',         logo:'⭕'  },
  { slug:'toyota',     name:'Toyota',       logo:'🔴'  },
  { slug:'ford',       name:'Ford',         logo:'🔷'  },
  { slug:'opel',       name:'Opel',         logo:'⚡'  },
  { slug:'honda',      name:'Honda',        logo:'🏍'  },
];

const MODELS = {
  bmw: [
    { slug:'m5',  name:'M5',  yearRange:'2005-2010', partsCount:148 },
    { slug:'m3',  name:'M3',  yearRange:'2007-2013', partsCount:203 },
    { slug:'530d',name:'530d',yearRange:'2003-2010', partsCount:312 },
    { slug:'320i',name:'320i',yearRange:'2005-2012', partsCount:289 },
  ],
  mercedes: [
    { slug:'c220', name:'C220', yearRange:'2014-2021', partsCount:195 },
    { slug:'e350', name:'E350', yearRange:'2009-2016', partsCount:241 },
  ],
  volkswagen: [
    { slug:'golf',    name:'Golf',    yearRange:'2003-2020', partsCount:418 },
    { slug:'passat',  name:'Passat',  yearRange:'2005-2019', partsCount:367 },
  ],
  toyota: [
    { slug:'corolla', name:'Corolla', yearRange:'2007-2022', partsCount:284 },
    { slug:'yaris',   name:'Yaris',   yearRange:'2005-2020', partsCount:198 },
  ],
};

router.get('/', (_, res) => res.json({ makes: MAKES }));

router.get('/:make/models', (req, res) => {
  const models = MODELS[req.params.make.toLowerCase()] || [];
  res.json({ models });
});

export default router;