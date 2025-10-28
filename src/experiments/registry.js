
import { setupFluid, tickFluid, renderFluid, defaultsFluidGL, graphFluidGL, addObstacleRect } from './fluid_gl';
import { tickHJump, renderHJump, defaultsHJump, graphHJump } from './hydraulic_jump';
import { tickMoody, renderMoody, defaultsMoody, graphMoody } from './moody';
import { tickBuoy, renderBuoy, defaultsBuoy, graphBuoy } from './buoyancy';

export const experiments = {
  fluid_gl: {
    id: 'fluid_gl',
    title: 'WebGL Fluid (vorticity + obstacles)',
    params: [
      { name:'vort', label:'Vorticity Confinement', min:0.0, max:1.0, step:0.01, symbol:'Adds rotational energy to preserve swirls' },
      { name:'radius', label:'Brush Radius', min:0.02, max:0.2, step:0.01, symbol:'Interaction radius (in UV space)' },
      { name:'force', label:'Force', min:0.1, max:1.5, step:0.05, symbol:'Momentum injected while dragging' },
      { name:'dye', label:'Dye Intensity', min:0.2, max:1.2, step:0.05, symbol:'Color density of injected dye' }
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
      { name:'Q', label:'Discharge Q (m³/s)', min:0.05, max:1.0, step:0.01, symbol:'Flow rate through the channel' },
      { name:'b', label:'Width b (m)', min:0.2, max:3, step:0.1, symbol:'Channel width' },
      { name:'y1', label:'Upstream depth y1 (m)', min:0.05, max:0.8, step:0.01, symbol:'Depth before the jump' },
      { name:'g', label:'Gravity g (m/s²)', min:9.0, max:9.81, step:0.01, symbol:'Acceleration due to gravity' }
    ],
    defaults: defaultsHJump, tick: tickHJump, render: renderHJump, graph: graphHJump
  },
  moody: {
    id:'moody',
    title:'Moody Friction Factor',
    params: [
      { name:'Re', label:'Reynolds Number Re', min:500, max:1000000, step:100, symbol:'Dimensionless ratio of inertia/viscous forces' },
      { name:'relRough', label:'Relative Roughness ε/D', min:0.0, max:0.01, step:0.0001, symbol:'Pipe roughness scaled by diameter' },
      { name:'L', label:'Pipe Length L (m)', min:1, max:100, step:1, symbol:'Length of pipe segment' },
      { name:'D', label:'Diameter D (m)', min:0.05, max:1.0, step:0.01, symbol:'Internal diameter of pipe' },
      { name:'V', label:'Mean Velocity V (m/s)', min:0.1, max:8, step:0.1, symbol:'Bulk flow speed' },
      { name:'g', label:'Gravity g (m/s²)', min:9.0, max:9.81, step:0.01, symbol:'Acceleration due to gravity' }
    ],
    defaults: defaultsMoody, tick: tickMoody, render: renderMoody, graph: graphMoody
  },
  buoyancy: {
    id:'buoyancy',
    title:'Buoyancy Tank',
    params: [
      { name:'rhoFluid', label:'Fluid Density ρ_f (kg/m³)', min:500, max:1500, step:10, symbol:'Density of the liquid' },
      { name:'rhoObj', label:'Object Density ρ_o (kg/m³)', min:100, max:1500, step:10, symbol:'Density of the object' },
      { name:'width', label:'Object Width (m)', min:0.1, max:0.6, step:0.01, symbol:'Planform width (unit depth)' },
      { name:'height', label:'Object Height (m)', min:0.1, max:0.6, step:0.01, symbol:'Vertical height' }
    ],
    defaults: defaultsBuoy, tick: tickBuoy, render: renderBuoy, graph: graphBuoy
  }
};

export const getExperiment = (id) => experiments[id];
export const getDefaults = (id) => (experiments[id]? experiments[id].defaults(): {});
