import React from 'react';

export default function TheoryTab(){
  return (
    <div className="p-4 bg-card-light dark:bg-card-dark rounded-lg shadow soft">
      <h2 className="text-lg font-semibold mb-2">Theory</h2>
      <p className="text-sm leading-relaxed">
        Fluid mechanics studies the behavior of fluids in motion and at rest.
        Adjust parameters like flow velocity, viscosity and pipe diameter to see
        how velocity profiles and viscous effects change in real time.
      </p>
      <ul className="mt-4 list-disc list-inside space-y-1">
        <li><strong>Bernoulli's theorem:</strong> relation between pressure, velocity and height.</li>
        <li><strong>Reynolds number:</strong> indicates laminar vs turbulent regime.</li>
        <li><strong>Continuity equation:</strong> mass conservation (Q = V × A).</li>
      </ul>
    </div>
  )
}
