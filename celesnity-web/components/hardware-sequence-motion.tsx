'use client'

import { useLayoutEffect } from 'react'

export function HardwareSequenceMotion() {
  useLayoutEffect(() => {
    const section = document.querySelector<HTMLElement>('#hardware')
    const body = section?.querySelector<HTMLElement>('.hardware-body')
    const visual = section?.querySelector<HTMLElement>('.hardware-visual')
    if (!section || !body || !visual) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const sensorArtwork = visual.querySelector<HTMLElement>('.hardware-artwork--sensor')
      const orbitArtwork = visual.querySelector<HTMLElement>('.hardware-artwork--orbit')
      const rings = visual.querySelectorAll<HTMLElement>('.hardware-ring')
      const signals = visual.querySelectorAll<HTMLElement>('.hardware-signal')
      const mark = visual.querySelector<HTMLElement>('.hardware-orbit-mark')
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const setFinalState = () => {
        gsap.set(sensorArtwork, { autoAlpha: 0 })
        gsap.set(orbitArtwork, { autoAlpha: 1 })
        gsap.set(rings, { autoAlpha: 0 })
        gsap.set(signals, { autoAlpha: 0 })
        gsap.set(mark, { autoAlpha: 1, scale: 1, rotation: 0, x: 0, y: 0 })
      }

      if (reducedMotion) {
        setFinalState()
        return
      }

      gsap.set(sensorArtwork, { autoAlpha: 1 })
      gsap.set(orbitArtwork, { autoAlpha: 0 })
      gsap.set(rings, { autoAlpha: 1 })
      gsap.set(signals, { autoAlpha: 1 })
      gsap.set(mark, { autoAlpha: 0, scale: 0.54, rotation: -12, x: -32, y: 18 })

      const desktop = window.matchMedia('(min-width: 821px) and (pointer: fine)').matches
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: body,
          pin: desktop ? body : false,
          start: desktop ? 'top 12%' : 'top 78%',
          end: desktop ? '+=1350' : 'bottom 34%',
          scrub: 1.05,
          anticipatePin: desktop ? 1 : 0,
          invalidateOnRefresh: true,
          snap: desktop ? {
            snapTo: 'labels',
            duration: { min: 0.45, max: 1.25 },
            delay: 0.18,
            ease: 'power2.inOut',
          } : undefined,
        },
      })

      timeline
        .addLabel('sensor', 0)
        .to({}, { duration: 0.55 })
        .to(sensorArtwork, { autoAlpha: 0, duration: 0.5 }, 0.55)
        .to(rings, { autoAlpha: 0, duration: 0.42 }, 0.66)
        .to(signals, { autoAlpha: 0, duration: 0.42 }, 0.66)
        .to(orbitArtwork, { autoAlpha: 1, duration: 0.72 }, 0.72)
        .addLabel('orbit', 1.44)
        .to(mark, { autoAlpha: 1, scale: 1, rotation: 0, x: 0, y: 0, duration: 0.56 }, 1.44)
        .to({}, { duration: 0.45 })

      cleanup = () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return null
}
