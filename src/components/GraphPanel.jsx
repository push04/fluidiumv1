
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { getExperiment } from '../experiments/registry';

export default function GraphPanel(){
  const { data, selectedExperiment } = useApp();
  const exp = getExperiment(selectedExperiment);
  const lines = exp.graph.lines || [];
  const formatted = data.map(d => ({ ...d, t: new Date(d.time).toLocaleTimeString() }));
  return (
    <section className="card p-4" aria-label="Live Graph">
      <h2 className="text-lg font-semibold mb-2">Live Graph</h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            {lines.map(l => (
              <Line key={l.key} dataKey={l.key} yAxisId={l.yAxisId} type="monotone" stroke={l.color} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
