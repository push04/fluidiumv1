
import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function DataTable(){
  const { data } = useApp();
  const cols = data.length? Object.keys(data[0]).filter(k=>k!=='time') : [];
  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-lg shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Data</h2>
      </div>
      <div className="overflow-auto h-80">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-3 py-2 text-left">Time</th>
              {cols.map(c => <th key={c} className="px-3 py-2 text-left">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="even:bg-gray-50 dark:even:bg-gray-800">
                <td className="px-3 py-1">{new Date(row.time).toLocaleTimeString()}</td>
                {cols.map(c => <td key={c} className="px-3 py-1">{typeof row[c] === 'number' ? row[c].toFixed(2) : String(row[c])}</td>)}
              </tr>
            ))}
            {data.length===0 && (
              <tr><td colSpan={cols.length+1} className="px-3 py-3 text-center">No data yet. Click <b>Start</b> to run the simulation.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
