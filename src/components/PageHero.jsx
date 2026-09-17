import Reveal from './Reveal.jsx'

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="bp-grid relative overflow-hidden border-b border-steel-line pb-20 pt-40 md:pt-48">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          {eyebrow && <div className="mono-label mb-4 text-xs text-signal">{eyebrow}</div>}
          <h1 className="font-display text-4xl font-semibold leading-tight text-steel-bright md:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-2xl text-lg text-steel-soft">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  )
}
