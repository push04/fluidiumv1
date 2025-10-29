
export const defaultsHJump = () => ({ Q: 0.2, b: 1.0, y1: 0.2, g: 9.81, opening: 0.7 });
export const graphHJump = { lines: [
  { key:'Fr1', label:'Froude (upstream)', color:'#1F77B4', yAxisId:'left' },
  { key:'y2', label:'Sequent Depth y2 (m)', color:'#FF7F0E', yAxisId:'right' },
  { key:'ELoss', label:'Energy Loss (m)', color:'#2CA02C', yAxisId:'right' }
]};

const P = []; // simple particles to visualize flow through a gate valve & jump
let init = false;
function ensureParticles(W,H){
  if (init && P.length) return;
  P.length = 0;
  const N = Math.max(300, Math.min(1200, (W*H)/1000));
  for (let i=0;i<N;i++){
    P.push({ x: 40 + Math.random()*80, y: H*0.6 - Math.random()*120, vx: 1+Math.random()*0.5, vy: 0 });
  }
  init = true;
}

export function tickHJump({ Q, b, y1, g, opening }){
  // Gate-like discharge (approx): Q_eff = Q * opening^(3/2)
  const Qeff = Q * Math.pow(Math.max(0, Math.min(1, opening)), 1.5);
  const v1 = Qeff/(b*y1);
  const Fr1 = v1/Math.sqrt(g*y1);
  const y2 = 0.5*y1*(Math.sqrt(1+8*Fr1*Fr1)-1);
  const ELoss = Math.max(0, (y2 - y1)**3 / (4*y1*y2));
  return { Fr1, y2, ELoss, Qeff, v1 };
}

export function renderHJump(ctx, W, H, { y2, Qeff, v1 }, params){
  ensureParticles(W,H);
  ctx.clearRect(0,0,W,H);
  const midY = H*0.7;

  // background
  ctx.fillStyle='#0b1220'; ctx.fillRect(0,0,W,H);

  // channel bed
  ctx.fillStyle='#1f2937'; ctx.fillRect(0, midY, W, H - midY);

  // water upstream (depth y1 visualized ~ 150px/m)
  const pxPerM = 300;
  const upH = Math.max(20, params.y1*pxPerM);
  const downH = Math.max(10, y2*pxPerM);

  // gate at x=120; opening controls slot height
  const gateX = 120, slot = Math.max(8, params.opening * upH);
  ctx.fillStyle='#374151'; ctx.fillRect(gateX-6, midY - upH, 12, upH); // solid gate body
  ctx.clearRect(gateX-4, midY - slot, 8, slot); // opening

  // water surfaces
  ctx.fillStyle='#60a5fa';
  ctx.fillRect(0, midY - upH, gateX-6, upH);            // upstream pool
  ctx.fillRect(gateX+6, midY - downH, W-(gateX+6), downH); // downstream pool

  // jumping roller hint (line)
  ctx.strokeStyle='#93c5fd'; ctx.setLineDash([6,4]);
  ctx.beginPath();
  ctx.moveTo(gateX+6, midY - (downH*0.7));
  ctx.quadraticCurveTo(gateX+80, midY - (downH*0.9), gateX+160, midY - (downH*0.6));
  ctx.stroke(); ctx.setLineDash([]);

  // particles advecting from gate -> downstream, speed ~ v1
  for (const p of P){
    p.x += Math.max(1.0, 0.6 + v1*0.3);
    // keep particles within downstream flow band
    const top = midY - downH;
    const bottom = midY - 6;
    if (p.y < top) p.y = top + Math.random()*8;
    if (p.y > bottom) p.y = bottom - Math.random()*8;
    if (p.x > W) { p.x = gateX + 10; p.y = top + Math.random()*(downH-8); }
  }

  // draw particles
  ctx.fillStyle='rgba(59,130,246,0.8)';
  for (const p of P){ ctx.fillRect(p.x, p.y, 2, 2); }

  // HUD
  ctx.fillStyle='#e5e7eb'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`Q_eff ≈ ${Qeff.toFixed(3)} m³/s`, 18, 24);
  ctx.fillText(`v1 ≈ ${v1.toFixed(2)} m/s`, 18, 44);
  ctx.fillText(`y₂ ≈ ${y2.toFixed(3)} m`, 18, 64);
}
