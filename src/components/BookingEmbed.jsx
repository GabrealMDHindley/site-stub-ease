import { useEffect } from 'react'
import { BOOKING_URL, BOOKING_SCRIPT_URL } from '../config/integrations.js'

// Loads GoHighLevel's form_embed.js once per page session (it auto-sizes the iframe).
function loadEmbedScript() {
  if (typeof document === 'undefined') return
  if (document.querySelector(`script[src="${BOOKING_SCRIPT_URL}"]`)) return
  const s = document.createElement('script')
  s.src = BOOKING_SCRIPT_URL
  s.type = 'text/javascript'
  s.async = true
  document.body.appendChild(s)
}

// Jeff's live booking calendar (GoHighLevel / LeadConnector).
export default function BookingEmbed() {
  useEffect(loadEmbedScript, [])

  return (
    <div className="overflow-hidden border border-steel-line bg-steel-panel/40">
      <iframe
        src={BOOKING_URL}
        title="Schedule a call with Stub-EASE®"
        scrolling="no"
        id="bPtbIeqGaeCxN8D9e7nT_booking"
        style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: 720 }}
      />
    </div>
  )
}
