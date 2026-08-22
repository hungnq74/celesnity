'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function IntroSequence() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    document.documentElement.classList.add('intro-active')
    const exitTimer = window.setTimeout(() => setExiting(true), 1900)
    const closeTimer = window.setTimeout(() => {
      setVisible(false)
      document.documentElement.classList.remove('intro-active')
    }, 2900)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(closeTimer)
      document.documentElement.classList.remove('intro-active')
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`intro-sequence ${exiting ? 'is-exiting' : ''}`} aria-hidden="true">
      <Image
        className="intro-sequence-art"
        src="/artwork-blueprint/intro-field-natural.webp"
        alt=""
        fill
        sizes="100vw"
        preload
      />
      <div className="intro-sequence-wash" />
      <div className="intro-sequence-grain" />
      <div className="intro-sequence-orbit" />
      <div className="intro-sequence-mark">
        <Image src="/brand/orbit-white.png" alt="" width={84} height={84} loading="eager" />
        <span>CELESNITY</span>
      </div>
    </div>
  )
}
