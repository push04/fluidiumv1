
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../context/AppContext.jsx';
import { getExperiment } from '../experiments/registry';

export default function GraphPanel(){
  const { data, selectedExperiment } = useApp();
  const exp = getExperiment(selectedExperiment);
  const formatted = data.map(p => ({ ...p, time: new Date(p.time).toLocaleTimeString() }));
  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-lg shadow-soft">
      <h2 className="text-lg font-semibold mb-3">Live Graph</h2>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            {exp.graph.lines.map((ln, idx) => (
              <Line key={ln.key} yAxisId={ln.yAxisId} type="monotone" dataKey={ln.key} stroke={ln.color} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
