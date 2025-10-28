
import { renderReynolds, tickReynolds, graphReynolds, defaultsReynolds } from './reynolds';
import { renderBernoulli, tickBernoulli, graphBernoulli, defaultsBernoulli } from './bernoulli';
import { renderVenturi, tickVenturi, graphVenturi, defaultsVenturi } from './venturi';
import { renderPitot, tickPitot, graphPitot, defaultsPitot } from './pitot';
import { renderPoiseuille, tickPoiseuille, graphPoiseuille, defaultsPoiseuille } from './poiseuille';
import { renderWeir, tickWeir, graphWeir, defaultsWeir } from './weir';
import { renderLiftDrag, tickLiftDrag, graphLiftDrag, defaultsLiftDrag } from './liftdrag';

export const experiments = {
  reynolds: { id:'reynolds', title:'Reynolds Number', params:[
      { name:'velocity', label:'Flow Velocity (m/s)', min:0.1, max:5, step:0.1 },
      { name:'viscosity', label:'Viscosity μ (Pa·s)', min:0.05, max:2, step:0.05 },
      { name:'diameter', label:'Pipe Diameter D (m)', min:0.05, max:2, step:0.05 },
      { name:'density', label:'Density ρ (kg/m³)', min:500, max:1500, step:10 }
    ], defaults: defaultsReynolds, tick: tickReynolds, render: renderReynolds, graph: graphReynolds },
  bernoulli: { id:'bernoulli', title:"Bernoulli's Theorem", params:[
      { name:'velocity', label:'Velocity v (m/s)', min:0.1, max:10, step:0.1 },
      { name:'height', label:'Height h (m)', min:0, max:10, step:0.1 },
      { name:'density', label:'Density ρ (kg/m³)', min:500, max:1500, step:10 }
    ], defaults: defaultsBernoulli, tick: tickBernoulli, render: renderBernoulli, graph: graphBernoulli },
  venturi: { id:'venturi', title:'Venturi Meter', params:[
      { name:'v1', label:'Upstream Velocity v1 (m/s)', min:0.1, max:8, step:0.1 },
      { name:'D1', label:'Pipe Diameter D1 (m)', min:0.05, max:1.0, step:0.05 },
      { name:'D2', label:'Throat Diameter D2 (m)', min:0.02, max:0.5, step:0.02 },
      { name:'density', label:'Density ρ (kg/m³)', min:500, max:1500, step:10 }
    ], defaults: defaultsVenturi, tick: tickVenturi, render: renderVenturi, graph: graphVenturi },
  pitot: { id:'pitot', title:'Pitot Tube', params:[
      { name:'velocity', label:'Flow Velocity v (m/s)', min:0.1, max:15, step:0.1 },
      { name:'density', label:'Density ρ (kg/m³)', min:500, max:1500, step:10 }
    ], defaults: defaultsPitot, tick: tickPitot, render: renderPitot, graph: graphPitot },
  poiseuille: { id:'poiseuille', title:'Hagen–Poiseuille Pipe Flow', params:[
      { name:'dp', label:'Pressure Drop Δp (Pa)', min:100, max:20000, step:100 },
      { name:'radius', label:'Pipe Radius r (m)', min:0.01, max:0.2, step:0.005 },
      { name:'viscosity', label:'Viscosity μ (Pa·s)', min:0.02, max:2, step:0.02 },
      { name:'length', label:'Pipe Length L (m)', min:0.5, max:10, step:0.5 }
    ], defaults: defaultsPoiseuille, tick: tickPoiseuille, render: renderPoiseuille, graph: graphPoiseuille },
  weir: { id:'weir', title:'V-Notch Weir', params:[
      { name:'H', label:'Head H (m)', min:0.02, max:1.0, step:0.01 },
      { name:'theta', label:'Angle θ (deg)', min:30, max:120, step:5 },
      { name:'Cd', label:'Discharge Coef. Cd', min:0.55, max:0.7, step:0.01 }
    ], defaults: defaultsWeir, tick: tickWeir, render: renderWeir, graph: graphWeir },
  liftdrag: { id:'liftdrag', title:'Lift & Drag (Airfoil)', params:[
      { name:'velocity', label:'Velocity v (m/s)', min:1, max:60, step:1 },
      { name:'rho', label:'Density ρ (kg/m³)', min:0.8, max:1.4, step:0.01 },
      { name:'S', label:'Wing Area S (m²)', min:0.1, max:4, step:0.1 },
      { name:'alpha', label:'Angle of Attack α (deg)', min:-10, max:20, step:1 }
    ], defaults: defaultsLiftDrag, tick: tickLiftDrag, render: renderLiftDrag, graph: graphLiftDrag },
};

export const getDefaults = (id) => (experiments[id] ? experiments[id].defaults() : {});
export const getExperiment = (id) => experiments[id];
