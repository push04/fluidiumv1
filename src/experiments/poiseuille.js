
export const defaultsPoiseuille = () => ({ dp: 5000, radius: 0.05, viscosity: 0.2, length: 1.0 });

export const graphPoiseuille = {
  lines: [
    { key: 'Q', label: 'Flow Rate Q (m³/s)', color: '#4f46e5', yAxisId: 'left' }
  ]
};

export function tickPoiseuille({ dp, radius, viscosity, length }){
  // Hagen–Poiseuille: Q = (π Δp r^4) / (8 μ L)
  const Q = Math.PI * dp * Math.pow(radius,4) / (8 * viscosity * length);
  return { Q };
}

export function renderPoiseuille(ctx, w, h, { Q }){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);
  // draw parabolic velocity profile
  const cx = w/2, cy = h/2, R = Math.min(120, h/2-20);
  ctx.fillStyle = '#0ea5e9';
  for(let r=0; r<R; r+=1){
    const y = cy - r;
    const v = 1 - (r*r)/(R*R); // normalized parabolic profile
    ctx.fillRect(cx - v*R, y, 2*v*R, 1);
    ctx.fillRect(cx - v*R, cy + (cy - y), 2*v*R, 1);
  }
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`Q ≈ ${Q.toExponential(2)} m³/s`, 24, 24);
}
