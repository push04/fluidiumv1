
import { createFluidGL as implCreateFluidGL } from './fluidgl_impl.js';
export function createFluidGL(canvas, opts = {}) {
  const gl = canvas.getContext('webgl2');
  if (!gl){
    const ctx = canvas.getContext('2d');
    if (ctx){
      ctx.fillStyle = '#ef4444';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText('WebGL2 not available. Please try a modern browser.', 20, 40);
    }
    return null;
  }
  return implCreateFluidGL(canvas, opts);
}
