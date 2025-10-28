
export const defaultsWeir = () => ({ H: 0.2, theta: 90, Cd: 0.62 });

export const graphWeir = {
  lines: [
    { key: 'Q', label: 'Discharge Q (m³/s)', color: '#4f46e5', yAxisId: 'left' }
  ]
};

export function tickWeir({ H, theta, Cd }){
  // Sharp-crested V-notch: Q = (8/15) Cd sqrt(2g) tan(theta/2) H^(5/2)
  const g = 9.81; const rad = (theta * Math.PI)/180;
  const Q = (8/15) * Cd * Math.sqrt(2*g) * Math.tan(rad/2) * Math.pow(H, 2.5);
  return { Q };
}

export function renderWeir(ctx, w, h, { Q }){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0,h/2,w,h/2); // water
  ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0,h/2+10, w, 5); // surface
  // notch triangular opening
  ctx.fillStyle = '#1f2937';
  ctx.beginPath(); ctx.moveTo(w/2-40, h/2); ctx.lineTo(w/2, h/2-40); ctx.lineTo(w/2+40, h/2); ctx.closePath(); ctx.fill();
  // falling nappe
  ctx.strokeStyle = '#60a5fa'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(w/2, h/2-40); ctx.quadraticCurveTo(w/2+30, h/2+10, w/2+30, h/2+80); ctx.stroke();
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif'; ctx.fillText(`Q ≈ ${Q.toExponential(2)} m³/s`, 24, 24);
}
