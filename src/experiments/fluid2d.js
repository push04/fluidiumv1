
import { createFluid2D } from '../lib/fluid2d';
export const defaultsFluid2D = () => ({ vort: 2.0, radius: 0.06, force: 1.0, dye: 0.8 });
export const graphFluid2D = { lines: [
  { key:'avgSpeed', label:'Avg Speed', color:'#0ea5e9', yAxisId:'left' },
  { key:'totalDye', label:'Total Dye', color:'#f59e0b', yAxisId:'right' }
]};
let engine=null, last=null;
export function setupFluid(canvas, params){
  engine = createFluid2D(128, canvas.width, canvas.height);
  const rect = ()=> canvas.getBoundingClientRect();
  const toUV = (e) => { const r=rect(); return [(e.clientX-r.left)/r.width, (e.clientY-r.top)/r.height]; };
  function down(e){ last = toUV(e); engine.addDyeUV(last, params.radius, params.dye); }
  function up(){ last = null; }
  function move(e){ if(!last) return; const uv=toUV(e); const dir=[uv[0]-last[0], uv[1]-last[1]]; engine.addForceUV(uv, dir, params.radius, params.force*200); engine.addDyeUV(uv, params.radius, params.dye); last=uv; }
  canvas.addEventListener('mousedown', down); window.addEventListener('mouseup', up); canvas.addEventListener('mousemove', move);
  canvas.addEventListener('touchstart', (e)=>{ const t=e.touches[0]; if(!t) return; const fake={ clientX:t.clientX, clientY:t.clientY }; down(fake); }, {passive:true});
  canvas.addEventListener('touchend', up, {passive:true});
  canvas.addEventListener('touchmove', (e)=>{ const t=e.touches[0]; if(!t) return; move({ clientX:t.clientX, clientY:t.clientY }); }, {passive:true});
  canvas.setAttribute('aria-label','2D fluid canvas. Drag to inject dye and momentum.');
  return () => { canvas.replaceWith(canvas.cloneNode(true)); };
}
export function tickFluid(params){ if (!engine) return { avgSpeed:0, totalDye:0 }; return engine.step(params); }
export function renderFluid(ctx, W, H){ if (!engine) return; engine.renderTo(ctx, W, H); }
export function addObstacleRect(x0,y0,x1,y1){ if(engine) engine.addObstacleRectUV(x0,y0,x1,y1); }
