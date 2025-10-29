
export function createFluidGL(canvas, opts={}){
  const api = {
    step(){}, render(){ const ctx = canvas.getContext('2d'); ctx.fillStyle='#0ea5e9'; ctx.fillRect(0,0,canvas.width,canvas.height); },
    addForce(){}, addDye(){}, addObstacleRect(){}, clear(){},
    metrics(){ return { avgSpeed: Math.random()*2, totalDye: Math.random()*100 }; }
  };
  return api;
}
