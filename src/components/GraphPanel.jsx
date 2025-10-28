import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext.jsx';

export default function GraphPanel(){
  const { chartData } = useAppContext();
  const formatted = chartData.map(p => ({ ...p, time: new Date(p.time).toLocaleTimeString() }));
  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-lg shadow soft">
      <h2 className="text-lg font-semibold mb-3">Velocity &amp; Viscosity over Time</h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#4f46e5" domain={['auto','auto']} />
            <YAxis yAxisId="right" orientation="right" stroke="#ec4899" domain={['auto','auto']} />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="velocity" stroke="#4f46e5" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="viscosity" stroke="#ec4899" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
