import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

export default function ControlPanel(){
  const { parameters, updateParameter } = useAppContext();
  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-lg shadow soft">
      <h2 className="text-lg font-semibold mb-3">Control Panel</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Flow Velocity: {parameters.flowVelocity.toFixed(2)} m/s</label>
          <input type="range" min="0.1" max="5" step="0.1" value={parameters.flowVelocity} onChange={(e)=>updateParameter('flowVelocity', parseFloat(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Viscosity: {parameters.viscosity.toFixed(2)} Pa·s</label>
          <input type="range" min="0.1" max="2" step="0.05" value={parameters.viscosity} onChange={(e)=>updateParameter('viscosity', parseFloat(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pipe Diameter: {parameters.pipeDiameter.toFixed(2)} m</label>
          <input type="range" min="0.1" max="2" step="0.05" value={parameters.pipeDiameter} onChange={(e)=>updateParameter('pipeDiameter', parseFloat(e.target.value))} className="w-full" />
        </div>
      </div>
    </div>
  )
}
