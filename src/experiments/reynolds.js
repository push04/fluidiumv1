
export const defaultsRe = () => ({ V: 0.3, D: 0.02, nu: 1e-6 });
export const graphRe = { lines: [
  { key:'Re', label:'Reynolds', color:'#0ea5e9', yAxisId:'left' }
]};
export function tickRe({ V, D, nu }){ const Re = (V*D)/Math.max(1e-9, nu); let regime='Laminar'; if(Re>=2300&&Re<=4000) regime='Transitional'; if(Re>4000) regime='Turbulent'; return { Re, regime }; }
export function renderRe(ctx, W, H, { Re, regime }){ ctx.clearRect(0,0,W,H); ctx.fillStyle='#1f2937'; ctx.fillRect(20, H/2 - 30, W-40, 60); const color = regime==='Laminar'?'#22c55e':(regime==='Transitional'?'#f59e0b':'#ef4444'); ctx.fillStyle=color; ctx.fillRect(20, H/2 - 18, W-40, 36); ctx.fillStyle='#e5e7eb'; ctx.font='14px Inter'; ctx.fillText(`Re ≈ ${Math.round(Re)} (${regime})`, 24, 24); }
