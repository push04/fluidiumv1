
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as registry from '../experiments/registry';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'));
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState('reynolds'); // default
  const [parameters, setParameters] = useState(() => registry.getDefaults('reynolds'));
  const [data, setData] = useState([]);

  useEffect(() => { const t = setTimeout(()=>setIsBooting(false), 600); return () => clearTimeout(t); }, []);
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // When experiment changes, reset params/data
  useEffect(() => {
    setParameters(registry.getDefaults(selectedExperiment));
    setData([]);
    setIsRunning(false);
  }, [selectedExperiment]);

  const toggleTheme = () => setTheme(p => (p === 'light' ? 'dark' : 'light'));
  const updateParameter = (name, value) => setParameters(prev => ({ ...prev, [name]: value }));
  const startSimulation = () => { setIsRunning(true); setData([]); };
  const pauseSimulation = () => setIsRunning(false);
  const resetSimulation = () => { setIsRunning(false); setData([]); };

  const addDataPoint = (point) => setData(prev => [...prev, point]);

  const value = useMemo(() => ({
    isBooting, theme, toggleTheme,
    isRunning, startSimulation, pauseSimulation, resetSimulation,
    selectedExperiment, setSelectedExperiment,
    parameters, updateParameter,
    data, addDataPoint
  }), [isBooting, theme, isRunning, selectedExperiment, parameters, data]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
