// Vercel Serverless Function — POST /api/lead
//
// Receives ROI-calculator and contact-form submissions from the frontend,
// then forwards them to the Stub-EASE CRM (always), GoHighLevel and/or any
// other custom lead endpoint. Runs server-side so API keys never touch the browser.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   CRM_LEADS_URL            — optional override for the CRM's lead intake. Default:
//                              https://crm-stub-ease.vercel.app/api/site?resource=leads&action=intake
//                              Every lead goes here; the CRM files it under Leads and pushes
//                              the contact to GoHighLevel with website-lead tags.
//   CUSTOM_CRM_API_KEY       — optional shared key sent as `Authorization: Bearer …` to the
//                              CRM intake (and to CUSTOM_CRM_URL). Must equal the CRM's
//                              SITE_API_KEY whenever that is set there.
//   GHL_WEBHOOK_URL          — optional GoHighLevel "Inbound Webhook" trigger URL.
//   GHL_ESTIMATE_WEBHOOK_URL — optional. A SEPARATE GoHighLevel "Inbound Webhook" trigger
//                              URL for a standalone workflow that only fires for ROI
//                              calculator submissions (lead.source === 'roi-calculator').
//   CUSTOM_CRM_URL           — optional extra lead-intake endpoint. Skipped when it is the
//                              same URL as the CRM intake, so a lead is never sent twice.
//
// Spam: both forms carry a hidden honeypot field `hp`. A submission with it filled
// in gets a normal-looking 200 and is forwarded nowhere.
//
// Once a lead is valid the visitor always gets 200; a failed, timed-out or non-2xx
// forward is logged (Vercel function logs) rather than shown to the visitor.

const DEFAULT_CRM_LEADS_URL = 'https://crm-stub-ease.vercel.app/api/site?resource=leads&action=intake'
const FORWARD_TIMEOUT_MS = 10000
const MAX_EMAIL = 254
const MAX_SHORT = 200 // names, company, phone, reason, source, trade size …
const MAX_LONG = 5000 // free-text project details / message
const LONG_FIELDS = new Set(['details', 'message'])
const MAX_KEYS = 40

function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  const first = (Array.isArray(xff) ? xff[0] : xff || '').split(',')[0].trim()
  return first || req.headers['x-real-ip'] || ''
}

// Caps string fields, drops the honeypot and anything that isn't a string,
// finite number or boolean (the forms never send nested objects).
function sanitize(body) {
  const out = {}
  let n = 0
  for (const [key, value] of Object.entries(body)) {
    if (key === 'hp' || n >= MAX_KEYS) continue
    if (typeof value === 'string') {
      out[key] = value.trim().slice(0, LONG_FIELDS.has(key) ? MAX_LONG : MAX_SHORT)
    } else if ((typeof value === 'number' && Number.isFinite(value)) || typeof value === 'boolean') {
      out[key] = value
    } else {
      continue
    }
    n++
  }
  return out
}

async function post(name, url, headers, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
    signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${name} responded ${res.status}${text ? `: ${text.slice(0, 300)}` : ''}`)
  }
  return name
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const raw = req.body
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return res.status(400).json({ error: 'Missing required lead fields' })
  }

  // Honeypot: a real visitor never sees or fills this field.
  if (raw.hp != null && String(raw.hp).trim() !== '') {
    return res.status(200).json({ ok: true })
  }

  const email = typeof raw.email === 'string' ? raw.email.trim() : ''
  if (!email || email.length > MAX_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required' })
  }

  const lead = sanitize(raw)
  lead.email = email
  const body = JSON.stringify(lead)
  const apiKey = process.env.CUSTOM_CRM_API_KEY
  const auth = apiKey ? { Authorization: `Bearer ${apiKey}` } : {}
  const ip = clientIp(req)

  const forwards = []

  // 1. The Stub-EASE CRM lead intake — every lead. The CRM files it under Leads and
  //    pushes the contact to GoHighLevel (tags website-lead + website-estimate/-inquiry).
  const crmLeadsUrl = (process.env.CRM_LEADS_URL || DEFAULT_CRM_LEADS_URL).trim()
  forwards.push(post('crm-intake', crmLeadsUrl, { ...auth, ...(ip && { 'x-visitor-ip': ip }) }, body))

  // 2. GoHighLevel — an Inbound Webhook trigger URL, if one is configured.
  //    In GHL: Automation → Workflows → New Workflow → Trigger: "Inbound Webhook".
  if (process.env.GHL_WEBHOOK_URL) {
    forwards.push(post('ghl-webhook', process.env.GHL_WEBHOOK_URL, {}, body))
  }

  // 2b. A second, standalone GHL workflow dedicated to estimate requests only, kept
  //     separate from the general workflow above so editing one can't break the other.
  if (process.env.GHL_ESTIMATE_WEBHOOK_URL && lead.source === 'roi-calculator') {
    forwards.push(post('ghl-estimate-webhook', process.env.GHL_ESTIMATE_WEBHOOK_URL, {}, body))
  }

  // 3. Any other custom lead endpoint — skipped when it is the CRM intake itself.
  const customUrl = (process.env.CUSTOM_CRM_URL || '').trim()
  if (customUrl && customUrl !== crmLeadsUrl) {
    forwards.push(post('custom-crm', customUrl, auth, body))
  }

  const results = await Promise.allSettled(forwards)
  for (const r of results) {
    if (r.status === 'rejected') console.error('Lead forwarding failed:', r.reason?.message || r.reason)
  }

  // Don't block the visitor on downstream issues — failures are logged above.
  return res.status(200).json({ ok: true })
}
