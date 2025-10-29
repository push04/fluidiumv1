
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
  buoyancy: {
    title: 'Buoyancy Tank',
    presets: [
      { key:'float', title:'Floating Block', desc:'Object lighter than fluid.', params:{ rhoFluid:1000, rhoObj:600, width:0.3, height:0.3, g:9.81 } },
      { key:'sink', title:'Sinking Block', desc:'Object heavier than fluid.', params:{ rhoFluid:1000, rhoObj:1300, width:0.3, height:0.3, g:9.81 } }
    ]
  }
};
