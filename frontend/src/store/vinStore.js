import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useVinStore = create(
  persist(
    (set) => ({
      vehicle: null,
      loading: false,
      error: null,
      
      setVehicle: (vehicle) => set({ vehicle, error: null }),
      setLoading: (loading) => set({ loading }),
      setError:   (error)   => set({ error, loading: false }),
      reset:      ()        => set({ vehicle: null, error: null }),
    }),
    { name: 'vin-storage' } // Това ще запише данните в браузъра (Local Storage)
  )
)