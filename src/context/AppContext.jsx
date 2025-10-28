
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as registry from '../experiments/registry';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'));
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState('reynolds');
  const [parameters, setParameters] = useState(() => registry.getDefaults('reynolds'));
  const [data, setData] = useState([]);
  const [presets, setPresets] = useState(() => JSON.parse(localStorage.getItem('fluidium-presets') || '{}'));
  const canvasRef = useRef(null);

  useEffect(() => { const t = setTimeout(()=>setIsBooting(false), 600); return () => clearTimeout(t); }, []);
  useEffect(() => {
    document.documentElement.classList.remove('light','dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setParameters(registry.getDefaults(selectedExperiment));
    setData([]);
    setIsRunning(false);
  }, [selectedExperiment]);

  const toggleTheme = () => setTheme(p => (p==='light'?'dark':'light'));
  const updateParameter = (name, value) => setParameters(prev => ({ ...prev, [name]: value }));
  const startSimulation = () => { setIsRunning(true); setData([]); };
  const pauseSimulation = () => setIsRunning(false);
  const resetSimulation = () => { setIsRunning(false); setData([]); };

  const addDataPoint = (point) => setData(prev => [...prev, point]);

  const savePreset = (name) => {
    const key = `${selectedExperiment}:${name}`;
    const next = { ...presets, [key]: parameters };
    setPresets(next);
    localStorage.setItem('fluidium-presets', JSON.stringify(next));
  };
  const loadPreset = (name) => {
    const key = `${selectedExperiment}:${name}`;
    if (presets[key]) setParameters(presets[key]);
  };
  const deletePreset = (name) => {
    const key = `${selectedExperiment}:${name}`;
    const next = { ...presets }; delete next[key];
    setPresets(next);
    localStorage.setItem('fluidium-presets', JSON.stringify(next));
  };

  const value = useMemo(() => ({
    isBooting, theme, toggleTheme,
    isRunning, startSimulation, pauseSimulation, resetSimulation,
    selectedExperiment, setSelectedExperiment,
    parameters, updateParameter,
    data, addDataPoint,
    presets, savePreset, loadPreset, deletePreset,
    canvasRef
  }), [isBooting, theme, isRunning, selectedExperiment, parameters, data, presets]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
