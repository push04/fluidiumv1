
import React from 'react';

export default function InputControl({ label, value, min, max, step, onChange, type='range', number=true }){
  const decimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
  return (
    <div>
      <label className="label">{label} <span className="font-semibold ml-2">{Number(value).toFixed(decimals)}</span></label>
      <div className="flex items-center gap-2">
        {number && (
          <input className="input w-28" type="number" step={step} min={min} max={max} value={value}
            onChange={e=>onChange(parseFloat(e.target.value))} />
        )}
        <input className="w-full" type={type} min={min} max={max} step={step} value={value}
          onChange={e=>onChange(parseFloat(e.target.value))} />
      </div>
    </div>
  )
}
