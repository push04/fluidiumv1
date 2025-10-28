
import React from 'react';

export default function PresetPickerCard({ meta, onApply }){
  return (
    <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="font-semibold">{meta.title}</div>
      <div className="helper mb-2">{meta.desc}</div>
      <button className="btn btn-ghost touch-target" onClick={onApply} aria-label={`Apply ${meta.title}`}>Apply</button>
    </div>
  )
}
