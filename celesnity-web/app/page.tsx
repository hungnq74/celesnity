import Image from 'next/image'
import { HeroSequence } from '@/components/hero-sequence'
import { HardwareOrbitMark } from '@/components/hardware-orbit-mark'
import { HardwareSequenceMotion } from '@/components/hardware-sequence-motion'
import { MinderSystemMap } from '@/components/minder-system-map'
import { MotionProvider } from '@/components/motion-provider'
import { PlatformStoryMotion } from '@/components/platform-story-motion'
import { SiteHeader } from '@/components/site-header'
import { contactMailto, landingContent } from '@/content/site'

const platformPhases = [
  { index: '01', title: 'Prepare', body: 'See the constraints.', items: landingContent.capabilities.slice(0, 2) },
  { index: '02', title: 'Perform', body: 'Make the handoff legible.', items: landingContent.capabilities.slice(2, 5) },
  { index: '03', title: 'Learn', body: 'Turn outcomes into leverage.', items: landingContent.capabilities.slice(5) },
] as const

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <MotionProvider />
      <SiteHeader />
      <main id="main">
        <HeroSequence />
        <MinderSystemMap />

        <section id="platform" className="editorial-section platform-section section-pad">
          <div className="site-frame">
            <div className="product-heading product-heading--paper" data-reveal>
              <p className="utility-label">01 / PRODUCT</p>
              <h2>Minder <em>Platform</em></h2>
              <p>One shared context across people, work, materials, machines and outcomes.</p>
            </div>

            <div className="platform-story" data-platform-story data-stage="0">
              <PlatformStoryMotion />
              <div className="platform-story-intro" data-reveal>
                <p className="utility-label">ONE SHARED EVENT LOG / LIVE</p>
                <h3>The floor<br /><em>speaks in events.</em></h3>
                <p>Minder gathers the signal, keeps the context, and gives people a next move they can trust.</p>
              </div>
              <div className="platform-field" data-reveal aria-label="Minder event field">
                <div className="platform-field-grid" />
                <div className="platform-field-contours platform-field-contours--one" />
                <div className="platform-field-contours platform-field-contours--two" />
                <div className="platform-field-axis platform-field-axis--horizontal" />
                <div className="platform-field-axis platform-field-axis--vertical" />
                <div className="platform-field-beam" />
                <div className="platform-field-signal"><i /></div>
                <div className="platform-field-readout" aria-live="polite">
                  <span>LIVE EVENT / 01</span>
                  <strong data-platform-readout-title>Signal detected</strong>
                  <small data-platform-readout-detail>MACHINE STATE / 07:42:19</small>
                </div>
                <div className="platform-field-legend">
                  <span><i className="platform-dot platform-dot--blue" />source</span>
                  <span><i className="platform-dot platform-dot--orange" />decision</span>
                </div>
              </div>
            </div>

            <div className="platform-spectrum" data-reveal>
              <div className="platform-spectrum-intro">
                <p className="utility-label">PLATFORM / OPERATING SPECTRUM</p>
                <h3>One system.<br /><em>Every handoff.</em></h3>
                <p>From the first constraint to the last outcome, Minder keeps work moving through one shared context.</p>
              </div>
              <div className="spectrum-map" aria-label="Minder operating spectrum">
                <div className="spectrum-map-axis"><span>INPUT</span><i /><span>OUTCOME</span></div>
                {platformPhases.map((phase) => (
                  <section className={`spectrum-phase spectrum-phase--${phase.title.toLowerCase()}`} key={phase.title}>
                    <div className="spectrum-phase-heading">
                      <span>{phase.index}</span>
                      <div><strong>{phase.title}</strong><small>{phase.body}</small></div>
                    </div>
                    <div className="spectrum-phase-items">
                      {phase.items.map((capability) => (
                        <button type="button" key={capability.title} className="spectrum-item">
                          <span>{capability.index}</span>
                          <strong>{capability.title}</strong>
                          <small>{capability.body}</small>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="hardware" className="hardware-section dark-section section-pad hardware-sequence-section">
          <div className="site-frame">
            <div className="product-heading product-heading--dark" data-reveal>
              <p className="utility-label utility-label--lime">02 / INTERFACE</p>
              <h2>Minder <em>Hardware</em></h2>
              <p>Voice, vision, sensors and machine signals from every point of work.</p>
            </div>
            <div className="hardware-body">
              <div className="hardware-copy" data-reveal>
                <p>AI reaches the floor through the tools already in workers’ hands and the machines already in production.</p>
                <small>Existing devices first. Purpose-built hardware where the floor needs it.</small>
              </div>
              <div className="hardware-visual" data-reveal aria-hidden="true">
                <Image
                  src="/artwork-blueprint/hardware-sensor-field.png"
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 58vw"
                  className="hardware-artwork hardware-artwork--sensor"
                />
                <Image
                  src="/artwork-blueprint/hardware-orbit-field.png"
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 58vw"
                  className="hardware-artwork hardware-artwork--orbit"
                />
                <div className="hardware-ring hardware-ring--outer" />
                <div className="hardware-ring hardware-ring--middle" />
                <HardwareOrbitMark />
                <span className="hardware-signal hardware-signal--voice">VOICE</span>
                <span className="hardware-signal hardware-signal--vision">VISION</span>
                <span className="hardware-signal hardware-signal--edge">EDGE</span>
              </div>
            </div>
          </div>
          <HardwareSequenceMotion />
        </section>

        <section id="research" className="research-section section-pad">
          <div className="site-frame">
            <div className="product-heading product-heading--paper" data-reveal>
              <p className="utility-label">03 / RESEARCH PROGRAMME</p>
              <h2>Minder <em>Research</em></h2>
              <p>Building the evidence for an industrial world model — from signal to decision to outcome.</p>
            </div>

            <div className="research-showcase" aria-label="Minder Research work">
              {landingContent.researchShowcase.map((item) => (
                <article className="research-card" key={item.title} data-reveal>
                  <div className="research-card-media">
                    <Image
                      src={item.artwork}
                      alt=""
                      fill
                      sizes="(max-width: 820px) 100vw, 33vw"
                    />
                    <div className="research-card-wash" />
                    <span className="research-card-index">{item.index}</span>
                  </div>
                  <div className="research-card-caption">
                    <div className="research-card-tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <a href="#contact">Explore <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="network" className="partner-section">
          <div className="site-frame">
            <p className="utility-label" data-reveal>CELESNITY / STRATEGIC NETWORK</p>
            <div className="partner-wall" data-reveal>
              {landingContent.partners.map((partner) => (
                <a
                  key={partner.name}
                  className={`partner-mark partner-mark--${partner.slug}`}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${partner.name} website`}
                >
                  <span>{partner.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="final-cta">
          <Image src="/artwork/alignment.png" alt="" fill sizes="100vw" className="final-art" />
          <div className="final-overlay" />
          <div className="final-grain" />
          <div className="site-frame final-content" data-reveal>
            <p className="utility-label utility-label--light">BEGIN / WITH ONE OPERATION</p>
            <h2>Start with<br /><em>one operation.</em></h2>
            <p>Bring us a real production problem. We’ll show you what Minder can see.</p>
            <div className="final-actions">
              <a className="button button--light" href={contactMailto}>See Minder on your floor <span aria-hidden="true">↗</span></a>
              <a className="text-link" href={contactMailto}>Talk to Celesnity <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-frame footer-grid">
          <div>
            <a className="brand-lockup brand-lockup--footer" href="#top" aria-label="Celesnity home">
              <Image src="/brand/orbit-ink.png" alt="" width={34} height={34} />
              <span>CELESNITY</span>
            </a>
            <p>Industrial intelligence for the physical world.</p>
          </div>
          <nav aria-label="Footer navigation">
            {landingContent.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="footer-contact">
            <span className="utility-label">START A CONVERSATION</span>
            <a href={contactMailto}>start@celesnity.com</a>
          </div>
          <p className="footer-legal">© {new Date().getFullYear()} Celesnity. Human control, by design.</p>
        </div>
      </footer>
    </>
  )
}
