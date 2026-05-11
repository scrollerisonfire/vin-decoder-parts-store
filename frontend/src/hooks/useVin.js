import { create } from 'zustand'

export const useVinStore = create((set) => ({
  vin:             '',
  vehicle:         null,
  recommendations: [],
  loading:         false,
  error:           null,
  setVin:             (vin)             => set({ vin }),
  setVehicle:         (vehicle)         => set({ vehicle }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setLoading:         (loading)         => set({ loading }),
  setError:           (error)           => set({ error }),
  reset: () => set({ vin: '', vehicle: null, recommendations: [], error: null }),
}))