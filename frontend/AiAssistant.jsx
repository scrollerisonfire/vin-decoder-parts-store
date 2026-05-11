import { useState } from 'react';
import styles from './AiAssistant.module.css';

export default function AiAssistant({ vehicle }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const askAi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, vehicle })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error("Грешка при AI:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <div className={styles.header}>✨ AI ЕКСПЕРТ-МЕХАНИК</div>
        <input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Опиши проблема (напр. Скърца при спиране...)" 
        />
        <button onClick={askAi} disabled={loading || !query}>
          {loading ? 'Анализирам...' : 'ПОЛУЧИ ПРЕПОРЪКА'}
        </button>
      </div>

      {result && (
        <div className="fade-up" style={{ marginTop: '20px' }}>
          <div className={styles.diagnosis}>
            <strong>Диагноза:</strong> {result.diagnosis}
          </div>
          <div className={styles.recList}>
            {result.recommendations.map(rec => (
              <div key={rec.partId} className={styles.recItem}>
                <span>{rec.brand} - {rec.price} лв</span>
                <p>{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}