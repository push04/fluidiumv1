import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { exportCSV, exportJSON } from '../utils/dataExport.js';

export default function DataTable(){
  const { data } = useAppContext();
  const toCSV = () => exportCSV(data, 'fluidium-data');
  const toJSON = () => exportJSON(data, 'fluidium-data');
  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-lg shadow soft">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Data</h2>
        <div className="space-x-2">
          <button onClick={toCSV} className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-secondary">Export CSV</button>
          <button onClick={toJSON} className="px-3 py-1 text-sm rounded bg-secondary text-white hover:bg-accent">Export JSON</button>
        </div>
      </div>
      <div className="overflow-auto h-48">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Velocity (m/s)</th>
              <th className="px-4 py-2 text-left">Viscosity (Pa·s)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-800">
                <td className="px-4 py-1">{new Date(row.time).toLocaleTimeString()}</td>
                <td className="px-4 py-1">{row.velocity.toFixed(2)}</td>
                <td className="px-4 py-1">{row.viscosity.toFixed(2)}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={3} className="text-center px-4 py-2">No data yet. Run the simulation to generate data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
