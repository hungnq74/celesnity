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
          start: desktop ? 'top 14%' : 'top 78%',
          end: desktop ? '+=1180' : 'bottom 34%',
          // Keep the artwork tied closely to the user's scroll. A long numeric
          // scrub makes a fast wheel gesture land on the blend frame for too long.
          scrub: 0.45,
          anticipatePin: desktop ? 1 : 0,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .addLabel('sensor', 0)
        // Let the user read the original hardware image before anything moves.
        .to({}, { duration: 0.62 })
        // Sovereign-style handoff: the first image dissolves before the new
        // artwork takes over, with a short overlap so there is no hard cut.
        .to(sensorArtwork, { autoAlpha: 0, duration: 0.42 }, 0.62)
        .to(rings, { autoAlpha: 0, duration: 0.34 }, 0.72)
        .to(signals, { autoAlpha: 0, duration: 0.34 }, 0.72)
        .to(orbitArtwork, { autoAlpha: 1, duration: 0.52 }, 0.82)
        .addLabel('orbit', 1.34)
        // Hold the completed state long enough to understand the result
        // before ScrollTrigger releases the pinned scene.
        .to(mark, { autoAlpha: 1, scale: 1, rotation: 0, x: 0, y: 0, duration: 0.42 }, 1.34)
        .to({}, { duration: 0.64 })

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
