import Image from 'next/image'
import { HeroSequence } from '@/components/hero-sequence'
import { HardwareOrbitMark } from '@/components/hardware-orbit-mark'
import { HardwareSequenceMotion } from '@/components/hardware-sequence-motion'
import { MinderSystemMap } from '@/components/minder-system-map'
import { MotionProvider } from '@/components/motion-provider'
import { SiteHeader } from '@/components/site-header'
import { contactMailto, landingContent } from '@/content/site'

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

            <div className="scenario" data-reveal>
              <div className="scenario-statement">
                <p className="utility-label">ONE SHARED EVENT LOG</p>
                <h3>From floor signal<br />to approved action.</h3>
                <p>Worker input, machine state, action and outcome stay connected.</p>
              </div>
              <ol className="scenario-steps">
                {landingContent.scenario.map((step) => (
                  <li key={step.title}>
                    <span>{step.index}</span>
                    <div><strong>{step.title}</strong><p>{step.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="platform-capabilities">
              <p className="utility-label" data-reveal>PLATFORM / ONE SYSTEM</p>
              <div className="capability-rail" data-reveal aria-label="Minder platform capabilities">
                {landingContent.capabilities.map((capability) => (
                  <span key={capability.title}>{capability.title}</span>
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
              <p>Building the evidence for an industrial world model.</p>
            </div>

            <div className="research-chain" data-reveal aria-label="World model learning sequence">
              {landingContent.research.map((step) => (
                <div key={step.title}>
                  <span>{step.index}</span>
                  <strong>{step.title}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trust" className="trust-strip">
          <div className="site-frame trust-strip-inner" data-reveal>
            <div>
              <p className="utility-label">04 / HUMAN CONTROL</p>
              <h2>Evidence before action.<br /><em>People remain in control.</em></h2>
            </div>
            <div className="trust-rail" aria-label="Trust principles">
              {landingContent.trust.map((item) => (
                <span key={item.title}>{item.title}</span>
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
