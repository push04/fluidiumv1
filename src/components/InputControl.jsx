
import React, { useMemo, useState, useEffect } from 'react';
export default function InputControl({ label, value, min, max, step, onChange, name, helper }){
  const [val, setVal] = useState(value);
  const [err, setErr] = useState('');
  const id = useMemo(()=>`field-${name}`,[name]);
  useEffect(()=>setVal(value),[value]);
  const clamp=(n)=> Math.min(max, Math.max(min, n));
  const check=(n)=> Number.isNaN(n) ? 'Enter a number' : n<min ? `Min ${min}` : n>max ? `Max ${max}` : '';
  const commit=(n)=>{ const e=check(n); setErr(e); onChange(clamp(Number.isNaN(n)?value:n)); };
  return (
    <div role="group" aria-labelledby={`${id}-label`}>
      <label id={`${id}-label`} htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input id={id} className="input w-28" type="number" value={val} min={min} max={max} step={step}
          onChange={e=>setVal(parseFloat(e.target.value))} onBlur={()=>commit(val)} onKeyDown={e=>{ if(e.key==='Enter') commit(val) }} />
        <input type="range" className="w-full" min={min} max={max} step={step} value={val} onChange={e=>commit(parseFloat(e.target.value))} />
        <span className="text-xs opacity-70">{Number(val).toFixed(String(step).includes('.')?String(step).split('.')[1].length:0)}</span>
      </div>
      {err ? <p className="text-xs text-red-500 mt-1">{err}</p> : <p className="text-xs text-gray-500 mt-1">{helper}</p>}
    </div>
  )
}
