
import React from 'react';
import { useApp } from '../context/AppContext.jsx';

const content = {
  fluid_gl: {
    title: 'WebGL Fluid – Notes',
    text: 'Interactive dye advection with vorticity confinement and obstacles. Drag to inject momentum and dye.'
  },
  hydraulic_jump: {
    title: 'Hydraulic Jump (Bélanger)',
    text: 'For upstream Froude number Fr1, the sequent depth y2 is y2/y1 = 0.5(\u221a(1+8Fr1^2) - 1). Energy loss can be estimated as (y2 - y1)^3 / (4 y1 y2).'
  },
  moody: {
    title: 'Moody Friction Factor',
    text: 'Colebrook-White: 1/\u221Af = -2 log10( (\u03B5/D)/3.7 + 2.51/(Re \u221Af) ). Head loss h_f = f (L/D) V^2 / (2g).'
  },
  buoyancy: {
    title: 'Buoyancy Tank',
    text: 'Archimedes: Upthrust equals weight of displaced fluid. Equilibrium when weight = buoyant force.'
  },
  reynolds: {
    title: 'Reynolds Experiment',
    text: 'Re = V D / \u03BD. Laminar (Re < 2000), Transitional (2300–4000), Turbulent (Re > 4000).'
  },
  venturi: {
    title: 'Venturi Meter',
    text: 'Using continuity and Bernoulli (ignoring losses): \u0394P = 0.5 \u03C1 (V2^2 - V1^2). Discharge Q relates to areas in inlet and throat.'
  }
};

export default function TheoryPanel(){
  const { selectedExperiment } = useApp();
  const c = content[selectedExperiment];
  if (!c) return null;
  return (
    <section className="p-4 card" aria-label="Theory">
      <h2 className="text-lg font-semibold mb-2">{c.title}</h2>
      <p className="text-sm leading-relaxed">{c.text}</p>
    </section>
  );
}
