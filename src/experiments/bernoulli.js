
export const defaultsBernoulli = () => ({ velocity: 2.0, height: 2.0, density: 1000 });

export const graphBernoulli = {
  lines: [
    { key: 'p_head', label: 'Pressure Head (m)', color: '#4f46e5', yAxisId: 'left' },
    { key: 'v_head', label: 'Velocity Head (m)', color: '#22c55e', yAxisId: 'left' },
    { key: 'z_head', label: 'Elevation Head (m)', color: '#ec4899', yAxisId: 'left' },
    { key: 'H', label: 'Total Head (m)', color: '#f59e0b', yAxisId: 'right' }
  ]
};

export function tickBernoulli({ velocity, height, density }){
  const g = 9.81;
  const v_head = (velocity ** 2) / (2*g);
  const z_head = height;
  const H = v_head + z_head + 5;
  const p_head = Math.max(H - v_head - z_head, 0);
  return { p_head, v_head, z_head, H };
}

export function renderBernoulli(ctx, w, h, { p_head, v_head, z_head, H }){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);
  const base = h-20, scale = 12; const tubes=[{c:'#4f46e5',h:p_head},{c:'#22c55e',h:v_head},{c:'#ec4899',h:z_head}];
  let x=40; const width=40, gap=40;
  for(const t of tubes){ const hh=t.h*scale; ctx.fillStyle=t.c; ctx.fillRect(x, base-hh, width, hh); x+=width+gap; }
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif'; ctx.fillText(`Total Head H ≈ ${H.toFixed(2)} m`, 40, 24);
}
