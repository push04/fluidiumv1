
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toolbar from './components/Toolbar.jsx';
import GraphPanel from './components/GraphPanel.jsx';
import DataTable from './components/DataTable.jsx';
import InputControl from './components/InputControl.jsx';
import Loader from './components/Loader.jsx';
import { useApp } from './context/AppContext.jsx';
import { getExperiment } from './experiments/registry';

export default function App() {
  const { isBooting, isRunning, startSimulation, pauseSimulation, resetSimulation, selectedExperiment, parameters, updateParameter, data, addDataPoint, canvasRef } = useApp();
  const localCanvasRef = useRef(null);

  useEffect(() => { canvasRef.current = localCanvasRef.current; }, []);

  useEffect(() => {
    // attach input handlers if experiment supports it
    const exp = getExperiment(selectedExperiment);
    let cleanup = null;
    if (exp.setupInput && localCanvasRef.current) {
      cleanup = exp.setupInput(localCanvasRef.current, parameters);
    }
    return () => { if (cleanup) cleanup(); };
  }, [selectedExperiment]);

  useEffect(() => {
    let raf, last = 0;
    const step = (ts) => {
      if (!isRunning) return;
      const exp = getExperiment(selectedExperiment);
      if (ts - last > 33) { // ~30 FPS
        const point = exp.tick(parameters);
        addDataPoint({ time: Date.now(), ...point });
        const ctx = localCanvasRef.current?.getContext('2d');
        if (ctx) exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, point, parameters);
        last = ts;
      }
      raf = requestAnimationFrame(step);
    };
    if (isRunning) raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isRunning, selectedExperiment, parameters]);

  useEffect(() => {
    const ctx = localCanvasRef.current?.getContext('2d'); if (!ctx) return;
    const exp = getExperiment(selectedExperiment); const point = exp.tick(parameters);
    exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, point, parameters);
  }, [selectedExperiment, parameters]);

  const exp = getExperiment(selectedExperiment);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto bg-background-light dark:bg-background-dark transition-colors">
          <div className="card p-4 mb-4">
            <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
              <h2 className="text-xl font-semibold">{exp.title}</h2>
              <div className="space-x-2">
                {!isRunning ? (
                  <button onClick={startSimulation} className="btn btn-primary"><i className="fas fa-play"></i> Start</button>
                ) : (
                  <button onClick={pauseSimulation} className="btn btn-primary"><i className="fas fa-pause"></i> Pause</button>
                )}
                <button onClick={resetSimulation} className="btn btn-ghost"><i className="fas fa-rotate-left"></i> Reset</button>
              </div>
            </div>

            <Toolbar canvasRef={localCanvasRef} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <canvas ref={localCanvasRef} width={900} height={480} className="w-full h-[480px]"></canvas>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Parameters</h3>
                {exp.params.map(p => (
                  <InputControl key={p.name} label={p.label} min={p.min} max={p.max} step={p.step}
                    value={parameters[p.name]} onChange={(val)=>updateParameter(p.name, val)} />
                ))}
                {selectedExperiment === 'fluid_gl' && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Obstacles</h4>
                    <p className="text-sm opacity-80">Click the buttons to add preset obstacles to the flow.</p>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost" onClick={()=>exp.addObstacleRect(0.45,0.2,0.55,0.8)}>Center Pillar</button>
                      <button className="btn btn-ghost" onClick={()=>exp.addObstacleRect(0.1,0.4,0.2,0.6)}>Left Block</button>
                      <button className="btn btn-ghost" onClick={()=>exp.addObstacleRect(0.8,0.3,0.9,0.7)}>Right Block</button>
                    </div>
                  </div>
                )}
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
