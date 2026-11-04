import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Honeypot from '../components/Honeypot.jsx'
import { reviewsPage, ratingLabels } from '../data/reviews.js'

const copy = reviewsPage
const inputClass =
  'w-full border border-steel-line bg-steel-panel px-4 py-3 text-sm text-steel-bright outline-none focus:border-signal'
const EMPTY_FORM = { rating: 0, name: '', title: '', company: '', location: '', body: '', email: '', consent: false }

function monthYear(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'America/Chicago' })
}

function RatingSquares({ rating }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-3 w-3 border ${n <= rating ? 'border-signal bg-signal shadow-signal' : 'border-steel-line bg-transparent'}`}
        />
      ))}
      <span className="mono-label ml-2 text-[10px] text-steel-soft">{rating}/5</span>
    </div>
  )
}

function ReviewCard({ review, index }) {
  const byline = [review.title, review.company].filter(Boolean).join(' · ')
  const date = monthYear(review.approvedAt)
  return (
    <Reveal delay={Math.min(index, 6) * 0.08} className="hud-frame border border-steel-line bg-steel-panel/50 p-8 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RatingSquares rating={review.rating} />
        {date && <div className="mono-label text-[10px] text-steel-soft">{date}</div>}
      </div>
      <p className="mt-5 whitespace-pre-line text-lg text-steel-bright">{review.body}</p>
      <div className="mono-label mt-6 text-xs text-signal">{review.name}</div>
      {byline && <div className="mt-1 text-xs text-steel-soft">{byline}</div>}
      {review.location && <div className="mt-1 text-xs text-steel-soft">{review.location}</div>}
    </Reveal>
  )
}

function ReviewList() {
  const [state, setState] = useState({ status: 'loading', reviews: [] })

  useEffect(() => {
    let alive = true
    fetch('/api/reviews', { headers: { accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (!alive) return
        if (data?.ok && Array.isArray(data.reviews)) setState({ status: 'ready', reviews: data.reviews })
        else setState({ status: 'error', reviews: [] })
      })
      .catch(() => alive && setState({ status: 'error', reviews: [] }))
    return () => {
      alive = false
    }
  }, [])

  if (state.status === 'loading') {
    return <p className="mono-label mt-10 text-xs text-steel-soft" role="status">{copy.list.loading}</p>
  }
  if (state.status === 'error') {
    return (
      <div role="status" className="hud-frame mt-10 border border-signal/50 bg-signal/10 p-6 text-sm text-steel-bright">
        {copy.list.error}
      </div>
    )
  }
  if (state.reviews.length === 0) {
    return (
      <div className="hud-frame mt-10 border border-steel-line bg-steel-panel/40 p-8 text-center text-steel-soft">
        {copy.list.empty}
      </div>
    )
  }
  return (
    <div className="mt-10 space-y-8">
      {state.reviews.map((r, i) => (
        <ReviewCard key={r.id || i} review={r} index={i} />
      ))}
    </div>
  )
}

function ReviewForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | done
  const [error, setError] = useState('')
  const f = copy.form
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.rating) return setError(f.errors.rating)
    if (form.body.trim().length < 20) return setError(f.errors.body)
    if (!form.consent) return setError(f.errors.consent)
    setStatus('submitting')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hp }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.ok !== false) {
        setStatus('done')
        return
      }
      setError(data?.message || f.genericError)
    } catch {
      setError(f.genericError)
    }
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <div className="hud-frame mt-10 border border-signal/50 bg-void p-10 text-center" role="status">
        <div className="font-display text-2xl text-steel-bright">{f.successTitle}</div>
        <p className="mt-2 text-steel-soft">{f.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-10 grid gap-5 sm:grid-cols-2">
      <Honeypot value={hp} onChange={setHp} />

      <div className="col-span-full">
        <span className="mono-label mb-2 block text-[11px] text-steel-soft">{f.fields.rating}</span>
        <div className="flex gap-3" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={form.rating === n}
              data-cursor-hover
              onClick={() => setForm({ ...form, rating: n })}
              className={`flex-1 border px-2 py-3 font-mono text-sm transition-colors ${
                form.rating === n
                  ? 'border-signal bg-signal/10 text-signal'
                  : 'border-steel-line text-steel-soft hover:border-steel-soft'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mono-label mt-2 h-4 text-[10px] text-signal">
          {form.rating ? `${form.rating}/5 — ${ratingLabels[form.rating]}` : ''}
        </div>
      </div>

      <input required minLength={2} maxLength={80} placeholder={f.fields.name} value={form.name} onChange={set('name')} className={inputClass} />
      <input maxLength={80} placeholder={f.fields.title} value={form.title} onChange={set('title')} className={inputClass} />
      <input maxLength={80} placeholder={f.fields.company} value={form.company} onChange={set('company')} className={inputClass} />
      <input maxLength={80} placeholder={f.fields.location} value={form.location} onChange={set('location')} className={inputClass} />

      <div className="col-span-full">
        <textarea
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          placeholder={f.fields.body}
          value={form.body}
          onChange={set('body')}
          className={inputClass}
        />
        <div className="mono-label mt-1 flex justify-between text-[10px] text-steel-soft">
          <span>{f.bodyHint}</span>
          <span>{form.body.length}/2000</span>
        </div>
      </div>

      <input
        required
        type="email"
        maxLength={254}
        placeholder={f.fields.email}
        value={form.email}
        onChange={set('email')}
        className={`${inputClass} col-span-full`}
      />

      <label className="col-span-full flex items-start gap-3 text-sm text-steel-soft" data-cursor-hover>
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 h-4 w-4 shrink-0 accent-signal"
        />
        <span>{f.consent}</span>
      </label>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            role="alert"
            className="col-span-full overflow-hidden border border-signal bg-signal/10 px-4 py-3 text-sm text-steel-bright"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        data-cursor-hover
        type="submit"
        disabled={status === 'submitting'}
        className="mono-label col-span-full bg-signal py-4 text-xs text-void transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'submitting' ? f.submitting : f.submit}
      </button>
    </form>
  )
}

export default function Reviews() {
  return (
    <>
      <PageHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} subtitle={copy.hero.subtitle} />

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">{copy.list.eyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">{copy.list.title}</h2>
          </Reveal>
          <ReviewList />
        </div>
      </section>

      <section id="write-a-review" className="border-t border-steel-line bg-steel-panel/40 py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="mono-label text-xs text-signal">{copy.form.eyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-steel-bright md:text-4xl">{copy.form.title}</h2>
            <p className="mt-4 max-w-2xl text-steel-soft">{copy.form.lead}</p>
          </Reveal>
          <ReviewForm />
        </div>
      </section>
    </>
  )
}
