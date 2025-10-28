
import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar(){
  const { theme, toggleTheme } = useApp();
  return (
    <header className="bg-primary text-white dark:bg-primary-dark shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo192.png" alt="Fluidium" className="w-7 h-7" />
          <h1 className="text-2xl font-extrabold tracking-tight">Fluidium</h1>
        </div>
        <button aria-label="Toggle theme" onClick={toggleTheme} className="text-lg px-3 py-2 rounded hover:bg-white/10">
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
      </div>
    </header>
  )
}
