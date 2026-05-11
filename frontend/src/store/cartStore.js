import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (part) => {
        const existing = get().items.find(i => i.id === part.id)
        if (existing) {
          set({ items: get().items.map(i => i.id === part.id ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...get().items, { ...part, qty: 1 }] })
        }
      },
      removeItem: (id)      => set({ items: get().items.filter(i => i.id !== id) }),
      updateQty:  (id, qty) => {
        if (qty < 1) { get().removeItem(id); return }
        set({ items: get().items.map(i => i.id === id ? { ...i, qty } : i) })
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: 'autoparts-cart' }
  )
)