
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toolbar from './components/Toolbar.jsx';
import GraphPanel from './components/GraphPanel.jsx';
import DataTable from './components/DataTable.jsx';
import InputControl from './components/InputControl.jsx';
import Loader from './components/Loader.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import KeyboardHelp from './components/KeyboardHelp.jsx';
import PresetPicker from './components/PresetPicker.jsx';
import { useApp } from './context/AppContext.jsx';
import { useToast } from './context/ToastContext.jsx';
import { getExperiment } from './experiments/registry';

export default function App() {
  const { isBooting, isRunning, startSimulation, pauseSimulation, resetSimulation, selectedExperiment, parameters, updateParameter, data, addDataPoint, canvasRef, ui, setUi, activePresetMeta } = useApp();
  const { push } = useToast();
  const localCanvasRef = useRef(null);

  useEffect(() => { canvasRef.current = localCanvasRef.current; }, []);

  useEffect(() => {
    const exp = getExperiment(selectedExperiment);
    let cleanup = null;
    if (exp.setupInput && localCanvasRef.current) {
      cleanup = exp.setupInput(localCanvasRef.current, parameters);
    }
    return () => { if (cleanup) cleanup(); };
  }, [selectedExperiment]);

  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space'){ e.preventDefault(); isRunning ? pauseSimulation() : startSimulation(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isRunning]);

  useEffect(() => {
    let raf, last = 0;
    const step = (ts) => {
      if (!isRunning) return;
      try{
        const exp = getExperiment(selectedExperiment);
        if (ts - last > 33) {
          const point = exp.tick(parameters);
          addDataPoint({ time: Date.now(), ...point });
          const ctx = localCanvasRef.current?.getContext('2d');
          if (ctx) exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, point, parameters);
          last = ts;
        }
        raf = requestAnimationFrame(step);
      }catch(err){
        console.error(err);
        setUi(u=>({...u, error: 'Simulation error. Adjust parameters or reset.'}));
      }
    };
    if (isRunning) { push('Simulation started'); raf = requestAnimationFrame(step); }
    return () => cancelAnimationFrame(raf);
  }, [isRunning, selectedExperiment, parameters]);

  useEffect(() => {
    const ctx = localCanvasRef.current?.getContext('2d'); if (!ctx) return;
    const exp = getExperiment(selectedExperiment); const point = exp.tick(parameters);
    exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, point, parameters);
  }, [selectedExperiment, parameters]);

  const exp = getExperiment(selectedExperiment);
  const anyInvalid = exp.params.some(p => parameters[p.name] < p.min || parameters[p.name] > p.max || Number.isNaN(parameters[p.name]));

  const addObstacle = (x0,y0,x1,y1, label) => {
    exp.addObstacleRect(x0,y0,x1,y1);
    push(`Obstacle added: ${label}`);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 p-4 overflow-y-auto bg-bg-light dark:bg-bg-dark transition-colors" aria-labelledby="exp-title">
          <ErrorBoundary>
            <section className="card p-4 mb-4" role="region" aria-label="Experiment workspace">
              <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                <h2 id="exp-title" className="text-xl font-semibold">{exp.title}</h2>
                <div className="space-x-2">
                  {!isRunning ? (
                    <button onClick={startSimulation} className="btn btn-primary touch-target" disabled={anyInvalid} aria-disabled={anyInvalid} aria-describedby={anyInvalid?'start-disabled':''}>
                      <i className="fas fa-play" aria-hidden="true"></i> Start
                    </button>
                  ) : (
                    <button onClick={pauseSimulation} className="btn btn-primary touch-target">
                      <i className="fas fa-pause" aria-hidden="true"></i> Pause
                    </button>
                  )}
                  <button onClick={resetSimulation} className="btn btn-ghost touch-target"><i className="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>
                </div>
              </div>

              <Toolbar canvasRef={localCanvasRef} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <canvas ref={localCanvasRef} width={900} height={480} className="w-full h-[480px]" tabIndex={0}></canvas>
                  </div>
                  <KeyboardHelp />
                </div>

                <div className="space-y-4">
                  <fieldset className="space-y-4" aria-label="Parameter controls">
                    <legend className="font-medium">Parameters</legend>
                    {exp.params.map(p => (
                      <InputControl key={p.name} name={p.name} label={p.label} min={p.min} max={p.max} step={p.step}
                        symbol={p.symbol} value={parameters[p.name]} onChange={(val)=>updateParameter(p.name, val)} />
                    ))}
                    {anyInvalid && <p id="start-disabled" className="error">One or more values are out of range. Adjust before starting.</p>}
                  </fieldset>

                  <PresetPicker />

                  {selectedExperiment === 'fluid_gl' && (
                    <div className="space-y-2" role="group" aria-label="Obstacles">
                      <h4 className="font-medium">Obstacles</h4>
                      <p className="helper">Add preset obstacles to the flow.</p>
                      <div className="flex gap-2 flex-wrap">
                        <button type="button" className="btn btn-ghost touch-target" onClick={()=>addObstacle(0.45,0.2,0.55,0.8, 'Center Pillar')}>Center Pillar</button>
                        <button type="button" className="btn btn-ghost touch-target" onClick={()=>addObstacle(0.1,0.4,0.2,0.6, 'Left Block')}>Left Block</button>
                        <button type="button" className="btn btn-ghost touch-target" onClick={()=>addObstacle(0.8,0.3,0.9,0.7, 'Right Block')}>Right Block</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {activePresetMeta && (
                <div className="mt-3 helper">Applied setup: <strong>{activePresetMeta.title}</strong> — {activePresetMeta.desc}</div>
              )}
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <GraphPanel />
              <DataTable />
            </div>
          </ErrorBoundary>
        </main>
      </div>
      {isBooting && <Loader />}
    </div>
  )
}
