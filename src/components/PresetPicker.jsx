
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
export default function PresetPicker(){
  const { selectedExperiment, experimentMeta, applyCuratedPreset } = useApp();
  const meta = experimentMeta[selectedExperiment];
  if (!meta?.presets?.length) return null;
  return (
    <div className="p-3 card">
      <h3 className="font-medium mb-2">Choose a Setup</h3>
      <ul role="list" className="space-y-2">
        {meta.presets.map(p => (
          <li key={p.key} className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="helper">{p.desc}</div>
            </div>
            <button className="btn btn-ghost touch-target" onClick={()=>applyCuratedPreset(selectedExperiment, p.key)} aria-label={`Apply setup ${p.title}`}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
