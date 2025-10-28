
import { createFluidGL } from '../lib/fluidgl';

export const defaultsFluidGL = () => ({ vort: 0.35, radius: 0.06, dye: 0.6, force: 0.6 });
export const graphFluidGL = { lines: [
  { key:'avgSpeed', label:'Avg Speed', color:'#1F77B4', yAxisId:'left' },
  { key:'totalDye', label:'Total Dye', color:'#FF7F0E', yAxisId:'right' }
]};

let engine = null;
let lastPoint = null;

export function setupFluid(canvas, params){
  engine = createFluidGL(canvas, { N: 128 });
  if (!engine) return () => {};
  const toUV = (e) => {
    const r = canvas.getBoundingClientRect();
    return [(e.clientX - r.left)/r.width, 1.0 - (e.clientY - r.top)/r.height];
  };
  function down(e){ lastPoint = toUV(e); }
  function up(){ lastPoint = null; }
  function move(e){
    if (!lastPoint) return;
    const uv = toUV(e);
    const dir = [uv[0]-lastPoint[0], uv[1]-lastPoint[1]];
    engine.addForce(uv, dir, params.radius, params.force);
    engine.addDye(uv, params.radius, [params.dye, params.dye*0.5, 1.0]);
    lastPoint = uv;
  }
  canvas.addEventListener('mousedown', down);
  window.addEventListener('mouseup', up);
  canvas.addEventListener('mousemove', move);
  canvas.setAttribute('aria-label','Fluid canvas. Drag mouse to inject dye and momentum.');
  canvas.setAttribute('role','img');
  return () => { canvas.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up); canvas.removeEventListener('mousemove', move); };
}

export function tickFluid(params){
  if (!engine) return { avgSpeed: 0, totalDye: 0 };
  engine.step(params);
  const m = engine.metrics();
  return m;
}

export function renderFluid(ctx, W, H){
  if (!engine) return;
  engine.render();
}

export function addObstacleRect(x0,y0,x1,y1){ if (engine) engine.addObstacleRect(x0,y0,x1,y1); }
