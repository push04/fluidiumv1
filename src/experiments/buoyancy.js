
export const defaultsBuoy = () => ({ rhoFluid: 1000, rhoObj: 600, width: 0.3, height: 0.3, g: 9.81 });
export const graphBuoy = { lines: [
  { key:'F_b', label:'Buoyant Force (N)', color:'#22C55E', yAxisId:'left' },
  { key:'submerged', label:'Submerged Height (m)', color:'#4338CA', yAxisId:'right' }
]};

export function tickBuoy({ rhoFluid, rhoObj, width, height, g }){
  const V = width*height*1;
  const Fb = rhoFluid * g * Math.min(1, rhoObj/rhoFluid) * V;
  const submerged = Math.min(height, (rhoObj/rhoFluid) * height);
  return { F_b: Fb, submerged };
}

export function renderBuoy(ctx, W, H, { submerged }, params){
  ctx.clearRect(0,0,W,H);
  const water = '#60a5fa';
  ctx.fillStyle=water; ctx.fillRect(0, H*0.6, W, H*0.4);
  const tankW = W*0.6, tankX=W*0.2;
  const objW = tankW*0.25;
  const objH = tankW*0.25*(params.height/params.width);
  const subPix = (submerged/params.height)*objH;
  const yTop = H*0.6 - (objH - subPix);
  ctx.fillStyle='#f59e0b'; ctx.fillRect(tankX + tankW*0.5 - objW/2, yTop, objW, objH);
  ctx.fillStyle='#ffffff'; ctx.fillRect(0, H*0.6-2, W, 2);
  ctx.fillStyle='#111827'; ctx.font='14px Inter, sans-serif';
  ctx.fillText(`Submerged ≈ ${submerged.toFixed(3)} m`, 24, 24);
}
