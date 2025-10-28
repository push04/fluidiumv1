
import { setupFluid, tickFluid, renderFluid, defaultsFluidGL, graphFluidGL, addObstacleRect } from './fluid_gl';
import { tickHJump, renderHJump, defaultsHJump, graphHJump } from './hydraulic_jump';
import { tickMoody, renderMoody, defaultsMoody, graphMoody } from './moody';
import { tickBuoy, renderBuoy, defaultsBuoy, graphBuoy } from './buoyancy';

export const experiments = {
  fluid_gl: {
    id: 'fluid_gl',
    title: 'WebGL Fluid (vorticity + obstacles)',
    params: [
      { name:'vort', label:'Vorticity', min:0.0, max:1.0, step:0.01 },
      { name:'radius', label:'Brush Radius', min:0.02, max:0.2, step:0.01 },
      { name:'force', label:'Force', min:0.1, max:1.5, step:0.05 },
      { name:'dye', label:'Dye', min:0.2, max:1.2, step:0.05 },
    ],
    defaults: defaultsFluidGL,
    setupInput: setupFluid,
    tick: tickFluid,
    render: renderFluid,
    graph: graphFluidGL,
    addObstacleRect
  },
  hydraulic_jump: {
    id:'hydraulic_jump',
    title:'Hydraulic Jump (Bélanger)',
    params: [
      { name:'Q', label:'Discharge Q (m³/s)', min:0.05, max:1.0, step:0.01 },
      { name:'b', label:'Width b (m)', min:0.2, max:3, step:0.1 },
      { name:'y1', label:'Upstream depth y1 (m)', min:0.05, max:0.8, step:0.01 },
      { name:'g', label:'Gravity g (m/s²)', min:9.0, max:9.81, step:0.01 }
    ],
    defaults: defaultsHJump, tick: tickHJump, render: renderHJump, graph: graphHJump
  },
  moody: {
    id:'moody',
    title:'Moody Friction Factor',
    params: [
      { name:'Re', label:'Reynolds Re', min:500, max:1e6, step:100 },
      { name:'relRough', label:'ε/D', min:0.0, max:0.01, step:0.0001 },
      { name:'L', label:'Length L (m)', min:1, max:100, step:1 },
      { name:'D', label:'Diameter D (m)', min:0.05, max:1.0, step:0.01 },
      { name:'V', label:'Velocity V (m/s)', min:0.1, max:8, step:0.1 },
      { name:'g', label:'g (m/s²)', min:9.0, max:9.81, step:0.01 }
    ],
    defaults: defaultsMoody, tick: tickMoody, render: renderMoody, graph: graphMoody
  },
  buoyancy: {
    id:'buoyancy',
    title:'Buoyancy Tank',
    params: [
      { name:'rhoFluid', label:'Fluid Density ρ_f (kg/m³)', min:500, max:1500, step:10 },
      { name:'rhoObj', label:'Object Density ρ_o (kg/m³)', min:100, max:1500, step:10 },
      { name:'width', label:'Obj Width (m)', min:0.1, max:0.6, step:0.01 },
      { name:'height', label:'Obj Height (m)', min:0.1, max:0.6, step:0.01 }
    ],
    defaults: defaultsBuoy, tick: tickBuoy, render: renderBuoy, graph: graphBuoy
  }
};

export const getExperiment = (id) => experiments[id];
export const getDefaults = (id) => (experiments[id]? experiments[id].defaults(): {});
