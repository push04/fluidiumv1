
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext();
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }){
  const [items, setItems] = useState([]);
  const push = useCallback((msg, type='info') => {
    const id = Math.random().toString(36).slice(2);
    setItems(list => [...list, { id, msg, type }]);
    setTimeout(() => setItems(list => list.filter(it => it.id !== id)), 2000);
  }, []);
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed bottom-4 right-4 space-y-2 z-50">
        {items.map(it => (
          <div key={it.id} className="card px-3 py-2 text-sm">{it.msg}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
