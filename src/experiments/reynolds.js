
export const defaultsRe = () => ({ V: 0.3, D: 0.02, nu: 1e-6 }); // water ~1e-6 m2/s
export const graphRe = { lines: [
  { key:'Re', label:'Reynolds Number', color:'#1F77B4', yAxisId:'left' }
]};

export function tickRe({ V, D, nu }){
  const Re = (V * D) / Math.max(1e-9, nu);
  let regime = 'Laminar';
  if (Re >= 2300 && Re <= 4000) regime = 'Transitional';
  if (Re > 4000) regime = 'Turbulent';
  return { Re, regime };
}

export function renderRe(ctx, W, H, { Re, regime }){
  ctx.clearRect(0,0,W,H);
  // Draw pipe
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(30, H/2 - 30, W-60, 60);
  // Flow color based on regime
  const color = regime === 'Laminar' ? '#22c55e' : regime === 'Transitional' ? '#f59e0b' : '#ef4444';
  ctx.fillStyle = color;
  ctx.fillRect(30, H/2 - 18, W-60, 36);
  ctx.fillStyle = '#111827'; ctx.font = '14px Inter, sans-serif';
  ctx.fillText(`Re ≈ ${Math.round(Re)}  (${regime})`, 24, 24);
}
