
export const defaultsHJump = () => ({ Q: 0.2, b: 1.0, y1: 0.2, g: 9.81, opening: 0.7 });
export const graphHJump = { lines: [
  { key:'Fr1', label:'Froude (upstream)', color:'#0ea5e9', yAxisId:'left' },
  { key:'y2', label:'Sequent Depth y2 (m)', color:'#f59e0b', yAxisId:'right' },
  { key:'ELoss', label:'Energy Loss (m)', color:'#06b6d4', yAxisId:'right' }
]};
const P=[]; let seeded=false;
function seed(W,H){ if (seeded) return; P.length=0; const N=Math.max(300, Math.min(1200, (W*H)/1000)); for(let i=0;i<N;i++){ P.push({ x: 120+Math.random()*40, y: H*0.7 - Math.random()*80 }); } seeded=true; }
export function tickHJump({ Q, b, y1, g, opening }){
  const Qeff = Q * Math.pow(Math.max(0, Math.min(1, opening)), 1.5);
  const v1 = Qeff / (b * y1);
  const Fr1 = v1 / Math.sqrt(g*y1);
  const y2 = 0.5*y1*(Math.sqrt(1+8*Fr1*Fr1)-1);
  const ELoss = Math.max(0, (y2 - y1)**3 / (4*y1*y2));
  return { Fr1, y2, ELoss, Qeff, v1 };
}
export function renderHJump(ctx, W, H, { y2, Qeff, v1 }, params){
  seed(W,H);
  const mid = H*0.7; const px=300;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#0b1220'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#1f2937'; ctx.fillRect(0, mid, W, H-mid);
  const upH = Math.max(20, params.y1*px), downH = Math.max(10, y2*px);
  const gateX = 120, slot = Math.max(8, params.opening * upH);
  ctx.fillStyle='#374151'; ctx.fillRect(gateX-6, mid - upH, 12, upH);
  ctx.clearRect(gateX-4, mid - slot, 8, slot);
  ctx.fillStyle='#60a5fa'; ctx.fillRect(0, mid - upH, gateX-6, upH);
  ctx.fillRect(gateX+6, mid - downH, W-(gateX+6), downH);
  for(const p of P){ p.x += Math.max(1, 0.5+v1*0.3); const top=mid-downH, bot=mid-6; if(p.y<top) p.y=top+Math.random()*4; if(p.y>bot) p.y=bot-Math.random()*4; if(p.x>W){ p.x=gateX+12; p.y=top+Math.random()*(downH-8);} }
  ctx.fillStyle='rgba(59,130,246,0.85)'; for(const p of P){ ctx.fillRect(p.x, p.y, 2, 2); }
  ctx.fillStyle='#e5e7eb'; ctx.font='14px Inter'; ctx.fillText(`Q_eff ≈ ${Qeff.toFixed(3)} m³/s`, 16, 24); ctx.fillText(`v1 ≈ ${v1.toFixed(2)} m/s`, 16, 44); ctx.fillText(`y₂ ≈ ${y2.toFixed(3)} m`, 16, 64);
}
