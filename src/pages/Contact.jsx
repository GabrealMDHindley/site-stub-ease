import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { submitLead } from '../lib/integrations.js'

const reasons = [
  'Request a Quote / Pricing',
  'Distributor / Volume Inquiry',
  'Request Submittal Package',
  'Request a Sample / Trial Order',
  'Technical Question',
  'Schedule a Meeting',
  'Other',
]

export default function Contact() {
  const [tab, setTab] = useState('message') // 'message' | 'meeting'
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', reason: '', details: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    await submitLead({ ...form, source: 'contact-page' })
    setStatus('done')
  }

  return (
    <>
      <PageHero
        eyebrow="CSUE Technologies"
        title="Let's Talk"
        subtitle="Questions about the system, distributor pricing, or a project application — reach out directly. Submittal packages and spec sheets are available for immediate download on the Products page."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-5 md:px-10">
          {/* SIDEBAR */}
          <Reveal className="md:col-span-2">
            <div className="hud-frame border border-steel-line bg-steel-panel/40 p-8">
              <div className="mono-label text-xs text-signal">Direct Contact</div>
              <div className="mt-3 font-display text-xl text-steel-bright">Jeff Krause</div>
              <p className="mt-1 text-sm text-steel-soft">
                Founder & Director of Manufacturing and Product Development
                <br />
                CSUE Technologies, Inc.
              </p>
              <a href="mailto:info@stubease.com" data-cursor-hover className="mt-4 block font-mono text-sm text-signal hover:underline">
                info@stubease.com
              </a>

              <div className="mono-label mt-6 text-[10px] text-steel-soft">Hours</div>
              <p className="mt-1 text-sm text-steel-bright">Mon–Fri, 8:00 AM – 5:00 PM CT</p>

              <div className="mono-label mt-6 text-[10px] text-steel-soft">What to Expect</div>
              <ul className="mt-2 space-y-2 text-sm text-steel-soft">
                <li>— Response within one business day — typically same day</li>
                <li>— Distributor pricing and volume quotes available on request</li>
                <li>— Submittal packages and spec sheets available for immediate download on the Products page</li>
                <li>— Site visits available for Chicago-area projects</li>
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <Link to="/products" data-cursor-hover className="mono-label text-[11px] text-signal hover:underline">
                  View Products & Pricing →
                </Link>
                <Link to="/products#submittals" data-cursor-hover className="mono-label text-[11px] text-signal hover:underline">
                  Download Submittal Packages →
                </Link>
                <Link to="/safety" data-cursor-hover className="mono-label text-[11px] text-signal hover:underline">
                  Studies & Safety Data →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* FORM */}
          <Reveal delay={0.1} className="md:col-span-3">
            <div className="mb-6 flex gap-2 border-b border-steel-line">
              <button
                data-cursor-hover
                onClick={() => setTab('message')}
                className={`mono-label border-b-2 px-4 py-3 text-xs transition-colors ${
                  tab === 'message' ? 'border-signal text-signal' : 'border-transparent text-steel-soft'
                }`}
              >
                Send a Message
              </button>
              <button
                data-cursor-hover
                onClick={() => setTab('meeting')}
                className={`mono-label border-b-2 px-4 py-3 text-xs transition-colors ${
                  tab === 'meeting' ? 'border-signal text-signal' : 'border-transparent text-steel-soft'
                }`}
              >
                Schedule a Meeting
              </button>
            </div>

            {tab === 'meeting' ? (
              <div className="hud-frame border border-steel-line bg-steel-panel/40 p-8 text-center">
                <div className="font-display text-xl text-steel-bright">Schedule a Meeting with Jeff</div>
                <p className="mt-2 text-sm text-steel-soft">
                  Pick a time that works for you. Available for phone calls, video meetings, and Chicago-area site
                  visits.
                </p>
                <p className="mono-label mt-6 text-[10px] text-steel-soft">Online booking coming soon.</p>
                <p className="mt-2 text-sm text-steel-soft">In the meantime, email directly:</p>
                <a href="mailto:info@stubease.com" data-cursor-hover className="mt-1 block font-mono text-signal hover:underline">
                  info@stubease.com
                </a>
              </div>
            ) : status === 'done' ? (
              <div className="hud-frame border border-signal/50 bg-void p-10 text-center">
                <div className="font-display text-2xl text-steel-bright">Message Sent</div>
                <p className="mt-2 text-steel-soft">
                  Thank you for reaching out. Jeff will respond within one business day — typically same day during
                  business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <input
                  required
                  placeholder="First Name *"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                />
                <input
                  required
                  placeholder="Last Name *"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                />
                <input
                  placeholder="Company / Organization"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
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
                <input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                />
                <select
                  required
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="border border-steel-line bg-steel-panel px-4 py-3 text-sm text-steel-bright outline-none focus:border-signal"
                >
                  <option value="">Reason for Contact — Select one...</option>
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Project Details"
                  rows={5}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="col-span-full border border-steel-line bg-steel-panel px-4 py-3 text-sm outline-none focus:border-signal"
                />
                <button
                  data-cursor-hover
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mono-label col-span-full bg-signal py-4 text-xs text-void transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
                <p className="col-span-full text-xs text-steel-soft">
                  Your information is never sold or shared.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
