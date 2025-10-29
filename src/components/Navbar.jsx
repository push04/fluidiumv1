
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
export default function Navbar(){
  const { theme, setTheme } = useApp();
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="" className="w-8 h-8" />
          <h1 className="text-2xl font-extrabold">Fluidium</h1>
        </div>
        <nav className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label="Toggle theme">
            {theme==='light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}
