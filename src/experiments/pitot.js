
export const defaultsPitot = () => ({ velocity: 5, density: 1000 });

export const graphPitot = {
  lines: [
    { key: 'dp', label: 'Δp (Pa)', color: '#4f46e5', yAxisId: 'left' },
    { key: 'velocity', label: 'Velocity (m/s)', color: '#ec4899', yAxisId: 'right' }
  ]
};

export function tickPitot({ velocity, density }){
  const dp = 0.5 * density * velocity * velocity; // dynamic pressure
  return { dp, velocity };
}

export function renderPitot(ctx, w, h, { dp, velocity }){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);
  const midY = h/2;
  // flow arrows
  ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 3;
  for(let x=20; x<w-50; x+=40){ ctx.beginPath(); ctx.moveTo(x, midY); ctx.lineTo(x+30, midY); ctx.stroke(); }
  // pitot tube
  ctx.fillStyle='#1f2937'; ctx.fillRect(w/2-4, midY-60, 8, 120);
  ctx.fillStyle='#ef4444';
  const colH = Math.min(100, Math.max(10, dp/200)); // visual
  ctx.fillRect(w/2+20, midY + 50 - colH, 20, colH);
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`Δp ≈ ${Math.round(dp)} Pa  at  v ≈ ${velocity.toFixed(1)} m/s`, 24, 24);
}
