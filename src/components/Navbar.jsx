
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { motion } from 'framer-motion';

export default function Navbar(){
  const { theme, toggleTheme, ui, setUi } = useApp();
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow" role="banner">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} className="flex items-center gap-3">
          <img src="/logo192.png" alt="Fluidium logo" className="w-8 h-8" />
          <h1 className="text-2xl font-extrabold tracking-tight">Fluidium ULTRA</h1>
        </motion.div>
        <nav aria-label="Top actions" className="flex items-center gap-2">
          <button onClick={()=>setUi(u=>({...u, showSidebar: !u.showSidebar}))} className="btn btn-ghost touch-target" aria-label="Toggle sidebar"><i className="fas fa-bars" aria-hidden="true"></i></button>
          <button onClick={toggleTheme} className="btn btn-ghost touch-target" aria-label="Toggle theme"><i className={`fas ${theme==='light'?'fa-moon':'fa-sun'}`} aria-hidden="true"></i></button>
        </nav>
      </div>
    </header>
  )
}
