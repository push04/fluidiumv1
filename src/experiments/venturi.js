
export const defaultsVenturi = () => ({ v1: 2.0, D1: 0.6, D2: 0.3, density: 1000 });

export const graphVenturi = {
  lines: [
    { key: 'v1', label: 'Velocity v1 (m/s)', color: '#4f46e5', yAxisId: 'left' },
    { key: 'v2', label: 'Velocity v2 (m/s)', color: '#ec4899', yAxisId: 'left' },
    { key: 'dp', label: 'Δp (Pa)', color: '#f59e0b', yAxisId: 'right' }
  ]
};

export function tickVenturi({ v1, D1, D2, density }){
  const A1 = Math.PI * (D1/2)**2; const A2 = Math.PI * (D2/2)**2;
  const v2 = v1 * (A1/A2);
  const dp = 0.5 * density * (v2*v2 - v1*v1);
  return { v1, v2, dp };
}

export function renderVenturi(ctx, w, h, { v1, v2, dp }){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);
  const midY=h/2; ctx.fillStyle='#94a3b8'; ctx.beginPath();
  ctx.moveTo(20, midY-30); ctx.lineTo(w*0.35, midY-30); ctx.lineTo(w*0.5, midY-15); ctx.lineTo(w*0.65, midY-30); ctx.lineTo(w-20, midY-30);
  ctx.lineTo(w-20, midY+30); ctx.lineTo(w*0.65, midY+30); ctx.lineTo(w*0.5, midY+15); ctx.lineTo(w*0.35, midY+30); ctx.lineTo(20, midY+30);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#0ea5e9'; ctx.lineWidth=3;
  for(let x=30; x<w-30; x+=40){ ctx.beginPath(); ctx.moveTo(x, midY); const len=x<w*0.45||x>w*0.55?22:36; ctx.lineTo(x+len, midY); ctx.stroke(); }
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`v1 ≈ ${v1.toFixed(2)} m/s, v2 ≈ ${v2.toFixed(2)} m/s`, 24, 24); ctx.fillText(`Δp ≈ ${Math.round(dp)} Pa`, 24, 44);
}
