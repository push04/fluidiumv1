
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as registry from '../experiments/registry';

const MAX_POINTS = 900;
const AppContext = createContext();

function sanitizePresets(obj){
  const cleaned = {};
  const bad = /(test|audit|dev|tmp)/i;
  for (const [k,v] of Object.entries(obj||{})){
    if (bad.test(k)) continue; // drop noisy presets
    cleaned[k] = v;
  }
  return cleaned;
}

export const AppProvider = ({ children }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'));
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState('fluid_gl');
  const [parameters, setParameters] = useState(() => registry.getDefaults('fluid_gl'));
  const [data, setData] = useState([]);
  const [ui, setUi] = useState({ showSidebar: true, showOnboard: true, error: null });
  const presetsKey = 'fluidium-presets-v4';
  const [presets, setPresets] = useState(() => sanitizePresets(JSON.parse(localStorage.getItem(presetsKey) || '{}')));
  const canvasRef = useRef(null);

  useEffect(() => { const t = setTimeout(()=>setIsBooting(false), 600); return () => clearTimeout(t); }, []);
  useEffect(() => { document.documentElement.classList.remove('light','dark'); document.documentElement.classList.add(theme); localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { setParameters(registry.getDefaults(selectedExperiment)); setData([]); setIsRunning(false); }, [selectedExperiment]);

  const toggleTheme = () => setTheme(p => (p==='light'?'dark':'light'));
  const updateParameter = (name, value) => setParameters(prev => ({ ...prev, [name]: value }));
  const startSimulation = () => { setIsRunning(true); setData([]); setUi(u=>({...u, error:null})); };
  const pauseSimulation = () => setIsRunning(false);
  const resetSimulation = () => { setIsRunning(false); setData([]); setUi(u=>({...u, error:null})); };
  const addDataPoint = (point) => setData(prev => { const next=[...prev, point]; if (next.length>MAX_POINTS) next.splice(0, next.length-MAX_POINTS); return next; });
  const savePreset = (name) => {
    const safe = name.trim().replace(/[_\s]+/g,' ').replace(/[^\w\s-]/g,'').replace(/\s+/g,' ');
    const key = `${selectedExperiment}:${safe}`;
    const next={...presets,[key]:parameters}; setPresets(next); localStorage.setItem(presetsKey, JSON.stringify(next));
  };
  const loadPreset = (name) => { const key = `${selectedExperiment}:${name}`; if (presets[key]) setParameters(presets[key]); };
  const deletePreset = (name) => { const key = `${selectedExperiment}:${name}`; const next={...presets}; delete next[key]; setPresets(next); localStorage.setItem(presetsKey, JSON.stringify(next)); };

  const value = useMemo(() => ({
    isBooting, theme, toggleTheme,
    isRunning, startSimulation, pauseSimulation, resetSimulation,
    selectedExperiment, setSelectedExperiment,
    parameters, updateParameter,
    data, addDataPoint,
    presets, savePreset, loadPreset, deletePreset,
    canvasRef, ui, setUi
  }), [isBooting, theme, isRunning, selectedExperiment, parameters, data, presets, ui]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
