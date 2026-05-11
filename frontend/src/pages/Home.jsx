import React from 'react'
import VinLookup from '../components/VinLookup'
import { useVinStore } from '../store/vinStore'

const Home = () => {
  const { vehicle } = useVinStore()

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 pb-32">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-display text-7xl md:text-9xl mb-4 tracking-tighter uppercase">
          AutoParts <span className="text-accent text-shadow-glow">AI</span>
        </h1>
        <p className="text-muted text-xl max-w-2xl mx-auto font-light tracking-wide">
          Следващото поколение търсене на части. 
          Задвижвано от изкуствен интелект, създадено за твоята машина.
        </p>
      </div>

      {/* VIN Lookup Box */}
      <div className="max-w-3xl mx-auto bg-surface border border-border p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
        <div className="mb-6">
          <h2 className="font-display text-3xl uppercase tracking-tight">Въведи VIN номер</h2>
          <p className="text-muted text-sm">Ще анализираме конфигурацията и ще открием точните части.</p>
        </div>
        
        <VinLookup />
      </div>

      {/* Stats/Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        {[
          { label: 'Точност', val: '100%', desc: 'Гарантирано съвпадащи части' },
          { label: 'Каталог', val: '2M+', desc: 'Оригинални и афтърмаркет части' },
          { label: 'AI Анализ', val: 'Instant', desc: 'Мигновена проверка на съвместимост' }
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 border-t border-border/50">
            <div className="text-accent font-display text-4xl mb-1">{stat.val}</div>
            <div className="font-bold uppercase text-xs tracking-widest mb-2">{stat.label}</div>
            <div className="text-muted text-sm">{stat.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home