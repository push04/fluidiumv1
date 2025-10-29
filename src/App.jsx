
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toolbar from './components/Toolbar.jsx';
import GraphPanel from './components/GraphPanel.jsx';
import DataTable from './components/DataTable.jsx';
import TheoryPanel from './components/TheoryPanel.jsx';
import InputControl from './components/InputControl.jsx';
import { useApp } from './context/AppContext.jsx';
import { getExperiment } from './experiments/registry';

export default function App(){
  const { selectedExperiment, params, updateParam, isRunning, setIsRunning, data, addDataPoint, canvasRef } = useApp();
  const exp = getExperiment(selectedExperiment);
  const localCanvasRef = useRef(null);
  useEffect(()=>{ canvasRef.current = localCanvasRef.current; }, []);

  useEffect(()=>{
    const ctx = localCanvasRef.current.getContext('2d');
    ctx.clearRect(0,0,localCanvasRef.current.width, localCanvasRef.current.height);
    if (exp.render) { const pt = exp.tick(params); exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, pt, params); }
  }, [selectedExperiment]);

  useEffect(()=>{
    let raf;
    const step = (ts) => {
      if (!isRunning) return;
      const ctx = localCanvasRef.current.getContext('2d');
      const pt = exp.tick(params);
      addDataPoint({ time: Date.now(), ...pt });
      exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, pt, params);
      raf = requestAnimationFrame(step);
    };
    if (isRunning) raf = requestAnimationFrame(step);
    return ()=> cancelAnimationFrame(raf);
  }, [isRunning, params, selectedExperiment]);

  const reset = () => { setIsRunning(false); const ctx = localCanvasRef.current.getContext('2d'); ctx.clearRect(0,0,localCanvasRef.current.width, localCanvasRef.current.height); const pt = exp.tick(exp.defaults()); exp.render(ctx, localCanvasRef.current.width, localCanvasRef.current.height, pt, exp.defaults()); }

  const onSnapshot = () => { const a = document.createElement('a'); a.href = localCanvasRef.current.toDataURL('image/png'); a.download = `${selectedExperiment}.png`; a.click(); };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main id="main" className="flex-1 p-4 overflow-y-auto">
          <section className="card p-4 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-xl font-semibold">{exp.title}</h2>
              <Toolbar onReset={reset} onSnapshot={onSnapshot} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="canvas-frame">
                  <canvas ref={localCanvasRef} className="w-full h-[420px]" width="900" height="420" aria-label="Simulation canvas"></canvas>
                </div>
              </div>
              <div className="space-y-4">
                {exp.params.map(p => (
                  <InputControl key={p.name} name={p.name} label={p.label} min={p.min} max={p.max} step={p.step}
                    helper={p.helper} value={params[p.name]} onChange={(v)=>updateParam(p.name, v)} />
                ))}
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <GraphPanel />
            <DataTable />
            <TheoryPanel />
          </div>
        </main>
      </div>
    </div>
  )
}
