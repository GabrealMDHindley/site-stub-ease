// -----------------------------------------------------------------------
// Public third-party integration constants (no secrets — these are the same
// URLs any visitor's browser loads). Secrets live in Vercel env vars only.
// -----------------------------------------------------------------------

// Jeff Krause's GoHighLevel (LeadConnector) booking calendar. Rendered as an
// iframe on /contact?tab=meeting (src/components/BookingEmbed.jsx); the ROI
// calculator's "Schedule a call with Jeff" CTA links there.
// The value lives in src/config/features.js (GHL_CALENDAR_URL) — one place to change it.
import { GHL_CALENDAR_URL } from './features.js'
export const BOOKING_URL = GHL_CALENDAR_URL

// GoHighLevel's embed helper — resizes the booking iframe to its content.
export const BOOKING_SCRIPT_URL = 'https://link.msgsndr.com/js/form_embed.js'
