
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { experiments } from '../experiments/registry';
export default function Sidebar(){
  const { selectedExperiment, setSelectedExperiment } = useApp();
  return (
    <aside className="w-80 hidden lg:block card border border-gray-200 dark:border-gray-700" aria-label="Experiments">
      <div className="p-4">
        <h2 className="text-sm uppercase tracking-wider text-gray-500">Experiments</h2>
        <nav className="mt-2 space-y-1">
          {Object.values(experiments).map(e => (
            <button key={e.id} onClick={()=>setSelectedExperiment(e.id)}
              aria-current={selectedExperiment===e.id?'page':undefined}
              className={`w-full text-left px-3 py-2 rounded-lg ${selectedExperiment===e.id?'bg-primary text-white':'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {e.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
