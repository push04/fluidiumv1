
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as registry from '../experiments/registry';
const Ctx = createContext();
export function AppProvider({ children }){
  const [theme, setTheme] = useState(()=>localStorage.getItem('theme')||'light');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState('fluid2d');
  const [params, setParams] = useState(()=>registry.getDefaults('fluid2d'));
  const [data, setData] = useState([]);
  const [booting, setBooting] = useState(true);
  const canvasRef = useRef(null);
  useEffect(()=>{ const t=setTimeout(()=>setBooting(false),300); return ()=>clearTimeout(t); },[]);
  useEffect(()=>{ document.documentElement.classList.remove('light','dark'); document.documentElement.classList.add(theme); localStorage.setItem('theme', theme); },[theme]);
  useEffect(()=>{ setParams(registry.getDefaults(selectedExperiment)); setData([]); setIsRunning(false); },[selectedExperiment]);
  const updateParam = (k,v) => setParams(p=>({ ...p, [k]: v }));
  const addDataPoint = (pt) => setData(d => { const n=[...d,pt]; if(n.length>900) n.shift(); return n; });
  const value = useMemo(()=>({ theme,setTheme, isRunning,setIsRunning, selectedExperiment,setSelectedExperiment, params,updateParam, data,addDataPoint, canvasRef, booting }),[theme,isRunning,selectedExperiment,params,data,booting]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useApp = ()=>useContext(Ctx);
