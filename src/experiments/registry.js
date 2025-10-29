
import { setupFluid, tickFluid, renderFluid, defaultsFluid2D, graphFluid2D, addObstacleRect as addObs } from './fluid2d';
import { tickHJump, renderHJump, defaultsHJump, graphHJump } from './hydraulic_jump';
import { tickMoody, renderMoody, defaultsMoody, graphMoody } from './moody';
import { tickRe, renderRe, defaultsRe, graphRe } from './reynolds';
import { tickVenturi, renderVenturi, defaultsVenturi, graphVenturi } from './venturi';
import { tickBuoy, renderBuoy, defaultsBuoy, graphBuoy } from './buoyancy';

export const experiments = {
  fluid2d: {
    id: 'fluid2d', title: '2D Fluid (128×128, obstacles, vort)',
    params: [
      { name:'vort', label:'Vorticity Strength', min:0, max:4, step:0.1, helper:'Swirl energy added to preserve eddies' },
      { name:'radius', label:'Brush Radius', min:0.02, max:0.2, step:0.01, helper:'Interaction radius in UV space' },
      { name:'force', label:'Force', min:0.2, max:2.0, step:0.1, helper:'Momentum injection while dragging' },
      { name:'dye', label:'Dye Intensity', min:0.2, max:1.5, step:0.05, helper:'Opacity of injected dye' }
    ],
    defaults: defaultsFluid2D, setupInput: setupFluid, tick: tickFluid, render: renderFluid, graph: graphFluid2D, addObstacleRect: addObs
  },
  hydraulic_jump: {
    id: 'hydraulic_jump', title: 'Hydraulic Jump (Bélanger + Valve)',
    params: [
      { name:'Q', label:'Discharge Q (m³/s)', min:0.05, max:1.0, step:0.01, helper:'Volumetric flow' },
      { name:'b', label:'Width b (m)', min:0.2, max:3, step:0.1, helper:'Channel width' },
      { name:'y1', label:'Upstream depth y1 (m)', min:0.05, max:0.8, step:0.01, helper:'Depth before the jump' },
      { name:'g', label:'Gravity g (m/s²)', min:9.0, max:9.81, step:0.01, helper:'Acceleration due to gravity' },
      { name:'opening', label:'Valve Opening (0–1)', min:0, max:1, step:0.01, helper:'Gate slot fraction' }
    ],
    defaults: defaultsHJump, tick: tickHJump, render: renderHJump, graph: graphHJump
  },
  moody: {
    id:'moody', title:'Moody (Colebrook-White)',
    params: [
      { name:'Re', label:'Reynolds Re', min:500, max:1000000, step:100, helper:'Dimensionless' },
      { name:'relRough', label:'Rel Rough ε/D', min:0.0, max:0.01, step:0.0001, helper:'Surface roughness / diameter' },
      { name:'L', label:'Length L (m)', min:1, max:100, step:1, helper:'Pipe length' },
      { name:'D', label:'Diameter D (m)', min:0.05, max:1.0, step:0.01, helper:'Pipe diameter' },
      { name:'V', label:'Velocity V (m/s)', min:0.1, max:8, step:0.1, helper:'Mean velocity' },
      { name:'g', label:'Gravity g (m/s²)', min:9.0, max:9.81, step:0.01, helper:'Accel due to gravity' }
    ],
    defaults: defaultsMoody, tick: tickMoody, render: renderMoody, graph: graphMoody
  },
  reynolds: {
    id:'reynolds', title:'Reynolds Experiment',
    params: [
      { name:'V', label:'Velocity V (m/s)', min:0.01, max:5, step:0.01, helper:'Bulk flow speed' },
      { name:'D', label:'Diameter D (m)', min:0.005, max:0.5, step:0.001, helper:'Pipe diameter' },
      { name:'nu', label:'Kinematic viscosity ν (m²/s)', min:1e-7, max:2e-5, step:1e-7, helper:'Fluid property' }
    ],
    defaults: defaultsRe, tick: tickRe, render: renderRe, graph: graphRe
  },
  venturi: {
    id:'venturi', title:'Venturi Meter',
    params: [
      { name:'Q', label:'Discharge Q (m³/s)', min:0.001, max:0.5, step:0.001, helper:'Volumetric flow rate' },
      { name:'d1', label:'Inlet d1 (m)', min:0.02, max:0.5, step:0.005, helper:'Upstream diameter' },
      { name:'d2', label:'Throat d2 (m)', min:0.01, max:0.4, step:0.005, helper:'Constriction diameter' },
      { name:'rho', label:'Density ρ (kg/m³)', min:500, max:1500, step:10, helper:'Fluid density' }
    ],
    defaults: defaultsVenturi, tick: tickVenturi, render: renderVenturi, graph: graphVenturi
  },
  buoyancy: {
    id:'buoyancy', title:'Buoyancy Tank',
    params: [
      { name:'rhoFluid', label:'Fluid Density ρ_f (kg/m³)', min:500, max:1500, step:10, helper:'Liquid density' },
      { name:'rhoObj', label:'Object Density ρ_o (kg/m³)', min:100, max:1500, step:10, helper:'Object density' },
      { name:'width', label:'Object Width (m)', min:0.1, max:0.6, step:0.01, helper:'Planform width (unit depth)' },
      { name:'height', label:'Object Height (m)', min:0.1, max:0.6, step:0.01, helper:'Vertical height' }
    ],
    defaults: defaultsBuoy, tick: tickBuoy, render: renderBuoy, graph: graphBuoy
  }
};
export const getExperiment = (id)=> experiments[id];
export const getDefaults = (id)=> experiments[id] ? experiments[id].defaults() : {};
