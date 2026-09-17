import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import { metallicTransitionOptions } from '../data/products.js'

const faqs = [
  {
    q: 'Does it work with metallic conduit?',
    a: 'Yes. The type of conduit run in the slab determines the adapter requirement. If the below-slab run is metallic (EMT or RMC), PVC-to-EMT adapters are placed on the horizontal or in-slab portion of the conduit where it connects to the Bend-EASE™ elbow. If the below-slab run is PVC, no adapters are needed below the slab — the elbow glues directly. Above the slab, the contractor continues with either metallic or PVC as the job dictates. NEC 300.15(F) (2023 NEC) / NEC 300.17(F) (2026 NEC) specifically permits the metallic-to-PVC transition when an approved fitting is used — the Bend-EASE™ elbow was designed and tested to meet UL specifications for this transition in concrete construction.',
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
    q: 'What trade sizes are available?',
    a: '3/4" and 1" trade sizes. Heights of 8" and 12" above finished slab.',
  },
  {
    q: 'Does it require any special tools to install?',
    a: 'No special tools. Standard PVC glue for the elbow, fasteners for the stand, and an impact driver in reverse for extraction.',
  },
  {
    q: 'Can I use it on a slab-on-grade?',
    a: 'Yes, wherever conduit exits a concrete slab and creates a stub-up hazard on a working walking surface.',
  },
]

const extractionVideos = [
  { src: 'https://stubease.pplx.app/videos/seii-extraction-plexiglass.mov', label: 'Extraction demo — impact driver in reverse, spade bit matched to trade size. The full assembly pulls clean in seconds.' },
  { src: 'https://stubease.pplx.app/videos/SEII-Tassel-Flexing-Video.mp4', label: 'Cap flexes under trowel — talons spring back' },
  { src: 'https://stubease.pplx.app/videos/seii-walkaround-trowel.mp4', label: 'Walk-behind trowel pass — cap survives' },
  { src: 'https://stubease.pplx.app/videos/seii-hand-trowel.mp4', label: 'Hand trowel pass — talons visible after finish' },
  { src: 'https://stubease.pplx.app/videos/seii-powertrowel-schaumburg.mp4', label: 'Riding trowel — Schaumburg jobsite' },
]

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="Installation & Process"
        title="One Step in the Field. Zero Stub-Up Hazards."
        subtitle="Every Stub-EASE II™ kit ships from the manufacturer with the cap already threaded on. The only prefabrication required is setting the assembly to your exact slab elevation before it reaches the deck. Once it arrives, the field crew aligns the layout targets, screws it down in three locations, and walks away."
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

      {/* DECK PHOTOS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            <img src="https://stubease.pplx.app/images/hiw-rebar-deck-wide.jpg" alt="Multiple Stub-EASE II™ units installed across a high-rise rebar deck prior to concrete pour" className="hud-frame h-64 w-full border border-steel-line object-cover" />
            <img src="https://stubease.pplx.app/images/hiw-rebar-deck-mid.jpg" alt="Stub-EASE II™ system secured to rebar with Stand-EASE™ support visible among rebar grid" className="hud-frame h-64 w-full border border-steel-line object-cover" />
            <img src="https://stubease.pplx.app/images/hiw-rebar-deck-close.jpg" alt="Close view of Stub-EASE II™ cap and Bend-EASE™ elbow installed between rebar on active deck" className="hud-frame h-64 w-full border border-steel-line object-cover" />
          </Reveal>
          <p className="mt-4 text-center text-sm text-steel-soft">
            Stub-EASE II™ installed on an active high-rise deck — systems secured, caps on, ready for pour.
          </p>
        </div>
      </section>

      {/* THE SYSTEM STEPS */}
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
              <div className="mono-label text-[10px] text-signal">Pre-Fab — Before Deck Delivery</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-steel-bright">
                One Prefab Step. Kit Arrives Ready to Screw Down.
              </h3>
              <p className="mt-4 text-steel-soft">
                Every Stub-EASE II™ (convex cap with talons) kit ships from the manufacturer with the Stub-EASE II™
                cap already threaded onto the Bend-EASE™ elbow. The only prefabrication required before delivery to
                the deck is setting the assembly to the exact slab elevation. That step must be completed before
                the kit reaches the deck — where time is critical and no assembly work belongs.
              </p>
              <p className="mt-4 text-steel-soft">
                Kits must be pre-ordered with either an 8" or 12" Stand-EASE™ support. If the installed elevation
                varies from these two set points, measure the exact variance from deck height and cut the
                Stand-EASE™ support from the top down by that amount. In this way, the click-lock always aligns
                with the top detent on the Stand-EASE™. Once cut to the correct elevation, insert the Bend-EASE™
                elbow into the Stand-EASE™ support and click it into the detent. The assembly is now set to your
                exact slab depth and ready to secure.
              </p>
              <p className="mt-4 text-steel-soft">
                Using your choice of doubled tie wire or stainless steel straps, bond the Bend-EASE™ to the
                Stand-EASE™ support at this time. The photo below shows tie wire as a reference for method — this
                is the standard practice used throughout the rebar deck. Stainless steel straps are an alternate
                means and methods. Once secured, the kit is ready to ship to the deck.
              </p>
              <img
                src="https://www.stubease.com/images/prefab-tie-wire-deck.jpg"
                alt="Stub-EASE II™ with tie wire wrapped at collar flanges on active rebar deck"
                className="mt-6 w-full rounded-sm border border-steel-line object-cover"
              />
              <p className="mt-2 text-xs italic text-steel-soft">
                Standard tie wire method shown. Stainless steel straps are an alternate means and methods.
                (Suggested alternate securing method: personal research recommended.)
              </p>
            </Reveal>

            <Reveal delay={0.08} className="hud-frame border border-steel-line bg-steel-panel/40 p-8 md:p-10">
              <div className="mono-label text-[10px] text-signal">Field — One Step</div>
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
              <div className="mono-label mt-4 text-[10px] text-steel-soft">
                One Step. Done. · Installation video in production — available soon.
              </div>
            </Reveal>

            <Reveal delay={0.16} className="hud-frame border border-steel-line bg-steel-panel/40 p-8 md:p-10">
              <div className="mono-label text-[10px] text-signal">Extraction</div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-steel-bright">
                Spade Bit. Impact Driver in Reverse. That Is It.
              </h3>
              <p className="mt-4 text-steel-soft">
                After the concrete has cured: match the spade bit to your trade size — 3/4" pipe takes a 3/4" spade
                bit, 1" pipe takes a 1" spade bit. Insert the tip into the engineered guide strip depressed into
                the center of the convex cap. Run the impact driver in reverse. The cap threads itself out cleanly
                in seconds.
              </p>
              <p className="mt-4 text-steel-soft">
                What is left behind is a conduit interior that is completely clean and ready for wire pull — on
                every stub-up, every floor. No prying, no cutting, no chipping, no rework.
              </p>
              <div className="mono-label mt-4 text-[10px] text-signal">Under 60 Seconds Per Stub-Up</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CODE COMPLIANCE */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Code Compliance</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Why NEC 300.15(F) / 300.17(F) Matters Here
            </h2>
            <p className="mt-4 text-steel-soft">
              <strong className="text-steel-bright">NEC 300.15(F) / 300.17(F)</strong> requires that a fitting or
              connector be used wherever a conductor or cable exits a raceway. In concrete construction, that
              requirement becomes critical at exactly the point where horizontal conduit turns vertical and stubs
              up through the slab.
            </p>
            <p className="mt-4 text-steel-soft">
              This is also the point where jobs frequently need to transition from metallic conduit embedded in the
              structure to PVC conduit above it. NEC 300.15(F) permits that metallic-to-PVC transition when an
              approved fitting is used. The Bend-EASE™ elbow was designed and tested to meet UL specifications for
              use as a transition fitting between metallic and PVC conduit systems in concrete construction per NEC
              300.15(F) (2023 NEC) / NEC 300.17(F) (2026 NEC). That means the transition point in the Stub-EASE II™
              system is not an afterthought — it is the reason the elbow exists.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="hud-frame mt-8 border border-steel-line bg-void p-8">
            <h3 className="font-display text-lg font-semibold text-steel-bright">
              Code-Compliant with Both Metallic and PVC Raceways
            </h3>
            <p className="mt-3 text-sm text-steel-soft">
              Whether the below-slab conduit run is metallic (EMT or RMC) or PVC, the Bend-EASE™ elbow is the
              approved transition fitting under NEC 300.15(F) / 300.17(F) for either path. In a metallic run, the
              conduit itself is the equipment grounding conductor — the Bend-EASE™ elbow embedded in concrete adds
              no grounding obligation. In a PVC run, an equipment grounding conductor inside the conduit was
              already required before the elbow is even in the picture. Either way, the Bend-EASE™ elbow adds zero
              grounding burden. One product. Any raceway. No exceptions, no workarounds.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <h3 className="font-display text-lg font-semibold text-steel-bright">
              Raceway in the Slab Determines the Adapter Requirement
            </h3>
            <p className="mt-3 text-sm text-steel-soft">
              The type of conduit run <em>in the slab</em> — not what continues above it — drives whether
              transition adapters are needed. If the below-slab run is metallic (EMT or RMC), PVC-to-EMT adapters
              are placed on the horizontal or in-slab portion of the conduit where it connects to the Bend-EASE™
              elbow. If the below-slab run is PVC, no adapters are needed below the slab — the elbow glues
              directly. Above the slab, the contractor continues with either metallic or PVC as the job dictates.
              Two field-proven methods are available when continuing metallic above the slab, both compliant with
              NEC 300.15(F) (2023 NEC) / NEC 300.17(F) (2026 NEC):
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {metallicTransitionOptions.map((opt) => (
                <div key={opt.title} className="hud-frame border border-steel-line bg-steel-panel/40 p-6">
                  <div className="mono-label text-[10px] text-signal">{opt.label}</div>
                  <h4 className="mt-2 font-display text-base font-semibold text-steel-bright">{opt.title}</h4>
                  <p className="mt-2 text-sm text-steel-soft">{opt.body}</p>
                  {opt.skus && <p className="mono-label mt-3 text-[10px] text-steel-soft">{opt.skus}</p>}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-steel-soft">
              Both methods meet NEC requirements provided no conductors are spliced or terminated inside the
              fitting.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="hud-frame mt-8 border border-signal/40 bg-void p-6">
            <div className="mono-label text-[10px] text-signal">NEC 300.15(F) / 300.17(F)</div>
            <p className="mt-2 text-sm italic text-steel-bright">
              "A fitting or connector shall be used wherever a conductor or cable exits a raceway..." — applied at
              the metallic-to-PVC transition point in concrete construction.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WITHOUT PROTECTION */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Without Protection</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              What Happens on a Slab With No Protection
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
              <h3 className="font-display text-lg font-semibold text-steel-bright">Power Trowel Damage</h3>
              <p className="mt-3 text-sm text-steel-soft">
                Unprotected stub-ups sit directly in the path of power-trowel blades during slab finishing.
                Industry data shows 30–40% of exposed conduit is bent, crushed, or destroyed during this single
                finishing pass — conduit that then has to be cut out, re-run, and re-pulled.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
              <h3 className="font-display text-lg font-semibold text-steel-bright">
                Trip Hazards on Working Walking Surfaces
              </h3>
              <p className="mt-3 text-sm text-steel-soft">
                Every open stub-up left standing on working walking surfaces is a trip hazard for every trade that
                crosses that floor afterward — framers, mechanical, drywall crews, inspectors. It only takes one
                fall to turn a punch-list item into a lawsuit.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEE IT IN ACTION */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">See It in Action</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Watch the Full System Installed and Extracted
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              From horizontal run to clean, wire-ready conduit — Stub-EASE II™ installed, poured over, and
              extracted in the field.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {extractionVideos.map((v, i) => (
              <Reveal key={v.src} delay={(i % 2) * 0.1} className="hud-frame overflow-hidden border border-steel-line bg-void">
                <video src={v.src} controls muted playsInline className="w-full" />
                <p className="p-4 text-xs text-steel-soft">{v.label}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="hud-frame mt-6 overflow-hidden border border-steel-line">
            <img
              src="https://stubease.pplx.app/images/seii-talons-finished-slab.jpg"
              alt="Finished concrete slab close-up — orange Stub-EASE II™ talons visible above the surface"
              className="w-full object-cover"
            />
            <p className="p-4 text-sm text-steel-soft">Orange talons visible at grade — post-trowel finish</p>
          </Reveal>

          <p className="mono-label mt-6 text-center text-[11px] text-steel-soft">
            Extraction: impact driver in REVERSE · Spade bit matched to trade size (3/4" pipe → 3/4" bit · 1" pipe →
            1" bit)
          </p>
        </div>
      </section>

      {/* CROSS-SECTION REFERENCE */}
      <section className="border-t border-steel-line py-20">
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
              alt="Stub-EASE™ system cross-section diagram"
              className="w-full object-contain p-4"
            />
          </Reveal>
          <p className="mt-4 text-xs text-steel-soft">
            All threads NPT type. Extraction uses a standard spade bit matched to trade size — 3/4" pipe uses 3/4"
            bit, 1" pipe uses 1" bit. Impact driver in reverse.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Questions</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Frequently Asked Installation Questions
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-steel-line py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-semibold text-steel-bright md:text-4xl">
            Ready to Put This System on Your Next Pour?
          </h2>
          <p className="mt-4 text-steel-soft">Order product, or reach out directly to Jeff Krause at CSUE Technologies.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/products" data-cursor-hover className="mono-label bg-signal px-7 py-4 text-xs text-void">
              Shop Products
            </Link>
            <Link to="/contact" data-cursor-hover className="mono-label border border-steel-line px-7 py-4 text-xs text-steel-bright hover:border-signal hover:text-signal">
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
