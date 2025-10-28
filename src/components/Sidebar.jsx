
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { experiments } from '../experiments/registry';

export default function Sidebar(){
  const { selectedExperiment, setSelectedExperiment, ui } = useApp();
  return (
    <aside className={`${ui.showSidebar ? 'block' : 'hidden'} lg:block w-80 border-r border-gray-200 dark:border-gray-700 card`}>
      <div className="p-4">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Experiments</h2>
        <nav className="space-y-1">
          {Object.values(experiments).map(exp => (
            <button key={exp.id} onClick={()=>setSelectedExperiment(exp.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors
              ${selectedExperiment===exp.id ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {exp.title}
            </button>
          ))}
        </nav>
        <div className="mt-4">
          <label className="label">Mobile Experiment Picker</label>
          <select className="input" value={selectedExperiment} onChange={e=>setSelectedExperiment(e.target.value)}>
            {Object.values(experiments).map(exp => <option key={exp.id} value={exp.id}>{exp.title}</option>)}
          </select>
        </div>
      </div>
    </aside>
  )
}
