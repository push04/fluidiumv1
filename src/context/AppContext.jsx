import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'));
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({ flowVelocity: 1.0, viscosity: 1.0, pipeDiameter: 1.0 });
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => (p === 'light' ? 'dark' : 'light'));
  const updateParameter = (name, value) => setParameters(prev => ({ ...prev, [name]: value }));

  const startSimulation = () => { setIsRunning(true); setData([]); setChartData([]); };
  const pauseSimulation = () => setIsRunning(false);
  const resetSimulation = () => { setIsRunning(false); setData([]); setChartData([]); };

  const addDataPoint = (point) => { setData(prev => [...prev, point]); setChartData(prev => [...prev, { ...point }]); };

  const value = { theme, toggleTheme, isRunning, startSimulation, pauseSimulation, resetSimulation, parameters, updateParameter, data, chartData, addDataPoint };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
