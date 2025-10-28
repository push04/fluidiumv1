
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error){ return { hasError: true, error }; }
  componentDidCatch(error, info){ console.error('Fluidium error:', error, info); }
  render(){
    if (this.state.hasError){
      return (
        <div role="alert" className="p-4 card">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="helper">Please try resetting the experiment or reloading the page.</p>
          <pre className="text-xs mt-2 bg-black/20 p-2 rounded">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
