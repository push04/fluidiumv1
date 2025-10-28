
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
      <button onClick={()=>exportCSV(data, `${selectedExperiment}-data`)} className="btn btn-ghost"><i className="fas fa-file-csv"></i> CSV</button>
      <button onClick={handleSnapshot} className="btn btn-ghost"><i className="fas fa-camera"></i> Snapshot</button>
      <div className="ml-auto flex items-center gap-2">
        <input value={presetName} onChange={e=>setPresetName(e.target.value)} className="input w-40" placeholder="Preset name" />
        <button onClick={()=>savePreset(presetName)} className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
        <select onChange={e=>loadPreset(e.target.value)} defaultValue="" className="input w-36">
          <option value="" disabled>Load Preset</option>
          {expPresets.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={()=>deletePreset(presetName)} className="btn btn-ghost"><i className="fas fa-trash"></i></button>
      </div>
    </div>
  )
}
