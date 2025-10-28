
export const defaultsLiftDrag = () => ({ velocity: 20, rho: 1.225, S: 1.0, alpha: 5 });

export const graphLiftDrag = {
  lines: [
    { key: 'L', label: 'Lift (N)', color: '#22c55e', yAxisId: 'left' },
    { key: 'D', label: 'Drag (N)', color: '#ef4444', yAxisId: 'right' }
  ]
};

export function tickLiftDrag({ velocity, rho, S, alpha }){
  const a = alpha * Math.PI/180;
  const q = 0.5 * rho * velocity * velocity;
  const Cl = 2 * Math.pi * a; // linear lift curve slope (thin airfoil theory)
  const Cd0 = 0.02; const k = 0.05; const Cd = Cd0 + k * Cl * Cl; // simple drag polar
  const L = q * S * Cl;
  const D = q * S * Cd;
  return { L, D, Cl, Cd };
}

export function renderLiftDrag(ctx, w, h, { L, D, Cl, Cd }){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-card') || '#fff';
  ctx.fillRect(0,0,w,h);
  const cx=w/2, cy=h/2;
  // simple airfoil outline
  ctx.strokeStyle='#111827'; ctx.lineWidth=2; ctx.beginPath();
  ctx.moveTo(cx-140, cy); ctx.quadraticCurveTo(cx-20, cy-40, cx+140, cy); ctx.quadraticCurveTo(cx-20, cy+40, cx-140, cy); ctx.stroke();
  // lift and drag arrows
  ctx.strokeStyle='#22c55e'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy-60); ctx.stroke();
  ctx.strokeStyle='#ef4444'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx+60, cy); ctx.stroke();
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`L ≈ ${Math.round(L)} N,  D ≈ ${Math.round(D)} N`, 24, 24);
  ctx.fillText(`Cl ≈ ${Cl.toFixed(2)}  Cd ≈ ${Cd.toFixed(3)}`, 24, 44);
}
