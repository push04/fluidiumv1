
import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { exportCSV } from '../utils/dataExport.js';

export default function Toolbar({ canvasRef }){
  const { data, selectedExperiment, presets, savePreset, loadPreset, deletePreset } = useApp();
  const [presetName, setPresetName] = useState('default');

  const handleSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a'); a.href = url; a.download = `${selectedExperiment}-snapshot.png`; a.click();
  };

  const expPresets = Object.keys(presets).filter(k => k.startsWith(selectedExperiment+':'))
    .map(k => k.split(':')[1]);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <button onClick={()=>exportCSV(data, `${selectedExperiment}-data`)} className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700">Download CSV</button>
      <button onClick={handleSnapshot} className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700">Snapshot PNG</button>
      <div className="ml-auto flex items-center gap-2">
        <input value={presetName} onChange={e=>setPresetName(e.target.value)} className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent" />
        <button onClick={()=>savePreset(presetName)} className="px-3 py-2 rounded bg-secondary text-white">Save Preset</button>
        <select onChange={e=>loadPreset(e.target.value)} defaultValue="">
          <option value="" disabled>Load Preset</option>
          {expPresets.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={()=>deletePreset(presetName)} className="px-3 py-2 rounded bg-accent text-white">Delete Preset</button>
      </div>
    </div>
  )
}
