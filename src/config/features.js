// -----------------------------------------------------------------------
// TEMPORARY FEATURE FLAGS
// -----------------------------------------------------------------------
// Checkout and pricing are live site-wide. To turn either one off again,
// just flip the matching flag below to `false` and redeploy — nothing else
// needs to change anywhere else in the codebase.
//
// CHECKOUT_ENABLED = false hides:
//   - "Add to Cart" on the kit configurator (src/pages/Products.jsx)
//   - "Configure & Buy" on the kit's product page (src/pages/ProductDetail.jsx)
//   - The cart icon in the navbar, on both desktop and mobile (src/components/Navbar.jsx)
//
// SHOW_PRICING = false hides:
//   - The per-box / per-unit price line and total on the kit configurator
//   - Everything else (product images, descriptions, specs, trade size,
//     height, pack size, and the quantity selector) stays fully visible
//     and interactive either way — only price and purchasing are affected.
// -----------------------------------------------------------------------

export const CHECKOUT_ENABLED = true
export const SHOW_PRICING = true

// -----------------------------------------------------------------------
// GHL_CALENDAR_URL — the "Schedule a Meeting" tab on /contact embeds this as
// an iframe (src/components/BookingEmbed.jsx, via BOOKING_URL in src/config/integrations.js). Get it from GoHighLevel:
// Sites → Calendars → the calendar Jeff wants here → the calendar's own
// Settings → Integrate/Embed → "Add to website" → copy the booking URL
// (looks like https://api.leadconnectorhq.com/widget/booking/<calendarId>) —
// just the URL, not the whole <iframe>/<script> snippet.
//
// This is NOT a secret (it's the same URL GHL expects you to publish on a
// website), so it lives here in plain code rather than as a Vercel env var —
// no redeploy-and-wait-for-the-right-dashboard dance to change it later.
//
// Empty string = the Contact page falls back to "email directly" instead of
// showing a broken empty embed. Fill this in once you have the real URL.
//
// Also set in GoHighLevel, on that same calendar — Settings → Confirmation →
// "Redirect to a URL" → https://www.stubease.com/call-confirmed — so a
// completed booking lands on this site's own confirmation page (see
// src/pages/CallConfirmed.jsx) instead of GHL's generic in-widget message.
export const GHL_CALENDAR_URL = 'https://api.leadconnectorhq.com/widget/booking/bPtbIeqGaeCxN8D9e7nT'
