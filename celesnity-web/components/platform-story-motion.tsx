'use client'

import { useEffect } from 'react'

const stageReadouts = [
  { title: 'Signal detected', detail: 'MACHINE STATE / 07:42:19' },
  { title: 'Context resolved', detail: 'EVIDENCE GRAPH / 04 SOURCES' },
  { title: 'Decision recorded', detail: 'HUMAN APPROVAL / TRACEABLE' },
]

export function PlatformStoryMotion() {
  useEffect(() => {
    const story = document.querySelector<HTMLElement>('[data-platform-story]')
    if (!story) return

    const readoutTitle = story.querySelector<HTMLElement>('[data-platform-readout-title]')
    const readoutDetail = story.querySelector<HTMLElement>('[data-platform-readout-detail]')
    let activeStage = -1
    let frame = 0

    const setStage = (nextStage: number) => {
      if (nextStage === activeStage) return
      activeStage = nextStage
      story.dataset.stage = String(nextStage)
      if (readoutTitle) readoutTitle.textContent = stageReadouts[nextStage]?.title ?? stageReadouts[0].title
      if (readoutDetail) readoutDetail.textContent = stageReadouts[nextStage]?.detail ?? stageReadouts[0].detail
    }

    const update = () => {
      frame = 0
      const rect = story.getBoundingClientRect()
      const travel = Math.max(1, rect.height - window.innerHeight * 0.42)
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.58 - rect.top) / travel))
      const stage = Math.min(2, Math.floor(progress * 3))
      story.style.setProperty('--story-progress', progress.toFixed(3))
      story.style.setProperty('--story-beam', (0.5 + progress * 0.5).toFixed(3))
      story.style.setProperty('--story-position', `${(8 + progress * 84).toFixed(2)}%`)
      setStage(stage)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const onResize = () => update()

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
