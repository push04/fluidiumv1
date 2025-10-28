
export const defaultsMoody = () => ({ Re: 1e5, relRough: 0.0002, L: 10, D: 0.3, V: 2.0, g: 9.81 });
export const graphMoody = { lines: [
  { key:'f', label:'Friction Factor f', color:'#4f46e5', yAxisId:'left' },
  { key:'hf', label:'Head Loss h_f (m)', color:'#ef4444', yAxisId:'right' }
]};

function colebrook(Re, epsRel){
  if (Re < 2000) return 64/Re;
  let f = 0.02;
  for(let i=0;i<25;i++){
    const lhs = 1/Math.sqrt(f);
    const rhs = -2.0*Math.log10( epsRel/3.7 + 2.51/(Re*Math.sqrt(f)) );
    const df = lhs - rhs;
    if (Math.abs(df) < 1e-6) break;
    // Newton step derivative approximation
    const dfdF = -0.5*Math.pow(f, -1.5) - ( (2.51/Math.LN10) * (-0.5)*Math.pow(f,-1.5) / (Re*(epsRel/3.7 + 2.51/(Re*Math.sqrt(f)))) );
    f -= df/dfdF;
    if (f <= 0) f = 1e-4;
  }
  return f;
}

export function tickMoody({ Re, relRough, L, D, V, g }){
  const f = colebrook(Re, relRough);
  const hf = f * (L/D) * (V*V/(2*g));
  return { f, hf };
}

export function renderMoody(ctx, W, H, { f, hf }){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#0ea5e9';
  ctx.fillRect(40, H-40-hf*30, 60, hf*30);
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`f ≈ ${f.toFixed(4)}   h_f ≈ ${hf.toFixed(2)} m`, 24, 24);
}
