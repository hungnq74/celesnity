import { buildContactMailto } from '@/lib/mailto'

export type HeroBeat = {
  id: 'origin' | 'drift' | 'alignment'
  label: string
  title: string
  body?: string
  artwork: string
  cta?: { label: string; href: string }
}

export type ProductLayer = { title: string; body: string; index: string }
export type OperatingStep = { title: string; body: string; index: string }
export type Capability = { title: string; body: string; index: string }
export type ResearchStep = { title: string; index: string }
export type ResearchShowcase = {
  title: string
  body: string
  index: string
  tags: readonly string[]
  artwork: string
}
export type Partner = { name: string; href: string; slug: string }
export type SystemMapContent = {
  audience: readonly string[]
  floor: readonly string[]
  hardware: readonly string[]
  platform: readonly { label: string; items: readonly string[] }[]
  research: readonly string[]
}

export type LandingContent = {
  nav: readonly { label: string; href: string }[]
  hero: readonly HeroBeat[]
  layers: readonly ProductLayer[]
  systemMap: SystemMapContent
  scenario: readonly OperatingStep[]
  capabilities: readonly Capability[]
  research: readonly ResearchStep[]
  researchShowcase: readonly ResearchShowcase[]
  partners: readonly Partner[]
}

export const sectionIds = ['system-map', 'platform', 'hardware', 'research', 'network', 'contact'] as const

export const landingContent: LandingContent = {
  nav: [
    { label: 'Platform', href: '#platform' },
    { label: 'Hardware', href: '#hardware' },
    { label: 'Research', href: '#research' },
  ],
  hero: [
    {
      id: 'origin',
      label: 'CELESNITY / INDUSTRIAL INTELLIGENCE',
      title: 'Industrial intelligence for the physical world.',
      body: 'Every factory is full of signals. Minder turns them into shared direction.',
      artwork: '/artwork-blueprint/hero-industrial-robot.png',
      cta: { label: 'See Minder on your floor', href: '#contact' },
    },
    {
      id: 'drift',
      label: 'THE OPERATION / AS IT IS',
      title: 'The signal is everywhere. The context is nowhere.',
      body: 'Critical knowledge is scattered across software, documents and human memory.',
      artwork: '/artwork-blueprint/story-origin.webp',
    },
    {
      id: 'alignment',
      label: 'THE MINDER SYSTEM',
      title: 'How Minder is built.',
      artwork: '/artwork-blueprint/story-alignment.webp',
    },
  ],
  layers: [
    { index: '01', title: 'Minder Platform', body: 'Shared operating context.' },
    { index: '02', title: 'Minder Hardware', body: 'Voice, vision and machine signals.' },
    { index: '03', title: 'Minder Research', body: 'Action-outcome world model.' },
  ],
  systemMap: {
    audience: ['Workers', 'Managers', 'Engineers'],
    floor: ['People', 'Machines', 'Materials', 'Environment'],
    hardware: ['Voice', 'Vision', 'Sensors', 'Edge'],
    platform: [
      { label: 'Surfaces', items: ['Worker assistant', 'Operations console'] },
      { label: 'Operating context', items: ['Shared event log', 'Operational graph'] },
      { label: 'Governed agent loop', items: ['Observe', 'Reason', 'Propose', 'Approve'] },
    ],
    research: ['Action–outcome evidence', 'Edge models', 'World model programme'],
  },
  scenario: [
    { index: '01', title: 'Observe', body: 'A signal appears.' },
    { index: '02', title: 'Decide', body: 'Minder connects the evidence.' },
    { index: '03', title: 'Act', body: 'People approve. The system learns.' },
  ],
  capabilities: [
    { index: '01', title: 'Plan', body: 'Sequence around constraints.' },
    { index: '02', title: 'Produce', body: 'Guide and capture work.' },
    { index: '03', title: 'Move', body: 'Coordinate every handoff.' },
    { index: '04', title: 'Maintain', body: 'Prepare the right intervention.' },
    { index: '05', title: 'Inspect', body: 'Connect defects to causes.' },
    { index: '06', title: 'Monitor', body: 'Make live conditions legible.' },
    { index: '07', title: 'Protect', body: 'Preserve boundaries and approval.' },
    { index: '08', title: 'Optimize', body: 'Learn what improves outcomes.' },
  ],
  research: [
    { index: '01', title: 'Events' },
    { index: '02', title: 'Decisions' },
    { index: '03', title: 'Outcomes' },
    { index: '04', title: 'World model' },
  ],
  researchShowcase: [
    {
      index: '01 / SIGNALS',
      title: 'Signal ledger',
      body: 'Learning how machine state, material movement and worker input become one reliable event stream.',
      tags: ['Edge models', 'Event log'],
      artwork: '/artwork-blueprint/research-signal-ledger.webp',
    },
    {
      index: '02 / DECISIONS',
      title: 'Decision field',
      body: 'Tracing how evidence becomes a proposed action, an approval and a result people can inspect.',
      tags: ['Human control', 'Causal evidence'],
      artwork: '/artwork-blueprint/research-decision-field.webp',
    },
    {
      index: '03 / OUTCOMES',
      title: 'World model',
      body: 'Connecting actions to outcomes across the floor so every intervention makes the next one sharper.',
      tags: ['Action–outcome', 'Industrial graph'],
      artwork: '/artwork-blueprint/research-world-model.webp',
    },
  ],
  partners: [
    { name: 'SIHUB', href: 'https://www.sihub.gov.vn/', slug: 'sihub' },
    { name: 'HUEIDS', href: 'https://hueids.vn/', slug: 'hueids' },
    { name: 'Silicon Valley Fellowship', href: 'https://www.siliconvalleyfellowship.com/', slug: 'svf' },
    { name: 'NVIDIA Inception', href: 'https://www.nvidia.com/en-us/startups/', slug: 'nvidia' },
    { name: 'Barclays Eagle Labs', href: 'https://labs.uk.barclays/', slug: 'barclays' },
    { name: 'NatWest Accelerator', href: 'https://www.natwest.com/business/business-services/entrepreneur-accelerator.html', slug: 'natwest' },
  ],
}

export const contactMailto = buildContactMailto()
