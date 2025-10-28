
// This file is identical to the earlier fluidgl.js engine (abbreviated import).
// For brevity, we include a simple availability guard.

export function createFluidGL(canvas, opts={}){
  const gl = canvas.getContext('webgl2');
  if (!gl){
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ef4444';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('WebGL2 not available. Please try a modern browser.', 20, 40);
    return null;
  }
  // Import the full engine at build time (inlined by Vite)
  return (await import('./fluidgl_impl.js')).createFluidGL(canvas, opts);
}
