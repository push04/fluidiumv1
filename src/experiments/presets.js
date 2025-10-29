
export const experimentMeta = {
  fluid_gl: {
    title: 'WebGL Fluid (vorticity + obstacles)',
    presets: [
      { key:'laminar', title:'Laminar Flow Example', desc:'Low vorticity, gentle dye injection.', params:{ vort:0.1, radius:0.05, force:0.2, dye:0.5 } },
      { key:'turbulent', title:'Turbulent Simulation', desc:'High vorticity, stronger forcing.', params:{ vort:0.6, radius:0.08, force:1.0, dye:0.9 } },
      { key:'smoke', title:'Smoke-like', desc:'Wide brush, medium vorticity.', params:{ vort:0.35, radius:0.12, force:0.5, dye:0.7 } }
    ]
  },
  hydraulic_jump: {
    title: 'Hydraulic Jump (Bélanger)',
    presets: [
      { key:'mild', title:'Mild Jump', desc:'Low discharge, small y1.', params:{ Q:0.18, b:1.0, y1:0.18, g:9.81 } },
      { key:'strong', title:'Strong Jump', desc:'Higher discharge, shallow y1.', params:{ Q:0.6, b:1.0, y1:0.12, g:9.81 } }
    ]
  },
  moody: {
    title: 'Moody Friction Factor',
    presets: [
      { key:'smooth-turb', title:'Smooth Pipe (Turbulent)', desc:'High Re, low roughness.', params:{ Re:2e5, relRough:0.00005, L:10, D:0.3, V:2.5, g:9.81 } },
      { key:'rough-turb', title:'Rough Pipe (Turbulent)', desc:'High roughness case.', params:{ Re:2e5, relRough:0.005, L:30, D:0.25, V:3.5, g:9.81 } }
    ]
  },
  reynolds: {
    title: 'Reynolds Experiment',
    presets: [
      { key:'laminar', title:'Laminar Regime', desc:'Low V, small D; Re < 2000', params:{ V:0.2, D:0.02, nu:1e-6 } },
      { key:'turbulent', title:'Turbulent Regime', desc:'Higher V and D; Re > 4000', params:{ V:2.5, D:0.08, nu:1e-6 } }
    ]
  },
  venturi: {
    title: 'Venturi Meter',
    presets: [
      { key:'standard', title:'Standard Case', desc:'Moderate Q and contraction', params:{ Q:0.02, d1:0.12, d2:0.06, rho:1000 } },
      { key:'highQ', title:'High Discharge', desc:'Higher flow rate', params:{ Q:0.12, d1:0.2, d2:0.1, rho:1000 } }
    ]
  },
  buoyancy: {
    title: 'Buoyancy Tank',
    presets: [
      { key:'float', title:'Floating Block', desc:'Object lighter than fluid.', params:{ rhoFluid:1000, rhoObj:600, width:0.3, height:0.3, g:9.81 } },
      { key:'sink', title:'Sinking Block', desc:'Object heavier than fluid.', params:{ rhoFluid:1000, rhoObj:1300, width:0.3, height:0.3, g:9.81 } }
    ]
  }
};
