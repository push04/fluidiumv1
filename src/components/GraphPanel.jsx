
import React, { Suspense } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { getExperiment } from '../experiments/registry';

const LazyCharts = React.lazy(() => import('./LazyCharts.jsx'));

export default function GraphPanel(){
  const { data, selectedExperiment } = useApp();
  const exp = getExperiment(selectedExperiment);
  const formatted = data.map(p => ({ ...p, time: new Date(p.time).toLocaleTimeString() }));
  const descId = 'chart-desc';
  return (
    <section className="p-4 card" aria-label="Live graph" aria-describedby={descId}>
      <h2 className="text-lg font-semibold mb-3">Live Graph</h2>
      <p id={descId} className="sr-only">The chart plots experiment metrics over time with accessible colors. X axis is time.</p>
      <div className="w-full h-80">
        <Suspense fallback={<div className="helper">Loading charts…</div>}>
          <LazyCharts data={formatted} lines={exp.graph.lines} />
        </Suspense>
      </div>
    </section>
  )
}
