import React from 'react'
import { Cpu, Sparkles } from 'lucide-react'

const AiAssistant = ({ diagnosis }) => {
  return (
    <div className="bg-gradient-to-br from-surface to-bg border border-accent/30 p-6 rounded-2xl relative overflow-hidden my-8">
      <div className="absolute -right-4 -top-4 text-accent/10"><Cpu size={120} /></div>
      <div className="flex items-center gap-2 text-accent mb-3">
        <Sparkles size={18} />
        <span className="font-bold uppercase tracking-tighter">AI Диагностика</span>
      </div>
      <p className="text-lg leading-relaxed italic text-gray-200">
        "{diagnosis || "Изчаквам VIN за анализ на специфични проблеми за вашия двигател..."}"
      </p>
    </div>
  )
}

export default AiAssistant