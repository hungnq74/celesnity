import { describe, expect, it } from 'vitest'
import { contactMailto, landingContent, sectionIds } from '@/content/site'
import { buildContactMailto } from '@/lib/mailto'

describe('public landing content', () => {
  it('keeps every section id unique', () => {
    expect(new Set(sectionIds).size).toBe(sectionIds.length)
  })

  it('ships the complete hero, product layers, and capability system', () => {
    expect(landingContent.hero.map((beat) => beat.id)).toEqual(['origin', 'drift', 'alignment'])
    expect(landingContent.layers.map((item) => item.title)).toEqual([
      'Minder Platform', 'Minder Hardware', 'Minder Research',
    ])
    expect(landingContent.systemMap.hardware).toEqual(['Voice', 'Vision', 'Sensors', 'Edge'])
    expect(landingContent.systemMap.platform.map((item) => item.label)).toEqual([
      'Surfaces', 'Operating context', 'Governed agent loop',
    ])
    expect(landingContent.systemMap.research.at(-1)).toBe('World model programme')
    expect(landingContent.capabilities.map((item) => item.title)).toEqual([
      'Plan', 'Produce', 'Move', 'Maintain', 'Inspect', 'Monitor', 'Protect', 'Optimize',
    ])
    expect(landingContent.scenario.map((item) => item.title)).toEqual(['Observe', 'Decide', 'Act'])
    expect(landingContent.research.map((item) => item.title)).toEqual([
      'Events', 'Decisions', 'Outcomes', 'World model',
    ])
    expect(landingContent.partners.map((item) => item.name)).toEqual([
      'SIHUB', 'HUEIDS', 'Silicon Valley Fellowship', 'NVIDIA Inception',
      'Barclays Eagle Labs', 'NatWest Accelerator',
    ])
    expect(landingContent.research.at(-1)?.title).toBe('World model')
  })

  it('builds the approved contact destination', () => {
    expect(buildContactMailto()).toBe('mailto:start@celesnity.com?subject=See%20Minder%20on%20our%20floor')
    expect(contactMailto).toBe(buildContactMailto())
  })
})
