'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import { landingContent } from '@/content/site'

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cleanup: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const frames = section.querySelectorAll<HTMLElement>('[data-hero-frame]')
      const beats = section.querySelectorAll<HTMLElement>('[data-hero-copy]')
      gsap.set(frames, { scale: 1.035 })
      gsap.set(frames[0], { opacity: 1, scale: 1 })
      gsap.set([frames[1], frames[2]], { opacity: 0 })
      gsap.set(beats[0], { opacity: 1, y: 0 })
      gsap.set([beats[1], beats[2]], { opacity: 0, y: 28 })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onLeave: () => gsap.set(beats[2], { opacity: 1, y: 0 }),
        },
      })
      timeline
        .to(beats[0], { opacity: 0, y: -20, duration: 0.07 }, 0.2)
        .to(frames[1], { opacity: 1, scale: 1, duration: 0.12 }, 0.2)
        .to(frames[0], { scale: 1.06, duration: 0.32 }, 0.2)
        .to(beats[1], { opacity: 1, y: 0, duration: 0.08 }, 0.3)
        .to(beats[1], { opacity: 0, y: -20, duration: 0.07 }, 0.49)
        .to(frames[2], { opacity: 1, scale: 1, duration: 0.12 }, 0.5)
        .to(frames[1], { scale: 1.055, duration: 0.28 }, 0.5)
        .to(beats[2], { opacity: 1, y: 0, duration: 0.08 }, 0.6)
        .to({}, { duration: 0.32 }, 0.68)

      cleanup = () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })()

    const pointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      section.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
      section.style.setProperty('--pointer-y', `${event.clientY}px`)
    }
    if (window.matchMedia('(pointer: fine)').matches) section.addEventListener('pointermove', pointer, { passive: true })

    return () => {
      cancelled = true
      cleanup?.()
      section.removeEventListener('pointermove', pointer)
    }
  }, [])

  return (
    <section ref={sectionRef} id="top" className="hero-sequence" aria-label="Celesnity introduction">
      <div className="hero-stage">
        <div className="hero-art" aria-hidden="true">
          {landingContent.hero.map((beat, index) => (
            <div key={beat.id} data-hero-frame className="hero-frame">
              <Image
                src={beat.artwork}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className="hero-image"
              />
            </div>
          ))}
          <div className="hero-scrim" />
          <div className="hero-glow" />
          <div className="hero-grain" />
        </div>

        <div className="hero-content site-frame">
          {landingContent.hero.map((beat) => (
            <article key={beat.id} data-hero-beat className={`hero-beat hero-beat--${beat.id}`}>
              <div data-hero-copy className="hero-beat-copy">
                <p className="utility-label utility-label--light">{beat.label}</p>
                <h1>{beat.title}</h1>
                {beat.signals && (
                  <div className="signal-list" aria-label="Factory signals">
                    {beat.signals.map((signal) => <span key={signal}>{signal}</span>)}
                  </div>
                )}
                {beat.body && <p className="hero-support">{beat.body}</p>}
                {beat.id === 'alignment' && (
                  <div className="hero-layer-overview" aria-label="Minder system overview">
                    {landingContent.layers.map((layer) => (
                      <div key={layer.title}>
                        <span>{layer.index}</span>
                        <strong>{layer.title}</strong>
                        <small>{layer.body}</small>
                      </div>
                    ))}
                  </div>
                )}
                {beat.cta && <a className="button button--light" href={beat.cta.href}>{beat.cta.label}<span aria-hidden="true">↘</span></a>}
              </div>
            </article>
          ))}
        </div>
        <div className="hero-index utility-label utility-label--light" aria-hidden="true">01—03 / SCROLL TO ALIGN</div>
      </div>
    </section>
  )
}
