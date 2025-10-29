
import React from 'react';
import { useApp } from '../context/AppContext.jsx';
export default function Toolbar({ onReset, onSnapshot }){
  const { isRunning, setIsRunning } = useApp();
  return (
    <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Controls">
      {!isRunning ? (
        <button className="btn btn-primary" onClick={()=>setIsRunning(true)}><span>▶</span> Start</button>
      ) : (
        <button className="btn btn-primary" onClick={()=>setIsRunning(false)}><span>⏸</span> Pause</button>
      )}
      <button className="btn btn-ghost" onClick={onReset}>⟲ Reset</button>
      <button className="btn btn-ghost" onClick={onSnapshot}>📷 Snapshot</button>
    </div>
  )
}
