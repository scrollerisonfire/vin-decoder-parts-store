import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Cpu } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tighter flex items-center gap-2">
          <Cpu className="text-accent" /> AUTOPARTS AI
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <Link to="/" className="hover:text-accent transition">Начало</Link>
          <Link to="/catalog" className="hover:text-accent transition">Каталог</Link>
          <Link to="/checkout" className="flex items-center gap-2 hover:text-accent transition">
            <ShoppingCart size={18} /> Количка
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar