// Vercel Serverless Function — GET/POST /api/reviews
//
// GET  → the approved reviews, proxied from the Stub-EASE CRM's public endpoint
//        (…/api/site?resource=reviews&action=public). Only reviews Jeff or a
//        Stub-EASE admin approved in the CRM are ever returned. If the CRM can't be
//        reached the page gets { ok:false, reviews:[] } and shows an honest error.
// POST → a new review from the /reviews form, validated here and forwarded to the
//        CRM's approval queue (…&action=submit). Nothing is published until approved.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   CRM_REVIEWS_URL    — optional override of the CRM reviews base URL. Default:
//                        https://crm-stub-ease.vercel.app/api/site?resource=reviews
//                        (this function appends &action=public / &action=submit).
//   CUSTOM_CRM_API_KEY — optional shared key sent as `Authorization: Bearer …` on
//                        submit; must equal the CRM's SITE_API_KEY when that is set.

const DEFAULT_BASE = 'https://crm-stub-ease.vercel.app/api/site?resource=reviews'
const TIMEOUT_MS = 6000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function crmUrl(action) {
  const base = (process.env.CRM_REVIEWS_URL || DEFAULT_BASE).trim()
  return `${base}${base.includes('?') ? '&' : '?'}action=${action}`
}

function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  const first = (Array.isArray(xff) ? xff[0] : xff || '').split(',')[0].trim()
  return first || req.headers['x-real-ip'] || ''
}

const str = (v) => (typeof v === 'string' ? v.trim() : '')

// Only the public fields; anything else the CRM might send is dropped.
function publicReview(r) {
  return {
    id: String(r.id ?? ''),
    name: str(r.name),
    title: str(r.title),
    company: str(r.company),
    location: str(r.location),
    rating: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0))),
    body: str(r.body),
    approvedAt: typeof r.approvedAt === 'string' ? r.approvedAt : null,
  }
}

async function listReviews(res) {
  try {
    const r = await fetch(crmUrl('public'), {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!r.ok) throw new Error(`CRM responded ${r.status}`)
    const data = await r.json()
    const list = Array.isArray(data?.reviews) ? data.reviews : null
    if (!list) throw new Error('CRM response had no reviews list')
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60')
    return res.status(200).json({ ok: true, reviews: list.filter((x) => x && x.body && x.name).map(publicReview) })
  } catch (err) {
    console.error('Reviews fetch failed:', err?.message || err)
    // Never cache a failure — the next visitor should retry the CRM.
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ ok: false, reviews: [] })
  }
}

// Returns an error message, or null when the review is valid.
function validate(b) {
  const rating = Number(b.rating)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return 'Pick a rating from 1 to 5.'
  const name = str(b.name)
  if (name.length < 2 || name.length > 80) return 'Enter your name (2–80 characters).'
  const body = str(b.body)
  if (body.length < 20 || body.length > 2000) return 'Your review needs 20–2000 characters.'
  for (const f of ['title', 'company', 'location']) {
    if (str(b[f]).length > 80) return `Keep ${f} to 80 characters.`
  }
  const email = str(b.email)
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return 'Enter a valid email address.'
  if (b.consent !== true) return 'Please tick the consent box so we can publish your review.'
  return null
}

async function submitReview(req, res) {
  const b = req.body
  if (!b || typeof b !== 'object' || Array.isArray(b)) {
    return res.status(400).json({ ok: false, message: 'Missing review.' })
  }
  // Honeypot: a real visitor never fills this hidden field. Look successful, send nothing.
  if (b.hp != null && String(b.hp).trim() !== '') return res.status(200).json({ ok: true })

  const problem = validate(b)
  if (problem) return res.status(400).json({ ok: false, message: problem })

  const review = {
    rating: Number(b.rating),
    name: str(b.name),
    title: str(b.title),
    company: str(b.company),
    location: str(b.location),
    body: str(b.body),
    email: str(b.email),
    consent: true,
  }
  const ip = clientIp(req)
  const key = process.env.CUSTOM_CRM_API_KEY

  let r
  try {
    r = await fetch(crmUrl('submit'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        ...(ip && { 'x-visitor-ip': ip }),
        ...(key && { Authorization: `Bearer ${key}` }),
      },
      body: JSON.stringify(review),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (err) {
    console.error('Review submit failed (CRM unreachable):', err?.message || err)
    return res.status(502).json({
      ok: false,
      message: "We couldn't reach our review system just now. Please try again in a few minutes, or email info@stubease.com.",
    })
  }

  const data = await r.json().catch(() => ({}))
  // Auth / config / server faults on the CRM side are our problem, not the visitor's:
  // log the detail, show a generic message, and don't echo CRM internals.
  if (r.status >= 500 || r.status === 401 || r.status === 403 || r.status === 404) {
    console.error('Review submit rejected by CRM:', r.status, data?.message || data?.error || '')
    return res.status(502).json({
      ok: false,
      message: "We couldn't reach our review system just now. Please try again in a few minutes, or email info@stubease.com.",
    })
  }
  const message =
    (typeof data?.message === 'string' && data.message) ||
    (typeof data?.error === 'string' && data.error) ||
    (r.ok ? 'Thanks — your review was received.' : `Review could not be submitted (error ${r.status}).`)
  if (!r.ok) console.error('Review submit rejected by CRM:', r.status, message)
  return res.status(r.status).json({ ok: r.ok && data?.ok !== false, message })
}

export default async function handler(req, res) {
  if (req.method === 'GET') return listReviews(res)
  if (req.method === 'POST') return submitReview(req, res)
  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ ok: false, message: 'Method not allowed' })
}
