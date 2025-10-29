
export const defaultsBuoy = () => ({ rhoFluid: 1000, rhoObj: 600, width: 0.3, height: 0.3, g: 9.81 });
export const graphBuoy = { lines: [
  { key:'F_b', label:'Buoyant Force (N)', color:'#22c55e', yAxisId:'left' },
  { key:'submerged', label:'Submerged (m)', color:'#a78bfa', yAxisId:'right' }
]};
export function tickBuoy({ rhoFluid, rhoObj, width, height, g }){ const V=width*height; const sub = Math.min(height, (rhoObj/rhoFluid)*height); const Fb = rhoFluid*g*(width*sub); return { F_b: Fb, submerged: sub }; }
export function renderBuoy(ctx, W, H, { submerged }, params){ ctx.clearRect(0,0,W,H); const water='#60a5fa'; ctx.fillStyle=water; const mid=H*0.6; ctx.fillRect(0, mid, W, H-mid); const tankW=W*0.6, tankX=W*0.2; const objW=tankW*0.25; const objH=tankW*0.25*(params.height/params.width); const subPix=(submerged/params.height)*objH; const yTop=mid - (objH - subPix); ctx.fillStyle='#f59e0b'; ctx.fillRect(tankX + tankW*0.5 - objW/2, yTop, objW, objH); ctx.fillStyle='#e5e7eb'; ctx.font='14px Inter'; ctx.fillText(`Submerged ≈ ${submerged.toFixed(3)} m`, 24, 24); }
