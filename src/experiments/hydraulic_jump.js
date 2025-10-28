
export const defaultsHJump = () => ({ Q: 0.2, b: 1.0, y1: 0.2, g: 9.81 });
export const graphHJump = { lines: [
  { key:'Fr1', label:'Froude (upstream)', color:'#4f46e5', yAxisId:'left' },
  { key:'y2', label:'Sequent Depth y2 (m)', color:'#f59e0b', yAxisId:'right' }
]};

export function tickHJump({ Q, b, y1, g }){
  const v1 = Q/(b*y1);
  const Fr1 = v1/Math.sqrt(g*y1);
  const y2 = 0.5*y1*(Math.sqrt(1+8*Fr1*Fr1)-1);
  const ELoss = (y2 - y1)**3 / (4*y1*y2); // specific energy loss
  return { Fr1, y2, ELoss };
}

export function renderHJump(ctx, W, H, { y2 }){
  ctx.clearRect(0,0,W,H);
  // Simple channel with jump
  const water = '#60a5fa', ground='#1f2937';
  ctx.fillStyle=ground; ctx.fillRect(0, H*0.7, W, H*0.3);
  ctx.fillStyle=water;
  ctx.fillRect(0, H*0.7 - 80, W*0.45, 80); // upstream depth
  ctx.fillRect(W*0.45, H*0.7 - (80 + (y2-0.2)*300), W*0.55, 80 + (y2-0.2)*300); // downstream deeper
  // foam line
  ctx.strokeStyle='#ffffff'; ctx.setLineDash([6,6]); ctx.beginPath(); ctx.moveTo(W*0.45, H*0.7-60); ctx.quadraticCurveTo(W*0.55, H*0.7-50, W*0.65, H*0.7-70); ctx.stroke(); ctx.setLineDash([]);
}
