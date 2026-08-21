'use client'

import { useEffect } from 'react'

const canAnimate = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function MotionProvider() {
  useEffect(() => {
    if (!canAnimate()) return

    const root = document.documentElement
    root.classList.add('motion-ready')

    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    reveals.forEach((node) => observer.observe(node))

    const desktop = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches
    let disposed = false
    let cleanupLenis: (() => void) | undefined

    if (desktop) {
      void (async () => {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (disposed) return
        gsap.registerPlugin(ScrollTrigger)
        const lenis = new Lenis({
          lerp: 0.07,
          wheelMultiplier: 0.92,
          smoothWheel: true,
          syncTouch: false,
          autoRaf: false,
        })
        const raf = (time: number) => lenis.raf(time * 1000)
        const refresh = () => lenis.resize()
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)
        ScrollTrigger.addEventListener('refresh', refresh)

        const onAnchor = (event: MouseEvent) => {
          const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
          if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) return
          const target = document.querySelector<HTMLElement>(anchor.getAttribute('href') ?? '')
          if (!target) return
          event.preventDefault()
          lenis.scrollTo(target, { offset: -72, duration: 1.1 })
          history.replaceState(null, '', anchor.hash)
        }
        document.addEventListener('click', onAnchor)
        ScrollTrigger.refresh()
        cleanupLenis = () => {
          document.removeEventListener('click', onAnchor)
          ScrollTrigger.removeEventListener('refresh', refresh)
          gsap.ticker.remove(raf)
          lenis.destroy()
        }
      })()
    }

    return () => {
      disposed = true
      observer.disconnect()
      cleanupLenis?.()
      root.classList.remove('motion-ready')
    }
  }, [])

  return null
}
