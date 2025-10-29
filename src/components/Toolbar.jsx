
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { exportCSV } from '../utils/dataExport.js';
export default function Toolbar({ canvasRef }){
  const { data, selectedExperiment } = useApp();
  const handleSnapshot = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const url = canvas.toDataURL('image/png'); const a = document.createElement('a'); a.href = url; a.download = `${selectedExperiment}-snapshot.png`; a.click();
  };
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3" role="toolbar" aria-label="Experiment toolbar">
      <button onClick={()=>exportCSV(data, `${selectedExperiment}-data`)} className="btn btn-ghost touch-target" aria-label="Download CSV"><i className="fas fa-file-csv" aria-hidden="true"></i> CSV</button>
      <button onClick={handleSnapshot} className="btn btn-ghost touch-target" aria-label="Download snapshot image"><i className="fas fa-camera" aria-hidden="true"></i> Snapshot</button>
    </div>
  )
}
