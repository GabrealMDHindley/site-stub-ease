// -----------------------------------------------------------------------
// Public third-party integration constants (no secrets — these are the same
// URLs any visitor's browser loads). Secrets live in Vercel env vars only.
// -----------------------------------------------------------------------

// Jeff Krause's GoHighLevel (LeadConnector) booking calendar. Rendered as an
// iframe on /contact?tab=meeting (src/components/BookingEmbed.jsx); the ROI
// calculator's "Schedule a call with Jeff" CTA links there.
export const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/bPtbIeqGaeCxN8D9e7nT'

// GoHighLevel's embed helper — resizes the booking iframe to its content.
export const BOOKING_SCRIPT_URL = 'https://link.msgsndr.com/js/form_embed.js'
