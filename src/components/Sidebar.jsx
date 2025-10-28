
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { experiments } from '../experiments/registry';

export default function Sidebar(){
  const { selectedExperiment, setSelectedExperiment } = useApp();
  return (
    <aside className="w-72 hidden lg:block border-r border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
      <div className="p-4">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Experiments</h2>
        <nav className="space-y-1">
          {Object.values(experiments).map(exp => (
            <button key={exp.id} onClick={()=>setSelectedExperiment(exp.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors
              ${selectedExperiment===exp.id ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {exp.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
