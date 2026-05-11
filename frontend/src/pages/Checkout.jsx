import React from 'react'
import { useCartStore } from '../store/cartStore'
import { Trash2, CreditCard } from 'lucide-react'

const Checkout = () => {
  const { items, removeItem, total, clear } = useCartStore()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display text-5xl mb-8 uppercase">Количка</h1>
      
      {items.length === 0 ? (
        <div className="bg-surface border border-border p-12 text-center rounded-2xl">
          <p className="text-muted mb-4">Количката е празна</p>
          <a href="/catalog" className="text-accent font-bold uppercase tracking-widest text-sm">Към каталога →</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-bg rounded flex items-center justify-center font-bold text-accent italic">PART</div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-xs text-muted italic">Брой: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-display text-xl">{item.price * item.quantity} лв.</span>
                  <button onClick={() => removeItem(item.id)} className="text-muted hover:text-accent"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-surface2 border border-accent/20 p-6 rounded-2xl h-fit">
            <h2 className="font-display text-2xl mb-4">Общо</h2>
            <div className="text-4xl font-display text-accent mb-6">{total()} лв.</div>
            <button className="w-full bg-accent hover:bg-accent2 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              <CreditCard size={20} /> Плащане
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout