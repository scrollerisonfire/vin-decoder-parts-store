import React, { useState } from 'react'
import { Search, Loader2, CheckCircle2 } from 'lucide-react'
import { decodeVin } from '../lib/api'
import { useVinStore } from '../store/vinStore'
import { useNavigate } from 'react-router-dom'

const VinLookup = () => {
  const [input, setInput] = useState('')
  const { setVehicle, setLoading, setError, loading, error } = useVinStore()
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (input.length < 17) return
    
    setLoading(true)
    try {
      const data = await decodeVin(input)
      setVehicle(data)
      // След успешно търсене, пращаме потребителя в каталога
      setTimeout(() => navigate('/catalog'), 800)
    } catch (err) {
      setError('Невалиден VIN или проблем със сървъра')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          placeholder="ВЪВЕДЕТЕ 17-ЦИФРЕН VIN..."
          maxLength={17}
          className="w-full bg-bg border-2 border-border group-focus-within:border-accent p-5 pr-16 rounded-xl font-mono text-xl tracking-[0.2em] outline-none transition-all"
        />
        <button 
          disabled={loading || input.length < 17}
          className="absolute right-2 top-2 bottom-2 px-4 bg-accent hover:bg-accent2 disabled:bg-surface2 text-white rounded-lg transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
        </button>
      </form>
      
      {error && <p className="mt-3 text-accent text-sm font-bold uppercase tracking-wider italic">! {error}</p>}
      
      <div className="mt-4 flex gap-4 text-[10px] uppercase tracking-widest text-muted font-bold">
        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> AI Анализ</span>
        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> OEM База данни</span>
        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Моментален резултат</span>
      </div>
    </div>
  )
}

export default VinLookup