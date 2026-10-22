import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'

// Install-relevant subset of the FAQ list on /how-it-works — same source of
// truth, just the questions a customer standing in front of an open box
// actually has (no sales/spec-writer questions here).
const faqs = [
  {
    q: 'Does it require any special tools to install?',
    a: 'No special tools. Standard PVC glue for the elbow, fasteners for the stand, and an impact driver in reverse for extraction.',
  },
  {
    q: 'What happens during power-trowel finishing?',
    a: 'The Stub-EASE II™ cap is made from Shore A 45 TPR — flexible enough to deflect under the trowel blade rather than catch or break. The geometry is specifically engineered for this.',
  },
  {
    q: 'How fast is extraction?',
    a: 'Under 60 seconds per stub-up with a standard impact driver. Insert the spade bit tip into the cap, run the driver in reverse, and the cap threads out.',
  },
  {
    q: 'Can I use it on a slab-on-grade?',
    a: 'Yes, wherever conduit exits a concrete slab and creates a stub-up hazard on a working walking surface.',
  },
]

export default function InstallSE2() {
  return (
    <>
      <PageHero
        eyebrow="Your Order Has Arrived"
        title="Thank You — Here's How to Install Your Stub-EASE II™ System"
        subtitle="You're looking at the exact system in the box your crew just opened. Watch the full walkthrough below, then follow the same three-step guide — prefab, deck, and extraction — with photos at every stage."
      />

      {/* FEATURED FULL INSTALLATION VIDEO */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Watch It Installed</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              The Full Installation, Start to Finish
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              One continuous walkthrough — prefab, deck placement, and the finished result. No cuts, no staging.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="hud-frame mt-8 overflow-hidden border border-signal/30 bg-black shadow-signal">
            <video
              src="/videos/stub-ease-installation.mp4"
              controls
              playsInline
              preload="metadata"
              className="block w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* THE 3-STEP SYSTEM — written instructions with photos */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">The System</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Prefab Before Delivery. One Field Step. Done.
            </h2>
            <p className="mt-4 text-steel-soft">
              The Stub-EASE II™ system was engineered so all assembly happens before the kit reaches the deck — the
              field crew has one step. No special tools. No complex assembly on the deck. Align, screw down, walk
              away.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            <Reveal className="hud-frame border border-steel-line bg-steel-panel/40 p-8 md:p-10">
              <div className="mono-label text-[10px] text-signal">Step 1 — Pre-Fab, Before Deck Delivery</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-steel-bright">
                One Prefab Step. Kit Arrives Ready to Screw Down.
              </h3>
              <p className="mt-4 text-steel-soft">
                Every Stub-EASE II™ kit ships from the manufacturer with the Stub-EASE II™ cap already threaded onto
                the Bend-EASE™ elbow. The only prefabrication required before delivery to the deck is setting the
                assembly to the exact slab elevation. That step must be completed before the kit reaches the deck —
                where time is critical and no assembly work belongs.
              </p>
              <p className="mt-4 text-steel-soft">
                Kits must be pre-ordered with either an 8" or 12" Stand-EASE™ support. If the installed elevation
                varies from these two set points, measure the exact variance from deck height and cut the
                Stand-EASE™ support from the top down by that amount. In this way, the click-lock always aligns with
                the top detent on the Stand-EASE™. Once cut to the correct elevation, insert the Bend-EASE™ elbow
                into the Stand-EASE™ support and click it into the detent. The assembly is now set to your exact
                slab depth and ready to secure.
              </p>
              <p className="mt-4 text-steel-soft">
                Using your choice of doubled tie wire or stainless steel straps, bond the Bend-EASE™ to the
                Stand-EASE™ support at this time. Stainless steel straps are an alternate means and methods. Once
                secured, the kit is ready to ship to the deck.
              </p>
              <img
                src="https://stubease.pplx.app/images/hiw-rebar-deck-mid.jpg"
                alt="Stub-EASE II™ system secured to rebar with Stand-EASE™ support visible among rebar grid"
                className="mt-6 w-full rounded-sm border border-steel-line object-cover"
              />
            </Reveal>

            <Reveal delay={0.08} className="hud-frame border border-steel-line bg-steel-panel/40 p-8 md:p-10">
              <div className="mono-label text-[10px] text-signal">Step 2 — Field, One Step</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-steel-bright">
                Align the Layout Targets. Screw It Down. Walk Away.
              </h3>
              <p className="mt-4 text-steel-soft">
                Once deck layout is done, the field crew aligns the trade-size markings molded into the Stand-EASE™
                pedestal with the deck layout — 3/4" center line or 1" center line. Fasten the pedestal in three
                locations. The back leg is built into the Stand-EASE™ for additional stability; no extra hardware
                needed.
              </p>
              <p className="mt-4 text-steel-soft">
                That is the installation. One step. Walk away and come back when you are framing the walls.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-steel-soft">
                <li>— Pedestal alignment targets are molded in for 3/4" and 1" trade sizes</li>
                <li>— Three fastener points plus built-in back leg</li>
                <li>— No special tools — only what is already on the truck</li>
              </ul>
              <img
                src="https://stubease.pplx.app/images/hiw-rebar-deck-wide.jpg"
                alt="Multiple Stub-EASE II™ units installed across a high-rise rebar deck prior to concrete pour"
                className="mt-6 w-full rounded-sm border border-steel-line object-cover"
              />
            </Reveal>

            <Reveal delay={0.16} className="hud-frame border border-steel-line bg-steel-panel/40 p-8 md:p-10">
              <div className="mono-label text-[10px] text-signal">Step 3 — Extraction, After the Pour</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-steel-bright">
                Spade Bit. Impact Driver in Reverse. That Is It.
              </h3>
              <p className="mt-4 text-steel-soft">
                After the concrete has cured: match the spade bit to your trade size — 3/4" pipe takes a 3/4" spade
                bit, 1" pipe takes a 1" spade bit. Insert the tip into the engineered guide strip depressed into the
                center of the convex cap. Run the impact driver in reverse. The cap threads itself out cleanly in
                seconds.
              </p>
              <p className="mt-4 text-steel-soft">
                What is left behind is a conduit interior that is completely clean and ready for wire pull — on
                every stub-up, every floor. No prying, no cutting, no chipping, no rework.
              </p>
              <img
                src="https://stubease.pplx.app/images/seii-talons-finished-slab.jpg"
                alt="Finished concrete slab close-up — orange Stub-EASE II™ talons visible above the surface"
                className="mt-6 w-full rounded-sm border border-steel-line object-cover"
              />
              <div className="mono-label mt-4 text-[10px] text-signal">Under 60 Seconds Per Stub-Up</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CROSS-SECTION REFERENCE */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Visual Reference</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              System Cross-Section Reference
            </h2>
            <p className="mt-4 text-steel-soft">
              Full system assembly illustrated in cross-section — from horizontal conduit run through the deck to
              wire-pull-ready sleeve above slab.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="hud-frame mt-8 overflow-hidden border border-steel-line bg-steel-panel">
            <img
              src="https://stubease.pplx.app/images/stub-ease-install-chart.jpg"
              alt="Stub-EASE® system cross-section diagram"
              className="w-full object-contain p-4"
            />
          </Reveal>
        </div>
      </section>

      {/* DOWNLOADABLE GUIDE */}
      <section className="border-t border-steel-line py-16">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="hud-frame flex flex-col items-start justify-between gap-6 border border-steel-line bg-steel-panel/40 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <div className="mono-label text-[10px] text-signal">Keep It on Site</div>
              <h3 className="mt-2 font-display text-xl font-semibold text-steel-bright">
                Download the Full Installation Guide (PDF)
              </h3>
              <p className="mt-2 max-w-xl text-sm text-steel-soft">
                Installation sequence, pour procedure, power-trowel compatibility, and extraction instructions — in
                a printable sheet for the deck.
              </p>
            </div>
            <a
              href="https://stubease.pplx.app/documents/CSUE_StubEASE_Install_Guide.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="mono-label flex-shrink-0 bg-signal px-7 py-4 text-xs text-void transition-transform hover:scale-[1.03]"
            >
              Download PDF Guide
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Questions</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Common Installation Questions
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="border-t border-steel-line py-24">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Questions About Your Installation?
            </h2>
            <p className="mt-4 text-steel-soft">
              Reach out directly to Jeff Krause, Founder & Director of Manufacturing and Product Development at
              CSUE Technologies. Response within one business day — typically same day.
            </p>
            <a
              href="mailto:info@stubease.com"
              data-cursor-hover
              className="mt-4 block font-mono text-signal hover:underline"
            >
              info@stubease.com
            </a>
            <p className="mono-label mt-2 text-[10px] text-steel-soft">Mon–Fri, 8:00 AM – 5:00 PM CT</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" data-cursor-hover className="mono-label bg-signal px-7 py-4 text-xs text-void">
                Contact Us
              </Link>
              <Link
                to="/products"
                data-cursor-hover
                className="mono-label border border-steel-line px-7 py-4 text-xs text-steel-bright hover:border-signal hover:text-signal"
              >
                Order Another Kit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
