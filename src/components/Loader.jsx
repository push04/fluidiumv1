
import React from 'react';
export default function Loader(){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 z-50 pointer-events-none">
      <div className="relative w-28 h-28" role="status" aria-live="polite" aria-label="Loading">
        <div className="absolute inset-0 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-secondary border-dashed rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute inset-8 border-4 border-accent border-dashed rounded-full animate-spin"></div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  )
}
