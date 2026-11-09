// Vercel Serverless Function — GET/POST /api/booking
//
// Proxies the custom-built booking UI on /contact?tab=meeting to the Stub-EASE
// CRM, which calls GoHighLevel's real Calendar API. All times, bookings, and
// automations stay in GHL — this function (and the CRM behind it) never store
// a booking locally. Same proxy pattern as api/inventory.js and api/lead.js.
//
//   GET  ?action=slots&startDate=&endDate=&[timezone=]
//        startDate/endDate: epoch milliseconds, range <= 31 days.
//        -> { ok:true, days: {"YYYY-MM-DD": {slots: [iso...]}} } | { ok:false, message }
//   POST ?action=create  { name, email, phone?, startTime, hp? }
//        -> { ok:true, appointmentId } | { ok:false, message }
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   CRM_BOOKING_URL     — optional override for the CRM's booking resource. Default:
//                         https://crm-stub-ease.vercel.app/api/site?resource=booking
//   CUSTOM_CRM_API_KEY  — shared key sent as `Authorization: Bearer …` to the CRM,
//                         same variable api/lead.js already uses. Must equal the
//                         CRM's SITE_API_KEY whenever that is set there.

const DEFAULT_CRM_BOOKING_URL = 'https://crm-stub-ease.vercel.app/api/site?resource=booking'
const FORWARD_TIMEOUT_MS = 10000
const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_PHONE = 32

function crmBookingUrl(action) {
  const base = (process.env.CRM_BOOKING_URL || DEFAULT_CRM_BOOKING_URL).trim()
  return `${base}&action=${encodeURIComponent(action)}`
}

function authHeaders() {
  const apiKey = process.env.CUSTOM_CRM_API_KEY
  return apiKey ? { Authorization: `Bearer ${apiKey}` } : {}
}

async function forward(url, init) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS) })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) {
    return { ok: false, message: data?.message || `CRM responded ${res.status}` }
  }
  return data
}

async function handleSlots(req, res) {
  const startDate = String(req.query.startDate || '')
  const endDate = String(req.query.endDate || '')
  const timezone = typeof req.query.timezone === 'string' && req.query.timezone ? req.query.timezone : 'America/Chicago'
  if (!startDate || !endDate) {
    return res.status(400).json({ ok: false, message: 'startDate and endDate are required (epoch milliseconds)' })
  }
  const qs = new URLSearchParams({ startDate, endDate, timezone })
  res.setHeader('Cache-Control', 'no-store')
  try {
    const data = await forward(`${crmBookingUrl('slots')}&${qs}`, {
      method: 'GET',
      headers: { accept: 'application/json', ...authHeaders() },
    })
    return res.status(200).json(data)
  } catch (err) {
    console.warn('[booking] slots unavailable:', err?.message || err)
    return res.status(200).json({ ok: false, message: "Couldn't load available times. Please try again shortly." })
  }
}

async function handleCreate(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  const raw = req.body
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return res.status(400).json({ ok: false, message: 'Missing required booking fields' })
  }

  // Honeypot: forwarded as-is — the CRM silently drops it with a normal-looking 200.
  const name = typeof raw.name === 'string' ? raw.name.trim().slice(0, MAX_NAME) : ''
  const email = typeof raw.email === 'string' ? raw.email.trim().slice(0, MAX_EMAIL) : ''
  const phone = typeof raw.phone === 'string' ? raw.phone.trim().slice(0, MAX_PHONE) : undefined
  const startTime = typeof raw.startTime === 'string' ? raw.startTime.trim() : ''
  const hp = typeof raw.hp === 'string' ? raw.hp : undefined

  if (!name || name.length < 2) return res.status(400).json({ ok: false, message: 'Name is required' })
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'A valid email is required' })
  }
  if (!startTime || startTime.length < 10) return res.status(400).json({ ok: false, message: 'startTime is required' })

  const body = JSON.stringify({ name, email, ...(phone && { phone }), startTime, ...(hp !== undefined && { hp }) })
  try {
    const data = await forward(crmBookingUrl('create'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body,
    })
    return res.status(200).json(data)
  } catch (err) {
    console.warn('[booking] create failed:', err?.message || err)
    return res.status(200).json({ ok: false, message: 'Could not book that time. Please try again.' })
  }
}

export default async function handler(req, res) {
  const action = typeof req.query.action === 'string' ? req.query.action : ''
  if (action === 'slots') {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ ok: false, message: 'Method not allowed' })
    }
    return handleSlots(req, res)
  }
  if (action === 'create') {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ ok: false, message: 'Method not allowed' })
    }
    return handleCreate(req, res)
  }
  return res.status(404).json({ ok: false, message: `Unknown action: ${action || '(none)'}` })
}
