
import React from 'react';
export default function Tooltip({ text, id }){
  return (
    <span className="ml-2 inline-flex items-center" role="img" aria-label={`Info: ${text}`} title={text} id={id}>
      <i className="fas fa-circle-info" aria-hidden="true"></i>
      <span className="sr-only">{text}</span>
    </span>
  )
}
