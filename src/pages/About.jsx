import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { milestones, differentiators, values } from '../data/about.js'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About CSUE Technologies"
        title="Built From the Ground Up — By Someone Who Was There"
        subtitle="Stub-EASE II™ was not designed in a lab. It was designed by a General Superintendent who was responsible for a job site the day a $1.3 million incident happened — and who spent the next twenty years making sure it could not happen again."
      />

      {/* IN HIS OWN WORDS */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal className="hud-frame border border-signal/40 bg-steel-panel/40 p-8 md:p-10">
            <div className="mono-label text-[10px] text-signal">In His Own Words</div>
            <p className="mt-3 font-display text-xl italic text-steel-bright md:text-2xl">
              "I wasn't just a witness to that incident. I was responsible for that job site."
            </p>
            <div className="mono-label mt-4 text-xs text-steel-soft">
              Jeff Krause — Founder & Director of Manufacturing and Product Development, CSUE Technologies
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE STORY */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">The Story</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Twenty Years on the Deck, Not in a Lab
            </h2>
            <p className="mt-4 text-steel-soft">
              Jeff Krause spent his career in high-rise construction as a General Superintendent — managing crews,
              managing risk, and managing the inevitable chaos of a concrete pour. Between 2002 and 2004, on the
              University Center of Chicago project with Turner Construction, a worker tripped on an unprotected
              conduit stub-up. The settlement that followed exceeded <strong className="text-steel-bright">$1.3 million</strong>.
            </p>
            <p className="mt-4 text-steel-soft">
              Jeff was not just a witness to that incident. He was responsible for that job site. That moment
              drove twenty years of product development — not in a lab, but on job sites, with electricians, with
              concrete finishers, with the people who actually have to deal with stub-ups every single day.
            </p>
            <p className="mt-4 text-steel-soft">
              The result is <strong className="text-steel-bright">Stub-EASE II™</strong> — a complete, engineered
              system that eliminates conduit stub-up hazards before the pour, leaves a protected sleeve above
              finished slab, and extracts in seconds with a standard impact driver.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER VIDEO */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">In Jeff's Own Words</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              The First Rule of Hazard Prevention: Eliminate It
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hud-frame mt-8 overflow-hidden border border-steel-line bg-void">
            <video src="https://stubease.pplx.app/videos/testimonial-jeff-founder.mp4" controls muted playsInline className="w-full">
              Your browser does not support video playback.
            </video>
            <div className="p-6">
              <p className="italic text-steel-bright">"If I've done anything, I've gotten rid of the conduit stub-ups."</p>
              <div className="mono-label mt-3 text-xs text-signal">
                Jeff Krause — Founder & Director of Manufacturing and Product Development, CSUE Technologies
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Company" lines={['CSUE Technologies, Inc.', 'Founded by Jeff Krause']} />
            <InfoCard title="Location" lines={['Chicagoland Area', 'Illinois, USA']} />
            <InfoCard title="Contact" lines={['undercover@stubease.com']} />
            <InfoCard title="Patents" lines={['US 10,320,167 B2 · US 10,742,008 B2', 'US 11,221,090 B2 · Additional patent pending']} />
          </Reveal>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">Milestones</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              From One Incident to a Complete System
            </h2>
          </Reveal>

          <div className="mt-12 space-y-0">
            {milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06} className="relative flex gap-6 border-l border-steel-line pb-10 pl-8 last:pb-0">
                <div className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-signal bg-void" />
                <div>
                  <div className="mono-label text-[10px] text-signal">{m.year}</div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-steel-bright">{m.title}</h3>
                  <p className="mt-2 text-sm text-steel-soft">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">What Makes It Different</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">
              Not a Collection of Parts. A System.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-5">
            {differentiators.map((d, i) => (
              <Reveal key={d} delay={i * 0.06} className="flex gap-5">
                <div className="mono-label text-2xl font-semibold text-signal/40">{String(i + 1).padStart(2, '0')}</div>
                <p className="pt-1 text-steel-bright/90">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-t border-steel-line py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">What We Stand For</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">Our Values</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
                <h3 className="font-display text-lg font-semibold text-steel-bright">{v.title}</h3>
                <p className="mt-2 text-sm text-steel-soft">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-steel-line py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-semibold text-steel-bright md:text-4xl">Talk to Jeff Directly</h2>
          <p className="mt-4 text-steel-soft">
            Questions about the system, a project, or a submittal package — reach out.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" data-cursor-hover className="mono-label bg-signal px-7 py-4 text-xs text-void">
              Contact Jeff
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

function InfoCard({ title, lines }) {
  return (
    <div className="hud-frame border border-steel-line bg-void p-6">
      <div className="mono-label text-[10px] text-signal">{title}</div>
      {lines.map((l) => (
        <div key={l} className="mt-2 text-sm text-steel-bright">
          {l}
        </div>
      ))}
    </div>
  )
}
