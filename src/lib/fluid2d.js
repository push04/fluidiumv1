
// Minimal "Stable Fluids" (Jos Stam) CPU solver at 128x128 with vorticity confinement and obstacles.
export function createFluid2D(N = 128, W = 900, H = 420){
  const size = (N+2)*(N+2);
  const idx = (i,j) => i + (N+2)*j;

  // fields
  let u = new Float32Array(size), v = new Float32Array(size);
  let u0 = new Float32Array(size), v0 = new Float32Array(size);
  let p = new Float32Array(size), div = new Float32Array(size);
  let dye = new Float32Array(size), dye0 = new Float32Array(size);
  let obs = new Uint8Array(size); // 1 = obstacle
  const h = 1.0/N;
  const dt = 0.016;
  const visc = 0.0001;
  const diff = 0.00001;

  function setBoundary(b, x){
    for(let i=1;i<=N;i++){
      x[idx(0,i)]   = b===1 ? -x[idx(1,i)]   : x[idx(1,i)];
      x[idx(N+1,i)] = b===1 ? -x[idx(N,i)]   : x[idx(N,i)];
      x[idx(i,0)]   = b===2 ? -x[idx(i,1)]   : x[idx(i,1)];
      x[idx(i,N+1)] = b===2 ? -x[idx(i,N)]   : x[idx(i,N)];
    }
    x[idx(0,0)]       = 0.5*(x[idx(1,0)]   + x[idx(0,1)]);
    x[idx(0,N+1)]     = 0.5*(x[idx(1,N+1)] + x[idx(0,N)]);
    x[idx(N+1,0)]     = 0.5*(x[idx(N,0)]   + x[idx(N+1,1)]);
    x[idx(N+1,N+1)]   = 0.5*(x[idx(N,N+1)] + x[idx(N+1,N)]);
    // Solid obstacles: zero velocity inside
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        const id = idx(i,j);
        if (obs[id]){
          if (b===1) { x[id] = 0; }
          if (b===2) { x[id] = 0; }
        }
      }
    }
  }

  function linSolve(b, x, x0, a, c){
    for(let k=0;k<20;k++){
      for(let j=1;j<=N;j++){
        for(let i=1;i<=N;i++){
          const id=idx(i,j);
          x[id] = (x0[id] + a*(x[idx(i-1,j)] + x[idx(i+1,j)] + x[idx(i,j-1)] + x[idx(i,j+1)])) / c;
        }
      }
      setBoundary(b, x);
    }
  }

  function diffuse(b, x, x0, d){
    const a = dt * d * N * N;
    linSolve(b, x, x0, a, 1 + 4*a);
  }

  function advect(b, d, d0, u, v){
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        let x = i - dt * N * u[idx(i,j)];
        let y = j - dt * N * v[idx(i,j)];
        if (x<0.5) x=0.5; if (x>N+0.5) x=N+0.5;
        if (y<0.5) y=0.5; if (y>N+0.5) y=N+0.5;
        const i0 = Math.floor(x), i1 = i0 + 1;
        const j0 = Math.floor(y), j1 = j0 + 1;
        const s1 = x - i0, s0 = 1 - s1;
        const t1 = y - j0, t0 = 1 - t1;
        const id = idx(i,j);
        d[id] =
          s0*(t0*d0[idx(i0,j0)] + t1*d0[idx(i0,j1)]) +
          s1*(t0*d0[idx(i1,j0)] + t1*d0[idx(i1,j1)]);
      }
    }
    setBoundary(b, d);
  }

  function project(u, v, p, div){
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        const id = idx(i,j);
        div[id] = -0.5*h*(u[idx(i+1,j)] - u[idx(i-1,j)] + v[idx(i,j+1)] - v[idx(i,j-1)]);
        p[id] = 0;
      }
    }
    setBoundary(0, div); setBoundary(0, p);
    linSolve(0, p, div, 1, 4);
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        u[idx(i,j)] -= 0.5*(p[idx(i+1,j)] - p[idx(i-1,j)]) / h;
        v[idx(i,j)] -= 0.5*(p[idx(i,j+1)] - p[idx(i,j-1)]) / h;
      }
    }
    setBoundary(1, u); setBoundary(2, v);
  }

  function vorticityConfinement(u, v, eps=2.0){
    // compute curl w = ∂v/∂x - ∂u/∂y and add force eps * N x w
    const w = new Float32Array(size);
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        w[idx(i,j)] = (v[idx(i+1,j)] - v[idx(i-1,j)] - (u[idx(i,j+1)] - u[idx(i,j-1)])) * 0.5;
      }
    }
    for(let j=2;j<=N-1;j++){
      for(let i=2;i<=N-1;i++){
        const wx = (Math.abs(w[idx(i+1,j)]) - Math.abs(w[idx(i-1,j)])) * 0.5;
        const wy = (Math.abs(w[idx(i,j+1)]) - Math.abs(w[idx(i,j-1)])) * 0.5;
        const len = Math.hypot(wx, wy) + 1e-6;
        const Nx = wx/len, Ny = wy/len;
        const f = eps * w[idx(i,j)];
        u[idx(i,j)] += Ny * f * dt;
        v[idx(i,j)] -= Nx * f * dt;
      }
    }
  }

  function step(params){
    const vort = Number(params.vort ?? 1.0);
    // velocity diffusion
    u0.set(u); v0.set(v);
    diffuse(1, u, u0, visc);
    diffuse(2, v, v0, visc);
    project(u, v, p, div);
    // advection
    u0.set(u); v0.set(v);
    advect(1, u, u0, u0, v0);
    advect(2, v, v0, u0, v0);
    // vorticity confinement
    if (vort>0) vorticityConfinement(u, v, vort);
    // projection
    project(u, v, p, div);
    // dye diffusion+advection
    dye0.set(dye);
    diffuse(0, dye, dye0, diff);
    advect(0, dye, dye0, u, v);
    // apply obstacles: zero vel, zero dye inside
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        const id=idx(i,j); if (obs[id]){ u[id]=v[id]=0; dye[id]*=0.8; }
      }
    }
    // compute avg speed
    let sum=0;
    for(let j=1;j<=N;j++){
      for(let i=1;i<=N;i++){
        sum+=Math.hypot(u[idx(i,j)], v[idx(i,j)]);
      }
    }
    const avgSpeed = sum / (N*N);
    const totalDye = dye.reduce((a,b)=>a+b,0)/(N*N);
    return { avgSpeed, totalDye };
  }

  function addForceUV(uv, dir, radius=0.05, force=150){
    const cx = Math.floor((1+N)*uv[0]);
    const cy = Math.floor((1+N)*uv[1]);
    const R = Math.max(1, Math.floor(radius*N));
    for(let j=-R;j<=R;j++){
      for(let i=-R;i<=R;i++){
        const x = cx+i, y=cy+j; if (x<1||x>N||y<1||y>N) continue;
        const id=idx(x,y); const d = Math.hypot(i,j); if (d>R) continue;
        u[id]+= force*dir[0]*(1-d/R)*0.002;
        v[id]+= force*dir[1]*(1-d/R)*0.002;
      }
    }
  }
  function addDyeUV(uv, radius=0.05, amount=1){
    const cx = Math.floor((1+N)*uv[0]);
    const cy = Math.floor((1+N)*uv[1]);
    const R = Math.max(1, Math.floor(radius*N));
    for(let j=-R;j<=R;j++){
      for(let i=-R;i<=R;i++){
        const x = cx+i, y=cy+j; if (x<1||x>N||y<1||y>N) continue;
        const id=idx(x,y); const d = Math.hypot(i,j); if (d>R) continue;
        dye[id]+= amount*(1-d/R);
      }
    }
  }
  function addObstacleRectUV(x0,y0,x1,y1){
    const i0=Math.floor((1+N)*x0), j0=Math.floor((1+N)*y0);
    const i1=Math.floor((1+N)*x1), j1=Math.floor((1+N)*y1);
    const a=Math.min(i0,i1), b=Math.max(i0,i1), c=Math.min(j0,j1), d=Math.max(j0,j1);
    for(let j=c;j<=d;j++){ for(let i=a;i<=b;i++){ obs[idx(i,j)] = 1; } }
  }
  function clear(){ u.fill(0); v.fill(0); dye.fill(0); obs.fill(0); }

  // rendering
  function renderTo(ctx, W, H){
    const img = ctx.createImageData(W,H);
    for(let y=0;y<H;y++){
      for(let x=0;x<W;x++){
        const i = Math.floor((x/W)*(N+2)); const j = Math.floor((y/H)*(N+2));
        const id = idx(i,j);
        const c = Math.max(0, Math.min(255, Math.floor(dye[id]*255)));
        const o = (x + y*W)*4; img.data[o]= 30; img.data[o+1]= 180; img.data[o+2]= 255; img.data[o+3]= Math.max(40, c);
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  return { step, renderTo, addForceUV, addDyeUV, addObstacleRectUV, clear };
}
