
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import GraphPanel from './components/GraphPanel.jsx';
import DataTable from './components/DataTable.jsx';
import Loader from './components/Loader.jsx';
import { useApp } from './context/AppContext.jsx';
import { getExperiment } from './experiments/registry';

export default function App() {
  const { isBooting, isRunning, startSimulation, pauseSimulation, resetSimulation, selectedExperiment, parameters, updateParameter, data, addDataPoint } = useApp();
  const canvasRef = useRef(null);

  useEffect(() => {
    let raf, last = 0;
    const step = (ts) => {
      if (!isRunning) return;
      if (ts - last > 100) { // ~10Hz
        const exp = getExperiment(selectedExperiment);
        const point = exp.tick(parameters);
        addDataPoint({ time: Date.now(), ...point });
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) exp.render(ctx, canvasRef.current.width, canvasRef.current.height, point);
        last = ts;
      }
      raf = requestAnimationFrame(step);
    };
    if (isRunning) raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isRunning, selectedExperiment, parameters]);

  useEffect(() => {
    // draw initial static scene
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const exp = getExperiment(selectedExperiment);
    const point = exp.tick(parameters);
    exp.render(ctx, canvasRef.current.width, canvasRef.current.height, point);
  }, [selectedExperiment, parameters]);

  const exp = getExperiment(selectedExperiment);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto bg-background-light dark:bg-background-dark transition-colors">
          {/* Canvas + Controls strip */}
          <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-soft p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">{exp.title}</h2>
              <div className="space-x-2">
                {!isRunning ? (
                  <button onClick={startSimulation} className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary">Start</button>
                ) : (
                  <button onClick={pauseSimulation} className="px-4 py-2 rounded bg-secondary text-white hover:bg-accent">Pause</button>
                )}
                <button onClick={resetSimulation} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Reset</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <canvas ref={canvasRef} width={800} height={380} className="w-full h-[380px]"></canvas>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Parameters</h3>
                <div className="space-y-4">
                  {exp.params.map(p => (
                    <div key={p.name}>
                      <label className="block text-sm font-medium mb-1">{p.label}: <span className="font-semibold">{parameters[p.name].toFixed( (p.step+'').split('.')[1]?.length || 0 )}</span></label>
                      <input type="range" min={p.min} max={p.max} step={p.step} value={parameters[p.name]}
                        onChange={e=>updateParameter(p.name, parseFloat(e.target.value))} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <GraphPanel />
            <DataTable />
          </div>
        </main>
      </div>
      {isBooting && <Loader />}
    </div>
  )
}
