'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const [paper, setPaper] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const editorial = document.getElementById('system-map')
      setPaper(Boolean(editorial && editorial.getBoundingClientRect().top <= 74))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header className={`site-header ${paper ? 'site-header--paper' : ''}`}>
      <a className="brand-lockup" href="#top" aria-label="Celesnity home">
        <span className="brand-mark">
          <Image className="brand-mark-white" src="/brand/orbit-white.png" alt="" width={40} height={40} priority />
          <Image className="brand-mark-ink" src="/brand/orbit-ink.png" alt="" width={40} height={40} priority />
        </span>
        <span>CELESNITY</span>
      </a>

      <a className="header-cta" href="#contact">See Minder <span aria-hidden="true">↗</span></a>
    </header>
  )
}
