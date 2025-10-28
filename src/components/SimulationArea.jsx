import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

export default function SimulationArea(){
  const { isRunning, startSimulation, pauseSimulation, resetSimulation, parameters, addDataPoint } = useAppContext();
  const canvasRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const time = Date.now();
        const velocity = parameters.flowVelocity + Math.random() * 0.1;
        const viscosity = parameters.viscosity + Math.random() * 0.05;
        addDataPoint({ time, velocity, viscosity });
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const { width, height } = canvas;
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-background') || '#fff';
          ctx.fillRect(0, 0, width, height);
          const radius = (velocity % 1) * (width / 4);
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#4f46e5';
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning, parameters, addDataPoint]);

  return (
    <div className="relative bg-card-light dark:bg-card-dark rounded-lg shadow soft flex items-center justify-center h-64 xl:h-auto overflow-hidden">
      <canvas ref={canvasRef} width={400} height={300} className="w-full h-full"></canvas>
      {!isRunning && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/70">
          <button onClick={startSimulation} className="px-6 py-3 text-lg font-semibold rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none transition-colors">Start Simulation</button>
        </div>
      )}
      {isRunning && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={pauseSimulation} className="p-2 text-sm rounded-lg bg-secondary text-white hover:bg-secondary-dark">Pause</button>
          <button onClick={resetSimulation} className="p-2 text-sm rounded-lg bg-accent text-white hover:bg-accent-dark">Reset</button>
        </div>
      )}
    </div>
  )
}
