import React, { useState } from 'react';

const VinInput = ({ onDecoded }) => {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Regex за валидация на VIN (17 символа, без I, O, Q)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!vinRegex.test(vin.toUpperCase())) {
      setError('Невалиден VIN номер. Трябва да е точно 17 символа.');
      return;
    }

    setLoading(true);
    try {
      // Тук ще викаме бекенда, когато направим VIN маршрута
      const response = await fetch('http://localhost:4000/api/vin/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin: vin.toUpperCase() }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      onDecoded(data); // Пращаме данните нагоре към основния компонент
    } catch (err) {
      setError('Грешка при разпознаване на VIN. Провери връзката.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Въведи VIN на автомобила</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          maxLength="17"
          className="p-3 border rounded uppercase font-mono tracking-widest focus:border-blue-500 outline-none"
          placeholder="TMBJC7NE..."
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400 transition"
        >
          {loading ? 'Проверка...' : 'Декодирай Автомобил'}
        </button>
      </form>
    </div>
  );
};

export default VinInput;