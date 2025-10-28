
export const defaultsReynolds = () => ({
  velocity: 1.0, viscosity: 1.0, diameter: 0.5, density: 1000
});

export const graphReynolds = {
  lines: [
    { key: 'Re', label: 'Reynolds Number', color: '#4f46e5', yAxisId: 'left' },
    { key: 'velocity', label: 'Velocity (m/s)', color: '#ec4899', yAxisId: 'right' },
  ]
};

export function tickReynolds(params){
  const { velocity, viscosity, diameter, density } = params;
  const Re = (density * velocity * diameter) / viscosity; // classic definition
  let regime = 'Laminar';
  if (Re >= 4000) regime = 'Turbulent';
  else if (Re >= 2300) regime = 'Transitional';
  return { Re, velocity, regime };
}

export function renderReynolds(ctx, w, h, state){
  // Simple dye streak visualization: straight line for laminar, wavy for turbulent.
  ctx.clearRect(0,0,w,h);
  // background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);

  const midY = h/2;
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 3;
  ctx.beginPath();
  let x = 20;
  ctx.moveTo(x, midY);
  const { regime } = state;
  while (x < w-20){
    const y = regime === 'Laminar' ? midY : (regime === 'Transitional' ? midY + Math.sin(x/12)*6 : midY + Math.sin(x/6)*12);
    ctx.lineTo(x, y);
    x += 6;
  }
  ctx.stroke();

  // Label
  ctx.fillStyle = '#111827';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText(`Regime: ${state.regime}`, 16, 24);
  ctx.fillText(`Re ≈ ${Math.round(state.Re)}`, 16, 44);
}
