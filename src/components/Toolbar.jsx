
import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { exportCSV } from '../utils/dataExport.js';

export default function Toolbar({ canvasRef }){
  const { data, selectedExperiment, presets, savePreset, loadPreset, deletePreset } = useApp();
  const [presetName, setPresetName] = useState('Standard');
  const expPresets = useMemo(() =>
    Object.keys(presets).filter(k => k.startsWith(selectedExperiment+':'))
      .map(k => k.split(':')[1])
  , [presets, selectedExperiment]);

  const handleSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a'); a.href = url; a.download = `${selectedExperiment}-snapshot.png`; a.click();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3" role="toolbar" aria-label="Experiment toolbar">
      <button onClick={()=>exportCSV(data, `${selectedExperiment}-data`)} className="btn btn-ghost" aria-label="Download CSV"><i className="fas fa-file-csv" aria-hidden="true"></i> CSV</button>
      <button onClick={handleSnapshot} className="btn btn-ghost" aria-label="Download snapshot image"><i className="fas fa-camera" aria-hidden="true"></i> Snapshot</button>
      <div className="ml-auto flex items-center gap-2">
        <label className="sr-only" htmlFor="preset-input">Preset name</label>
        <input id="preset-input" value={presetName} onChange={e=>setPresetName(e.target.value)} className="input w-40" placeholder="Preset name" />
        <button onClick={()=>savePreset(presetName)} className="btn btn-primary" aria-label="Save preset"><i className="fas fa-save" aria-hidden="true"></i> Save</button>
        <label className="sr-only" htmlFor="preset-select">Load preset</label>
        <select id="preset-select" onChange={e=>loadPreset(e.target.value)} defaultValue="" className="input w-36" aria-label="Load preset">
          <option value="" disabled>Load Preset</option>
          {expPresets.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={()=>deletePreset(presetName)} className="btn btn-ghost" aria-label="Delete preset"><i className="fas fa-trash" aria-hidden="true"></i></button>
      </div>
    </div>
  )
}
