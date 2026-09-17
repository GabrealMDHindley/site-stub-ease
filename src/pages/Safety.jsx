import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import StatCounter from '../components/StatCounter.jsx'
import { submittals } from '../data/products.js'
import { settlements, oshaRecord, materials } from '../data/safety.js'

export default function Safety() {
  return (
    <>
      <PageHero
        eyebrow="Studies & Safety"
        title="The Data Behind the Danger"
        subtitle="This page documents the real-world hazard data that drove more than 20 years of product development — the settlement, the fines, the damage rates, and the code language that shaped Stub-EASE II™."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            <img src="https://stubease.pplx.app/images/hiw-rebar-deck-wide.jpg" alt="Multiple Stub-EASE II™ units installed across a high-rise rebar deck" className="hud-frame h-56 w-full border border-steel-line object-cover" />
            <img src="https://stubease.pplx.app/images/hiw-rebar-deck-mid.jpg" alt="Stub-EASE II™ system secured among rebar grid on active deck" className="hud-frame h-56 w-full border border-steel-line object-cover" />
            <img src="https://stubease.pplx.app/images/hiw-rebar-deck-close.jpg" alt="Close view of Stub-EASE II™ cap and Bend-EASE™ elbow installed between rebar" className="hud-frame h-56 w-full border border-steel-line object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="mt-8 text-center text-steel-soft">
            Conduit stub-ups are not treated as a serious jobsite hazard by most crews — until someone gets hurt.
            The numbers below are not projections. They are what actually happened on real concrete construction
            projects, and what NEC 300.15(F) and OSHA require as a result.
          </Reveal>
        </div>
      </section>

      {/* THE INCIDENT */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">The Incident</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              The $1.3 Million Settlement
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="hud-frame mt-8 border border-signal/40 bg-steel-panel/40 p-8 md:p-10">
            <div className="font-display text-4xl font-semibold text-signal">$1.3M+</div>
            <div className="mono-label mt-2 text-[10px] text-steel-soft">
              Litigation Settlement — University Center of Chicago, Turner Construction, 2002–2004
            </div>
            <p className="mt-6 italic text-steel-bright">
              "I was General Superintendent on the University Center of Chicago project for Turner Construction,
              between 2002 and 2004. A worker tripped on an unprotected conduit stub-up on the slab. It should
              never have happened, and I was responsible for that job site when it did."
            </p>
            <p className="mt-4 italic text-steel-bright">
              "The litigation that followed settled for over $1.3 million. That incident is the genesis of
              Stub-EASE™. I did not walk away from it and move on to the next job. I spent the next twenty years
              figuring out how to make sure it could never happen again."
            </p>
            <div className="mono-label mt-6 text-xs text-signal">
              — Jeff Krause, Founder & Director of Manufacturing and Product Development, CSUE Technologies
            </div>
          </Reveal>
        </div>
      </section>

      {/* OSHA */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Regulatory Exposure</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              OSHA Treats This as a Citable Violation
            </h2>
            <p className="mt-4 text-steel-soft">
              Unprotected conduit stub-ups on working walking surfaces are a recognized impalement hazard under
              OSHA's General Duty Clause, Section 5(a)(1) of the OSH Act of 1970. When a worker is exposed to
              stub-ups between nine and twelve inches above the finished concrete deck, the citation follows —
              regardless of how long the condition existed.
            </p>
            <p className="mt-4 text-steel-soft">
              In a documented high-rise construction inspection in Chicago, an electrical contractor was cited for
              a <strong className="text-steel-bright">Serious</strong> violation covering{' '}
              <strong className="text-signal">456 instances</strong> of impalement exposure across{' '}
              <strong className="text-steel-bright">50 workers</strong>. The initial penalty was{' '}
              <strong className="text-steel-bright">$4,000</strong>; it settled at{' '}
              <strong className="text-steel-bright">$2,400</strong> — but the abatement requirement and case record
              remain public and permanent.
            </p>
            <p className="mt-4 text-steel-soft">
              Stub-EASE II™ eliminates the cited condition before any worker sets foot on the slab. The Stub-EASE
              II™ cap is in place before the pour — so there is nothing left standing for OSHA to cite, and nothing
              left for a worker to be impaled on.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="hud-frame mt-10 border border-steel-line bg-void p-8">
            <div className="mono-label text-[10px] text-signal">Documented Chicago High-Rise Inspection</div>
            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <OshaStat label="Violation Type" value={oshaRecord.violationType} />
              <OshaStat label="Standard Cited" value={oshaRecord.standard} />
              <OshaStat label="Instances" value={oshaRecord.instances} accent />
              <OshaStat label="Workers Exposed" value={oshaRecord.workersExposed} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <OshaStat label="Initial Penalty" value={oshaRecord.initialPenalty} />
              <OshaStat label="Industry / Location" value={oshaRecord.industry} small />
            </div>
            <p className="mt-6 text-xs text-steel-soft">Source: {oshaRecord.source}</p>
          </Reveal>
        </div>
      </section>

      {/* SETTLEMENTS */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Documented Settlements</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              What Conduit Stub-Ups Actually Cost
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              Settlements and verdicts from documented conduit stub-up injury cases on commercial construction
              projects. These are public court records and law firm published outcomes — not estimates.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {settlements.map((s, i) => (
              <Reveal key={s.tag} delay={(i % 3) * 0.08} className="hud-frame border border-steel-line bg-steel-panel/40 p-6">
                <div className="font-display text-2xl font-semibold text-signal">{s.amount}</div>
                {s.note && <div className="mono-label mt-0.5 text-[10px] text-steel-soft">{s.note}</div>}
                <p className="mt-3 text-sm text-steel-soft">{s.body}</p>
                <div className="mono-label mt-4 text-[10px] text-steel-bright/70">{s.tag}</div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-8 text-xs text-steel-soft">
            Sources: StolzenbergCortelli LLP, Arye Lustig & Sassower P.C., Evan Hughes Law Firm, Grauer & Kriegel
            LLC, Modern Contractor Solutions (mcsmag.com). All settlements are public record or published case
            reports. Research compiled June 2026.
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <a
              href="https://stubease.pplx.app/documents/CSUE_StubEASE_Safety_Positioning.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="mono-label inline-block border border-signal px-6 py-3 text-xs text-signal hover:bg-signal hover:text-void"
            >
              Download Safety Positioning Sheet
            </a>
            <span className="ml-4 text-xs text-steel-soft">
              3-page PDF — OSHA framework, product claim, regulatory context. For specifiers, GCs, and ECs.
            </span>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTION IMPACT */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Production Impact</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              The Rework Nobody Budgets For
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal>
              <StatCounter value={35} suffix="%" label="Industry-Observed Damage Rate (30–40%)" />
              <p className="mt-4 text-sm text-steel-soft">
                Industry-observed damage rate on unprotected conduit stub-ups during power-trowel finishing. On a
                floor with 200 stub-ups, that is 60 to 80 conduits that need to be re-worked before an electrician
                can pull wire.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              {[
                'Core drill or chip out the damaged conduit from cured concrete',
                'Re-bend or fully replace the damaged conduit run',
                '3–6 hours of electrician labor, per stub-up, to make the repair',
                'Schedule disruption that ripples into every trade behind the repair crew',
              ].map((step, i) => (
                <div key={step} className="flex gap-4">
                  <div className="mono-label flex h-6 w-6 flex-shrink-0 items-center justify-center border border-signal text-[10px] text-signal">
                    {i + 1}
                  </div>
                  <p className="text-sm text-steel-soft">{step}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CODE LANGUAGE */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">NEC 300.15(F) / 300.17(F)</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              The Code Language That Governs This
            </h2>
            <p className="mt-4 text-steel-soft">
              NEC 300.15(F) requires that a fitting or connector be used wherever a conductor or cable exits a
              raceway. The Bend-EASE™ elbow satisfies this requirement as a transition fitting between metallic
              conduit systems embedded in concrete and PVC conduit systems, designed and tested to meet UL
              specifications.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="hud-frame mt-8 border border-steel-line bg-steel-panel/40 p-8">
            <h3 className="font-display text-lg font-semibold text-steel-bright">The Same Fitting. Any Raceway.</h3>
            <p className="mt-3 text-sm text-steel-soft">
              Bend-EASE™ is code-compliant with both metallic (EMT/RMC) and PVC below-slab raceways under NEC
              300.15(F) (2023 NEC) / NEC 300.17(F) (2026 NEC). No additional grounding measures are required beyond
              standard installation practice for the raceway type used. This was confirmed through independent NEC
              analysis — the elbow adds zero grounding burden in either configuration. One product spec covers the
              full range of below-slab raceway conditions on any project.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['EMT', 'RMC', 'PVC', 'Zero Added Grounding Burden'].map((tag) => (
                <span key={tag} className="mono-label border border-steel-line px-3 py-1.5 text-[10px] text-steel-soft">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Materials</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Built From Materials Chosen for the Jobsite
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              Every material in the Stub-EASE II™ system was selected for a specific job-site condition —
              visibility, flexibility under a trowel, or structural support during the pour.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {materials.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="hud-frame border border-steel-line bg-void p-8">
                <h3 className="font-display text-lg font-semibold text-steel-bright">{m.name}</h3>
                <ul className="mt-3 space-y-2 text-sm text-steel-soft">
                  {m.specs.map((s) => (
                    <li key={s}>— {s}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTATION */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Documentation</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Download the Submittal Package
            </h2>
            <p className="mt-4 text-steel-soft">
              Spec sheets, installation guides, and compliance documentation for Stub-EASE II™ — ready for your
              project file, design team, or safety submittal. No sign-up required.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-4">
            {submittals.slice(0, 3).map((doc) => (
              <a
                key={doc.title}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mono-label border border-signal px-6 py-3 text-xs text-signal hover:bg-signal hover:text-void"
              >
                {doc.title.replace(' — Rev B', '')}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-steel-line py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-semibold text-steel-bright md:text-4xl">
            See What Stub-Ups Are Costing Your Project
          </h2>
          <p className="mt-4 text-steel-soft">Calculate your exposure, then shop the system that eliminates it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/#roi-calculator" data-cursor-hover className="mono-label bg-signal px-7 py-4 text-xs text-void">
              Calculate Your Exposure
            </Link>
            <Link to="/products" data-cursor-hover className="mono-label border border-steel-line px-7 py-4 text-xs text-steel-bright hover:border-signal hover:text-signal">
              Shop Products
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function OshaStat({ label, value, accent, small }) {
  return (
    <div>
      <div className={`font-display ${small ? 'text-sm' : 'text-xl md:text-2xl'} font-semibold ${accent ? 'text-signal' : 'text-steel-bright'}`}>
        {value}
      </div>
      <div className="mono-label mt-1 text-[9px] text-steel-soft">{label}</div>
    </div>
  )
}
