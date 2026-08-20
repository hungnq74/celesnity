'use client'

import { useState } from 'react'
import { landingContent } from '@/content/site'

export function CapabilitySystem() {
  const [active, setActive] = useState(1)
  const capability = landingContent.capabilities[active]

  return (
    <div className="capability-system">
      <div className="capability-grid">
        {landingContent.capabilities.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={active === index ? 'is-active' : ''}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span>{item.index}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </button>
        ))}
      </div>
      <aside className="capability-lens" aria-live="polite">
        <div className="lens-orbits" aria-hidden="true"><i /><i /><i /></div>
        <span className="utility-label">ONE SYSTEM / EIGHT LENSES</span>
        <b>{capability.index}</b>
        <h3>{capability.title}</h3>
        <p>{capability.body}</p>
      </aside>
    </div>
  )
}
