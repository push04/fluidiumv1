
import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Onboarding(){
  const { ui, setUi } = useApp();
  if (!ui.showOnboard) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="welcome-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="card w-[min(92vw,680px)] p-6">
        <h2 id="welcome-title" className="text-xl font-bold mb-2">Welcome to Fluidium</h2>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>Select an experiment from the left.</li>
          <li>Adjust parameters with the number fields or sliders.</li>
          <li>Press <b>Start</b>. For WebGL fluid, drag on the canvas to inject flow.</li>
          <li>Use the toolbar to save <b>Presets</b>, export <b>CSV</b>, or take a <b>Snapshot</b>.</li>
        </ol>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={()=>setUi(u=>({...u, showOnboard:false}))}>Close</button>
        </div>
      </div>
    </div>
  )
}
