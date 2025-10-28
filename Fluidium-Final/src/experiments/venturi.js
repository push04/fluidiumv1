
export const defaultsVenturi = () => ({
  v1: 2.0, D1: 0.6, D2: 0.3, density: 1000
});

export const graphVenturi = {
  lines: [
    { key: 'v1', label: 'Velocity v1 (m/s)', color: '#4f46e5', yAxisId: 'left' },
    { key: 'v2', label: 'Velocity v2 (m/s)', color: '#ec4899', yAxisId: 'left' },
    { key: 'dp', label: 'Δp (Pa)', color: '#f59e0b', yAxisId: 'right' },
  ]
};

export function tickVenturi(params){
  const rho = params.density;
  const A1 = Math.PI * (params.D1/2)**2;
  const A2 = Math.PI * (params.D2/2)**2;
  const v1 = params.v1;
  const v2 = v1 * (A1 / A2); // continuity A1 v1 = A2 v2
  const dp = 0.5 * rho * (v2*v2 - v1*v1); // Bernoulli dynamic pressure diff
  return { v1, v2, dp };
}

export function renderVenturi(ctx, w, h, state){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);
  // Draw a constricted pipe
  const midY = h/2;
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(20, midY-30);
  ctx.lineTo(w*0.35, midY-30);
  ctx.lineTo(w*0.5, midY-15);
  ctx.lineTo(w*0.65, midY-30);
  ctx.lineTo(w-20, midY-30);
  ctx.lineTo(w-20, midY+30);
  ctx.lineTo(w*0.65, midY+30);
  ctx.lineTo(w*0.5, midY+15);
  ctx.lineTo(w*0.35, midY+30);
  ctx.lineTo(20, midY+30);
  ctx.closePath();
  ctx.fill();

  // Simple arrows indicating speed change
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 3;
  for (let x=30; x<w-30; x+=40){
    ctx.beginPath();
    ctx.moveTo(x, midY);
    const len = x<w*0.45 || x>w*0.55 ? 20 : 35;
    ctx.lineTo(x+len, midY);
    ctx.stroke();
  }

  ctx.fillStyle = '#111827';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText(`v1 ≈ ${state.v1.toFixed(2)} m/s, v2 ≈ ${state.v2.toFixed(2)} m/s`, 24, 24);
  ctx.fillText(`Δp ≈ ${Math.round(state.dp)} Pa`, 24, 44);
}
