import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

export default function Navbar(){
  const { theme, toggleTheme } = useAppContext();
  return (
    <header className="bg-primary text-white dark:bg-primary-dark dark:text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Fluidium</h1>
        <button aria-label="Toggle dark mode" onClick={toggleTheme} className="text-xl p-2 rounded hover:bg-white/10 transition-colors">
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
      </div>
    </header>
  )
}
