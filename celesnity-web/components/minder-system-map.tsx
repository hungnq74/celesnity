import { landingContent } from '@/content/site'

export function MinderSystemMap() {
  const map = landingContent.systemMap

  return (
    <section id="system-map" className="system-map-section section-pad" aria-labelledby="system-map-title">
      <div className="site-frame">
        <header className="system-map-heading" data-reveal>
          <p className="utility-label">THE MINDER SYSTEM / END TO END</p>
          <div>
            <h2 id="system-map-title">One governed loop.</h2>
            <p>From physical signal to approved action—and every measured outcome back into learning.</p>
          </div>
        </header>

        <div className="system-map" data-reveal>
          <div className="system-map-audience">
            <span className="system-map-kicker">PEOPLE IN CONTROL</span>
            <div>
              {map.audience.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>

          <div className="system-map-core">
            <article className="system-map-node system-map-node--hardware">
              <div className="system-map-node-head">
                <span>01 / OBSERVE</span>
                <strong>Minder Hardware</strong>
              </div>
              <p>Presence on the floor.</p>
              <ul>
                {map.hardware.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="system-map-connector system-map-connector--events" aria-label="Live events move from Minder Hardware to Minder Platform; approved actions return to the floor.">
              <span>LIVE EVENTS</span>
              <i aria-hidden="true" />
              <span>APPROVED ACTIONS</span>
            </div>

            <article className="system-map-node system-map-node--platform">
              <div className="system-map-node-head">
                <span>02 / COORDINATE</span>
                <strong>Minder Platform</strong>
              </div>
              <p>One shared operating context.</p>
              <div className="system-map-platform-layers">
                {map.platform.map((layer) => (
                  <div key={layer.label}>
                    <span>{layer.label}</span>
                    <p>{layer.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
              <div className="system-map-approval"><i aria-hidden="true" /> Human approval</div>
            </article>

            <div className="system-map-connector system-map-connector--learning" aria-label="Action-outcome evidence moves from Minder Platform to Minder Research; validated models return to Minder Platform.">
              <span>OUTCOME EVIDENCE</span>
              <i aria-hidden="true" />
              <span>VALIDATED MODELS</span>
            </div>

            <article className="system-map-node system-map-node--research">
              <div className="system-map-node-head">
                <span>03 / LEARN</span>
                <strong>Minder Research</strong>
              </div>
              <p>Learn from measured results.</p>
              <ul>
                {map.research.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>

          <div className="system-map-floor">
            <div className="system-map-floor-label">
              <span className="system-map-kicker">THE PHYSICAL OPERATION</span>
              <small>Where every loop begins—and proves itself.</small>
            </div>
            <div className="system-map-floor-grid">
              {map.floor.map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
              ))}
            </div>
          </div>

          <div className="system-map-loop" aria-label="System loop: observe, understand, approve, act, learn">
            {['Observe', 'Understand', 'Approve', 'Act', 'Learn'].map((item, index) => (
              <span key={item}>{item}{index < 4 && <i aria-hidden="true">→</i>}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
