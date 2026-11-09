// -----------------------------------------------------------------------
// Public third-party integration constants (no secrets — these are the same
// URLs any visitor's browser loads). Secrets live in Vercel env vars only.
// -----------------------------------------------------------------------
//
// The booking calendar on /contact?tab=meeting (src/components/BookingCalendar.jsx)
// is custom-built, not a GHL embed — it calls /api/booking, which proxies to the
// CRM's GHL Calendar API client. There's nothing to configure here for it.
