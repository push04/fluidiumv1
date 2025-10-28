
export const defaultsBernoulli = () => ({
  velocity: 2.0, height: 2.0, density: 1000
});

export const graphBernoulli = {
  lines: [
    { key: 'p_head', label: 'Pressure Head (m)', color: '#4f46e5', yAxisId: 'left' },
    { key: 'v_head', label: 'Velocity Head (m)', color: '#22c55e', yAxisId: 'left' },
    { key: 'z_head', label: 'Elevation Head (m)', color: '#ec4899', yAxisId: 'left' },
    { key: 'H', label: 'Total Head (m)', color: '#f59e0b', yAxisId: 'right' },
  ]
};

export function tickBernoulli(params){
  // Simplified: choose a nominal total head and distribute among components.
  const g = 9.81, rho = params.density;
  const v_head = (params.velocity ** 2) / (2*g);
  const z_head = params.height;
  const H = v_head + z_head + 5; // assume +5m static head baseline
  const p_head = Math.max(H - v_head - z_head, 0);
  return { p_head, v_head, z_head, H };
}

export function renderBernoulli(ctx, w, h, state){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);

  const base = h - 20;
  const scale = 10; // pixels per meter approx
  const tubes = [
    { color: '#4f46e5', height: state.p_head },
    { color: '#22c55e', height: state.v_head },
    { color: '#ec4899', height: state.z_head }
  ];
  const width = 40;
  const gap = 40;
  let x = 40;
  for (const t of tubes){
    const hh = t.height * scale;
    ctx.fillStyle = t.color;
    ctx.fillRect(x, base - hh, width, hh);
    x += width + gap;
  }
  ctx.fillStyle = '#111827';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText(`Total Head H ≈ ${state.H.toFixed(2)} m`, 40, 24);
}
