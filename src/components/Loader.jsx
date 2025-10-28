import React from 'react';

export default function Loader(){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-black/70 z-50 pointer-events-none">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-secondary border-dashed rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  )
}
