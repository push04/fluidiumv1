
import React, { useMemo, useState, useEffect } from 'react';

export default function InputControl({ label, value, min, max, step, onChange, name, symbol }){
  const [val, setVal] = useState(value);
  const [err, setErr] = useState('');
  const id = useMemo(() => `field-${name}`, [name]);
  const decimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;

  useEffect(() => { setVal(value); }, [value]);

  const clamp = (n) => Math.min(max, Math.max(min, n));
  const validate = (n) => {
    if (Number.isNaN(n)) return 'Enter a number';
    if (n < min) return `Min ${min}`;
    if (n > max) return `Max ${max}`;
    return '';
  };

  const commit = (n) => {
    const e = validate(n);
    setErr(e);
    const c = clamp(Number.isNaN(n) ? min : n);
    onChange(c);
  };

  return (
    <div role="group" aria-labelledby={`${id}-label`}>
      <label id={`${id}-label`} className="label" htmlFor={id}>
        {label} {symbol && <span className="helper ml-2">({symbol})</span>}
        <span className="sr-only">Parameter input</span>
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id} name={name} className="input w-28" type="number" step={step} min={min} max={max}
          aria-describedby={err ? `${id}-err` : `${id}-help`}
          aria-invalid={!!err}
          value={val}
          onChange={e=>setVal(parseFloat(e.target.value))}
          onBlur={()=>commit(val)}
          onKeyDown={(e)=>{ if(e.key==='Enter') commit(val); }}
        />
        <input
          className="w-full" type="range" min={min} max={max} step={step} value={val}
          aria-label={`${label} slider`} onChange={e=>commit(parseFloat(e.target.value))}
        />
        <span className="text-xs opacity-70">{Number(val).toFixed(decimals)}</span>
      </div>
      {err ? <p id={`${id}-err`} className="error mt-1">{err}</p> : <p id={`${id}-help`} className="helper mt-1">Range {min}–{max}, step {step}.</p>}
    </div>
  )
}
