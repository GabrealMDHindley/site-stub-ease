import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Honeypot from './Honeypot.jsx'
import { createBooking, fetchBookingSlots } from '../lib/integrations.js'

const TIMEZONE = 'America/Chicago'
const RANGE_DAYS = 14

const dayLabel = (key) =>
  new Date(`${key}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

const timeLabel = (iso) =>
  new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TIMEZONE })

// A custom, on-brand booking calendar: looks and feels like the rest of the site, but
// every time slot and the appointment itself come straight from GoHighLevel (via
// /api/booking -> the CRM's Calendar API client) — replaces the GHL iframe widget.
export default function BookingCalendar() {
  const navigate = useNavigate()
  const [days, setDays] = useState(null) // null = loading, {} | message on done
  const [loadError, setLoadError] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | done | error
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      const start = Date.now()
      const end = start + RANGE_DAYS * 24 * 60 * 60 * 1000
      const result = await fetchBookingSlots(start, end, TIMEZONE)
      if (cancelled) return
      if (result?.ok) {
        const withSlots = Object.fromEntries(
          Object.entries(result.days || {}).filter(([, d]) => d.slots?.length > 0),
        )
        setDays(withSlots)
      } else {
        setLoadError(result?.message || "Couldn't load available times.")
        setDays({})
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const dayKeys = useMemo(() => (days ? Object.keys(days).sort() : []), [days])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    const result = await createBooking({ name: form.name, email: form.email, startTime: selectedSlot, hp })
    if (result?.ok) {
      navigate('/call-confirmed')
      return
    }
    setStatus('error')
    setSubmitMessage(result?.message || 'Could not book that time. Please try another.')
  }

  if (days === null) {
    return (
      <div className="hud-frame border border-steel-line bg-steel-panel/40 p-8 text-center text-sm text-steel-soft">
        Loading available times…
      </div>
    )
  }

  if (loadError || dayKeys.length === 0) {
    return (
      <div className="hud-frame border border-steel-line bg-steel-panel/40 p-8 text-center">
        <p className="text-sm text-steel-soft">
          {loadError || 'No open times in the next two weeks.'} Email directly to schedule:{' '}
          <a href="mailto:info@stubease.com" data-cursor-hover className="font-mono text-signal hover:underline">
            info@stubease.com
          </a>
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="hud-frame border border-signal/50 bg-void p-8 text-center">
        <p className="text-sm text-steel-soft">{submitMessage}</p>
        <button
          data-cursor-hover
          onClick={() => {
            setStatus('idle')
            setSelectedSlot(null)
          }}
          className="mono-label mt-4 border border-steel-line px-5 py-3 text-xs text-steel-bright hover:border-signal hover:text-signal"
        >
          Pick another time
        </button>
      </div>
    )
  }

  // Step 3: slot chosen — collect name/email and confirm.
  if (selectedSlot) {
    return (
      <form onSubmit={handleSubmit} className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
        <div className="mono-label text-xs text-signal">Confirm Your Time</div>
        <p className="mt-2 font-display text-lg text-steel-bright">
          {dayLabel(selectedDay)} · {timeLabel(selectedSlot)} CT
        </p>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setSelectedSlot(null)}
          className="mono-label mt-1 text-[11px] text-steel-soft hover:text-signal"
        >
          ← Choose a different time
        </button>

        <div className="mt-6 grid gap-4">
          <Honeypot value={hp} onChange={setHp} />
          <input
            required
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
          />
          <input
            required
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
          />
          <button
            data-cursor-hover
            type="submit"
            disabled={status === 'submitting'}
            className="mono-label bg-signal py-4 text-xs text-void transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Booking…' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    )
  }

  // Step 2: day chosen — show its open times.
  if (selectedDay) {
    return (
      <div className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
        <div className="flex items-center justify-between">
          <div className="mono-label text-xs text-signal">{dayLabel(selectedDay)}</div>
          <button
            data-cursor-hover
            onClick={() => setSelectedDay(null)}
            className="mono-label text-[11px] text-steel-soft hover:text-signal"
          >
            ← All Days
          </button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {days[selectedDay].slots.map((iso) => (
            <button
              key={iso}
              data-cursor-hover
              onClick={() => setSelectedSlot(iso)}
              className="mono-label border border-steel-line px-3 py-3 text-xs text-steel-bright hover:border-signal hover:text-signal"
            >
              {timeLabel(iso)}
            </button>
          ))}
        </div>
        <p className="mt-5 text-xs text-steel-soft">All times shown in Central Time.</p>
      </div>
    )
  }

  // Step 1: pick a day.
  return (
    <div className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
      <div className="mono-label text-xs text-signal">Pick a Day</div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {dayKeys.map((key) => (
          <button
            key={key}
            data-cursor-hover
            onClick={() => setSelectedDay(key)}
            className="mono-label border border-steel-line px-3 py-4 text-xs text-steel-bright hover:border-signal hover:text-signal"
          >
            {dayLabel(key)}
            <span className="mt-1 block text-[10px] text-steel-soft">{days[key].slots.length} open</span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs text-steel-soft">All times shown in Central Time.</p>
    </div>
  )
}
