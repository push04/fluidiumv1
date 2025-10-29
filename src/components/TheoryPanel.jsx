
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
const content = {
  fluid2d: { title:'2D Fluid (Stable Fluids)', text:'Semi-Lagrangian advection with pressure projection; vorticity confinement preserves swirls. Obstacles enforce no-penetration at boundaries.' },
  hydraulic_jump: { title:'Hydraulic Jump (Bélanger)', text:'y2/y1 = 0.5(√(1+8 Fr1²) − 1). Fr1 = v1 / √(g y1). Energy loss ~ (y2 − y1)³ / (4 y1 y2).' },
  moody: { title:'Moody (Colebrook-White)', text:'1/√f = −2log10( (ε/D)/3.7 + 2.51/(Re √f) ), head loss h_f = f (L/D) V² / (2g).' },
  reynolds: { title:'Reynolds Experiment', text:'Re = V D / ν. Laminar < 2000; 2300–4000 transitional; > 4000 turbulent.' },
  venturi: { title:'Venturi Meter', text:'ΔP = 0.5 ρ (V2² − V1²), V = Q / A. Neglecting losses.' },
  buoyancy: { title:'Buoyancy Tank', text:'Archimedes: Upthrust equals weight of displaced fluid; submergence proportional to ρo/ρf until full immersion.' }
};
export default function TheoryPanel(){
  const { selectedExperiment } = useApp();
  const c = content[selectedExperiment];
  if (!c) return null;
  return (
    <section className="card p-4">
      <h2 className="text-lg font-semibold mb-2">{c.title}</h2>
      <p className="text-sm leading-relaxed">{c.text}</p>
    </section>
  )
}
