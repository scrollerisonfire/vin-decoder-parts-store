import React from 'react'
import { useVinStore } from '../store/vinStore'
import { useCartStore } from '../store/cartStore'
import { useParts } from '../hooks/useParts'
import { ShoppingCart, Cpu, AlertTriangle } from 'lucide-react'

const Catalog = () => {
  const { vehicle } = useVinStore()
  const addItem = useCartStore(state => state.addItem)
  
  // Взимаме частите според колата
  const { data: parts, isLoading } = useParts({ 
    make: vehicle?.make, 
    model: vehicle?.model 
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Информация за разпознатата кола */}
      <div className="bg-surface2 border border-border p-6 rounded-2xl mb-12 flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase leading-none">
            {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Общ каталог'}
          </h1>
          <p className="text-muted text-sm tracking-widest uppercase mt-2">
            {vehicle?.vin ? `VIN: ${vehicle.vin}` : 'Въведете VIN за прецизни резултати'}
          </p>
        </div>
        {vehicle && <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold border border-accent/20 animate-pulse">AI Оптимизиран списък</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-20 text-muted italic">Търсим най-добрите части в склада...</div>
        ) : parts?.map(part => (
          <div key={part.id} className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-all group">
            <div className="aspect-square bg-bg rounded-lg mb-4 flex items-center justify-center overflow-hidden">
               <img src={part.image || 'https://via.placeholder.com/200?text=PART'} alt={part.name} className="opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-bold text-lg mb-1 leading-tight">{part.name}</h3>
            <p className="text-muted text-xs uppercase mb-4">{part.brand} | {part.category}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-accent font-display text-2xl">{part.price} лв.</span>
              <button 
                onClick={() => addItem(part)}
                className="p-2 bg-surface2 border border-border hover:bg-accent rounded-lg transition-colors"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog