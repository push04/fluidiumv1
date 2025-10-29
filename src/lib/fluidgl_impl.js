
// Lightweight visible particle flow fallback (WebGL optional)
// Shows clear motion, responds to mouse impulses, supports obstacles, and exposes simple metrics.
export function createFluidGL(canvas, opts={}){
  const W = canvas.width, H = canvas.height;
  const N = Math.max(800, Math.min(2400, (W*H)/200)); // scale particles to canvas size
  const state = {
    particles: new Array(N).fill(0).map(()=> ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2,
      c: (0.6 + Math.random()*0.4)
    })),
    impulses: [],
    rects: [],
    avgSpeed: 0,
    totalDye: 0,
    vortPhase: 0
  };

  function applyObstacles(p){
    for (const r of state.rects){
      if (p.x >= r.x && p.x <= r.x+r.w && p.y >= r.y && p.y <= r.y+r.h){
        // simple reflection: push particle out on shortest axis
        const dx = Math.min(p.x - r.x, r.x+r.w - p.x);
        const dy = Math.min(p.y - r.y, r.y+r.h - p.y);
        if (dx < dy){
          if (p.x - r.x < r.x+r.w - p.x){ p.x = r.x-1; } else { p.x = r.x+r.w+1; }
          p.vx *= -0.6;
        }else{
          if (p.y - r.y < r.y+r.h - p.y){ p.y = r.y-1; } else { p.y = r.y+r.h+1; }
          p.vy *= -0.6;
        }
      }
    }
  }

  function step(params={}){
    const vort = Number(params.vort ?? 0.35);
    state.vortPhase += 0.002 + vort*0.001;
    let sum = 0;
    // background drift to the right
    const driftX = 0.04 + vort*0.02;
    const driftY = Math.sin(state.vortPhase)*0.02;

    // decay impulses
    for (const imp of state.impulses){ imp.str *= 0.95; }
    state.impulses = state.impulses.filter(i => i.str > 0.02);

    for (const p of state.particles){
      // influence from impulses
      for (const imp of state.impulses){
        const dx = p.x - imp.x, dy = p.y - imp.y;
        const r2 = dx*dx + dy*dy;
        const R = Math.max(10, imp.R);
        if (r2 < R*R){
          const r = Math.max(6, Math.sqrt(r2));
          const f = (imp.str / r);
          // push + a bit of swirl
          p.vx += f * (dx/r) + 0.15 * f * (dy/r);
          p.vy += f * (dy/r) - 0.15 * f * (dx/r);
          state.totalDye += 0.001;
        }
      }

      // base drift + gentle curl to preserve "swirls"
      const curl = vort*0.015;
      const vx = p.vx, vy = p.vy;
      p.vx = (vx - curl*vy) * 0.995 + driftX;
      p.vy = (vy + curl*vx) * 0.995 + driftY;

      // integrate
      p.x += p.vx; p.y += p.vy;

      // bounds
      if (p.x < 0){ p.x = 0; p.vx *= -0.6; }
      if (p.x > W){ p.x = W; p.vx *= -0.6; }
      if (p.y < 0){ p.y = 0; p.vy *= -0.6; }
      if (p.y > H){ p.y = H; p.vy *= -0.6; }

      applyObstacles(p);
      sum += Math.hypot(p.vx, p.vy);
    }
    state.avgSpeed = sum / state.particles.length;
  }

  function render(){
    const ctx = canvas.getContext('2d');
    // background
    ctx.fillStyle = '#06121f';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // particles
    ctx.globalCompositeOperation = 'lighter';
    for (const p of state.particles){
      ctx.fillStyle = `rgba(14,165,233,${0.08*p.c})`; // cyan-ish
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    // obstacles
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    for (const r of state.rects){ ctx.fillRect(r.x, r.y, r.w, r.h); }
  }

  return {
    step, render,
    addForce(uv, dir, radius=0.08, force=0.6){
      const x = uv[0]*canvas.width, y = uv[1]*canvas.height;
      const R = radius*canvas.width;
      const str = Math.min(3.0, Math.hypot(dir[0], dir[1]) * force * 3.0);
      state.impulses.push({ x, y, R, str });
    },
    addDye(uv, radius=0.1){
      // In particle mode, dye is implicit via impulses
      const x = uv[0]*canvas.width, y = uv[1]*canvas.height;
      state.impulses.push({ x, y, R: radius*canvas.width, str: 1.5 });
      state.totalDye += 2.0;
    },
    addObstacleRect(x0,y0,x1,y1){
      const x = Math.min(x0,x1)*canvas.width;
      const y = Math.min(y0,y1)*canvas.height;
      const w = Math.abs(x1-x0)*canvas.width;
      const h = Math.abs(y1-y0)*canvas.height;
      state.rects.push({ x,y,w,h });
    },
    clear(){ state.rects.length = 0; state.impulses.length = 0; },
    metrics(){ return { avgSpeed: state.avgSpeed, totalDye: state.totalDye }; }
  };
}
