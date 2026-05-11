import axios from 'axios';

// Създаваме инстанция на axios за по-лесно управление (ако имаш бекенд на порт 4000)
const API = axios.create({
  baseURL: 'http://localhost:4000/api' 
});

// 1. Декодиране на VIN (използва външно API)
export const decodeVin = async (vin) => {
  const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
  return response.data;
};

// 2. Вземане на всички части
export const getParts = async () => {
  const response = await API.get('/parts');
  return response.data;
};

// 3. Вземане на конкретна част по ID (Грешката, която виждаш в момента)
export const getPartById = async (id) => {
  const response = await API.get(`/parts/${id}`);
  return response.data;
};

// 4. Търсене на части по категория или име
export const searchParts = async (query) => {
  const response = await API.get(`/parts/search?q=${query}`);
  return response.data;
};