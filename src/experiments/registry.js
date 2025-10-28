
// A simple registry that describes experiments, their parameters, graph config,
// and render functions for the canvas.

import { renderReynolds, tickReynolds, graphReynolds, defaultsReynolds } from './reynolds';
import { renderBernoulli, tickBernoulli, graphBernoulli, defaultsBernoulli } from './bernoulli';
import { renderVenturi, tickVenturi, graphVenturi, defaultsVenturi } from './venturi';

export const experiments = {
  reynolds: {
    id: 'reynolds',
    title: 'Reynolds Number',
    params: [
      { name: 'velocity', label: 'Flow Velocity (m/s)', min: 0.1, max: 5, step: 0.1 },
      { name: 'viscosity', label: 'Viscosity μ (Pa·s)', min: 0.1, max: 2, step: 0.05 },
      { name: 'diameter', label: 'Pipe Diameter D (m)', min: 0.05, max: 2, step: 0.05 },
      { name: 'density', label: 'Density ρ (kg/m³)', min: 500, max: 1500, step: 10 }
    ],
    defaults: defaultsReynolds,
    tick: tickReynolds,
    render: renderReynolds,
    graph: graphReynolds
  },
  bernoulli: {
    id: 'bernoulli',
    title: "Bernoulli's Theorem",
    params: [
      { name: 'velocity', label: 'Velocity v (m/s)', min: 0.1, max: 10, step: 0.1 },
      { name: 'height', label: 'Height h (m)', min: 0, max: 10, step: 0.1 },
      { name: 'density', label: 'Density ρ (kg/m³)', min: 500, max: 1500, step: 10 }
    ],
    defaults: defaultsBernoulli,
    tick: tickBernoulli,
    render: renderBernoulli,
    graph: graphBernoulli
  },
  venturi: {
    id: 'venturi',
    title: 'Venturi Meter',
    params: [
      { name: 'v1', label: 'Upstream Velocity v1 (m/s)', min: 0.1, max: 8, step: 0.1 },
      { name: 'D1', label: 'Pipe Diameter D1 (m)', min: 0.05, max: 1.0, step: 0.05 },
      { name: 'D2', label: 'Throat Diameter D2 (m)', min: 0.02, max: 0.5, step: 0.02 },
      { name: 'density', label: 'Density ρ (kg/m³)', min: 500, max: 1500, step: 10 }
    ],
    defaults: defaultsVenturi,
    tick: tickVenturi,
    render: renderVenturi,
    graph: graphVenturi
  }
};

export const getDefaults = (id) => {
  const exp = experiments[id];
  return exp ? exp.defaults() : {};
};

export const getExperiment = (id) => experiments[id];
