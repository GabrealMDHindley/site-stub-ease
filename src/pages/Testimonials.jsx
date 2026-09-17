import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { testimonials } from '../data/testimonials.js'

export default function Testimonials() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="The People Who Use It Every Day."
        subtitle="General foremen and superintendents on active high-rise projects in Chicago — in their own words."
      />

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="hud-frame border border-steel-line bg-steel-panel/50 p-8 md:p-10">
                <div className="mono-label text-signal">"</div>
                <p className="mt-2 text-lg text-steel-bright md:text-xl">{t.quote}</p>
                <div className="mono-label mt-6 text-xs text-signal">{t.name}</div>
                <div className="mt-1 text-xs text-steel-soft">{t.title}</div>
              </Reveal>
            ))}
          </div>

          <Reveal className="hud-frame mt-10 overflow-hidden border border-steel-line bg-void">
            <video
              src="https://stubease.pplx.app/videos/SEII-Tassel-Flexing-Video.mp4"
              controls
              muted
              playsInline
              className="w-full"
            />
            <div className="p-6">
              <div className="mono-label text-[10px] text-signal">On-Site Interview Footage</div>
              <p className="mt-2 text-sm text-steel-soft">
                Real projects. Real slabs. Zero stub-up hazards above the working walking surface.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
