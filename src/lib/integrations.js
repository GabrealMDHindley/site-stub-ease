// -----------------------------------------------------------------------
// Integration points. These are intentionally left as clearly-marked stubs
// because API keys/secrets must never live in frontend code — they belong
// in Vercel serverless functions (in /api) that this frontend calls.
//
// See README.md → "Connecting Stripe, GoHighLevel, and your custom CRM"
// for the exact steps to wire each of these up.
// -----------------------------------------------------------------------

/**
 * Sends a captured ROI-calculator lead to your backend, which should then
 * forward it to GoHighLevel and/or your custom CRM.
 * Expected to POST to a Vercel serverless function at /api/lead.
 */
export async function submitLead(lead) {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) throw new Error(`Lead submission failed: ${res.status}`)
    return await res.json()
  } catch (err) {
    // Falls back gracefully if /api/lead isn't wired up yet — the UI still
    // shows the savings report so the calculator works during design review.
    console.warn('[integrations] submitLead stub — /api/lead not yet connected.', err)
    return { ok: false, stub: true }
  }
}

/**
 * Free GHL calendar slots between startMs/endMs (epoch milliseconds), via /api/booking.
 * Returns { ok:true, days } | { ok:false, message }.
 */
export async function fetchBookingSlots(startMs, endMs, timezone) {
  try {
    const qs = new URLSearchParams({ action: 'slots', startDate: String(startMs), endDate: String(endMs), timezone })
    const res = await fetch(`/api/booking?${qs}`)
    return await res.json()
  } catch (err) {
    console.warn('[integrations] fetchBookingSlots failed.', err)
    return { ok: false, message: "Couldn't load available times. Please try again shortly." }
  }
}

/**
 * Books one of the slots fetchBookingSlots returned, via /api/booking.
 * Returns { ok:true, appointmentId } | { ok:false, message }.
 */
export async function createBooking({ name, email, startTime, hp }) {
  try {
    const res = await fetch('/api/booking?action=create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, startTime, hp }),
    })
    return await res.json()
  } catch (err) {
    console.warn('[integrations] createBooking failed.', err)
    return { ok: false, message: 'Could not book that time. Please try again.' }
  }
}

/**
 * Creates a Stripe Checkout session by calling a Vercel serverless function.
 * That function should use your Stripe secret key server-side and return
 * the session URL to redirect to.
 */
export async function startCheckout(items) {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    if (!res.ok) throw new Error(`Checkout session failed: ${res.status}`)
    const { url } = await res.json()
    if (url) window.location.href = url
  } catch (err) {
    console.warn('[integrations] startCheckout stub — /api/checkout not yet connected.', err)
  }
}
