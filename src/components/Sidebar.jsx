import React from 'react';

const topics = [
  { id: 'bernoulli', title: "Bernoulli's Theorem" },
  { id: 'venturi', title: 'Venturi Meter' },
  { id: 'orifice', title: 'Orifice Flow' },
  { id: 'reynolds', title: 'Reynolds Number' },
  { id: 'notch', title: 'Notch / Weir Flow' },
  { id: 'hagen', title: 'Hagen–Poiseuille Law' },
  { id: 'pitot', title: 'Pitot Tube' },
  { id: 'drag', title: 'Drag & Lift' },
  { id: 'pressure', title: 'Pressure Distribution' },
  { id: 'jump', title: 'Hydraulic Jump' }
];

export default function Sidebar(){
  return (
    <aside className="w-64 hidden lg:block border-r border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
      <nav className="p-4 space-y-2">
        {topics.map(topic => (
          <a key={topic.id} href={`#${topic.id}`} className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white/10">
            {topic.title}
          </a>
        ))}
      </nav>
    </aside>
  )
}
