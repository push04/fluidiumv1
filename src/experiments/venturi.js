
export const defaultsVenturi = () => ({ Q: 0.02, d1: 0.12, d2: 0.06, rho: 1000 });
export const graphVenturi = { lines: [
  { key:'dp', label:'ΔP (Pa)', color:'#FF7F0E', yAxisId:'left' },
  { key:'v1', label:'V1 (m/s)', color:'#1F77B4', yAxisId:'right' },
  { key:'v2', label:'V2 (m/s)', color:'#2CA02C', yAxisId:'right' }
]};

export function tickVenturi({ Q, d1, d2, rho }){
  const A1 = Math.PI * (d1*d1) / 4;
  const A2 = Math.PI * (d2*d2) / 4;
  const v1 = Q / Math.max(1e-9, A1);
  const v2 = Q / Math.max(1e-9, A2);
  const dp = 0.5 * rho * (v2*v2 - v1*v1); // Bernoulli (ignoring losses)
  return { dp, v1, v2 };
}

export function renderVenturi(ctx, W, H, { dp, v1, v2 }){
  ctx.clearRect(0,0,W,H);
  const mid = H*0.55;
  // Pipe shape (simple converging-diverging)
  ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 20; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(40, mid); ctx.lineTo(W*0.35, mid);
  ctx.lineTo(W*0.45, mid-6); ctx.lineTo(W*0.55, mid+6);
  ctx.lineTo(W*0.65, mid); ctx.lineTo(W-40, mid); ctx.stroke();

  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`ΔP ≈ ${dp.toFixed(0)} Pa`, 24, 24);
  ctx.fillText(`V1 ≈ ${v1.toFixed(2)} m/s`, 24, 44);
  ctx.fillText(`V2 ≈ ${v2.toFixed(2)} m/s`, 24, 64);
}
