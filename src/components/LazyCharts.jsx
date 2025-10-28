
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function LazyCharts({ data, lines }){
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        {lines.map(ln => (
          <Line key={ln.key} yAxisId={ln.yAxisId} type="monotone" dataKey={ln.key} stroke={ln.color} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
