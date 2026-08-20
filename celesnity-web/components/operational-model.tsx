'use client'

import { useState } from 'react'

const stages = [
  { label: 'Events', note: 'What the floor produces' },
  { label: 'Operational graph', note: 'What it means together' },
  { label: 'Reasoning', note: 'What the evidence supports' },
  { label: 'Human approval', note: 'What authority allows' },
  { label: 'Action', note: 'What moves next' },
] as const

export function OperationalModel() {
  const [active, setActive] = useState(1)
  return (
    <div className="model" data-reveal>
      <div className="model-field" aria-label="Operational intelligence flow">
        <svg className="model-lines" viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 140 C180 140 210 140 280 140 S410 140 480 140 S610 140 680 140 S810 140 900 140" />
          <path className="model-line-live" d="M100 140 C180 140 210 140 280 140 S410 140 480 140 S610 140 680 140 S810 140 900 140" />
        </svg>
        {stages.map((stage, index) => (
          <button
            key={stage.label}
            type="button"
            className={`model-node model-node--${index + 1} ${active === index ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{stage.label}</strong>
          </button>
        ))}
        <div className="model-pulse" aria-hidden="true" />
      </div>
      <div className="model-readout" aria-live="polite">
        <span className="utility-label">ACTIVE LAYER / {String(active + 1).padStart(2, '0')}</span>
        <strong>{stages[active].label}</strong>
        <p>{stages[active].note}</p>
      </div>
      <div className="adapter-rail">
        <span>MES</span><span>SCADA</span><span>CMMS</span><span>WMS</span><span>QMS</span><span>ERP</span><span>Documents</span>
        <p>Connected adapters seed and enrich the living context.</p>
      </div>
    </div>
  )
}
