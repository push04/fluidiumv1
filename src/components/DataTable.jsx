
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
export default function DataTable(){
  const { data, isRunning } = useApp();
  const cols = data.length? Object.keys(data[0]).filter(k => k!=='time') : [];
  return (
    <section className="card p-4" aria-label="Data Table">
      <h2 className="text-lg font-semibold mb-2">Data</h2>
      <div className="overflow-auto h-80">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-3 py-2 text-left">Time</th>
              {cols.map(c => <th key={c} className="px-3 py-2 text-left">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row,i) => (
              <tr key={i} className="even:bg-gray-50 dark:even:bg-gray-900">
                <td className="px-3 py-1">{new Date(row.time).toLocaleTimeString()}</td>
                {cols.map(c => <td key={c} className="px-3 py-1">{typeof row[c]==='number' ? row[c].toFixed(3) : String(row[c])}</td>)}
              </tr>
            ))}
            {data.length===0 && (
              <tr>
                <td className="px-3 py-3 text-center" colSpan={cols.length+1}>
                  No data yet. {isRunning ? 'Simulation running…' : <>Press <strong>Start</strong> to begin and see results here.</>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
