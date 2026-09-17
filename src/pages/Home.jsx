import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import StatCounter from '../components/StatCounter.jsx'
import ExplodedAssembly from '../components/ExplodedAssembly.jsx'
import ROICalculator from '../components/ROICalculator.jsx'
import RoleTabs from '../components/RoleTabs.jsx'
import VideoModal from '../components/VideoModal.jsx'
import { products } from '../data/products.js'
import { testimonials, founderQuote } from '../data/testimonials.js'

export default function Home() {
  const heroRef = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.72, 0.95])
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden md:h-[100svh]">
        <motion.div style={{ y: heroImgY, scale: heroImgScale }} className="absolute inset-0">
          <img
            src="https://stubease.pplx.app/images/rebar-deck-hero.jpg"
            alt="Stub-EASE II™ systems installed and secured across an active high-rise rebar deck, caps on, ready for concrete pour"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-void/55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="bp-grid absolute inset-0 opacity-30" />

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative flex flex-col px-6 pb-16 pt-28 md:mx-auto md:h-full md:max-w-7xl md:justify-end md:px-10 md:pb-32 md:pt-0"
        >
          <div className="mono-label mb-6 flex w-full items-center justify-center gap-2 border border-signal/50 bg-void/70 px-3 py-2 text-center text-[9px] leading-relaxed text-signal backdrop-blur-sm sm:w-fit sm:justify-start sm:py-1.5 sm:text-[10px]">
            <span className="hidden h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal shadow-signal sm:inline-block" />
            NEC 300.15(F) / 300.17(F) Compliant — Metallic &amp; PVC
          </div>

          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-steel-bright drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl">
            The Total Solution to <span className="text-signal text-glow">Eliminate Conduit Stub-Ups</span>
          </h1>

          <p className="mt-6 max-w-xl text-steel-bright/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] md:text-lg">
            A complete system. Single-step install. Single-step extraction. No projections above the slab —
            superior concrete finishes, free and clear working walking surfaces, and no remedial work to regain
            damaged or lost raceways.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              data-cursor-hover
              className="mono-label bg-signal px-7 py-4 text-xs text-void transition-transform hover:scale-[1.03]"
            >
              Shop Products
            </Link>
            <a
              href="#roi-calculator"
              data-cursor-hover
              className="mono-label border border-steel-bright/40 bg-void/30 px-7 py-4 text-xs text-steel-bright backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
            >
              Calculate Your Savings
            </a>
            <button
              data-cursor-hover
              onClick={() => setVideoOpen(true)}
              className="group mono-label flex items-center gap-3 border border-steel-bright/40 bg-void/30 py-4 pl-4 pr-6 text-xs text-steel-bright backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-current">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-2.5 w-2.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Installation Video
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-steel-bright/20 pt-8 md:grid-cols-4">
            <HeroStat value="$1.3M+" label="Single Settlement" />
            <HeroStat value="40%" label="Conduit Damaged Per Floor" />
            <HeroStat value="$165K+" label="OSHA Fine (Single Incident)" />
            <HeroStat value="NEC" label="300.15(F) / 300.17(F)" />
          </div>
        </motion.div>
      </section>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src="/videos/stub-ease-installation.mp4"
        title="Stub-EASE II™ — Full Installation"
      />

      {/* COMPLIANCE STRIP */}
      <section className="border-b border-steel-line bg-steel-panel py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-steel-soft md:px-10">
          Designed and tested to meet UL specifications for use as a transition fitting between metallic and PVC
          conduit systems in concrete construction per NEC 300.15(F) (2023 NEC) / NEC 300.17(F) (2026 NEC).
          Compatible with both metallic (EMT/RMC) and PVC below-slab raceways — no additional grounding burden in
          either configuration.
        </div>
      </section>

      {/* EXPLODED ASSEMBLY — signature moment */}
      <ExplodedAssembly />

      {/* TOTAL SOLUTION COPY */}
      <section className="border-t border-steel-line py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Engineered as the total solution — not just a collection of parts.
            </h2>
          </Reveal>
          <Reveal delay={0.1} direction="left">
            <p className="text-steel-soft">
              Every component was designed to integrate together, providing a concrete-tight transition from the
              in-slab raceway to the weather-tight access point at grade level. After the pour, it protects the
              raceway from environmental exposure and construction debris until the conduit is extended to the
              device it serves. The real benefit lies in what it doesn't do — from the inception of this product
              line, the goal has always been the elimination of the conduit stub-up. Complete elimination, or
              nothing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mono-label text-xs text-signal">The Product Line</div>
              <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
                Every Component, Cleanly Listed.
              </h2>
            </div>
            <Link to="/products" data-cursor-hover className="mono-label text-xs text-signal hover:underline">
              View All Products →
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/products/${p.slug}`} data-cursor-hover className="group hud-frame block border border-steel-line bg-void">
                  <div className="aspect-[4/3] overflow-hidden bg-steel-panel">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mono-label text-[10px] text-signal">{p.statusLabel}</div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-steel-bright">{p.name}</h3>
                    <p className="mt-2 text-sm text-steel-soft">{p.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COST OF DOING NOTHING */}
      <section className="border-t border-steel-line py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">The Real Cost of Doing Nothing</div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Conduit Stub-Ups Are Not a Minor Nuisance. They Are a Documented Liability.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <StatCounter value={1.3} prefix="$" suffix="M+" decimals={1} label="Single Settlement" />
            <StatCounter value={165514} prefix="$" label="OSHA Fine — Single Incident" />
            <StatCounter value={40} suffix="%" label="Conduit Damaged Per Floor" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <p className="text-sm text-steel-soft md:col-span-1">
              Single settlement from a conduit trip-and-fall on a high-rise construction site. Jeff Krause, then
              General Superintendent, witnessed this firsthand at University Center of Chicago (Turner
              Construction, 2002–2004). That incident launched 20+ years of product development.
            </p>
            <p className="text-sm text-steel-soft md:col-span-1">
              OSHA fine assessed in a single conduit-related incident. Tripping hazards on working walking
              surfaces are OSHA 1926.502 violations. The citation is automatic once a worker is injured on an
              unprotected stub-up.
            </p>
            <p className="text-sm text-steel-soft md:col-span-1">
              Industry-observed rate of conduit damaged, bent, or destroyed by power-trowel operations during slab
              finishing. On a 200-stub-up floor, that's 60 to 80 conduits that need to be cut, re-worked, and
              re-pulled by electricians — at your cost.
            </p>
          </div>

          <Reveal className="hud-frame mt-14 border border-steel-line bg-steel-panel/60 p-8 md:p-10">
            <p className="font-display text-xl italic text-steel-bright md:text-2xl">"{founderQuote.quote}"</p>
            <div className="mono-label mt-6 text-xs text-signal">
              {founderQuote.name} <span className="text-steel-soft">— {founderQuote.title}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <ROICalculator />

      {/* THE PROOF */}
      <section className="border-t border-steel-line py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">The Proof</div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Nothing Can Keep a Stub-EASE II™ Down.
            </h2>
            <p className="mt-4 max-w-2xl text-steel-soft">
              The power trowel rolls over. The Stub-EASE II™ convex cap — molded with a depressed guide strip to
              position the extraction spade bit and four talons that project off the top surface — lays flat into
              the slurry. Two seconds later the talons spring right back up.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal className="hud-frame overflow-hidden border border-steel-line">
              <img
                src="https://stubease.pplx.app/images/working-deck-stub-ups-riverview.jpg"
                alt="Riverview project active deck — hundreds of unprotected conduit stub-ups"
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="p-6">
                <div className="mono-label text-[10px] text-signal">The Problem</div>
                <p className="mt-2 text-sm text-steel-soft">
                  Riverview project. Every white pipe is a trip hazard, a fall hazard, an impalement risk. This is
                  the standard — and it doesn't have to be.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="hud-frame overflow-hidden border border-steel-line">
              <img
                src="https://stubease.pplx.app/images/seii-clean-finished-slab-zero-stubs.jpg"
                alt="South Boulevard Shores — finished concrete slab, zero protrusions visible"
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="p-6">
                <div className="mono-label text-[10px] text-signal">The Result</div>
                <p className="mt-2 text-sm text-steel-soft">
                  South Boulevard Shores. 200 stub-up locations. Zero protrusions. The entire floor is a clean,
                  safe working walking surface.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="hud-frame mt-6 overflow-hidden border border-steel-line bg-void">
            <video
              src="https://stubease.pplx.app/videos/SEII-Tassel-Flexing-Video.mp4"
              controls
              muted
              playsInline
              className="w-full"
            />
            <div className="p-6">
              <div className="mono-label text-[10px] text-signal">The Moment</div>
              <p className="mt-2 text-sm text-steel-soft">
                The Stub-EASE II™ cap flexes under the trowel blade and self-rights. The conduit path is intact.
                The access point is protected. The working walking surface is clean.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Who It's For</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Built for Every Trade on the Deck
            </h2>
          </Reveal>
          <div className="mt-12">
            <RoleTabs />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="border-t border-steel-line py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mono-label text-xs text-signal">From the Field</div>
              <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
                The People Who Use It Every Day.
              </h2>
            </div>
            <Link to="/testimonials" data-cursor-hover className="mono-label text-xs text-signal hover:underline">
              Watch On-Site Interviews →
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="hud-frame border border-steel-line bg-steel-panel/60 p-8">
                <p className="text-steel-bright">"{t.quote}"</p>
                <div className="mono-label mt-6 text-xs text-signal">{t.name}</div>
                <div className="mt-1 text-xs text-steel-soft">{t.title}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bp-grid relative border-t border-steel-line py-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-72 w-72 rounded-full bg-signal/10 blur-3xl" />
        </div>
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-semibold text-steel-bright md:text-5xl">
            Ready to Eliminate Stub-Up Risk on Your Next Project?
          </h2>
          <p className="mt-4 text-steel-soft">
            Order product, request a quote, or reach out directly to Jeff Krause at CSUE Technologies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/products" data-cursor-hover className="mono-label bg-signal px-7 py-4 text-xs text-void">
              Shop Products
            </Link>
            <Link
              to="/contact"
              data-cursor-hover
              className="mono-label border border-steel-line px-7 py-4 text-xs text-steel-bright hover:border-signal hover:text-signal"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function HeroStat({ value, label }) {
  return (
    <div>
      <div className="font-display text-xl font-semibold text-steel-bright drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] md:text-2xl">
        {value}
      </div>
      <div className="mono-label mt-1 text-[10px] text-steel-bright/75 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
        {label}
      </div>
    </div>
  )
}
